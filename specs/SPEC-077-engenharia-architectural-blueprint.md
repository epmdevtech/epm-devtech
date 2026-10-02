# SPEC-077 — Redesign da Rota /engenharia (Architectural Blueprint & CI/CD Quality Gate)

- **Status:** Aprovada pelo PO
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Diagnóstico

A rota `/engenharia` ("Engenharia pensada para evoluir") apresenta atualmente:
1. **Grafo/Constelação disperso de ícones (`Technologies.tsx`)**: nós flutuantes calculados por centróides sem ordenação hierárquica clara de arquitetura corporativa, dificultando a leitura rápida e a compreensão estrutural da stack.
2. **Cards repetitivos e badges soltas (`Differentials.tsx`)**: 3 cards fechados de diferenciais seguidos de chips amontoados em bloco escuro, gerando monotonia visual e aspecto de template genérico.

### Objetivo
Refatorar a rota `/engenharia` aplicando os padrões visuais de **Architectural Blueprint & CI/CD Quality Gate** inspirados em referências técnicas de infraestrutura (Cloudflare, Vercel, HashiCorp), eliminando o grafo disperso em favor de uma **Matriz de Camadas de Software (Stack Layers)** e substituindo os cards soltos por um **layout dividido (Filosofia de Execução vs. Painel de Qualidade Contínua simulado)**.

---

## 2. Decisões Técnicas e de Design

### 2.1. Seção 1: Filosofia de Execução vs. Painel de Qualidade Contínua (CI/CD Quality Gate)
- Estrutura em grid de 2 colunas amplas (`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-12 sm:py-16`):
  - **Coluna da Esquerda (6 colunas - Filosofia de Execução)**:
    - Eyebrow técnico: `// FILOSOFIA DE EXECUÇÃO` em `font-mono text-xs font-semibold text-text-brand`.
    - Título `H2`: "Princípios que orientam nossas decisões de código" com subtítulo explicativo.
    - Lista editorial aberta com os 3 princípios essenciais:
      - `01 // Comunicação transparente`: Alinhamento contínuo sobre escopo, decisões técnicas e prioridades com quem planeja e executa.
      - `02 // Engenharia que facilita evoluir`: Arquitetura modular e código desacoplado para evolução sustentável sem acúmulo de débito técnico.
      - `03 // Foco no problema do negócio`: Pragmatismo arquitetural centrado no retorno real e na estabilidade operacional da empresa.
      - Cada item conta com número monospace, título com traço lateral verde (`border-l-2 border-brand pl-3`) e parágrafo em `text-secondary text-sm sm:text-base`.
  - **Coluna da Direita (6 colunas - Evidência de Engenharia / Pipeline de Qualidade)**:
    - Eyebrow técnico: `// PIPELINE DE QUALIDADE`.
    - Janela técnica em estilo terminal (`bg-surface/80 dark:bg-zinc-950/80 border border-border-default/80 rounded-xl p-5 sm:p-6 shadow-2xl font-mono text-xs`):
      - Header do terminal com window controls (círculos vermelho, amarelo e verde) e título `ci-cd-quality-gate.yml -- EPM DevTech Pipeline`.
      - Checklist de quality gates com ícones verdes de validação:
        - `✓ Unit & Integration Tests: PASS (100% coverage)`
        - `✓ Strict Static Analysis: PHPStan & ESLint Clean (0 errors)`
        - `✓ Automated Deploy: Staging & Homologation Pipeline Ready`
        - `✓ Human Code Review: Senior Validation & Security Audit`
        - `✓ Continuous Monitoring: Prometheus & OpenTelemetry Active`
      - Status final do pipeline: `PIPELINE STATUS: SUCCESS (0 errors, 0 warnings)` em badge luminosa verde-água.

