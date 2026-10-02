# TASK-071 — Limpeza Estrutural da Home e Padronização de CTAs (Header e Hero)

- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-01
- **SPEC de Referência:** SPEC-071

---

## 1. Escopo de Arquivos

### 1.1. Modificações
- [x] `src/pages/Home.tsx`: Remoção da seção intermediária de CTA `<section id="contato">` e imports órfãos (`Clock`, `Button`).
- [x] `src/components/layout/Header.tsx`: Atualização do label do CTA desktop e mobile para "Fale conosco".
- [x] `src/components/sections/Hero.tsx`: Atualização do label do CTA primário para "Vamos conversar".

### 1.2. Testes e Quality Gates
- [x] `src/components/layout/__tests__/Header.test.tsx`
- [x] `src/components/sections/__tests__/Hero.test.tsx`
- [x] `src/pages/__tests__/pages.test.tsx`
- [x] `e2e/multi-route-navigation.spec.ts`
- [x] `e2e/design-system-and-stability.spec.ts`
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] `npm test -- --run`
- [x] `npx playwright test`
- [x] `npm run build`
- [x] `reviews/QA-071.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`
