"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function NarrativeShift() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current!;

    const ctx = gsap.context(() => {
      gsap.set("[data-shift='a']", { opacity: 1, y: 0 });
      gsap.set("[data-shift='b']", { opacity: 0, y: 12 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 0.9,
          },
        })
        .to("[data-shift='a']", { opacity: 0, y: -10, ease: "none" }, 0)
        .to("[data-shift='b']", { opacity: 1, y: 0, ease: "none" }, 0.1)
        .to("[data-shift='line']", { scaleX: 1, opacity: 1, ease: "none" }, 0.05);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
          <div className="absolute -inset-24 opacity-70 blur-3xl bg-[radial-gradient(circle_at_20%_40%,rgba(41,171,255,0.18),transparent_60%),radial-gradient(circle_at_70%_30%,rgba(124,92,255,0.16),transparent_60%),radial-gradient(circle_at_55%_85%,rgba(32,227,194,0.12),transparent_58%)]" />

          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 shadow-[0_0_50px_rgba(41,171,255,0.18)]">
                <SparklesIcon className="h-5 w-5 text-white/80" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="mt-6 grid gap-3">
              <div className="relative min-h-[92px]">
                <p
                  data-shift="a"
                  className="absolute inset-0 text-balance text-2xl font-semibold leading-tight text-white md:text-3xl"
                >
                  Operações comerciais complexas perdem orçamento, pedido e recompra todos os dias...
                </p>
                <p
                  data-shift="b"
                  className="absolute inset-0 text-balance text-2xl font-semibold leading-tight text-white md:text-3xl"
                >
                  A Moview resolve isso com IA, automação e mídia inteligente.
                </p>
              </div>

              <div className="relative h-px w-full overflow-hidden">
                <div
                  data-shift="line"
                  className="absolute inset-0 origin-left scale-x-0 opacity-0 bg-gradient-to-r from-[#29ABFF] via-[#7C5CFF] to-[#20E3C2]"
                />
              </div>

              <p className="max-w-3xl text-pretty text-base leading-7 text-white/65">
                Da captação ao pós-venda: um fluxo contínuo para fabricantes, distribuidores e revendas
                especializadas, com atendimento 24 horas, mídia orientada por intenção e aprendizado constante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
