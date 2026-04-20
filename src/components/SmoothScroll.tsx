"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";

type LenisContextValue = {
  lenisRef: React.RefObject<Lenis | null>;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenis() {
  return useContext(LenisContext)?.lenisRef.current ?? null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const instance = new Lenis({
      lerp: 0.095,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.85,
      smoothWheel: true,
    });

    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo(() => ({ lenisRef }), []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
