"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  PencilSquareIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";

const items = [
  {
    title: "Automação com IA",
    desc: "Fluxos inteligentes que atendem, qualificam e resolvem em escala.",
    color: "#29ABFF",
    icon: CpuChipIcon,
  },
  {
    title: "Integrações Multicanal",
    desc: "WhatsApp, Instagram, site, CRM e APIs — tudo conectado.",
    color: "#7C5CFF",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "IA para Vendas",
    desc: "Qualificação, follow-up e priorização de leads em tempo real.",
    color: "#20E3C2",
    icon: PresentationChartLineIcon,
  },
  {
    title: "Mídia Inteligente",
    desc: "Criativos e distribuição orientados por performance e intenção.",
    color: "#A23EFF",
    icon: BoltIcon,
  },
  {
    title: "Produção de Conteúdo",
    desc: "Conteúdos com ritmo, consistência e foco em conversão.",
    color: "#29ABFF",
    icon: PencilSquareIcon,
  },
];

export default function Products() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current!;

    const ctx = gsap.context(() => {
      gsap.from("[data-card]", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} id="solucoes" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-xs tracking-[0.28em] text-white/55">NOSSAS SOLUÇÕES</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Produtos que se encaixam no seu funil sem quebrar o fluxo
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-7 text-white/65">
              Cards interativos, bordas vivas e glow sutil: tecnologia avançada com estética limpa e sofisticada.
            </p>

            <div className="mt-8 hidden md:block">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <p className="mt-6 text-sm text-white/55">
                Todos os módulos conversam entre si, criando uma experiência contínua do primeiro contato ao fechamento.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((it) => (
              <div
                key={it.title}
                data-card
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform hover:scale-[1.02] active:scale-[0.995]"
              >
                <div
                  className="absolute -left-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${it.color}55, transparent 65%)`,
                  }}
                />
                <div className="absolute inset-0 rounded-[26px] ring-1 ring-white/5 transition-colors group-hover:ring-white/10" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25 shadow-[0_0_38px_rgba(41,171,255,0.14)]"
                      style={{ boxShadow: `0 0 40px ${it.color}33` }}
                    >
                      <it.icon className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="text-xs tracking-[0.22em] text-white/45">MOVIEW</div>
                  </div>
                  <div className="mt-5 text-lg font-semibold text-white">{it.title}</div>
                  <p className="mt-2 text-pretty text-sm leading-6 text-white/65">{it.desc}</p>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="mt-4 flex items-center gap-2 text-xs text-white/55">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: it.color }} />
                    <span>Integração imediata</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
