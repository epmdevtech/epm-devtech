# TASK-059 — Hero Slim e Minimalista (Sem Animações Exageradas) & CTA de Header

- **Status:** Concluída
- **Responsável:** Gemini/Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-01
- **SPEC de Referência:** SPEC-059

---

## 1. Escopo de Arquivos

### Documentação e Auditorias Prévias
- [x] `docs/visual-identity-inventory.md` (Inventário completo de tokens e travas)
- [x] `docs/hero-diagnosis.md` (Diagnóstico e medições da baseline)
- [x] `docs/evidence/hero-before/` (Capturas da baseline em 5 viewports Dark e Light)
- [x] `specs/SPEC-059-hero-slim-minimalista.md` (Especificação formal)

### Implementação de Componentes
- [x] `src/components/sections/Hero.tsx` (Redesenho slim em coluna única, sem gradientes, sem animações pesadas, transição com nó esmeralda)
- [x] `src/components/layout/Header.tsx` (Adição do botão CTA de acento no desktop e mobile, antecipando breakpoint)
- [x] Remoção de código morto exclusivo:
  - [x] `src/components/ui/lamp.tsx`
  - [x] `src/components/sections/hero/HeroBadge.tsx`
  - [x] `src/components/sections/hero/HeroArchitecture.tsx`
  - [x] `src/index.css` (remover regras `@keyframes hero-orbit` e `.hero-brand-aura`)

### Testes e Verificação de Identidade
- [x] `src/components/sections/__tests__/Hero.test.tsx` (Atualizar testes unitários para a nova estrutura slim, textos exatos e ausência do diagrama)
- [x] `src/components/layout/__tests__/Header.test.tsx` (Atualizar testes para cobrir o novo botão CTA)
- [x] `e2e/hero-visual-validation.spec.ts` (Atualizar e estender validação visual para novo layout)
- [x] `e2e/hero-identity-token-locks.spec.ts` (Criar teste automatizado rigoroso de tokens e ausência de gradientes no Hero)

### Quality Gates e Entrega
- [x] Validação de tipos (`npx tsc --noEmit`)
- [x] Validação de linter (`npm run lint`)
- [x] Bateria de testes unitários e cobertura (`npm run test:coverage` ≥ 90%)
- [x] Bateria de testes E2E Playwright (`npm run test:e2e`)
- [x] Build de produção (`npm run build`)
- [x] Auditoria Lighthouse pós-mudança (Desktop e Mobile)
- [x] Capturas após a mudança em `docs/evidence/hero-after/`
- [x] Relatório final de QA em `reviews/QA-059.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`
