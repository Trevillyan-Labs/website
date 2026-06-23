"use client";

import { Icon } from "@/app/_components/icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Service = {
  title: string;
  icon: string;
  body: string;
  detail: string;
  motif: "code" | "graph" | "product";
  cta: { label: string; href: string };
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Build: live TypeScript code generation ──────────────────────────── */

type Seg = { t: string; c: string };
const CODE: Seg[] = [
  { t: "function ", c: "text-[var(--color-hero-accent)]" },
  { t: "shipIt", c: "text-[#e2c08d]" },
  { t: "() {\n", c: "text-[#8597ad]" },
  { t: "  // works on my machine\n", c: "text-[#5f7488]" },
  { t: "  return ", c: "text-[var(--color-hero-accent)]" },
  { t: "deploy", c: "text-[#e2c08d]" },
  { t: "()\n", c: "text-[#8597ad]" },
  { t: "}", c: "text-[#8597ad]" },
];
const CODE_LEN = CODE.reduce((n, s) => n + s.t.length, 0);

function CodeMotif() {
  const [len, setLen] = useState(prefersReducedMotion() ? CODE_LEN : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i = i >= CODE_LEN ? 0 : i + 1;
      setLen(i);
      timer = setTimeout(step, i === 0 ? 1600 : i >= CODE_LEN ? 2600 : 55);
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, []);

  let remaining = len;
  return (
    <div className="relative h-24 overflow-hidden rounded-lg bg-[var(--color-hero)] p-3 font-mono text-[10px] leading-relaxed">
      <pre className="whitespace-pre">
        {CODE.map((s) => {
          if (remaining <= 0) return null;
          const shown = s.t.slice(0, remaining);
          remaining -= s.t.length;
          return (
            <span key={s.t} className={s.c}>
              {shown}
            </span>
          );
        })}
        <span className="term-caret ml-px inline-block h-[1em] w-[5px] translate-y-[2px] bg-[var(--color-hero-accent)] align-middle" />
      </pre>
    </div>
  );
}

/* ── Advise: live climbing sparkline (rAF, 60fps) ────────────────────── */

const GW = 120;
const GH = 64;
const GPAD = 10;
const GN = 22;
const GSTEP = GW / (GN - 2);
const GPERIOD = 620; // ms per new sample

function GraphMotif() {
  const polyRef = useRef<SVGPolylineElement>(null);
  const areaRef = useRef<SVGPolygonElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const vals = Array.from({ length: GN }, (_, i) => 30 + i * 1.3);
    let dispMin = Math.min(...vals);
    let dispMax = Math.max(...vals);

    const nextVal = () => {
      const last = vals[vals.length - 1];
      const dip = Math.random() < 0.3;
      return last + (dip ? -(2 + Math.random() * 5) : 1.5 + Math.random() * 4);
    };

    const render = (phase: number) => {
      // Smoothly track the value window so the curve never jumps vertically.
      const tMin = Math.min(...vals);
      const tMax = Math.max(...vals);
      dispMin += (tMin - dispMin) * 0.08;
      dispMax += (tMax - dispMax) * 0.08;
      const range = dispMax - dispMin || 1;
      const yOf = (v: number) => GH - GPAD - ((v - dispMin) / range) * (GH - 2 * GPAD);

      const pts: string[] = [];
      for (let i = 0; i < GN; i++) {
        const px = i * GSTEP - phase * GSTEP;
        pts.push(`${px.toFixed(2)},${yOf(vals[i]).toFixed(2)}`);
      }
      const ptsStr = pts.join(" ");
      polyRef.current?.setAttribute("points", ptsStr);
      areaRef.current?.setAttribute("points", `${-GSTEP},${GH} ${ptsStr} ${GW + GSTEP},${GH}`);

      // Dot pinned just inside the right edge, riding the curve smoothly.
      const dotX = GW - 3;
      const fi = dotX / GSTEP + phase;
      const i0 = Math.max(0, Math.min(GN - 2, Math.floor(fi)));
      const frac = Math.min(1, Math.max(0, fi - i0));
      const dotY = yOf(vals[i0]) + (yOf(vals[i0 + 1]) - yOf(vals[i0])) * frac;
      dotRef.current?.setAttribute("cx", `${dotX}`);
      dotRef.current?.setAttribute("cy", `${dotY.toFixed(2)}`);
      pulseRef.current?.setAttribute("cx", `${dotX}`);
      pulseRef.current?.setAttribute("cy", `${dotY.toFixed(2)}`);
    };

    render(0); // draw immediately so there's never an empty frame
    if (prefersReducedMotion()) return;

    let raf = 0;
    let last = 0;
    let phase = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      const dt = Math.min(t - last, 64); // clamp after tab-throttle pauses
      last = t;
      phase += dt / GPERIOD;
      while (phase >= 1) {
        phase -= 1;
        vals.shift();
        vals.push(nextVal());
      }
      render(phase);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative h-24 overflow-hidden rounded-lg bg-[var(--color-surface-2)] p-3">
      <svg viewBox={`0 0 ${GW} ${GH}`} className="h-full w-full" aria-hidden="true">
        <title>Live growth</title>
        <defs>
          <linearGradient id="svc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1583fa" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1583fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon ref={areaRef} points="" fill="url(#svc-area)" />
        <polyline
          ref={polyRef}
          points=""
          fill="none"
          stroke="#1583fa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle ref={dotRef} r="3.5" fill="#1583fa" />
        <circle ref={pulseRef} r="3.5" fill="#1583fa" className="svc-pulse" />
      </svg>
    </div>
  );
}

