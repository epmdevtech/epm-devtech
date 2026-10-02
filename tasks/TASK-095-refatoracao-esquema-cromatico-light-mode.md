# TASK-095 — Refatoração do Esquema Cromático do Modo Claro (Light Mode) e Cadência Visual Alternada

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-095-refatoracao-esquema-cromatico-light-mode.md`

---

## 1. Escopo da Tarefa

1. **Tokens Semânticos do Light Mode (`src/index.css`)**:
   - Calibrar `--surface-anchor` para Branco Puro (`0 0% 100%` / `#FFFFFF`).
   - Calibrar `--surface-base` para Tom Gelo (`240 5% 98%` / `#FAFAFA` - `zinc-50`).
   - Calibrar `--surface-alt` para Branco Puro (`0 0% 100%` / `#FFFFFF`).
   - Calibrar `--text-primary` para Preto Profundo/Carvão (`#09090B` / `zinc-950`).
   - Calibrar `--text-secondary` para Cinza Escuro legível (`#52525B` / `zinc-600`).
   - Calibrar `--text-muted` para Cinza Médio legível (`#71717A` / `zinc-500`).
   - Calibrar `--text-brand` para Teal 700 (`#0F766E` / contraste WCAG AA).
   - Calibrar bordas semânticas (`--border-default`: `#E4E4E7`, `--border-subtle`: `#F4F4F5`, `--border-strong`: `#D4D4D8`).
   - Calibrar `--bg-elevated` e `--bg-surface` para `#FFFFFF`.

2. **Divisores Sutis no `SectionWrapper` (`src/components/ui/SectionWrapper.tsx`)**:
   - Adicionar divisor sutil `border-y border-zinc-200/70 dark:border-transparent` para seções de tom `base` (Gelo).

3. **Header e Footer (`src/components/layout/Header.tsx` & `src/components/sections/Footer.tsx`)**:
   - Header com blur/transparência ou branco puro (`bg-white/80 dark:bg-surface-anchor/85 border-b border-zinc-200/80 dark:border-border/40`).
   - Footer com borda superior nítida (`border-t border-zinc-200 dark:border-zinc-800`).

4. **Componentes e Mocks (`HomeProcessPipeline.tsx` & `HomeServicesBento.tsx`)**:
   - Pipeline animado com trilho `zinc-200`, pulso `emerald-600` e nós circulares em branco puro com borda `zinc-300` e texto `zinc-900`.
   - Cards do Bento Grid com fundo branco sólido (`bg-white dark:bg-zinc-900/50`) e elevação com `shadow-sm`.

5. **Sincronização de Testes**:
   - Atualizar asserções de estilo e cor do Light Mode em `e2e/hero-identity-token-locks.spec.ts`.
   - Atualizar asserções do `SectionWrapper.test.tsx` com as classes de borda.

6. **Quality Gates & Release**:
   - `npx tsc --noEmit`, `npm run lint`, `npm test -- --run`, `npx playwright test`, `npm run build`.
   - Capturar evidências visuais das páginas em Light Mode.
   - Criar `reviews/QA-095.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Commit Git no branch `develop` em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-095-refatoracao-esquema-cromatico-light-mode.md`.
- [x] Obter aprovação formal do PO.
- [x] Atualizar tokens semânticos de Light Mode em `src/index.css`.
- [x] Ajustar `src/components/ui/SectionWrapper.tsx` com borda sutil no tom `base`.
- [x] Ajustar classes do Header (`src/components/layout/Header.tsx`).
- [x] Ajustar classes do Footer (`src/components/sections/Footer.tsx`).
- [x] Calibrar contraste e trilho em `src/components/sections/HomeProcessPipeline.tsx`.
- [x] Calibrar cards em `src/components/sections/HomeServicesBento.tsx`.
- [x] Sincronizar testes unitários e E2E (`SectionWrapper.test.tsx`, `hero-identity-token-locks.spec.ts`, etc.).
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais em Light Mode.
- [x] Criar relatório `reviews/QA-095.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-095 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-095-refatoracao-esquema-cromatico-light-mode.md` (Criado / Aprovado)
- `tasks/TASK-095-refatoracao-esquema-cromatico-light-mode.md` (Criado)
- `src/index.css` (Modificar)
- `src/components/ui/SectionWrapper.tsx` (Modificar)
- `src/components/layout/Header.tsx` (Modificar)
- `src/components/sections/Footer.tsx` (Modificar)
- `src/components/sections/HomeProcessPipeline.tsx` (Modificar)
- `src/components/sections/HomeServicesBento.tsx` (Modificar)
- `src/components/ui/__tests__/SectionWrapper.test.tsx` (Modificar)
- `e2e/hero-identity-token-locks.spec.ts` (Modificar)
- `reviews/QA-095.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
