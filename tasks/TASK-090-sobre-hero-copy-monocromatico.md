# TASK-090 — Ajuste de Copywriting e Tipografia Monocromática do Hero de /sobre

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-090-sobre-hero-copy-monocromatico.md`

---

## 1. Escopo da Tarefa

1. **Atualização do Hero em `/sobre` (`src/pages/AboutPage.tsx`)**:
   - Atualizar H1 para: *"Transformando desafios em soluções que funcionam"*.
   - Tornar o H1 100% monocromático (`text-primary`), sem spans coloridos ou verdes.
   - Atualizar subtítulo para: *"Unimos tecnologia, experiência e visão de negócio para criar soluções digitais que simplificam operações e geram resultados reais."*.
   - Excluir a linha de Inline Trust Marks (`● Atendimento 100% Remoto & Nacional`, `● Contato Direto com Liderança Técnica` e `● Propriedade Integral do Código`).
2. **Atualização de Scripts e Testes**:
   - `scripts/prerender.js`: Atualizar H1 da rota `sobre`.
   - `e2e/multi-route-navigation.spec.ts`: Atualizar expectativa do H1 de `/sobre`.
   - `src/pages/__tests__/pages.test.tsx`: Atualizar teste de `AboutPage` com o novo H1 e asserções de ausência das trust marks.
3. **Quality Gates & Evidências**:
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Vitest (`npm test -- --run`), Playwright e Build.
   - Capturar screenshots em Desktop Dark, Desktop Light e Mobile Dark.
   - Criar `reviews/QA-090.md`, atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Git commit em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-090-sobre-hero-copy-monocromatico.md`.
- [x] Obter aprovação formal do PO.
- [x] Atualizar H1, subtítulo e remover trust marks em `src/pages/AboutPage.tsx`.
- [x] Atualizar H1 em `scripts/prerender.js` e `e2e/multi-route-navigation.spec.ts`.
- [x] Atualizar testes em `src/pages/__tests__/pages.test.tsx`.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais (Desktop Dark, Desktop Light, Mobile Dark).
- [x] Criar relatório `reviews/QA-090.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-090 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-090-sobre-hero-copy-monocromatico.md` (Criado)
- `tasks/TASK-090-sobre-hero-copy-monocromatico.md` (Criado)
- `src/pages/AboutPage.tsx` (Modificar)
- `scripts/prerender.js` (Modificar)
- `e2e/multi-route-navigation.spec.ts` (Modificar)
- `src/pages/__tests__/pages.test.tsx` (Modificar)
- `reviews/QA-090.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
