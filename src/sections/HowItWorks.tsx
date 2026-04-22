"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import {
  ArrowTrendingUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CpuChipIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";

const steps = [
  {
    title: "Atrai",
    desc: "Mídia e conteúdo para atrair revendas, distribuidores, representantes e demandas qualificadas.",
    accent: "rgba(41,171,255,0.35)",
    icon: MegaphoneIcon,
  },
  {
    title: "Engaja",
    desc: "Conversas guiadas sobre linhas, aplicações, disponibilidade e próximo passo comercial.",
    accent: "rgba(124,92,255,0.35)",
    icon: ChatBubbleOvalLeftEllipsisIcon,
  },
  {
    title: "Atende",
    desc: "IA responde rápido, qualifica orçamento e organiza atendimento técnico sem fricção.",
    accent: "rgba(32,227,194,0.30)",
    icon: CpuChipIcon,
  },
  {
    title: "Converte",
    desc: "Pedidos, follow-ups, recompra e CRM trabalhando com mais previsibilidade.",
    accent: "rgba(162,62,255,0.28)",
    icon: ArrowTrendingUpIcon,
  },
];

export default function HowItWorks() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;

    const ctx = gsap.context(() => {
      const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 1;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.9,
        },
      });

      gsap.from("[data-step]", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} id="como-funciona" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative">
          <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(41,171,255,0.16),transparent_70%)] blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(124,92,255,0.14),transparent_70%)] blur-3xl" />

          <div className="relative flex flex-col gap-4">
            <p className="text-xs tracking-[0.28em] text-white/55">COMO FUNCIONA</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Um fluxo contínuo para operações comerciais técnicas, do primeiro toque à recompra
            </h2>
            <p className="max-w-3xl text-pretty text-base leading-7 text-white/65">
              Atrai → Engaja → Atende → Converte. Tudo conectado para fabricantes, distribuidores e revendas, com
              automações que evoluem conforme seus dados.
            </p>
          </div>

          <div className="relative mt-12 grid gap-7 md:mt-16">
            <svg
              className="absolute left-0 top-0 h-full w-full"
              viewBox="0 0 1200 520"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1200" y2="520" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#29ABFF" stopOpacity="0.9" />
                  <stop offset="0.5" stopColor="#7C5CFF" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#20E3C2" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d="M120 120 C 300 30, 420 180, 600 120 S 900 210, 1080 120
                   M120 400 C 300 310, 420 460, 600 400 S 900 490, 1080 400"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                fill="none"
                opacity="0.65"
              />
            </svg>

            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((s, idx) => (
                <div
                  key={s.title}
                  data-step
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform hover:scale-[1.01]"
                  style={{ boxShadow: `0 0 70px ${s.accent}` }}
                >
                  <div className="absolute -inset-20 opacity-60 blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
                  <div className="relative flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
                      <s.icon className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-xl font-semibold text-white">{s.title}</div>
                        <div className="text-xs tracking-[0.22em] text-white/50">0{idx + 1}</div>
                      </div>
                      <p className="mt-2 text-pretty text-sm leading-6 text-white/65">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
