# TASK-023 — Correção de Overflow e Alinhamento do Menu Dropdown no Formulário de Contato

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-023                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluída                                                          |

---

## 1. Escopo de Arquivos Afetados

### Componentes de UI
- `src/components/ui/select.tsx`:
  - No `SelectContent` com `position="popper"`, travar `max-w-[var(--radix-select-trigger-width)]` e `w-[var(--radix-select-trigger-width)]` para evitar que itens longos estufem a caixa além do trigger.
- `src/components/sections/Contact.tsx`:
  - Adicionar `relative w-full` ao container pai do campo "Desafio ou Tipo de Projeto".
  - Adicionar `w-full` ao `SelectTrigger`.
  - Configurar classes explícitas no `SelectContent` (`w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)] z-50 shadow-lg rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden`).
  - No `SelectItem`, garantir `text-left px-3 py-2 text-sm truncate` e envolver o texto em `<span className="truncate block w-full">`.

### Documentação SDD
- `reviews/QA-023.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Ajustar `SelectContent` em `src/components/ui/select.tsx` para respeitar `max-w-[var(--radix-select-trigger-width)]` quando popper
- [x] Refatorar campo "Desafio ou Tipo de Projeto" em `src/components/sections/Contact.tsx`
- [x] Executar Quality Gates: `npm run test:coverage`
- [x] Executar Quality Gates: `npm run lint`
- [x] Executar Quality Gates: `npm run build`
- [x] Executar Quality Gates: `npx playwright test`
- [x] Preencher relatório de QA em `reviews/QA-023.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git

