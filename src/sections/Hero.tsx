"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "@/components/SmoothScroll";
import ChatSim from "@/components/ChatSim";
import { moviewWhatsAppHref } from "@/lib/whatsapp";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [shouldAvoidHeavyMedia, setShouldAvoidHeavyMedia] = useState(false);

  useEffect(() => {
    type NavigatorWithConnection = Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const conn = (navigator as NavigatorWithConnection).connection;
    const saveData = !!conn?.saveData;
    const effectiveType = (conn?.effectiveType ?? "").toLowerCase();
    const slow = effectiveType === "slow-2g" || effectiveType === "2g";
    const smallScreen = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;

    setPrefersReducedMotion(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false);
    setShouldAvoidHeavyMedia(saveData || slow || smallScreen);
  }, []);

  const videoEnabled = !prefersReducedMotion && !shouldAvoidHeavyMedia;

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current!;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero='in']", {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });

      gsap.to("[data-hero='float']", {
        y: -16,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to("[data-hero='orb']", {
        rotate: 360,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!videoEnabled) return;

    const ioSupported = typeof IntersectionObserver !== "undefined";
    if (!ioSupported) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(!!entry?.isIntersecting);
      },
      { root: null, threshold: 0.15 },
    );

    io.observe(root);
    return () => io.disconnect();
  }, [videoEnabled]);

  useEffect(() => {
    if (!videoEnabled || !videoOk) return;
    if (!isInView) {
      const v = videoRef.current;
      if (v && !v.paused) {
        v.pause();
      }
      return;
    }

    const t = window.setTimeout(() => setVideoSrc("/hero-bg.mp4"), 80);
    return () => window.clearTimeout(t);
  }, [videoEnabled, videoOk, isInView]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!videoEnabled || !videoOk) return;
    if (!isInView) return;
    if (!videoSrc) return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
      }
    };

    tryPlay();
  }, [videoEnabled, videoOk, isInView, videoSrc]);

  const goTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -110, duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={rootRef}
      id="inicio"
      className="relative isolate overflow-hidden pt-28 md:pt-32 min-h-screen min-h-[100svh]"
    >
      <div aria-hidden className="absolute inset-0 z-0">
        {videoEnabled && videoOk ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-fallback.svg"
            onError={() => setVideoOk(false)}
            suppressHydrationWarning
            className="h-full w-full object-cover opacity-55"
            src={videoSrc ?? undefined}
          />
        ) : (
          <Image
            src="/hero-fallback.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_20%,rgba(41,171,255,0.22),transparent_55%),radial-gradient(820px_circle_at_82%_14%,rgba(162,62,255,0.18),transparent_52%),radial-gradient(900px_circle_at_60%_85%,rgba(32,227,194,0.14),transparent_56%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/18 to-black/62" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="relative z-10 grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-12">
          <div className="relative">
            <div className="absolute -left-6 -bottom-10 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(41,171,255,0.22),transparent_70%)] blur-2xl" />
            <p
              data-hero="in"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-white/75"
            >
              IA · Automação · Mídia especializada
            </p>
            <h1
              data-hero="in"
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl"
            >
              A melhor automação de IA e mídia de performance para fabricantes, distribuidores e revendas
            </h1>
            <p data-hero="in" className="mt-5 max-w-xl text-pretty text-lg leading-8 text-white/70">
              A Moview é a parceira ideal para operações comerciais técnicas que precisam automatizar atendimento,
              comercial e mídia sem perder contexto, velocidade e profundidade em mercados de tintas e revestimentos.
            </p>

            <div data-hero="in" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={moviewWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(41,171,255,0.34),rgba(124,92,255,0.32),rgba(32,227,194,0.26))] blur-md" />
                <span className="absolute inset-0 rounded-full border border-white/15 bg-white/5" />
                <span className="relative">Quero levar IA para minha operação</span>
              </a>
              <a
                href="#como-funciona"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("#como-funciona");
                }}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-black/20 px-6 text-sm font-medium text-white/80 transition hover:bg-black/30 hover:text-white"
              >
                Ver como funciona
              </a>
            </div>

            <div data-hero="in" className="mt-10 flex items-center gap-4 text-sm text-white/55">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="tracking-[0.18em] uppercase">scroll</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-12 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(162,62,255,0.22),transparent_70%)] blur-2xl" />

            <div
              data-hero="float"
              className="moview-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(41,171,255,0.15)] backdrop-blur-xl md:h-[38rem]"
            >
              <div className="absolute -inset-12 opacity-70 blur-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(41,171,255,0.40),transparent_60%),radial-gradient(circle_at_70%_30%,rgba(124,92,255,0.32),transparent_58%),radial-gradient(circle_at_40%_80%,rgba(32,227,194,0.26),transparent_58%)]" />

              <div className="relative flex h-full w-full flex-col gap-4">
                <div className="moview-panel-header flex items-center justify-between">
                  <div className="moview-panel-title text-sm font-medium text-white/80">Painel Moview</div>
                  <div className="moview-panel-status flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#20E3C2] shadow-[0_0_16px_rgba(32,227,194,0.55)]" />
                    <span className="text-xs text-white/60">Ativo</span>
                  </div>
                </div>

                <div className="moview-panel-chat relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-4 md:h-[26.25rem]">
                  <ChatSim className="h-full" allowInTest />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Orçamentos", value: "+38%", glow: "rgba(41,171,255,0.25)" },
                    { label: "Tempo", value: "-62%", glow: "rgba(124,92,255,0.25)" },
                    { label: "Recompra", value: "+24%", glow: "rgba(32,227,194,0.22)" },
                  ].map((k) => (
                    <div
                      key={k.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-xl"
                      style={{ boxShadow: `0 0 40px ${k.glow}` }}
                    >
                      <div className="text-[11px] tracking-wide text-white/55">{k.label}</div>
                      <div className="mt-1 text-lg font-semibold text-white">{k.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-hero="orb"
              className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(41,171,255,0.55),rgba(41,171,255,0.0)_70%)] shadow-[0_0_55px_rgba(41,171,255,0.22)]"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
