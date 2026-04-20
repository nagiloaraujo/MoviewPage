"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CardItem = {
  title: string;
  desc: string;
  footer?: string;
};

type InfiniteCardsCarouselProps = {
  items: CardItem[];
  speedPxPerSecond?: number;
  className?: string;
};

const DEFAULT_FOOTER = "Movimento constante, sem perder elegancia.";

export default function InfiniteCardsCarousel({
  items,
  speedPxPerSecond = 34,
  className = "",
}: InfiniteCardsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef(0);
  const halfWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const [hovered, setHovered] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const duplicated = useMemo(() => items.concat(items), [items]);

  const normalizeOffset = useCallback((value: number) => {
    const half = halfWidthRef.current;
    if (half <= 0) return value;

    let next = value;
    while (next <= -half) next += half;
    while (next > 0) next -= half;
    return next;
  }, []);

  const applyOffset = useCallback((value: number) => {
    const track = trackRef.current;
    if (!track) return;
    offsetRef.current = normalizeOffset(value);
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, [normalizeOffset]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateMetrics = () => {
      const width = track.scrollWidth;
      halfWidthRef.current = width / 2;
      applyOffset(offsetRef.current);
    };

    updateMetrics();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateMetrics);
      return () => window.removeEventListener("resize", updateMetrics);
    }

    const ro = new ResizeObserver(() => updateMetrics());
    ro.observe(track);
    window.addEventListener("resize", updateMetrics);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMetrics);
    };
  }, [applyOffset, duplicated.length]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!hovered && !pointerDown && !draggingRef.current) {
        applyOffset(offsetRef.current - speedPxPerSecond * dt);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [applyOffset, hovered, pointerDown, prefersReducedMotion, speedPxPerSecond]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    draggingRef.current = true;
    setPointerDown(true);
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    viewport.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    applyOffset(dragStartOffsetRef.current + dx);
  };

  const endDrag = () => {
    draggingRef.current = false;
    setPointerDown(false);
  };

  return (
    <div
      ref={viewportRef}
      className={`relative overflow-hidden ${className}`}
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        if (pointerDown) endDrag();
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#081225]/85 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#081225]/85 to-transparent" />

      <div
        ref={trackRef}
        className="flex w-max gap-4 will-change-transform"
        aria-label="Carrossel continuo de valores"
      >
        {duplicated.map((v, i) => {
          const hiddenClone = i >= items.length;
          return (
            <div
              key={`${v.title}-${i}`}
              aria-hidden={hiddenClone}
              className="min-w-[240px] max-w-[340px] flex-1 rounded-[26px] border border-white/10 bg-black/20 p-5 md:min-w-[280px] md:p-6"
            >
              <div className="text-xs tracking-[0.22em] text-white/55">{v.title}</div>
              <div className="mt-3 text-lg font-semibold text-white">{v.desc}</div>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="mt-4 text-sm text-white/60">{v.footer ?? DEFAULT_FOOTER}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
