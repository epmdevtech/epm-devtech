# CHANGELOG

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

## [0.0.29-toast-positioning-and-contact-feedback] — 2026-09-07

### Otimização & UX/UI
- **Posicionamento Superior Central de Notificações Toast (`sonner.tsx`)**:
  - Reconfiguração do `Toaster` do Sonner para `position="top-center"` no desktop e mobile, eliminando a renderização na base da tela sobre o Rodapé e a colisão com o botão de ScrollToTop
  - Configuração de offset superior inteligente: `offset={{ top: "84px" }}` no desktop e `mobileOffset={{ top: "76px", left: "16px", right: "16px" }}` no mobile para garantir afastamento harmônico abaixo do Header fixo
  - Habilitação de botão de fechamento rápido (`closeButton`)
- **Microinteração de Confirmação Imediata no Botão de Envio (`Contact.tsx`)**:
  - Adicionado estado transitório `isSuccess` com temporizador de 4 segundos: ao confirmar o envio, o botão transiciona suavemente para `"✓ Mensagem Enviada!"` com ícone `CheckCircle2`
  - Fornece feedback instantâneo sob o cursor/toque do usuário no momento da submissão

### Adicionado
- **Documentação SDD**: Registro formal de `SPEC-029`, `TASK-029` e `QA-029` com validação de todos os Quality Gates
- **Testes Unitários Atualizados (`Contact.test.tsx`)**: Validação do estado e rótulo `"Mensagem Enviada!"` no botão

## [0.0.28-contact-emailjs-success-log-removal] — 2026-09-07

### Limpeza & Otimização
- **Remoção de Log de Sucesso do EmailJS no Console (`Contact.tsx`)**:
  - Eliminação do log informativo `console.info("[EmailJS] Enviado com sucesso:", result.status, result.text);` executado após envio bem-sucedido
  - Redução de ruído no DevTools e eliminação de vazamento de detalhes internos da infraestrutura em produção
  - Preservação integral do feedback visual amigável (`toast.success`), limpeza do formulário (`reset()`) e rastreabilidade técnica de falhas (`console.error`)

### Adicionado
- **Documentação SDD**: Registro de `SPEC-028`, `TASK-028` e `QA-028` com evidências de qualidade (100% testes e E2E aprovados)

## [0.0.27-contact-resilience-and-autofill] — 2026-09-07

### Corrigido
- **Mensagem Amigável no Toast de Falha de Envio e Fallback para WhatsApp (`Contact.tsx`)**:
  - Substituição da mensagem técnica crua da API (`error.text`) por aviso institucional polido com botão direto "Chamar no WhatsApp"
  - Detalhes técnicos da falha restritos ao `console.error` para auditoria do time de engenharia
- **Normalização Visual de Autofill do Navegador (`index.css`)**:
  - Neutralização do fundo sólido do WebKit/Blink em campos com preenchimento automático mantendo fundo transparente e cor de texto consistentes

### Adicionado
- **Documentação SDD**: Registro formal de `SPEC-027`, `TASK-027` e `QA-027`

## [0.0.26-header-layout-shift-specificity-fix] — 2026-09-07

### Corrigido
- **Eliminação Definitiva do Layout Shift no Header ao Abrir Dropdowns via Especificidade CSS (`index.css`)**:
  - Resolução da regressão onde o menu superior sofria estufamento para a direita ao abrir o seletor "Desafio ou Tipo de Projeto"
  - Diagnóstico: a biblioteca `react-remove-scroll-bar` injetava dinamicamente no `<head>` via `styleSingleton` uma regra `body[data-scroll-locked] { margin-right: 15px !important; overflow: hidden !important; }`, que vencia a regra CSS estática por ordem de cascata
  - Solução: aumento da especificidade para `(0, 1, 2)` usando `html body[data-scroll-locked]` e blindagem adicional `html body[data-scroll-locked] header { right: 0px !important; margin-right: 0px !important; }` com especificidade `(0, 1, 3)`
  - Resultado: o body mantém `margin-right: 0px` e `overflow: visible`, preservando 100% da estabilidade visual do Header e da página

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-026`, `TASK-026` e `QA-026` com validação de Quality Gates
- **Aprimoramento de Teste E2E (`design-system-and-stability.spec.ts`)**: Validação ponta a ponta dos estilos computados do `body` e do `header` durante a abertura do dropdown

## [0.0.25-contact-dropdown-alignment-refinement] — 2026-09-07

### Corrigido
- **Refinamento de Alinhamento Vertical do Dropdown de Contato (`Contact.tsx`)**:
  - Eliminação do gap de 4px entre o underline do campo "Desafio ou Tipo de Projeto" e a borda superior do menu flutuante de opções
  - Causa raiz: o componente base `select.tsx` aplica `data-[side=bottom]:translate-y-1` em modo `position="popper"`, criando o afastamento indesejado
  - Solução cirúrgica em `Contact.tsx`: adição de `sideOffset={0}` (API Radix Popper) e sobrescrita `data-[side=bottom]:translate-y-0` no `SelectContent`, sem modificar o arquivo base compartilhado
  - Alinhamento milimétrico confirmado: borda superior do dropdown encosta diretamente no underline do trigger com gap = 0px

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-025`, `TASK-025` e `QA-025` com matriz de conformidade e evidências de quality gates



