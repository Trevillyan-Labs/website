"use client";

import { useEffect, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Product & GTM execution — Lean Analytics stages on an exponential
   traction curve, lighting up as the company climbs. */
const STAGES = ["Empathy", "Sticky", "Viral", "Revenue", "Scale"];
// x evenly spaced; y follows an exponential (hockey-stick) traction curve.
const NODES: [number, number][] = [
  [34, 70],
  [70, 66],
  [106, 59],
  [142, 44],
  [178, 14],
];
const GW = 200;
const GH = 92;
const AXIS_X = 22;
const BASE_Y = 78;

/** Smooth (Catmull-Rom) curve through the points so the line reads as a
    continuous exponential, not straight segments. */
function smoothPath(pts: [number, number][]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0][0]} ${pts[0][1]}`;
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

function GrowthMotif() {
  const [active, setActive] = useState(reduced() ? STAGES.length - 1 : 0);

  useEffect(() => {
    if (reduced()) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i = i >= STAGES.length - 1 ? 0 : i + 1;
      setActive(i);
      timer = setTimeout(tick, i === 0 ? 1700 : i >= STAGES.length - 1 ? 2000 : 780);
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, []);

  const litNodes = NODES.slice(0, active + 1);
  const trackD = smoothPath(NODES);
  const litD = smoothPath(litNodes);
  const areaD =
    active >= 1
      ? `${litD} L ${litNodes[litNodes.length - 1][0]} ${BASE_Y} L ${litNodes[0][0]} ${BASE_Y} Z`
      : "";

  return (
    <div className="flex h-32 flex-col justify-center overflow-hidden rounded-lg bg-[var(--color-surface-2)] px-2">
      <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full" aria-hidden="true">
        <title>Exponential traction curve</title>
        <defs>
          <linearGradient id="adv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1583fa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1583fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* y-axis: traction */}
        <line x1={AXIS_X} y1="12" x2={AXIS_X} y2={BASE_Y} stroke="#c2d6ef" strokeWidth="1.5" />
        <text
          x="11"
          y="44"
          transform="rotate(-90 11 44)"
          textAnchor="middle"
          className="font-mono"
          fontSize="7"
          fill="#94a3b8"
        >
          traction
        </text>
        {areaD ? <path d={areaD} fill="url(#adv-area)" /> : null}
        {/* faint full track */}
        <path d={trackD} fill="none" stroke="#c2d6ef" strokeWidth="2" strokeLinecap="round" />
        {/* lit path so far */}
        {active >= 1 ? (
          <path d={litD} fill="none" stroke="#1583fa" strokeWidth="2.5" strokeLinecap="round" />
        ) : null}
        {NODES.map(([x, y], i) => {
          const lit = i <= active;
          return (
            <g key={STAGES[i]}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={lit ? "#1583fa" : "#ffffff"}
                stroke={lit ? "#1583fa" : "#c2d6ef"}
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={GH - 4}
                textAnchor="middle"
                className="font-mono"
                fontSize="8"
                fill={lit ? "#1565c0" : "#94a3b8"}
              >
                {STAGES[i]}
              </text>
            </g>
          );
        })}
        {/* pulsing marker at the active stage */}
        <circle
          cx={NODES[active][0]}
          cy={NODES[active][1]}
          r="4"
          fill="#1583fa"
          className="svc-pulse"
        />
      </svg>
    </div>
  );
}

/* Applying AI for leaders — one operator + AI workers = multiplied output. */
const AGENTS = 4;
const AGENT_Y = [22, 40, 58, 76];

function AiMotif() {
  const [active, setActive] = useState(reduced() ? AGENTS : 0);

  useEffect(() => {
    if (reduced()) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i = i >= AGENTS ? 0 : i + 1;
      setActive(i);
      timer = setTimeout(tick, i === 0 ? 1500 : i >= AGENTS ? 2000 : 640);
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-surface-2)]">
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <title>Throughput multiplier</title>
        {/* operator → agent connectors */}
        {AGENT_Y.map((y, i) => (
          <line
            key={`l-${y}`}
            x1="40"
            y1="50"
            x2="90"
            y2={y}
            stroke={i < active ? "#1583fa" : "#c2d6ef"}
            strokeWidth="1.5"
          />
        ))}
        {/* operator (you) */}
        <circle cx="27" cy="50" r="13" fill="#1583fa" />
        <circle cx="27" cy="46" r="3.4" fill="#ffffff" />
        <path d="M20.5 56 a6.5 6.5 0 0 1 13 0" fill="#ffffff" />
        <text x="27" y="80" textAnchor="middle" className="font-mono" fontSize="8" fill="#64748b">
          you
        </text>
        {/* AI agent workers */}
        {AGENT_Y.map((y, i) => {
          const on = i < active;
          return (
            <circle
              key={`a-${y}`}
              cx="96"
              cy={y}
              r="6"
              fill={on ? "#e8f1fd" : "#ffffff"}
              stroke={on ? "#1583fa" : "#c2d6ef"}
              strokeWidth="1.5"
            />
          );
        })}
        {active > 0 ? (
          <circle cx="96" cy={AGENT_Y[active - 1]} r="6" fill="#1583fa" className="svc-pulse" />
        ) : null}
        {/* multiplied output */}
        <text x="158" y="46" textAnchor="middle" fontSize="26" fontWeight="500" fill="#1583fa">
          {active + 1}×
        </text>
        <text x="158" y="62" textAnchor="middle" className="font-mono" fontSize="8" fill="#64748b">
          output
        </text>
      </svg>
    </div>
  );
}

export function AdviseMotif({ kind }: { kind: "growth" | "ai" }) {
  return kind === "growth" ? <GrowthMotif /> : <AiMotif />;
}
