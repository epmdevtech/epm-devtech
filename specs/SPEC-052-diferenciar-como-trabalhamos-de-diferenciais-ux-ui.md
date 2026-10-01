# SPEC-052 — Diferenciar Visual e Estruturalmente as Seções "Como Trabalhamos" e "Diferenciais" (UX/UI)

## Metadados
- **ID:** SPEC-052
- **Título:** Diferenciação visual, semântica e comportamental entre as seções "Como trabalhamos" e "Diferenciais"
- **Data:** 2026-09-30
- **Autor:** Gemini/Antigravity
- **PO:** Elessandro Prestes Macedo
- **Status:** Aprovado (Diretiva do PO)

---

## 1. Contexto e Motivação

Na refatoração anterior (SPEC-051), a criação da seção **"Como trabalhamos"** reaproveitou o padrão de pipeline com timeline horizontal, pinos esmeralda e cards numerados `01/02/03/04` da seção **"Diferenciais"**.
Como as duas seções são vizinhas na página (`Serviços` → `Como trabalhamos` → `Diferenciais` → `Tecnologias`), o uso repetido do mesmo componente causou:
1. **Quebra de ritmo visual**: parece duplicação de layout e quebra a dinâmica da página.
2. **Incoerência de modelo mental (Forma segue a Função)**:
   - **"Como trabalhamos"** é um processo **sequencial** com ordem cronológica obrigatória (1 → 2 → 3 → 4).
   - **"Diferenciais"** são argumentos de valor **paralelos**, simultâneos e independentes (sem ordem cronológica ou progressão).
3. **Falsa affordance**: cards de diferenciais continham setas `→` sugerindo clicabilidade ou expansão inexistente.

---

## 2. Princípios de Design & UX

- **A forma segue a função**:
  - Processo sequencial = Timeline / stepper com numeração e linha conectora.
  - Pilares de valor = Lista limpa em linhas com layout assimétrico de duas colunas, sem numeração e sem linha do tempo.
- **Princípio da Similaridade (Gestalt)**: Elementos com funções diferentes devem ter aparências distintas para não induzir o usuário a esperar o mesmo comportamento.
- **Affordance real**: Apenas elementos genuinamente interativos devem sugerir ação ou navegação.
- **Progressive Enhancement & Acessibilidade**: Todas as animações devem respeitar estritamente `prefers-reduced-motion` e a hierarquia semântica (`<ol>` para sequencial, `<ul>` para paralelo).

---

## 3. Especificação das Mudanças

### 3.1 "Como Trabalhamos" (`src/components/sections/HowWeWork.tsx`)
- **Visual:** Mantém o padrão de stepper/pipeline horizontal no desktop (≥ 1024px) com pinos e cards numerados.
- **Semântica:**
  - O container de cards passa a ser uma lista ordenada `<ol role="list">`.
  - Cada card passa a ser um item de lista `<li>`.
  - O selo numérico `01..04` recebe `aria-hidden="true"`, pois a ordem já é anunciada pela `<ol>`.
  - Hierarquia de cabeçalho: `h2` ("Como trabalhamos") → `h3` (título da etapa).
- **Mobile (< 768px):**
  - Timeline vertical com linha conectora lateral e cards empilhados de forma limpa, garantindo alinhamento e eliminando qualquer risco de overflow horizontal.
- **Affordance:**
  - Garantir ausência de cursor pointer ou setas.
  - Hover leve apenas com realce de borda.
- **Acessibilidade e Contraste:**
  - Tags em caixa-alta com contraste WCAG AA validado (luminosidade sólida, sem opacidade reduzida que degrade o contraste em fundos claros ou escuros).
  - Respeito a `prefers-reduced-motion`: linha e pinos aparecem estáticos e totalmente preenchidos sem transição de preenchimento.

### 3.2 "Diferenciais" (`src/components/sections/Differentials.tsx`)
- **Novo Layout (Desktop ≥ 1024px — Duas Colunas):**
  - **Coluna Esquerda (≈ 40%, `lg:sticky lg:top-28`):**
    - `SectionHeader` alinhado à esquerda (`align="left"`): Tagline "Diferenciais", H2 "Por que trabalhar com a EPM DevTech", Subtítulo "Engenharia focada na longevidade do seu software, com transparência em cada etapa do projeto."
    - Bloco de práticas: Rótulo pequeno "Práticas aplicadas conforme cada projeto" seguido de chips/badges (`Badge` outline/sutil): `Testes automatizados`, `Revisão de código`, `CI/CD`, `Arquitetura orientada à manutenção`.
  - **Coluna Direita (≈ 60%):**
    - 3 itens empilhados como **linhas sem moldura de card e sem fundo**, separados por divisor fino (`border-b border-border/50`).
    - Cada item estruturado em `<ul>` / `<li>`:
      - Ícone contextual em container estilizado (`MessageCircle`, `Shield`, `CheckCircle2`).
      - Rótulo superior pequeno em caixa-alta (ex.: `ALINHAMENTO & PREVISIBILIDADE`).
      - Título semântico `h3` (sem setas `→`).
      - Descrição textual técnica e objetiva.
      - Indicador vertical esmeralda à esquerda da linha ativado no hover (`scale-y`).
- **Layout Mobile & Tablet (< 1024px):**
  - Coluna única.
  - Cabeçalho alinhado à esquerda.
  - Chips em `flex-wrap`.
  - Linhas de diferenciais em largura total.
- **Remoções Obrigatórias de Diferenciais:**
  - ❌ Linha do tempo horizontal e pinos.
  - ❌ Selos numéricos `01/02/03`.
  - ❌ Setas `→` ao lado dos títulos.
  - ❌ Cards com moldura fechada e ícone isolado no rodapé.
- **Animação de Diferenciais:**
  - Stagger de entrada na viewport (fade-in + leve `translateY` de 12–16px, duração 350ms, atraso escalonado de 90ms).
  - Sob `prefers-reduced-motion: reduce`: visível imediatamente sem transição ou transform.

---

## 4. Quality Gates e Critérios de Aceite

1. **Semântica:** `HowWeWork` usa `<ol>` e `Differentials` usa `<ul>`.
2. **Diferenciação Visual:** Em zoom-out, as seções têm ritmos visuais completamente distintos (stepper com cards vs. duas colunas com linhas elegantes e chips).
3. **Responsividade:** Zero overflow horizontal em 320px, 375px, 768px, 1024px, 1280px e 1440px.
4. **Testes Unitários:** Cobertura ≥ 90% mantida em todos os componentes.
5. **Testes E2E:** 16/16 testes Playwright passando.
6. **Compilação e Linter:** `tsc --noEmit` e `eslint` sem erros.
7. **Build:** Chunks < 600KB.
8. **Git:** Modificações permanecem uncommitted na branch `develop`.
