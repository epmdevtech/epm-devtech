# SPEC-104 — Refatoração Visual para Geometria "Full Bevel / 4-Corner Chamfer" (Octógono Simétrico de Engenharia)

- **Status:** APROVADO
- **Data de Criação:** 2026-10-03
- **Data de Aprovação:** 2026-10-03
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Design Systems / Tailwind CSS / GSAP / React 18

---

## 1. Diagnóstico e Motivação

Na SPEC-103, a implementação do chanfro técnico foi aplicada no canto superior direito (`polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)`).

O design autoral de precisão de engenharia solicitado (com base na referência visual em `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-10-03 09-22-05.png`) exige:
1. **Chanfro em 45º em TODOS OS 4 CANTOS (Octógono Simétrico de Engenharia)**:
   - Superior esquerdo: corte chanfrado a 45º (`12px 0%`, `0% 12px`).
   - Superior direito: corte chanfrado a 45º (`calc(100% - 12px) 0%`, `100% 12px`).
   - Inferior direito: corte chanfrado a 45º (`100% calc(100% - 12px)`, `calc(100% - 12px) 100%`).
   - Inferior esquerdo: corte chanfrado a 45º (`12px 100%`, `0% calc(100% - 12px)`).
2. **Polígono Simétrico de 8 Lados**:
   - Cria uma silhueta octogonal técnica, robusta e corporativa, inspirada em painéis de instrumentação e design de hardware de precisão.
3. **Traço Contínuo em Todos os 8 Lados e Sombreamento Chanfrado em Camadas (Layered Bevel Shadow)**:
   - Traço nítido (stroke) de 1px contornando perfeitamente todo o perímetro do octógono (incluindo as diagonais de 45º).
   - Sombra rígida extrudada (hard offset extruded shadow) deslocada para o canto inferior direito (`5px 5px 0px`), que reproduz com exatidão matemática o corte chanfrado de 8 lados (sem o desfoque genérico de box-shadow).
   - Efeito mecânico no clique (`:active`): deslocamento de compressão tátil para `translate(2px, 2px)` e redução da sombra para `3px 3px 0px`.
4. **Versão Compacta / Botões Menores (`btn-bevel-4-sm` e `btn-bevel-shadow-sm`)**:
   - Corte refinado de 8px e sombra extrudada proporcional de 3px para botões de menor escala (`size="sm"`).
5. **Preservação das Travas de Tokens e Acessibilidade**:
   - `rounded-md` preservado nos atributos de estilo computado para conformidade com `hero-identity-token-locks.spec.ts`.
   - Cores da marca: `bg-brand` (`#2DD4BF`), `text-on-brand` (`#04201C`) para botões sólidos e acabamento translúcido para contorno.

---

## 2. Escopo da Especificação

### 2.1 Em Escopo

1. **Atualização em `src/index.css`**:
   - Adicionar classes `.btn-bevel-4`, `.btn-bevel-4-sm`, e unificar `.btn-chamfer` como alias do octógono simétrico de 8 pontos na camada `@layer utilities`.
   - Adicionar utilitários de sombreamento extrudado e traço contínuo de 8 lados:
     * `.btn-bevel-shadow`: traço nítido de 1px e sombra extrudada sólida de 5px (branco em dark mode e dark slate em light mode).
     * `.btn-bevel-shadow-sm`: traço nítido e sombra proporcional de 3px para botões compactos.
     * `.btn-bevel-shadow-white`: traço e sombra em branco puro `#ffffff` (reprodução idêntica da captura de tela de referência).
     * `.btn-bevel-shadow-brand`: traço e sombra na cor institucional teal da marca (`#2DD4BF`).
2. **Atualização em `src/components/ui/button.tsx`**:
   - Atualizar classes das variantes `chamfer` e `chamfer-outline` para utilizar `.btn-bevel-4`.
   - Adicionar suporte aos aliases `bevel` e `bevel-outline`.
3. **Atualização em `src/components/ui/MagneticButton.tsx`**:
   - Atualizar a geometria padrão para `.btn-bevel-4` (ou `.btn-bevel-4-sm` para `size="sm"`).
   - Aplicar automaticamente o sombreamento chanfrado `.btn-bevel-shadow` (ou `.btn-bevel-shadow-sm`) no wrapper do botão (`areaRef`), garantindo que o sombreamento e o traço de 8 lados acompanhem a silhueta geométrica e a cinemática física do cursor magnético.
   - Suporte a variantes sólidas e de contorno com a silhueta octogonal.
4. **Testes Unitários**:
   - Atualizar testes em `button.test.tsx` e `MagneticButton.test.tsx` para cobrir a classe `.btn-bevel-4`, o sombreamento `.btn-bevel-shadow` e a nova silhueta.
5. **Quality Gates**:
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Vitest (`npm test -- --run` & coverage), Playwright E2E (`npx playwright test`) e build de produção (`npm run build`).

### 2.2 Fora de Escopo

