"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

type LenisContextValue = {
  lenisRef: React.RefObject<Lenis | null>;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenis() {
  return useContext(LenisContext)?.lenisRef.current ?? null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;

    const storedTarget = window.sessionStorage.getItem("moview:scroll-target");
    const target = storedTarget || window.location.hash || null;
    if (!target) return;

    const id = target.replace("#", "");
    const clearTarget = () => {
      window.sessionStorage.removeItem("moview:scroll-target");
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    let attempts = 0;
    const tryScroll = () => {
      attempts += 1;
      const el = document.getElementById(id);
      if (!el) {
        if (attempts < 30) window.setTimeout(tryScroll, 50);
        return;
      }

      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(el, { offset: -110, duration: 1.25 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      clearTarget();
    };

    tryScroll();
  }, [pathname]);

  const value = useMemo(() => ({ lenisRef }), []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
