# TASK-083 — Refatoração do Hero: Seletor Interativo de Cenários de Negócio e Proposta de Valor Orientada a Decisores

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-083-hero-seletor-cenarios-negocio.md`

---

## 1. Escopo da Tarefa

1. **Refatoração da Coluna Esquerda do Hero**:
   - Manter eyebrow `[ ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO ]` com `BrandChipIcon`.
   - Inserir acento cromático no H1: *"Engenharia de software para `<span className="text-text-brand">construir, integrar e evoluir</span>` sistemas."*
   - Adicionar subheadline editorial: *"Sistemas sob medida para empresas que precisam criar plataformas, conectar operações ou modernizar o software do seu negócio."*
   - Preservar CTAs padronizados: "Vamos conversar" (`/contato`) e "Ver soluções" (`#servicos`).
   - Adicionar faixa de confiança operacional: *"Aplicações corporativas críticas · Energia, educação, indústria e varejo · Retorno em até 24h úteis"*.
2. **Refatoração da Coluna Direita (Seletor de Cenários de Negócio)**:
   - Substituir card de topologia de código (`architecture.overview.ts`) pelo painel "O que sua empresa precisa agora?".
   - Implementar os 4 cenários interativos com affordance clara, nós circulares e setas `ArrowUpRight`.
   - Adicionar linha condutora SVG vertical conectando os 4 nós, com animação pontual (`pathLength: 0 -> 1`) e suporte estrito a `prefers-reduced-motion`.
   - Adicionar interatividade de hover/foco iluminando os nós em cor de destaque (`text-brand`/`bg-brand`).
3. **Quality Gates & Testes**:
   - Atualizar testes unitários em `src/components/sections/__tests__/Hero.test.tsx`.
   - Atualizar testes E2E em `e2e/design-system-and-stability.spec.ts` para acomodar o acento visual no H1 do Hero.
   - Executar `npm test`, `npm run lint`, `npx tsc --noEmit`, `npx playwright test` e `npm run build`.
4. **Finalização**:
   - Elaborar `reviews/QA-083.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Commit Git com mensagem em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Criar especificação `specs/SPEC-083-hero-seletor-cenarios-negocio.md`.
- [x] Obter aprovação do PO.
- [x] Implementar novo `Hero.tsx` com seletor de cenários e copy de decisores.
- [x] Atualizar testes unitários (`Hero.test.tsx`).
- [x] Atualizar testes E2E (`design-system-and-stability.spec.ts`).
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Elaborar relatório de QA (`reviews/QA-083.md`).
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-083-hero-seletor-cenarios-negocio.md` (Criado)
- `tasks/TASK-083-hero-seletor-cenarios-negocio.md` (Criado)
- `src/components/sections/Hero.tsx` (Modificar)
- `src/components/sections/__tests__/Hero.test.tsx` (Modificar)
- `e2e/design-system-and-stability.spec.ts` (Modificar)
- `reviews/QA-083.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