- Alterações na cinemática do cursor magnético (recalibrada na SPEC-102).
- Alterações em URLs ou roteamento da aplicação.

---

## 3. Especificação Técnica do Polígono CSS e Sombreamento Chanfrado

```css
@layer utilities {
  /* Chanfro simétrico nos 4 cantos (Octógono de precisão - corte de 12px) */
  .btn-bevel-4,
  .btn-chamfer {
    clip-path: polygon(
      12px 0%,
      calc(100% - 12px) 0%,
      100% 12px,
      100% calc(100% - 12px),
      calc(100% - 12px) 100%,
      12px 100%,
      0% calc(100% - 12px),
      0% 12px
    );
  }

  /* Versão para botões menores / compactos (corte de 8px) */
  .btn-bevel-4-sm,
  .btn-chamfer-sm {
    clip-path: polygon(
      8px 0%,
      calc(100% - 8px) 0%,
      100% 8px,
      100% calc(100% - 8px),
      calc(100% - 8px) 100%,
      8px 100%,
      0% calc(100% - 8px),
      0% 8px
    );
  }

  /* Sombreamento chanfrado em camadas e traço contínuo em 8 lados (SPEC-104) */
  .btn-bevel-shadow {
    filter: 
      drop-shadow(1px 0px 0px #ffffff)
      drop-shadow(-1px 0px 0px #ffffff)
      drop-shadow(0px 1px 0px #ffffff)
      drop-shadow(0px -1px 0px #ffffff)
      drop-shadow(5px 5px 0px #ffffff);
    transition: filter 0.15s ease, transform 0.15s ease;
  }
  .btn-bevel-shadow:active {
    transform: translate(2px, 2px);
    filter: 
      drop-shadow(1px 0px 0px #ffffff)
      drop-shadow(-1px 0px 0px #ffffff)
      drop-shadow(0px 1px 0px #ffffff)
      drop-shadow(0px -1px 0px #ffffff)
      drop-shadow(3px 3px 0px #ffffff);
  }

  :root:not(.dark) .btn-bevel-shadow {
    filter: 
      drop-shadow(1px 0px 0px #04201c)
      drop-shadow(-1px 0px 0px #04201c)
      drop-shadow(0px 1px 0px #04201c)
      drop-shadow(0px -1px 0px #04201c)
      drop-shadow(5px 5px 0px #04201c);
  }
  :root:not(.dark) .btn-bevel-shadow:active {
    filter: 
      drop-shadow(1px 0px 0px #04201c)
      drop-shadow(-1px 0px 0px #04201c)
      drop-shadow(0px 1px 0px #04201c)
      drop-shadow(0px -1px 0px #04201c)
      drop-shadow(3px 3px 0px #04201c);
  }

  /* Versão compacta / sm */
  .btn-bevel-shadow-sm {
    filter: 
      drop-shadow(1px 0px 0px #ffffff)
      drop-shadow(-1px 0px 0px #ffffff)
      drop-shadow(0px 1px 0px #ffffff)
      drop-shadow(0px -1px 0px #ffffff)
      drop-shadow(3px 3px 0px #ffffff);
    transition: filter 0.15s ease, transform 0.15s ease;
  }
  .btn-bevel-shadow-sm:active {
    transform: translate(1px, 1px);
    filter: 
      drop-shadow(1px 0px 0px #ffffff)
      drop-shadow(-1px 0px 0px #ffffff)
      drop-shadow(0px 1px 0px #ffffff)
      drop-shadow(0px -1px 0px #ffffff)
      drop-shadow(2px 2px 0px #ffffff);
  }
  :root:not(.dark) .btn-bevel-shadow-sm {
    filter: 
      drop-shadow(1px 0px 0px #04201c)
      drop-shadow(-1px 0px 0px #04201c)
      drop-shadow(0px 1px 0px #04201c)
      drop-shadow(0px -1px 0px #04201c)
      drop-shadow(3px 3px 0px #04201c);
  }
  :root:not(.dark) .btn-bevel-shadow-sm:active {
    filter: 
      drop-shadow(1px 0px 0px #04201c)
      drop-shadow(-1px 0px 0px #04201c)
      drop-shadow(0px 1px 0px #04201c)
      drop-shadow(0px -1px 0px #04201c)
      drop-shadow(2px 2px 0px #04201c);
  }
}
```

---

## 4. Critérios de Aceite

1. Todos os botões com chanfro exibem corte simétrico em 45º em todos os 4 cantos (polígono de 8 vértices).
2. Botões compactos (`size="sm"`) utilizam o chanfro proporcional de 8px.
3. Zero erros de compilação TypeScript (`npx tsc --noEmit`).
4. Zero erros de lint (`npm run lint`).
5. 100% dos testes unitários passando (`npm test -- --run`).
6. Cobertura de testes ≥ 90% (`npm run test:coverage`).
7. 100% dos testes Playwright E2E aprovados (`npx playwright test`).
8. Build de produção concluído com sucesso (`npm run build`).
