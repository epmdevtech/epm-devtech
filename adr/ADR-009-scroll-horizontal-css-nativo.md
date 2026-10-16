# ADR-009 — Scroll Horizontal com CSS Nativo (`animation-timeline: view()`) na Rota `/how-we-work`

**Status:** ✅ Aceito  
**Data:** 2026-10-16  
**Decisores:** Elessandro Prestes Macedo  
**Contexto:** TASK-117 / SPEC-117

---

## 1. Contexto

A rota `/how-we-work` deve apresentar as quatro etapas do processo em uma narrativa horizontal controlada pelo scroll vertical. O projeto já possui infraestrutura de animação:

- **Lenis** (smooth scroll global) sincronizado com **GSAP ScrollTrigger** via `SmoothScrollProvider`.
- **Framer Motion** em vários componentes.
- **GSAP** no hook `useScrollReveal`.

Era necessário decidir se a nova animação horizontal seria implementada com uma dessas bibliotecas já instaladas ou com CSS nativo de scroll-driven animations.

---

## 2. Decisão

Implementar a narrativa horizontal exclusivamente com **CSS nativo de scroll-driven animations**, usando:

- `position: sticky` para fixar a viewport da seção;
- `view-timeline-name` / `animation-timeline: --var` para vincular a animação à posição da seção no scrollport;
- `animation-range: contain 0% contain 100%` para mapear o deslocamento horizontal exatamente ao intervalo em que a seção cobre a viewport;
- `@keyframes` com `transform: translateX(calc(-100% + 100vw))`, garantindo que o último painel alinhe sua borda direita à viewport **sem deslocamento excedente**, independentemente da largura do conteúdo;
- `@supports (animation-timeline: view())` para isolar o comportamento experimental;
- `@media (prefers-reduced-motion: no-preference)` e `@media (min-width: 1024px)` para restringir a animação.

A altura da seção é derivada da geometria real dos painéis:

```css
--hww-travel: calc(
  4 * var(--hww-panel-w) + 3 * var(--hww-gap) + 2 * var(--hww-edge) - 100vw
);
height: calc(100vh + var(--hww-travel));
```

---

## 3. Justificativa

1. **Menor complexidade:** a animação não requer JavaScript, estado React, listeners de scroll nem cálculo imperativo de dimensões.
2. **Performance:** a animação roda no compositor (apenas `transform`), evitando layout thrashing e re-renderizações.
3. **Compatibilidade com Lenis:** o Lenis altera a posição real de scroll (`window.scrollTo`), portanto as scroll-driven animations do CSS reagem corretamente, sem necessidade de uma segunda implementação de smooth scroll.
4. **Geometria exata:** `translateX(calc(-100% + 100vw))` torna o deslocamento proporcional ao conteúdo, eliminando o risco de vazio ou corte.
5. **Acessibilidade e fallback:** o layout base é vertical e legível; a animação é uma camada progressiva.

---

## 4. Alternativas Consideradas

| Alternativa | Motivo da rejeição |
|---|---|
| GSAP ScrollTrigger + `pin` + `x` | Duplicaria a lógica de smooth scroll, adicionaria JS imperativo e cálculo manual de dimensões |
| Framer Motion `useScroll`/`useTransform` | Re-renderizações e dependência de estado para algo resolvível em CSS |
| Biblioteca de scroll horizontal dedicada | Instalação de dependência nova, vedada pela SPEC |
| `overflow-x: auto` com scroll-snap | Não reproduz o comportamento de "pin" controlado pelo scroll vertical da referência |

---

## 5. Consequências

- ✅ Nenhuma dependência nova; nenhuma alteração no `SmoothScrollProvider`.
- ✅ Comportamento degradado gracioso: navegadores sem suporte exibem a lista vertical.
- ✅ Baixo custo de manutenção: toda a mecânica está em um bloco `<style>` isolado no componente.
- ⚠️ **Limitação conhecida:** `animation-timeline: view()` tem suporte parcial (Chromium 115+; suporte ausente/parcial em Safari e Firefox na data desta decisão). Nesses navegadores, o fallback vertical é apresentado.
- ⚠️ **Limitação conhecida:** a animação depende de `position: sticky`, que exige que nenhum ancestral crie um scroll container com `overflow: hidden`. O projeto usa `overflow-x: clip` no `body`, que preserva o sticky.

---

_Maintainer: Elessandro Prestes Macedo | 2026-10-16_
