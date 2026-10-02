# TASK-068 — Redesign do Hero: Limpeza de Ruído e Janela de Arquitetura Ativa

- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-01
- **SPEC de Referência:** SPEC-068

---

## 1. Escopo de Arquivos

### 1.1. Modificações
- [x] `src/components/sections/Hero.tsx`:
  - Remoção da linha inferior e ponto estático verde.
  - Ajuste de espaçamento proporcional (`min-h-[85vh]` e `py-20 md:py-28`) e gradiente sutil.
  - Badge eyebrow refinada com `BrandChipIcon`.
  - H1 com kerning e impacto de alto padrão.
  - CTAs com feedback tátil e glow suave.
  - Micro social proof com indicador pulsante (`animate-ping`).
  - Janela Dev "Sistema & Arquitetura Ativa" com cabeçalho dev, status `HEALTHY / 99.9% uptime`, spotlight e camadas conectadas.

### 1.2. Testes e Quality Gates
- [x] `src/components/sections/__tests__/Hero.test.tsx`: Atualizar asserções para novos elementos e remoção do divisor.
- [x] `e2e/hero-identity-token-locks.spec.ts`: Atualizar testes E2E para harmonização com SPEC-068.
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] `npm test -- --run`
- [x] `npx playwright test`
- [x] `npm run build`
- [x] `reviews/QA-068.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`
