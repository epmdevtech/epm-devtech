# TASK-042 — ScrollToTop: Neutralização Visual de Cores (Borda Fina Neutra, Remoção de Verde e Foco Utilitário)

| Campo              | Valor                                                                               |
|--------------------|-------------------------------------------------------------------------------------|
| **ID**             | TASK-042                                                                            |
| **SPEC**           | SPEC-042                                                                            |
| **Data de início** | 2026-09-10                                                                          |
| **Agente**         | Gemini/Antigravity                                                                  |
| **Status**         | ✅ Concluída                                                                        |

---

## Escopo da Tarefa

1. **Atualização do Componente (`src/components/ui/ScrollToTop.tsx`)**:
   - Substituir `border-emerald-500` por `border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700`.
   - Substituir `text-emerald-600 dark:text-emerald-400` por `text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100`.
   - Atualizar a borda do Tooltip de `border-emerald-500/30` para `border-zinc-200 dark:border-zinc-800`.
   - Preservar ícone `ChevronUp` (20px, strokeWidth 2.5), acionamento em >450px, animação suave de fade, smooth scroll e elevação sobre o rodapé.
2. **Atualização dos Testes Unitários (`src/components/ui/__tests__/ScrollToTop.test.tsx`)**:
   - Validar classes neutras `border-zinc-200` e ausência de `border-emerald-500`.
3. **Execução de Quality Gates**:
   - `npm run test` (135/135 testes).
   - `npm run lint` (0 erros).
   - `npm run build` (sucesso, chunks < 600KB).
   - `npx playwright test` (10/10 testes).
4. **Finalização e Documentação**:
   - Criar `reviews/QA-042.md`.
   - Atualizar status desta task para `✅ Concluída`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Criar commit semântico.

---

## Arquivos Criados / Modificados

- `specs/SPEC-042-scroll-to-top-neutro-sem-verde.md` (Criado / Aprovado)
- `tasks/TASK-042-scroll-to-top-neutro-sem-verde.md` (Criado)
- `src/components/ui/ScrollToTop.tsx` (A modificar)
- `src/components/ui/__tests__/ScrollToTop.test.tsx` (A modificar)
- `reviews/QA-042.md` (A criar)
- `PROJECT.md` (A modificar)
- `CHANGELOG.md` (A modificar)
