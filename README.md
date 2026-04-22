# Moview

Landing page institucional da Moview, focada em apresentar uma proposta de valor para fabricantes, distribuidores e revendas especializadas por meio de IA, automacao e midia de performance.

## Visao Geral

O site foi construido como uma experiencia de uma unica pagina com apelo visual forte, animacoes leves e narrativa comercial orientada a conversao. A pagina combina:

- hero com video de fundo e painel visual da plataforma;
- simulacao de atendimento com IA;
- apresentacao das solucoes da Moview;
- jornada comercial em etapas;
- secoes de prova visual, slogans, valores e CTA final;
- links de contato com redirecionamento direto para o WhatsApp.

## Objetivo Do Site

O principal objetivo desta aplicacao e comunicar com clareza que a Moview conecta:

- atendimento automatizado com IA;
- integracoes multicanal;
- operacao comercial consultiva;
- geracao de demanda com midia;
- aumento de velocidade, previsibilidade e recompra.

O discurso e direcionado para mercados especializados, com destaque para tintas, revestimentos e operacoes comerciais com forte componente tecnico.

## Publico-Alvo

O conteudo do site conversa principalmente com:

- fabricantes;
- distribuidores regionais;
- revendas especializadas;
- representantes comerciais;
- arquitetos e especificadores;
- profissionais que dependem de atendimento tecnico e comercial consultivo.

## Estrutura Da Pagina

O fluxo principal da home esta centralizado em `src/app/page.tsx` e renderiza as secoes abaixo nesta ordem:

1. `Hero`
2. `NarrativeShift`
3. `Products`
4. `HowItWorks`
5. `Differential`
6. `TrustedBrands`
7. `VisualProof`
8. `RotatingSlogans`
9. `Values`
10. `PromoVideo`
11. `FinalCTA`
12. `Footer`

### Principais Secoes

#### Hero

- video de fundo com fallback estatico;
- headline principal da proposta de valor;
- CTA para WhatsApp;
- botao de navegacao suave para a secao "Como funciona";
- painel visual com simulacao de chat e indicadores de performance.

#### Products

Apresenta cinco frentes de atuacao:

1. Automacao com IA
2. Integracoes Multicanal
3. IA para Vendas
4. Midia Inteligente
5. Producao de Conteudo

Cada card possui imagem propria em `public/solutions`.

#### HowItWorks

Explica a jornada da operacao comercial com a sequencia:

1. Atrai
2. Engaja
3. Atende
4. Converte

#### Differential

Reforca o posicionamento da Moview como ponte entre IA, atendimento e midia para operacoes especializadas.

#### TrustedBrands

Apresenta o contexto de mercado e os casos de uso mais relevantes para o nicho, com faixas animadas e blocos de valor.

#### VisualProof

Mostra uma simulacao de conversa automatizada e um dashboard com metricas e grafico animado para tangibilizar os ganhos da operacao.

#### RotatingSlogans

Exibe frases rotativas que reforcam o posicionamento comercial da marca.

#### Values

Resume fundamentos da empresa em um carrossel continuo:

- Missao
- Visao
- Valores
- Metodo

#### PromoVideo

Secao imersiva com video promocional em tela cheia e comportamento sticky durante o scroll.

#### FinalCTA

Fecha a narrativa com convite direto para contato comercial pelo WhatsApp.

## Stack Tecnologica

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `GSAP` para animacoes e scroll-based motion
- `Lenis` para smooth scroll
- `Jest` + `Testing Library` para testes unitarios e de componentes
- `Playwright` para testes end-to-end
- `Sharp` para processamento de imagens

## Arquitetura Do Projeto

### Diretórios Principais

- `src/app`: estrutura base do App Router, layout global e pagina principal
- `src/components`: componentes reutilizaveis como header, logo, chat simulado e carrosseis
- `src/sections`: secoes de alto nivel da landing page
- `src/lib`: funcoes utilitarias, como o link padrao do WhatsApp
- `public`: videos, logos, imagens e arquivos publicos
- `tests`: testes com Jest
- `e2e`: testes de interface com Playwright
- `scripts`: scripts utilitarios para processamento de assets
- `docs`: documentacao complementar

