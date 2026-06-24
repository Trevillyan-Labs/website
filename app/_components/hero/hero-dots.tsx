"use client";

import { useEffect, useRef } from "react";

// Constellation-spotlight: a faint dot field that brightens and connects
// with thin lines near the cursor. Merges the "dot grid spotlight" and
// "constellation network" ideas into one effect. Respects reduced-motion.
export function HeroDots() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const context = node.getContext("2d");
    if (!context) return;
    // Rebind to non-null locals so nested closures keep the narrowed type.
    const canvas = node;
    const ctx = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 30;
    const R = 150; // spotlight radius
    let dots: { x: number; y: number }[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };

    function build() {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let x = GAP; x < w; x += GAP) {
        for (let y = GAP; y < h; y += GAP) dots.push({ x, y });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        const t = Math.max(0, 1 - dist / R);
        const a = 0.06 + t * 0.85;
        ctx.beginPath();
        ctx.arc(d.x, d.y, t > 0 ? 1.6 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = t > 0 ? `rgba(90,169,255,${a})` : `rgba(148,163,184,${a})`;
        ctx.fill();
        if (t > 0.15) {
          for (const e of dots) {
            if (e === d) continue;
            if (Math.abs(e.x - d.x) > GAP * 1.6 || Math.abs(e.y - d.y) > GAP * 1.6) continue;
            const ed = Math.hypot(e.x - mouse.x, e.y - mouse.y);
            if (ed > R) continue;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(e.x, e.y);
            ctx.strokeStyle = `rgba(21,131,250,${t * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      build();
      if (reduce) draw();
    };

    build();
    if (reduce) {
      draw();
    } else {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
