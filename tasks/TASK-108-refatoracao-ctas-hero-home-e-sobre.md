# TASK-108 — Refatoração dos CTAs do Hero da Home e da Rota Sobre Nós

| Campo              | Valor                    |
|--------------------|--------------------------|
| **ID**             | TASK-108                 |
| **SPEC**           | SPEC-108                 |
| **Data de início** | 2026-10-07               |
| **Agente**         | Gemini/Antigravity       |
| **Status**         | Concluído                |

---

## Escopo da Implementação

1. **`Hero.tsx`**:
   - Manter CTA primário único apontando para `/contact`.
   - Atualizar texto para `"VAMOS CONVERSAR"` com `uppercase tracking-[0.04em] font-semibold`.
   - Remover botão secundário `"CONHEÇA AS SOLUÇÕES"`.
2. **`AboutPage.tsx`**:
   - Remover botão de CTA da primeira dobra (Hero).
   - Inserir/garantir bloco de fechamento comercial (Bottom CTA) com `"VAMOS CONVERSAR"` apontando para `/contact`.
3. **Testes Unitários & E2E**:
   - Atualizar `src/components/sections/__tests__/Hero.test.tsx`.
   - Atualizar `e2e/design-system-and-stability.spec.ts`.
4. **Validação & Docs**:
   - Executar `npm run test:coverage`.
   - Executar `npm run lint`.
   - Executar `npm run build`.
   - Executar `npm run test:e2e`.
   - Elaborar `reviews/QA-108.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Checklist de Implementação

- [x] `Hero.tsx` atualizado com CTA único "VAMOS CONVERSAR" e botão secundário removido
- [x] `AboutPage.tsx` atualizado com remoção do CTA do Hero e inclusão do Bottom CTA
- [x] Testes unitários atualizados (`Hero.test.tsx`)
- [x] Testes E2E atualizados (`design-system-and-stability.spec.ts`)
- [x] `npm run test:coverage` aprovado (cobertura ≥ 90%)
- [x] `npm run lint` aprovado (zero erros)
- [x] `npm run build` aprovado (sem chunks > 600KB)
- [x] `npm run test:e2e` aprovado (100% dos testes passando)
- [x] `QA-108.md` gerado
- [x] `PROJECT.md` e `CHANGELOG.md` atualizados
