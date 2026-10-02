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
| `/engenharia`        | `EngineeringPage.tsx`| Filosofia de engenharia, Pipeline CI/CD e Nuvem Tipográfica |
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
│   ├── architecture.ts         # Camadas arquiteturais e mapeamento técnico de stack
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
│   │   ├── ArchitecturalBlueprint.tsx
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
| Design            | ✅ Camadas Tonais | Sistema de Camadas Tonais (Tonal Layering - SPEC-082): Substituição de linhas horizontais divisórias entre seções por 3 tons de superfície semânticos (`surface-anchor`, `surface-base`, `surface-alt`) com $\Delta L = 3.5\%$ em Dark e Light Mode. Ritmo estrito `anchor -> base -> alt -> base -> ... -> anchor`, com Header e Footer consumindo `anchor`. Wrapper reutilizável `SectionWrapper` com tipagem estrita, suporte a `forced-colors` (restaurando bordas de 1px) e preservação de bordas intra-componentes. Contraste WCAG AAA garantido (títulos > 10:1 em Dark, > 13:1 em Light). |
| Tipografia / Títulos | ✅ Padronizado   | Eyebrows minimalistas com traço do ícone da marca (BrandChipIcon em `text-brand`) + texto cinza uppercase, títulos 100% monocromáticos, zero cápsulas e padrão sentence case em todo o site |
| Iconografia       | ✅ Autoral / SVG | Conjunto autoral de 15 SVGs conceituais em `@/components/icons` com traço 1.5px, duotone 10%, nó teal de assinatura de marca e wrapper `Icon`; sem caixas de template |
| Hero              | ✅ Fullscreen Minimalista | Enquadramento fullscreen adaptativo (`min-h-screen min-h-[100svh] flex flex-col justify-center`, serviços estritamente abaixo da dobra inicial), eyebrow tipográfico puro com `BrandChipIcon` (sem badge), headline madura de alto impacto (`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary`), CTAs imediatos com feedback tátil e glow sutil padronizados ("Vamos conversar" primário para `/contato` e "Ver soluções" secundário para `#servicos`), remoção de subheadline e social proof redundantes, e Janela Dev "Sistema & Arquitetura Ativa" (`architecture.overview.ts`, status `HEALTHY / 99.9% uptime` sem pílula, spotlight em background e 4 camadas de arquitetura conectadas com tags semânticas) (SPEC-061 / SPEC-063 / SPEC-068 / SPEC-069 / SPEC-071) |
| Services          | ✅ Bento Grid (Home) & Z-Pattern (Página) | Na Home (`HomeServicesBento.tsx`), Bento Grid assimétrico editorial/técnico de 12 colunas. Na página dedicada `/servicos` (`Services.tsx` e `ServicesPage.tsx`), redesign editorial completo eliminando grid 2x2 e caixas repetitivas: 4 serviços estruturados em Z-Pattern alternado de 12 colunas com callout de negócio integrado ("Quando precisa:") em barra lateral esmeralda, 4 mocks com profundidade e fundo escuro refinado (`dark:bg-zinc-950/80`), Faixa de Garantias de Engenharia em 3 colunas limpas com tags monospace `[ 01 // ESCOPO ]` e fechamento comercial com CTAs padronizados ("Iniciar diagnóstico do projeto" e "Entenda como trabalhamos →") (SPEC-062 / SPEC-063 / SPEC-065 / SPEC-073) |
| Como Trabalhamos  | ✅ Pipeline Contínuo & Process Explorer | Na Home (`HomeProcessPipeline.tsx`), pipeline contínuo horizontal/vertical com feixe animado (loop de 3s) e nós ocluídos. Na rota dedicada `/como-trabalhamos` (`ProcessExplorer.tsx` e `HowWeWorkPage.tsx`), Process Explorer interativo em 2 colunas no desktop (tabs verticais com borda esmeralda, painel escuro refinado com cabeçalho, resumo executivo, tags monospace de entregáveis concretos e critério de saída formal) e Accordion vertical no mobile; Manifesto Técnico de Engenharia em 2 colunas abertas com `md:divide-x` (`// GARANTIA OPERACIONAL` e `// GESTÃO DIRETA`) eliminando cards isolados; CTA compacto de contato com botão "Fale com um engenheiro" e link para FAQ (SPEC-062 / SPEC-066 / SPEC-070 / SPEC-072 / SPEC-074) |
| Differentials     | ✅ 3 Colunas     | Cabeçalho centralizado, 3 colunas abertas sem moldura de card separadas por divisores sutis verticais, ícones autorais no topo e bloco inferior centralizado de práticas de engenharia (SPEC-053) |
| Technologies / Engenharia | ✅ Nuvem Tipográfica & Constellation | Na rota dedicada `/engenharia` (`EngineeringPage.tsx` e `ArchitecturalBlueprint.tsx`), apresentação tipográfica editorial aberta das 9 tecnologias centrais (React, TypeScript, Vue.js, Angular, Node.js, PHP, Laravel, AWS e Azure), com pesos de alto impacto, badge de autoridade `Node.js [CORE RUNTIME]`, AWS sem selo de certificado (ajuste de governança), tooltips contextuais com `<TooltipPrimitive.Portal>` e `disableHoverableContent={true}` funcionando perfeitamente em todas as linhas e breakpoints, e Layout Dividido (Filosofia vs. Terminal CI/CD Quality Gate). Na Home (`Technologies.tsx`), preservação do TechConstellation interativo com trilhas PCB. (SPEC-079 / SPEC-080) |
| Autoridade / Resultados | ✅ Stat Strip Tipográfica | Faixa tipográfica contínua sem caixas fechadas (`HomeResultsStrip.tsx`), com bordas horizontais (`border-y border-border-default/60`), divisores verticais discretos no desktop (`md:divide-x`), números em escala de alto impacto (`text-3xl sm:text-4xl lg:text-5xl font-mono text-primary font-extrabold`), rótulos em brand teal (`text-text-brand`) e descrições técnicas (`text-secondary`). Preservação factual das 4 métricas (99,9% alta disponibilidade, 2.500+ RPS, +448 instituições e escolas, Zero perda de dados), nota de rodapé e link canônico para `/experiencia` (SPEC-067) |
| Experiência / Verticais | ✅ Engineering Matrix & Enterprise Ledger | Na rota dedicada `/experiencia` (`ExperiencePage.tsx`), métricas de escala com contadores animados `CountUp` 100% preservadas (99,9%, 2.500 RPS, 100%, -35%); Engineering Matrix 2x2 com bordas internas limpas, badges de especialidade técnica (`IoT INDUSTRIAL`, `ALTA CONCORRÊNCIA`, etc.) e capacidades técnicas inline eliminando caixas repetitivas; Enterprise Ledger corporativo contínuo com linhas elegantes e hover suave para projetos de grande escala (`CAPES`, `ONS`, `Energia Pecém`), nota de contexto editorial com ponto luminoso verde-água declarando expressamente não-clientes da EPM e CTA comercial integrado para `/contato` (SPEC-075) |
| Home / Layout     | ✅ Enxuto & Fluido | Remoção do bloco intermediário redundante de contato ("Vamos entender o cenário da sua empresa?") na Home, conectando a seção de Resultados diretamente ao rodapé. Padronização de CTAs: "Fale conosco" no Header (desktop e gaveta móvel), "Vamos conversar" no Hero e rota canônica `/contato` para formulário (SPEC-071) |
| Sectors           | ✅ Refatorado    | Título "Experiência em diferentes contextos", 4 cards 3D isomórficos com ícones conceituais autorais e sem setas direcionais (falsa affordance removida) na Home |
| About / Sobre nós | ✅ Jornada & Manifesto | Na rota dedicada `/sobre` (`AboutPage.tsx`), H1 de alto impacto ("Engenharia de software com foco em longevidade e impacto real"), liderança técnica de Elessandro Prestes Macedo (+9 Anos), painel de transparência operacional (CNPJ, Toledo/PR e 100% remoto), seção "Nossa Jornada" com timeline histórica alternada (desktop: linha horizontal com conectores e 4 marcos; mobile: timeline vertical lateral contínua) e seção "Missão e Princípios de Engenharia" em formato de Manifesto Técnico / Tabela de Diretrizes com divisores limpos (`divide-y`), finalizando com CTA comercial para `/contato`. Menu global atualizado para "Sobre nós". (SPEC-055 / SPEC-081) |
| FAQ               | ✅ Condensado    | 8 perguntas essenciais, pergunta de sites institucionais alocada na categoria "servicos", abas em sentence case e tokens semânticos |
| Contact           | ✅ Refatorado    | Título "Fale sobre seu projeto", CTA único "Falar sobre meu projeto", próximos passos com ícones conceituais e borda sutil de 1px |
| Footer            | ✅ Refatorado    | Links corporativos sincronizados via `site.ts`, LinkedIn e GitHub oficiais na coluna Contato com ícones SVG monocromáticos (20px) e touch target ≥ 44px; descrição factual "dedicada a..." (SPEC-057) |
| ScrollToTop       | ✅ Neutro / Flat | Ícone ChevronUp (20px), design utilitário neutro sem glow ou realce verde, fade suave >450px e elevação dinâmica no rodapé |
| Cookie Banner     | ✅ Otimizado     | Lazy load assíncrono + defer timer (3.5s)  |
| Multi-Rota & SEO  | ✅ Multi-Rota SPA | Transição de monólito one-page para SPA multi-rota com rotas canônicas independentes (`/`, `/servicos`, `/como-trabalhamos`, `/experiencia`, `/engenharia`, `/sobre`, `/contato`, `/duvidas-frequentes`), menu enxuto (5 links + 1 CTA "Fale conosco"), preservação 301 de URLs e pré-render estático HTML pós-build (SPEC-060 / SPEC-071) |
| Testes unitários  | ✅ Implementado  | 31/31 suites, 194/194 testes passando (100% suites aprovadas) |
| Testes E2E        | ✅ Implementado  | Suíte Playwright (14 testes em design-system-and-stability.spec.ts + suítes multi-rota passando: validação de camadas tonais, ausência de divisores, responsividade, etc.) |
| Acessibilidade    | ✅ 100% WCAG AAA | Botão primário com contraste 12.44:1 (WCAG AAA), texto primário 17.26:1 (Dark) e 17.81:1 (Light), skip-link acessível, foco programático em `<h1>`, `aria-current="page"`, touch target ≥ 44px, zero layout shift |
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

_Última atualização: 2026-10-02 | Maintainer: Elessandro Prestes Macedo_
