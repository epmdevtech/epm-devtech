# SPEC-053 — Padronização de Cabeçalhos de Seção + Ícones Premium Autorais

## Metadados
- **ID:** SPEC-053
- **Título:** Padronização do sistema de cabeçalhos de seção (centralizados, fluidos, equilibrados) e criação do conjunto autoral de ícones premium (SVG inline com duotone e nó de acento)
- **Data:** 2026-09-30
- **Autor:** Gemini/Antigravity
- **PO:** Elessandro Prestes Macedo
- **Status:** Aprovado (Diretiva do PO)

---

## 1. Contexto e Motivação

1. **Inconsistência de Cabeçalhos**:
   - A maioria das seções apresentava cabeçalho centralizado, enquanto *Diferenciais* e *Sobre* apresentavam alinhamentos à esquerda, quebrando a previsibilidade de leitura e o princípio da similaridade (Gestalt).
   - O subtítulo não possuía controle de largura máxima (`max-w-2xl` / 60–68ch) ou balanceamento de quebra de linha (`text-wrap: balance`), gerando linhas órfãs.
2. **Ícones Genéricos ("Cara de IA")**:
   - O uso indiscriminado de ícones genéricos padrão (Lucide) encerrados em caixas quadradas arredondadas com fundo translúcido esmeralda no rodapé de cards confere ao site uma aparência de template genérico gerado por IA.
   - Os ícones conceituais precisam de identidade visual autoral ligada à marca (EPM DevTech), com geometria consistente, traço fino (1.5px), duotone discreto e nó de acento (ecoando os pinos da linha do tempo).
3. **Inconsistência de Caixa (Title Case vs. Sentence Case)**:
   - Mistura de Title Case e sentence case nos títulos, rótulos e botões. Em português, a convenção padrão é sentence case (com maiúsculas restritas a início de frase, nomes próprios e siglas).
4. **Refinamentos de Copy Residual**:
   - Ajustes em alegações absolutas no diagrama de arquitetura e correção de categoria da pergunta sobre sites institucionais no FAQ (de "Processo" para "Serviços").

---

## 2. Especificação Técnica — Parte A: Sistema de Cabeçalhos

### 2.1 Padrão Único Centralizado
- Todas as seções de conteúdo utilizam o componente `SectionHeader` com alinhamento centralizado (`align="center"`):
  - `Serviços` (`#servicos`)
  - `Como trabalhamos` (`#como-trabalhamos`)
  - `Diferenciais` (`#diferenciais`)
  - `Tecnologias` (`#tecnologias`)
  - `Autoridade` (`#autoridade`)
  - `Setores` (`#setores`)
  - `Sobre` (`#sobre`)
  - `FAQ` (`#faq`)
  - `Contato` (`#contato`)
- **Exceção Única Documentada**: `Hero` possui estrutura própria integrada ao `LampContainer` e à topologia de arquitetura.
- **Textos Corridos**: Todas as descrições de cards, parágrafos do Sobre, respostas do FAQ e textos de formulário permanecem alinhados à esquerda.

### 2.2 Estrutura e Métricas do `SectionHeader`
- Elemento raiz: `<header className="w-full text-center max-w-3xl mx-auto mb-12 sm:mb-16">`.
- Eyebrow: `BrandChipIcon` (15px) + texto uppercase `text-[11.5px] font-medium tracking-[0.1em] text-zinc-500 dark:text-zinc-400 select-none mb-2.5 sm:mb-3`.
- H2: `font-bold tracking-tight text-zinc-900 dark:text-white text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18] max-w-3xl mx-auto [text-wrap:balance] mb-3.5 sm:mb-4`.
- Subtítulo: `font-normal text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto [text-wrap:balance]`.
- Ritmo vertical de espaçamento:
  - Eyebrow → H2: 10px–12px.
  - H2 → Subtítulo: 14px–16px.
  - Cabeçalho → Conteúdo: 48px–64px (`mb-12 sm:mb-16`).

### 2.3 Novo Layout de "Diferenciais"
- Cabeçalho centralizado via `SectionHeader`.
- Corpo em **3 colunas** sem moldura de card e sem fundo fechado, com divisores verticais sutis no desktop (`divide-y md:divide-y-0 md:divide-x divide-border/60`).
- Cada coluna: Ícone autoral no topo → Rótulo pequeno (uppercase) → Título (H3) → Descrição técnica, alinhados à esquerda.
- Abaixo das 3 colunas, bloco centralizado: rótulo *"Práticas aplicadas conforme cada projeto"* e chips de badges (`Badge`).
- Sem numeração `01/02/03`, sem linha do tempo, sem setas `→`.

