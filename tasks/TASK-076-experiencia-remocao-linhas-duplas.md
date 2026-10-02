# TASK-076 — Remoção de Linhas Duplas e Harmonização de Divisores na Rota /experiencia

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-076-experiencia-remocao-linhas-duplas.md`

---

## 1. Escopo da Tarefa

Remover a redundância visual de linhas duplas horizontais entre `PageHeader` e a seção de métricas (`Authority`) na rota `/experiencia`, harmonizando os divisores entre as seções.

### Itens de Trabalho:
- [x] Atualizar `src/components/sections/Authority.tsx` para aceitar a prop opcional `className?: string`, combinando com as classes base via `cn()`.
- [x] Atualizar `src/pages/ExperiencePage.tsx` passando `className="border-y-0 bg-transparent py-6 sm:py-10"` para `<Authority />`.
- [x] Adicionar teste unitário em `src/components/sections/__tests__/Authority.test.tsx` garantindo que classes customizadas sejam mescladas corretamente sem quebrar o layout padrão.
- [x] Executar Quality Gates:
  - [x] TypeScript (`npx tsc --noEmit`)
  - [x] ESLint (`npm run lint`)
  - [x] Vitest (`npm test -- --run`)
  - [x] Playwright (`npx playwright test`)
  - [x] Build (`npm run build`)
- [x] Preencher `reviews/QA-076.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-076-experiencia-remocao-linhas-duplas.md` (Criado / Aprovado)
- `tasks/TASK-076-experiencia-remocao-linhas-duplas.md` (Criado)
- `src/components/sections/Authority.tsx` (Modificar)
- `src/pages/ExperiencePage.tsx` (Modificar)
- `src/components/sections/__tests__/Authority.test.tsx` (Modificar)
- `reviews/QA-076.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