### Corrigido
- **Eliminação de Layout Shift do Menu Superior / Header ao Abrir Dropdowns (`index.css`)**:
  - Resolução do salto horizontal e estufamento do Header fixo para a direita causado pelo bloqueio forçado de scroll do Radix UI (`react-remove-scroll`)
  - Adição de `scrollbar-gutter: stable;` no elemento `html`, garantindo reserva perpétua da calha de rolagem do navegador
  - Inserção de regra de contenção em `body[data-scroll-locked]`, preservando `overflow: visible !important` e zerando margens espúrias introduzidas pelo script de remoção de scrollbar
  - Garantia de estabilidade espacial milimétrica (variação $0\text{px}$) no Header, logotipo e links de navegação

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-024`, `TASK-024` e `QA-024`
- **Teste Automatizado de Estabilidade Visual (E2E)**: Validação no Playwright (`design-system-and-stability.spec.ts`) assegurando zero layout shift e conformidade visual contínua

## [0.0.23-contact-dropdown-overflow-fix] — 2026-09-06

### Corrigido
- **Confinamento Estrutural e Resolução de Overflow do Dropdown de Contato (`Contact.tsx` & `select.tsx`)**:
  - Correção do menu flutuante (dropdown) do campo "Desafio ou Tipo de Projeto" que invadia o bloco escuro ao lado quando expandido
  - Adição de `relative` e `w-full` no container pai da coluna esquerda
  - Configuração de `w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]` no `SelectContent` e `SelectViewport` (modo `popper`), travando milimetricamente a largura do painel suspenso na largura exata do trigger
  - Aplicação de `truncate` nas opções do `SelectItem` para evitar que textos extensos causem expansão horizontal
  - Preservação da elevação e do Radix Portal (`z-50 shadow-lg`), sem corte por containers ancestrais

### Adicionado
- **Documentação SDD Completa**: Registro de `SPEC-023`, `TASK-023` e `QA-023` com validação de Quality Gates e matriz de conformidade

## [0.0.22-contact-next-steps-guarantees] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-022`, `TASK-022` e `QA-022` com matriz de conformidade de requisitos e evidências de quality gates
- **Fluxo de Próximos Passos & Garantias no Card de Contato (`Contact.tsx`)**:
  - Substituição da lista redundante de canais pelo fluxo de alinhamento de expectativas
  - Título interno monocromático: "O que acontece a seguir?"
  - Texto de apoio: "Nosso processo é direto com a engenharia, sem intermediários comerciais:"
  - `Bloco 1 (Diagnóstico Técnico)`: Ícone `CheckCircle2` com avaliação de cenário, gargalos e viabilidade arquitetural
  - `Bloco 2 (Retorno em até 24 Horas)`: Ícone `Clock` com resposta rápida para agendamento de conversa técnica
  - `Bloco 3 (Sigilo e Segurança)`: Ícone `ShieldCheck` com garantia de confidencialidade de ideias e regras de negócio
  - `Chamada Rápida WhatsApp`: Divisor inferior com pergunta "Prefere atendimento imediato?" e link direto "Chamar no WhatsApp direto →"
- **Centralização Institucional no Rodapé**:
  - Manutenção dos canais institucionais e localização exclusivamente no Footer, eliminando duplicidade visual no site

### Alterado
- **Atualização das Suítes de Testes**:
  - Testes unitários atualizados em `Contact.test.tsx` com 99.26% de cobertura e 100% de sucesso
  - Suíte Playwright E2E 100% aprovada (8/8 testes)

