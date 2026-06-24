import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Best-effort in-memory rate limit (per warm instance). For global limits use a
// shared store (Upstash/Vercel KV); this still curbs casual abuse.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentHits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentHits.set(ip, hits);
  return hits.length > RATE_MAX;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function verifyTurnstile(token: string | undefined, secret: string) {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token || "" }),
  });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this; bots do. Drop silently (pretend ok).
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, intent, message, consent, cf_turnstile_response: token } = body;

  // Server-side validation
  if (!name || !email || !message || !consent) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length > 5000) {
    return NextResponse.json({ error: "Please check your details." }, { status: 400 });
  }

  // Turnstile — only enforced when BOTH halves are configured. The client can
  // only produce a token when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so a
  // secret-without-site-key (or vice versa) config would otherwise reject every
  // real submission with a 403. The honeypot + rate limit still apply.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (turnstileSecret && turnstileSiteKey) {
    const ok = await verifyTurnstile(token, turnstileSecret);
    if (!ok) return NextResponse.json({ error: "Verification failed." }, { status: 403 });
  }

  // Email (only sent when configured; preview/dev without env is a no-op success)
  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_EMAIL } = process.env;
  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    const nodemailer = (await import("nodemailer")).default;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });
    await transport.sendMail({
      from: GMAIL_USER,
      to: CONTACT_EMAIL || GMAIL_USER,
      replyTo: email,
      subject: `New enquiry (${intent || "general"}) from ${name}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
<p><strong>Intent:</strong> ${escapeHtml(intent || "—")}</p>
<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
  } else {
    console.warn("[contact] GMAIL env not set — accepting message without sending (preview/dev).");
  }

  return NextResponse.json({ ok: true });
}
