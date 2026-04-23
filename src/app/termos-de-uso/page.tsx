import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso — Moview",
};

export default function TermosDeUsoPage() {
  return (
    <main className="relative z-20 flex-1 pb-16 pt-28">
      <div className="mx-auto w-full max-w-3xl px-4">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/55">DOCUMENTO</p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Termos e Condições de Uso – Agentes IA Moview
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/60">Última atualização: 26/04/2026</p>
        </header>

        <section className="mt-12">
          <p className="text-base leading-7 text-white/70 text-justify indent-8">
            Bem-vindo a Plataforma Moview de Agentes IA. Ao acessar, baixar ou utilizar nossos serviços web, você
            (&quot;Usuário&quot;) concorda com estes termos. Se não concordar, por favor, não utilize a plataforma.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">1. Aceitação dos termos</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Ao criar uma conta ou usar o serviço, você confirma que leu, compreendeu e aceitou este Termo de Uso e a
            nossa Política de Privacidade. Caso seja menor de idade, a aceitação deve ser feita com permissão dos pais
            ou responsáveis.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">2. Descrição do serviço</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            A plataforma de Automação Moview oferece sistema de autoatendimento baseado em Inteligência Artificial e
            Linguagem natural com base no aprendizado das interações de nossos clientes. Reservamo-nos o direito de
            modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento, sem aviso prévio.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">3. Cadastro e segurança</h2>
          <ol className="moview-abnt-list mt-4 space-y-2 text-base leading-7 text-white/70">
            <li className="text-justify">Para acessar, você deve fornecer informações precisas e mantê-las atualizadas.</li>
            <li className="text-justify">
              A conta é pessoal e intransferível; você é responsável por manter a confidencialidade da sua senha.
            </li>
            <li className="text-justify">É proibido criar contas falsas ou se passar por terceiros.</li>
            <li className="text-justify">
              Não forneça informações de dados sensíveis na plataforma como orientação sexual, religiosa, etc.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">4. Propriedade intelectual</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Todo o conteúdo, marcas, layouts, software, códigos e banco de dados que permitem o funcionamento da
            plataforma são propriedade exclusiva da Empresa Moview Automação Ltda. ou de seus licenciadores e são
            protegidos por Leis de Direito Autoral e de propriedade industrial.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">5. Regras de conduta (uso permitido)</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">O usuário se compromete a:</p>
          <ol className="moview-abnt-list mt-4 space-y-2 text-base leading-7 text-white/70">
            <li className="text-justify">Não utilizar o aplicativo para fins ilícitos, difamatórios ou fraudulentos.</li>
            <li className="text-justify">
              Não tentar burlar sistemas de segurança ou realizar engenharia reversa no software.
            </li>
            <li className="text-justify">Não disponibilizar conteúdo que viole direitos de terceiros.</li>
            <li className="text-justify">
              Não utilizar a plataforma nem os recursos de chat e multimídia com finalidade de discurso de ódio,
              preconceito racial, palavras de baixo calão, enviar material ofensivo ou provocativo durante as
              interações com dispositivos e aplicações Moview.
            </li>
            <li className="text-justify">
              Não desviar do assunto principal a qual a aplicação foi programada sob a pena de suspensão do direito de
              uso.
            </li>
            <li className="text-justify">
              O uso indevido dos produtos Moview do usuário final ou seus associados para qualquer uma das condições
              citadas acima, o autor do delito será notificado com cópia dos registros de interação às Entidades
              Jurídicas Municipais, Estaduais e Federais sob pena das Leis Vigentes de proteção de Dados e Crimes contra
              Informática já citados neste documento.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">6. Limitação de responsabilidade</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            O serviço é fornecido &quot;como está&quot;. A Moview Automação Ltda. não garante que o aplicativo funcionará
            sem interrupções ou erros. Não nos responsabilizamos por:
          </p>
          <ol className="moview-abnt-list mt-4 space-y-2 text-base leading-7 text-white/70">
            <li className="text-justify">Danos causados por mau uso do aplicativo pelo usuário.</li>
            <li className="text-justify">
              Interrupções causadas por terceiros (provedores de internet, falhas no servidor, etc.).
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">7. Privacidade de dados</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            O tratamento de dados pessoais é regulado pela nossa Política de Privacidade, em conformidade com a LGPD
            (Lei nº 13.709/2018).
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">8. Foro</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Fica eleito o foro da comarca de Nova Petrópolis/RS para dirimir quaisquer conflitos relacionados a este
            termo.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">9. Identificação e contato</h2>
          <dl className="mt-4 space-y-2 text-base leading-7 text-white/70">
            <div>
              <dt className="inline font-semibold text-white/85">Plataforma:</dt>{" "}
              <dd className="inline">Plataforma de Agente IA. MOVIEW</dd>
            </div>
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
