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
  { t: "  // fueled by coffee & focus\n", c: "text-[#5f7488]" },
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
const GCOLS = 46;
const GCOLSTEP = GW / (GCOLS - 1);

function GraphMotif() {
  const polyRef = useRef<SVGPolylineElement>(null);
  const areaRef = useRef<SVGPolygonElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // A trail of past values that scrolls left, with a smoothly-eased leading
    // value. The dot IS the line's leading end — nothing is drawn in front of
    // it — so the line and dot move in perfect sync (no leading-edge jolt).
    const trail = Array.from({ length: GCOLS }, (_, i) => 30 + (i * 40) / (GCOLS - 1));
    let lead = trail[GCOLS - 1];
    let target = lead;
    let dispMin = Math.min(...trail);
    let dispMax = Math.max(...trail);

    const nextTarget = (prev: number) => {
      const dip = Math.random() < 0.3;
      const d = dip ? -(7 + Math.random() * 10) : 5 + Math.random() * 9;
      return Math.max(12, Math.min(88, prev + d));
    };

    const render = (subPx: number) => {
      const range = dispMax - dispMin || 1;
      const yOf = (v: number) => GH - GPAD - ((v - dispMin) / range) * (GH - 2 * GPAD);
      const pts: string[] = [];
      for (let i = 0; i < GCOLS; i++) {
        pts.push(`${(i * GCOLSTEP - subPx).toFixed(2)},${yOf(trail[i]).toFixed(2)}`);
      }
      const leadY = yOf(lead);
      pts.push(`${GW},${leadY.toFixed(2)}`); // leading edge == the dot
      const ptsStr = pts.join(" ");
      polyRef.current?.setAttribute("points", ptsStr);
      areaRef.current?.setAttribute("points", `${(-subPx).toFixed(2)},${GH} ${ptsStr} ${GW},${GH}`);
      dotRef.current?.setAttribute("cx", `${GW}`);
      dotRef.current?.setAttribute("cy", `${leadY.toFixed(2)}`);
      pulseRef.current?.setAttribute("cx", `${GW}`);
      pulseRef.current?.setAttribute("cy", `${leadY.toFixed(2)}`);
    };

    render(0); // draw immediately so there's never an empty frame
    if (prefersReducedMotion()) return;

    const TARGET_EVERY = 240; // ms between new targets
    const SPEED = 46; // px/s scroll
    const TAU = 70; // ms ease constant for the leading value
    let raf = 0;
    let last = 0;
    let tAccum = 0;
    let subPx = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      const dt = Math.min(t - last, 64); // clamp after tab-throttle pauses
      last = t;

      tAccum += dt;
      while (tAccum >= TARGET_EVERY) {
        tAccum -= TARGET_EVERY;
        target = nextTarget(target);
      }
      lead += (target - lead) * (1 - Math.exp(-dt / TAU));

      // Auto-fit the value window, eased so the curve never snaps vertically.
      let tMin = lead;
      let tMax = lead;
      for (const v of trail) {
        if (v < tMin) tMin = v;
        if (v > tMax) tMax = v;
      }
      const a = 1 - Math.exp(-dt / 150);
      dispMin += (tMin - dispMin) * a;
      dispMax += (tMax - dispMax) * a;

      subPx += (SPEED * dt) / 1000;
      while (subPx >= GCOLSTEP) {
        subPx -= GCOLSTEP;
        trail.shift();
        trail.push(lead);
      }

      render(subPx);
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

/* ── Products: live SaaS metrics — % change cards ────────────────────── */

type Kpi = { key: string; up: boolean };
const KPIS: Kpi[] = [
  { key: "MRR", up: true },
  { key: "NRR", up: true },
  { key: "WAU", up: true },
  { key: "LTV", up: true },
  { key: "CAC", up: false },
];

function ProductMotif() {
  const [pcts, setPcts] = useState<number[]>(() => KPIS.map((k) => (k.up ? 1 : -1) * 2.4));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setPcts(KPIS.map((k) => (k.up ? 1.4 : -1.4) + (Math.random() - 0.5) * 5.5));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-24 flex-col gap-1.5 overflow-hidden rounded-lg border border-[var(--color-line)] bg-white px-3 py-2">
      <div className="flex items-center justify-between text-[9px]">
        <span className="flex items-center gap-1 font-medium text-[#16a34a]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="svc-pulse absolute inline-flex h-full w-full rounded-full bg-[#16a34a]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          </span>
          live
        </span>
        <span className="text-[var(--color-muted-2)]">vs prev 7d</span>
      </div>
      <div className="grid flex-1 grid-cols-5 gap-1.5">
        {KPIS.map((k, i) => {
          const p = pcts[i];
          const good = k.up ? p > 0 : p < 0;
          return (
            <div
              key={k.key}
              className="flex flex-col items-center justify-center gap-0.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]"
            >
              <span className="text-[9px] text-[var(--color-muted-2)]">{k.key}</span>
              <span
                className={`font-mono text-[10px] font-medium ${good ? "text-[#16a34a]" : "text-[#dc2626]"}`}
              >
                {p > 0 ? "+" : ""}
                {p.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Motif({ kind }: { kind: Service["motif"] }) {
  if (kind === "code") return <CodeMotif />;
  if (kind === "graph") return <GraphMotif />;
  return <ProductMotif />;
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
        <Motif kind={service.motif} />
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
