"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { type Shot, showcase } from "@/lib/showcase";

const GAP = 16; // constant gap between images (px), preserved while scaling
const SPEED = 20; // auto-scroll px/sec
const SIGMA = 150; // falloff width — how far the magnify reaches
const BOOST = 0.5; // max extra scale for the image right under the cursor

type Align = "left" | "right";

/** One scrolling, fisheye-magnifying column. Cards are positioned analytically
 *  (no layout reads) so gaps stay constant and images never overlap. */
function Column({ shots, dir, align }: { shots: Shot[]; dir: "up" | "down"; align: Align }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>(".shot"));
    const n = cards.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let H = 0;
    let slot = 0;
    let period = 0;
    let rect = wrap.getBoundingClientRect();
    const measure = () => {
      const w = wrap.clientWidth;
      H = (w * 10) / 16; // 16:10 cards
      slot = H + GAP;
      period = n * slot;
      rect = wrap.getBoundingClientRect();
    };
    measure();

    let scroll = dir === "down" ? period / 2 : 0;
    const cursor = { x: -99999, y: -99999 };

    const frame = () => {
      measure(); // keep H/slot/period in sync with the laid-out width
      const ch = wrap.clientHeight;
      const colCx = rect.left + wrap.clientWidth / 2;

      // 1) base positions (wrapped) + scale from 2-D distance to cursor
      const items = cards.map((c, i) => {
        let bp = (((i * slot - scroll) % period) + period) % period; // 0..period
        if (bp > ch + slot) bp -= period; // lift off-screen cards above
        const baseCenterY = rect.top + bp + H / 2;
        const d = Math.hypot(colCx - cursor.x, baseCenterY - cursor.y);
        const s = 1 + BOOST * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
        return { c, bp, s, top: 0 };
      });

      // 2) cumulative layout (top→down): constant GAP, no overlap
      items.sort((a, b) => a.bp - b.bp);
      let y = items[0].bp;
      let anchorDelta = 0;
      let best = Infinity;
      for (const it of items) {
        it.top = y;
        const dc = Math.abs(rect.top + it.bp + H / 2 - cursor.y);
        if (dc < best) {
          best = dc;
          anchorDelta = y - it.bp; // keep the card nearest the cursor at its base spot
        }
        y += H * it.s + GAP;
      }

      // 3) write transforms
      for (const it of items) {
        it.c.style.transform = `translateY(${(it.top - anchorDelta).toFixed(2)}px) scale(${it.s.toFixed(3)})`;
        it.c.style.zIndex = it.s > 1.02 ? String(Math.round(it.s * 100)) : "1";
      }
    };

    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      scroll += (dir === "down" ? -SPEED : SPEED) * dt;
      frame();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      frame();
    };
    const onScrollResize = () => {
      measure();
      frame();
    };

    measure();
    frame();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onScrollResize);
    window.addEventListener("scroll", onScrollResize, { passive: true });
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onScrollResize);
      window.removeEventListener("scroll", onScrollResize);
      cancelAnimationFrame(raf);
    };
  }, [dir, align]);

  const originX = align === "right" ? "right" : "left";
  return (
    <div ref={wrapRef} className="relative h-full">
      {shots.map((shot, i) => (
        <div
          key={`${shot.src}-${i}`}
          className="shot absolute inset-x-0 top-0 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[var(--color-hero-card)] shadow-lg shadow-black/30 will-change-transform"
          style={{ transformOrigin: `top ${originX}` }}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 1024px) 45vw, 260px"
            className="object-cover object-top"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}

export function HeroCarousel() {
  // duplicate so each column has enough cards to fill + loop
  const a = showcase.filter((_, i) => i % 2 === 0);
  const b = showcase.filter((_, i) => i % 2 === 1);
  const colA = [...a, ...a];
  const colB = [...b, ...b];
  return (
    <div className="hero-carousel-mask grid h-[440px] grid-cols-2 gap-4 overflow-hidden px-2 sm:h-[520px]">
      <Column shots={colA} dir="up" align="right" />
      <Column shots={colB} dir="down" align="left" />
    </div>
  );
}
