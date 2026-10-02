# SPEC-074 — Refatoração da Rota /como-trabalhamos (Process Explorer & Manifesto Técnico)

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Diagnóstico

A rota interna `/como-trabalhamos` (`src/pages/HowWeWorkPage.tsx`) atualmente replica o componente `HowWeWork.tsx` da página inicial (que exibe 4 cards simétricos sequenciais), seguido por 2 cards soltos no rodapé ("Previsibilidade contratual e técnica" e "Comunicação direta sem ruídos").

Esse formato gera:
1. **Sensação de template repetitivo**: A página interna repete o mesmo padrão de cards já visto na Home, sem aprofundamento técnico.
2. **Caixas genéricas soltas**: Os 2 blocos de garantias ao final usam contornos retangulares isolados, enfraquecendo a narrativa de engenharia.
3. **Falta de interatividade e profundidade**: Os passos 01 a 04 apenas exibem uma linha de descrição genérica, sem detalhar entregáveis concretos ou critérios de validação.

### Objetivo
Refatorar a rota `/como-trabalhamos` implementando um **Process Explorer / Stepper Interativo de 2 Colunas** (desktop) e **Accordion Vertical** (mobile), com painel técnico de entregáveis e critérios de saída por etapa, além de reestruturar as garantias em um **Manifesto Técnico de Engenharia** e um **CTA compacto de contato**.

---

## 2. Decisões de Design e UI/UX

### 2.1. Painel Interativo de Duas Colunas — Process Explorer (Desktop `md:`)
Em telas médias e grandes (`md:` para cima), a seção principal de etapas funcionará como um Process Explorer em 2 colunas:

- **Coluna da Esquerda (Lista de Navegação das Etapas — `md:col-span-4 lg:col-span-4`)**:
  - Lista vertical limpa com `role="tablist"` e navegação acessível por teclado (ou tabs semânticas).
  - Cada etapa exibe:
    - Número monospace (`01`, `02`, `03`, `04`) em destaque técnico.
    - Título da etapa (`Entendemos`, `Definimos`, `Desenvolvemos`, `Evoluímos`).
    - Handle / subtítulo monospace uppercase (`DIAGNÓSTICO & CONTEXTO`, etc.).
  - **Estado Ativo**: Borda lateral esquerda esmeralda (`border-l-2 border-brand`), fundo sutilmente iluminado (`bg-surface-elevated/60 dark:bg-zinc-900/60`), texto em alto contraste (`text-primary`).
  - **Estado Inativo**: Borda transparente (`border-l-2 border-transparent`), texto em tom secundário (`text-secondary hover:text-primary hover:bg-surface/40 dark:hover:bg-zinc-900/30`), transições suaves.

- **Coluna da Direita (Painel de Detalhamento Técnico — `md:col-span-8 lg:col-span-8`)**:
  - Container escuro refinado: `rounded-xl border border-border-default/80 bg-surface/80 dark:bg-zinc-950/70 p-6 sm:p-8 min-h-[380px] shadow-xl backdrop-blur-sm`.
  - Conteúdo da etapa selecionada com animação suave de transição (`AnimatePresence` + Framer Motion, respeitando `useReducedMotion()`):
    1. **Cabeçalho da Etapa**:
       - Micro-tag técnica: `[ ETAPA ${step} ]` em `font-mono text-xs font-semibold text-text-brand`.
       - Título e subtítulo com ícone autoral correspondente (`IconProcessUnderstand`, `IconProcessDefine`, `IconProcessDevelop`, `IconProcessEvolve`).
    2. **Resumo Executivo**:
       - Parágrafo descritivo claro sobre o que ocorre tecnicamente e operacionalmente na fase.
    3. **Entregáveis Concretos**:
       - Título de seção: `// ENTREGÁVEIS CONCRETOS` em fonte monospace.
       - Grade de tags técnicas com acabamento sutil:
         - **01 Entendemos**: *Matriz de Riscos*, *Diagrama C4 Inicial*, *Estimativa de Custo de Nuvem*, *Documento de Visão de Produto*.
         - **02 Definimos**: *Especificações Técnicas (SPECs)*, *Contratos de API (OpenAPI)*, *Backlog Técnico Priorizado*, *Cronograma de Sprints*.
         - **03 Desenvolvemos**: *Código com Cobertura de Testes (≥90%)*, *Pipeline CI/CD Automatizado*, *Builds Incrementais Homologados*, *Documentação Viva de Código*.
         - **04 Evoluímos**: *Dashboards de Telemetria e Logs*, *Métricas de Performance e SLAs*, *Plano de Sustentação Contínua*, *Guia de Repasse e Transferência de Conhecimento*.
    4. **Critério de Saída (Exit Criteria / Validação com Cliente)**:
       - Bloco destacado na base do painel com borda lateral ou micro-card integrado:
         - **01 Entendemos**: *"Critério de Saída: Aprovação formal do alinhamento técnico e arquitetural antes do início da codificação."*
         - **02 Definimos**: *"Critério de Saída: Arquitetura e escopo validados com definição clara de prazos e marcos de entrega."*
         - **03 Desenvolvemos**: *"Critério de Saída: Código testado, revisado e aprovado em ambiente de homologação antes do deploy em produção."*
         - **04 Evoluímos**: *"Critério de Saída: Sistema operando estavelmente com métricas acordadas e canal de suporte aberto."*

### 2.2. Adaptabilidade Mobile (`< md`)
- Em telas menores que `md`, o layout converte-se em um Accordion vertical fluido.
- Cada etapa pode ser expandida/recolhida de forma independente ou em acordeão único.
- Ao expandir, exibe o resumo executivo, os badges de entregáveis concretos e o critério de saída daquela etapa.
- Área de clique ergonômica (mínimo de 48px de altura de toque).

