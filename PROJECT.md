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

Landing page institucional da **EPM DEVTECH**, Software House dedicada a:
- Desenvolvimento de software sob medida
- APIs REST/GraphQL escaláveis
- Arquitetura de sistemas de alta performance
- Soluções para Indústria, Varejo, Educação e Energia

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
Single Page Application (SPA) multi-rota desacoplada com rotas independentes, hub comercial enxuto na raiz e pré-renderização estática de HTML no pós-build para SEO pleno.

### Estrutura de Rotas Canônicas
| Rota                 | Componente           | Função                                      |
|----------------------|----------------------|---------------------------------------------|
| `/`                  | `Home.tsx`           | Hub comercial sintetizado com Hero Slim     |
| `/servicos`          | `ServicesPage.tsx`   | Catálogo com 4 ofertas e dores de negócio   |
| `/como-trabalhamos`  | `HowWeWorkPage.tsx`  | Pipeline sequencial de 4 etapas             |
| `/experiencia`       | `ExperiencePage.tsx` | Indicadores de autoridade e contextos reais |
| `/engenharia`        | `EngineeringPage.tsx`| Pilares de engenharia e TechConstellation   |
| `/sobre`             | `AboutPage.tsx`      | Institucional com liderança técnica e dados |
| `/contato`           | `ContactPage.tsx`    | Formulário de contato, canais e SLA         |
| `/duvidas-frequentes`| `FAQPage.tsx`        | 8 perguntas categorizadas (fonte única)     |
| `/*`                 | `NotFound.tsx`       | Página 404 em português com links de resgate|

### Redirecionamentos 301 (Edge / Vercel)
- `/setores` → `/experiencia` (301 permanente)
- `/autoridade` → `/experiencia` (301 permanente)
- `/diferenciais` → `/engenharia` (301 permanente)
- `/tecnologias` → `/engenharia` (301 permanente)
- `/faq` → `/duvidas-frequentes` (301 permanente)

### Gerenciamento de Foco e Rolagem (`ScrollManager`)
- Rolagem suave para o topo a cada transição de rota (respeitando `prefers-reduced-motion`).
- Transferência programática de foco para o `<h1>` da nova rota (`tabIndex={-1}`) para suporte pleno a leitores de tela.
- Interceptação de hashes legados na raiz (`/#servicos`, `/#contato`) redirecionando via `replaceState` para rotas canônicas.

### Estrutura de Diretórios
```
src/
├── App.tsx                     # Rotas aninhadas sob Layout e providers raiz
├── main.tsx                    # Ponto de entrada React
├── index.css                   # Estilos globais e tokens Tailwind
├── config/
│   ├── experience.ts           # Organizações aprovadas (CAPES, ONS, Energia Pecém)
│   └── faq.ts                  # Perguntas frequentes categorizadas
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # Shell persistente com skip-link, Header, Outlet e Footer
│   │   └── Header.tsx          # Menu enxuto (5 links + 1 botão CTA)
│   ├── routing/
│   │   └── ScrollManager.tsx   # Foco e rolagem acessível entre rotas
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
│   ├── ui/                     # Componentes shadcn/ui, PageHeader e SectionHeader
│   ├── CursorOrb.tsx
│   ├── NavLink.tsx
│   ├── cookie-banner.tsx
│   └── theme-provider.tsx
├── hooks/
├── lib/
│   └── buildConstellationLayout.ts
├── pages/
│   ├── Home.tsx                # Homepage curta como hub comercial
│   ├── ServicesPage.tsx        # /servicos
│   ├── HowWeWorkPage.tsx       # /como-trabalhamos
│   ├── ExperiencePage.tsx      # /experiencia
│   ├── EngineeringPage.tsx     # /engenharia
│   ├── AboutPage.tsx           # /sobre
│   ├── ContactPage.tsx         # /contato
│   ├── FAQPage.tsx             # /duvidas-frequentes
│   └── NotFound.tsx            # 404 em português
└── test/
    ├── setup.ts
    └── example.test.ts
```

### Padrões de Carregamento e SEO
- **Home**, **Layout** e **Header**: carregamento imediato na raiz (LCP instantâneo sem layout shift)
- Subrotas independentes: `React.lazy` + `Suspense` sob demanda
- Pré-render estático multi-rota via `scripts/prerender.js` gerando `dist/<rota>/index.html` pré-populado com `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph e H1 para crawlers e scrapers sem JavaScript.

---

## SEO

- Meta tags dinâmicas por rota via `react-helmet-async`
- Pré-render estático no pós-build para scrapers de redes sociais e SEO bot
- URL canônica individual por rota (`data-rh="true"`)
- Open Graph e Twitter Cards específicos por página
- Skip-to-content link para acessibilidade (`#conteudo-principal`)

---

## Estado Atual

