# TASK-077 — Redesign da Rota /engenharia (Architectural Blueprint & CI/CD Quality Gate)

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-077-engenharia-architectural-blueprint.md`

---

## 1. Escopo da Tarefa

Refatorar a rota `/engenharia` substituindo o grafo disperso de ícones e os cards repetitivos por:
1. **Layout Dividido de Engenharia**:
   - Coluna 1: Lista editorial de 3 princípios de engenharia com numeração técnica e destaque lateral verde.
   - Coluna 2: Terminal simulado de Quality Gate contínuo (CI/CD Quality Gate) com checks de homologação.
2. **Matriz de Camadas de Software (Architectural Blueprint)**:
   - 4 slots/racks horizontais de arquitetura cobrindo as 24 tecnologias em 4 camadas estruturadas:
     - Camada 01: Apresentação & Edge (React, TypeScript, Vue.js, Tailwind CSS, Angular)
     - Camada 02: Aplicação, Microsserviços & APIs (Node.js, PHP, Laravel, Symfony)
     - Camada 03: Mensageria, Eventos & Cache (RabbitMQ, Kafka, Redis)
     - Camada 04: Nuvem, Dados & Observabilidade (PostgreSQL, MySQL, Oracle, MongoDB, AWS, Azure, Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, Grafana, SonarQube)
   - Micro-interações de hover com exibição contextual de função arquitetural de cada tecnologia.

### Itens de Trabalho:
- [x] Criar `src/components/sections/ArchitecturalBlueprint.tsx` com as 4 camadas horizontais e micro-interação contextual.
- [x] Refatorar `src/pages/EngineeringPage.tsx` integrando o novo Layout Dividido (Princípios vs. Terminal CI/CD) e o `<ArchitecturalBlueprint />`.
- [x] Criar suíte de testes unitários `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx`.
- [x] Atualizar testes em `src/pages/__tests__/pages.test.tsx`.
- [x] Executar Quality Gates:
  - [x] TypeScript (`npx tsc --noEmit`)
  - [x] ESLint (`npm run lint`)
  - [x] Vitest (`npm test -- --run`)
  - [x] Playwright (`npx playwright test`)
  - [x] Build (`npm run build`)
- [x] Validar visualmente com screenshot Playwright.
- [x] Preencher `reviews/QA-077.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-077-engenharia-architectural-blueprint.md` (Criado / Aprovado)
- `tasks/TASK-077-engenharia-architectural-blueprint.md` (Criado)
- `src/components/sections/ArchitecturalBlueprint.tsx` (Criar)
- `src/pages/EngineeringPage.tsx` (Modificar)
- `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` (Criar)
- `src/pages/__tests__/pages.test.tsx` (Modificar)
- `reviews/QA-077.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
