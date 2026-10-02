# SPEC-090 — Ajuste de Copywriting e Tipografia Monocromática do Hero de /sobre

- **Status:** APROVADO
- **Data de Aprovação:** 2026-10-02
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Copywriting B2B / Tipografia

---

## 1. Contexto e Motivação

Na rota `/sobre` (`src/pages/AboutPage.tsx`), para tornar a comunicação do Hero ainda mais direta, inspiradora e sem elementos dispersivos:
1. O título H1 necessita ser atualizado para uma mensagem de impacto centrada em resolução de problemas reais (*"Transformando desafios em soluções que funcionam"*).
2. O H1 deve ser 100% monocromático (`text-primary`), eliminando qualquer mescla cromática com verde/ciano nas palavras do título.
3. O parágrafo descritivo deve ser substituído pela proposta de valor simplificada e pragmática (*"Unimos tecnologia, experiência e visão de negócio para criar soluções digitais que simplificam operações e geram resultados reais."*).
4. A faixa de trust marks inline (*"Atendimento 100% Remoto & Nacional"*, *"Contato Direto com Liderança Técnica"* e *"Propriedade Integral do Código"*) deve ser removida, deixando o Hero ultra-limpo, focado na mensagem principal e integrado harmonicamente à malha gráfica em SVG no fundo.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Atualização do Título H1 em `/sobre` (`src/pages/AboutPage.tsx`):**
   - Novo texto: *"Transformando desafios em soluções que funcionam"*.
   - Tipografia: 100% monocromática (`text-primary`), sem spans verdes/esmeralda no título.

2. **Atualização do Subtítulo / Parágrafo Institucional:**
   - Novo texto: *"Unimos tecnologia, experiência e visão de negócio para criar soluções digitais que simplificam operações e geram resultados reais."*
   - Estilização: `max-w-3xl text-base sm:text-lg lg:text-xl text-secondary leading-relaxed font-normal [text-wrap:balance]`.

3. **Remoção da Faixa de Trust Marks:**
   - Excluir o container de trust marks contendo:
     * `● Atendimento 100% Remoto & Nacional`
     * `● Contato Direto com Liderança Técnica`
     * `● Propriedade Integral do Código`

4. **Preservação dos Elementos de Marca & Background:**
   - Manter o eyebrow técnico `[ QUEM SOMOS // POSICIONAMENTO ]` com `BrandChipIcon`.
   - Manter a malha gráfica em SVG com Framer Motion (`EngineeringNetworkGraph`).
   - Manter o espaçamento generoso (`pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pb-28`) e a camada tonal `anchor` (`bg-surface-anchor`).

5. **Atualização de Scripts e Testes Automatizados:**
   - `scripts/prerender.js`: Atualizar H1 da rota `sobre` para *"Transformando desafios em soluções que funcionam"*.
   - `e2e/multi-route-navigation.spec.ts`: Atualizar `expectedH1` de `/sobre`.
   - `src/pages/__tests__/pages.test.tsx`: Atualizar teste de `AboutPage` para validar o novo H1 monocromático, novo subtítulo e confirmar a ausência das trust marks removidas.
   - Executar Quality Gates completos.

### 2.2 Fora de Escopo

- Alterações na timeline de marcos históricos (`#jornada`) ou na seção de princípios (`#principios`).
- Alterações em outras rotas.

---

## 3. Critérios de Aceite

1. [ ] O H1 de `/sobre` exibe exatamente *"Transformando desafios em soluções que funcionam"*.
2. [ ] O H1 é 100% monocromático (`text-primary`), sem cores verde/esmeralda mescladas nas palavras.
3. [ ] O subtítulo exibe *"Unimos tecnologia, experiência e visão de negócio para criar soluções digitais que simplificam operações e geram resultados reais."*.
4. [ ] A faixa de três trust marks foi totalmente removida do JSX.
5. [ ] A malha visual `EngineeringNetworkGraph` e o eyebrow continuam ativos e perfeitamente renderizados.
6. [ ] Todos os testes unitários, testes E2E e quality gates (TS, Lint, Vitest, Playwright, Build) passam com 100% de sucesso.
