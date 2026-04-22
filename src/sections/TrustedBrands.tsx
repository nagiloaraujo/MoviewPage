import React from "react";

const journeyA = [
  "Indústrias especializadas",
  "Distribuidores regionais",
  "Revendas especializadas",
  "Representantes comerciais",
  "Arquitetos e especificadores",
  "Pintores profissionais",
];

const journeyB = [
  "Orçamentos mais rápidos",
  "Catálogo e cores por IA",
  "Recompra automatizada",
  "Mídia para captação local",
  "Atendimento técnico com contexto",
  "Follow-up comercial contínuo",
];

function BrandRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const repeated = items.concat(items);

  return (
    <div className="moview-brand-marquee">
      <div
        className={[
          "moview-brand-track",
          direction === "left" ? "moview-brand-track--left" : "moview-brand-track--right",
        ].join(" ")}
      >
        {repeated.map((item, index) => (
          <div
            key={`${item}-${direction}-${index}`}
            className="inline-flex min-w-[14rem] items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/6 px-5 py-4 text-center text-sm font-medium text-white/85 shadow-[0_0_30px_rgba(41,171,255,0.08)] backdrop-blur-xl"
          >
            <span className="text-pretty">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedBrands() {
  return (
    <section className="relative py-14 md:py-18">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="absolute -inset-28 opacity-70 blur-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(41,171,255,0.14),transparent_58%),radial-gradient(circle_at_80%_25%,rgba(124,92,255,0.14),transparent_56%),radial-gradient(circle_at_55%_85%,rgba(32,227,194,0.10),transparent_58%)]" />

          <div className="relative grid gap-6">
            <div className="grid gap-3 text-center">
              <p className="text-xs tracking-[0.28em] text-white/55">MERCADO ESPECIALIZADO</p>
              <h3 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
                A Moview foi desenhada para a rotina comercial, técnica e de mídia do mercado de revestimentos
              </h3>
              <p className="mx-auto max-w-2xl text-pretty text-sm leading-7 text-white/65 md:text-base">
                Esta seção mostra onde a plataforma gera mais valor no dia a dia: captação, atendimento, orçamento,
                recompra e suporte para fabricantes, distribuidores e revendas especializadas.
              </p>
            </div>

            <div className="grid gap-4">
              <BrandRow items={journeyA} direction="left" />
              <BrandRow items={[...journeyB].reverse()} direction="right" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Atendimento consultivo",
                  desc: "IA preparada para responder sobre linhas, aplicações, disponibilidade e próximo passo comercial.",
                },
                {
                  title: "Demanda qualificada",
                  desc: "Mídia e automação trabalhando juntas para gerar pedidos, orçamento e recompra com menos atrito.",
                },
                {
                  title: "Operação integrada",
                  desc: "WhatsApp, site, equipe comercial e CRM conectados em uma jornada única para operações especializadas.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-left backdrop-blur-xl"
                >
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/65">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
