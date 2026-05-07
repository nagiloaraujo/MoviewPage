import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termo de Exclusão de Dados — Moview",
};

export default function TermoDeExclusaoDeDadosPage() {
  return (
    <main className="relative z-20 flex-1 pb-16 pt-28">
      <div className="mx-auto w-full max-w-3xl px-4">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/55">DOCUMENTO</p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Termo de exclusão de dados
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/60">Última atualização: 05/05/2026</p>
        </header>

        <section className="mt-12">
          <p className="text-base leading-7 text-white/70 text-justify indent-8">
            <span className="font-semibold text-white/85">
              Instrução de como excluir sua conta e Dados – Agentes IA Moview
            </span>
          </p>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Você pode solicitar a exclusão de sua conta e de todos os seus dados pessoais associados ao nosso
            aplicativo a qualquer momento. Ao excluir seus dados, todos os seus registros, histórico e informações de
            perfil serão removidos permanentemente de nossos servidores, exceto em casos onde a Lei exija a manutenção
            dos dados ou rastreio de registros sob regime investigativo do Poder Jurídico (ex.: dados de registros
            fiscais ou histórico que comprometam investigações sob demanda do Poder Judiciário em qualquer instância).
          </p>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            <span className="font-semibold text-white/85">Alternativa (solicitação por e-mail):</span> caso não consiga
            acessar sua conta, envie um e-mail para{" "}
            <a
              className="underline decoration-white/25 underline-offset-4 hover:decoration-white/50"
              href="mailto:sac@moview.com.br"
            >
              sac@moview.com.br
            </a>{" "}
            com o assunto: “Solicitação de Exclusão de Dados”.
          </p>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            No corpo do e-mail, inclua seu nome completo e o e-mail cadastrado na plataforma, juntamente com uma
            formalização do pedido de suspensão do cadastro. Assim que atendida a solicitação os serviços e acessos as
            nossas plataformas estarão terminantemente suspensos.
          </p>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            O prazo de execução e de resposta à solicitação poderá ocorrer em até 72 horas comerciais para confirmar o
            recebimento. O processamento da exclusão poderá ser efetuada em até 30 (trinta) dias.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">Plataforma de Agente IA. MOVIEW</h2>
          <dl className="mt-4 space-y-2 text-base leading-7 text-white/70">
            <div>
              <dt className="inline font-semibold text-white/85">Site:</dt>{" "}
              <dd className="inline">
                <a
                  className="underline decoration-white/25 underline-offset-4 hover:decoration-white/50"
                  href="https://www.moview.com.br"
                >
                  www.moview.com.br
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-white/85">E-mail:</dt>{" "}
              <dd className="inline">
                <a
                  className="underline decoration-white/25 underline-offset-4 hover:decoration-white/50"
                  href="mailto:sac@moview.com.br"
                >
                  sac@moview.com.br
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}

