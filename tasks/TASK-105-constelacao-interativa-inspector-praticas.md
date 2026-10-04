# TASK-105 — Constellation Inspector: Grafo Interativo de Práticas de Engenharia

- **Status:** Concluída (aguardando review do PO)
- **Data de Início:** 2026-10-03
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-105-constelacao-interativa-inspector-praticas.md` (Aprovada em 2026-10-03)

---

## 1. Escopo da Tarefa

1. Criar `src/data/constellationPractices.ts` (`ConstellationPractice`, `PRACTICES_DATA`, `nodeIndexOf`) com o mapeamento aprovado: `core_center` (53), `bra_l_tip` (35), `bra_r_tip` (46), `t_mid` (3).
2. Criar `src/components/sections/constellation/`:
   - `useConstellationInspector.ts` — estado (`activeId`, `pinned`), hover intent (120 ms / 150 ms), pin, dismiss.
   - `ConstellationInspector.tsx` — orquestra estado, overlay de hit-areas e navegação por setas.
   - `ConstellationNode.tsx` — botão (hit area ≥ 44px) + `Popover` Radix controlado por nó, memoizado.
   - `PracticeCard.tsx` — conteúdo do popover (bevel 45°, animação, reduced motion).
   - `ActiveNodeHighlight.tsx` — halo/pulso e arestas conectadas do nó ativo (camada SVG isolada).
   - `ConstellationEdgesLayer.tsx` / `ConstellationNodesLayer.tsx` — camadas existentes extraídas literalmente e memoizadas.
3. Refatorar `EpmConstellation.tsx` (composição, `aria-hidden` apenas no `<svg>` quando interativo, handlers de proximidade no contêiner).
4. Atualizar `EpmConstellation.test.tsx` e criar testes do inspector.
5. Atualizar `PROJECT.md` e `CHANGELOG.md`; preencher `reviews/QA-105.md`.

## 2. Decisões Registradas (aprovadas na SPEC)

- `aria-hidden` removido do contêiner quando `interactive=true`; mantido quando `interactive=false`.
- Âncoras HTML estáticas (desalinhamento máximo ≈ 2 px pela flutuação orgânica).
- Um `Popover.Root` por nó interativo (âncora = wrapper do botão), garantindo posição correta também na animação de saída.
- Fallback do chanfro via variante Tailwind `supports-[not_(...)]` + `clip-path` (sem alterar `index.css`).

## 3. Arquivos

**Criar:** `src/data/constellationPractices.ts`, `src/components/sections/constellation/*`, `src/components/sections/constellation/__tests__/*`, `tasks/TASK-105-*.md`, `reviews/QA-105.md`.

**Modificar:** `src/components/sections/EpmConstellation.tsx`, `src/components/sections/__tests__/EpmConstellation.test.tsx`, `PROJECT.md`, `CHANGELOG.md`.

## 4. Checklist

- [x] Dados + mapeamento
- [x] Hook + Inspector + Node + Card + Highlight
- [x] Refatoração de `EpmConstellation`
- [x] Testes unitários
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run test:coverage`, `npx playwright test`, `npm run build`
- [x] QA-105, PROJECT.md, CHANGELOG.md

## 5. Dúvidas / Bloqueios

Nenhum. Observação: 7 erros de `tsc` pré-existentes (framer-motion `ease`) em arquivos fora do escopo foram reportados no QA-105.

Ajuste durante a implementação: `activeId` do hook é o id da prática; a camada SVG recebe o id do **nó** (derivado em `ConstellationInspector`). Extraído também `ConstellationDefs.tsx` para manter `EpmConstellation` ≤ 150 linhas.