## [0.0.21-contact-split-card-underline] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-021`, `TASK-021` e `QA-021` com matriz de conformidade e evidências de quality gates
- **Layout em Card Duplo Unificado (Split Card) na Seção Contato (`Contact.tsx`)**:
  - Container integrado de duas colunas no desktop (`lg:grid-cols-12`) com acabamento arredondado (`rounded-2xl`) e sombra suave (`shadow-xl`)
  - `Lado Esquerdo (Formulário, 7 colunas)`: Fundo refinado (`bg-white dark:bg-zinc-900`), título interno "Envie sua mensagem", inputs minimalistas de linha inferior (underline style) sem bordas laterais ou superiores e foco em verde esmeralda institucional
  - `Lado Direito (Canais, 5 colunas)`: Bloco contrastante de tom escuro (`bg-zinc-900 text-white dark:bg-zinc-950`), título interno "Canais de Atendimento", texto de apoio e lista de 4 canais com ícones circulares discretos em fundo escuro (`w-10 h-10 rounded-full bg-zinc-800 text-emerald-400`)
- **Canais Completos com Ícones Circulares**:
  - Localização: Toledo, Paraná (ícone `MapPin`)
  - WhatsApp direto: (45) 99917-8290 (ícone `Phone`)
  - E-mail corporativo: elessandro@epmdevtech.com.br (ícone `Mail`)
  - Tempo de resposta: Retorno em até 24 horas úteis (ícone `Clock`)
- **Botão de Envio (Slim CTA)**: Posicionado e alinhado à esquerda na base do formulário com estado de carregamento e microinteração de hover

### Alterado
- **Atualização das Suítes de Testes**:
  - Testes unitários de `Contact.test.tsx` atualizados para validar o Card Duplo Unificado e os canais de atendimento (100% de sucesso, 99.27% de cobertura)
  - Suíte E2E em `design-system-and-stability.spec.ts` 100% aprovada (8/8 testes) com calibração de canal de cor esmeralda

## [0.0.20-footer-4-columns-redesign] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-020`, `TASK-020` e `QA-020` com rastreabilidade de requisitos, evidências de quality gates e matriz de conformidade
- **Layout de 4 Colunas Monocromático no Rodapé (`Footer.tsx`)**:
  - `Coluna 1 (Identidade e Posicionamento)`: Logotipo adaptativo WebP (dark e light), texto de apoio técnico, localização em Toledo-PR com ícone `MapPin` e links discretos para GitHub e LinkedIn
  - `Coluna 2 (Soluções)`: Título monocromático "SOLUÇÕES" e 5 links para os serviços reais da empresa
  - `Coluna 3 (Navegação)`: Título monocromático "NAVEGAÇÃO" e 5 links para as âncoras da página institucional
  - `Coluna 4 (Contato)`: Título monocromático "CONTATO", e-mail direto, WhatsApp e SLA de resposta técnica em até 24 horas úteis
  - `Barra Inferior (Sub-footer)`: Divisor de 1px com copyright à esquerda, seletor de tema (`ThemeSwitcher`) ao centro e frase de autoridade à direita com respiro lateral para compatibilidade com o botão `ScrollToTop`

### Alterado
- **Padronização Tipográfica do Rodapé**:
  - Títulos das colunas em caixa alta com peso firme e tracking amplo (`text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100`)
  - Ausência total de spans bicolores e gradientes
  - Redação em PT-BR sem uso de travessões (`—` ou `–`)
- **Atualização das Suítes de Testes**:
  - Testes unitários atualizados em `Footer.test.tsx` com 100% de cobertura
  - Suíte E2E em `design-system-and-stability.spec.ts` 100% aprovada (8/8 testes)

## [0.0.19-contact-tech-slim-redesign] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-019`, `TASK-019` e `QA-019` com rastreabilidade de requisitos, evidências de quality gates e matriz de conformidade
- **Abordagem Consultiva no Cabeçalho de Contato**: Subtítulo que acolhe clientes em diferentes estágios de maturidade técnica, incentivando o diálogo preliminar

### Alterado
- **Redesign Tech Slim da Seção Contato (`Contact.tsx`)**:
  - Título H2 100% monocromático via `SectionHeader`: "Vamos entender o seu desafio" (`text-zinc-900` / `dark:text-white`)
  - Subtítulo humanizado e consultivo focado em entender necessidades e avaliar o melhor caminho técnico
  - Card principal refinado com efeito glass/backdrop (`bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md`), bordas ultrafinas (`border-zinc-200/80 dark:border-zinc-800/80`), `rounded-2xl` e padding equilibrado (`p-6 sm:p-7`)
  - Inputs e Select compactos (`h-10`, `rounded-lg`, fundo sutil `bg-zinc-50/60 dark:bg-zinc-950/50`), foco suave com anel esmeralda (`focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500`)
  - Textarea com `rows={4}` compacto no fluxo normal, preservando o modal expansivo de mensagem para descrições detalhadas
  - Botão de envio compacto (`h-11`, `bg-emerald-600 hover:bg-emerald-500`), animação de spinner com `Loader2` e microinteração de hover no ícone de envio
