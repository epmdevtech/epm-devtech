# TASK-024 — Correção do Layout Shift e Estufamento do Menu Superior ao Abrir Dropdown

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-024                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluída                                                          |

---

## 1. Escopo de Arquivos Afetados

### Estilos Globais
- `src/index.css`:
  - Adicionar `scrollbar-gutter: stable;` em `html`
  - Inserir regra de contenção para `body[data-scroll-locked]` garantindo `overflow: visible !important` e zerando margens espúrias

### Testes E2E
- `e2e/design-system-and-stability.spec.ts`:
  - Adicionar teste automatizado de verificação de zero layout shift no Header e nos itens de navegação ao clicar no Select da seção de Contato

### Documentação SDD
- `specs/SPEC-024-correcao-layout-shift-menu-superior-dropdown.md`
- `tasks/TASK-024-correcao-layout-shift-menu-superior-dropdown.md`
- `reviews/QA-024.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Aplicar `scrollbar-gutter: stable;` no `html` em `src/index.css`
- [x] Inserir normalização de `body[data-scroll-locked]` em `src/index.css`
- [x] Adicionar teste de estabilidade de layout do menu superior no Playwright
- [x] Executar Quality Gates: `npm run test:coverage`
- [x] Executar Quality Gates: `npm run lint`
- [x] Executar Quality Gates: `npm run build`
- [x] Executar Quality Gates: `npx playwright test`
- [x] Preencher relatório de QA em `reviews/QA-024.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git
