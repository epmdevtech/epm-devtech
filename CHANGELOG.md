# CHANGELOG

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

## [0.0.9-tech-constellation] — 2026-09-05

### Adicionado
- Novo componente **`TechConstellation`** (`src/components/sections/TechConstellation.tsx`) substituindo o marquee tradicional da seção "Stack Tecnológica"
- Visual de grafo de tecnologias organizado por categorias conectadas por trilhas estilo circuito impresso (PCB) com pulsos animados de fluxo de dados
- Interação *Focus & Context*: destaque visual do nó selecionado e conexões diretas via hover, foco por teclado e clique/touch, esmaecendo nós não relacionados
- **Painel Interativo de Arquitetura (`tech-details-panel`)**: Exibição detalhada no rodapé da constelação contendo papel arquitetural, categoria e fluxo de conexões de cada tecnologia
- Rótulos de categoria desacoplados e centralizados em pills de alto contraste, eliminando qualquer oclusão com os nós ou circuitos
- Nomes das tecnologias integrados nos nós em desktop e layout clean touch-first otimizado em mobile
- Descrições arquiteturais para todas as 24 tecnologias em `buildConstellationLayout.ts`
- Integração com `Tooltip` do shadcn/ui (`@/components/ui/tooltip`)
- Utilitário desacoplado de cálculo geométrico determinístico `src/lib/buildConstellationLayout.ts` com suporte a layout responsivo Desktop e Mobile
- Suíte de testes unitários (`buildConstellationLayout.test.ts` e `TechConstellation.test.tsx`) mantendo cobertura em 98.13% (91/91 testes passando)
- Testes ponta a ponta Playwright para grafo e painel de detalhes (6/6 testes passando)
- Documentação SDD: SPEC-009, TASK-009 e QA-009 atualizados


### Adicionado
- Automação de testes End-to-End (E2E) com **Playwright** (`@playwright/test`) validando estabilidade, ausência de flickers, conformidade de monocromatismo e navegação
- Script `npm run test:e2e` integrado ao `package.json`
- SPEC-008, TASK-008 e QA-008 documentados e aprovados pelo PO

### Alterado
- **Design System & Identidade Visual**: Substituição integral da cor primária azul pelo **Verde Oficial da EPM DEVTECH** (`#10B981` / Emerald 500, HSL `158 64% 42%` no Dark Mode e `158 75% 36%` no Light Mode) com contraste WCAG AA >= 4.5:1
- **Títulos 100% Monocromáticos**: Removidos `text-gradient` e estilos multicolores de todos os headings (`Hero`, `About`, `Services`, `Technologies`, `Differentials`, `Authority`, `Contact`). Contraste aplicado estritamente através do peso tipográfico (`font-light` vs `font-semibold`) em `text-foreground`
- **Harmonização Tipográfica**: Textos corridos e parágrafos padronizados em `Geist Sans`, reservando `Geist Mono` para dados técnicos, números e código
- Atualização das variáveis e gradientes de destaque para o verde esmeralda em `src/index.css` e `index.html`

### Corrigido
- Eliminado o bug de flicker / duplicação de título no Hero causado por skeleton estático concorrente no `index.html`
- Resolvida duplicação de ID `#servicos` e normalizado o ciclo de vida dos nós no `LazySection` e fallbacks do `Suspense`


## [0.0.4-treemap] — 2026-08-28

### Adicionado
- Critical inline CSS no `<head>` do `index.html` para renderização imediata do tema escuro no frame 1 (FCP acelerado)
- `<link rel="modulepreload" href="/src/main.tsx" />` para parsing JS prioritário
- Desacoplamento assíncrono com `React.lazy` + `Suspense` em `App.tsx` para `CookieBanner`, `Toaster`, `Sonner`, `Analytics` e `SpeedInsights`
- Redução de 67% no tamanho do chunk inicial `index.js` (101 KB → 32.8 KB)
- SPEC-003, TASK-003 e QA-003

### Corrigido
- Postergação da inicialização do `CookieBanner` para 3.5s evitando colisão de métrica com o LCP do Hero
- Adição de `fetchpriority="high"` e `loading="eager"` no logo do Header

## [0.0.3-perf] — 2026-08-28

### Adicionado
- Otimização do logo para WebP (`public/logo-emp-dev-tech-sm.webp` de 9.5 KB contra 134 KB original — economia de 93%)
- Atributos `width={145}` e `height={49}` explícitos nas tags `<img>` do Header e Footer
- Formato Markdown com links canônicos `[Título](URL)` no `public/llms.txt` (Lighthouse Agentic Navigation 3/3)
- SPEC-002, TASK-002 e QA-002 registrados no framework SDD

### Corrigido
- CLS no Hero eliminado (0.155 → 0.00) com renderização de texto estável e aceleração do LCP
- Contraste de botões primários (`--primary`): ajustado para HSL(221.2, 83.2%, 48%) garantindo taxa de contraste 5.22:1 (WCAG AA) com texto branco
- Animação de estatísticas no componente About otimizada para a thread do compositor

## [0.0.2-perf] — 2026-08-28

### Adicionado
- `public/llms.txt` seguindo spec llmstxt.org
- Preconnect + dns-prefetch para `cdn.jsdelivr.net` e `cdn.simpleicons.org`
- `content-visibility: auto` nas seções below-the-fold
- `will-change: transform` no `.tech-band-track` e `@media (prefers-reduced-motion)`
- SPEC-001, TASK-001 e QA-001

### Corrigido
- Contraste `muted-foreground` em light mode: 46.9% → 38% lightness
- `font-display` da fonte Geist: `optional` → `swap`

## [0.0.1-sdd] — 2026-08-28

### Adicionado
- Estrutura do Universal SDD aplicada ao projeto
- `PROJECT.md` — documento canônico do estado do projeto
- `AGENTS.md` — protocolo para agentes de IA e colaboradores
- `GEMINI.md` — protocolo específico para o agente Gemini/Antigravity
- Diretórios SDD: `/agents`, `/workflows`, `/profiles`, `/knowledge`, `/standards`, `/templates`, `/specs`, `/tasks`, `/reviews`, `/adr`, `/docs`
- Templates: SPEC, TASK, REVIEW, QA
- Standards: testing, quality-gates, ux-ui, accessibility
- ADRs: 001 a 005 documentando as decisões arquiteturais existentes
- Workflows: feature.md com o fluxo completo de desenvolvimento
- Knowledge base: stack.md e conventions.md

---

## [0.0.0] — 2026-08

### Adicionado
- Landing page institucional EPM DEVTECH
- Stack: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- Seções: Hero, About, Services, Technologies, Differentials, Authority, Contact, Footer
- Header com navegação responsiva e scroll spy
- SEO dinâmico por seção via react-helmet-async
- Dark/Light mode com next-themes
- Formulário de contato via EmailJS
- Cookie banner
- CursorOrb e ScrollToTop
- Suíte de testes com Vitest + React Testing Library (>90% cobertura)
- Deploy na Vercel
- Docker e Docker Compose para desenvolvimento local
- Bundle splitting manual via Vite manualChunks
