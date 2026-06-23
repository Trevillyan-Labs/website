"use client";

import { useEffect, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Contract software development — a build/CI panel (engineering rigor). */
const STEPS = [
  { t: "$ build app", c: "text-[var(--color-hero-accent)]" },
  { t: "✓ compiled · 142 modules", c: "text-[#8fb89b]" },
  { t: "✓ 86 tests passed", c: "text-[#8fb89b]" },
  { t: "✓ shipped to production", c: "text-[#8fb89b]" },
];

function AppMotif() {
  const [n, setN] = useState(reduced() ? STEPS.length : 0);

  useEffect(() => {
    if (reduced()) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i = i >= STEPS.length ? 0 : i + 1;
      setN(i);
      timer = setTimeout(tick, i === 0 ? 1400 : i >= STEPS.length ? 2400 : 560);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-32 overflow-hidden rounded-lg bg-[var(--color-hero)] p-4 font-mono text-[11px] leading-relaxed">
      <div className="mb-2.5 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#3a4658]" />
        <span className="h-2 w-2 rounded-full bg-[#3a4658]" />
        <span className="h-2 w-2 rounded-full bg-[#3a4658]" />
      </div>
      {STEPS.map((s, i) =>
        i < n ? (
          <p key={s.t} className={s.c}>
            {s.t}
          </p>
        ) : null,
      )}
      {n < STEPS.length ? (
        <p className="text-[var(--color-hero-accent)]">
          <span className="term-caret inline-block h-[1em] w-[6px] translate-y-[2px] bg-[var(--color-hero-accent)]" />
        </p>
      ) : null}
    </div>
  );
}

/* Web & portfolio builds — a polished browser mockup with a sheen sweep. */
function SiteMotif() {
  return (
    <div className="relative h-32 overflow-hidden rounded-lg border border-[var(--color-line)] bg-white">
      <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[var(--color-line)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-line)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-line)]" />
        <span className="ml-2 h-3 w-32 rounded bg-[var(--color-surface-2)]" />
      </div>
      <div className="p-3">
        <div className="relative h-14 overflow-hidden rounded-md bg-[var(--color-brand-tint)]">
          <div className="svc-shimmer pointer-events-none absolute inset-0" />
          <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-3">
            <span className="h-2 w-24 rounded bg-[#9cc4f7]" />
            <span className="h-1.5 w-16 rounded bg-[#bcd9fb]" />
          </div>
        </div>
        <div className="mt-2.5 flex gap-2">
          <span className="h-2 flex-1 rounded bg-[var(--color-surface-2)]" />
          <span className="h-2 w-10 rounded bg-[var(--color-surface-2)]" />
        </div>
        <div className="mt-2 h-4 w-16 rounded bg-brand" />
      </div>
    </div>
  );
}

export function BuildMotif({ kind }: { kind: "app" | "site" }) {
  return kind === "app" ? <AppMotif /> : <SiteMotif />;
}