- **Canais Diretos de Contato**:
  - Mini-cards com ícones em containers esmeralda discretos (`bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400`)
  - "E-mail direto": `elessandro@epmdevtech.com.br`
  - "WhatsApp direto": `(45) 99917-8290`
  - "Tempo de resposta": `Retorno técnico em até 24 horas úteis`
- **Padronização das Opções de Tipo de Projeto (`PROJECT_TYPES`)**:
  - "Novo Sistema ou Aplicação Web"
  - "Modernização de Sistema Legado"
  - "APIs, Microsserviços e Integrações"
  - "Consultoria Técnica e Arquitetura"
  - "Outro Desafio"
- **Atualização das Suítes de Testes**:
  - Testes unitários atualizados em `Contact.test.tsx` (100% dos testes passando, 99.19% de cobertura)
  - Teste ponta a ponta em `e2e/design-system-and-stability.spec.ts` sincronizado com o novo heading (8/8 testes E2E passando)

## [0.0.18-differentials-technical-authority] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-018`, `TASK-018` e `QA-018` com rastreabilidade de requisitos e matriz de conformidade

### Alterado
- **Copywriting Técnico Sênior da Seção Diferenciais (`Differentials.tsx`)**:
  - `Card 01`: "Comunicação Transparente" (Tags: `ALINHAMENTO • PREVISIBILIDADE`), foco em alinhamento direto com quem executa a engenharia
  - `Card 02`: "Arquitetura Planejada" (Tags: `MICROSSERVIÇOS • CLEAN ARCHITECTURE`), escolhas arquiteturais sólidas para eliminar gargalos técnicos
  - `Card 03`: "Código Limpo e Testável" (Tags: `SOLID • TESTES AUTOMATIZADOS`), esteiras de testes rigorosas e estabilidade operacional
  - `Card 04`: "Padrões de Engenharia" (Tags: `SONARQUBE • CODE REVIEW`), análise estática de vulnerabilidades e observabilidade
  - `Card 05`: "Esteira DevOps e CI/CD" (Tags: `DEPLOY SEGURO • ROLLBACK`), pipelines automatizados e rollback imediato
  - `Card 06`: "Entregas Previsíveis" (Tags: `PRAZOS REAIS • QUALIDADE`), estimativas realistas sem atalhos técnicos
- **Semântica e Acessibilidade**:
  - Títulos dos cards elevados para a tag semântica `<h3>` mantendo a classe de estilo `.diff-card-title`
  - Subtítulo da seção atualizado com foco em rigor de engenharia, arquitetura escalável e entregas previsíveis
- **Preservação Rígida de Layout e Animações**:
  - Linha do tempo horizontal (pipeline animado), dots numerados de 01 a 06, setas indicadoras e ícones no rodapé mantidos 100% intactos
- **Atualização da Suíte de Testes**:
  - Atualização dos testes unitários em `Differentials.test.tsx` com 100% de cobertura

## [0.0.17-trust-bar-social-proof] — 2026-09-06

### Adicionado
- **Trust Bar / Faixa de Prova Social e Autoridade Técnica (`Authority.tsx`)**:
  - Substituição dos 5 cards verticais pesados por um componente compacto, leve e fluido posicionado estrategicamente antes da seção de Contato
  - **Bloco 1 (Métricas de Missão Crítica)**: `99,9%` Uptime em ambientes de produção, `2.500+ RPS` Throughput em arquiteturas distribuídas, `+448 IES e 650 Escolas` em plataformas educacionais e federais, e `Zero Perda` em integridade regulatória
  - **Bloco 2 (Validação Institucional)**: Selos tipográficos corporativos refinados com microinteração de hover para `CAPES • MEC`, `ONS (Operador Nacional do Sistema Elétrico)`, `Energia Pecém`, `Governo do MT (SEDUC)` e `Indústria e Manufatura (IoT Industrial e ERP)`
- **Documentação SDD Completa**: Registro formal de `SPEC-017`, `TASK-017` e `QA-017`

### Alterado
- **Título da Seção de Autoridade**:
  - Título H2 100% monocromático: "Autoridade técnica e impacto em missão crítica" (`text-zinc-900` / `dark:text-white`) com badge pill superior "Prova Social & Autoridade"
- **Otimização de Performance**:
  - Redução do tamanho de bundle do componente de 4.51 kB para 3.50 kB (gzip: 1.48 kB)
- **Atualização das Suítes de Testes**:
  - Atualização dos testes unitários em `Authority.test.tsx` (100% de cobertura) e sincronização da asserção de heading no Playwright E2E