### 2.4 Padronização em Sentence Case
- Títulos de serviços: *"Sistemas web, portais e sites institucionais"*, *"APIs & back-end escalável"*, *"Integrações entre sistemas"*, *"Modernização & evolução de legados"*.
- Diferenciais: *"Comunicação transparente"*, *"Engenharia que facilita evoluir"*, *"Foco no problema do negócio"*.
- Contato: *"Diagnóstico técnico"*, *"Retorno em até 24 horas úteis"*, *"Sigilo e confidencialidade"*.
- Sobre: *"Fundador e liderança técnica"*, stat *"anos de experiência técnica"*.
- Rodapé: *"Sobre a empresa"*, *"Dúvidas frequentes"*, *"Como trabalhamos"*, *"Sistemas, portais e sites"*.

---

## 3. Especificação Técnica — Parte B: Ícones Premium Autorais

### 3.1 Conjunto Autoral SVG em `src/components/icons/`
- Componentes SVG inline puros:
  - Traço: `1.5px`, cantos arredondados com raio consistente.
  - Grid: `viewBox="0 0 24 24"`.
  - Duotone: forma principal em `currentColor`, forma secundária com preenchimento sutil `fill="currentColor" fillOpacity="0.12"` e um **nó de acento da marca** (`circle r="1.5" fill="hsl(var(--primary))"`).
  - Acessibilidade: `aria-hidden="true"` e `focusable="false"` por padrão; suporte a `title` e `role="img"` quando aplicável.
- Ícones conceituais implementados:
  1. `IconTransparentCommunication`: dois quadros de conversa sobrepostos com área compartilhada + nó.
  2. `IconEvolutionaryEngineering`: blocos modulares empilhados com bloco deslocado para evolução + nó.
  3. `IconBusinessFocus`: colchetes de engenharia enquadrando alvo central + nó.
  4. `IconProcessUnderstand`: lente de inspeção sobre malha + nó.
  5. `IconProcessDefine`: documento de especificação com linhas e marcador + nó.
  6. `IconProcessDevelop`: colchetes de código com barras crescentes + nó.
  7. `IconProcessEvolve`: ciclo contínuo com nó em ascensão.
  8. `IconTechnicalDiagnostic`: moldura de monitoramento com linha de diagnóstico + nó.
  9. `IconFastResponse`: relógio analógico preciso com nó indicador + nó.
  10. `IconConfidentiality`: cadeado geométrico com nó no centro do segredo.
  11. `IconSectorIndustry`: módulo de precisão fabril / engrenagem + nó central.
  12. `IconSectorRetail`: pacote / e-commerce geométrico + nó de fecho.
  13. `IconSectorEducation`: geometria acadêmica / livro aberto + nó.
  14. `IconSectorEnergy`: onda energética / pulso + nó.
  15. `IconTechLeadership`: prompt terminal corporativo + nó de status.

### 3.2 Eliminação de Caixas Esmeralda Genéricas
- Remoção de containers quadrados arredondados com fundo translúcido esmeralda no rodapé de cards (`.hww-icon-wrap`, etc.).
- Ícones posicionados no topo (ao lado ou acima dos títulos e rótulos), de forma limpa e integrada.

---

## 4. Especificação Técnica — Parte C: Ajustes de Copy

1. **`FAQ.tsx`**: Pergunta *"Vocês desenvolvem sites institucionais?"* recategorizada para `"servicos"` (era `"processo"`).
2. **`HeroArchitecture.tsx`**:
   - *"Distribuição global, terminação TLS e mitigação de latência na borda."* → *"Roteamento, terminação TLS e redução de latência na borda."*
   - *"desacoplamento estrito"* → *"desacoplamento modular"*
   - *"redundância multi-zona"* → *"redundância"*
   - Remoção de qualquer resíduo de garantias irrevogáveis ("estrito", "global", etc.).

---

## 5. Quality Gates e Critérios de Aceite

1. **TypeScript & ESLint:** Zero erros (`npx tsc --noEmit` e `npm run lint`).
2. **Testes Unitários:** 100% dos testes passando com cobertura ≥ 90%.
3. **Testes E2E (Playwright):** 16/16 testes passando em todas as resoluções.
4. **Acessibilidade:** 0 violações Axe-core (WCAG 2.2 AA).
5. **Build:** Chunks estritamente < 600KB.
6. **Git:** Modificações uncommitted na branch `develop`.
