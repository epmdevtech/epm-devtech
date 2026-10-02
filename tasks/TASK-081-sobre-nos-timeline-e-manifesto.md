# TASK-081 — Refatoração da Rota /sobre (Jornada Histórica Alternada e Manifesto Técnico) e Atualização da Navbar para "Sobre nós"

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-081-sobre-nos-timeline-e-manifesto.md`

---

## 1. Escopo da Tarefa

1. **Navegação Global (Navbar / Header)**:
   - Alterar label do link de `/sobre` de `"Sobre"` para `"Sobre nós"` em `src/components/layout/Header.tsx`.
2. **Refatoração da Rota `/sobre` (`src/pages/AboutPage.tsx`)**:
   - Hero com H1 `"Engenharia de software com foco em longevidade e impacto real"` e subtítulo editorial contextualizando a software house, o fundador e a liderança técnica.
   - Seção "Nossa Jornada" com timeline histórica alternada (desktop: linha horizontal com nós e balões alternados acima/abaixo; mobile: linha vertical lateral contínua com marcos empilhados).
   - Seção "Missão e Princípios de Engenharia" em formato de Manifesto Técnico / Tabela de Diretrizes (`divide-y`), eliminando os 3 cards fechados genéricos.
   - Bloco de fechamento da página com chamada para contato e botão `"Fale conosco"` apontando para `/contato`.
3. **Atualização de Testes**:
   - `src/components/layout/__tests__/Header.test.tsx`: assertar `"Sobre nós"`.
   - `src/pages/__tests__/pages.test.tsx`: assertar novo H1 e elementos da `AboutPage`.
   - `e2e/multi-route-navigation.spec.ts`: assertar `"Sobre nós"` no menu e novo H1 da rota `/sobre`.
   - `scripts/prerender.js`: atualizar H1 no pré-render da rota `sobre`.
4. **Execução de Quality Gates**:
   - TypeScript (`npx tsc --noEmit` - 0 erros)
   - ESLint (`npm run lint` - 0 erros, 0 warnings)
   - Vitest (`npm test -- --run` - 30 suítes, 189 testes passando)
   - Playwright (`npx playwright test` - 43 testes passando)
   - Build de produção (`npm run build` - 0 warnings > 600KB, prerender OK)
5. **Documentação e Finalização**:
   - Validação visual com captura de screenshot Playwright (`sobre-desktop-fullpage.png`, `sobre-mobile-fullpage.png`).
   - Preenchimento de `reviews/QA-081.md`.
   - Atualização de `PROJECT.md` e `CHANGELOG.md`.
   - Commit Git com mensagem em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Atualizar `src/components/layout/Header.tsx` para `"Sobre nós"`.
- [x] Refatorar `src/pages/AboutPage.tsx` com Hero, Timeline Alternada, Manifesto Técnico e CTA de Fechamento.
- [x] Atualizar testes unitários (`Header.test.tsx`, `pages.test.tsx`).
- [x] Atualizar testes E2E (`multi-route-navigation.spec.ts`).
- [x] Atualizar `scripts/prerender.js` com o H1 canônico.
- [x] Executar Quality Gates:
  - [x] TypeScript (`npx tsc --noEmit` - 0 erros)
  - [x] ESLint (`npm run lint` - 0 erros, 0 warnings)
  - [x] Vitest (`npm test -- --run` - 30 suítes, 189 testes passando)
  - [x] Playwright (`npx playwright test` - 43 testes passando)
  - [x] Build (`npm run build` - 0 warnings > 600KB, prerender OK)
- [x] Capturar evidências visuais e salvar em artifacts.
- [x] Criar relatório `reviews/QA-081.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit em português (pt-BR) no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-081-sobre-nos-timeline-e-manifesto.md` (Criado / Aprovado)
- `tasks/TASK-081-sobre-nos-timeline-e-manifesto.md` (Criado)
- `src/components/layout/Header.tsx` (Modificar)
- `src/pages/AboutPage.tsx` (Modificar)
- `src/components/layout/__tests__/Header.test.tsx` (Modificar)
- `src/pages/__tests__/pages.test.tsx` (Modificar)
- `e2e/multi-route-navigation.spec.ts` (Modificar)
- `reviews/QA-081.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
