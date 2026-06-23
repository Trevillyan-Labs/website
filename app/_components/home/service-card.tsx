"use client";

import { Icon } from "@/app/_components/icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Service = {
  title: string;
  icon: string;
  body: string;
  detail: string;
  motif: "terminal" | "trajectory" | "window";
  cta: { label: string; href: string };
};

function Motif({ kind }: { kind: Service["motif"] }) {
  if (kind === "terminal") {
    return (
      <div className="relative h-24 overflow-hidden rounded-lg bg-[var(--color-hero)] p-3 font-mono text-[10px] leading-relaxed">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3a4658]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#3a4658]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#3a4658]" />
        </div>
        <p className="mt-2 text-[var(--color-hero-accent)]">
          $ build <span className="text-white">mvp</span>
        </p>
        <p className="text-[#8fb89b]">
          ✓ shipped to prod
          <span className="term-caret ml-1 inline-block h-[1em] w-[5px] translate-y-[2px] bg-[var(--color-hero-accent)]" />
        </p>
      </div>
    );
  }
  if (kind === "trajectory") {
    return (
      <div className="relative h-24 overflow-hidden rounded-lg bg-[var(--color-surface-2)] p-3">
        <svg viewBox="0 0 120 64" className="h-full w-full" aria-hidden="true">
          <title>Upward trajectory</title>
          <defs>
            <linearGradient id="svc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1583fa" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1583fa" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M2 54 L26 46 L50 50 L74 28 L98 22 L118 6 L118 64 L2 64 Z"
            fill="url(#svc-area)"
          />
          <polyline
            points="2,54 26,46 50,50 74,28 98,22 118,6"
            fill="none"
            stroke="#1583fa"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="118" cy="6" r="3.5" fill="#1583fa" />
          <circle cx="118" cy="6" r="3.5" fill="#1583fa" className="svc-pulse" />
        </svg>
      </div>
    );
  }
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
          live
        </span>
      </div>
      <div className="p-3">
        <div className="h-2 w-2/3 rounded bg-[var(--color-surface-2)]" />
        <div className="mt-1.5 h-2 w-1/2 rounded bg-[var(--color-surface-2)]" />
        <span className="mt-2.5 inline-block text-[10px] font-medium text-brand">NewsNook</span>
      </div>
    </div>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
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
