const nodemailer = require("nodemailer");

/**
 * Vercel serverless function: POST /api/contact
 * Sends contact form submissions via Gmail SMTP.
 * Requires Cloudflare Turnstile verification before sending.
 *
 * Required Vercel env vars:
 *   GMAIL_USER         - Gmail address (e.g. you@gmail.com)
 *   GMAIL_APP_PASSWORD - App password from Google Account (2FA required)
 *   CONTACT_EMAIL      - Where to receive messages (defaults to GMAIL_USER)
 *   TURNSTILE_SECRET_KEY - Cloudflare Turnstile secret key (server-side verify)
 */
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    console.error("Missing TURNSTILE_SECRET_KEY env var");
    return res.status(503).json({ error: "Server configuration error. Please try again later." });
  }

  const { name, email, subject, message, consent, cf_turnstile_response: token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Verification failed. Please try again." });
  }

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: turnstileSecret,
      response: token,
      ...(req.headers["x-forwarded-for"] && {
        remoteip: req.headers["x-forwarded-for"].split(",")[0].trim(),
      }),
    }).toString(),
  });
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return res.status(400).json({ error: "Verification failed. Please try again." });
  }

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Name, email, subject, and message are required." });
  }

  if (!consent) {
    return res.status(400).json({ error: "You must agree to the Privacy Policy." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL || gmailUser;

  if (!gmailUser || !gmailPass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars");
    return res.status(500).json({ error: "Server configuration error. Please try again later." });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${gmailUser}>`,
    replyTo: email,
    to: contactEmail,
    cc: email,
    subject: `Trevillyan Labs Inquiry - ${name}: ${subject}`,
    text: `${message}`,
    html: `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form send error:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
};

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
