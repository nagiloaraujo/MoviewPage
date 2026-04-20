"use client";

import React, { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const seed = 1337;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let points: Point[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = Math.max(1, window.innerWidth);
      h = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = prefersReducedMotion ? 0.00002 : 0.00006;
      const count = clamp(Math.round(w * h * density), 18, prefersReducedMotion ? 28 : 60);

      const next: Point[] = [];
      for (let i = 0; i < count; i++) {
        const t = (i + 1) * 97.13 + seed;
        const x = (Math.sin(t) * 0.5 + 0.5) * w;
        const y = (Math.cos(t * 0.9) * 0.5 + 0.5) * h;
        const speed = prefersReducedMotion ? 0.035 : 0.11;
        next.push({
          x,
          y,
          vx: (Math.sin(t * 1.7) * 0.5 + 0.5) * speed - speed / 2,
          vy: (Math.cos(t * 1.3) * 0.5 + 0.5) * speed - speed / 2,
          r: 1.1 + (Math.sin(t * 2.3) * 0.5 + 0.5) * 1.7,
        });
      }
      points = next;
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      const maxDist = prefersReducedMotion ? 160 : 220;
      const maxDist2 = maxDist * maxDist;

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 > maxDist2) continue;

          const t = 1 - dist2 / maxDist2;
          const alpha = prefersReducedMotion ? 0.04 * t : 0.09 * t;

          ctx.strokeStyle = `rgba(140, 185, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of points) {
        ctx.fillStyle = "rgba(210, 234, 255, 0.24)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) raf = window.requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) raf = window.requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_20%,rgba(77,114,255,0.12),transparent_55%),radial-gradient(800px_circle_at_80%_15%,rgba(162,62,255,0.12),transparent_52%),radial-gradient(900px_circle_at_60%_85%,rgba(31,220,197,0.09),transparent_56%)]" />
      <div className="absolute -inset-32 opacity-60 blur-2xl bg-[conic-gradient(from_200deg_at_50%_50%,rgba(77,114,255,0.0),rgba(77,114,255,0.15),rgba(162,62,255,0.12),rgba(31,220,197,0.08),rgba(77,114,255,0.0))] animate-[spin_24s_linear_infinite]" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
    </div>
  );
}
