# TASK-073 — Redesign Editorial da Página e Seção de Serviços (Z-Pattern & Garantias)

- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-01
- **SPEC de Referência:** SPEC-073

---

## 1. Escopo de Arquivos

### 1.1. Modificações
- [x] `src/components/sections/Services.tsx`:
  - Eliminar grid 2x2 de cards.
  - Implementar Z-Pattern alternado de 12 colunas para os 4 serviços.
  - Callout de contexto de negócio com borda lateral esmeralda (`border-l-2 border-brand/60 pl-4 py-2 bg-brand/5 rounded-r-md`).
  - Containers escuros refinados para os 4 mocks com profundidade e backdrop blur.
- [x] `src/pages/ServicesPage.tsx`:
  - Faixa de Garantias de Engenharia em 3 colunas limpas com tags monospace `[ 01 // ESCOPO ]`, etc., sem cards nem checks.
  - CTA final integrado com botões "Iniciar diagnóstico do projeto" e "Entenda como trabalhamos →".

### 1.2. Testes e Quality Gates
- [x] `src/components/sections/__tests__/Services.test.tsx`
- [x] `src/pages/__tests__/pages.test.tsx`
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] `npm test -- --run`
- [x] `npx playwright test`
- [x] `npm run build`
- [x] `reviews/QA-073.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`
