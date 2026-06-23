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

/* Applying AI for leaders — placeholder pending a new direction. */
function AiMotif() {
  return (
    <div className="flex h-32 items-center justify-center rounded-lg bg-[var(--color-surface-2)]">
      <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden="true">
        <title>AI agent network</title>
        <g className="svc-spin">
          <line x1="50" y1="50" x2="50" y2="14" stroke="#c2d6ef" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="81" y2="68" stroke="#c2d6ef" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="19" y2="68" stroke="#c2d6ef" strokeWidth="1.5" />
          <circle cx="50" cy="14" r="5" fill="#e8f1fd" stroke="#1583fa" strokeWidth="1.5" />
          <circle cx="81" cy="68" r="5" fill="#e8f1fd" stroke="#1583fa" strokeWidth="1.5" />
          <circle cx="19" cy="68" r="5" fill="#e8f1fd" stroke="#1583fa" strokeWidth="1.5" />
        </g>
        <circle cx="50" cy="50" r="9" fill="#1583fa" className="svc-pulse" />
        <circle cx="50" cy="50" r="9" fill="#1583fa" />
        <path
          d="M50 43.5 L51.8 48.2 L56.5 50 L51.8 51.8 L50 56.5 L48.2 51.8 L43.5 50 L48.2 48.2 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}

export function AdviseMotif({ kind }: { kind: "growth" | "ai" }) {
  return kind === "growth" ? <GrowthMotif /> : <AiMotif />;
}
