# TASK-102 — Recalibração de UX e Cinemática do MagneticButton (Fim do Cursor Hijacking)

- **Status:** Concluída
- **Data de Início:** 2026-10-03
- **Data de Conclusão:** 2026-10-03
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-102-recalibracao-ux-magnetic-button.md`

---

## 1. Escopo da Tarefa

1. **Recalibração Cinemática do Componente (`src/components/ui/MagneticButton.tsx`)**:
   - Reduzir o raio de ativação para uma margem fixa e estrita de proximidade (`proximityMargin = 20px`) além das bordas físicas do elemento (`getBoundingClientRect`).
   - Implementar clamping rígido do deslocamento do botão no eixo X (`maxTravelX = 12px`) e eixo Y (`maxTravelY = 8px`).
   - Conter o deslocamento do texto interno em no máximo `±4.2px` (`-clampedX * 0.35`), mantendo o efeito 2.5D oposto suave e sóbrio.
   - Atenuar o fator de força magnética padrão para `strength = 0.15` (faixa segura 0.12 - 0.18).
   - Ajustar a interpolação ágil e amortecida do GSAP para `duration: 0.38s` e `ease: "power2.out"`.
   - Implementar desengate rápido (breakout): soltar o imã imediatamente (`leave()`) quando o cursor ultrapassa a margem de 20px, retornando suavemente a `(0, 0)`.
   - Manter compatibilidade com polimorfismo (`<button>`, `<Link to>`, `<a href>`), variantes de estilo institucionais e tokens semânticos (`bg-brand`, `text-on-brand`).

2. **Atualização da Suíte de Testes Unitários**:
   - `src/components/ui/__tests__/MagneticButton.test.tsx`:
     * Validar ativação do hover dentro da margem de 20px.
     * Validar desengate imediato ao cruzar a margem de 20px.
     * Validar respeito aos limites de clamping (deslocamento X ≤ 12px, deslocamento Y ≤ 8px).

3. **Execução e Validação dos Quality Gates**:
   - TypeScript (`npx tsc --noEmit`)
   - ESLint (`npm run lint`)
   - Vitest Unit & Coverage (`npm test -- --run` & `npm run test:coverage`)
   - Playwright E2E (`npx playwright test`)
   - Build de produção (`npm run build`)

4. **Documentação e Encerramento**:
   - Preencher `reviews/QA-102.md`
   - Atualizar `PROJECT.md` e `CHANGELOG.md`
   - Atualizar status desta TASK para `Concluída`

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-102-recalibracao-ux-magnetic-button.md` (Criado)
- `tasks/TASK-102-recalibracao-ux-magnetic-button.md` (Criado)
- `src/components/ui/MagneticButton.tsx` (Modificado)
- `src/components/ui/__tests__/MagneticButton.test.tsx` (Modificado)
- `reviews/QA-102.md` (Criar)
- `PROJECT.md` (Atualizar)
- `CHANGELOG.md` (Atualizar)