## [0.0.16-services-technical-copywriting] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-016`, `TASK-016` e `QA-016` com rastreabilidade de requisitos, matriz de conformidade e evidências de qualidade

### Alterado
- **Cabeçalho da Seção Serviços (`Services.tsx`)**:
  - Título H2 100% monocromático via `SectionHeader`: "Soluções de engenharia de ponta a ponta" (`text-zinc-900` / `dark:text-white`)
  - Subtítulo refinado com foco em rigor arquitetural, testes automatizados e performance de negócios
- **Copywriting Técnico Sênior dos 6 Cards de Serviços**:
  - `Card 1`: "Desenvolvimento Web e Aplicações SPA" com foco em interfaces performáticas em Angular, Vue.js e React
  - `Card 2`: "APIs e Backends Escaláveis" com foco em APIs REST e arquiteturas orientadas a eventos em PHP (Laravel) e Node.js
  - `Card 3`: "Integrações e Microsserviços" com mensageria via RabbitMQ, Kafka e webhooks assíncronos
  - `Card 4`: "Arquitetura de Software" com microsserviços e monólitos modulares, Clean Architecture, DDD, padrões Hexagonal e BFF
  - `Card 5`: "Modernização e Evolução de Legados" com migração sem downtime via Strangler Fig Pattern
  - `Card 6`: "Consultoria Técnica e Code Review" com diagnóstico de gargalos, análise estática e auditoria
- **Padronização Tipográfica dos Cards**:
  - Títulos H3 padronizados em `font-semibold` (`fontWeight: 600`), tracking compacto e cor monocromática alinhada ao design system
- **Preservação Rígida de Layout e Mockups**:
  - Estrutura de grid 3x2, containers `.svc-card`, efeitos glow e as 6 ilustrações em código/diagramas mantidos 100% intactos
- **Atualização das Suítes de Testes**:
  - Atualização dos testes unitários em `Services.test.tsx` (100% de cobertura) e do teste E2E do Playwright em `design-system-and-stability.spec.ts`

## [0.0.15-about-authority-and-metrics] — 2026-09-06

### Adicionado
- **Suporte a Decimais em Animações Numéricas (`CountUp` / `AnimatedStat`)**: Implementada prop `decimals` com formatação PT-BR (vírgula decimal) para animação fluida do `99,9% Uptime em Produção` tanto em runtime quanto em ambiente de testes
- **Documentação SDD Completa**: Registro formal de `SPEC-015`, `TASK-015` e `QA-015` com evidências completas de cobertura e validação

### Alterado
- **Autoridade Técnica e Storytelling Institucional (`About.tsx`)**:
  - Redação reconstruída com foco na trajetória sênior e de Tech Lead do fundador, destacando governança de sistemas complexos, APIs resilientes e arquitetura orientada a microsserviços
  - Integração de IA assistida sob Spec-Driven Development (SDD) para produtividade e previsibilidade
- **Novas Métricas de Alto Impacto**:
  - `+9 Anos de Experiência` (fundação e liderança técnica sólida)
  - `4 Setores Críticos` (conexão direta com os 4 cases de destaque)
  - `99,9% Uptime em Produção` (indicador quantitativo de confiabilidade operacional)
- **Alinhamento dos 4 Cards de Setores Estratégicos**:
  - `01 Indústria`: Sistemas de chão de fábrica, rastreabilidade IoT e integração direta com ERPs legados
  - `02 Varejo`: Motores de recomendação, pipelines de checkout resilientes e e-commerces de alto tráfego
  - `03 Educação`: Plataformas distribuídas de alta concorrência para programas federais (CAPES/MEC)
  - `04 Energia`: Telemetria em tempo real, monitoramento crítico de ativos e dados regulatórios (ONS/Pecém)
- **Preservação Rígida de Layout & CSS 3D**:
  - Estrutura de grid/flex, classes de posicionamento staggered, cartões 3D com efeito flutuante (`about-card`) e gradientes de borda preservados 100% intactos
- **Tipografia e Copywriting PT-BR**:
  - Título H2 100% monocromático via `SectionHeader` ("Engenharia de software com excelência técnica comprovada")
  - Eliminação absoluta de travessões (`—` / `–`) e vícios de IA

## [0.0.14-monochromatic-titles] — 2026-09-06

### Adicionado
- **Asserção Automatizada de Títulos Monocromáticos no E2E**: Novo teste ponta a ponta no Playwright garantindo que nenhum título `h1`, `h2` ou `h3` contenha classes coloridas de verde (`text-emerald-*`, `text-green-*`, `text-teal-*`, `text-primary`) ou elementos de gradiente
- **Documentação SDD Completa**: Registro formal de SPEC-014, TASK-014 e QA-014

