# TASK-038 — Hero Tagline: Substituição de Badge por Overline Minimalista com Linhas Flanqueadas

| Campo              | Valor                                                                               |
|--------------------|-------------------------------------------------------------------------------------|
| **ID**             | TASK-038                                                                            |
| **SPEC**           | SPEC-038                                                                            |
| **Data de início** | 2026-09-10                                                                          |
| **Agente**         | Gemini/Antigravity                                                                  |
| **Status**         | ✅ Concluída                                                                        |

---

## Escopo da Tarefa

1. **Atualização da Seção Hero (`src/components/sections/Hero.tsx`)**:
   - Remover o formato de badge em cápsula (`rounded-full`, fundos `bg-emerald-50 dark:bg-emerald-950/50`, bordas `border-emerald-200/70 dark:border-emerald-800/60`, sombra e dot pulsante).
   - Implementar o novo layout no estilo da referência Quordix "SELECTED PROJECTS":
     - Linhas horizontais flanqueadoras (`h-px w-6 sm:w-10 md:w-12 bg-emerald-600/60 dark:bg-emerald-400/60 shrink-0` com `aria-hidden="true"`).
     - Tipografia refinada: `text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-400 select-none`.
     - Container centralizado com espaçamento equilibrado: `inline-flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8`.
     - Preservar a animação de entrada com Framer Motion (`opacity: 0, y: 10` para `opacity: 1, y: 0`) respeitando `prefersReduced`.
2. **Atualização dos Testes Unitários (`src/components/sections/__tests__/Hero.test.tsx`)**:
   - Garantir que o nó da tagline continue sendo encontrado e renderizado com precisão.
   - Adicionar asserções para verificar ausência da classe badge antiga e presença do novo estilo de overline com linhas decorativas.
3. **Validação E2E Playwright (`e2e/design-system-and-stability.spec.ts`)**:
   - Executar os testes E2E para certificar ausência de regressões no Hero e na estabilidade do layout.
4. **Quality Gates & Evidências**:
   - Vitest com coverage ≥ 90%.
   - ESLint com 0 erros.
   - Build de produção sem warnings.
   - Criar `reviews/QA-038.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Criados / Modificados

- `specs/SPEC-038-hero-tagline-layout-selected-projects.md` (Criado / Aprovado)
- `tasks/TASK-038-hero-tagline-layout-selected-projects.md` (Criado)
- `src/components/sections/Hero.tsx` (A modificar)
- `src/components/sections/__tests__/Hero.test.tsx` (A modificar)
- `reviews/QA-038.md` (A criar)
- `PROJECT.md` (A modificar)
- `CHANGELOG.md` (A modificar)
