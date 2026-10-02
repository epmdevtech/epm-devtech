# SPEC-080 — Remoção da Badge de AWS, Correção de Tooltips Inferiores e Regra de Commits em PT-BR

- **Status:** APROVADO (por Elessandro Prestes Macedo)
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo
- **Branch:** `develop`

---

## 1. Contexto e Motivação

O Product Owner solicitou três correções e diretrizes essenciais:
1. **Remoção da Badge `[Certificado]` da AWS**: Como o PO não possui a certificação oficial AWS, a exibição do selo em `AWS` não reflete a realidade documental e deve ser removida imediatamente.
2. **Correção do Não Aparecimento de Tooltips nas Tecnologias Inferiores**:
   - Ao passar o mouse sobre as tecnologias da linha superior (React, TypeScript, Node.js, AWS), os balões de informação funcionavam, mas nas tecnologias da linha inferior (Vue.js, PHP, Laravel, Angular, Azure), o balão não aparecia ou sofria colapso de dimensões.
   - **Diagnóstico Técnico**: O componente base `src/components/ui/tooltip.tsx` não encapsulava o `TooltipPrimitive.Content` em `<TooltipPrimitive.Portal>`. Sem o Portal do Radix, o tooltip era renderizado inline dentro do fluxo flexbox; as transformações e o contexto de empilhamento (stacking context) faziam com que o motor Popper/Floating UI calculasse dimensões microscópicas (0.95px x 0.95px) e colidisse de forma defeituosa nas linhas de quebra inferiores.
3. **Registro Formal da Regra de Commits em Português (pt-BR) no SDD**:
   - Registrar expressamente em `AGENTS.md` e `GEMINI.md` a obrigatoriedade de que todas as mensagens de commit do Git sejam redigidas em português do Brasil (pt-BR).

---

## 2. Decisões Técnicas e de Design

### 2.1. Ajuste em `src/config/architecture.ts`
- Remover as propriedades `badge: "Certificado"` e `badgeVariant: "amber"` da tecnologia **AWS**.
- Manter **Node.js** com a badge `[Core Runtime]`.
- Manter as 9 tecnologias aprovadas: React, TypeScript, Node.js, AWS, Vue.js, PHP, Laravel, Angular, Azure.

### 2.2. Correção de `src/components/ui/tooltip.tsx`
- Encapsular `TooltipPrimitive.Content` dentro de `<TooltipPrimitive.Portal>`.
- Garantir que o tooltip seja projetado no `document.body` com `z-50`, eliminando qualquer interferência de `transform` ou `overflow` do container pai.
- Em `ArchitecturalBlueprint.tsx`, definir `sideOffset={8}`, `avoidCollisions={true}` e garantir padding e interação consistentes em todas as resoluções.

### 2.3. Atualização Documental em `AGENTS.md` e `GEMINI.md`
- Incluir regra explícita nas seções de "Regras Gerais":
  > **Sempre** escrever as mensagens de commit do Git em Português do Brasil (pt-BR) (ex.: `feat(engenharia): ...`, `fix(ui): ...`, `docs: ...`). Nunca redigir mensagens de commit em inglês.

---

## 3. Arquivos Envolvidos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-080-engenharia-ajuste-aws-e-tooltips-inferiores.md` | Criar | Especificação técnica |
| `tasks/TASK-080-engenharia-ajuste-aws-e-tooltips-inferiores.md` | Criar | Tarefa de execução SDD |
| `src/config/architecture.ts` | Modificar | Remoção da badge de certificado da AWS |
| `src/components/ui/tooltip.tsx` | Modificar | Inclusão de `<TooltipPrimitive.Portal>` |
| `src/components/sections/ArchitecturalBlueprint.tsx` | Modificar | Refinamento de triggers e tooltips |
| `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` | Modificar | Testes unitários atualizados |
| `AGENTS.md` / `GEMINI.md` | Modificar | Adição da regra de commits em português |
| `reviews/QA-080.md` | Criar | Relatório de validação dos quality gates |
| `PROJECT.md` / `CHANGELOG.md` | Modificar | Atualização canônica documental |

---

## 4. Critérios de Aceite

1. [ ] A tecnologia AWS é renderizada sem qualquer menção ou badge de `Certificado`.
2. [ ] `TooltipContent` em `src/components/ui/tooltip.tsx` utiliza `<TooltipPrimitive.Portal>`.
3. [ ] Os balões de informação (tooltips) são exibidos perfeitamente ao passar o mouse ou focar em TODAS as 9 tecnologias (tanto na linha superior quanto na linha inferior).
4. [ ] `AGENTS.md` e `GEMINI.md` contêm a regra mandatória de mensagens de commit em português pt-BR.
5. [ ] Todos os testes unitários e E2E passam com 100% de sucesso.
6. [ ] O commit da entrega é redigido em português do Brasil (pt-BR).
