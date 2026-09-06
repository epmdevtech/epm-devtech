# TASK-021 — Refatoração da Seção Contato: Layout em Card Duplo Unificado e Inputs Underline

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-021                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluído                                                          |

---

## 1. Escopo de Arquivos Afetados

### Componentes de UI
- `src/components/sections/Contact.tsx`:
  - Atualizar container para Card Duplo Unificado (`rounded-2xl overflow-hidden shadow-xl border border-zinc-200/80 dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-12`).
  - Lado esquerdo (`lg:col-span-7`): Título "Envie sua mensagem", inputs minimalistas de linha inferior (`border-0 border-b border-zinc-300 dark:border-zinc-700 bg-transparent rounded-none px-0 py-2.5 focus-visible:ring-0 focus-visible:border-emerald-500`), labels limpos e botão alinhado à esquerda.
  - Lado direito (`lg:col-span-5`): Contraste sóbrio escuro (`bg-zinc-900 text-white dark:bg-zinc-950`), título "Canais de Atendimento", texto de apoio e 4 itens com ícones circulares (`w-10 h-10 rounded-full bg-zinc-800 text-emerald-400`).
  - Subtítulo externo atualizado: "Não precisa ter todos os requisitos definidos. Conte-nos o que está acontecendo, qual processo precisa melhorar ou o que você gostaria de construir. Avaliaremos o melhor caminho técnico."

### Testes
- `src/components/sections/__tests__/Contact.test.tsx`:
  - Atualizar asserções para o novo layout de Card Duplo, novos títulos internos ("Envie sua mensagem", "Canais de Atendimento") e os 4 canais de atendimento.
- `e2e/design-system-and-stability.spec.ts`:
  - Calibração de tolerância de subpixel para canal azul de cor esmeralda `hsl(158 64% 42%)`.

### Documentação SDD
- `reviews/QA-021.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Implementar Card Duplo Unificado e inputs underline em `src/components/sections/Contact.tsx`
- [x] Atualizar testes unitários em `src/components/sections/__tests__/Contact.test.tsx`
- [x] Executar Quality Gates: `npm run test:coverage` (99.27% de cobertura em Contact.tsx, 98.25% global)
- [x] Executar Quality Gates: `npm run lint` (0 erros)
- [x] Executar Quality Gates: `npm run build` (sem warnings > 600KB)
- [x] Executar Quality Gates: `npx playwright test` (8/8 aprovados)
- [x] Preencher relatório de QA em `reviews/QA-021.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git
