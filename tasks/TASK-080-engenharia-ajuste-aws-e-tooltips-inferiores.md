# TASK-080 — Remoção da Badge de AWS, Correção de Tooltips Inferiores e Regra de Commits em PT-BR

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-080-engenharia-ajuste-aws-e-tooltips-inferiores.md`

---

## 1. Escopo da Tarefa

1. **Remoção de Badge da AWS (`src/config/architecture.ts`)**:
   - Remover `badge: "Certificado"` e `badgeVariant: "amber"` da tecnologia AWS.
2. **Correção de Tooltips (`src/components/ui/tooltip.tsx` e `ArchitecturalBlueprint.tsx`)**:
   - Encapsular `TooltipPrimitive.Content` em `<TooltipPrimitive.Portal>`.
   - Adicionar `disableHoverableContent={true}` no `TooltipProvider` para evitar colisão de grace area/safe polygon entre badges tipográficas contíguas.
   - Garantir renderização via portal no `document.body` com `z-50`, eliminando cálculo de 1px/0.95px nas tecnologias da linha inferior.
3. **Regra de Commits em Português no SDD (`AGENTS.md` e `GEMINI.md`)**:
   - Registrar regra mandatória de que mensagens de commit do Git devem ser redigidas em português do Brasil (pt-BR).
4. **Atualização de Testes e Validação de Quality Gates**:
   - Atualizar testes unitários em `ArchitecturalBlueprint.test.tsx`.
   - Executar TypeScript, ESLint, Vitest, Playwright e Build.
   - Confirmar abertura e dimensões de tooltips na linha inferior via script automatizado e E2E.
   - Preencher `reviews/QA-080.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit em português do Brasil (pt-BR) no branch `develop`.

### Itens de Trabalho:
- [x] Atualizar `AGENTS.md` e `GEMINI.md` com a regra de mensagens de commit em pt-BR.
- [x] Atualizar `src/config/architecture.ts` removendo a badge de certificado da AWS.
- [x] Atualizar `src/components/ui/tooltip.tsx` adicionando `<TooltipPrimitive.Portal>`.
- [x] Atualizar `src/components/sections/ArchitecturalBlueprint.tsx` com `disableHoverableContent={true}`.
- [x] Atualizar testes em `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` e `e2e/design-system-and-stability.spec.ts`.
- [x] Executar Quality Gates:
  - [x] TypeScript (`npx tsc --noEmit` - 0 erros)
  - [x] ESLint (`npm run lint` - 0 erros, 0 warnings)
  - [x] Vitest (`npm test -- --run` - 30 suítes, 189 testes passando)
  - [x] Playwright (`npx playwright test` - 43 testes passando)
  - [x] Build (`npm run build` - 0 warnings > 600KB, prerender OK)
- [x] Validar visualmente com screenshot Playwright (`php-tooltip-verified.png`, `azure-tooltip-verified.png`, `aws-tooltip-verified.png`).
- [x] Preencher `reviews/QA-080.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit em português (pt-BR) no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-080-engenharia-ajuste-aws-e-tooltips-inferiores.md` (Criado / Aprovado)
- `tasks/TASK-080-engenharia-ajuste-aws-e-tooltips-inferiores.md` (Criado)
- `AGENTS.md` (Modificar)
- `GEMINI.md` (Modificar)
- `src/config/architecture.ts` (Modificar)
- `src/components/ui/tooltip.tsx` (Modificar)
- `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` (Modificar)
- `reviews/QA-080.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
