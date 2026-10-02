# SPEC-078 — Curadoria de Tecnologias e Refinamento Visual Tipográfico na Rota /engenharia

- **Status:** APROVADO (por Elessandro Prestes Macedo)
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo
- **Branch:** `develop`

---

## 1. Contexto e Motivação

Na rota `/engenharia`, a seção de tecnologias foi recentemente estruturada em 4 camadas arquiteturais (`ArchitecturalBlueprint.tsx`). No entanto, o catálogo de tecnologias continha ferramentas secundárias/operacionais (bancos de dados isolados, ferramentas de observabilidade, bibliotecas de estilo como Tailwind e múltiplos frameworks de mensageria) que dispersavam o foco nas reais especialidades centrais de desenvolvimento da software house.

Além disso, a referência visual compartilhada pelo PO (`Captura de tela de 2026-10-02 06-56-43.png`) estabelece uma nova direção estética e temática:
1. **Foco em Especialidades Centrais de Engenharia**: Linguagens e frameworks modernos de desenvolvimento web, mobile, APIs, nuvem e programação assistida por IA.
2. **Tratamento Tipográfico Editorial de Alto Impacto**: Nomes de tecnologias com peso tipográfico marcante, badges de autoridade (ex.: `[Certificado]`, `[Core Runtime]`), realce temático especial (como *Programação com IA*) e logos oficiais integrados de forma limpa.
3. **Curadoria Estrita do Stack**: Remoção de bancos de dados genéricos, observabilidade, Tailwind, mensagerias pontuais (RabbitMQ, Kafka, Redis) e manutenção estrita de **AWS e Azure** na Camada de Nuvem (Layer 04).

---

## 2. Escopo da Mudança

### 2.1. Curadoria do Stack de Tecnologias

#### A. Tecnologias Adicionadas:
- **Next.js** (adicionado na Camada de Apresentação & Web)
- **JavaScript** (ecossistema web/Node)
- **Python** (back-end moderno, data engineering e IA)
- **Go** (microserviços e alta performance)
- **React Native** (desenvolvimento mobile multiplataforma)
- **Android** (desenvolvimento mobile nativo)
- **Swift** (desenvolvimento iOS nativo)
- **Ruby on Rails** (desenvolvimento back-end de alta produtividade)
- **Programação com IA** (engenharia de prompts, agentes e workflows assistidos por IA)

#### B. Tecnologias Removidas (conforme solicitado expressamente):
- **Bancos de Dados**: PostgreSQL, MySQL, Oracle, MongoDB
- **Observabilidade**: Prometheus, Grafana, SonarQube
- **Estilização**: Tailwind CSS
- **Frameworks Legados/Dispensados**: Laravel, Symfony
- **Mensageria**: RabbitMQ, Kafka, Redis
- **Infraestrutura Secundária da Layer 4**: Docker, Kubernetes, Terraform, GitHub Actions (Layer 04 restrita exclusivamente a **AWS e Azure**)

### 2.2. Reorganização Estrutural das 4 Camadas (Architectural Layers)

1. **`LAYER 01 // WEB & INTERFACES REATIVAS`**
   - **Status:** `CLIENT RUNTIME & SSR`
   - **Tecnologias:** React, Next.js, TypeScript, JavaScript, Vue.js, Angular.
   - **Foco:** Aplicações web modernas, Server-Side Rendering, tipagem estática e interfaces reativas de alta fidelidade.

2. **`LAYER 02 // BACK-END, APIS & LINGUAGENS`**
   - **Status:** `SERVICE RUNTIME & HIGH CONCURRENCY`
   - **Tecnologias:** Node.js (com badge `[CORE RUNTIME]`), Python, Go, PHP, Ruby on Rails.
   - **Foco:** Microsserviços escaláveis, APIs de baixa latência, regras de negócio robustas e alta taxa de requisições por segundo.

3. **`LAYER 03 // MOBILE & ENGENHARIA DE IA`**
   - **Status:** `NATIVE APPS & INTELLIGENCE`
   - **Tecnologias:** React Native, Android, Swift, Programação com IA (com badge de destaque `[INOWAÇÃO / AGENTS]`).
   - **Foco:** Ecossistema mobile nativo e híbrido combinado com aceleração e desenvolvimento assistido por inteligência artificial generativa.

4. **`LAYER 04 // CLOUD & INFRAESTRUTURA ESCALÁVEL`**
   - **Status:** `ENTERPRISE CLOUD`
   - **Tecnologias (estritamente):** AWS (com badge `[CERTIFICADO]`), Azure.
   - **Foco:** Provedores de nuvem líderes globais para hospedagem de missão crítica, computação elástica e arquitetura serverless.

---

## 3. Diretrizes de Design e UX (Inspiração Visual da Referência)

1. **Tipografia Técnica Confiante e Destacada**:
   - Em vez de pílulas pequenas com visual cinzento fechado, cada tecnologia é renderizada com tipografia de destaque (`text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-brand transition-colors`), acompanhada de seu ícone oficial colorido/monocromático de alta nitidez (22px a 24px).
2. **Badges de Autoridade e Distinção**:
   - **AWS**: Badge `[CERTIFICADO]` em tom dourado/âmbar elegante (`bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded`), ecoando diretamente a referência visual.
   - **Node.js**: Badge `[CORE]` ou `[RUNTIME]` em esmeralda/verde.
   - **Programação com IA**: Tratamento tipográfico com gradiente de luz sutil ou destaque visual em âmbar/dourado (`text-amber-300 dark:text-amber-200`) e ícone Sparkles/Brain.
3. **Preservação dos Tooltips Arquiteturais**:
   - Cada tecnologia preserva seu Radix Tooltip acessível explicando o propósito técnico específico daquela escolha na arquitetura da EPM DevTech.
4. **Acabamento do Slot/Rack**:
   - Manutenção das linhas limpas de rack/slot (`border border-border-default/70 bg-surface-base/80 rounded-2xl p-6 md:p-8 hover:border-brand/40 transition-colors`), sem caixas repetitivas aninhadas.

---

## 4. Impacto em Testes e Quality Gates

- Atualização de `src/config/architecture.ts` com a nova lista curada de tecnologias e dados tipados (`ARCHITECTURAL_LAYERS`).
- Atualização da suíte de testes unitários `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` para validar os novos nomes (Next.js, Python, Go, AWS, Azure, Programação com IA) e a ausência dos termos removidos (PostgreSQL, Kafka, Tailwind, etc.).
- Verificação e ajuste de testes E2E do Playwright (`e2e/design-system-and-stability.spec.ts`) para garantir 100% de aprovação.
- Execução de todos os Quality Gates: TypeScript, ESLint, Vitest, Playwright e Build de produção.

---

## 5. Critérios de Aceite

1. [ ] `src/config/architecture.ts` contém exatamente as 4 camadas reorganizadas com a lista curada de tecnologias.
2. [ ] Next.js incluído na Layer 01.
3. [ ] Bancos de dados, observabilidade, Tailwind, Laravel, Symfony, RabbitMQ, Kafka e Redis totalmente removidos.
4. [ ] Layer 04 possui **apenas AWS e Azure**, com AWS exibindo a badge `[CERTIFICADO]`.
5. [ ] Programação com IA presente com destaque visual diferenciado.
6. [ ] Tooltips de propósito arquitetural preservados em todas as tecnologias.
7. [ ] Quality Gates 100% aprovados (zero erros TypeScript/ESLint, 100% testes unitários e E2E passando, build < 600KB).
