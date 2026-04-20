"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export default function FloatingDecor() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
        const speed = Number(el.dataset.speed || "0.45");
        gsap.to(el, {
          yPercent: -22,
          duration: 6 + speed * 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(el, {
          y: () => -window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none fixed inset-0 z-10">
      <div
        data-float
        data-speed="0.35"
        className="absolute left-[6%] top-[18%] h-36 w-36 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(41,171,255,0.55),rgba(41,171,255,0.0)_65%)] blur-[1px] opacity-70"
      />
      <div
        data-float
        data-speed="0.55"
        className="absolute right-[8%] top-[22%] h-52 w-52 rounded-[48px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(124,92,255,0.18)] opacity-70"
      />
      <div
        data-float
        data-speed="0.25"
        className="absolute left-[20%] top-[62%] h-28 w-28 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(32,227,194,0.45),rgba(32,227,194,0.0)_70%)] opacity-70"
      />
      <div
        data-float
        data-speed="0.65"
        className="absolute right-[18%] top-[70%] h-44 w-44 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(162,62,255,0.42),rgba(162,62,255,0.0)_68%)] opacity-60"
      />
    </div>
  );
}

