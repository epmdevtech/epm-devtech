# PROJECT.md — Estado Canônico do Projeto

> **Nota:** Este é o documento de referência canônica do projeto EPM DEVTECH.
> Toda divergência entre este documento, as SPECs e o código deve ser tratada como defeito, mudança de escopo ou dívida documental — nunca resolvida silenciosamente.

---

## Identificação

| Campo             | Valor                                           |
|-------------------|-------------------------------------------------|
| **Nome**          | EPM DEVTECH — Landing Page                     |
| **Repositório**   | `ElessandroPrestes/epm-devtech-solutions`       |
| **URL Produção**  | https://epmdevtech.com.br                       |
| **Deploy**        | Vercel                                          |
| **Versão**        | 0.0.0 (pré-lançamento)                         |
| **Iniciado em**   | 2026                                            |
| **Autor**         | Elessandro Prestes Macedo                       |
| **Contato**       | elessandro.prestes@gmail.com                   |

---

## Propósito

Landing page institucional da **EPM DEVTECH**, Software House especializada em:
- Desenvolvimento de software sob medida
- APIs REST/GraphQL escaláveis
- Arquitetura de sistemas de alta performance
- Soluções para Indústria, E-commerce, Educação (CAPES/MEC) e Energia (ONS)

A página apresenta serviços, tecnologias, diferenciais, projetos de autoridade e canal de contato direto.

---

## Stack Tecnológico

### Frontend
| Tecnologia        | Versão     | Papel                                |
|-------------------|------------|--------------------------------------|
| React             | ^18.3.1    | Interface declarativa e componentes  |
| TypeScript        | ^5.8.3     | Tipagem estática                     |
| Vite              | ^5.4.19    | Build tool e dev server              |
| Tailwind CSS      | ^3.4.17    | Estilização via utilitários          |
| shadcn/ui         | —          | Componentes acessíveis (Radix UI)    |
| Framer Motion     | ^12.29.2   | Animações e transições               |
| React Router DOM  | ^6.30.1    | Roteamento SPA                       |
| React Helmet Async| ^3.0.0     | Gerenciamento de SEO/meta            |
| TanStack Query    | ^5.83.0    | Gerenciamento de estado assíncrono   |
| React Hook Form   | ^7.61.1    | Gerenciamento de formulários         |
| Zod               | ^3.25.76   | Validação de schemas                 |
| EmailJS           | ^4.4.1     | Envio de e-mails pelo cliente        |
| next-themes       | ^0.3.0     | Dark/Light mode                      |

### Infraestrutura
| Tecnologia        | Versão     | Papel                                |
|-------------------|------------|--------------------------------------|
| Vercel            | —          | Hospedagem e deploy contínuo         |
| Docker            | —          | Containerização do ambiente local    |
| Docker Compose    | —          | Orquestração do container            |

### Qualidade
| Tecnologia             | Versão     | Papel                            |
|------------------------|------------|----------------------------------|
| Vitest                 | ^3.2.4     | Testes unitários                 |
| React Testing Library  | ^16.0.0    | Testes de componentes            |
| @vitest/coverage-v8    | ^3.2.4     | Coverage (meta: >90%)            |
| ESLint                 | ^9.32.0    | Linting e qualidade de código    |
| @playwright/test       | ^1.58.2    | Testes ponta a ponta (E2E)       |

---

## Arquitetura

### Tipo
Single Page Application (SPA) com roteamento client-side simulando seções via `/:section`.

### Estrutura de Rotas
| Rota            | Seção               |
|-----------------|---------------------|
| `/`             | Hero                |
| `/sobre`        | About               |
| `/servicos`     | Services            |
| `/tecnologias`  | Technologies        |
| `/diferenciais` | Differentials       |
| `/contato`      | Contact             |
| `/*`            | NotFound (404)      |

### Scroll Spy
IntersectionObserver com `rootMargin: "-40% 0px -40% 0px"` atualiza a URL via `replaceState` ao rolar — sem empilhar histórico.

### Estrutura de Diretórios
```
src/
├── App.tsx                     # Providers raiz e roteamento
├── main.tsx                    # Ponto de entrada React
├── index.css                   # Estilos globais e tokens Tailwind
├── components/
│   ├── layout/
│   │   └── Header.tsx          # Navegação principal
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Technologies.tsx
│   │   ├── TechConstellation.tsx
│   │   ├── Differentials.tsx
│   │   ├── Authority.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── ui/                     # Componentes shadcn/ui e SectionHeader.tsx
│   ├── CursorOrb.tsx
│   ├── NavLink.tsx
│   ├── cookie-banner.tsx
│   └── theme-provider.tsx
├── hooks/
├── lib/
│   └── buildConstellationLayout.ts
├── pages/
│   ├── Index.tsx               # Página principal com SEO dinâmico
│   └── NotFound.tsx
└── test/
    ├── setup.ts
    └── example.test.ts
```