### Componentes De Suporte

Alguns componentes importantes para a experiencia:

- `Header`: navegacao fixa com smooth scroll e CTA
- `SmoothScroll`: integracao com Lenis
- `ChatSim`: simulacao de conversa usada no hero
- `InfiniteCardsCarousel`: carrossel continuo na secao de valores
- `MoviewLogo`: logotipo da marca em SVG/componentizado

## Assets E Midia

### Videos

- `public/hero-bg.mp4`: video do topo da pagina
- `public/promo-moview.mp4`: video da secao promocional
- `public/hero-fallback.svg` e `public/promo-fallback.svg`: fallbacks para dispositivos com restricao de animacao ou midia

### Imagens De Solucoes

As imagens dos cards de solucoes ficam em `public/solutions` e seguem a convencao:

- `solution-01.png`
- `solution-02.png`
- `solution-03.png`
- `solution-04.png`
- `solution-05.png`

### Logos E Imagens Tratadas

O projeto possui um pipeline para tratamento visual de imagens com `Sharp`.

- origem principal: `public/brands`
- saida processada: `public/processed/brands`
- script: `npm run images:process`

O script `scripts/process-project-images.mjs` padroniza enquadramento, fundo, limpeza de bordas escuras e exportacao em PNG.

## Performance E Experiencia

O site implementa alguns cuidados importantes:

- fallback para imagens quando video nao pode ser reproduzido;
- respeito a `prefers-reduced-motion`;
- reducao de carga em telas menores ou conexoes lentas;
- lazy activation de alguns videos via `IntersectionObserver`;
- animacoes com foco em narrativa sem depender de recarregamento de pagina.

## Integracao De Contato

O CTA principal abre uma conversa no WhatsApp a partir de `src/lib/whatsapp.ts`.

- numero configurado: `+55 54 99969-9949`
- mensagem inicial automatica incluida no link

Se for necessario alterar o contato comercial, o ajuste deve ser feito nesse arquivo.

## Scripts Disponiveis

```bash
npm run dev
npm run dev:staging
npm run build
npm run build:staging
npm run start
npm run start:staging
npm run lint
npm run test
npm run test:watch
npm run test:coverage
npm run test:e2e
npm run test:e2e:report
npm run images:process
```

## Como Rodar Localmente

### Requisitos

- Node.js 20 ou superior recomendado
- npm

### Passos

```bash
npm install
npm run dev
```

Depois, acesse:

```text
http://localhost:3000
```

## Testes

### Unitarios E Componentes

```bash
npm run test
```

### Cobertura

```bash
npm run test:coverage
```

### End-To-End

```bash
npm run test:e2e
```

Os testes E2E utilizam o `Playwright` com execucao em diferentes perfis de navegador e viewport.

## Deploy

O projeto esta preparado para deploy em ambiente compatível com Next.js, com configuracoes adicionais versionadas no repositorio:

- `vercel.json`
- `.vercelignore`

Fluxo recomendado:

1. validar localmente com `npm run build`
2. confirmar que os assets em `public` estao atualizados
3. subir para a branch `main`
4. publicar via integracao do GitHub com a plataforma de hospedagem

## GitHub

Repositorio remoto configurado:

- `origin`: `https://github.com/nagiloaraujo/MoviewPage.git`

Branch principal de publicacao:

- `main`

## Observacoes Importantes

- o projeto frontend esta na raiz do repositorio;
- nao existe uma pasta separada chamada `frontend`;
- a home e a principal superficie da aplicacao neste momento;
- o conteudo e a linguagem visual foram desenhados para um posicionamento premium e consultivo;
- o repositorio tambem contem testes, docs e scripts de suporte para evolucao continua.
