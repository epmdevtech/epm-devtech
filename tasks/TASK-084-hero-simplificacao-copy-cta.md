# TASK-084 — Simplificação do Hero: Foco no CTA Primário e Remoção da Faixa de Confiança

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-084-hero-simplificacao-copy-cta.md`

---

## 1. Escopo da Tarefa

1. **Refatoração da Coluna Esquerda do Hero (`Hero.tsx`)**:
   - Remover botão secundário de CTA "Ver soluções" (`#servicos`).
   - Manter botão primário "Vamos conversar" (`/contato`) como ação única e focal.
   - Remover bloco de Faixa de Confiança Operacional (`data-testid="hero-operational-trust"`) e respectivo divisor.
   - Preservar Eyebrow, H1 com acento cromático no brand teal e Subheadline editorial.
   - Preservar coluna direita (Seletor Interativo de Cenários de Negócio).
2. **Quality Gates & Testes**:
   - Atualizar testes unitários em `src/components/sections/__tests__/Hero.test.tsx`.
   - Atualizar testes E2E em `e2e/design-system-and-stability.spec.ts` se aplicável.
   - Executar `npm test`, `npm run lint`, `npx tsc --noEmit`, `npx playwright test` e `npm run build`.
3. **Documentação & Encerramento**:
   - Elaborar `reviews/QA-084.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Commit Git com mensagem em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Criar especificação `specs/SPEC-084-hero-simplificacao-copy-cta.md`.
- [x] Obter aprovação do PO.
- [x] Implementar alterações em `src/components/sections/Hero.tsx`.
- [x] Atualizar testes unitários (`Hero.test.tsx`).
- [x] Atualizar testes E2E se necessário (`design-system-and-stability.spec.ts`).
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Gerar capturas de tela e evidências visuais.
- [x] Elaborar relatório de QA (`reviews/QA-084.md`).
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-084-hero-simplificacao-copy-cta.md` (Criado)
- `tasks/TASK-084-hero-simplificacao-copy-cta.md` (Criado)
- `src/components/sections/Hero.tsx` (Modificar)
- `src/components/sections/__tests__/Hero.test.tsx` (Modificar)
- `e2e/design-system-and-stability.spec.ts` (Modificar se necessário)
- `reviews/QA-084.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
