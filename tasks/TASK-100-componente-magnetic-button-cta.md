# TASK-100 — Componente Reutilizável de Botão Magnético (Magnetic Button) para CTAs Globais

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-100-componente-magnetic-button-cta.md`

---

## 1. Escopo da Tarefa

1. **Implementação do Componente Base (`src/components/ui/MagneticButton.tsx`)**:
   - Arquitetura de 3 camadas cinemáticas independentes: Hitbox (área de captura), Surface (fundo/borda com translação moderada) e Content (texto/ícone com translação ampliada para parallax 2.5D).
   - Efeito de preenchimento suave (*filler*) e snap-back elástico ao sair do cursor (`mouseleave`) via GSAP.
   - Suporte polimórfico a elemento `<button>` (incluindo `type="submit"` e handlers de clique) e rotas/links (`to` via `react-router-dom`, `href` para links externos).
   - Variantes visuais: `primary` (verde-água #2DD4BF da EPM DevTech), `outline`, `ghost`, `secondary`.
   - Acessibilidade e detecção de touch (`pointer: coarse`), foco de teclado (`:focus-visible`) e respeito estrito a `prefers-reduced-motion`.

2. **Substituição e Aplicação nos CTAs Globais**:
   - `src/components/layout/Header.tsx`: CTA "Fale conosco" (desktop e gaveta mobile).
   - `src/components/sections/Hero.tsx`: CTA primário da Home ("Falar sobre meu projeto" / "Vamos conversar").
   - `src/pages/ServicesPage.tsx`: CTA de abertura ("Solicite uma conversa técnica").
   - `src/pages/AboutPage.tsx`: CTA institucional direcionando para contato.
   - `src/components/sections/Contact.tsx` / `src/components/ContactForm.tsx`: Botão de submissão do formulário.

3. **Testes Unitários**:
   - `src/components/ui/__tests__/MagneticButton.test.tsx` cobrindo renderização polimórfica, variantes, interações com mouse, bypass com `prefers-reduced-motion` e desmonte limpo.

4. **Quality Gates**:
   - `npx tsc --noEmit` (0 erros).
   - `npm run lint` (0 erros, 0 warnings).
   - `npm test -- --run` (100% dos testes aprovados).
   - `npm run test:coverage` (cobertura mantida ≥ 90%).
   - `npx playwright test` (100% dos testes E2E aprovados).
   - `npm run build` (Chunks < 600KB).

5. **Documentação e Governança**:
   - Preencher `reviews/QA-100.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit Git em pt-BR na branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-100-componente-magnetic-button-cta.md` (Criado / Aprovado)
- `tasks/TASK-100-componente-magnetic-button-cta.md` (Criado)
- `src/components/ui/MagneticButton.tsx` (Criar)
- `src/components/ui/__tests__/MagneticButton.test.tsx` (Criar)
- `src/components/layout/Header.tsx` (Modificar)
- `src/components/sections/Hero.tsx` (Modificar)
- `src/pages/ServicesPage.tsx` (Modificar)
- `src/pages/AboutPage.tsx` (Modificar)
- `src/components/sections/Contact.tsx` / `src/components/ContactForm.tsx` (Modificar)
- `reviews/QA-100.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
