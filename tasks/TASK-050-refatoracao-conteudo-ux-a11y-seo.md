# TASK-050 — Refatoração de Conteúdo, UX, Acessibilidade e SEO (Fase 2)

**Objetivo**: Implementar na base de código as alterações de conteúdo, UX writing, metadados, acessibilidade e SEO aprovadas na Fase 1, mantendo rigorosamente o layout, design system e a qualidade técnica.

**SPEC de Referência**: `specs/SPEC-049-refatoracao-conteudo-ux-a11y-seo.md`  
**Proposta de Copy de Referência**: `docs/refactor/copy-proposal.md`  
**Plano de Referência**: `docs/refactor/plan.md`

## Checklist de Execução
- [x] 1. Gerar imagem Open Graph 1200×630 em `public/og-image-1200x630.png`.
- [x] 2. Atualizar `index.html` (title, description, keywords, author, og/twitter tags, JSON-LD honesto).
- [x] 3. Atualizar `src/pages/Index.tsx` (`SEO_META` dinâmico).
- [x] 4. Refatorar `src/components/sections/Hero.tsx` (headline, supporting copy, CTA único, microprova).
- [x] 5. Refatorar `src/components/sections/Authority.tsx` (títulos, métricas e contexto por setor).
- [x] 6. Refatorar `src/components/sections/About.tsx` (posicionamento da empresa, fundador como liderança, métricas).
- [x] 7. Refatorar `src/components/sections/Sectors.tsx` (título e descrições dos 4 cards 3D).
- [x] 8. Refatorar `src/components/sections/Services.tsx` (4 cards condensados com gatilhos de dor).
- [x] 9. Refatorar `src/components/sections/Technologies.tsx` (título e subtítulo de evidência).
- [x] 10. Refatorar `src/components/sections/Differentials.tsx` (3 pilares de diferenciais + linha de apoio).
- [x] 11. Refatorar `src/components/sections/FAQ.tsx` (calibração de respostas e promessa de retorno).
- [x] 12. Refatorar `src/components/sections/Contact.tsx` (título, CTA "Falar sobre meu projeto", feedbacks).
- [x] 13. Refatorar `src/components/sections/Footer.tsx` (soluções e navegação sincronizadas).
- [x] 14. Atualizar testes unitários em `src/components/sections/__tests__/` e `src/pages/__tests__/`.
- [x] 15. Executar Quality Gates: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run test:e2e`, `npm run build`.
- [x] 16. Subir servidor local (`npm run preview` ou `npm run dev`) para validação pelo usuário antes de qualquer commit na branch develop.
