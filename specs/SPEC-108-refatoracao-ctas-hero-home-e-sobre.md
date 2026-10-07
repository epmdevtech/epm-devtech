# SPEC-108 — Refatoração dos CTAs do Hero da Home e da Rota Sobre Nós

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-108                                   |
| **Data**      | 2026-10-07                                 |
| **Autor**     | Elessandro Prestes Macedo / Gemini         |
| **Status**    | Aprovada                                   |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

Com o amadurecimento da arquitetura de informação B2B da EPM DevTech e a análise de fluxo de navegação, identificou-se a necessidade de:
1. **Hero da Home (`/`)**: Manter foco cognitivo singular e alta taxa de conversão direta. A existência de um botão secundário no Hero dispersa a atenção do tomador de decisão. Portanto, o Hero deve conter um único CTA primário dominante com a redação acolhedora e pragmática `"VAMOS CONVERSAR"`.
2. **Hero da Rota Sobre Nós (`/about`)**: A primeira dobra de `/about` tem natureza puramente editorial e de posicionamento de engenharia (destacando a constelação interativa `EpmConstellation`). Ter um botão comercial duplicado logo abaixo do subtítulo causa redundância direta com o CTA fixo `"FALE COMIGO"` da Navbar. Portanto, o botão da primeira dobra deve ser completamente removido, preservando o CTA de conversão comercial apenas no fechamento da rota (Bottom CTA: `"VAMOS CONVERSAR"`).

---

## 1. Alterações Específicas de UX e Código

### 1.1 Seção Hero da Home (`src/components/sections/Hero.tsx`)
- **CTA Primário Único**: Botão magnético com destino `/contact`, `size="lg"`, variante `chamfer` (`btn-bevel-4`).
- **Texto**: `"VAMOS CONVERSAR"` em caixa alta obrigatória (`uppercase tracking-[0.04em] font-semibold`).
- **CTA Secundário**: Botão secundário (`CONHEÇA AS SOLUÇÕES`) completamente removido para assegurar foco no objetivo principal.

### 1.2 Rota Sobre Nós (`src/pages/AboutPage.tsx`)
- **Primeira Dobra (Hero Editorial)**: Remoção definitiva do botão `<MagneticButton>` do cabeçalho da página, permitindo respiro à narrativa e à constelação interativa.
- **Fechamento da Página (Bottom CTA)**: Manutenção/inclusão do bloco comercial de conversão ao final da rota com o CTA `"VAMOS CONVERSAR"` apontando para `/contact`, preservando o ritmo de alternância tonal (`anchor -> base -> alt -> base -> anchor`).

---

## 2. Diretrizes Visuais e Técnicas

- Geometria: Formato octogonal com corte chanfrado simétrico nos 4 cantos (`btn-bevel-4` / `.btn-chamfer`).
- Microinteração: Efeito magnético calibrado (`MagneticButton`), desengate imediato (breakout) e ausência de arrasto residual.
- Acessibilidade: Estados de foco acessíveis (`:focus-visible`), touch targets ≥ 44px e conformidade WCAG AAA de contraste.

---

## 3. Quality Gates Obrigatórios

- TypeScript: Zero novos erros de compilação
- ESLint: Zero erros (`npm run lint`)
- Testes Unitários: Cobertura geral ≥ 90% (`npm run test:coverage`)
- Testes E2E: 100% de aprovação (`npm run test:e2e`)
- Build de Produção: Sem avisos de chunks > 600KB e com pré-renderização estática (`npm run build`)
