# SPEC-093 — Constelação Vetorial de Engenharia com Silhueta do Ícone EPM DevTech no Hero de /sobre

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Motion Design / SVG Interativo / Acessibilidade

---

## 1. Contexto e Motivação

No Hero da rota `/sobre` (`src/pages/AboutPage.tsx`), a constelação técnica anteriormente implementada adotava uma malha de rede genérica com nós orbitais circulares. Embora fluida e animada, ela não transmitia a identidade exclusiva da marca EPM DevTech.

Esta especificação define o desenvolvimento e integração do componente interativo **`EpmConstellation.tsx`**, uma constelação vetorial de alta precisão que **desenha e revela organicamente a silhueta geométrica do ícone oficial da EPM DevTech**: a moldura de tela/dispositivo com cantos arredondados e as chaves de código `{ }` centrais.

A constelação combinará a elegância visual de uma malha estelar de nós interconectados com comportamento de software vivo: traçado inicial com Framer Motion, pulso de respiração contínua, interatividade ao mover o cursor (mouse tracking) e total respeito à acessibilidade (`prefers-reduced-motion`).

---

## 2. Especificação Técnica e Geométrica

### 2.1 Mapeamento dos Vértices da Silhueta (Coordenadas Normalizadas)

A constelação será construída em um sistema de coordenadas SVG com `viewBox="0 0 600 600"`, centrado em `(300, 300)`.

1. **Moldura Exterior de Tela / Circuito (Outer Frame):**
   - Retângulo de proporção quadrada com cantos arredondados (x: 100 a 500, y: 100 a 500):
     * Aresta Superior: nós em `(160, 100)`, `(230, 100)`, `(300, 100)`, `(370, 100)`, `(440, 100)`.
     * Canto Superior Direito: curvatura com nós em `(475, 125)`, `(500, 160)`.
     * Aresta Direita: nós em `(500, 230)`, `(500, 300)`, `(500, 370)`, `(500, 440)`.
     * Canto Inferior Direito: curvatura com nós em `(475, 475)`, `(440, 500)`.
     * Aresta Inferior: nós em `(370, 500)`, `(300, 500)`, `(230, 500)`, `(160, 500)`.
     * Canto Inferior Esquerdo: curvatura com nós em `(125, 475)`, `(100, 440)`.
     * Aresta Esquerda: nós em `(100, 370)`, `(100, 300)`, `(100, 230)`, `(100, 160)`.
     * Canto Superior Esquerdo: curvatura com nós em `(125, 125)`, `(160, 100)`.
   - Nós de Barramento / Pinos de Circuito (Circuit Busses):
     * Barramento Superior: nós em `(270, 55)`, `(300, 50)`, `(330, 55)` conectados a `(300, 100)`.
     * Barramento Inferior: nós em `(270, 545)`, `(300, 550)`, `(330, 545)` conectados a `(300, 500)`.

2. **Núcleo Interno — Chaves de Código `{ }`:**
   - **Chave Esquerda `{`**:
     * Topo: `(270, 180)` → `(230, 180)`
     * Haste superior: `(210, 210)` → `(210, 260)`
     * Ponta / Cúspide central: `(180, 285)` → `(160, 300)` → `(180, 315)`
     * Haste inferior: `(210, 340)` → `(210, 390)`
     * Base: `(230, 420)` → `(270, 420)`
   - **Chave Direita `}`**:
     * Topo: `(330, 180)` → `(370, 180)`
     * Haste superior: `(390, 210)` → `(390, 260)`
     * Ponta / Cúspide central: `(420, 285)` → `(440, 300)` → `(420, 315)`
     * Haste inferior: `(390, 340)` → `(390, 390)`
     * Base: `(370, 420)` → `(330, 420)`
   - **Divisor Central / Slash `/`**:
     * Nós em `(320, 200)`, `(300, 300)`, `(280, 400)` conectando o núcleo com sutileza técnica.

3. **Linhas Estruturais e Conexões Diagonais de Constelação:**
   - Arestas primárias desenham o contorno contínuo da moldura e das chaves.
   - Arestas secundárias ligam pontos-chave da moldura aos vértices das chaves com opacidade atenuada (`opacity-20` a `opacity-30`), gerando o aspecto de constelação astronômica interconectada.

---

### 2.2 Estética de Constelação e Nós Estelares

- **Nós (Stars / Nodes):**
  * Núcleo sólido de luz: `circle` com `r="2.5"` ou `r="3.5"`, preenchimento em teal/esmeralda da marca (`#2DD4BF` / `#14B8A6`).
  * Halo / Brilho suave: `circle` concêntrico com `r="7"` a `r="9"`, preenchimento suave `rgba(45, 212, 191, 0.15)`.
  * Nós especiais (vértices das cúspides centrais e cantos mestres): nó maior com pulso luminoso destacado.
