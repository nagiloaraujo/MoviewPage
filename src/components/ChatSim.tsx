"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChatBubbleLeftRightIcon, CpuChipIcon } from "@heroicons/react/24/solid";

type Msg = {
  id: string;
  from: "ai" | "user";
  text: string;
};

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-white/55 animate-[moview-dot_1.1s_infinite]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/55 animate-[moview-dot_1.1s_0.18s_infinite]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/55 animate-[moview-dot_1.1s_0.36s_infinite]" />
      </span>
      <span className="h-3 w-px bg-white/60 animate-[moview-cursor_0.95s_steps(1)_infinite]" />
    </div>
  );
}

export default function ChatSim({
  className,
  simulate = true,
  allowInTest = false,
  maxTurns,
}: {
  className?: string;
  simulate?: boolean;
  allowInTest?: boolean;
  maxTurns?: number;
}) {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const script = useMemo(
    () => [
      {
        q: "Quero automatizar o WhatsApp. Por onde começo?",
        a: "Comece com triagem + qualificação. Eu integro com seus canais e entrego um fluxo pronto para conversão.",
      },
      {
        q: "Isso funciona com Instagram e site também?",
        a: "Sim. Multicanal com contexto único: mensagens, intenção e histórico conectados.",
      },
      {
        q: "Quanto tempo para ver resultado?",
        a: "Em geral, você percebe redução de tempo e aumento de respostas no primeiro ciclo. Depois otimizamos por dados.",
      },
      {
        q: "Preciso de CRM para usar?",
        a: "Não. Mas se você tiver, eu integro. Se não, criamos um pipeline leve para você acompanhar o funil.",
      },
    ],
    [],
  );

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "boot-ai",
      from: "ai",
      text: "Olá! Sou a IA da Moview. Me diga seu objetivo e eu monto o fluxo ideal.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [status, setStatus] = useState<"online" | "typing">("online");

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    if (!stickToBottomRef.current) return;

    const top = el.scrollHeight;
    el.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [messages.length, prefersReducedMotion, typing]);

  useEffect(() => {
    if (!simulate) return;
    if (prefersReducedMotion) return;
    if (process.env.NODE_ENV === "test" && !allowInTest) return;
    let cancelled = false;

    const run = async () => {
      let i = 0;
      await sleep(allowInTest ? 150 : 650);

      while (!cancelled && (maxTurns == null || i < maxTurns)) {
        const pair = script[i % script.length];

        await sleep(allowInTest ? 250 : rand(1100, 2100));
        if (cancelled) return;
        setMessages((prev) => {
          const next = prev.concat({ id: `u-${Date.now()}-${i}`, from: "user", text: pair.q });
          return next.length > 10 ? next.slice(-10) : next;
        });

        await sleep(allowInTest ? 180 : rand(450, 900));
        if (cancelled) return;
        setTyping(true);
        setStatus("typing");

        await sleep(allowInTest ? 260 : rand(900, 1700));
        if (cancelled) return;
        setTyping(false);
        setStatus("online");
        setMessages((prev) => {
          const next = prev.concat({ id: `a-${Date.now()}-${i}`, from: "ai", text: pair.a });
          return next.length > 10 ? next.slice(-10) : next;
        });

        i += 1;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [allowInTest, maxTurns, prefersReducedMotion, script, simulate]);

  return (
    <div className={["flex h-full flex-col", className].filter(Boolean).join(" ")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <CpuChipIcon className="h-4 w-4 text-white/80" />
          </div>
          <div className="text-sm font-medium text-white/85">Chat em tempo real</div>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/60">
          <span
            className={[
              "h-2 w-2 rounded-full",
              status === "typing"
                ? "bg-[#29ABFF] shadow-[0_0_16px_rgba(41,171,255,0.55)]"
                : "bg-[#20E3C2] shadow-[0_0_16px_rgba(32,227,194,0.55)]",
            ].join(" ")}
          />
          <span>{status === "typing" ? "IA digitando" : "Online"}</span>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="moview-hide-scrollbar mt-3 flex-1 overscroll-contain overflow-y-auto rounded-2xl border border-white/10 bg-black/20 px-3 py-3"
        onScroll={() => {
          const el = viewportRef.current;
          if (!el) return;
          const threshold = 28;
          stickToBottomRef.current = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
        }}
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
      >
        <div className="grid gap-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={[
                "max-w-[92%] rounded-2xl border border-white/10 px-3 py-2 text-sm text-white/85 transition-all duration-1000",
                !prefersReducedMotion ? "animate-[moview-pop_1.2s_ease-out]" : "",
                m.from === "ai" ? "bg-black/20" : "ml-auto bg-white/5 text-right",
              ].join(" ")}
            >
              {m.text}
            </div>
          ))}

          {typing ? (
            <div
              className={[
                "max-w-[70%] rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/85 transition-all duration-1000",
                !prefersReducedMotion ? "animate-[moview-pop_1.2s_ease-out]" : "",
              ].join(" ")}
            >
              <TypingIndicator />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-white/55">
        <div className="flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="h-4 w-4 text-white/55" />
          <span>Loop contínuo · Respostas variáveis</span>
        </div>
        <span>{status === "typing" ? "processando…" : "pronto"}</span>
      </div>
    </div>
  );
}
