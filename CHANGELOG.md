# CHANGELOG

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

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
