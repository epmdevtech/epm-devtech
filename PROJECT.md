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
| Design            | ✅ Padronizado   | Design System Verde EPM DEVTECH (#10B981), cabeçalhos 100% centralizados com `<header>` (`SectionHeader`), escala H2 fluida idêntica em todas as seções, `aria-labelledby` em cada seção e `[text-wrap:balance]` (SPEC-058) |
| Tipografia / Títulos | ✅ Padronizado   | Eyebrows minimalistas com traço do ícone da marca (BrandChipIcon em #10B981) + texto cinza uppercase (11.5px, weight 500, letter-spacing 0.1em), títulos 100% monocromáticos, zero cápsulas e padrão sentence case em todo o site |
| Iconografia       | ✅ Autoral / SVG | Conjunto autoral de 15 SVGs conceituais em `@/components/icons` com traço 1.5px, duotone 10%, nó verde de assinatura de marca e wrapper `Icon`; sem caixas de template (SPEC-058) |
| Hero              | ✅ Slim / Minimalista | Faixa slim de coluna única centralizada (458px em 1440x900, redução de 62.9%), headline monocromática em 2 linhas com `[text-wrap:balance]`, subheadline concisa, CTA primário unificado "Falar sobre meu projeto", CTA secundário em link de texto, zero gradientes, transição discreta com nó esmeralda sólido e Serviços visível acima da dobra (SPEC-059) |
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
| SEO & Agêntico    | ✅ Refatorado    | Meta description otimizada, Open Graph 1200×630, JSON-LD (`ProfessionalService` com `sameAs` oficial da empresa), saneamento de termos superlativos em `README.md`, `llms.txt` e `site.ts` (SPEC-056) |
| Testes unitários  | ✅ Implementado  | 22/22 suites, 151/151 testes passando (99.75% coverage geral, 100% em Hero, Authority, About, HowWeWork, Differentials, Sectors, Services, Technologies) |
| Testes E2E        | ✅ Implementado  | Suíte Playwright (30/30 testes passando: estabilidade, design system, travas estritas de tokens e gradientes, ausência de zeros nos stats sem rolagem/com reduced-motion, e 5 viewports) |
| Acessibilidade    | ✅ 100% WCAG AA  | Contraste de texto e botões >= 4.5:1 (Logotipo WCAG AAA >= 17:1), hierarquia semântica com `<header>`, `aria-labelledby` e `text-wrap: balance` |
| Performance       | ✅ 100% Otimizado| JS inicial 63.32 KB (gzip 21.36 KB), FCP 0.4s / LCP 0.5s desktop, LCP mobile 2.1s (-40%), Performance desktop 99 / mobile 79, maior chunk 142KB |
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