- **Linhas Conectoras (Constellation Struts):**
  * Linhas estruturais com `strokeWidth="1.2"` e gradientes lineares suaves (`#2DD4BF` / `#0D9488`).
  * Linhas tênues de sustentação com `strokeWidth="0.8"` e `opacity="0.25"`.

---

### 2.3 Animações com Framer Motion

1. **Entrada em Cena (Draw / Reveal Inicial):**
   * As linhas conectoras desenham a silhueta do logo utilizando animação de `pathLength` de 0 a 1 (`duration: 2.2s`, `ease: [0.16, 1, 0.3, 1]`).
   * Os nós surgem em cascata sequencial (`staggerChildren: 0.03s`) com `scale: [0, 1.2, 1]` e `opacity: [0, 1]`.
2. **Movimento Ocioso Contínuo (Idle Breathing & Pulsing):**
   * Respiração orgânica contínua: opacidade dos nós e brilho oscilando suavemente em loop infinito (`opacity: [0.45, 0.95, 0.45]`, `duration: 4.5s`).
   * Micro-deslocamento espacial suave simulando flutuação no vácuo (`y: [-3, 3, -3]`, `duration: 6s`).
3. **Pacotes de Dados em Trânsito (Data Flow):**
   * Pequenas partículas luminosas (`motion.circle`) percorrendo os caminhos vetoriais entre os nós para reforçar a sensação de rede e fluxo de dados.
4. **Governança de Acessibilidade (`prefers-reduced-motion`):**
   * Integração com `useReducedMotion()`. Quando ativo, o desenho inicial é imediato (`pathLength: 1`) e todas as animações contínuas de oscilação e fluxo são desativadas, mantendo a constelação estática com contraste perfeito.

---

### 2.4 Interatividade com Cursor (Mouse Tracking & Proximity Glow)

- Monitoramento das coordenadas do cursor do mouse em relação ao SVG (`onMouseMove` / `onMouseLeave` no container).
- Cálculo de distância euclidiana para os nós:
  * Nós situados a menos de 100px do cursor recebem acréscimo de escala (`scale: 1.4`) e halo mais brilhante (`opacity: 1`).
  * Linhas conectadas aos nós próximos aumentam a intensidade de cor para `#2DD4BF` com opacidade reforçada (`opacity: 0.75`).
- Retorno suave ao estado de repouso quando o cursor se afasta (`transition: { duration: 0.4 }`).

---

### 2.5 Integração e Posicionamento na Rota `/sobre`

- O componente `EpmConstellation.tsx` substituirá o `EngineeringNetworkGraph.tsx` no cabeçalho de `src/pages/AboutPage.tsx`.
- Posicionamento relativo ao container de conteúdo:
  * `className="absolute -right-16 sm:-right-8 lg:-right-4 xl:right-6 top-1/2 -translate-y-1/2 w-[420px] sm:w-[520px] lg:w-[580px] xl:w-[640px] h-[420px] sm:h-[520px] lg:h-[580px] xl:h-[640px] pointer-events-auto z-0 select-none"`
  * Fundo 100% transparente (`bg-transparent`), integrando-se perfeitamente tanto ao Dark Mode quanto ao Light Mode através de classes Tailwind semânticas.
  * O bloco editorial de texto permanece em `relative z-10 max-w-2xl lg:max-w-3xl`, garantindo legibilidade impecável do H1 e subtítulo.

---

## 3. Plano de Testes e Quality Gates

| Gate | Critério de Validação |
|------|------------------------|
| **TypeScript** | `npx tsc --noEmit` — 0 erros de compilação estrita. |
| **ESLint** | `npm run lint` — 0 erros e 0 warnings. |
| **Vitest Unit** | Nova suíte `src/components/sections/__tests__/EpmConstellation.test.tsx` validando renderização de nós, linhas, suporte a mouse tracking e `useReducedMotion`. Suite completa com 100% de aprovação. |
| **Playwright E2E** | Testes na rota `/sobre` verificando presença do SVG com viewBox 600x600, nós da silhueta, ausência de overflow horizontal e estabilidade nos temas Dark e Light. |
| **Build & Prerender** | `npm run build` — 0 erros, geração das 7 rotas HTML e chunks < 600KB. |

---

## 4. Impacto nos Arquivos

- **Criar:** `src/components/sections/EpmConstellation.tsx`
- **Criar:** `src/components/sections/__tests__/EpmConstellation.test.tsx`
- **Modificar:** `src/pages/AboutPage.tsx` (importar e posicionar `EpmConstellation`)
- **Modificar:** `src/pages/__tests__/pages.test.tsx` (se aplicável para manter asserções íntegras)
- **Criar:** `tasks/TASK-093-sobre-constelacao-silhueta-epm.md` (após aprovação desta SPEC)
- **Criar:** `reviews/QA-093.md` (após execução e validação)
- **Modificar:** `PROJECT.md` e `CHANGELOG.md`

---

## 5. Decisão de Aprovação do PO

Para prosseguir para a criação da **TASK-093** e execução da implementação, é necessária a aprovação formal do Product Owner.