### Alterado
- **Eliminação Definitiva de Títulos Bicolores**:
  - Remoção de tags `<span>` verdes (`text-emerald-600 dark:text-emerald-400`) de todos os títulos em Hero, Serviços, Tecnologias, Diferenciais, Contato, Sobre e Autoridade
  - Adoção estrita de monocromatismo puro nos títulos: `text-zinc-900` em Light Mode e `dark:text-white` em Dark Mode do início ao fim
  - Restrição da cor primária de destaque (verde esmeralda) exclusivamente a badges superiores, CTAs primários e estados de foco/pulso
- **Refinamento da Badge do Cabeçalho (`SectionHeader` e `Hero`)**:
  - Ajuste de dimensões para `px-3 py-1 mb-4 rounded-full uppercase tracking-wider font-semibold text-xs`
  - Subtítulos consolidados em `max-w-2xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed`

## [0.0.13-typography-and-copywriting] — 2026-09-06

### Adicionado
- **Componente Reutilizável `SectionHeader` (`src/components/ui/SectionHeader.tsx`)**: Centralização do contrato de design tipográfico de seções com suporte nativo a tags `h1`/`h2`, alinhamento `center`/`left`, badges responsivas com classes dinâmicas para Dark e Light mode, e subtítulos fluidos
- **Suíte de Testes Unitários de Tipografia (`SectionHeader.test.tsx`)**: 100% de cobertura com validação de renderização semântica, alinhamento, classes de tema claro/escuro e badges
- **Documentação SDD Completa**: Registro formal de SPEC-013, TASK-013 e QA-013 com evidências de qualidade

### Alterado
- **Linearidade Tipográfica Rigorosa**:
  - Remoção de inconsistências visuais de pesos mistos (`font-light` vs `font-semibold`) em títulos de todas as seções (Hero H1, Serviços H2, Tecnologias H2, Diferenciais H2, Contato H2, Sobre H2, Autoridade H2), adotando `font-bold` homogêneo com destaques em verde esmeralda institucional (`text-emerald-600 dark:text-emerald-400`)
  - Padronização de badges de overline: `uppercase tracking-wider font-semibold text-xs sm:text-sm` com contraste verificado em Dark (`emerald-950/50` / `emerald-800/60` / `emerald-400`) e Light (`emerald-50` / `emerald-200/70` / `emerald-700`)
  - Padronização dos subtítulos e corpos de texto: `font-normal text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400`
- **Erradicação Total de Travessões (`—` / `–`)**:
  - Eliminação de travessões de IA em mockups de serviços, cards de diferenciais, formulário de contato, projetos de autoridade e metatags SEO em `index.html` e `Index.tsx`, substituindo por pontuação natural de PT-BR (dois-pontos, vírgulas, parênteses e pontos finais)
- **Microcopy Direto & B2B**:
  - Botões de conversão e chamadas atualizados com imperativos claros ("Falar com especialista", "Ver serviços", "Enviar mensagem")

## [0.0.12-scroll-to-top-ux] — 2026-09-06

### Adicionado
- **Elevação Dinâmica no Rodapé (Smart Docking)**: Detecção automática da visibilidade do rodapé (`IntersectionObserver` com observação de mutações e rolagem) elevando o botão de `bottom-6 md:bottom-8` (24-32px) para `bottom-20 md:bottom-24` (80-96px)
- **Ajuste de Safe Area no Rodapé**: Margem de respiro `lg:pr-14` adicionada na linha de copyright para blindagem total contra sobreposições
- **Testes Unitários Dedicados**: Criação de `ScrollToTop.test.tsx` com 100% de aprovação (testando visibilidade ao rolar, acionamento do clique suave e docking do footer)
- **Teste End-to-End no Playwright**: Validação automatizada em navegador real garantindo ausência de colisão com o copyright
- Documentação do ciclo SDD: SPEC-012, TASK-012 e QA-012 registrados

### Alterado
- **Reorientação da Tooltip**: Tooltip alterada de `side="left"` para `side="top"`, abrindo verticalmente para a área livre acima do botão em vez de cruzar horizontalmente a linha de texto
- **Harmonização Visual da Marca**: Atualização das cores e sombras do botão para a paleta primária verde esmeralda institucional (`hsl(var(--primary))`)

## [0.0.11-hero-commercial-positioning] — 2026-09-06

### Adicionado
- **Tagline Superior no Hero**: "ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO" com badge minimalista e indicador pulsante na cor primária da marca
- **Dual CTA (Ações de Alta Conversão)**: Botão primário "Falar sobre meu projeto" direcionando para `#contato` e botão secundário "Conhecer serviços" direcionando para `#servicos`
- **Microprova Social e Credenciais Técnicas**: "+9 anos de experiência em sistemas críticos • Arquiteturas cloud-native • APIs resilientes • Código limpo" com ícone `ShieldCheck`

