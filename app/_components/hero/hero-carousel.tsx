"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { type Shot, showcase } from "@/lib/showcase";

function Card({ shot, priority }: { shot: Shot; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[var(--color-hero-card)] shadow-lg shadow-black/30">
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
    <div className="overflow-hidden">
      <div
        className="flex flex-col gap-4 will-change-transform motion-reduce:animate-none"
        style={{ animation: `hero-scroll-${dir} 46s linear infinite` }}
      >
        {loop.map((shot, i) => (
          <Card key={`${shot.src}-${i}`} shot={shot} priority={i < 2} />
        ))}
      </div>
    </div>
  );
}

export function HeroCarousel() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(1200px) rotateY(${-tx * 5}deg) rotateX(${ty * 4}deg)`;
          raf = 0;
        });
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const colA = showcase.filter((_, i) => i % 2 === 0);
  const colB = showcase.filter((_, i) => i % 2 === 1);

  return (
    <div
      className="hero-carousel-mask h-[440px] sm:h-[520px]"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={tiltRef}
        className="grid grid-cols-2 gap-4 transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      >
        <Column shots={colA} dir="up" />
        <Column shots={colB} dir="down" />
      </div>
    </div>
  );
}
