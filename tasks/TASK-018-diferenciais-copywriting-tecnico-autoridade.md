# TASK-018 — Refatoração da Seção Diferenciais: Copywriting Técnico, Tipografia Monocromática e Autoridade de Engenharia

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-018                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluído                                                         |

---

## 1. Escopo de Arquivos Afetados

### Componentes de UI
- `src/components/sections/Differentials.tsx`:
  - Atualizar subtítulo no `SectionHeader` para "Rigor de engenharia, arquitetura escalável e compromisso com entregas previsíveis em cada linha de código."
  - Atualizar os dados dos 6 cards no array `differentials` (títulos, tags e descrições).
  - Semantizar o título dos cards de `div` para `h3` com a classe `.diff-card-title`.
  - Preservar rigorosamente a linha do tempo horizontal no topo, containers, badges 01 a 06, setas e ícones no rodapé.

### Testes
- `src/components/sections/__tests__/Differentials.test.tsx`:
  - Atualizar asserções com os 6 novos títulos de cards e tags técnicas.
  - Atualizar asserção de renderização com viewport inicial (`useInView: false`).

### Documentação SDD
- `reviews/QA-018.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Atualizar dados do array `differentials`, subtítulo do `SectionHeader` e semântica `h3` em `Differentials.tsx`
- [x] Atualizar testes unitários em `Differentials.test.tsx`
- [x] Executar Quality Gates: `npm run lint`, `npm run test:coverage`, `npm run build`, `npx playwright test`
- [x] Preencher relatório de QA em `reviews/QA-018.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git
