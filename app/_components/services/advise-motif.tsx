/* Distinct motifs for the two Advise routes. Pure SVG/CSS animation. */

/* Product & GTM execution — a rising trajectory through milestones. */
function GrowthMotif() {
  return (
    <div className="flex h-32 flex-col overflow-hidden rounded-lg bg-[var(--color-surface-2)] p-4">
      <svg viewBox="0 0 120 64" className="w-full flex-1" aria-hidden="true">
        <title>Growth trajectory</title>
        <defs>
          <linearGradient id="adv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1583fa" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1583fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="8,58 60,40 112,12 112,64 8,64" fill="url(#adv-area)" />
        <polyline
          points="8,58 60,40 112,12"
          fill="none"
          stroke="#1583fa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="58" r="3.5" fill="#1583fa" />
        <circle cx="60" cy="40" r="3.5" fill="#1583fa" />
        <circle cx="112" cy="12" r="3.5" fill="#1583fa" />
        <circle cx="112" cy="12" r="3.5" fill="#1583fa" className="svc-pulse" />
      </svg>
      <div className="mt-1 flex justify-between font-mono text-[9px] text-[var(--color-muted-2)]">
        <span>idea</span>
        <span>PMF</span>
        <span>scale</span>
      </div>
    </div>
  );
}

/* Applying AI for leaders — an agent core orchestrating a small network. */
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
