# SPEC-105 — Constellation Inspector: Grafo Interativo de Práticas de Engenharia

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-105                                   |
| **Data**      | 2026-10-03                                 |
| **Autor**     | Elessandro Prestes Macedo / Gemini         |
| **Status**    | Aprovada                                   |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

O componente `EpmConstellation` (rota `/sobre`) desenha a silhueta do logotipo (moldura, chaves `{ }`, barramentos e slash central) com 55 nós luminosos, mas é puramente decorativo (`aria-hidden`). Os nós podem passar a comunicar as práticas de engenharia da EPM DevTech, transformando o logotipo em um "Grafo Interativo de Práticas".

## Diagnóstico do componente atual (obrigatório)

- **Fonte dos nós:** `src/config/epmConstellation.ts` → `CONSTELLATION_NODES: ConstellationNode[]` (`id`, `x`, `y`, `r`, `isKey?`, `group`) e `CONSTELLATION_EDGES` (`from`/`to` por `id`) + `NODE_MAP`.
- **Renderização:** `EpmConstellation.tsx` (301 linhas), `<svg viewBox="0 0 600 600">`, nós como `<motion.circle>` (halo + núcleo + ponto central em `isKey`) dentro de `<motion.g>` com flutuação vertical `y: [-3, 3, -3]` (6,5 s).
- **Estado atual:** `mousePos` (state no componente raiz) → `proximityMap` → realce por proximidade. **Todo `pointermove` re-renderiza o SVG inteiro** (arestas + 55 nós).
- **Acessibilidade atual:** contêiner `aria-hidden="true"`, svg `role="presentation"`; testes existentes asseguram isso.
- **Conclusão:** os nós **já são indexáveis** (array + `id`). Não é necessário refatorar a fonte de dados; a refatoração do componente visa apenas isolar estado e extrair camadas memoizadas, sem mudar o visual.

### Nós (índice no array `CONSTELLATION_NODES`)

| Idx | id | (x, y) | Papel | Idx | id | (x, y) | Papel |
|---|---|---|---|---|---|---|---|
| 0 | tl_corner | 122,122 | moldura | 30–40 | bra_l_* | 145–250 | chave `{` |
| 1–2 | t_1, t_2 | 150/225,110 | moldura | 35 | **bra_l_tip** | 145,300 | ponta da `{` (key) |
| **3** | **t_mid** | 300,110 | topo da moldura (key) | 41–51 | bra_r_* | 350–455 | chave `}` |
| 4–6 | t_3, t_4, tr_corner | — | moldura | 46 | **bra_r_tip** | 455,300 | ponta da `}` (key) |
| 7–12 | r_1…br_corner | 478–490 | moldura direita | 52 | slash_top | 330,205 | núcleo |
| 13–18 | b_4…bl_corner | — | moldura inferior | **53** | **core_center** | 300,300 | **núcleo (key, r=7)** |
| 19–23 | l_4…l_1 | — | moldura esquerda | 54 | slash_bot | 270,395 | núcleo |
| 24–29 | bus_t1…bus_b3 | — | barramentos | | | | |

### Mapeamento final proposto (`PRACTICES_DATA`)

Os `nodeIndex` do briefing (0, 12, 25, 38) são placeholders e **não** correspondem aos papéis descritos (0 = `tl_corner`, 12 = `br_corner`, 25 = `bus_t2`, 38 = `bra_l_bot1`). Mapeamento corrigido:

| Prática (id) | Placeholder | **nodeIndex final** | Nó real | Justificativa |
|---|---|---|---|---|
| `core-arch` | 0 | **53** | `core_center` | único nó de núcleo central (r=7, maior) |
| `data-integrations` | 12 | **35** | `bra_l_tip` | vértice da chave `{`, aresta de fluxo `flow` |
| `critical-ops` | 25 | **46** | `bra_r_tip` | vértice da chave `}`, aresta de fluxo `flow` |
| `modernization` | 38 | **3** | `t_mid` | topo da moldura (key) |

> **Decisão de robustez:** `nodeIndex: number` é mantido conforme o briefing, mas é derivado por helper `nodeIndexOf("core_center")` sobre `CONSTELLATION_NODES` no arquivo de dados, evitando quebra silenciosa se o array for reordenado. Teste unitário valida o mapeamento.

## Objetivo

Ao passar o mouse, focar via teclado ou clicar/tocar em nós mapeados, abrir um popover ancorado ao nó com a prática correspondente, sem alterar o visual/tamanho/animações do logotipo quando nenhum nó está ativo.

