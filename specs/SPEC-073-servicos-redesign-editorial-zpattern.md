# SPEC-073 — Redesign Editorial da Página e Seção de Serviços (Z-Pattern & Garantias)

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Diagnóstico

A página de Serviços (`/servicos`) e o componente correspondente (`Services.tsx`) apresentam atualmente:
1. **Grade 2x2 com cards idênticos**: Os 4 serviços estão alocados em cards retangulares repetitivos com mocks genéricos no topo, gerando monotonia visual e aspecto de template genérico gerado por IA.
2. **Garantias em caixas fechadas com checks genéricos**: A seção intermediária aloca os 3 diferenciais ("Escopo bem alinhado", "Código sustentável", "Canal direto") dentro de caixas individuais com ícones `CheckCircle2` convencionais.
3. **CTA final pouco integrado**: Chamada de fechamento sem contraste hierárquico suficiente com o restante da página.

O objetivo desta especificação é refatorar a apresentação visual para o padrão editorial/técnico (estilo Linear, Stripe, Vercel), aplicando layout em Z-Pattern alternado para os serviços, faixa tipográfica limpa para as garantias e fechamento comercial com CTA refinado.

---

## 2. Decisões de Design e UI/UX

### 2.1. 4 Serviços Principais em Z-Pattern (`src/components/sections/Services.tsx`)
- Eliminar o container de grade 2x2 (`grid md:grid-cols-2`).
- Estruturar cada serviço como uma linha horizontal ampla com separador sutil (`py-12 lg:py-16 border-b border-border-default/60 last:border-b-0`):
  - **Layout de 12 colunas**: `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`.
  - **Alternância (Z-Pattern)**:
    - Serviços ímpares (índices 0 e 2: *Sistemas web & portais* e *Integrações entre sistemas*):
      - Coluna de Texto à esquerda: `lg:col-span-6 order-1 lg:order-1`.
      - Coluna Visual à direita: `lg:col-span-6 order-2 lg:order-2`.
    - Serviços pares (índices 1 e 3: *APIs & back-end escalável* e *Modernização & evolução de legados*):
      - Coluna Visual à esquerda: `lg:col-span-6 order-2 lg:order-1`.
      - Coluna de Texto à direita: `lg:col-span-6 order-1 lg:order-2`.
    - Mobile: Em todos os serviços, o texto permanece no topo (`order-1`) e o mock visual logo abaixo (`order-2`), garantindo leitura natural.
- **Coluna de Texto**:
  - Título H3 com forte presença técnica (`text-xl sm:text-2xl font-bold tracking-tight text-primary mb-3`).
  - Parágrafo descritivo claro em `text-secondary text-sm sm:text-base leading-relaxed mb-6`.
  - Callout de contexto de negócio integrado: em substituição à borda superior isolada, criar um callout editorial com barra lateral esmeralda:
    `border-l-2 border-brand/50 pl-4 py-2 text-xs sm:text-sm text-secondary bg-brand/5 rounded-r-md`:
    - Rótulo monospace uppercase: `QUANDO PRECISA:` em `font-mono text-xs font-semibold text-text-brand block mb-1`.
    - Pergunta-gatilho de negócio preservada integralmente.
- **Coluna Visual (Mocks Técnicos)**:
  - Fundo escuro elegante com profundidade: `rounded-xl border border-border-default/80 bg-surface/80 dark:bg-zinc-950/80 p-5 shadow-2xl backdrop-blur-sm select-none hover:border-brand/40 transition-colors duration-300`.
  - Preservação e polimento dos 4 mocks existentes:
    1. *MockBrowser*: Janela web com controles macOS, abas, hero e blocos de conteúdo.
    2. *MockAPI*: Terminal técnico de requisição `GET /api/v1/users`, headers e status `✓ 200 OK (42ms)`.
    3. *MockIntegration*: Diagrama topológico de API Hub conectando CRM, ERP, Email e DB com eventos e webhooks.
    4. *MockMaintenance*: Diff visual de refatoração de código com remoção de função síncrona legada (`-`) e adição de repositório assíncrono tipado (`+`).