| Área              | Status           | Notas                                      |
|-------------------|------------------|--------------------------------------------|
| Design            | ✅ Padronizado   | Design System Verde EPM DEVTECH (#10B981), cabeçalhos 100% centralizados com `<header>` (`SectionHeader`), escala H2 fluida idêntica em todas as seções, `aria-labelledby` em cada seção e `[text-wrap:balance]` (SPEC-058) |
| Tipografia / Títulos | ✅ Padronizado   | Eyebrows minimalistas com traço do ícone da marca (BrandChipIcon em #10B981) + texto cinza uppercase (11.5px, weight 500, letter-spacing 0.1em), títulos 100% monocromáticos, zero cápsulas e padrão sentence case em todo o site |
| Iconografia       | ✅ Autoral / SVG | Conjunto autoral de 15 SVGs conceituais em `@/components/icons` com traço 1.5px, duotone 10%, nó verde de assinatura de marca e wrapper `Icon`; sem caixas de template (SPEC-058) |
| Hero              | ✅ Engenharia B2B | Layout assimétrico de duas colunas (80–90vh no desktop), eyebrow contextual ("ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO"), headline madura "Engenharia de software para construir, integrar e evoluir sistemas.", subheadline de 2 linhas, CTAs direto ("Falar sobre um projeto" para `/contato`) e de catálogo ("Conhecer soluções" para `/servicos`), linha de autoridade factual e Canvas de Topologia Arquitetural em 4 camadas conectadas (SPEC-061) |
| Services          | ✅ Expandido     | 4 ofertas com gatilhos de dor destacados ("Quando precisa:" com label verde mono, pergunta em foreground font-medium, divisor fino e alinhamento na base), títulos em sentence case e sem repetição de "reduzindo" (SPEC-056) |
| Como Trabalhamos  | ✅ Sequencial    | Seção de processo sequencial com pipeline 01-04, lista semântica `<ol>`, timeline vertical no mobile (< 1024px), ícones autorais no cabeçalho do card e sem caixa esmeralda inferior |
| Differentials     | ✅ 3 Colunas     | Cabeçalho centralizado, 3 colunas abertas sem moldura de card separadas por divisores sutis verticais, ícones autorais no topo e bloco inferior centralizado de práticas de engenharia (SPEC-053) |
| Technologies      | ✅ Constellation | TechConstellation interativo com trilhas PCB, Focus & Context, cabeçalho centralizado e Painel Arquitetural |
| Autoridade        | ✅ CountUp       | Grid simétrico com 4 estatísticas consolidadas (99,9%, 2.500 RPS, 100%, −35%), subtítulo atualizado com contexto de outras empresas, escala H2 unificada, DOM inicial com valores finais sem zero placeholder, contagem animada como progressive enhancement, aria-hidden nos números visuais e sr-only dedicado (SPEC-058) |
| Sectors           | ✅ Refatorado    | Título "Experiência em diferentes contextos", 4 cards 3D isomórficos com ícones conceituais autorais e sem setas direcionais (falsa affordance removida) |
| About             | ✅ Enquadrado    | Posicionamento centrado na software house, cabeçalho centralizado, liderança técnica com ícone autoral, indicador de experiência estático (+9 Anos), sem título de engenheiro (SPEC-055) |
| FAQ               | ✅ Condensado    | 8 perguntas essenciais, pergunta de sites institucionais alocada na categoria "servicos", abas em sentence case e CTA integrado |
| Contact           | ✅ Refatorado    | Título "Fale sobre seu projeto", CTA único "Falar sobre meu projeto", próximos passos com ícones conceituais e borda sutil de 1px |
| Footer            | ✅ Refatorado    | Links corporativos sincronizados via `site.ts`, LinkedIn e GitHub oficiais na coluna Contato com ícones SVG monocromáticos (20px) e touch target ≥ 44px; descrição factual "dedicada a..." (SPEC-057) |
| ScrollToTop       | ✅ Neutro / Flat | Ícone ChevronUp (20px), design utilitário neutro sem glow ou realce verde, fade suave >450px e elevação dinâmica no rodapé |
| Cookie Banner     | ✅ Otimizado     | Lazy load assíncrono + defer timer (3.5s)  |
| Multi-Rota & SEO  | ✅ Multi-Rota SPA | Transição de monólito one-page para SPA multi-rota com rotas canônicas independentes (`/`, `/servicos`, `/como-trabalhamos`, `/experiencia`, `/engenharia`, `/sobre`, `/contato`, `/duvidas-frequentes`), menu enxuto (5 links + 1 CTA), preservação 301 de URLs e pré-render estático HTML pós-build (SPEC-060) |
| Testes unitários  | ✅ Implementado  | 25/25 suites, 163/163 testes passando (99.65% linhas, 89.38% branches, 90.38% funcs) |
| Testes E2E        | ✅ Implementado  | Suíte Playwright (43/43 testes passando: rotas independentes, F5 direto, SEO canônico, menu mobile acessível, Hero engenharia B2B, travas de tokens e responsividade) |
| Acessibilidade    | ✅ 100% WCAG AA  | Skip-link acessível, foco programático em `<h1>`, `aria-current="page"`, contraste ≥ 4.5:1, touch target ≥ 44px, zero layout shift (CLS: 0.000 mobile) |
| Performance       | ✅ 100% Otimizado| Mobile Perf: 84 (+16 pontos vs baseline 68), TBT: 480ms (-77% de bloqueio), CLS: 0.000; Desktop Perf: 97, SEO: 100/100, FCP 0.5s / LCP 0.6s |
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

_Última atualização: 2026-10-01 | Maintainer: Elessandro Prestes Macedo_
