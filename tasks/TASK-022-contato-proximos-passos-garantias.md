# TASK-022 — Refatoração do Card de Contato: Bloco de Próximos Passos e Garantias

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-022                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluído                                                          |

---

## 1. Escopo de Arquivos Afetados

### Componentes de UI
- `src/components/sections/Contact.tsx`:
  - Substituir os canais redundantes do lado escuro pelo fluxo de "Próximos Passos & Garantias".
  - Título: "O que acontece a seguir?"
  - Texto de apoio: "Nosso processo é direto com a engenharia, sem intermediários comerciais:"
  - 3 blocos: "Diagnóstico Técnico", "Retorno em até 24 Horas", "Sigilo e Segurança".
  - Rodapé do card com divisor e chamada rápida: "Prefere atendimento imediato?" + "Chamar no WhatsApp direto →".

### Testes
- `src/components/sections/__tests__/Contact.test.tsx`:
  - Atualizar asserções para cobrir o novo conteúdo de próximos passos, garantias e chamada para o WhatsApp.

### Documentação SDD
- `reviews/QA-022.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Refatorar coluna direita em `src/components/sections/Contact.tsx` com o fluxo de próximos passos e garantias
- [x] Atualizar testes unitários em `src/components/sections/__tests__/Contact.test.tsx`
- [x] Executar Quality Gates: `npm run test:coverage` (99.26% de cobertura em Contact.tsx, 98.24% global)
- [x] Executar Quality Gates: `npm run lint` (0 erros)
- [x] Executar Quality Gates: `npm run build` (sem warnings > 600KB)
- [x] Executar Quality Gates: `npx playwright test` (8/8 aprovados)
- [x] Preencher relatório de QA em `reviews/QA-022.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git
