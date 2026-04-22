"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function RotatingSlogans() {
  const slogans = useMemo(
    () => [
      "IA e mídia para operações comerciais especializadas",
      "Automação que vende. Atendimento que escala no seu mercado",
      "Mais orçamento, mais recompra, mais contexto comercial",
      "Moview: atendimento inteligente para jornadas consultivas",
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setPhase("out");
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % slogans.length);
        setPhase("in");
      }, 240);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [slogans.length]);

  return (
    <div className="relative py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
          <div className="absolute -inset-20 opacity-70 blur-3xl bg-[radial-gradient(circle_at_40%_40%,rgba(41,171,255,0.14),transparent_65%),radial-gradient(circle_at_70%_30%,rgba(124,92,255,0.12),transparent_62%)]" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="hidden text-xs tracking-[0.28em] text-white/55 md:block">MOVIEW</div>
            <div className="flex-1 text-center">
              <div
                className={[
                  "text-sm font-medium tracking-wide text-white transition-all",
                  phase === "in" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
                ].join(" ")}
              >
                {slogans[idx]}
              </div>
            </div>
            <div className="hidden text-xs tracking-[0.28em] text-white/55 md:block">IA · AUTOMAÇÃO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
