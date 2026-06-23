"use client";

import { useEffect, useState } from "react";

type Step = { cmd: string; out: string };

const steps: Step[] = [
  { cmd: "spec & build the 3D modeling feature", out: "designed, built, shipped ✓" },
  { cmd: "run the security checks", out: "347 checks passed ✓" },
  { cmd: "run the test suite", out: "2,384 passed ✓" },
  { cmd: "deploy to production", out: "live in 38s ✓" },
  { cmd: "summarize the release notes", out: "v2.4 notes drafted ✓" },
];

type Line = { prompt: boolean; text: string };

export function RenConsole() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(
        steps.flatMap((s) => [
          { prompt: true, text: s.cmd },
          { prompt: false, text: s.out },
        ]),
      );
      return;
    }
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (!cancelled) {
        setLines([]);
        setTyping("");
        for (const s of steps) {
          for (let i = 1; i <= s.cmd.length; i++) {
            if (cancelled) return;
            setTyping(s.cmd.slice(0, i));
            await sleep(26);
          }
          if (cancelled) return;
          setLines((p) => [...p, { prompt: true, text: s.cmd }]);
          setTyping("");
          await sleep(360);
          if (cancelled) return;
          setLines((p) => [...p, { prompt: false, text: s.out }]);
          await sleep(640);
        }
        await sleep(2000);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a111f] font-mono text-[13px] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4658]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4658]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4658]" />
        <span className="ml-2 text-[12px] text-[var(--color-hero-muted)]">
          ren — trevillyan labs
        </span>
      </div>
      <div className="relative">
        {/* Invisible ghost of the full transcript reserves the final height so
            the box is correctly sized from the first frame and never shifts. */}
        <div className="invisible space-y-1.5 p-5 leading-relaxed" aria-hidden="true">
          {steps.flatMap((s, i) => [
            <p key={`g-cmd-${i}`} className="text-white">
              <span>ren ›</span> {s.cmd}
            </p>,
            <p key={`g-out-${i}`} className="pl-5">
              {s.out}
            </p>,
          ])}
        </div>
        {/* Animated transcript, layered over the ghost. */}
        <div className="absolute inset-0 space-y-1.5 p-5 leading-relaxed">
          {lines.map((l, i) =>
            l.prompt ? (
              <p key={i} className="text-white">
                <span className="text-[var(--color-hero-accent)]">ren ›</span> {l.text}
              </p>
            ) : (
              <p key={i} className="pl-5 text-[#8fb89b]">
                {l.text}
              </p>
            ),
          )}
          {typing !== "" || lines.length === 0 ? (
            <p className="text-white">
              <span className="text-[var(--color-hero-accent)]">ren ›</span> {typing}
              <span className="term-caret ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-[var(--color-hero-accent)]" />
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
