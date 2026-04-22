"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function PromoVideo() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaLayerRef = useRef<HTMLDivElement | null>(null);

  const [src, setSrc] = useState<string | null>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [showHint, setShowHint] = useState(true);
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

    setPrefersReducedMotion(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false);
    setShouldAvoidHeavyMedia(saveData || slow);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onAnyScrollIntent = () => setShowHint(false);
    const t = window.setTimeout(() => setShowHint(false), 3000);
    window.addEventListener("wheel", onAnyScrollIntent, { passive: true });
    window.addEventListener("touchmove", onAnyScrollIntent, { passive: true });
    window.addEventListener("scroll", onAnyScrollIntent, { passive: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("wheel", onAnyScrollIntent);
      window.removeEventListener("touchmove", onAnyScrollIntent);
      window.removeEventListener("scroll", onAnyScrollIntent);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion) return;

    const layer = mediaLayerRef.current;
    if (!layer) return;

    let raf = 0;
    let running = false;
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const enterT = clamp01((vh - rect.top) / vh);
      const exitT = clamp01((vh - rect.bottom) / vh);

      let opacity = 1;

      if (rect.top > 0) {
        opacity = enterT;
      } else if (rect.bottom < vh) {
        opacity = 1 - exitT;
      }

      layer.style.opacity = `${clamp01(opacity)}`;

      if (running) {
        raf = window.requestAnimationFrame(update);
      }
    };

    layer.style.opacity = "0";
    const start = () => {
      if (running) return;
      running = true;
      raf = window.requestAnimationFrame(update);
    };

    const stop = () => {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const ioSupported = typeof IntersectionObserver !== "undefined";
    if (!ioSupported) {
      start();
      return () => stop();
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) start();
        else stop();
      },
      { root: null, threshold: 0, rootMargin: "200% 0px 200% 0px" },
    );

    io.observe(root);

    return () => {
      stop();
      io.disconnect();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!videoOk) return;
    if (prefersReducedMotion) return;
    if (shouldAvoidHeavyMedia) return;

    const ioSupported = typeof IntersectionObserver !== "undefined";
    if (!ioSupported) {
      const t = window.setTimeout(() => setSrc("/promo-moview.mp4"), 0);
      return () => window.clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setSrc("/promo-moview.mp4");
          io.disconnect();
        }
      },
      { root: null, threshold: 0.15 },
    );

    io.observe(root);
    return () => io.disconnect();
  }, [prefersReducedMotion, shouldAvoidHeavyMedia, videoOk]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!src) return;
    if (!videoOk) return;
    if (prefersReducedMotion) return;
    if (process.env.NODE_ENV === "test") return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
      }
    };

    tryPlay();
  }, [prefersReducedMotion, src, videoOk]);

  const showVideo = !prefersReducedMotion && !shouldAvoidHeavyMedia && videoOk;

  return (
    <section ref={rootRef} className="relative h-[220svh]">
      <div className="sticky top-0 z-20 h-[100svh] w-full overflow-hidden">
        <h2 className="sr-only">Promo video</h2>
        <div
          ref={mediaLayerRef}
          className="absolute inset-0 will-change-opacity"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          {showVideo ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              onError={() => setVideoOk(false)}
              suppressHydrationWarning
              className="absolute inset-0 h-full w-full object-cover"
              src={src ?? undefined}
              poster="/promo-fallback.svg"
            />
          ) : (
            <Image
              src="/promo-fallback.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(41,171,255,0.10),transparent_60%),radial-gradient(900px_circle_at_80%_30%,rgba(124,92,255,0.10),transparent_62%)]" />

        <div className="absolute left-0 right-0 top-0 z-10 h-24 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/75 to-transparent" />

        {showHint ? (
          <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
            <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs tracking-[0.22em] text-white/70 backdrop-blur-xl">
              SCROLL TO CONTINUE
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
