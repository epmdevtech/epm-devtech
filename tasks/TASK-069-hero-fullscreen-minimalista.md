# TASK-069 — Hero Fullscreen Minimalista: Remoção de Badges e Enquadramento 100vh

- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-01
- **SPEC de Referência:** SPEC-069

---

## 1. Escopo de Arquivos

### 1.1. Modificações
- [x] `src/components/sections/Hero.tsx`:
  - Retirar badge/cápsula ao redor de "ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO".
  - Retirar badge/cápsula ao redor de "HEALTHY / 99.9% uptime" dentro da janela dev.
  - Remover a frase "Sistemas em produção nos setores..." e o ponto verde.
  - Remover o parágrafo descritivo "Desenvolvemos sistemas corporativos...".
  - Configurar seção com `min-h-screen min-h-[100svh] flex flex-col justify-center` cobrindo 100% da viewport.

### 1.2. Testes e Quality Gates
- [x] `src/components/sections/__tests__/Hero.test.tsx`: Atualizar suíte unitária.
- [x] `e2e/hero-identity-token-locks.spec.ts`: Atualizar suíte E2E.
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] `npm test -- --run`
- [x] `npx playwright test`
- [x] `npm run build`
- [x] `reviews/QA-069.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`
