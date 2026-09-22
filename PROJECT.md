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
| `/setores`      | Sectors             |
| `/servicos`     | Services            |
| `/tecnologias`  | Technologies        |
| `/diferenciais` | Differentials       |
| `/faq`          | FAQ                 |
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
│   │   ├── Authority.tsx
│   │   ├── About.tsx
│   │   ├── Sectors.tsx
│   │   ├── Services.tsx
│   │   ├── Technologies.tsx
│   │   ├── TechConstellation.tsx
│   │   ├── Differentials.tsx
│   │   ├── FAQ.tsx
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
| Tipografia / Títulos | ✅ Padronizado   | Eyebrows minimalistas com traço do ícone da marca (BrandChipIcon em #10B981) + texto cinza uppercase (11.5px, weight 500, letter-spacing 0.1em), títulos 100% monocromáticos, zero cápsulas e zero travessões (—) ou pontos e vírgulas (;) |
| Hero              | ✅ Quordix Interativo | Tagline superior em overline minimalista flanqueada por linhas decorativas (estilo Selected Projects da referência Quordix), entrada escalonada letra a letra (Linha 1 e Linha 2 balanceadas), física magnética (`MagneticLetter`), subtítulo dinâmico acompanhando o cursor no título e subtítulo com destaque tipográfico (peso 400 a 700, opacidade 0.45 a 1.0) e estado inicial uniforme, anéis orbitais com satélites luminosos (Ciano Elétrico `#00D4FF` e Verde Esmeralda `#10B981`) e aura atmosférica central no gradiente oficial da marca (`logo-Photoroom.png`: Ciano Elétrico -> Turquesa -> Verde Esmeralda) em Light Mode e Dark Mode, e microprova social |
| About             | ✅ Atualizado    | Autoridade técnica (Tech Lead/fundador Elessandro Prestes Macedo), métricas (+9 anos, 4 setores, 99,9% uptime) e pilares de engenharia |
| Sectors           | ✅ Modularizado  | Seção 4 dedicada com os 4 cards 3D isomórficos 100% preservados (Indústria, Varejo, Educação, Energia), mockups interativos e tríade contexto + problema + experiência |
| Services          | ✅ Atualizado    | Copywriting sênior com destaque ao problema resolvido nos 6 cards, H2 monocromático, H3 font-semibold e mockups técnicos preservados |
| Technologies      | ✅ Constellation | TechConstellation interativo com trilhas PCB, Focus & Context e Painel Arquitetural |
| Differentials     | ✅ Atualizado    | Copywriting focado em benefícios nos 6 cards, tags técnicas, timeline preservada e H3 semântico |
| FAQ               | ✅ Otimizado     | Acordeão interativo (shadcn/ui), 10 perguntas estritamente focadas em remoção de objeções reais (sem redundância de catálogo), contraste WCAG AAA no Light e Dark Mode |
| Contact           | ✅ Blindado      | Split Card com formulário underline, dropdown milimétrico (gap=0px), máscara dinâmica de telefone, validação estrita Zod (rejeição de letras e DDDs inválidos), microinteração no botão e toast centralizado no topo (top-center) |
| Footer            | ✅ Atualizado    | Layout de 4 colunas monocromáticas, CNPJ consolidado na linha de copyright (© 2026 EPM DEVTECH · CNPJ 60.710.574/0001-85), modais acessíveis de Termos de Uso e Política de Privacidade (LGPD) sem travessões e remoção de textos obsoletos |
| ScrollToTop       | ✅ Neutro / Flat | Ícone ChevronUp (20px), design utilitário neutro sem glow ou realce verde (borda fina border-zinc-200/800, text-zinc-500/400), sem competir com CTAs reais (WhatsApp/Contato), fade suave >450px e elevação dinâmica no rodapé |
| Cookie Banner     | ✅ Otimizado     | Lazy load assíncrono + defer timer (3.5s)  |
| SEO & Agêntico    | ✅ Formalizado   | `robots.txt` formalizado para 16 crawlers de IA (OpenAI, Anthropic, Perplexity, Google, Apple, Meta, ByteDance, etc.), `llms.txt` e `llms-full.txt` enriquecidos com a narrativa de 10 seções, setores, serviços, 10 perguntas do FAQ e métricas reais, `sitemap.xml` atualizado com `/setores` e `/faq`, links de auto-descoberta no `index.html` e eliminação de travessões artificiais |
| Testes unitários  | ✅ Implementado  | 20/20 suites, 136/136 testes passando (95.44% coverage geral, Sectors 100%, FAQ 100%, Services 100%) |
| Testes E2E        | ✅ Implementado  | Suíte Playwright (10/10 testes passando, incluindo teste E2E de validação e máscara de telefone, layout shift zero e computed styles) |
| Acessibilidade    | ✅ 100% WCAG AA  | Contraste de texto e botões >= 4.5:1 (Logotipo WCAG AAA >= 17:1) |
| Performance       | ✅ 100% Otimizado| JS inicial < 80 KB, FCP/LCP instantâneo    |
| Proxy Odontologia | ✅ Implementado  | `/odontologia-demo` → proxy reverso Vercel para `dentistry-demo.elessandrodev.workers.dev` com 4 headers AppSec (SPEC-044) |
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
| VERIF-001 | 1. Verificar indexação e status de Sucesso do `sitemap.xml` no Google Search Console (janela de 24h)<br>2. Avaliar necessidade de inclusão explícita da tag `<meta name="theme-color">` no `<head>` do `index.html` | 2026-09-08 | ✅ Concluído |

---

_Última atualização: 2026-09-22 | Maintainer: Elessandro Prestes Macedo_
