# TASK-026 — Correção Definitiva do Layout Shift no Header ao Abrir Dropdown

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-026                                                              |
| **Data**      | 2026-09-07                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluída — 07/09/2026                                             |

---

## 1. Contexto

Regressão confirmada: o layout shift no header fixo ao abrir o dropdown do contato **persiste** mesmo após a SPEC-024. Investigação profunda revelou que a correção anterior (especificidade simples `body[data-scroll-locked]` no CSS estático) era sobrescrita pela regra dinâmica injetada pela `react-remove-scroll-bar` via `styleSingleton`.

---

## 2. Checklist

- [x] Investigar causa raiz (especificidade CSS vs. estilos injetados dinamicamente)
- [x] Corrigir seletor em `index.css`: `html body[data-scroll-locked]` (especificidade 0,1,2 > 0,1,1)
- [x] Adicionar blindagem explícita para o header no CSS: `html body[data-scroll-locked] header`
- [x] Executar Quality Gates: `npm run lint` (0 erros)
- [x] Executar Quality Gates: `npm run test:coverage` (99/99 passando, 98.25%)
- [x] Executar Quality Gates: `npm run build` (sucesso, chunks < 600KB)
- [x] Executar Quality Gates: `npx playwright test` (9/9 passando, 50.6s)
- [x] Gerar relatório de evidências em `reviews/QA-026.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git

---

## 3. Diagnóstico Técnico

### Causa Raiz
A `react-remove-scroll-bar` injeta dinamicamente via `styleSingleton`:
```css
body[data-scroll-locked] {
  overflow: hidden !important;
  margin-right: GAP_PX !important;
}
```

A especificidade de `body[data-scroll-locked]` = (0,1,1) — mais alta que o seletor da correção anterior (0,0,1). E ao ser injetada **após** o CSS estático, vence pelo critério de ordem.

### Solução
Em `index.css`:
```css
/* Especificidade (0,1,2) > (0,1,1) da biblioteca: html + body[attr] */
html body[data-scroll-locked] {
  overflow: visible !important;
  margin-right: 0px !important;
  padding-right: 0px !important;
}
```

Adicionalmente, usar a variável CSS `--removed-body-scroll-bar-size` exposta pela biblioteca para compensar o margin no `header` fixo:
```css
/* Compensação automática da margem da scrollbar no header */
body[data-scroll-locked] header {
  margin-right: var(--removed-body-scroll-bar-size, 0px) !important;
}
```
