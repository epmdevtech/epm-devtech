# SPEC-089 — Refatoração Editorial do Hero de /sobre com Inline Trust Marks e Malha de Conectividade em SVG

- **Status:** APROVADO
- **Data de Aprovação:** 2026-10-02
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Motion Design / Design Editorial

---

## 1. Contexto e Motivação

Na rota `/sobre` (`src/pages/AboutPage.tsx`), a dobra inicial ainda preserva um card lateral direito fechado (*"Como atuamos com a sua equipe"* com caixas cinzas/escuras e bordas). Essa abordagem:
1. Confere um aspecto visual segmentado em "cards de IA", desalinhado do padrão editorial sofisticado e fluido adotado nas demais páginas (como a Home, `/servicos` e `/engenharia`).
2. Cria concorrência visual desnecessária com a leitura da proposta de valor e antecipa em formato de lista elementos que já são aprofundados na linha do tempo histórica e no manifesto de princípios.

Para elevar o padrão de design da EPM DevTech, esta especificação define a substituição do card fechado por um **Layout Editorial Amplo e Sofisticado**, com **Inline Trust Marks** (marcadores em linha contínua sem caixas) e um **Elemento Visual Orgânico de Engenharia em SVG animado com Framer Motion** (*Network Flow Graph*), posicionado sutilmente como artefato de conectividade e estabilidade técnica de software.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Remoção do Card Lateral Fechado:**
   - Eliminar completamente o card retangular *"Como atuamos com a sua equipe"*, seu container escuro (`bg-zinc-950/70`), bordas (`border-zinc-800`) e divisórias internas na dobra inicial.
   - Nenhuma caixa ou container com bordas fechadas deve ser renderizado no Hero da rota `/sobre`.

2. **Layout Editorial Amplo (65%–70% de Largura no Desktop):**
   - **Eyebrow:** Manter o chip técnico monospace `[ QUEM SOMOS // POSICIONAMENTO ]` em ciano/esmeralda (`text-text-brand`) acompanhado do `BrandChipIcon`.
   - **H1 Tipográfico Amplo:**
     *"Engenharia de software sob medida com <span className="text-text-brand">visão real de negócio</span>"*
   - **Parágrafo Institucional Aprofundado:**
     *"A EPM DevTech projeta, constrói e moderniza aplicações corporativas críticas. Desenvolvemos ecossistemas sob medida para operações que exigem estabilidade contínua, integrações sem perda de dados e comunicação técnica direta com quem implementa a solução."*
     (Tipografia generosa, legível e confortável: `max-w-3xl text-base sm:text-lg lg:text-xl text-secondary leading-relaxed font-normal`).

3. **Inline Trust Marks (Marcadores em Linha Contínua — Sem Caixas):**
   - Dispostos logo abaixo do parágrafo em uma linha horizontal fluida com quebra responsiva (`flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-10 items-center`):
     * `● Atendimento 100% Remoto & Nacional`
     * `● Contato Direto com Liderança Técnica`
     * `● Propriedade Integral do Código`
   - Estilo: tipografia monospace/clean (`text-xs sm:text-sm font-mono text-secondary`), com marcadores luminosos discretos em esmeralda (`w-1.5 h-1.5 rounded-full bg-brand shrink-0`).

4. **Malha Visual de Conectividade em SVG com Framer Motion (`EngineeringNetworkGraph`):**
   - Elemento decorativo posicionado de forma absoluta no canto direito/fundo (`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none -z-0 overflow-hidden`):
   - Malha de nós e conexões vetoriais representando fluxos de arquitetura e estabilidade de sistemas:
     * Linhas tênues conectando pontos de dados em grid isométrico/orgânico.
     * Pulsação lenta contínua e suave de nós e feixes (`opacity` variando entre 0.15 e 0.40, ciclo de 6s em loop infinito).
     * Gradiente sutil em fade-out na borda esquerda para integração perfeita com o texto.
     * Respeito rigoroso a `prefers-reduced-motion` através do hook `useReducedMotion` do Framer Motion (animações desativadas se requisitado pelo usuário).

5. **Transição Fluida para a Linha do Tempo e Ritmo Tonal (SPEC-082):**
   - Hero na camada tonal `anchor` (`bg-surface-anchor`), com respiro generoso (`pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pb-28`).
   - Conexão contínua sem quebras artificiais com a seção *"Nossa jornada"* (`tone="base"`).
   - Sequência tonal preservada: `anchor` (Hero) → `base` (Jornada) → `alt` (Princípios) → `anchor` (Footer).

6. **Atualização de Testes Automatizados:**
   - Atualizar a suíte de testes unitários (`src/pages/__tests__/pages.test.tsx`) para validar os novos Inline Trust Marks e confirmar a ausência de caixas ou cabeçalhos antigos de cards.
   - Validar testes E2E (`multi-route-navigation.spec.ts` e `design-system-and-stability.spec.ts`).

### 2.2 Fora de Escopo

- Alterações na timeline de marcos históricos (`MILESTONES`) ou no manifesto de diretrizes (`PRINCIPLES`).
- Alterações em outras rotas ou no Header/Footer globais.

---

## 3. Arquitetura de Componentes

```
AboutPage (/sobre)
├── Helmet (SEO & Metatags corporativas)
├── AboutHero (tone: anchor, relative overflow-hidden)
│   ├── Container Editorial (max-w-6xl mx-auto px-6 relative z-10)
│   │   ├── Eyebrow: [ QUEM SOMOS // POSICIONAMENTO ] (BrandChipIcon)
│   │   ├── H1: Engenharia de software sob medida com [visão real de negócio]
│   │   ├── Parágrafo: "A EPM DevTech projeta, constrói e moderniza..."
│   │   └── Inline Trust Marks (flex flex-wrap gap-6)
│   │       ├── ● Atendimento 100% Remoto & Nacional
│   │       ├── ● Contato Direto com Liderança Técnica
│   │       └── ● Propriedade Integral do Código
│   └── EngineeringNetworkGraph (absolute right-0 top-1/2 -translate-y-1/2, Framer Motion)
│       └── SVG interconectado com nós pulsantes e linhas de estabilidade
├── Seção: Nossa Jornada (#jornada, tone: base)
└── Seção: Missão e Princípios (#principios, tone: alt)
```

---

## 4. Critérios de Aceite

1. [ ] O card retangular isolado à direita e qualquer container fechado com borda foram removidos do Hero de `/sobre`.
2. [ ] O layout editorial amplo acomoda H1, eyebrow com `BrandChipIcon` e texto institucional com espaçamento generoso e sem sensação de espaço vazio.
3. [ ] Os 3 compromissos são exibidos em formato de **Inline Trust Marks** horizontais com marcadores luminosos sutis em esmeralda.
4. [ ] O elemento visual `EngineeringNetworkGraph` em SVG com Framer Motion é renderizado no fundo/lado direito de forma não intrusiva, com pulsação suave e suporte a `prefers-reduced-motion`.
5. [ ] O ritmo de camadas tonais permanece `anchor` → `base` → `alt` → `anchor`.
6. [ ] Todos os testes automatizados (unitários, E2E) e quality gates (TS, Lint, Vitest, Playwright, Build) passam com 100% de sucesso.