### Alterado
- **Headline (H1)**: Atualizado para "Software sob medida construído para escalar o seu negócio." mantendo sofisticação monocromática e contraste por peso
- **Subtítulo**: Atualizado para "Da concepção à infraestrutura: desenvolvemos sistemas web, APIs resilientes e arquiteturas de alta performance preparadas para acompanhar o crescimento da sua empresa."
- **Remoção Completa de Gradientes**: Eliminado `bg-gradient-hero` e os orbs coloridos desfocados (`blur-[128px]`) em ambos os modos (Dark e Light), adotando fundo sóbrio e limpo `bg-background noise`
- Documentação do ciclo SDD: SPEC-011, TASK-011 e QA-011 registrados

## [0.0.10-adaptive-logo] — 2026-09-06

### Adicionado
- Assets vetoriais e rasterizados de alta fidelidade para o logotipo em Modo Claro: `logo-epm-devtech-light-xs.webp` (149x50 px, ~5.2 KB), `logo-epm-devtech-light-sm.webp` (300x101 px, ~12.4 KB) e PNGs correspondentes
- Preload condicional com `media="(prefers-color-scheme: ...)"` em `index.html` para LCP instantâneo em ambos os temas
- Teste E2E no Playwright (`e2e/design-system-and-stability.spec.ts`) validando comutação dinâmica do logotipo entre Dark e Light Mode e ausência de moldura escura

### Alterado
- **Header (`src/components/layout/Header.tsx`)**: Remoção completa da classe paliativa `bg-gray-900` e introdução de renderização adaptativa CSS com variantes dark/light
- **Footer (`src/components/sections/Footer.tsx`)**: Remoção da moldura `bg-gray-900` e suporte nativo ao tema claro com fundo 100% transparente
- Preservação da árvore de acessibilidade com `alt="EPM DEVTECH"` único e `aria-hidden="true"` na variante do tema oposto, evitando anúncios duplicados em leitores de tela
- Documentação do ciclo SDD: SPEC-010, TASK-010 e QA-010 devidamente registrados

## [0.0.9-tech-constellation] — 2026-09-05

### Adicionado
- Novo componente **`TechConstellation`** (`src/components/sections/TechConstellation.tsx`) substituindo o marquee tradicional da seção "Stack Tecnológica"
- Visual de grafo de tecnologias organizado por categorias conectadas por trilhas estilo circuito impresso (PCB) com pulsos animados de fluxo de dados
- Interação *Focus & Context*: destaque visual do nó selecionado e conexões diretas via hover, foco por teclado e clique/touch, esmaecendo nós não relacionados
- **Painel Interativo de Arquitetura (`tech-details-panel`)**: Exibição detalhada no rodapé da constelação contendo papel arquitetural, categoria e fluxo de conexões de cada tecnologia
- Rótulos de categoria desacoplados e centralizados em pills de alto contraste, eliminando qualquer oclusão com os nós ou circuitos
- Nomes das tecnologias integrados nos nós em desktop e layout clean touch-first otimizado em mobile
- Descrições arquiteturais para todas as 24 tecnologias em `buildConstellationLayout.ts`
- Integração com `Tooltip` do shadcn/ui (`@/components/ui/tooltip`)
- Utilitário desacoplado de cálculo geométrico determinístico `src/lib/buildConstellationLayout.ts` com suporte a layout responsivo Desktop e Mobile
- Suíte de testes unitários (`buildConstellationLayout.test.ts` e `TechConstellation.test.tsx`) mantendo cobertura em 98.13% (91/91 testes passando)
- Testes ponta a ponta Playwright para grafo e painel de detalhes (6/6 testes passando)
- Documentação SDD: SPEC-009, TASK-009 e QA-009 atualizados


### Adicionado
- Automação de testes End-to-End (E2E) com **Playwright** (`@playwright/test`) validando estabilidade, ausência de flickers, conformidade de monocromatismo e navegação
- Script `npm run test:e2e` integrado ao `package.json`
- SPEC-008, TASK-008 e QA-008 documentados e aprovados pelo PO

