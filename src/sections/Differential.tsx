"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export default function Differential() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current!;

    const ctx = gsap.context(() => {
      gsap.from("[data-dif='in']", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
        },
      });

      gsap.to("[data-dif='pulse']", {
        scale: 1.06,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          <div className="absolute -inset-32 opacity-70 blur-3xl bg-[radial-gradient(circle_at_25%_30%,rgba(41,171,255,0.18),transparent_60%),radial-gradient(circle_at_70%_35%,rgba(124,92,255,0.16),transparent_60%),radial-gradient(circle_at_55%_85%,rgba(32,227,194,0.12),transparent_58%)]" />

          <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="grid gap-4">
              <p data-dif="in" className="text-xs tracking-[0.28em] text-white/55">
                DIFERENCIAL
              </p>
              <h3 data-dif="in" className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
                A Moview é a melhor escolha para unir IA, atendimento e mídia em operações comerciais especializadas.
              </h3>
              <p data-dif="in" className="max-w-2xl text-pretty text-base leading-7 text-white/65">
                Dados, automações e mídia trabalhando juntos para transformar atendimento técnico, demanda comercial e
                recompra em receita previsível para fabricantes, distribuidores e revendas.
              </p>
            </div>

            <div className="relative">
              <svg viewBox="0 0 380 260" className="h-[260px] w-full" aria-hidden>
                <defs>
                  <linearGradient id="difGrad" x1="0" y1="0" x2="380" y2="260" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#29ABFF" stopOpacity="0.95" />
                    <stop offset="0.55" stopColor="#7C5CFF" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#20E3C2" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                <path
                  d="M40 190 C 90 70, 150 70, 190 130 S 290 220, 340 80"
                  stroke="url(#difGrad)"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.65"
                />
                {[
                  [40, 190],
                  [110, 95],
                  [190, 130],
                  [270, 195],
                  [340, 80],
                ].map(([cx, cy], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="7" fill="#EAF2FF" opacity="0.95" />
                    <circle
                      data-dif="pulse"
                      cx={cx}
                      cy={cy}
                      r="12"
                      fill="none"
                      stroke="rgba(234,242,255,0.18)"
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </svg>
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_30%_30%,rgba(41,171,255,0.10),transparent_62%)] blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
