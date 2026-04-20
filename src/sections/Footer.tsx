import React from "react";
import MoviewLogo from "@/components/MoviewLogo";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 pb-12 pt-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-5">
            <MoviewLogo className="flex items-center gap-3" />
            <p className="max-w-sm text-sm leading-6 text-white/55">
              IA que movimenta resultados. Transformamos atendimento em receita com inteligência artificial, automação e
              mídia digital integrada.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65 backdrop-blur-xl transition hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65 backdrop-blur-xl transition hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6.8 10.2V18M6.8 6.2v.1M10.6 10.2V18M10.6 13.7c0-2.2 1.2-3.7 3.2-3.7 1.9 0 2.9 1.2 2.9 3.4V18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.6 3.8h14.8a1.6 1.6 0 0 1 1.6 1.6v13.2a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 18.6V5.4a1.6 1.6 0 0 1 1.6-1.6Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="grid content-start gap-3">
              <div className="text-xs font-semibold tracking-[0.18em] text-white/70">Soluções</div>
              <a className="text-sm text-white/55 transition hover:text-white" href="#solucoes">
                Automação com IA
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#solucoes">
                Integrações Multicanal
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#solucoes">
                IA para Vendas
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#solucoes">
                Mídia Inteligente
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#solucoes">
                Produção de Conteúdo
              </a>
            </div>

            <div className="grid content-start gap-3">
              <div className="text-xs font-semibold tracking-[0.18em] text-white/70">Empresa</div>
              <a className="text-sm text-white/55 transition hover:text-white" href="#">
                Sobre nós
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#">
                Cases de sucesso
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#">
                Blog
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#">
                Carreiras
              </a>
            </div>

            <div className="grid content-start gap-3">
              <div className="text-xs font-semibold tracking-[0.18em] text-white/70">Suporte</div>
              <a className="text-sm text-white/55 transition hover:text-white" href="#">
                Central de ajuda
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#">
                Documentação
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#">
                Status
              </a>
              <a className="text-sm text-white/55 transition hover:text-white" href="#contato">
                Contato
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-white/10" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Moview. Todos os direitos reservados.</div>
          <div className="flex items-center gap-5">
            <a className="transition hover:text-white" href="#">
              Política de privacidade
            </a>
            <a className="transition hover:text-white" href="#">
              Termos de uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
