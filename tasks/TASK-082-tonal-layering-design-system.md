# TASK-082 — Sistema de Camadas Tonais (Tonal Layering) para Todas as Rotas e Temas

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-082-tonal-layering-design-system.md`

---

## 1. Escopo da Tarefa

1. **Tokens HSL e Tailwind**:
   - Adicionar os tokens semânticos `--surface-anchor`, `--surface-base`, `--surface-alt` em `src/index.css` para os temas dark e light com $\Delta L \approx 3.5\%$.
   - Mapear os tokens no `tailwind.config.ts` em `backgroundColor` e `colors`.
   - Adicionar regras para `forced-colors: active` e transição de tema suave em `src/index.css`.
2. **Componente Reutilizável de Seção**:
   - Criar `src/components/ui/SectionWrapper.tsx` com tipagem estrita `tone: "anchor" | "base" | "alt"`, padding vertical responsivo consistente (`py-16 sm:py-20 md:py-24 lg:py-28`) e container configurável.
   - Criar testes unitários em `src/components/ui/__tests__/SectionWrapper.test.tsx`.
3. **Componentes Estruturais e Globais**:
   - `src/components/ui/PageHeader.tsx`: remover borda inferior `border-b` e unificar tom com `anchor`.
   - `src/components/layout/Header.tsx`: consumir `surface-anchor` e aplicar borda inferior sutil + blur apenas ao rolar a página.
   - `src/components/sections/Footer.tsx`: consumir `surface-anchor` e remover a linha horizontal divisória superior.
   - `src/components/sections/Hero.tsx`: consumir tom `surface-anchor`.
4. **Refatoração de Todas as Rotas (Eliminação de Linhas e Aplicação de Camadas)**:
   - `src/pages/Home.tsx`: aplicar ritmo `Hero (anchor) -> servicos (base) -> como-trabalhamos (alt) -> autoridade (base) -> Footer (anchor)`. Remover `border-b` de cada seção.
   - `src/pages/ServicesPage.tsx`: aplicar ritmo `PageHeader (anchor) -> Services (base) -> Garantias (alt) -> CTA Final (base) -> Footer (anchor)`.
   - `src/pages/HowWeWorkPage.tsx`: aplicar ritmo `PageHeader (anchor) -> ProcessExplorer (base) -> Manifesto (alt) -> CTA (base) -> Footer (anchor)`.
   - `src/pages/ExperiencePage.tsx`: aplicar ritmo `PageHeader (anchor) -> Metricas (base) -> Verticais Matrix (alt) -> Enterprise Ledger (base) -> CTA (alt) -> Footer (anchor)`.
   - `src/pages/EngineeringPage.tsx`: aplicar ritmo `PageHeader (anchor) -> Filosofia/Gate (base) -> Blueprint Nuvem (alt) -> CTA (base) -> Footer (anchor)`.
   - `src/pages/AboutPage.tsx`: aplicar ritmo `PageHeader (anchor) -> Posicionamento (base) -> Jornada Timeline (alt) -> Principios (base) -> CTA (alt) -> Footer (anchor)`.
   - `src/pages/ContactPage.tsx`: aplicar ritmo `PageHeader (anchor) -> Contato (base) -> FAQ Destaque (alt) -> Footer (anchor)`.
   - `src/pages/FAQPage.tsx`: aplicar ritmo `PageHeader (anchor) -> FAQ Accordion (base) -> Chamada Dúvidas (alt) -> Footer (anchor)`.
   - `src/pages/NotFound.tsx`: aplicar ritmo `Header (anchor) -> Conteúdo 404 (base) -> Footer (anchor)`.
5. **Adaptação dos Cards**:
   - Garantir que cards em seções `base` usem tom `alt` (ou elevado) com bordas sutis, e cards em seções `alt` usem tom `base`.
6. **Testes e Quality Gates**:
   - Atualizar e executar testes unitários (`npm test`).
   - Atualizar testes E2E (`e2e/design-system-and-stability.spec.ts`) validando a ausência de linhas divisórias entre seções, equivalência cromática Hero == Footer e alternância estrita de tons.
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Playwright e Build (`npm run build`).
7. **Documentação e Finalização**:
   - Preencher `reviews/QA-082.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Commit Git com mensagem em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Definir tokens HSL de superfície em `src/index.css` e mapear em `tailwind.config.ts`.
- [x] Criar `src/components/ui/SectionWrapper.tsx` e seus testes unitários.
- [x] Atualizar `src/components/ui/PageHeader.tsx`, `Header.tsx`, `Footer.tsx` e `Hero.tsx`.
- [x] Refatorar todas as 9 páginas aplicando `SectionWrapper` com tons estritos e removendo divisores horizontais.
- [x] Verificar adaptação de contraste de cards em todas as faixas.
- [x] Executar Quality Gates:
  - [x] TypeScript (`npx tsc --noEmit` - 0 erros)
  - [x] ESLint (`npm run lint` - 0 erros, 0 warnings)
  - [x] Vitest (`npm test -- --run` - todas as suítes passando, cobertura $\ge 90\%$)
  - [x] Playwright E2E (`npx playwright test` - 14 testes aprovados)
  - [x] Build de produção (`npm run build` - 0 warnings > 600KB, prerender OK)
- [x] Criar relatório `reviews/QA-082.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit em português (pt-BR) no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-082-tonal-layering-design-system.md` (Criado / Aprovado)
- `tasks/TASK-082-tonal-layering-design-system.md` (Criado)
- `src/index.css` (Modificar)
- `tailwind.config.ts` (Modificar)
- `src/components/ui/SectionWrapper.tsx` (Criar)
- `src/components/ui/__tests__/SectionWrapper.test.tsx` (Criar)
- `src/components/ui/PageHeader.tsx` (Modificar)
- `src/components/layout/Header.tsx` (Modificar)
- `src/components/sections/Footer.tsx` (Modificar)
- `src/components/sections/Hero.tsx` (Modificar)
- `src/pages/Home.tsx` (Modificar)
- `src/pages/ServicesPage.tsx` (Modificar)
- `src/pages/HowWeWorkPage.tsx` (Modificar)
- `src/pages/ExperiencePage.tsx` (Modificar)
- `src/pages/EngineeringPage.tsx` (Modificar)
- `src/pages/AboutPage.tsx` (Modificar)
- `src/pages/ContactPage.tsx` (Modificar)
- `src/pages/FAQPage.tsx` (Modificar)
- `src/pages/NotFound.tsx` (Modificar)
- `e2e/design-system-and-stability.spec.ts` (Modificar / Estender)
- `reviews/QA-082.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
