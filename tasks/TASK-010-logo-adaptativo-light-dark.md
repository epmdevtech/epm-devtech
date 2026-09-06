# TASK-010 — Adaptação do Logotipo para Dark e Light Mode

| Campo              | Valor                                      |
|--------------------|--------------------------------------------|
| **ID**             | TASK-010                                   |
| **SPEC**           | SPEC-010                                   |
| **Data de início** | 2026-09-06                                 |
| **Agente**         | Gemini/Antigravity                         |
| **Status**         | ✅ Concluída                               |

---

## Escopo da Tarefa

1. **Geração de Assets Otimizados para Light Mode**:
   - `public/logo-epm-devtech-light-xs.webp` (149x50 px, Header mobile/desktop).
   - `public/logo-epm-devtech-light-sm.webp` (300x101 px, Footer e telas retina).
   - `public/logo-epm-devtech-light.webp` e PNGs correspondentes.
2. **Atualização do Header (`src/components/layout/Header.tsx`)**:
   - Remoção de `bg-gray-900` da moldura do logo.
   - Implementação de renderização adaptativa CSS com variantes dark/light.
   - Preservação da acessibilidade com `alt="EPM DEVTECH"` único e `aria-hidden="true"` na variante do tema oposto.
3. **Atualização do Footer (`src/components/sections/Footer.tsx`)**:
   - Remoção de `bg-gray-900` do container do logo.
   - Implementação de variantes dark/light com suporte a hover ring e glow sutil.
4. **Atualização do HTML e Preload (`index.html`)**:
   - Ajustar preloads com `media="(prefers-color-scheme: ...)"` para LCP ótimo em ambos os temas.
5. **Quality Gates & Evidências**:
   - Testes unitários com cobertura ≥ 90% (Vitest: 98.15%).
   - ESLint com 0 erros.
   - Testes E2E com Playwright (7/7 passando).
   - Build de produção com chunks < 600KB.
   - Registro em `reviews/QA-010.md`, `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Criados / Modificados

- `specs/SPEC-010-logo-adaptativo-light-dark.md` (Criado)
- `tasks/TASK-010-logo-adaptativo-light-dark.md` (Criado / Atualizado)
- `public/logo-epm-devtech-light-xs.webp` (Criado)
- `public/logo-epm-devtech-light-sm.webp` (Criado)
- `public/logo-epm-devtech-light.webp` (Criado)
- `public/logo-epm-devtech-light.png` (Criado)
- `public/logo-epm-devtech-light-sm.png` (Criado)
- `src/components/layout/Header.tsx` (Modificado)
- `src/components/sections/Footer.tsx` (Modificado)
- `index.html` (Modificado)
- `e2e/design-system-and-stability.spec.ts` (Modificado)
- `reviews/QA-010.md` (Criar)
- `PROJECT.md` (Modificado)
- `CHANGELOG.md` (Modificado)

---

## Validações e Quality Gates

- [x] Playwright E2E: 7/7 testes passando no Chromium (`npm run test:e2e`).
- [x] Vitest: 91/91 testes unitários passando em 14 suítes (`npm test`).
- [x] Cobertura: 98.15% de linhas cobertas (`npm run test:coverage` >= 90%).
- [x] ESLint: 0 erros e 0 warnings (`npm run lint`).
- [x] Build: produção limpa sem chunks > 600KB (`npm run build`).
- [x] UX/UI: Remoção da pill preta no modo claro, tipografia escura de alto contraste (18.7:1), 0 CLS.