## Escopo

### Está incluído (IN)
- Dados tipados em `src/data/constellationPractices.ts` (`ConstellationPractice`, `PRACTICES_DATA`, `nodeIndexOf`).
- Componentes: `ConstellationInspector` (estado/orquestração), `ConstellationNode` (hit area + estados), `PracticeCard` (conteúdo, animação), todos ≤ ~150 linhas.
- Refatoração mínima de `EpmConstellation.tsx` para camadas memoizadas (arestas, nós) e destaque do nó ativo/arestas conectadas.
- Popover com `@radix-ui/react-popover` (já instalado) controlado, `Popover.Anchor` HTML invisível posicionado em % do viewBox.
- Testes Vitest/RTL; descrição (sem escrever) do cenário Playwright mobile.
- Docs: `PROJECT.md`, `CHANGELOG.md`, `tasks/TASK-105`, `reviews/QA-105.md`.

### Não está incluído (OUT)
- Novas dependências; alterações em rotas, SEO, tokens de design globais.
- Conteúdo fora das 4 práticas listadas; i18n.
- Uso da constelação em outras páginas (somente `/sobre`).

## Requisitos Funcionais

1. Hover no nó/hit-area abre o popover após ~120 ms; sair do nó **e** do card fecha após ~150 ms (permite mover o mouse até o card).
2. Clique/toque **fixa** (pinned) o popover; clique fora ou `Esc` fecha. Toque abre direto (sem depender de hover; `pointerType === "touch"`).
3. Teclado: nós interativos com `role="button"`, `tabIndex=0`, `aria-label="Prática: {title}"`; `Enter`/`Espaço` abrem; `Esc` fecha e devolve foco ao nó; `←/→` navegam entre nós interativos (ordenados por `x`).
4. Um único popover aberto por vez (estado `activeId`).
5. Nós sem prática permanecem decorativos (sem foco/role; `aria-hidden`).
6. Hit area invisível ≥ 44 px (mín. 24 px) por nó interativo, em overlay HTML sobre o SVG, posicionado em `left/top` em % de `x/600` e `y/600`.
7. Card: `role="dialog"` não modal, `aria-labelledby` → título; hierarquia categoria (mono, uppercase, tracking largo) → título → descrição → tags (chips).
8. Nó ativo: halo/pulso suave, escala sutil e arestas conectadas realçadas (camada isolada); com `prefers-reduced-motion`: sem pulso/transform, apenas fade.
9. Entrada do card: opacity + y 6 px + scale 0,98→1, 180–220 ms; saída mais rápida (~120 ms).
10. Listeners globais (pointerdown externo/Esc/keydown) só enquanto aberto.

## Requisitos Não-Funcionais

| Requisito        | Critério                                                                 |
|------------------|--------------------------------------------------------------------------|
| Performance      | Hover não re-renderiza arestas/nós (React.memo); zero CLS                |
| Acessibilidade   | WCAG AA mínimo (meta do projeto: AAA onde viável), foco visível esmeralda, touch ≥ 44px |
| Estética         | Dark, borda 1px, backdrop-blur leve, 3 cantos `rounded-lg` + 1 chanfro 45° (`corner-top-right-shape: bevel` via arbitrary property; fallback `clip-path` em `@supports not`) |
| Testes           | Cobertura ≥ 90% nos componentes afetados; lint e tsc sem erros; build sem chunk > 600KB |
| Responsividade   | Mobile First; Radix com `collisionPadding` para não vazar da viewport    |

## Decisões que exigem aprovação do PO

1. **Acessibilidade vs. `aria-hidden` atual:** elementos focáveis dentro de `aria-hidden` são violação WCAG. Proposta: remover `aria-hidden` do contêiner e aplicá-lo apenas ao `<svg>` decorativo; a camada de hit-areas HTML fica fora do `aria-hidden`. Os testes existentes (`aria-hidden` no contêiner / `role="presentation"` no svg) serão **atualizados** na TASK. O `data-testid="epm-constellation-container"` é mantido.
2. **Flutuação orgânica (±3 unidades do viewBox, ≈ ±2 px em 440 px):** as hit-areas/âncoras HTML ficam estáticas; o desalinhamento máximo de ~2 px é imperceptível frente a áreas de 44 px. Alternativa (não recomendada): animar overlay em sincronia, com custo de complexidade.
3. **Prop `interactive` (já existente, default `true`)** passará a controlar também a camada de práticas. Se `false`, o componente permanece 100% decorativo.
4. **Uso de `corner-top-right-shape`:** sem suporte nativo no Tailwind 3.4; usado via arbitrary property `[corner-top-right-shape:bevel]` com `clip-path` em `@supports not (corner-top-right-shape: bevel)`. Como `clip-path` corta `border`/`box-shadow`, o fallback usa camada interna com borda emulada (wrapper com `bg` de borda + inset 1px).

