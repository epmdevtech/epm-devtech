# SPEC-016 — Refatoração da Seção Serviços: Copywriting Técnico, Tipografia Monocromática e Consistência UI/UX

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Refatoração da Seção Serviços: Copywriting Técnico e Tipografia Monocromática |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

A seção "Serviços" (`#servicos`) do site institucional da EPM DEVTECH apresenta os pilares centrais de entrega técnica da software house. Para alinhar a seção à maturidade visual e de autoridade alcançada nas seções anteriores (Hero, Sobre, Diferenciais e Contato), faz-se necessária a revisão completa do copywriting, adotando um tom técnico sênior e direto, voltado para decisores técnicos (CTOs, Tech Leads, Gerentes de Engenharia e Diretores de Operações).

Além disso, a tipografia deve manter conformidade estrita com o Design System: título H2 100% monocromático através do componente padronizado `SectionHeader`, títulos de cards (H3) consistentes em peso `font-semibold` ou `font-bold` e ausência completa de travessões longos ou meias-riscas no copywriting brasileiro.

---

## 2. Requisitos e Restrições Inegociáveis

### 2.1 Restrição Inegociável de Layout e Mockups
- O grid de 6 cards (`grid md:grid-cols-2 lg:grid-cols-3 gap-5`), o layout interno dos cards, containers, cores de badges e componentes visuais (`.svc-visual-area`, `.svc-card`, estilos de glow com acento) **não devem sofrer nenhuma alteração estrutural**.
- As 6 ilustrações visuais técnicas em código/diagramas devem ser rigorosamente preservadas em seu comportamento original:
  1. `MockBrowser` (janela de browser com traffic lights, nav bar simulada e wireframe de blocos)
  2. `MockAPI` (mockup de endpoint REST `/api/v1/users` com método GET e badge de 200 OK)
  3. `MockIntegration` (diagrama de API Hub / mensageria com nós CRM, ERP, DB, Email e webhooks)
  4. `MockArchitecture` (camadas de arquitetura: Presentation, Application, Domain, Infrastructure)
  5. `MockMaintenance` (diff de código legacy vs. refactored com async/await e cache)
  6. `MockConsulting` (chat simulado de code review e diagnóstico de queries N+1)
- O desenvolvedor deve apenas atualizar e refinar os textos dos títulos e descrições dos 6 cards e o cabeçalho da seção.

### 2.2 Regras de Tipografia e Boas Práticas de UI/UX
- **Título da Seção (H2) 100% Monocromático**:
  - `Soluções de engenharia de ponta a ponta`
  - Utilização do componente reutilizável `SectionHeader` para garantir cor uniforme (`text-zinc-900` no modo claro e `dark:text-white` no modo escuro).
  - Proibição estrita de spans coloridos, gradientes no texto ou títulos bicolores.
- **Tipografia Linear e Consistente**:
  - Título com peso `font-bold`, tracking compacto (`tracking-tight`) e entrelinha controlada.
  - Títulos dos Cards (H3): Consistentes, monocromáticos, em peso `font-semibold` (`fontWeight: 600`), tracking compacto e cor `hsl(var(--foreground))`.
- **Copywriting em PT-BR**:
  - Proibido o uso de travessão longo (`—`) ou meia-risca (`–`). Toda a redação deve usar pontuação natural da língua portuguesa (vírgulas, dois-pontos ou pontos finais).

---

## 3. Conteúdo da Seção

### 3.1 Cabeçalho da Seção (`SectionHeader`)
- **Badge Superior (Overline)**: `Serviços` (exibida em uppercase pelo componente)
- **Título (H2 Monocromático)**: `Soluções de engenharia de ponta a ponta`
- **Subtítulo**: `Do planejamento à entrega em produção: desenvolvemos software com rigor arquitetural, testes automatizados e foco em performance para o seu negócio.`

### 3.2 Conteúdo dos 6 Cards de Serviços

1. **Card 1 (Visual: `MockBrowser`)**:
   - **Título (H3)**: `Desenvolvimento Web e Aplicações SPA`
   - **Descrição**: `Interfaces modernas, responsivas e performáticas com Angular, Vue.js e React, integradas a ecossistemas com alta taxa de conversão e usabilidade fluida.`
   - **Accent Glow**: `#10b981`

2. **Card 2 (Visual: `MockAPI`)**:
   - **Título (H3)**: `APIs e Backends Escaláveis`
   - **Descrição**: `Desenvolvimento de APIs REST e arquiteturas orientadas a eventos em PHP (Laravel) e Node.js, dimensionadas para alto throughput e baixa latência.`
   - **Accent Glow**: `#A855F7`

3. **Card 3 (Visual: `MockIntegration`)**:
   - **Título (H3)**: `Integrações e Microsserviços`
   - **Descrição**: `Conexão de ecossistemas corporativos via RabbitMQ, Kafka e webhooks, garantindo comunicação assíncrona, tolerância a falhas e sincronização em tempo real.`
   - **Accent Glow**: `#10b981`

4. **Card 4 (Visual: `MockArchitecture`)**:
   - **Título (H3)**: `Arquitetura de Software`
   - **Descrição**: `Design de microsserviços e monólitos modulares com Clean Architecture, DDD, padrões Hexagonal e BFF, preparados para crescimento contínuo e manutenibilidade.`
   - **Accent Glow**: `#A855F7`

5. **Card 5 (Visual: `MockMaintenance`)**:
   - **Título (H3)**: `Modernização e Evolução de Legados`
   - **Descrição**: `Migração incremental sem parada operacional aplicando Strangler Fig Pattern, refatoração de código com testes automatizados e ganho expressivo de performance.`
   - **Accent Glow**: `#10b981`

6. **Card 6 (Visual: `MockConsulting`)**:
   - **Título (H3)**: `Consultoria Técnica e Code Review`
   - **Descrição**: `Diagnóstico de gargalos, análise estática de vulnerabilidades, mentoria técnica e auditoria de arquitetura para elevar a maturidade do seu time.`
   - **Accent Glow**: `#f59e0b`

---

## 4. Plano de Testes e Validação

1. **Testes Unitários (`Services.test.tsx`)**:
   - Verificar renderização do novo título da seção (`Soluções de engenharia de ponta a ponta`).
   - Validar a presença de todos os 6 novos títulos de cards.
   - Validar a presença de fragmentos das novas descrições com autoridade técnica.
   - Garantir que todos os mockups visuais (`MockBrowser`, `MockAPI`, etc.) continuam presentes e íntegros.
2. **Testes End-to-End (`design-system-and-stability.spec.ts`)**:
   - Atualizar a asserção do heading de `#servicos` para verificar `Soluções de engenharia de ponta a ponta`.
   - Garantir aprovação de 100% da suíte E2E do Playwright.
3. **Quality Gates**:
   - ESLint: zero erros e zero avisos.
   - Vitest: 100% dos testes passando com cobertura ≥ 90%.
   - Build Vite de produção: sem warnings de chunk size > 600KB.
