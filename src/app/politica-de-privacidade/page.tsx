import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Moview",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="relative z-20 flex-1 pb-16 pt-28">
      <div className="mx-auto w-full max-w-3xl px-4">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/55">DOCUMENTO</p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/60">Última atualização: 23/04/2026</p>
        </header>

        <section className="mt-12">
          <p className="text-base leading-7 text-white/70 text-justify indent-8">
            Esta Política de Privacidade descreve como aplicação MOVWHAT, MOVINST, MOVFACE, possível coleta,
            utilização, armazenamento e proteção das informações pessoais dos usuários (&quot;você&quot;) ao utilizar nossa
            aplicação web{" "}
            <a className="underline decoration-white/25 underline-offset-4 hover:decoration-white/50" href="https://moview.com.br">
              https://moview.com.br
            </a>
            .
          </p>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Ao utilizar nossa aplicação, você concorda com a coleta e uso de informações de acordo com esta política.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">1. Dados que coletamos</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Coletamos informações para fornecer melhores serviços. Os tipos de dados incluem:
          </p>
          <ol className="moview-abnt-list mt-4 space-y-3 text-base leading-7 text-white/70">
            <li className="text-justify">
              <span className="font-semibold text-white/85">Dados de Cadastro:</span> Nome, e-mail, telefone, cargo,
              nome da empresa quando você criar uma conta, utilizar serviços de agendamento, localização, atendimento
              automático, compras de produtos e serviços.
            </li>
            <li className="text-justify">
              <span className="font-semibold text-white/85">Dados de Uso:</span> Endereço IP, tipo de navegador,
              páginas visitadas, tempo de uso, funcionalidade acessadas.
            </li>
            <li className="text-justify">
              <span className="font-semibold text-white/85">Dados Financeiros (se aplicável):</span> Dados de cartão de
              crédito/pagamento, processados por terceiros seguros (não armazenamos dados bancários completos em nosso
              servidor).
            </li>
            <li className="text-justify">
              <span className="font-semibold text-white/85">Cookies:</span> Utilizamos cookies para melhorar a
              experiência do usuário, manter a sessão ativa e analisar o tráfego.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">2. Como utilizamos seus dados</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Utilizamos os dados coletados para:
          </p>
          <ol className="moview-abnt-list mt-4 space-y-2 text-base leading-7 text-white/70">
            <li className="text-justify">Prestar, operar e manter nossa aplicação web.</li>
            <li className="text-justify">Processar transações e enviar notas fiscais.</li>
            <li className="text-justify">Melhorar funcionalidades e desenvolver novos recursos.</li>
            <li className="text-justify">Enviar comunicações técnicas, atualizações e alertas de segurança.</li>
            <li className="text-justify">Cumprir obrigações legais e regulatórias.</li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">3. Compartilhamento de dados com terceiros</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Não vendemos seus dados pessoais. Podemos compartilhar informações com:
          </p>
          <ol className="moview-abnt-list mt-4 space-y-2 text-base leading-7 text-white/70">
            <li className="text-justify">
              <span className="font-semibold text-white/85">Provedores de Serviços:</span> Hospedagem (ex.: AWS, Google
              Cloud), ferramentas de e-mail marketing, processadores de pagamento (ex.: Stripe, PayPal).
            </li>
            <li className="text-justify">
              <span className="font-semibold text-white/85">Autoridades Legais:</span> Quando exigido por Lei ou para
              proteger nossos direitos.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">4. Segurança dos dados</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Implementamos medidas técnicas e organizativas adequadas para proteger seus dados contra acessos não
            autorizados, perda, destruição ou alteração. Isso inclui o uso de criptografia (SSL/TLS) e firewalls. No
            entanto, nenhum método de transmissão pela internet é 100% seguro.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">5. Seus direitos (LGPD)</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">Você tem direito a:</p>
          <ol className="moview-abnt-list mt-4 space-y-2 text-base leading-7 text-white/70">
            <li className="text-justify">Confirmar a existência de tratamento de dados.</li>
            <li className="text-justify">Acessar, corrigir ou atualizar seus dados.</li>
            <li className="text-justify">
              Solicitar a exclusão de dados pessoais (respeitando prazos legais de armazenamento).
            </li>
            <li className="text-justify">Revogar o consentimento a qualquer momento.</li>
          </ol>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Para exercer seus direitos, entre em contato através do e-mail:{" "}
            <a
              className="underline decoration-white/25 underline-offset-4 hover:decoration-white/50"
              href="mailto:comercial@moview.com.br"
            >
              comercial@moview.com.br
            </a>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">6. Retenção de dados</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Manteremos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades descritas
            nesta política, auditoria do atendimento ou conforme exigido por Lei.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">7. Alterações nesta política</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer mudanças
            publicando a nova política nesta página.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-white">8. Contato</h2>
          <p className="mt-4 text-base leading-7 text-white/70 text-justify indent-8">
            Em caso de dúvidas, entre em contato com nosso Encarregado de Dados (DPO):
          </p>
          <dl className="mt-4 space-y-2 text-base leading-7 text-white/70">
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
            <div>
              <dt className="block font-semibold text-white/85">Endereço:</dt>
              <dd className="mt-1 text-justify">
                AVENIDA GERMÂNIA, 85 - Bairro VILA GERMÂNIA, Município NOVA PETROPOLIS/RS, CEP: 95.150-000.
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
