# SPEC-075 — Redesign da Rota /experiencia (Engineering Matrix & Enterprise Ledger)

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Diagnóstico

A rota `/experiencia` ("Experiência em projetos reais") é responsável por consolidar a autoridade técnica da EPM DevTech através de métricas de escala, atuação em verticais críticas e projetos profissionais de grande porte.

Atualmente, a tela apresenta:
1. **Preservação de Métricas**: Os números de impacto (99,9% uptime, 2.500 RPS, 100% integridade, -35% atividades manuais) possuem contadores animados com `CountUp` que devem ser **estritamente preservados**.
2. **Excesso de "caixas dentro de caixas" nas verticais**: A seção de setores replica cards 3D com sub-blocos e mini-barras estilizadas que lembram templates genéricos gerados por IA.
3. **Cards fechados de organizações com ícones genéricos**: As entidades de grande escala (CAPES, ONS, Energia Pecém) estão dispostas em cards retangulares fechados com ícones convencionais de prédios (`Building2`).
4. **Nota de contexto em alerta solto**: A nota ética obrigatória ("Não são clientes da EPM DevTech") é apresentada como um alerta isolado em caixa retangular escura.

### Objetivo
Refatorar a rota `/experiencia` para um padrão de **Enterprise Ledger & Engineering Matrix**, preservando 100% da lógica e animação dos contadores numéricos, transformando os setores em uma matriz 2x2 com bordas internas limpas e as organizações atendidas em um ledger corporativo contínuo com hover suave e nota de contexto editorial inline.

---

## 2. Decisões de Design e UI/UX

### 2.1. Métricas de Escala (Preservação Estrita dos Contadores)
- Manter o componente `<Authority />` (ou faixa equivalente com os mesmos dados, `CountUp` e triggers de viewport).
- Faixa limpa e horizontal, sem cards fechados, com separadores verticais sutis (`divide-x divide-border-subtle`).
- Métricas preservadas:
  - `99,9%`: Disponibilidade assegurada em plataformas críticas de energia e educação.
  - `2.500 RPS`: Arquitetura dimensionada para picos de 10.000 usuários simultâneos.
  - `100%`: De integridade dos dados na consolidação regulatória do setor elétrico, sem perda.
  - `-35%`: De atividades manuais, com automações e integrações em plataforma modernizada.

### 2.2. Engineering Matrix: Contextos de Negócio / Verticais
- Eliminar o componente de cards 3D isolados com mockups simulados.
- Criar a **Engineering Matrix** (Grid 2x2 com bordas internas limpas, estilo editorial de alto padrão):
  - Container principal: `grid grid-cols-1 md:grid-cols-2 border border-border-default/80 rounded-2xl overflow-hidden bg-surface/40 dark:bg-zinc-950/40 divide-y md:divide-y-0 divide-border-default/80 md:[&>*:nth-child(even)]:border-l md:[&>*:nth-child(even)]:border-border-default/80 md:[&>*:nth-child(n+3)]:border-t md:[&>*:nth-child(n+3)]:border-border-default/80`.
  - Padding generoso em cada quadrante: `p-7 sm:p-9 md:p-10`.
  - Estrutura de cada quadrante:
    1. **Cabeçalho**:
       - Número monospace discreto (`01 //`, `02 //`, `03 //`, `04 //`) em `font-mono text-xs font-semibold text-text-brand`.
       - Nome do setor (`Indústria`, `Varejo`, `Educação`, `Energia`) em `text-xl sm:text-2xl font-bold tracking-tight text-primary`.
       - Badge de Especialidade Técnica:
         - Indústria: `IoT INDUSTRIAL`
         - Varejo: `ALTA CONCORRÊNCIA`
         - Educação: `ESCALA NACIONAL`
         - Energia: `DADOS REGULATÓRIOS`
       - Ícone autoral conceitual correspondente (`IconSectorIndustry`, `IconSectorRetail`, `IconSectorEducation`, `IconSectorEnergy`).
    2. **Descrição do Problema & Contexto**:
       - Parágrafo técnico detalhando os gargalos superados e o impacto na operação.
    3. **Capacidades Técnicas (Stack & Soluções)**:
       - Lista técnica inline em `font-mono text-xs text-secondary leading-relaxed pt-4 border-t border-border-default/50`:
         - Indústria: `Stack & Soluções: ERP Integrations · Telemetria em tempo real · Conexão de CLPs e Sensores · Mensageria Industrial`
         - Varejo: `Stack & Soluções: APIs de Alto Throughput · Checkout Resiliente · Sincronização de Inventário · Caching Distribuído`
         - Educação: `Stack & Soluções: Arquitetura Multi-Tenant · Decomposição de Monólitos · Alta Disponibilidade · Processamento em Lote`
         - Energia: `Stack & Soluções: Consolidação Regulatória · Telemetria Sub-segundo · Logs Imutáveis · Dashboards Operacionais`

