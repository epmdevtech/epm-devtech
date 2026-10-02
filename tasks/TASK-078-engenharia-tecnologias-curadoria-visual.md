# TASK-078 — Curadoria de Tecnologias e Refinamento Visual Tipográfico na Rota /engenharia

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-078-engenharia-tecnologias-curadoria-visual.md`

---

## 1. Escopo da Tarefa

Refatorar a seção de tecnologias da rota `/engenharia` realizando a curadoria do stack e refinando o tratamento visual tipográfico inspirado na referência visual:
1. **Curadoria do Stack (`src/config/architecture.ts`)**:
   - Adicionar: Next.js, JavaScript, Python, Go, Ruby on Rails, React Native, Android, Swift, Programação com IA.
   - Remover: Bancos de dados (PostgreSQL, MySQL, Oracle, MongoDB), observabilidade (Prometheus, Grafana, SonarQube), Tailwind CSS, Laravel, Symfony, RabbitMQ, Kafka, Redis, Docker, Kubernetes, Terraform, GitHub Actions.
   - Layer 04 restrita estritamente a **AWS e Azure**.
2. **Reorganização das 4 Camadas**:
   - `LAYER 01 // WEB & INTERFACES REATIVAS`: React, Next.js, TypeScript, JavaScript, Vue.js, Angular.
   - `LAYER 02 // BACK-END, APIS & LINGUAGENS`: Node.js, Python, Go, PHP, Ruby on Rails.
   - `LAYER 03 // MOBILE & ENGENHARIA DE IA`: React Native, Android, Swift, Programação com IA.
   - `LAYER 04 // CLOUD & INFRAESTRUTURA ESCALÁVEL`: AWS, Azure.
3. **Refinamento Tipográfico Editorial (`src/components/sections/ArchitecturalBlueprint.tsx`)**:
   - Tipografia forte e arrojada (`text-lg md:text-xl font-bold tracking-tight`).
   - Badges de autoridade integradas: AWS com badge `[CERTIFICADO]` dourada/âmbar, Node.js com `[CORE RUNTIME]`, Programação com IA com realce especial.
   - Manutenção de tooltips acessíveis Radix UI com o propósito arquitetural.
4. **Validação e Quality Gates**:
   - Testes unitários atualizados.
   - Testes E2E Playwright sem regressão.
   - Verificação visual por screenshot.
   - Docs e release.

### Itens de Trabalho:
- [x] Atualizar `src/config/architecture.ts` com as novas tecnologias e metadados de badge/destaque.
- [x] Refatorar `src/components/sections/ArchitecturalBlueprint.tsx` com o tratamento visual tipográfico.
- [x] Atualizar suíte de testes `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx`.
- [x] Executar Quality Gates:
  - [x] TypeScript (`npx tsc --noEmit`)
  - [x] ESLint (`npm run lint`)
  - [x] Vitest (`npm test -- --run`)
  - [x] Playwright (`npx playwright test`)
  - [x] Build (`npm run build`)
- [x] Validar visualmente com screenshot Playwright.
- [x] Preencher `reviews/QA-078.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-078-engenharia-tecnologias-curadoria-visual.md` (Criado / Aprovado)
- `tasks/TASK-078-engenharia-tecnologias-curadoria-visual.md` (Criado)
- `src/config/architecture.ts` (Modificar)
- `src/components/sections/ArchitecturalBlueprint.tsx` (Modificar)
- `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` (Modificar)
- `reviews/QA-078.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
