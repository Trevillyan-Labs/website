"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { type Shot, showcase } from "@/lib/showcase";

function Card({ shot, priority }: { shot: Shot; priority?: boolean }) {
  return (
    <div className="hero-shot relative aspect-[16/10] origin-center overflow-hidden rounded-xl border border-white/10 bg-[var(--color-hero-card)] shadow-lg shadow-black/30 will-change-transform">
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes="(max-width: 1024px) 45vw, 260px"
        className="object-cover object-top"
        priority={priority}
      />
    </div>
  );
}

function Column({ shots, dir }: { shots: Shot[]; dir: "up" | "down" }) {
  const loop = [...shots, ...shots];
  return (
    <div
      className="flex flex-col gap-4 will-change-transform motion-reduce:animate-none"
      style={{ animation: `hero-scroll-${dir} 46s linear infinite` }}
    >
      {loop.map((shot, i) => (
        <Card key={`${shot.src}-${i}`} shot={shot} priority={i < 2} />
      ))}
    </div>
  );
}

export function HeroCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".hero-shot"));
    const cursor = { x: -99999, y: -99999 };
    const R = 240; // influence radius (px)
    const BOOST = 0.22; // max extra scale near the cursor

    // Read all centers, then write transforms — avoids layout thrash.
    const apply = () => {
      const centers = cards.map((c) => {
        const r = c.getBoundingClientRect();
        return { c, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
      for (const { c, cx, cy } of centers) {
        const dist = Math.hypot(cx - cursor.x, cy - cursor.y);
        const t = Math.max(0, 1 - dist / R);
        const scale = 1 + BOOST * t * t; // ease-in: growth concentrated near cursor
        c.style.transform = scale > 1.001 ? `scale(${scale.toFixed(3)})` : "";
        c.style.zIndex = t > 0.02 ? String(10 + Math.round(t * 10)) : "";
      }
    };

    const onMove = (e: PointerEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      apply(); // immediate response (also keeps it working if rAF is throttled)
    };
    const onLeave = () => {
      cursor.x = -99999;
      cursor.y = -99999;
      apply();
    };

    // rAF keeps the magnify in sync as cards auto-scroll under a still cursor.
    let raf = 0;
    const tick = () => {
      apply();
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const colA = showcase.filter((_, i) => i % 2 === 0);
  const colB = showcase.filter((_, i) => i % 2 === 1);

  return (
    <div
      ref={rootRef}
      className="hero-carousel-mask relative h-[440px] overflow-hidden px-4 sm:h-[520px]"
    >
      <div className="grid grid-cols-2 gap-4">
        <Column shots={colA} dir="up" />
        <Column shots={colB} dir="down" />
      </div>
    </div>
  );
}