### Padrões de Carregamento
- **Hero** e **Header**: carregamento imediato (LCP crítico)
- Demais seções: `React.lazy` + `Suspense` (code splitting automático)
- Bundle splitting manual via Vite `manualChunks`: `framer-motion`, `react`, `router`, `radix`, `icons`, `emailjs`, `tanstack`

---

## SEO

- Meta tags dinâmicas por seção via `react-helmet-async`
- URL canônica dinâmica
- Open Graph configurado
- Skip-to-content link para acessibilidade

---

## Estado Atual

| Área              | Status           | Notas                                      |
|-------------------|------------------|--------------------------------------------|
| Design            | ✅ Padronizado   | Design System Verde EPM DEVTECH (#10B981), títulos monocromáticos e tipografia Geist |
| Tipografia / Títulos | ✅ 100% Monocromático | Títulos 100% monocromáticos sem divisões bicolores, cor primária verde restrita a badges, CTAs e foco interativo |
| Branding / Logo   | ✅ Adaptativo    | Logo 100% transparente em Dark e Light Mode, tipografia invertida sem moldura escura |
| Hero              | ✅ Atualizado    | Posicionamento comercial sênior, Tagline, Dual CTA, microprova e sem gradientes |
| About             | ✅ Atualizado    | Autoridade técnica (Tech Lead/fundador), métricas (+9 anos, 4 setores, 99,9% uptime) e preservação total dos cards 3D |
| Services          | ✅ Atualizado    | Copywriting técnico sênior nos 6 cards, H2 monocromático, H3 font-semibold e mockups técnicos preservados |
| Technologies      | ✅ Constellation | TechConstellation interativo com trilhas PCB, Focus & Context e Painel Arquitetural |
| Differentials     | ✅ Atualizado    | Copywriting sênior nos 6 cards, tags técnicas, timeline preservada e H3 semântico |
| Authority         | ✅ Atualizado    | Trust Bar compacto de Prova Social, métricas reais de missão crítica e selos corporativos |
| Contact           | ✅ Refinado      | Split Card com formulário underline, dropdown milimétrico (gap=0px), microinteração no botão e toast centralizado no topo (top-center) |
| Footer            | ✅ 4 Colunas     | Layout moderno de 4 colunas monocromáticas, serviços reais, canais diretos e sub-footer |
| ScrollToTop       | ✅ Adaptativo    | Elevação dinâmica no rodapé, tooltip superior e prevenção de oclusão |
| Cookie Banner     | ✅ Otimizado     | Lazy load assíncrono + defer timer (3.5s)  |
| SEO & Agêntico    | ✅ Otimizado     | Meta tags dinâmicas + llms.txt com links   |
| Testes unitários  | ✅ Implementado  | 16/16 suites, 99/99 testes passando (98.25% coverage) |
| Testes E2E        | ✅ Implementado  | Suíte Playwright (9/9 testes passando, com validação estrita de zero layout shift e inspeção de computed styles) |
| Acessibilidade    | ✅ 100% WCAG AA  | Contraste de texto e botões >= 4.5:1 (Logotipo WCAG AAA >= 17:1) |
| Performance       | ✅ 100% Otimizado| JS inicial < 80 KB, FCP/LCP instantâneo    |
| i18n              | ❌ Não iniciado  | Não planejado na versão atual              |

---

## Quality Gates

- Cobertura de testes ≥ 90% nos componentes principais
- Zero erros de ESLint no pipeline
- Build sem warnings de chunk size (limite: 600KB)
- SEO: meta tags presentes em todas as rotas
- Acessibilidade: skip-link funcional, ARIA labels nos elementos interativos

---

## Decisões Arquiteturais (ADRs)

| ID      | Decisão                                              | Status       |
|---------|------------------------------------------------------|--------------|
| ADR-001 | React SPA com scroll spy + replaceState              | ✅ Aceito     |
| ADR-002 | shadcn/ui como biblioteca de componentes primária    | ✅ Aceito     |
| ADR-003 | EmailJS para envio de formulário (sem backend)       | ✅ Aceito     |
| ADR-004 | Vercel como plataforma de deploy                     | ✅ Aceito     |
| ADR-005 | Bundle splitting manual via Vite manualChunks        | ✅ Aceito     |

---

## Próximas Tarefas Agendadas

| Tarefa | Descrição | Data Agendada | Status |
|---|---|---|---|
| — | Nenhuma tarefa agendada no momento | — | — |

---

_Última atualização: 2026-09-07 | Maintainer: Elessandro Prestes Macedo_
