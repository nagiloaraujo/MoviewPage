# Moview Web

## Visão geral

Landing page da Moview construída em Next.js (App Router) com Tailwind, GSAP e smooth scroll (Lenis).

## Estrutura

- src/app: rotas e layout do App Router
- src/components: componentes reutilizáveis (UI e infraestrutura)
- src/sections: blocos da narrativa contínua da landing
- public: assets públicos (imagens/vídeos)
- tests: testes unitários e de UI (Jest + Testing Library)

## Ambientes

O Next.js carrega automaticamente:

- .env.development (dev)
- .env.production (build/start)

Para staging neste projeto, os scripts usam o arquivo `.env.staging` via `dotenv-cli`.

## Scripts

- npm run dev
- npm run dev:staging
- npm run build
- npm run build:staging
- npm run start
- npm run lint
- npm run test
- npm run test:coverage

