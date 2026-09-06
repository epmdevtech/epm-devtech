# TASK-011 — Hero: Posicionamento Comercial, Engenharia Sênior & Remoção de Gradientes

| Campo              | Valor                                      |
|--------------------|--------------------------------------------|
| **ID**             | TASK-011                                   |
| **SPEC**           | SPEC-011                                   |
| **Data de início** | 2026-09-06                                 |
| **Agente**         | Gemini/Antigravity                         |
| **Status**         | ✅ Concluída                               |

---

## Escopo da Tarefa

1. **Atualização da Seção Hero (`src/components/sections/Hero.tsx`)**:
   - Adicionar Tagline institucional superior: "ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO" com indicador em pulso.
   - Atualizar H1: "Software sob medida construído para escalar o seu negócio." mantendo padrão monocromático e contraste tipográfico.
   - Atualizar Subtítulo: "Da concepção à infraestrutura: desenvolvemos sistemas web, APIs resilientes e arquiteturas de alta performance preparadas para acompanhar o crescimento da sua empresa."
   - Implementar Dual CTA:
     - Botão Primário: "Falar sobre meu projeto" direcionando para `#contato`.
     - Botão Secundário: "Conhecer serviços" direcionando para `#servicos`.
   - Adicionar Microprova Social: "+9 anos de experiência em sistemas críticos • Arquiteturas cloud-native • APIs resilientes • Código limpo".
   - Remover todos os gradientes de fundo (`bg-gradient-hero` e os orbs com `blur-[128px]`) em ambos os modos (Dark e Light).
2. **Atualização dos Testes Unitários (`src/components/sections/__tests__/Hero.test.tsx`)**:
   - Ajustar asserções para o novo H1, subtítulo, tagline, dual CTAs e microprova social.
3. **Atualização dos Testes E2E Playwright (`e2e/design-system-and-stability.spec.ts`)**:
   - Atualizar verificações de texto do H1 e links de navegação.
4. **Quality Gates & Evidências**:
   - Vitest: 92/92 testes passando com cobertura de 98.17%.
   - Playwright: 7/7 testes E2E passando.
   - ESLint: 0 erros e 0 warnings.
   - Build de produção sem chunks > 600KB.
   - Registrar `reviews/QA-011.md`, atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Criados / Modificados

- `specs/SPEC-011-hero-posicionamento-comercial-engenharia.md` (Criado)
- `tasks/TASK-011-hero-posicionamento-comercial-engenharia.md` (Criado / Atualizado)
- `src/components/sections/Hero.tsx` (Modificado)
- `src/components/sections/__tests__/Hero.test.tsx` (Modificado)
- `e2e/design-system-and-stability.spec.ts` (Modificado)
- `reviews/QA-011.md` (Criado)
- `PROJECT.md` (Modificado)
- `CHANGELOG.md` (Modificado)

---

## Validações e Quality Gates

- [x] Playwright E2E: 7/7 testes passando no Chromium (`npm run test:e2e`).
- [x] Vitest: 92/92 testes unitários passando em 14 suítes (`npm test`).
- [x] Cobertura: 98.17% de linhas cobertas (`npm run test:coverage` >= 90%).
- [x] ESLint: 0 erros e 0 warnings (`npm run lint`).
- [x] Build: produção limpa sem chunks > 600KB (`npm run build`).
- [x] UX/UI: Tagline, H1 comercial, Dual CTA, microprova social e remoção completa de gradientes.
