# SPEC-099 — Sistema de Rolagem Suave (Smooth Scroll) com Lenis e Revelações Reativas com GSAP ScrollTrigger

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / Creative Engineering / Animação / GSAP / Lenis / Performance / Acessibilidade

---

## 1. Contexto e Motivação

Para consolidar o acabamento de padrão internacional da **EPM DevTech** (no nível de referências corporativas técnicas e estúdios de engenharia moderna como Stripe, Vercel e o template Charity Campaign do GSAP Vault), torna-se necessário dotar a aplicação de uma física inercial de rolagem suave e orquestração de entrada de elementos orientada ao scroll (*scroll-driven reveals*).

A rolagem nativa de navegadores desktop muitas vezes apresenta passos rígidos e secos de scrollwheel, enquanto animações isoladas podem sofrer descompasso ou "jank" se não estiverem perfeitamente atreladas ao ciclo de renderização do motor de rolagem.

A combinação de **Lenis** (rolagem inercial de alto desempenho e baixo overhead) com **GSAP ScrollTrigger** (motor líder da indústria para animações engatadas no scroll), sincronizados em um único loop `raf` via `gsap.ticker`, fornece o comportamento ideal: uma sensação orgânica de fluidez, estabilidade visual, sofisticação e precisão técnica sóbria, sem comprometer a leitura ou a performance.

---

## 2. Princípios e Restrições Absolutas

1. **Preservação Integral do Design System e Conteúdo**:
   - O layout, a paleta de cores (modo escuro profundo e modo claro com âncoras brancas puras e tom gelo), os acentos ciano/esmeralda, a tipografia Inter, os textos humanizados da SPEC-092 e os componentes já construídos (Bento Grid, Pipeline, Ledger, Blueprint, EpmConstellation) permanecerão estritamente inalterados em sua essência e estrutura.
2. **Moderação e Sobriedade Técnica B2B**:
   - Sem giros espalhafatosos, efeitos inflados ou atrasos artificiais na leitura. As animações devem agir como micro-reforços perceptivos de qualidade e transição suave.
3. **Zero Layout Shift (CLS = 0) e Hardware Acceleration**:
   - Todas as animações atuarão estritamente sobre propriedades aceleradas pela GPU: `opacity` e `transform` (`translateY`, `scale`, `translateX`).
4. **Isolamento de Ciclo de Vida e Limpeza de Memória**:
   - Todo uso de GSAP em componentes React utilizará escopos formais `gsap.context()` com descarte estrito no unmount (`ctx.revert()`), prevenindo vazamento de listeners ou acúmulo de instâncias ao transitar entre rotas SPA.
5. **Acessibilidade Rigorosa (`prefers-reduced-motion`)**:
   - Quando `prefers-reduced-motion: reduce` for detectado, o Lenis não será instanciado, ScrollTriggers serão bypassados e todos os elementos serão exibidos imediatamente estáticos (`opacity: 1`, posições neutras).

---

## 3. Escopo da Solução

### 3.1 Em Escopo

1. **Dependências e Infraestrutura de Bundle (`package.json`, `vite.config.ts`)**:
   - Instalação dos pacotes:
     * `lenis`: biblioteca moderna e leve de smooth scroll.
     * `gsap`: motor de animação e `ScrollTrigger`.
   - Ajuste em `vite.config.ts` no `manualChunks` para criar o chunk isolado `gsap-lenis`, assegurando que o tamanho do chunk permaneça muito abaixo do limite de 600KB.

2. **Provedor Global de Rolagem Suave (`src/components/layout/SmoothScrollProvider.tsx`)**:
   - Componente wrapper ou hook acoplado ao `Layout.tsx`:
     * Instanciação de `Lenis` com física calibrada: `duration: 1.2`, `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `smoothWheel: true`, `touchMultiplier: 1.2`.
     * Registro de plugins: `gsap.registerPlugin(ScrollTrigger)`.
     * Sincronização do loop de frames:
       ```typescript
       lenis.on('scroll', ScrollTrigger.update);
       gsap.ticker.add((time) => {
         lenis.raf(time * 1000);
       });
       gsap.ticker.lagSmoothing(0);
       ```
     * Integração com transições de rota do React Router: acionar `lenis.scrollTo(0, { immediate: true })` e `ScrollTrigger.refresh()` ao mudar de rota.
     * Descarte limpo (`lenis.destroy()`, desregistro do ticker) no unmount.

3. **Hook Utilitário de Revelação (`src/hooks/useScrollReveal.ts`)**:
   - Hook reutilizável baseado em `gsap.context()` para acoplar animações de entrada aos elementos de forma declarativa e com cleanup automático.

4. **Orquestração de Revelações por Seção e Componente**:
   - **Headings & Eyebrows Globais:** Efeito progressivo suave (`opacity: 0 -> 1`, `y: 24px -> 0px`, duração 0.65s, `power3.out`, trigger `start: "top 85%"`).
   - **Hero da Home:** Cascata fluida ao carregar (Eyebrow -> H1 -> Subheadline -> CTAs & Seletor de Cenários).
   - **Bento Grid de Serviços (`HomeServicesBento.tsx`):** Entrada escalonada dos 4 cards (`stagger: 0.1s`, `y: 30px -> 0px`, `opacity: 0 -> 1`).
   - **Pipeline de Engenharia (`HomeProcessPipeline.tsx`):** Sequência progressiva suave dos nós 01 a 04 e textos conforme atinge a visão do leitor.
   - **Faixa de Resultados (`HomeResultsStrip.tsx`):** Disparo sincronizado da contagem e entrada de métricas ao atingir `top 80%`.
   - **Camadas Arquiteturais e Ledger Corporativo (`EngineeringPage.tsx`, `ExperiencePage.tsx`):** Efeito cortina discreto com stagger lateral (`x: -12px -> 0px`, `opacity: 0 -> 1`).
   - **Rodapé (`Footer.tsx`):** Entrada suave unificada.

5. **Responsividade Mobile**:
   - Em telas móveis (`< 768px`), os deslocamentos `y` são reduzidos para 12-14px para respeitar a ergonomia touch e o scroll nativo de alta frequência (120Hz).

---

## 4. Quality Gates e Critérios de Aceite

1. **Performance**: CLS mantido em 0.000. Nenhum jank ou stutter perceptível durante a rolagem contínua.
2. **Bundle**: Chunks isolados no Vite, sem warnings de chunk > 600KB.
3. **TypeScript & ESLint**: Compilação com zero erros em modo estrito (`tsc --noEmit`) e zero avisos de ESLint.
4. **Testes**: 100% de passagem nas suítes unitárias do Vitest e na suíte E2E do Playwright.
5. **Acessibilidade**: Se `prefers-reduced-motion` estiver ativo, o site deve renderizar sem rolagem inercial e com todos os elementos 100% visíveis e estáticos.
