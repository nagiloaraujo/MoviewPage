"use client";

import React from "react";
import InfiniteCardsCarousel from "@/components/InfiniteCardsCarousel";

const values = [
  { title: "Missão", desc: "Transformar operações comerciais especializadas em resultado com IA, automação e mídia." },
  { title: "Visão", desc: "Ser a principal escolha em automação de IA e mídia para mercados de alta complexidade comercial." },
  { title: "Valores", desc: "Performance, clareza comercial, velocidade e obsessão por experiência." },
  { title: "Método", desc: "Dados → ação → aprendizado aplicado à rotina real do nicho." },
];

export default function Values() {
  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
          <div className="absolute -inset-32 opacity-70 blur-3xl bg-[radial-gradient(circle_at_25%_40%,rgba(41,171,255,0.14),transparent_60%),radial-gradient(circle_at_75%_35%,rgba(124,92,255,0.12),transparent_60%)]" />

          <div className="relative">
            <p className="text-xs tracking-[0.28em] text-white/55">MOVIEW</p>
            <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Fundamentos que sustentam a Moview em mercados especializados
            </h3>
            <p className="mt-3 max-w-3xl text-pretty text-base leading-7 text-white/65">
              Nossa proposta continua a mesma: unir IA, automação e mídia. O foco agora fica ainda mais claro para
              operações com jornada técnica, comercial e consultiva.
            </p>
          </div>

          <div className="relative mt-10">
            <InfiniteCardsCarousel items={values} speedPxPerSecond={36} className="-mx-2 px-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