/* ── Products: NewsNook growth (animated bars) ───────────────────────── */

const BARS = [34, 46, 40, 58, 52, 68, 74, 92];

function ProductMotif({ shown }: { shown: boolean }) {
  return (
    <div className="relative h-24 overflow-hidden rounded-lg border border-[var(--color-line)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-3 py-1.5">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line)]" />
        </div>
        <span className="flex items-center gap-1 text-[10px] font-medium text-[#16a34a]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="svc-pulse absolute inline-flex h-full w-full rounded-full bg-[#16a34a]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          </span>
          <i className="not-italic">▲ growth</i>
        </span>
      </div>
      <div className="flex h-[44px] items-end gap-1 px-3 pb-2">
        {BARS.map((h, i) => (
          <div
            key={h}
            className={`flex-1 rounded-sm origin-bottom transition-transform duration-700 ease-out ${
              i === BARS.length - 1 ? "bg-brand" : "bg-[#bcd9fb]"
            }`}
            style={{
              height: `${h}%`,
              transform: shown ? "scaleY(1)" : "scaleY(0)",
              transitionDelay: `${i * 70}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Motif({ kind, shown }: { kind: Service["motif"]; shown: boolean }) {
  if (kind === "code") return <CodeMotif />;
  if (kind === "graph") return <GraphMotif />;
  return <ProductMotif shown={shown} />;
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let firedOnce = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        firedOnce = true;
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    // Safety net: if the observer never reports (unsupported / edge env),
    // reveal anyway so the card can never get stuck invisible.
    const fallback = setTimeout(() => {
      if (!firedOnce) setShown(true);
    }, 1000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <article
      ref={ref}
      style={{ transitionDelay: shown ? "0ms" : `${index * 90}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        onMouseMove={onMove}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(21,131,250,0.10), transparent 70%)",
          }}
        />
        <Motif kind={service.motif} shown={shown} />
        <div className="mt-5 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-brand">
            <Icon name={service.icon} className="h-[18px] w-[18px]" />
          </span>
          <h3 className="text-lg font-medium text-ink">{service.title}</h3>
        </div>
        <p className="mt-3 text-[13px] leading-snug text-[#475569]">{service.body}</p>
        <div className="mt-5 border-t border-[var(--color-surface-2)] pt-4">
          <p className="text-[11.5px] text-muted">{service.detail}</p>
        </div>
        <Link
          href={service.cta.href}
          className="mt-4 text-[13px] font-medium text-brand after:absolute after:inset-0 hover:text-brand-hover"
        >
          {service.cta.label}
        </Link>
      </div>
    </article>
  );
}
