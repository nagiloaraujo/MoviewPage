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
    desc: "Fluxos para atendimento, orçamento e triagem comercial em operações consultivas.",
    color: "#29ABFF",
    icon: CpuChipIcon,
    image: "/solutions/solution-01.png",
  },
  {
    title: "Integrações Multicanal",
    desc: "WhatsApp, Instagram, site, CRM e rotina comercial conectados em um só fluxo.",
    color: "#7C5CFF",
    icon: ChatBubbleLeftRightIcon,
    image: "/solutions/solution-02.png",
  },
  {
    title: "IA para Vendas",
    desc: "Qualificação, follow-up, recompra e priorização de pedidos em tempo real.",
    color: "#20E3C2",
    icon: PresentationChartLineIcon,
    image: "/solutions/solution-03.png",
  },
  {
    title: "Mídia Inteligente",
    desc: "Campanhas para gerar demanda qualificada para fabricantes, revendas e distribuidores.",
    color: "#A23EFF",
    icon: BoltIcon,
    image: "/solutions/solution-04.png",
  },
  {
    title: "Produção de Conteúdo",
    desc: "Conteúdo técnico-comercial para linhas, aplicações, cores e diferenciais do seu portfólio.",
    color: "#29ABFF",
    icon: PencilSquareIcon,
    image: "/solutions/solution-05.png",
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
              Soluções desenhadas para acelerar atendimento, demanda e recompra
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-7 text-white/65">
              A Moview combina IA, automação e mídia para tornar atendimento, comercial e demanda mais previsiveis em
              mercados com jornada tecnica e decisao consultiva.
            </p>

            <div className="mt-8 hidden md:block">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <p className="mt-6 text-sm text-white/55">
                Todos os módulos conversam entre si para conectar captação, atendimento técnico, orçamento e recompra.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((it) => (
              <div
                key={it.title}
                data-card
                className="moview-solution-card group relative cursor-pointer overflow-hidden rounded-[26px] bg-white/5 backdrop-blur-xl transition-transform hover:scale-[1.02] active:scale-[0.995]"
              >
                <div className="moview-solution-card-media">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="moview-solution-card-image"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="moview-solution-card-veil" />
                <div
                  className="absolute -left-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${it.color}55, transparent 65%)`,
                  }}
                />
                <div className="moview-solution-card-content relative flex h-full flex-col">
                  <div className="moview-solution-card-main">
                    <div className="flex items-center justify-center">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25 shadow-[0_0_38px_rgba(41,171,255,0.14)]"
                        style={{ boxShadow: `0 0 40px ${it.color}33` }}
                      >
                        <it.icon className="h-5 w-5 text-white/80" />
                      </div>
                    </div>
                    <div className="mt-5 text-center text-lg font-semibold text-white">{it.title}</div>
                    <p className="mt-3 text-center text-pretty text-sm leading-6 text-white/65">{it.desc}</p>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                    <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/55">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: it.color }} />
                      <span>Integração imediata</span>
                    </div>
                  </div>

                  <div className="moview-solution-card-hover">
                    <div className="text-xl font-semibold text-white">{it.title}</div>
                    <div className="moview-solution-card-meta">MOVIEW</div>
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