### 2.2. Faixa de Garantias de Engenharia (`src/pages/ServicesPage.tsx`)
- Eliminar completamente os 3 cards fechados (`bg-card/60 border border-border/60 rounded-xl`) e os ícones `CheckCircle2`.
- Estruturar como faixa limpa de 3 colunas (`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12`):
  - Tag técnica monospace no topo:
    - Item 1: `[ 01 // ESCOPO ]`
    - Item 2: `[ 02 // SUSTENTABILIDADE ]`
    - Item 3: `[ 03 // COMUNICAÇÃO ]`
    - Estilo: `font-mono text-xs font-semibold text-text-brand tracking-wider mb-2`.
  - Título em destaque: `text-lg font-bold text-primary mb-2` ("Escopo bem alinhado", "Código sustentável", "Canal direto com quem faz").
  - Descrição objetiva: `text-sm text-secondary leading-relaxed`.
  - Sem caixas nem molduras individuais, valorizando a tipografia e o espaçamento negativo.

### 2.3. CTA Final da Página (`src/pages/ServicesPage.tsx`)
- Container de fechamento integrado com respiro amplo e divisória sutil superior:
  - Título H3: *"Quer avaliar qual solução se encaixa no seu momento?"* (`text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-3`).
  - Subtítulo: *"Agende uma conversa técnica sem compromisso para analisarmos os requisitos e a arquitetura recomendada."* (`text-sm sm:text-base text-secondary max-w-xl mx-auto mb-8`).
  - Botão Primário: `"Iniciar diagnóstico do projeto"` em verde-água da marca (`bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active min-h-[44px] px-8 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]`) apontando para `/contato`.
  - Botão Secundário: `"Entenda como trabalhamos →"` (`variant="outline" border-border-default bg-surface/50 hover:bg-surface-elevated text-secondary hover:text-primary font-medium text-sm min-h-[44px] px-6 transition-colors duration-200`) apontando para `/como-trabalhamos`.

---

## 3. Critérios de Aceite e Quality Gates

- [ ] Os 4 serviços são exibidos em Z-Pattern com alternância desktop e fluxo natural mobile.
- [ ] O callout "QUANDO PRECISA" utiliza borda lateral esmeralda e formatação editorial integrada.
- [ ] Os mocks técnicos possuem container escuro com profundidade (`dark:bg-zinc-950/80 rounded-xl border shadow-2xl`).
- [ ] As garantias de engenharia são apresentadas sem caixas fechadas, com tags `[ 01 // ESCOPO ]`, etc.
- [ ] O CTA final utiliza `"Iniciar diagnóstico do projeto"` e `"Entenda como trabalhamos →"`.
- [ ] Semântica HTML, acessibilidade ARIA e todos os textos factuais são preservados.
- [ ] `npx tsc --noEmit` passa com 0 erros.
- [ ] `npm run lint` passa com 0 erros.
- [ ] `npm test -- --run` passa com 100% de aprovação.
- [ ] `npx playwright test` passa com 100% de aprovação.
- [ ] `npm run build` passa com sucesso.

---

## 4. Plano de Implementação

1. **Fase 1 — Aprovação**: Obter aprovação formal do PO.
2. **Fase 2 — TASK criada**: Criar `tasks/TASK-073-servicos-redesign-editorial-zpattern.md`.
3. **Fase 3 — Refatoração de Componentes**:
   - `src/components/sections/Services.tsx` (Z-Pattern, callouts, mock containers).
   - `src/pages/ServicesPage.tsx` (Faixa de garantias e CTA final).
4. **Fase 4 — Suítes de Testes**: Atualizar testes unitários e E2E se aplicável.
5. **Fase 5 — Quality Gates & Relatório**: Executar QA e documentar em `reviews/QA-073.md`.
6. **Fase 6 — Documentação & Commit**: Atualizar `PROJECT.md`, `CHANGELOG.md` e commitar.
