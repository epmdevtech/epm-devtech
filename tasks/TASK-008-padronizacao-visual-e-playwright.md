# TASK-008 — Padronização Visual do Design System e Testes E2E com Playwright

| Campo              | Valor                                      |
|--------------------|--------------------------------------------|
| **ID**             | TASK-008                                   |
| **SPEC**           | SPEC-008                                   |
| **Data de início** | 2026-09-04                                 |
| **Agente**         | Gemini/Antigravity                         |
| **Status**         | ✅ Concluída                               |

---

## Escopo Aprovado

1. **Tokens de Cores & Identidade Visual**:
   - Substituir a cor primária azul (`221.2 83.2% 52%` / `#2979FF`) pelo Verde Esmeralda oficial da EPM DEVTECH (`#10B981` / HSL `158 64% 52%` / dark mode) em `src/index.css` e `index.html`.
   - Ajustar utilitários e classes de gradiente.
2. **Títulos Monocromáticos**:
   - Tornar 100% monocromáticos os títulos em `Hero`, `About`, `Services`, `Technologies`, `Differentials`, `Authority`, `Contact`.
   - Remover `text-gradient` e múltiplos spans coloridos dentro do mesmo heading.
   - Usar peso tipográfico (`font-semibold` / `font-light`) para hierarquia dentro do mesmo título.
3. **Harmonização Tipográfica**:
   - Utilizar `Geist Sans` para parágrafos e textos corridos (removendo `font-mono` de textos narrativos).
   - Preservar `Geist Mono` para números, métricas, badges e código.
4. **Resolução do Flicker do Título no Hero**:
   - Harmonizar o placeholder estático do `index.html` com o `<Hero />` React para eliminar a renderização dupla/salto visual.
5. **Automação E2E com Playwright**:
   - Instalar `@playwright/test` e browser Chromium.
   - Criar `playwright.config.ts`.
   - Criar suíte `e2e/design-system-and-stability.spec.ts`.
   - Validar ausência de flicker, títulos monocromáticos, verde da marca e estabilidade da navegação.

---

## Arquivos a Serem Modificados / Criados

1. `specs/SPEC-008-padronizacao-visual-e-playwright.md` (Status: Aprovada)
2. `src/index.css`
3. `index.html`
4. `src/components/sections/Hero.tsx`
5. `src/components/sections/About.tsx`
6. `src/components/sections/Services.tsx`
7. `src/components/sections/Technologies.tsx`
8. `src/components/sections/Differentials.tsx`
9. `src/components/sections/Authority.tsx`
10. `src/components/sections/Contact.tsx`
11. `package.json`
12. `playwright.config.ts`
13. `vitest.config.ts`
14. `e2e/design-system-and-stability.spec.ts`
15. `reviews/QA-008.md`

---

## Validações e Quality Gates

- [x] Playwright E2E: 4/4 testes passando (`npm run test:e2e`).
- [x] Vitest: 80/80 testes unitários passando (`npm test`).
- [x] Cobertura: 98.05% de linhas (`npm run test:coverage` >= 90%).
- [x] ESLint: 0 erros, 0 warnings (`npm run lint`).
- [x] Build: 0 erros e nenhum chunk acima de 150KB (`npm run build`).
- [x] QA registrado em `reviews/QA-008.md`.

