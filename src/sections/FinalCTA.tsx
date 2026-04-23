"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { moviewWhatsAppHref } from "@/lib/whatsapp";

export default function FinalCTA() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current!;

    const ctx = gsap.context(() => {
      gsap.from("[data-cta='in']", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} id="contato" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl md:p-14">
          <div className="absolute -inset-40 opacity-80 blur-3xl bg-[radial-gradient(circle_at_20%_30%,rgba(41,171,255,0.20),transparent_60%),radial-gradient(circle_at_70%_25%,rgba(124,92,255,0.18),transparent_60%),radial-gradient(circle_at_55%_85%,rgba(32,227,194,0.14),transparent_58%)]" />

          <div className="relative grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="grid gap-4">
              <p data-cta="in" className="text-xs tracking-[0.28em] text-white/55">
                CTA FINAL
              </p>
              <h3 data-cta="in" className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Pronto para transformar sua operação em uma máquina de atendimento e demanda?
              </h3>
              <p data-cta="in" className="max-w-2xl text-pretty text-base leading-7 text-white/65">
                Comece com um diagnóstico rápido para identificar onde IA, automação e mídia podem acelerar orçamento,
                recompra e relacionamento no seu setor.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                data-cta="in"
                href={moviewWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(41,171,255,0.38),rgba(124,92,255,0.34),rgba(32,227,194,0.28))] blur-md" />
                <span className="absolute inset-0 rounded-full border border-white/15 bg-white/5" />
                <span className="relative">Quero falar com a Moview</span>
              </a>
              <a
                data-cta="in"
                href={moviewWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-black/20 px-6 text-sm font-medium text-white/85 transition hover:bg-black/30 hover:text-white"
              >
                Falar com especialista
              </a>

              <div data-cta="in" className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/65">
                Resposta rapida · Fluxos consultivos · Metricas, midia e otimizacao continua
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