### 2.2. Seção 2: Matriz de Camadas de Software (Stack Layers Blueprint)
- Substituir o grafo disperso por um Blueprint em 4 Camadas Horizontais estruturadas como slots/racks de engenharia:
  1. **Camada 01: Apresentação & Edge**
     - Tag: `[LAYER 01 // INTERFACE & EDGE]`
     - Indicador: `● CLIENT RUNTIME`
     - Descrição: "Interfaces reativas, Server-Side Rendering e orquestração de edge para alta performance de carregamento."
     - Tecnologias: React, TypeScript, Vue.js, Tailwind CSS, Angular.
  2. **Camada 02: Aplicação, Microsserviços & APIs**
     - Tag: `[LAYER 02 // APLICAÇÃO & APIS]`
     - Indicador: `● SERVICE RUNTIME`
     - Descrição: "Serviços resilientes, APIs RESTful/GraphQL e regras de negócio estruturadas com tipagem e arquitetura limpa."
     - Tecnologias: Node.js, PHP, Laravel, Symfony.
  3. **Camada 03: Mensageria, Eventos & Cache**
     - Tag: `[LAYER 03 // MENSAGERIA & DADOS]`
     - Indicador: `● ASYNC DECOUPLING`
     - Descrição: "Desacoplamento assíncrono, processamento em segundo plano, cache distribuído e streaming de eventos."
     - Tecnologias: RabbitMQ, Kafka, Redis.
  4. **Camada 04: Nuvem, Dados & Observabilidade**
     - Tag: `[LAYER 04 // NUVEM & OBSERVABILIDADE]`
     - Indicador: `● INFRAESTRUTURA RESILIENTE`
     - Descrição: "Bancos relacionais e NoSQL, orquestração de containers, infraestrutura como código e telemetria contínua."
     - Tecnologias: PostgreSQL, MySQL, Oracle, MongoDB, AWS, Azure, Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, Grafana, SonarQube.
- **Design de Cada Slot de Camada**:
  - Container: `border border-border-default/80 bg-surface/40 dark:bg-zinc-950/60 rounded-xl p-5 sm:p-6 hover:border-brand/40 transition-all duration-200`.
  - Badges das Tecnologias: logo oficial (SVG/Devicon) ou ícone semântico, nome em fonte mono (`font-mono text-xs`), hover com iluminação verde sutil.
  - Micro-interações: exibição de tooltip ou badge contextual explicativa do papel arquitetural de cada tecnologia ao receber hover/foco.

### 2.3. Seção 3: Chamada Final para Ação (CTA)
- Manter chamada de fechamento comercial direcionando para `/contato`.

### 2.4. Preservação da Home (`Index.tsx`)
- O componente `Technologies.tsx` e `Differentials.tsx` continuam existindo sem quebras para atender à Home (`/`) e aos testes legados já validados.
- O novo componente modular `ArchitecturalBlueprint.tsx` será dedicado a compor a rota `/engenharia`.

---

## 3. Arquivos Envolvidos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-077-engenharia-architectural-blueprint.md` | Criar | Especificação técnica |
| `tasks/TASK-077-engenharia-architectural-blueprint.md` | Criar | Tarefa de execução SDD |
| `src/components/sections/ArchitecturalBlueprint.tsx` | Criar | Componente Blueprint das 4 camadas de software |
| `src/pages/EngineeringPage.tsx` | Modificar | Integração do novo layout dividido e do Blueprint |
| `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` | Criar | Testes unitários do Blueprint e suas 4 camadas |
| `src/pages/__tests__/pages.test.tsx` | Modificar | Atualização dos testes da rota `/engenharia` |
| `reviews/QA-077.md` | Criar | Relatório de validação dos quality gates |
| `PROJECT.md` / `CHANGELOG.md` | Atualizar | Registro no log canônico |

---

## 4. Critérios de Aceite

- [ ] A rota `/engenharia` renderiza o layout dividido (Filosofia de Execução à esquerda, Painel CI/CD à direita).
- [ ] A seção de tecnologias renderiza as 4 camadas de arquitetura horizontais (Interface, Aplicação, Mensageria, Nuvem/Dados).
- [ ] Todas as 24 tecnologias do ecossistema EPM DevTech são representadas com seus ícones oficiais e descrições contextuais.
- [ ] Responsividade testada em 320px, 390px, 768px, 1024px e 1440px sem overflow.
- [ ] Modos Dark e Light perfeitamente contrastados com tokens semânticos.
- [ ] TypeScript compila com zero erros (`npx tsc --noEmit`).
- [ ] ESLint passa com zero erros e warnings (`npm run lint`).
- [ ] Vitest com 100% de testes passando (`npm test -- --run`).
- [ ] Playwright E2E com todos os testes passando (`npx playwright test`).
- [ ] Build de produção conclui sem warnings (`npm run build`).
