# TASK-074 — Refatoração da Rota /como-trabalhamos (Process Explorer & Manifesto Técnico)

- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-01
- **SPEC de Referência:** SPEC-074

---

## 1. Escopo de Arquivos

### 1.1. Novos Arquivos
- [x] `src/components/sections/ProcessExplorer.tsx`:
  - Componente Process Explorer com 4 etapas: Entendemos, Definimos, Desenvolvemos, Evoluímos.
  - Desktop (`md:`): Navegação vertical em tabs à esquerda, painel de detalhamento à direita com entregáveis concretos (badges monospace), critério de saída e animação `AnimatePresence`.
  - Mobile (`< md`): Layout responsivo em Accordion vertical com dados expandidos ergonomicamente.
- [x] `src/components/sections/__tests__/ProcessExplorer.test.tsx`:
  - Testes cobrindo renderização das 4 etapas, navegação/seleção da etapa ativa, exibição de entregáveis e critérios de saída, suporte a `useReducedMotion()`.

### 1.2. Modificações
- [x] `src/pages/HowWeWorkPage.tsx`:
  - Substituir `<HowWeWork hideHeader />` por `<ProcessExplorer />`.
  - Reestruturar as 2 caixas soltas no Manifesto Técnico de Engenharia (2 colunas abertas com `md:divide-x` e badges `// GARANTIA OPERACIONAL` e `// GESTÃO DIRETA`).
  - Atualizar CTA de contato compacto com botão "Fale com um engenheiro" e link para dúvidas frequentes.
- [x] `src/pages/__tests__/pages.test.tsx`:
  - Validar renderização de `HowWeWorkPage` com o novo conteúdo e semântica.

### 1.3. Quality Gates
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] `npm test -- --run`
- [x] `npx playwright test`
- [x] `npm run build`
- [x] `reviews/QA-074.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`
