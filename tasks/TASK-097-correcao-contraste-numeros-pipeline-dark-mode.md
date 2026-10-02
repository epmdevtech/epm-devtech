# TASK-097 — Correção do Contraste dos Marcadores Numéricos do Pipeline no Modo Escuro (Dark Mode)

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-097-correcao-contraste-numeros-pipeline-dark-mode.md`

---

## 1. Escopo da Tarefa

1. **Refatoração dos Tokens de Estilo em `HomeProcessPipeline.tsx`**:
   - Eliminar concatenações de prefixo `dark:${...}` em tempo de execução no elemento circular dos nós.
   - Definir classes CSS literais e completas para cada etapa:
     * Step 01: `border-zinc-300 dark:border-accent-blue/50 dark:group-hover:border-accent-blue` e `text-zinc-900 dark:text-accent-blue`.
     * Step 02: `border-zinc-300 dark:border-accent-violet/50 dark:group-hover:border-accent-violet` e `text-zinc-900 dark:text-accent-violet`.
     * Step 03: `border-zinc-300 dark:border-accent-amber/50 dark:group-hover:border-accent-amber` e `text-zinc-900 dark:text-accent-amber`.
     * Step 04: `border-zinc-300 dark:border-brand/50 dark:group-hover:border-brand` e `text-zinc-900 dark:text-text-brand`.
   - Elemento visual consome `${s.theme.nodeBorder} ${s.theme.nodeText}` diretamente.

2. **Testes Unitários Automatizados**:
   - Atualizar `src/components/sections/__tests__/HomeProcessPipeline.test.tsx`.
   - Validar a renderização dos quatro nós (01 a 04), títulos, descrições e a presença das classes de modo escuro para alto contraste.

3. **Validação de Quality Gates**:
   - `npx tsc --noEmit` (0 erros).
   - `npm run lint` (0 erros, 0 warnings).
   - `npm test -- --run` (33 suítes, 202 testes passando).
   - `npx playwright test` (46 testes passando).
   - `npm run build` (Chunks < 600KB, 7 rotas HTML pré-renderizadas).

4. **Captura de Evidências e Governança**:
   - Capturar screenshot do pipeline no Dark Mode (`pipeline-dark-mode-fixed.png`).
   - Preencher `reviews/QA-097.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit Git em pt-BR na branch `develop`.

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-097-correcao-contraste-numeros-pipeline-dark-mode.md`.
- [x] Obter aprovação formal do PO.
- [x] Refatorar `HomeProcessPipeline.tsx` com classes estáticas de modo escuro nos nós.
- [x] Atualizar suíte de testes unitários `HomeProcessPipeline.test.tsx`.
- [x] Executar Quality Gates (`tsc`, `lint`, `vitest`, `playwright`, `build`).
- [x] Capturar evidência visual do pipeline no Dark Mode.
- [x] Criar relatório `reviews/QA-097.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-097 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-097-correcao-contraste-numeros-pipeline-dark-mode.md` (Criado / Aprovado)
- `tasks/TASK-097-correcao-contraste-numeros-pipeline-dark-mode.md` (Criado / Concluído)
- `src/components/sections/HomeProcessPipeline.tsx` (Modificado)
- `src/components/sections/__tests__/HomeProcessPipeline.test.tsx` (Modificado)
- `reviews/QA-097.md` (Criado)
- `PROJECT.md` (Modificado)
- `CHANGELOG.md` (Modificado)
