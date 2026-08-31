# SPEC-005 — PageSpeed Insights 100% (Mobile & Desktop)

| Campo         | Valor                          |
|---------------|-------------------------------|
| **ID**        | SPEC-005                      |
| **Data**      | 2026-08-31                    |
| **Autor**     | Elessandro Prestes Macedo     |
| **Status**    | ✅ Aprovada                    |
| **Versão**    | 1.0                           |

---

## Contexto e Motivação

O relatório do Lighthouse (PageSpeed Insights) indicou pontuações de desempenho de 82 no Mobile e 87 no Desktop.
Os principais problemas identificados foram:
1. **LCP lento (Mobile: 3.2s, Desktop: 0.8s):** Atraso na renderização do elemento LCP (o `<h1>` no Hero) causado por bloqueio de thread e inicialização pesada.
2. **Reflow forçado:** `framer-motion` causando tempo excessivo de reflow (127ms) na inicialização, impactando TBT e Speed Index.
3. **JS não utilizado / Carga ansiosa de chunks:** `framer-motion` e `radix-ui` estão sendo transferidos logo no início do carregamento (main chunk/eager load). Componentes globais não críticos (Toaster, Analytics, CookieBanner) iniciam download imediatamente devido a `<Suspense>` sem atraso.
4. **Imagens:** O logo é maior (300x101) do que o exibido na tela (~95x32) e não está usando `srcset` ou compressão ideal.

---

## Objetivo

Alcançar 100 no índice de Performance no Lighthouse tanto em mobile quanto em desktop através das otimizações identificadas.

---

## Escopo

### IN
1. **Remoção do Framer Motion do Caminho Crítico (Hero & Header):**
   - Substituir animações baseadas no framer-motion (`useScroll`, `useTransform`, `motion.div`) por animações CSS e Tailwind no `Hero.tsx` e `Header.tsx`. Isso removerá a necessidade de carregar e avaliar o pacote de 45KB na renderização inicial.
2. **Atraso Inteligente de Componentes Globais & Decorativos:**
   - Criar um hook `useIdle` (ou atrasar a renderização) em `App.tsx` e `Index.tsx` para garantir que `Toaster`, `CookieBanner`, `Analytics`, `CursorOrb` e `ScrollToTop` só sejam montados (e, portanto, descarregados) após o `requestIdleCallback` ou um atraso (ex: 2s), garantindo TBT zero na inicialização.
3. **Imagens Responsivas:**
   - Adicionar atributos `srcSet` ao `<img>` do logo em `Header.tsx` e ajustar tamanho/qualidade da imagem se necessário para economizar os 4-8KiB indicados pelo relatório.
4. **Adiamento de Recursos de Rede (Radix):**
   - Garantir que o Radix-UI só seja carregado quando necessário.

### OUT
- Mudança no design ou comportamento da aplicação (as animações do Hero devem parecer idênticas usando CSS).

---

## Critérios de Aceitação

- [ ] LCP < 2.5s no mobile.
- [ ] TBT próximo a 0ms.
- [ ] O `framer-motion` não deve aparecer no initial bundle no rastreamento de rede.
- [ ] 100% de testes unitários passando.
