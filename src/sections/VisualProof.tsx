"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type Msg = { from: "ia" | "user"; text: string };

export default function VisualProof() {
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartPathRef = useRef<SVGPathElement | null>(null);
  const rafRef = useRef(0);
  const gradId = useId().replace(/:/g, "");
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);
  const supportsIO = typeof window !== "undefined" && typeof IntersectionObserver !== "undefined";
  const supportsRAF = typeof window !== "undefined" && typeof window.requestAnimationFrame === "function";
  const fallbackStatic = prefersReducedMotion || !supportsIO || !supportsRAF;

  const all = useMemo<Msg[]>(
    () => [
      { from: "user", text: "Oi! Vocês têm atendimento 24h?" },
      { from: "ia", text: "Sim. Posso te ajudar agora: qual seu segmento e volume de mensagens/dia?" },
      { from: "user", text: "Clínica. Recebemos muitas dúvidas e agendamentos." },
      { from: "ia", text: "Perfeito. Posso automatizar triagem, agendamento e follow-up com integração no seu sistema." },
      { from: "ia", text: "Quer começar com WhatsApp + site e expandir depois?" },
    ],
    [],
  );

  const [count, setCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return prefersReducedMotion ? all.length : 0;
  });
  const [dashboardInView, setDashboardInView] = useState(fallbackStatic);
  const [chartInView, setChartInView] = useState(fallbackStatic);
  const [dashboardProgress, setDashboardProgress] = useState(fallbackStatic ? 1 : 0);
  const [chartProgress, setChartProgress] = useState(fallbackStatic ? 1 : 0);
  const [pathLength, setPathLength] = useState(360);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const t = window.setInterval(() => {
      setCount((c) => {
        if (c >= all.length) return c;
        return c + 1;
      });
    }, 900);
    return () => window.clearInterval(t);
  }, [all.length, prefersReducedMotion]);

  useEffect(() => {
    const path = chartPathRef.current;
    if (!path || typeof path.getTotalLength !== "function") return;
    setPathLength(path.getTotalLength());
  }, []);

  useEffect(() => {
    if (fallbackStatic) return;

    const dashboardEl = dashboardRef.current;
    const chartEl = chartRef.current;
    if (!dashboardEl || !chartEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          if (entry.target === dashboardEl) setDashboardInView(isVisible);
          if (entry.target === chartEl) setChartInView(isVisible);
        });
      },
      { threshold: 0.08 },
    );

    observer.observe(dashboardEl);
    observer.observe(chartEl);

    return () => observer.disconnect();
  }, [fallbackStatic]);

  useEffect(() => {
    if (fallbackStatic) return;
    if (!dashboardInView && !chartInView) {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(() => {
        setDashboardProgress(0);
        setChartProgress(0);
        rafRef.current = 0;
      });
      return;
    }

    const computeProgress = (el: HTMLElement | null) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.92;
      const end = vh * 0.22;
      const raw = (start - rect.top) / (start - end);
      return Math.max(0, Math.min(1, raw));
    };

    const update = () => {
      setDashboardProgress(dashboardInView ? computeProgress(dashboardRef.current) : 0);
      setChartProgress(chartInView ? computeProgress(chartRef.current) : 0);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [chartInView, dashboardInView, fallbackStatic]);

  const metrics = useMemo(
    () => [
      { label: "Resposta", suffix: "s", target: 6, width: 82, color: "#29ABFF" },
      { label: "Agendamentos", prefix: "+", suffix: "%", target: 19, width: 66, color: "#20E3C2" },
      { label: "ROI", suffix: "x", target: 3.4, width: 74, color: "#7C5CFF" },
    ],
    [],
  );

  const metricText = (label: string, value: number) => {
    if (label === "ROI") return `${value.toFixed(1)}x`;
    if (label === "Agendamentos") return `+${Math.round(value)}%`;
    return `${Math.round(value)}s`;
  };

  const chartPoints = useMemo(
    () => [
      { x: 10, y: 62, threshold: 0.02 },
      { x: 60, y: 54, threshold: 0.22 },
      { x: 92, y: 46, threshold: 0.36 },
      { x: 120, y: 40, threshold: 0.5 },
      { x: 200, y: 24, threshold: 0.72 },
      { x: 290, y: 14, threshold: 0.95 },
    ],
    [],
  );

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="grid gap-4">
            <p className="text-xs tracking-[0.28em] text-white/55">PROVA VISUAL</p>
            <h3 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Atendimento automático + visão clara de resultados
            </h3>
            <p className="max-w-xl text-pretty text-base leading-7 text-white/65">
              Uma experiência que parece viva: mensagens surgem, métricas reagem e o funil se move sem esforço.
            </p>
          </div>

          <div className="relative grid gap-4">
            <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-white/85">Chat automático</div>
                <div className="text-xs text-white/55">online</div>
              </div>

              <div className="grid gap-2">
                {all.slice(0, count).map((m, i) => (
                  <div
                    key={i}
                    className={[
                      "max-w-[92%] rounded-2xl border border-white/10 px-3 py-2 text-sm text-white/85 transition-opacity",
                      m.from === "ia" ? "bg-black/20" : "ml-auto bg-white/5",
                    ].join(" ")}
                    style={{ opacity: 1 }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={dashboardRef}
              className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-white/85">Dashboard</div>
                <div className="text-xs text-white/55">últimos 7 dias</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {metrics.map((k) => (
                  <div key={k.label} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                    <div className="text-[11px] text-white/55">{k.label}</div>
                    <div className="mt-1 text-lg font-semibold text-white">
                      {metricText(k.label, k.target * dashboardProgress)}
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-[width] duration-200 ease-out"
                        style={{
                          width: `${k.width * dashboardProgress}%`,
                          background: `linear-gradient(90deg, ${k.color}cc, ${k.color}33)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                ref={chartRef}
                className="relative mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="absolute -inset-24 opacity-80 blur-3xl bg-[radial-gradient(circle_at_30%_40%,rgba(41,171,255,0.14),transparent_60%),radial-gradient(circle_at_70%_30%,rgba(124,92,255,0.12),transparent_60%)]" />
                <div className="relative grid gap-2">
                  <div className="text-xs tracking-[0.22em] text-white/55">CRESCIMENTO</div>
                  <div className="h-24 w-full">
                    <svg viewBox="0 0 300 80" className="h-full w-full" aria-hidden>
                      <path
                        d="M10 62 C 60 54, 92 46, 120 40 S 200 24, 290 14"
                        stroke="rgba(234,242,255,0.22)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <g
                        style={{
                          opacity: chartProgress,
                          transform: `translateY(${(1 - chartProgress) * 14}px)`,
                          transformOrigin: "center bottom",
                        }}
                      >
                        <path
                          ref={chartPathRef}
                          d="M10 62 C 60 54, 92 46, 120 40 S 200 24, 290 14"
                          stroke={`url(#${gradId}-vpGrad)`}
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={pathLength}
                          strokeDashoffset={pathLength * (1 - chartProgress)}
                        />
                      </g>
                      {chartPoints.map((p, i) => {
                        const local = Math.max(0, Math.min(1, (chartProgress - p.threshold) / 0.1));
                        const opacity = 0.15 + local * 0.85;
                        const scale = 0.7 + local * 0.3;
                        return (
                          <circle
                            key={`${p.x}-${p.y}-${i}`}
                            cx={p.x}
                            cy={p.y}
                            r="3.4"
                            fill="#EAF2FF"
                            opacity={opacity}
                            style={{
                              transformOrigin: `${p.x}px ${p.y}px`,
                              transform: `scale(${scale})`,
                            }}
                          />
                        );
                      })}
                      <defs>
                        <linearGradient
                          id={`${gradId}-vpGrad`}
                          x1="0"
                          y1="0"
                          x2="300"
                          y2="80"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#29ABFF" />
                          <stop offset="0.6" stopColor="#7C5CFF" />
                          <stop offset="1" stopColor="#20E3C2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>Atendimento</span>
                    <span className="text-white/75">↗ Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
