# SPEC-102 — Recalibração de UX e Cinemática do MagneticButton (Fim do Cursor Hijacking)

- **Status:** APROVADO
- **Data de Criação:** 2026-10-03
- **Data de Aprovação:** 2026-10-03
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / Microinterações / UX Engineering / GSAP 3 / React 18 / Tailwind CSS

---

## 1. Contexto e Motivação

O componente `MagneticButton` foi implementado para enriquecer as chamadas para ação (CTAs) corporativas com microinterações refinadas inspiradas na referência Codrops / Cuberto.

Contudo, a calibração inicial apresentou comportamento excessivamente atrativo ("pegajoso"):
- O raio de captura baseado em múltiplos da largura (`0.75 * width`) englobava áreas excessivamente distantes do botão.
- O botão acompanhava o cursor livremente sem trava de distância máxima, gerando a sensação de "cursor hijacking" (sequestro do cursor), prejudicando a precisão do clique e a experiência do usuário decisor B2B.

Esta especificação define a **recalibração de UX para maturidade técnica e sobriedade**:
1. **Raio de Ativação Restrito**: Substituição de múltiplos amplos de largura por uma margem de proximidade retangular estrita de 20px além das bordas físicas do botão.
2. **Clamping Rígido de Deslocamento**: Trava física estrita de deslocamento:
   - Eixo X: máximo `±12px`.
   - Eixo Y: máximo `±8px`.
   - Texto interno (parallax 2.5D): máximo `±4.2px` (35% do deslocamento do botão).
3. **Desengate Ágil (Breakout)**: Ao cruzar a margem de 20px, o botão desengata imediatamente (`leave()`) e retorna à posição de repouso `(0, 0)` com interpolação suave amortecida (`0.38s`, `ease: "power2.out"`).
4. **Força Atenuada (Damping & Strength)**: Coeficiente de força ajustado para `0.15` (faixa segura 0.12 a 0.18), eliminando oscilações excessivas ou efeito gelatina.

---

## 2. Parâmetros Cinemáticos

| Parâmetro | Valor Anterior | Novo Valor Recalibrado | Justificativa UX |
|---|---|---|---|
| Margem de Proximidade | `0.75 * width` (~150px) | `20px` fixos além da borda | Evita captura prematura do cursor |
| Trava Máxima Eixo X | Ilimitada | `±12px` | Impede deformações e desvios bruscos |
| Trava Máxima Eixo Y | Ilimitada | `±8px` | Mantém o botão estável na linha de leitura |
| Trava Máxima Texto | Ilimitada | `±4.2px` (`-clampedX * 0.35`) | Parallax 2.5D sutil e sofisticado |
| Força (`strength`) | `0.28` | `0.15` | Movimento amortecido e estável |
| Duração / Easing | `0.55s, power3.out` | `0.38s, power2.out` | Retorno ágil sem atraso tátil |

---

## 3. Algoritmo de Proximidade e Clamping

```typescript
const MAX_TRAVEL_X = 12;
const MAX_TRAVEL_Y = 8;
const PROXIMITY_MARGIN = 20;

const onMove = (e: MouseEvent) => {
  const rect = area.getBoundingClientRect();

  const isInProximity =
    e.clientX >= rect.left - proximityMargin &&
    e.clientX <= rect.right + proximityMargin &&
    e.clientY >= rect.top - proximityMargin &&
    e.clientY <= rect.bottom + proximityMargin;

  if (isInProximity) {
    if (!isHovering) enter();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rawDeltaX = (e.clientX - centerX) * strength;
    const rawDeltaY = (e.clientY - centerY) * strength;

    const clampedX = Math.max(-maxTravelX, Math.min(maxTravelX, rawDeltaX));
    const clampedY = Math.max(-maxTravelY, Math.min(maxTravelY, rawDeltaY));

    btnX(clampedX);
    btnY(clampedY);
    textX(-clampedX * 0.35);
    textY(-clampedY * 0.35);
  } else if (isHovering) {
    leave();
  }
};
```

---

## 4. Critérios de Aceite e Quality Gates

1. O cursor do mouse só ativa a atração do botão a no máximo 20px de distância de suas bordas.
2. O botão nunca se desloca mais de 12px horizontalmente ou 8px verticalmente em qualquer circunstância.
3. Ao sair da margem de 20px, o botão desengata e retorna imediatamente à posição `(0, 0)`.
4. Zero erros de compilação TypeScript (`npx tsc --noEmit`).
5. Zero erros de lint (`npm run lint`).
6. 100% dos testes unitários passando (`npm test -- --run`).
7. Cobertura ≥ 90% (`npm run test:coverage`).
8. 100% dos testes E2E Playwright aprovados (`npx playwright test`).
9. Build e pré-renderização sem erros (`npm run build`).
