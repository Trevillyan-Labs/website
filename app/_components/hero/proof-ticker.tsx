"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}</>;
}

const stats: { value: React.ReactNode; label: string }[] = [
  { value: <CountUp to={13} />, label: "products shipped" },
  { value: "7-figure", label: "ARR delivered" },
  { value: <CountUp to={2} />, label: "issued patents" },
  { value: "Live", label: "in production" },
];

export function ProofTicker() {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-4">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="text-xl font-medium text-white">{s.value}</dt>
          <dd className="text-[12px] text-[var(--color-hero-muted)]">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
