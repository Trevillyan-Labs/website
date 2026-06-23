"use client";

import { useEffect, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Product & GTM execution — the Lean Analytics growth stages, lighting up. */
const STAGES = ["Empathy", "Sticky", "Viral", "Revenue", "Scale"];
const NODES: [number, number][] = [
  [22, 62],
  [61, 50],
  [100, 38],
  [139, 26],
  [178, 14],
];
const GW = 200;
const GH = 84;

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

  const track = NODES.map((p) => p.join(",")).join(" ");
  const litPts = NODES.slice(0, active + 1)
    .map((p) => p.join(","))
    .join(" ");
  const area = active >= 1 ? `${NODES[0][0]},${GH} ${litPts} ${NODES[active][0]},${GH}` : "";

  return (
    <div className="flex h-32 flex-col justify-center overflow-hidden rounded-lg bg-[var(--color-surface-2)] px-2">
      <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full" aria-hidden="true">
        <title>Growth stages</title>
        <defs>
          <linearGradient id="adv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1583fa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1583fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        {area ? <polygon points={area} fill="url(#adv-area)" /> : null}
        {/* faint full track */}
        <polyline
          points={track}
          fill="none"
          stroke="#c2d6ef"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* lit path so far */}
        {active >= 1 ? (
          <polyline
            points={litPts}
            fill="none"
            stroke="#1583fa"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
