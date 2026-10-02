# SPEC-064 — Correção de Contraste de Textos Semânticos e Visibilidade do Cursor Orb no Dark Mode

- **Status:** Concluído / Aprovado
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo
- **Evidências Fornecidas:** 
  - `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-10-01 20-52-01.png`
  - `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-10-01 20-53-32.png`

---

## 1. Contexto e Diagnóstico

Após a refatoração de tokens da SPEC-063, foram reportados e comprovados dois problemas visuais críticos no tema Dark:

1. **Textos quase invisíveis (quase pretos sobre fundo escuro):**
   - Na captura `Captura de tela de 2026-10-01 20-52-01.png`, o eyebrow `"O QUE DESENVOLVEMOS"`, o subtítulo e os parágrafos descritivos dentro dos 4 cards de serviços estão com contraste quase nulo contra a superfície.
   - Na captura `Captura de tela de 2026-10-01 20-53-32.png`, a descrição institucional do footer, o endereço "Toledo, Paraná", os links de navegação/soluções, e os textos do sub-footer (copyright e links legais) estão praticamente pretos (`#0F1617` / `#141D1F`) sobre fundo escuro.
   - Títulos de seção que usam `text-primary` estão sendo renderizados em verde-água (teal) em vez do neutro primário de alto contraste (`#F2F7F7`).

2. **Cursor do mouse imperceptível / nulo:**
   - O cursor nativo foi ocultado via `cursor: none !important;` em `@media (pointer: fine)`.
   - O componente customizado `CursorOrb` foi configurado com `z-0` e opacidades atenuadas (`0.35` dot, `0.2` ring). Como os cards, seções e modais possuem fundos opacos (`bg-surface`, `bg-elevated`), o cursor renderiza **atrás** do conteúdo quando passa por cima de qualquer elemento, ficando totalmente invisível para o usuário interagir.

---

## 2. Causa Raiz Técnica

1. **Sobrescrita de `text-*` pelos objetos de cores no Tailwind:**
   No `tailwind.config.ts`, as chaves `secondary` e `muted` contêm objetos do shadcn:
   ```ts
   secondary: {
     DEFAULT: "rgb(var(--bg-elevated-rgb) / <alpha-value>)", // #141D1F (cor de fundo!)
     foreground: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
   },
   muted: {
     DEFAULT: "rgb(var(--bg-surface-rgb) / <alpha-value>)",  // #0F1617 (cor de fundo!)
     foreground: "rgb(var(--text-muted-rgb) / <alpha-value>)",
   }
   ```
   No Tailwind CSS, a classe `text-secondary` resolve para `secondary.DEFAULT` (`rgb(20, 29, 31)`), e `text-muted` resolve para `muted.DEFAULT` (`rgb(15, 22, 23)`). Ambos são cores de fundo de superfícies escuras, gerando contraste quase nulo contra `#0A0F10`.
   Similarmente, `text-primary` resolve para `primary.DEFAULT` (`rgb(45, 212, 191)` / teal), tingindo títulos que deveriam ser neutros.

2. **Empilhamento e Opacidade do Cursor:**
   - `z-0` no `CursorOrb` faz com que qualquer elemento na árvore DOM com background cubra o cursor.
   - Opacidade de `0.35` com raio de 6px resulta em luminância insuficiente sobre áreas escuras.

---

## 3. Solução Arquitetural Proposta

### 3.1. Extensão de `theme.extend.textColor` no Tailwind
Configurar `theme.extend.textColor` no `tailwind.config.ts` para que utilitários de texto semânticos tenham prioridade e mapeiem com precisão para os tokens de tipografia da Camada 2:

```ts
textColor: {
  primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",       // #F2F7F7 (Dark) / #0A0F10 (Light)
  secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",   // #9DB0B3 (Dark) / #3F5558 (Light)
  muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",           // #71868A (Dark) / #5C7175 (Light)
  brand: "rgb(var(--text-brand-rgb) / <alpha-value>)",           // #2DD4BF (Dark) / #0F766E (Light)
  "on-brand": "rgb(var(--text-on-brand-rgb) / <alpha-value>)",   // #04201C
}
```
*Isso garante que `text-primary`, `text-secondary` e `text-muted` sempre apliquem as cores corretas de texto com contraste WCAG AAA/AA, enquanto `bg-muted` e `bg-secondary` continuam funcionando como superfícies.*

### 3.2. Refatoração do `CursorOrb.tsx`
- Elevar o cursor para `z-[9999]` com `pointer-events-none` permanente.
- Dot: Opacidade 1.0 (visibilidade total), cor sólida `rgb(45, 212, 191)` no Dark com glow nítido (`0 0 10px 2px rgba(45, 212, 191, 0.6)`) e `rgb(15, 118, 110)` no Light.
- Ring: Opacidade 0.85 (ou 1.0 em hover), borda `1.5px solid rgba(45, 212, 191, 0.7)` no Dark com spring fluido.
- Garantir que o cursor fique visível sobre cards, modais, botões e cabeçalhos.

### 3.3. Títulos em Sentence Case e Neutro Primário
- Garantir que títulos de seções (`SectionHeader`, `PageHeader`, `Home.tsx`) usem `text-primary` (agora resolvendo para `#F2F7F7` neutro de alto contraste) e reservem `text-brand` estritamente para links de destaque ou acentos pontuais.

---

## 4. Critérios de Aceitação

1. **Visibilidade e Contraste no Dark Mode:**
   - Eyebrows (`text-muted`) exibem `#71868A` (contraste >= 5.3:1).
   - Títulos de seção (`text-primary`) exibem `#F2F7F7` (contraste >= 17:1).
   - Descrições e parágrafos de cards (`text-secondary`) exibem `#9DB0B3` (contraste >= 9:1).
   - Links e textos do footer legíveis e nítidos tanto no Dark quanto no Light.
2. **Cursor Orb:**
   - Perfeitamente visível ao passar por cima de cards, botões e qualquer área da tela.
   - Mantém `pointer-events-none` e não interfere em cliques ou seleções.
   - Desativa automaticamente em dispositivos touch e `prefers-reduced-motion`.
3. **Quality Gates:**
   - 0 erros em `npx tsc --noEmit`.
   - 0 erros em `npm run lint`.
   - 100% de aprovação na suíte de testes Vitest (`npm test -- --run`) com cobertura >= 90%.
   - 100% de aprovação na suíte Playwright E2E (`npx playwright test`).
   - `npm run build` bem-sucedido sem chunks > 600KB.
