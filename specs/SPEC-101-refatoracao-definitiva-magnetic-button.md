# SPEC-101 — Refatoração e Implementação Definitiva do Componente MagneticButton

- **Status:** APROVADO
- **Data de Criação:** 2026-10-03
- **Data de Aprovação:** 2026-10-03
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / Creative Engineering / GSAP 3 / React 18 / Tailwind CSS / Acessibilidade

---

## 1. Contexto e Motivação

O componente `MagneticButton` é responsável pelas microinterações de chamada para ação (CTAs) de alta conversão em todo o ecossistema digital da EPM DevTech (Header/Navbar, Hero da Home, Hero de Serviços, FAQ e formulários).

Esta especificação define a refatoração e implementação definitiva do `MagneticButton`, corrigindo e refinando os seguintes pontos técnicos essenciais:
1. **Cálculo Geométrico Imune ao Scroll da Viewport**:
   - Eliminação de feedback loops e instabilidades causadas por translações no elemento de medição: uso de um container geométrico de referência fixo (`areaRef`) que não recebe `transform`.
   - Obtenção de coordenadas relativas à viewport via `getBoundingClientRect()` estritamente em sincronia com `e.clientX` / `e.clientY`, prevenindo desvios cinemáticos ou saltos bruscos ao aproximar o cursor com a página rolada.
2. **Ciclo de Vida React & GSAP 3**:
   - Isolamento via `gsap.context()` com desmonte determinístico (`ctx.revert()`), impedindo memory leaks e mantendo performance contínua a 60/120 FPS via `gsap.quickTo()`.
3. **Efeito Codrops de Transição Vertical (Flip / Swap)**:
   - Implementação de transição vertical cinemática do texto interno via `swapText(dir)` (`gsap.timeline`), combinada com a compensação parallax no sentido oposto para profundidade 2.5D.
4. **Paleta Institucional EPM DevTech & Variantes**:
   - Variante `primary` (fundo esmeralda vibrante `#34D399` / `emerald-400`, texto escuro `zinc-950 font-semibold`, glow sutil), `outline` (borda refinada `zinc-800`, fundo translúcido `zinc-950/60`, cortina de preenchimento *filler* que sobe no hover), `ghost` e `secondary`.
5. **Polimorfismo & Navegação SPA**:
   - Suporte polimórfico transparente a navegação de rotas internas (`to` via `react-router-dom`), links externos (`href`), handlers `onClick` (incluindo `navigate("/contato")`) e submissão de formulário (`type="submit"`).
6. **Acessibilidade e Fallbacks**:
   - Desativação em touch devices (`pointer: coarse` / `hover: none`) e respeito estrito a `prefers-reduced-motion`.
   - Preservação de anel de foco acessível `:focus-visible` em conformidade com WCAG AA.

---

## 2. Arquitetura do Componente

```
┌────────────────────────────────────────────────────────┐
│ 1. areaRef (div.inline-block)                          │
│    Hitbox de referência estática (sem transform)       │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 2. btnRef (button / Link / a)                    │  │
│  │    Translação atrativa cinemática (btnX, btnY)   │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │ 3. textRef (span)                          │  │  │
│  │  │    Compensação parallax oposta (2.5D)      │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │ 4. innerRef (span)                   │  │  │  │
│  │  │  │    Transição vertical Codrops (swap) │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 3. Interface de Propriedades

```typescript
export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Intensidade do deslocamento magnético (0 a 1). Padrão: 0.28 */
  strength?: number;
  /** Raio de captura como múltiplo da largura do botão. Padrão: 0.75 */
  triggerRadius?: number;
  /** Variante visual de cor e acabamento */
  variant?: "primary" | "outline" | "ghost" | "secondary";
  /** Rota interna do React Router (renderiza como Link quando presente) */
  to?: string;
  /** Link externo ou âncora (renderiza como <a> quando presente) */
  href?: string;
  /** Tamanho do botão */
  size?: "default" | "sm" | "lg" | "icon";
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  target?: string;
  rel?: string;
}
```

---

## 4. Pontos de Aplicação

1. **Header / Navbar (`src/components/layout/Header.tsx`)**:
   - Botão CTA desktop e mobile "Fale conosco" com variante `primary` e navegação para `/contato`.
2. **Hero da Home (`src/components/sections/Hero.tsx`)**:
   - CTA primário "Vamos conversar" com navegação para `/contato`.
3. **Hero de Serviços (`src/pages/ServicesPage.tsx`)**:
   - CTA principal com navegação para `/contato`.
4. **FAQ (`src/pages/FAQPage.tsx`)**:
   - CTA de encerramento direcionando para `/contato`.
5. **Formulário de Contato (`src/components/ContactForm.tsx` & `Contact.tsx`)**:
   - Botão de submissão do formulário.

---

## 5. Critérios de Aceite e Quality Gates

1. Ausência total de erros ou oscilações ao rolar a página para baixo e aproximar o mouse do botão.
2. `npx tsc --noEmit` com 0 erros.
3. `npm run lint` com 0 erros e 0 avisos.
4. Vitest: 100% dos testes unitários passando.
5. Build de produção (`npm run build`) concluído com sucesso e sem warnings de chunk size.
