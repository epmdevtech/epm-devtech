# SPEC-041: ScrollToTop — Substituição de Ícone por ChevronUp, Remoção de Glow/Sombra e Visibilidade Condicionada ao Scroll (> 450px)

| Campo         | Valor                                                                                                           |
|---------------|-----------------------------------------------------------------------------------------------------------------|
| **ID**        | SPEC-041                                                                                                        |
| **Título**    | ScrollToTop — Substituição de Ícone por ChevronUp, Remoção de Glow/Sombra e Visibilidade Condicionada (> 450px) |
| **Prioridade**| Média (UI/UX, Acessibilidade, Consistência de Design System)                                                   |
| **Origem**    | Demanda PO (2026-09-10)                                                                                         |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                                                  |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo — 2026-09-10)                                                            |
| **Data**      | 2026-09-10                                                                                                      |

---

## 1. Contexto e Motivação

O botão flutuante "Voltar ao topo" (`src/components/ui/ScrollToTop.tsx`) possui atualmente um ícone lúdico de foguete (`Rocket`), animação contínua de pulso de brilho (glow em box-shadow/blur) e ativação no scroll em 400px.

Para alinhar o componente com o padrão sóbrio, minimalista e de alta engenharia do restante do portal da **EPM DEVTECH**, o PO solicitou:
1. Troca do ícone para seta/chevron para cima (`ChevronUp` da biblioteca `lucide-react`), mantendo o tamanho atual (`size={20}`);
2. Remoção completa de efeitos de glow, sombra radial e blur, adotando acabamento flat com fundo e borda alinhados às variáveis de tema do rodapé, com borda de 1px sólida na cor da marca (`border-emerald-500` / `#10B981`);
3. Visibilidade condicionada ao scroll de **450px** com transição suave de fade-in e fade-out (300ms ease);
4. Preservação da elevação adaptativa ao rodapé (`data-elevated`), do scroll suave até o topo (`window.scrollTo`), do z-index (50), posição fixa e acessibilidade (`aria-label="Voltar ao topo"`).

---

## 2. Requisitos Técnicos e de Design

### 2.1. Ícone
- [x] Substituir `Rocket` por `ChevronUp` de `lucide-react`.
- [x] Manter o tamanho de 20px (`size={20}`) e traço nítido (`strokeWidth={2.5}`).
- [x] Microinteração de hover suave: deslocamento sutil para cima (`group-hover:-translate-y-0.5 transition-transform duration-200`).

### 2.2. Eliminação de Glow e Ajuste de Cores / Tema
- [x] Remover a tag `<style>` com `@keyframes scroll-top-pulse` e a classe `.scroll-top-glow`.
- [x] Remover o elemento `<motion.div className="... blur-[8px] ... scroll-top-glow" />` de halo de luz e sombra.
- [x] Remover `shadow-lg`, `hover:shadow-...` e `backdrop-blur-...`.
- [x] **Fundo (Background)**: Utilizar tokens de tema compatíveis com o rodapé:
  - `bg-white dark:bg-zinc-900` (ou `bg-background dark:bg-zinc-900`), com `hover:bg-zinc-100 dark:hover:bg-zinc-800`.
- [x] **Borda**: Borda de 1px sólida na cor da marca:
  - `border border-emerald-500` em ambos os modos (light e dark), sem cores hexadecimais fixas no código.
- [x] **Cor do Ícone e Contraste**:
  - `text-emerald-600 dark:text-emerald-400` (garantindo contraste WCAG AA/AAA superior a 4.5:1 no light e 9:1 no dark), ou com transição para hover.

### 2.3. Visibilidade Condicionada ao Scroll (> 450px)
- [x] O gatilho de ativação deve ser `window.scrollY > 450`.
- [x] O botão inicia oculto (`opacity: 0; pointer-events: none`).
- [x] Aparece com fade-in suave (`transition: opacity 300ms ease` / `duration-300 ease-out`) ao ultrapassar 450px de scroll.
- [x] Ao rolar de volta abaixo de 450px, desaparece com a mesma transição de fade-out.

### 2.4. Preservação de Contratos Existentes
- [x] Função de clique: `window.scrollTo({ top: 0, behavior: "smooth" })`.
- [x] Posição fixa no canto inferior direito (`fixed right-6 md:right-8 z-50`).
- [x] Elevação dinâmica no rodapé preservada (`isFooterVisible ? "bottom-20 md:bottom-24" : "bottom-6 md:bottom-8"`, com `data-testid="scroll-to-top-container"` e `data-elevated`).
- [x] Atributo `aria-label="Voltar ao topo"` e `Tooltip` mantidos intactos.

---

## 3. Matriz Comparativa (Antes vs. Depois)

| Propriedade | Antes | Depois |
|---|---|---|
| **Ícone** | `Rocket` (foguete) | `ChevronUp` (seta chevron para cima) |
| **Tamanho do Ícone** | 20px | 20px |
| **Glow / Efeitos** | Halo pulsante com blur de 8px e box-shadow radial | Nenhum glow, sem blur, sem sombra |
| **Borda** | Dinâmica inline com HSL e shadow | 1px sólida na cor da marca (`border-emerald-500`) |
| **Fundo** | `bg-background/90` com blur | `bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800` |
| **Cor do Ícone** | `text-foreground` | `text-emerald-600 dark:text-emerald-400` (alto contraste) |
| **Gatilho de Scroll** | `window.scrollY > 400` | `window.scrollY > 450` |
| **Transição de Fade** | Animação mista com escala | Fade suave 300ms ease (`transition-opacity duration-300 ease-out`) |

---

## 4. Impacto em Testes e Quality Gates

1. **Testes Unitários (`src/components/ui/__tests__/ScrollToTop.test.tsx`)**:
   - Atualizar limite de scroll de 400px para 450px (não exibe em `<= 450px`, exibe em `> 450px`);
   - Testar presença do ícone chevron e ausência de classes de glow.
2. **Testes E2E (`e2e/design-system-and-stability.spec.ts`)**:
   - O teste 8 rola até 1000px, portanto continuará cobrindo a exibição e elevação no rodapé perfeitamente.
3. **Quality Gates**:
   - Vitest com 100% de aprovação e cobertura $\ge 90\%$.
   - ESLint com 0 erros.
   - Build de produção limpo.
   - Playwright com 10/10 testes passando.

---

## 5. Próximos Passos (Aguardando Aprovação do PO)

1. Aprovação formal do Product Owner (Elessandro Prestes Macedo).
2. Criação da `TASK-041-scroll-to-top-chevron-sem-glow.md`.
3. Implementação das modificações em `src/components/ui/ScrollToTop.tsx`.
4. Atualização de `src/components/ui/__tests__/ScrollToTop.test.tsx`.
5. Validação com Vitest, ESLint, Build e Playwright.
6. Emissão de `QA-041.md`, atualização de `PROJECT.md` e `CHANGELOG.md`.
