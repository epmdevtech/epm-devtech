# TASK-075 — Redesign da Rota /experiencia (Engineering Matrix & Enterprise Ledger)

- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-02
- **SPEC de Referência:** SPEC-075

---

## 1. Escopo de Arquivos

### 1.1. Modificações
- [x] `src/pages/ExperiencePage.tsx`:
  - Preservar integralmente o contador de números de escala (`<Authority />` / métricas com `CountUp`).
  - Substituir os cards 3D e mockups artificiais pela **Engineering Matrix** (Grid 2x2 com bordas internas limpas, badges de especialidade e lista inline de Stack & Soluções).
  - Transformar a Nota de Contexto em texto editorial monospace discreto com ponto indicador luminoso, declarando explicitamente "Não são clientes da EPM DevTech".
  - Substituir os 3 cards fechados de organizações pelo **Enterprise Ledger** horizontal contínuo com colunas alinhadas, badges de setor e efeito suave de hover.
  - Refinar o CTA de fechamento comercial para `/contato`.
- [x] `src/pages/__tests__/pages.test.tsx`:
  - Validar a renderização da `ExperiencePage` com o novo Enterprise Ledger, Engineering Matrix e aviso ético.

### 1.2. Quality Gates
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] `npm test -- --run`
- [x] `npx playwright test`
- [x] `npm run build`
- [x] `reviews/QA-075.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`
