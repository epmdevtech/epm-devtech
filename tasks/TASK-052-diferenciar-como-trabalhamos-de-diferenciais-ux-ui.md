# TASK-052 — Diferenciar Visual e Estruturalmente as Seções "Como Trabalhamos" e "Diferenciais" (UX/UI)

**Objetivo**: Implementar a diferenciação de UX/UI entre "Como trabalhamos" (sequencial, timeline, cards numerados) e "Diferenciais" (paralelo, 2 colunas, lista de linhas, chips de práticas, sem timeline nem numeração) conforme SPEC-052.

**SPEC de Referência**: `specs/SPEC-052-diferenciar-como-trabalhamos-de-diferenciais-ux-ui.md`

## Checklist de Execução

- [x] 1. **Baseline Visual**: Capturar evidências visuais do estado anterior em 1440px, 768px e 375px (`docs/evidence/diff-hww/before-*`).
- [x] 2. **Refatoração de "Como Trabalhamos" (`HowWeWork.tsx`)**:
  - Implementar `<ol role="list">` com `<li>` para cada etapa do processo.
  - Adicionar `aria-hidden="true"` aos números de etapas (`01..04`).
  - Implementar timeline vertical no mobile (< 1024px) com alinhamento preciso.
  - Garantir suporte completo a `prefers-reduced-motion` com `useReducedMotion()`.
  - Revisar contraste WCAG AA das tags e descrições.
  - Garantir ausência de falsas affordances de clique.
- [x] 3. **Refatoração de "Diferenciais" (`Differentials.tsx`)**:
  - Implementar layout de 2 colunas em desktop (≥ 1024px) e coluna única em mobile/tablet.
  - Coluna esquerda: `SectionHeader` alinhado à esquerda (`align="left"`), bloco de práticas com chips/badges usando componente `Badge`.
  - Coluna direita: Lista semântica `<ul>` com 3 `<li>` em formato de linhas sem moldura de card, com divisor sutil, ícones e barra vertical accent no hover.
  - Remover timeline horizontal, pinos, números `01/02/03`, setas `→` e cards com moldura.
  - Implementar animação stagger suave de revelação respeitando `prefers-reduced-motion`.
- [x] 4. **Testes Unitários**:
  - Atualizar `src/components/sections/__tests__/Differentials.test.tsx`.
  - Atualizar `src/components/sections/__tests__/HowWeWork.test.tsx`.
  - Validar cobertura ≥ 90% via `npm run test:coverage` (atingido 98.57%).
- [x] 5. **Captura Visual "Depois"**:
  - Capturar evidências visuais do novo estado em 1440px, 768px e 375px (`docs/evidence/diff-hww/after-*`).
- [x] 6. **Quality Gates & E2E**:
  - `npx tsc --noEmit` (0 erros)
  - `npm run lint` (0 erros)
  - `npm run test:e2e` (16/16 testes passando)
  - `npm run build` (Chunks < 145 kB)
  - Auditoria Axe-core (0 violações WCAG 2.2 AA)
- [x] 7. **Documentação & Relatório**:
  - Gerar `reviews/QA-052.md`.
  - Atualizar `PROJECT.md` e `CHANGELOG.md`.
  - Apresentar o relatório final nas seções especificadas pelo PO.
  - **NÃO COMMITAR**: Manter as alterações uncommitted na branch `develop`.
