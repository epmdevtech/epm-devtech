# CHANGELOG

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

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
