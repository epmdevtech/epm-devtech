# TASK-013 — Padronização Tipográfica Linear & Copywriting PT-BR

| Campo              | Valor                                      |
|--------------------|--------------------------------------------|
| **ID**             | TASK-013                                   |
| **SPEC**           | SPEC-013                                   |
| **Data de início** | 2026-09-06                                 |
| **Agente**         | Gemini/Antigravity                         |
| **Status**         | ✅ Concluída                               |

---

## Escopo da Tarefa

1. **Criação do Componente `SectionHeader` (`src/components/ui/SectionHeader.tsx`)**:
   - Tagline / Overline com badge nos moldes:
     - Light Mode: `bg-emerald-50 border border-emerald-200/70 text-emerald-700 font-semibold uppercase tracking-wider text-xs sm:text-sm`
     - Dark Mode: `dark:bg-emerald-950/50 dark:border-emerald-800/60 dark:text-emerald-400`
   - Título (H1 / H2) estritamente linear (`font-bold`, `tracking-tight`, `leading-[1.15]` ou `leading-tight`):
     - Light Mode: `text-zinc-900`, destaque em `text-emerald-600` (mantendo `font-bold`)
     - Dark Mode: `dark:text-white`, destaque em `dark:text-emerald-400` (mantendo `font-bold`)
   - Subtítulo regular (`font-normal text-base sm:text-lg leading-relaxed max-w-2xl sm:max-w-3xl mx-auto`):
     - Light Mode: `text-zinc-600`
     - Dark Mode: `dark:text-zinc-400`
2. **Criação de Testes Unitários (`src/components/ui/__tests__/SectionHeader.test.tsx`)**:
   - Validação de renderização como H1 e H2.
   - Validação de alinhamento (`center` / `left`).
   - Validação de classes de cores de light e dark mode.
3. **Refatoração das Seções**:
   - `Hero.tsx`:
     - Overline padronizado.
     - H1 linear `font-bold` sem mescla de `font-light` e `font-semibold`.
     - Subtítulo com cores `text-zinc-600 dark:text-zinc-400`.
     - Microcopy: "Falar com especialista" e "Ver serviços".
   - `Services.tsx`:
     - Integração com `SectionHeader`.
     - Remoção de travessões na cópia e nos mockups.
   - `Technologies.tsx`:
     - Integração com `SectionHeader`.
   - `Differentials.tsx`:
     - Integração com `SectionHeader`.
     - Remoção de travessões nos cards 02 e 06.
   - `Contact.tsx`:
     - Integração com `SectionHeader`.
     - Remoção de travessão na notificação toast e logs.
   - `About.tsx` e `Authority.tsx`:
     - Harmonização de cabeçalhos e remoção de travessões contextuais.
4. **Atualização de Testes**:
   - Adequação de `Hero.test.tsx` e `design-system-and-stability.spec.ts` para os novos textos e seletores.
5. **Quality Gates & Evidências**:
   - Vitest com 100% de aprovação e cobertura ≥ 90%.
   - Playwright E2E com 100% de testes passando.
   - ESLint com 0 erros.
   - Build de produção limpo.
   - Relatório `reviews/QA-013.md`, `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Envolvidos

- `specs/SPEC-013-padronizacao-tipografica-copywriting-linear.md` (Criado)
- `tasks/TASK-013-padronizacao-tipografica-copywriting-linear.md` (Criado)
- `src/components/ui/SectionHeader.tsx` (Criar)
- `src/components/ui/__tests__/SectionHeader.test.tsx` (Criar)
- `src/components/sections/Hero.tsx` (Modificar)
- `src/components/sections/Services.tsx` (Modificar)
- `src/components/sections/Technologies.tsx` (Modificar)
- `src/components/sections/Differentials.tsx` (Modificar)
- `src/components/sections/Contact.tsx` (Modificar)
- `src/components/sections/About.tsx` (Modificar)
- `src/components/sections/Authority.tsx` (Modificar)
- `src/components/sections/__tests__/Hero.test.tsx` (Modificar)
- `e2e/design-system-and-stability.spec.ts` (Modificar)
- `reviews/QA-013.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