### 2.3. Manifesto Técnico de Engenharia (Substituindo os 2 cards soltos)
- Eliminar os dois cards retangulares soltos (`bg-card/60 border border-border/60 rounded-xl`).
- Reformatar como uma seção aberta de **Manifesto Técnico** em 2 colunas com divisor vertical sutil (`md:divide-x md:divide-border-subtle`):
  - **Coluna 1 (Garantia Operacional)**:
    - Micro-badge: `// GARANTIA OPERACIONAL` em `font-mono text-xs font-semibold text-text-brand tracking-wider mb-2`.
    - Título: `Previsibilidade contratual e técnica` (`text-lg font-bold text-primary mb-3`).
    - Descrição: *"Definimos os critérios de aceite e a arquitetura antes da escrita do código. Cada entrega incremental passa por validação contínua em ambiente controlado, eliminando surpresas ao final do projeto."*
  - **Coluna 2 (Gestão Direta)**:
    - Micro-badge: `// GESTÃO DIRETA` em `font-mono text-xs font-semibold text-text-brand tracking-wider mb-2`.
    - Título: `Comunicação direta sem ruídos` (`text-lg font-bold text-primary mb-3`).
    - Descrição: *"Você conversa diretamente com a liderança técnica responsável pela arquitetura e implementação da sua solução, com alinhamentos periódicos e decisões documentadas."*

### 2.4. FAQ / CTA de Contato Compacto no Rodapé
- Um callout/banner compacto integrado com respiro equilibrado:
  - Frase de chamada: *"Ficou com alguma dúvida sobre o processo?"* (`text-xl sm:text-2xl font-bold text-primary mb-2`).
  - Subtexto explicativo: *"Consulte as dúvidas mais comuns sobre modelos de trabalho, início de projetos e atendimento remoto."* (`text-sm text-secondary mb-6`).
  - Ações:
    - Botão primário: `"Fale com um engenheiro"` (`bg-brand text-on-brand hover:bg-brand-hover min-h-[44px] px-8 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-glow-brand`) direcionando para `/contato`.
    - Link / Botão secundário: `"Ver dúvidas frequentes"` (`variant="outline" border-border-default min-h-[44px] px-6 text-sm font-medium`) direcionando para `/duvidas-frequentes`.

---

## 3. Arquitetura de Componentes

1. `src/components/sections/ProcessExplorer.tsx`:
   - Componente novo, totalmente componentizado e tipado em TypeScript estrito.
   - Contém os dados estruturados das 4 etapas (`stepsData` com `step`, `title`, `handle`, `description`, `deliverables`, `exitCriteria`, `Icon`).
   - Implementa a interface desktop de 2 colunas com tabs/stepper e transição `AnimatePresence`.
   - Implementa a interface mobile com accordion intuitivo.
2. `src/pages/HowWeWorkPage.tsx`:
   - Utiliza `PageHeader` com eyebrow `"METODOLOGIA"`, título `"Como trabalhamos"` e descrição.
   - Renderiza `<ProcessExplorer />`.
   - Renderiza a seção do Manifesto Técnico de Engenharia (2 colunas abertas com `md:divide-x`).
   - Renderiza a barra compacta de FAQ / CTA de contato.
3. `src/components/sections/HowWeWork.tsx`:
   - Permanece intacto para a Home (`/`), preservando o pipeline contínuo horizontal e seus testes.

---

## 4. Critérios de Aceite e Quality Gates

- [ ] A rota `/como-trabalhamos` exibe o Process Explorer interativo de 2 colunas no desktop.
- [ ] No desktop, ao selecionar uma etapa (01 a 04), o painel da direita atualiza os entregáveis concretos e o critério de saída com transição suave.
- [ ] No mobile (`< md`), as 4 etapas são exibidas em formato vertical expansível/accordion.
- [ ] O Manifesto Técnico substitui os 2 cards soltos por 2 colunas abertas com `md:divide-x` e badges `// GARANTIA OPERACIONAL` e `// GESTÃO DIRETA`.
- [ ] O CTA compacto de rodapé inclui o botão "Fale com um engenheiro" (`/contato`) e o link para "/duvidas-frequentes".
- [ ] Suporte a temas claro e escuro usando tokens semânticos (`text-primary`, `text-secondary`, `bg-brand`, `border-border-default`, `dark:bg-zinc-950/70`).
- [ ] Acessibilidade e navegação por teclado garantidas.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] `npx tsc --noEmit` passa com 0 erros.
- [ ] `npm run lint` passa com 0 erros.
- [ ] `npm test -- --run` passa com 100% de aprovação.
- [ ] `npx playwright test` passa com 100% de aprovação.
- [ ] `npm run build` passa com sucesso.

---

## 5. Plano de Implementação

1. **Fase 1 — Aprovação**: Obter aprovação formal do PO.
2. **Fase 2 — TASK criada**: Criar `tasks/TASK-074-como-trabalhamos-process-explorer.md`.
3. **Fase 3 — Implementação do Process Explorer**: Criar `src/components/sections/ProcessExplorer.tsx`.
4. **Fase 4 — Refatoração da Página**: Atualizar `src/pages/HowWeWorkPage.tsx` com o Manifesto Técnico e CTA compacto.
5. **Fase 5 — Testes Unitários**: Criar `src/components/sections/__tests__/ProcessExplorer.test.tsx` e atualizar `src/pages/__tests__/pages.test.tsx`.
6. **Fase 6 — Quality Gates**: Executar verificação estrita (`tsc`, `lint`, `vitest`, `playwright`, `build`).
7. **Fase 7 — Documentação & QA**: Gerar `reviews/QA-074.md`, atualizar `PROJECT.md` e `CHANGELOG.md`, realizar commit.
