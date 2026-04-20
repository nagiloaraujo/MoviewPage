"use client";

import React, { useEffect, useMemo, useState } from "react";
import MoviewLogo from "./MoviewLogo";
import { useLenis } from "./SmoothScroll";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(l.href);
                }}
                className="text-sm tracking-wide text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 pr-3">
            <button
              type="button"
              onClick={() => goTo("#contato")}
              className="relative inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(41,171,255,0.20),rgba(124,92,255,0.20),rgba(32,227,194,0.18))] blur-md" />
              <span className="absolute inset-0 rounded-full border border-white/15 bg-white/5" />
              <span className="relative">Falar com especialista</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