## Comportamento Esperado

### Cenário 1: Hover desktop
**Dado** a rota `/sobre` com a constelação visível **Quando** o mouse permanece ≥120 ms sobre `core_center` **Então** o card "Sistemas Web e Plataformas Corporativas" aparece ancorado ao nó; mover o mouse para o card o mantém aberto; sair de ambos fecha em ~150 ms.

### Cenário 2: Touch
**Dado** viewport mobile **Quando** o usuário toca em `t_mid` **Então** o card abre e fica fixo; tocar fora o fecha.

### Cenário 3: Teclado
**Dado** foco em um nó interativo **Quando** pressiona `Enter` **Então** o card abre; `Esc` fecha e o foco retorna ao nó; `→` move o foco ao próximo nó interativo.

### Cenário 4: Um por vez
**Dado** card A aberto **Quando** o usuário interage com o nó B **Então** A fecha e apenas B permanece aberto.

## Critérios de Aceitação

- [ ] `PRACTICES_DATA` em arquivo separado, tipado, com `nodeIndex` mapeado conforme tabela aprovada
- [ ] Hover (120/150 ms), clique (pinned), toque, teclado e `Esc` funcionando conforme RF 1–4
- [ ] Nós sem prática: sem `role`/`tabIndex`
- [ ] Visual do logotipo idêntico quando nenhum nó está ativo (testes existentes adaptados e passando)
- [ ] Hover não re-renderiza camadas memoizadas (verificado por teste/contador)
- [ ] `prefers-reduced-motion` respeitado
- [ ] tsc, ESLint, Vitest (cobertura ≥ 90%), Playwright e build verdes

## Plano de Testes

- **Vitest/RTL:** abre em hover (fake timers 120 ms) e foco; fecha com `Esc` devolvendo foco; apenas um card; título/categoria/tags corretos a partir de `PRACTICES_DATA`; mapeamento `nodeIndexOf`; nós decorativos sem role; reduced motion.
- **Playwright (descrição, fluxo mobile — emulação de dispositivo com `hasTouch`):** abrir `/sobre`; rolar até a constelação; `tap` no nó "Prática: Sistemas Web e Plataformas Corporativas" → `getByRole("dialog")` visível com a categoria; `tap` em área vazia da página → dialog oculto; `tap` em outro nó troca o card; verificar que a hit area tem ≥ 44×44 px (`boundingBox`).

## Impactos e Dependências

### Arquivos a criar
- `src/data/constellationPractices.ts`
- `src/components/sections/constellation/ConstellationInspector.tsx`
- `src/components/sections/constellation/ConstellationNode.tsx`
- `src/components/sections/constellation/PracticeCard.tsx`
- `src/components/sections/constellation/__tests__/*.test.tsx`
- `tasks/TASK-105-constelacao-interativa-inspector-praticas.md`, `reviews/QA-105.md`

### Arquivos a modificar
- `src/components/sections/EpmConstellation.tsx` (camadas memoizadas, `aria-hidden` no svg, prop de nó ativo)
- `src/components/sections/__tests__/EpmConstellation.test.tsx`
- `src/pages/AboutPage.tsx` (apenas se necessário para o wrapper)
- `PROJECT.md`, `CHANGELOG.md`

### Dependências
- Depende de: SPEC-098 (atributo `r` seguro), SPEC-087…094 (silhueta)
- Bloqueia: nenhuma

## Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Hit-area HTML desalinhada com o SVG responsivo | Baixa | Posicionamento em % do viewBox; contêiner `aspect-square`; teste de posição |
| Conflito hover × clique pinned em touch | Média | Tratar por `pointerType`; ignorar `mouseenter` sintético em touch |
| Fallback `clip-path` cortar borda | Média | Wrapper com borda emulada |
| Quebra de testes existentes por mudança de `aria-hidden` | Alta (esperada) | Atualização explícita na TASK |

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-10-03               |
| **Assinatura**     | [x] Aprovado [ ] Rejeitado |
| **Observações**    |                          |
