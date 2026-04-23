"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MoviewLogo from "./MoviewLogo";
import { useLenis } from "./SmoothScroll";
import { moviewWhatsAppHref } from "@/lib/whatsapp";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(
    () => [
      { label: "Início", href: "#inicio" },
      { label: "Soluções", href: "#solucoes" },
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Contato", href: "#contato" },
    ],
    [],
  );

  const moveIndicator = (href: string) => {
    const nav = navRef.current;
    if (!nav) return;
    const target = nav.querySelector<HTMLAnchorElement>(`a[data-nav-href="${href}"]`);
    if (!target) return;

    setIndicatorStyle({
      left: target.offsetLeft - 8,
      width: target.offsetWidth + 16,
      opacity: 1,
    });
  };

  const goTo = (href: string) => {
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -110, duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (!mounted) return;
    const activeHref = hoveredHref ?? links[0]?.href ?? null;
    if (!activeHref) return;
    moveIndicator(activeHref);
  }, [hoveredHref, links, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onResize = () => {
      const activeHref = hoveredHref ?? links[0]?.href ?? null;
      if (activeHref) moveIndicator(activeHref);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoveredHref, links, mounted]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cx(
            "mt-3 flex items-center justify-between rounded-2xl border border-white/10 backdrop-blur-xl transition-all",
            scrolled ? "h-14 bg-black/60 shadow-[0_12px_60px_rgba(0,0,0,0.55)]" : "h-16 bg-black/35",
          )}
        >
          <div className="flex items-center gap-3 pl-4">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                goTo("#inicio");
              }}
              className="flex items-center gap-3"
            >
              <MoviewLogo className="flex items-center gap-3" />
            </a>
          </div>

          <nav
            ref={navRef}
            className="moview-nav-shell relative hidden items-center gap-3 md:flex"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {mounted ? (
              <span
                aria-hidden
                className="moview-nav-indicator"
                style={{
                  width: `${indicatorStyle.width}px`,
                  transform: `translateX(${indicatorStyle.left}px)`,
                  opacity: indicatorStyle.opacity,
                }}
              />
            ) : null}
            {links.map((l) => (
              <a
                key={l.href}
                data-nav-href={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(l.href);
                }}
                onMouseEnter={() => setHoveredHref(l.href)}
                onFocus={() => setHoveredHref(l.href)}
                className="moview-nav-link relative z-10 rounded-full px-4 py-2 text-sm tracking-wide text-white/70 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 pr-3">
            <a
              href={moviewWhatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-white shadow-[0_0_35px_rgba(41,171,255,0.12)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(41,171,255,0.20),rgba(124,92,255,0.20),rgba(32,227,194,0.18))] blur-md" />
              <span className="absolute inset-0 rounded-full border border-white/15 bg-white/5" />
              <span className="relative">Falar com especialista</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
