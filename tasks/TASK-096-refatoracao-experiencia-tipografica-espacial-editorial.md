# TASK-096 — Refatoração da Experiência Tipográfica, Espacial e Textual Editorial (Padrão B2B Alto Nível)

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-096-refatoracao-experiencia-tipografica-espacial-editorial.md`

---

## 1. Escopo da Tarefa

1. **Configuração Global de Tipografia e Container (`tailwind.config.ts` & `src/index.css`)**:
   - Priorizar `Inter` na família tipográfica primária (`font-sans`).
   - Configurar utilitários para a escala tipográfica fluida (`h1-display`, `h2-section`, `h3-card`, `body-editorial`, `eyebrow-editorial`).
   - Configurar o container editorial unificado `w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] max-w-[1280px] mx-auto px-0`.

2. **Refatoração Estrutural de Containers e Espaçamentos**:
   - `src/components/ui/SectionWrapper.tsx`:
     * Padding vertical fluido `py-[clamp(4.5rem,8vw,8rem)]`.
     * Container unificado `w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] max-w-[1280px] mx-auto px-0`.
   - `src/components/ui/SectionHeader.tsx`:
     * Eyebrow editorial sem badges `text-[0.8rem] font-semibold tracking-[0.04em] text-text-brand uppercase leading-[1.3] mb-3`.
     * Título H2 fluido `text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.045em] text-primary [text-wrap:balance]`.
     * Subtítulo `text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.65] tracking-[-0.01em] text-secondary max-w-[65ch]`.
   - `src/components/ui/PageHeader.tsx`:
     * Container e títulos com escala tipográfica fluida e measure calibrado `max-w-[65ch]`.

3. **Refatoração do Hero da Home (`src/components/sections/Hero.tsx`)**:
   - Container unificado `w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] max-w-[1280px] mx-auto px-0`.
   - Eyebrow técnico editorial limpo sem badge com ícone oficial da marca.
   - H1 Display `text-[clamp(3.25rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-primary mb-6 [text-wrap:balance]` (100% monocromático, sem `<br>`).
   - Parágrafo de proposta de valor `text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.65] tracking-[-0.01em] text-secondary max-w-[58ch] mb-8`.
   - CTA primário com tap target confortável ≥ 44px e padding superior `pt-24 sm:pt-28`.

4. **Refatoração dos Componentes Centrais e Seções**:
   - `src/components/sections/HomeServicesBento.tsx`: H2 fluido, cards com H3 `text-[clamp(1.35rem,2.2vw,2rem)]` e descrições calibradas.
   - `src/components/sections/HomeProcessPipeline.tsx`: Etapas com tipografia e ritmo alinhados.
   - `src/components/sections/HomeResultsStrip.tsx`: Descrições com `max-w-[58ch]`.
   - Páginas de rotas canônicas (`ServicesPage.tsx`, `HowWeWorkPage.tsx`, `ExperiencePage.tsx`, `EngineeringPage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `FAQPage.tsx`).

5. **Sincronização de Testes Unitários e E2E**:
   - Validar testes unitários em `SectionWrapper.test.tsx`, `SectionHeader.test.tsx`, `PageHeader.test.tsx`, `Hero.test.tsx`.
   - Garantir 100% de passagem nos testes Playwright (`npx playwright test`).

6. **Quality Gates & Release**:
   - `npx tsc --noEmit` (0 erros).
   - `npm run lint` (0 erros, 0 warnings).
   - `npm test -- --run` (33 suítes, 201 testes).
   - `npx playwright test` (46 testes).
   - `npm run build` (Chunks < 600KB, 7 rotas pré-renderizadas).
   - Capturar evidências visuais responsivas (1440px e 390px).
   - Elaborar `reviews/QA-096.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit Git em `develop` em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-096-refatoracao-experiencia-tipografica-espacial-editorial.md`.
- [x] Obter aprovação formal do PO.
- [x] Atualizar `tailwind.config.ts` e `src/index.css` com escala tipográfica fluida e container editorial unificado.
- [x] Refatorar `SectionWrapper.tsx` com `py-[clamp(4.5rem,8vw,8rem)]` e container unificado.
- [x] Refatorar `SectionHeader.tsx` e `PageHeader.tsx` com tipografia fluida e eyebrows limpos.
- [x] Refatorar `Hero.tsx` com H1 display fluido `clamp(3.25rem,6vw,5.5rem)`, leading 0.98, tracking -0.055em e measure `58ch`.
- [x] Ajustar componentes da Home (`HomeServicesBento.tsx`, `HomeProcessPipeline.tsx`, `HomeResultsStrip.tsx`).
- [x] Verificar e alinhar páginas de rotas canônicas.
- [x] Sincronizar testes unitários e testes E2E Playwright.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais responsivas em Desktop e Mobile.
- [x] Criar relatório `reviews/QA-096.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-096 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-096-refatoracao-experiencia-tipografica-espacial-editorial.md` (Criado / Aprovado)
- `tasks/TASK-096-refatoracao-experiencia-tipografica-espacial-editorial.md` (Criado / Concluído)
- `tailwind.config.ts` (Modificado)
- `src/index.css` (Modificado)
- `src/components/ui/SectionWrapper.tsx` (Modificado)
- `src/components/ui/SectionHeader.tsx` (Modificado)
- `src/components/ui/PageHeader.tsx` (Modificado)
- `src/components/sections/Hero.tsx` (Modificado)
- `src/components/sections/HomeServicesBento.tsx` (Modificado)
- `src/components/sections/HomeProcessPipeline.tsx` (Modificado)
- `src/components/sections/HomeResultsStrip.tsx` (Modificado)
- `src/components/sections/Services.tsx` (Modificado)
- `src/components/sections/Contact.tsx` (Modificado)
- `src/pages/Home.tsx` (Modificado)
- `src/pages/AboutPage.tsx` (Modificado)
- `src/pages/HowWeWorkPage.tsx` (Modificado)
- `src/pages/ExperiencePage.tsx` (Modificado)
- `src/pages/FAQPage.tsx` (Modificado)
- `src/components/ui/__tests__/SectionHeader.test.tsx` (Modificado)
- `reviews/QA-096.md` (Criado)
- `PROJECT.md` (Modificado)
- `CHANGELOG.md` (Modificado)
