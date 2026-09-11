# SPEC-042: ScrollToTop — Neutralização Visual de Cores (Borda Fina Neutra, Remoção de Verde e Foco como Utilitário)

| Campo         | Valor                                                                                                |
|---------------|------------------------------------------------------------------------------------------------------|
| **ID**        | SPEC-042                                                                                             |
| **Título**    | ScrollToTop — Neutralização Visual (Borda Fina Neutra, Remoção de Realce Verde e Foco Utilitário)    |
| **Prioridade**| Média (Hierarquia Visual, UX/UI, Prevenção de Canibalização de CTAs)                                 |
| **Origem**    | Feedback direto do PO (2026-09-10): "Tirar o glow. O brilho verde chama tanta atenção quanto um botão de call-to-action — mas essa não é uma ação principal, é um utilitário de navegação. Deixando neutro (borda fina, sem glow), ele continua visível sem competir com o WhatsApp/Fale Conosco, que são os CTAs reais do site. corrija" |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                                       |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo — 2026-09-10)                                                 |
| **Data**      | 2026-09-10                                                                                           |

---

## 1. Contexto e Motivação

Na SPEC-041, o botão flutuante `ScrollToTop` recebeu o ícone `ChevronUp` e teve suas sombras/blur pulsantes eliminadas. Contudo, manteve-se a borda verde esmeralda (`border-emerald-500`) e o ícone verde (`text-emerald-600 dark:text-emerald-400`).

Conforme análise crítica de UX/UI do PO, botões flutuantes verdes no canto inferior direito mimetizam ou canibalizam botões de ação primária (como botões de WhatsApp e CTAs de conversão "Fale Conosco"). O `ScrollToTop` é estritamente um **utilitário de navegação secundário** e não deve atrair atenção visual desproporcional.

A solução é torná-lo **completamente neutro**:
- Borda fina e discreta em tons neutros (`border-zinc-200 dark:border-zinc-800`);
- Fundo neutro adaptativo (`bg-white dark:bg-zinc-900`);
- Ícone em tons neutros com alto contraste (`text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100`);
- Sem nenhum verde, glow ou sombra competindo com os pontos de conversão do site.

---

## 2. Requisitos Técnicos e de Design

### 2.1. Estilização Neutra do Botão
- [x] **Borda**: Fina (1px sólida) em tom neutro alinhado ao design system:
  - `border border-zinc-200 dark:border-zinc-800` (com `hover:border-zinc-300 dark:hover:border-zinc-700`).
  - Remoção definitiva de `border-emerald-500`.
- [x] **Fundo**:
  - `bg-white dark:bg-zinc-900` com hover em `hover:bg-zinc-100 dark:hover:bg-zinc-800`.
- [x] **Cor do Ícone**:
  - Neutra: `text-zinc-500 dark:text-zinc-400`, transicionando suavemente no hover para `hover:text-zinc-900 dark:hover:text-zinc-100`.
  - Remoção definitiva de `text-emerald-600 dark:text-emerald-400`.
- [x] **Tooltip**:
  - `border-zinc-200 dark:border-zinc-800 bg-background/95 text-zinc-600 dark:text-zinc-300`.
  - Remoção de qualquer referência a `emerald`.

### 2.2. Preservação Funcional
- [x] Ícone `ChevronUp` mantido com `size={20}` e `strokeWidth={2.5}`.
- [x] Microinteração de hover sutil no ícone (`group-hover:-translate-y-0.5 transition-transform duration-200`).
- [x] Visibilidade condicionada a `window.scrollY > 450` com fade de 300ms ease.
- [x] Preservação de `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- [x] Preservação do posicionamento `fixed right-6 md:right-8 z-50`.
- [x] Preservação da elevação dinâmica sobre o rodapé (`data-elevated`).
- [x] Preservação de `aria-label="Voltar ao topo"`.

---

## 3. Matriz Comparativa (SPEC-041 vs. SPEC-042)

| Elemento | SPEC-041 | SPEC-042 (Neutra) |
|---|---|---|
| **Borda do Botão** | `border-emerald-500` (verde marca) | `border-zinc-200 dark:border-zinc-800` (neutro discreto) |
| **Cor do Ícone** | `text-emerald-600 dark:text-emerald-400` | `text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100` |
| **Hover da Borda** | N/A | `hover:border-zinc-300 dark:hover:border-zinc-700` |
| **Borda do Tooltip** | `border-emerald-500/30` | `border-zinc-200 dark:border-zinc-800` |
| **Competição Visual** | Alto destaque verde (conflitava com CTAs/WhatsApp) | Zero competição com CTAs reais; utilitário refinado |
| **Contraste A11y** | > 4.5:1 | > 4.5:1 (WCAG AA) |

---

## 4. Quality Gates

1. Vitest: 135/135 testes passando.
2. ESLint: 0 erros.
3. Build: Sucesso sem warnings de chunk size.
4. Playwright E2E: 10/10 testes passando.
5. Emissão de `QA-042.md` e atualização dos registros do projeto.