### Alterado
- **Design System & Identidade Visual**: Substituição integral da cor primária azul pelo **Verde Oficial da EPM DEVTECH** (`#10B981` / Emerald 500, HSL `158 64% 42%` no Dark Mode e `158 75% 36%` no Light Mode) com contraste WCAG AA >= 4.5:1
- **Títulos 100% Monocromáticos**: Removidos `text-gradient` e estilos multicolores de todos os headings (`Hero`, `About`, `Services`, `Technologies`, `Differentials`, `Authority`, `Contact`). Contraste aplicado estritamente através do peso tipográfico (`font-light` vs `font-semibold`) em `text-foreground`
- **Harmonização Tipográfica**: Textos corridos e parágrafos padronizados em `Geist Sans`, reservando `Geist Mono` para dados técnicos, números e código
- Atualização das variáveis e gradientes de destaque para o verde esmeralda em `src/index.css` e `index.html`

### Corrigido
- Eliminado o bug de flicker / duplicação de título no Hero causado por skeleton estático concorrente no `index.html`
- Resolvida duplicação de ID `#servicos` e normalizado o ciclo de vida dos nós no `LazySection` e fallbacks do `Suspense`


## [0.0.4-treemap] — 2026-08-28

### Adicionado
- Critical inline CSS no `<head>` do `index.html` para renderização imediata do tema escuro no frame 1 (FCP acelerado)
- `<link rel="modulepreload" href="/src/main.tsx" />` para parsing JS prioritário
- Desacoplamento assíncrono com `React.lazy` + `Suspense` em `App.tsx` para `CookieBanner`, `Toaster`, `Sonner`, `Analytics` e `SpeedInsights`
- Redução de 67% no tamanho do chunk inicial `index.js` (101 KB → 32.8 KB)
- SPEC-003, TASK-003 e QA-003

### Corrigido
- Postergação da inicialização do `CookieBanner` para 3.5s evitando colisão de métrica com o LCP do Hero
- Adição de `fetchpriority="high"` e `loading="eager"` no logo do Header

## [0.0.3-perf] — 2026-08-28

### Adicionado
- Otimização do logo para WebP (`public/logo-emp-dev-tech-sm.webp` de 9.5 KB contra 134 KB original — economia de 93%)
- Atributos `width={145}` e `height={49}` explícitos nas tags `<img>` do Header e Footer
- Formato Markdown com links canônicos `[Título](URL)` no `public/llms.txt` (Lighthouse Agentic Navigation 3/3)
- SPEC-002, TASK-002 e QA-002 registrados no framework SDD

### Corrigido
- CLS no Hero eliminado (0.155 → 0.00) com renderização de texto estável e aceleração do LCP
- Contraste de botões primários (`--primary`): ajustado para HSL(221.2, 83.2%, 48%) garantindo taxa de contraste 5.22:1 (WCAG AA) com texto branco
- Animação de estatísticas no componente About otimizada para a thread do compositor

## [0.0.2-perf] — 2026-08-28

### Adicionado
- `public/llms.txt` seguindo spec llmstxt.org
- Preconnect + dns-prefetch para `cdn.jsdelivr.net` e `cdn.simpleicons.org`
- `content-visibility: auto` nas seções below-the-fold
- `will-change: transform` no `.tech-band-track` e `@media (prefers-reduced-motion)`
- SPEC-001, TASK-001 e QA-001

### Corrigido
- Contraste `muted-foreground` em light mode: 46.9% → 38% lightness
- `font-display` da fonte Geist: `optional` → `swap`

## [0.0.1-sdd] — 2026-08-28

### Adicionado
- Estrutura do Universal SDD aplicada ao projeto
- `PROJECT.md` — documento canônico do estado do projeto
- `AGENTS.md` — protocolo para agentes de IA e colaboradores
- `GEMINI.md` — protocolo específico para o agente Gemini/Antigravity
- Diretórios SDD: `/agents`, `/workflows`, `/profiles`, `/knowledge`, `/standards`, `/templates`, `/specs`, `/tasks`, `/reviews`, `/adr`, `/docs`
- Templates: SPEC, TASK, REVIEW, QA
- Standards: testing, quality-gates, ux-ui, accessibility
- ADRs: 001 a 005 documentando as decisões arquiteturais existentes
- Workflows: feature.md com o fluxo completo de desenvolvimento
- Knowledge base: stack.md e conventions.md

---

## [0.0.0] — 2026-08

### Adicionado
- Landing page institucional EPM DEVTECH
- Stack: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- Seções: Hero, About, Services, Technologies, Differentials, Authority, Contact, Footer
- Header com navegação responsiva e scroll spy
- SEO dinâmico por seção via react-helmet-async
- Dark/Light mode com next-themes
- Formulário de contato via EmailJS
- Cookie banner
- CursorOrb e ScrollToTop
- Suíte de testes com Vitest + React Testing Library (>90% cobertura)
- Deploy na Vercel
- Docker e Docker Compose para desenvolvimento local
- Bundle splitting manual via Vite manualChunks
