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
      <span className="text-[0.8125rem] font-medium tracking-[0.08em] text-white/72">digitando</span>
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-white/55 animate-[moview-dot_2.6s_ease-in-out_infinite]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/55 animate-[moview-dot_2.6s_ease-in-out_0.45s_infinite]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/55 animate-[moview-dot_2.6s_ease-in-out_0.9s_infinite]" />
      </span>
      <span className="h-3 w-px bg-white/60 animate-[moview-cursor_3s_steps(1)_infinite]" />
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const script = useMemo(
    () => [
      {
        q: "Somos uma operação comercial técnica. Por onde a automação deve começar?",
        a: "Comece por triagem comercial, catálogo no WhatsApp e qualificação de pedidos. Assim você ganha velocidade sem perder contexto.",
      },
      {
        q: "Isso funciona com representantes, site e Instagram?",
        a: "Sim. A operação fica unificada: canais, intenção, histórico e repasse comercial organizados em um só fluxo.",
      },
      {
        q: "Onde a Moview mais ajuda em jornadas consultivas?",
        a: "Em atendimento, orçamento, recompra e mídia. A IA acelera resposta e a automação reduz gargalos do comercial.",
      },
      {
        q: "Preciso trocar meu CRM para usar?",
        a: "Não. Se você já usa CRM, integramos. Se não usa, a Moview organiza um fluxo leve para acompanhar pedidos e oportunidades.",
      },
    ],
    [],
  );

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "boot-ai",
      from: "ai",
      text: "Olá! Sou a IA da Moview. Posso montar um fluxo ideal para sua operação comercial.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [status, setStatus] = useState<"online" | "typing">("online");

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const messagesLenRef = useRef(0);

  useEffect(() => {
    messagesLenRef.current = messages.length;
  }, [messages.length]);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    // Keep the latest exchange visible without letting the outer panel grow.
    const top = el.scrollHeight;
    el.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [messages.length, prefersReducedMotion, typing]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setTyping(true);
    setStatus("typing");
    const timeout = window.setTimeout(() => {
      setTyping((prev) => (messagesLenRef.current <= 1 && prev ? false : prev));
      setStatus((prev) => (messagesLenRef.current <= 1 && prev === "typing" ? "online" : prev));
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!simulate) return;
    if (prefersReducedMotion) return;
    if (process.env.NODE_ENV === "test" && !allowInTest) return;
    let cancelled = false;

    const run = async () => {
      const fastTimings = process.env.NODE_ENV === "test" && allowInTest;
      let i = 0;
      await sleep(fastTimings ? 150 : 1400);

      while (!cancelled && (maxTurns == null || i < maxTurns)) {
        const pair = script[i % script.length];

        await sleep(fastTimings ? 250 : rand(3400, 4600));
        if (cancelled) return;
        setMessages((prev) => {
          const next = prev.concat({ id: `u-${Date.now()}-${i}`, from: "user", text: pair.q });
          return next.length > 10 ? next.slice(-10) : next;
        });

        setTyping(true);
        setStatus("typing");

        await sleep(fastTimings ? 260 : rand(3400, 4600));
        if (cancelled) return;
        setTyping(false);
        setStatus("online");
        setMessages((prev) => {
          const next = prev.concat({ id: `a-${Date.now()}-${i}`, from: "ai", text: pair.a });
          return next.length > 10 ? next.slice(-10) : next;
        });

        await sleep(fastTimings ? 180 : rand(3200, 4200));
        if (cancelled) return;
        i += 1;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [allowInTest, maxTurns, prefersReducedMotion, script, simulate]);

  const renderBubble = (m: Msg, keyPrefix = "") => (
    <div
      key={`${keyPrefix}${m.id}`}
      className={[
        "moview-chat-bubble max-w-[92%] rounded-2xl border border-white/10 px-3 py-2 text-left text-sm text-white/85 transition-all duration-[3200ms] ease-in-out",
        !prefersReducedMotion ? "animate-[moview-pop_3.4s_ease-in-out]" : "",
        m.from === "ai" ? "bg-black/20" : "ml-auto bg-white/5 text-right",
      ].join(" ")}
    >
      {m.text}
    </div>
  );

  const renderTypingBubble = (key: string) => (
    <div
      key={key}
      className={[
        "moview-chat-bubble max-w-[70%] rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-white/85 transition-all duration-[3200ms] ease-in-out",
        !prefersReducedMotion ? "animate-[moview-pop_3.4s_ease-in-out]" : "",
      ].join(" ")}
    >
      <TypingIndicator />
    </div>
  );

  return (
    <div className={["flex h-full min-h-0 flex-col overflow-hidden", className].filter(Boolean).join(" ")}>
      <div className="moview-chat-header flex flex-wrap items-center justify-between gap-2">
        <div className="moview-chat-headerTitle flex min-w-0 items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <CpuChipIcon className="h-4 w-4 text-white/80" />
          </div>
          <div className="text-sm font-medium text-white/85">Chat em tempo real</div>
        </div>

        <div className="moview-chat-headerStatus flex items-center gap-2 text-xs text-white/60">
          <span
            className={[
              "h-2 w-2 rounded-full",
              status === "typing"
                ? "bg-[#29ABFF] shadow-[0_0_16px_rgba(41,171,255,0.55)]"
                : "bg-[#20E3C2] shadow-[0_0_16px_rgba(32,227,194,0.55)]",
            ].join(" ")}
          />
          <span>{status === "typing" ? "IA digitando..." : "Online"}</span>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="moview-chat-viewport moview-hide-scrollbar mt-3 flex-1 overscroll-contain overflow-y-auto rounded-2xl border border-white/10 bg-black/20 px-3 py-3"
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-full flex-col justify-end gap-2">
          {messages.map((m) => renderBubble(m))}
          {typing ? renderTypingBubble("desktop-typing") : null}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-white/55">
        <div className="flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="h-4 w-4 text-white/55" />
          <span>Fluxo consultivo · Respostas variaveis</span>
        </div>
        <span>{status === "typing" ? "digitando..." : "pronto"}</span>
      </div>
    </div>
  );
}
