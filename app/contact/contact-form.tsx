"use client";

import { useState } from "react";

const intents = [
  { value: "build", label: "Hire us to build something" },
  { value: "web", label: "A web / portfolio site" },
  { value: "advisory", label: "Advisory — product & go-to-market execution" },
  { value: "applying-ai", label: "Applying AI in my org" },
  { value: "newsnook", label: "About NewsNook" },
  { value: "other", label: "Something else" },
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ initialIntent }: { initialIntent?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
        <h2 className="text-lg font-medium text-ink">Thanks — got it.</h2>
        <p className="mt-2 text-[15px] text-muted">
          We'll come back with a clear, scoped next step. Talk soon.
        </p>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[13px] font-medium text-ink">Name</span>
          <input name="name" required className={`mt-1.5 ${field}`} autoComplete="name" />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-ink">Email</span>
          <input name="email" type="email" required className={`mt-1.5 ${field}`} autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="text-[13px] font-medium text-ink">What do you need?</span>
        <select name="intent" defaultValue={initialIntent || "build"} className={`mt-1.5 ${field}`}>
          {intents.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-[13px] font-medium text-ink">Tell us a bit more</span>
        <textarea name="message" required rows={5} className={`mt-1.5 ${field}`} />
      </label>
      <label className="flex items-start gap-2.5 text-[13px] text-muted">
        <input name="consent" type="checkbox" required className="mt-0.5" />
        <span>I'm happy for Trevillyan Labs to use this to reply to my enquiry.</span>
      </label>
      {status === "error" ? <p className="text-[13px] text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