### 2.3. Enterprise Ledger: Organizações e Projetos de Atuação
- **Nota de Contexto Editorial**:
  - Eliminar o retângulo de alerta escuro fechado.
  - Alocar logo abaixo do título H2 da seção uma linha editorial discreta:
    `flex items-center gap-2 mt-2 text-xs font-mono text-muted-foreground uppercase tracking-wider`:
    - Ponto luminoso indicador em verde-água: `w-1.5 h-1.5 rounded-full bg-brand shrink-0`.
    - Texto exato: `"Nota de contexto: Organizações em que a liderança atuou em outras empresas. Não são clientes da EPM DevTech."`
    - Preserva rigorosamente as palavras-chave exigidas pelos testes E2E e unitários.
- **Linhas do Enterprise Ledger**:
  - Eliminar os 3 cards fechados com ícones de prédios.
  - Implementar uma tabela/ledger horizontal com linhas limpas (`divide-y divide-border-default/80 border-y border-border-default/80`):
    - Cada linha (`approvedExperiences.map`):
      - Desktop (`grid grid-cols-12 items-center py-5 sm:py-6 px-4 sm:px-6 hover:bg-surface-elevated/40 dark:hover:bg-zinc-900/30 transition-colors duration-200`):
        1. **Organização** (`col-span-12 md:col-span-3`): Nome em destaque (`CAPES`, `ONS`, `Energia Pecém`) em `text-primary font-bold text-lg sm:text-xl tracking-tight`.
        2. **Setor** (`col-span-12 md:col-span-3`): Badge discreto em ciano/esmeralda (`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-brand/10 text-text-brand border border-brand/20`).
        3. **Escopo Técnico** (`col-span-12 md:col-span-4`): Resumo técnico do contexto em `text-xs sm:text-sm text-secondary leading-relaxed`.
        4. **Via de Atuação** (`col-span-12 md:col-span-2 text-left md:text-right`): Tipografia monospace discreta (`font-mono text-xs text-muted-foreground`).
    - Mobile: Transição fluida para layout vertical empilhado, mantendo excelente legibilidade e sem overflow.

### 2.4. Fechamento Comercial & CTA de Contato
- Banner de fechamento refinado e integrado:
  - Título: *"Sua empresa tem uma demanda de alta complexidade?"*
  - Subtítulo: *"Conversamos diretamente sobre requisitos de arquitetura, estabilidade e capacidade de evolução."*
  - Botão Primário: `"Falar sobre meu projeto"` direcionando para `/contato` (`bg-brand text-on-brand hover:bg-brand-hover min-h-[44px] px-8 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-glow-brand`).

---

## 3. Critérios de Aceite e Quality Gates

- [ ] Os contadores animados numéricos (99,9%, 2.500 RPS, 100%, -35%) funcionam perfeitamente e disparam ao entrar no viewport.
- [ ] A seção de verticais é apresentada como a "Engineering Matrix" (Grid 2x2 com bordas internas limpas e listas inline de Stack & Soluções).
- [ ] As organizações atendidas são apresentadas no formato "Enterprise Ledger" com linhas horizontais e efeito hover sutil.
- [ ] A "Nota de contexto" é exibida em tipografia editorial monospace com ponto indicador discreto e declara expressamente *"Não são clientes da EPM DevTech"*.
- [ ] Nomes de organizações (`CAPES`, `ONS`, `Energia Pecém`) e seus setores são renderizados com dados do arquivo canônico `getApprovedExperiences()`.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] `npx tsc --noEmit` passa com 0 erros.
- [ ] `npm run lint` passa com 0 erros.
- [ ] `npm test -- --run` passa com 100% de aprovação.
- [ ] `npx playwright test` passa com 100% de aprovação (inclusive o teste 43 de aviso ético).
- [ ] `npm run build` passa com sucesso.

---

## 4. Plano de Implementação

1. **Fase 1 — Aprovação**: Obter aprovação formal do PO (`aprovo`).
2. **Fase 2 — TASK criada**: Criar `tasks/TASK-075-experiencia-enterprise-ledger.md`.
3. **Fase 3 — Refatoração da Página**: Atualizar `src/pages/ExperiencePage.tsx` com a Engineering Matrix e o Enterprise Ledger.
4. **Fase 4 — Testes**: Atualizar `src/pages/__tests__/pages.test.tsx` e validar compatibilidade.
5. **Fase 5 — Quality Gates**: Executar `tsc`, `lint`, `vitest`, `playwright` e `build`.
6. **Fase 6 — Documentação & Commit**: Criar `reviews/QA-075.md`, atualizar `PROJECT.md` e `CHANGELOG.md`, realizar commit no git.
