# TASK-009 — Implementação do Componente TechConstellation

| Campo              | Valor                                      |
|--------------------|--------------------------------------------|
| **ID**             | TASK-009                                   |
| **SPEC**           | SPEC-009                                   |
| **Data de início** | 2026-09-04                                 |
| **Agente**         | Gemini/Antigravity                         |
| **Status**         | ✅ Concluída                               |

---

## Escopo da Tarefa

1. **Modelagem de Tipos e Layout Desacoplado**:
   - Criar `src/lib/buildConstellationLayout.ts` com funções puras de posicionamento e cálculo de rotas PCB.
   - Criar testes unitários em `src/lib/__tests__/buildConstellationLayout.test.ts`.
2. **Componente TechConstellation**:
   - Implementar `src/components/sections/TechConstellation.tsx` com renderização SVG declarativa.
   - Aplicar trilhas PCB com pulsos de luz animados.
   - Implementar foco e contexto (hover, tab focus, tap mobile) ativando nós conectados e esmaecendo nós não relacionados.
   - Integrar Tooltip do shadcn/ui.
   - Utilizar design tokens CSS (`hsl(var(--primary))`, `hsl(var(--border))`, etc.) sem hex fixo.
   - Respeitar `prefers-reduced-motion`.
   - Adicionar atributos `data-testid` para testes.
3. **Testes do Componente**:
   - Implementar `src/components/sections/__tests__/TechConstellation.test.tsx`.
4. **Integração na Seção Tecnologias**:
   - Atualizar `src/components/sections/Technologies.tsx` substituindo o marquee pelo `TechConstellation`.
   - Atualizar `src/components/sections/__tests__/Technologies.test.tsx`.
5. **Quality Gates & Evidências**:
   - Testes unitários com cobertura ≥ 90%.
   - ESLint com 0 erros.
   - Testes Playwright E2E.
   - Build de produção com chunks < 600KB.
   - Registro em `reviews/QA-009.md`, `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos a Serem Criados / Modificados

- `src/lib/buildConstellationLayout.ts` (Criar)
- `src/lib/__tests__/buildConstellationLayout.test.ts` (Criar)
- `src/components/sections/TechConstellation.tsx` (Criar)
- `src/components/sections/__tests__/TechConstellation.test.tsx` (Criar)
- `src/components/sections/Technologies.tsx` (Modificar)
- `src/components/sections/__tests__/Technologies.test.tsx` (Modificar)
- `reviews/QA-009.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)

---

## Validações e Quality Gates

- [x] Playwright E2E: 5/5 testes passando no Chromium (`npm run test:e2e`).
- [x] Vitest: 90/90 testes unitários passando em 14 suítes (`npm test`).
- [x] Cobertura: 98.1% de linhas cobertas (`npm run test:coverage` >= 90%).
- [x] ESLint: 0 erros e 0 warnings (`npm run lint`).
- [x] Build: chunk de Technologies com 11.69 KB (< 600 KB) (`npm run build`).
- [x] QA registrado em `reviews/QA-009.md`.

