# SPEC-092 — Auditoria e Humanização Completa de Copywriting B2B & UX Writing do Projeto

- **Status:** APROVADO
- **Data de Aprovação:** 2026-10-02
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / Copywriting B2B / UX Writing / Conteúdo Institucional

---

## 1. Contexto e Motivação

O projeto EPM DevTech possui arquitetura, design visual, performance e testes em estado de excelência (React 18 + TypeScript + Tailwind CSS + Framer Motion). No entanto, a camada textual de diversas páginas e componentes ainda apresenta traços de linguagem robótica, excesso de jargões técnicos em títulos principais e formulações genéricas típicas de templates de IA.

O objetivo desta especificação é humanizar **100% do conteúdo textual** do site, adotando uma voz direta, madura, confiável e pragmática, voltada para tomadores de decisão (diretores, gestores de operações, líderes de produto e empresários).

---

## 2. Diretrizes e Regras Inegociáveis

1. **Manutenção Integral de Design e Estilo:**
   - **Zero alterações** de layout, CSS/Tailwind, classes visuais, tags HTML/JSX, ícones (`lucide-react`) ou animações (`framer-motion`).
   - O comprimento das strings humanizadas deve respeitar rigorosamente a volumetria e a harmonia visual pré-existentes, sem quebras de grids ou estouro de containers.
2. **Preservação de Fatos (Zero Alucinação):**
   - Não inventar clientes, depoimentos, prêmios ou certificações fictícias.
   - Manter a verdade técnica e o escopo de entregas reais da EPM DevTech (sistemas web, APIs, integrações e modernização).
3. **Privacidade e Posicionamento Remoto:**
   - Não incluir CNPJ ou dados fiscais no corpo das páginas (mantido apenas no sub-footer de copyright).
   - Remover menção a cidades/sedes físicas no corpo e no FAQ, posicionando a EPM DevTech como software house com atuação 100% remota em escala nacional.
   - Voz institucional consistente em nome da marca ("EPM DevTech" ou "nossa equipe").
4. **Lista Negra de Clichês e Termos Banidos:**
   - Banidos expressamente: *"Impulsione / alavanque seu negócio"*, *"Leve sua empresa para o próximo nível"*, *"Transforme sua visão em realidade"*, *"Soluções inovadoras e personalizadas"*, *"Tecnologia de ponta / state of the art"*, *"Jornada de transformação digital"*, *"Potencialize seus resultados / desbloqueie o potencial"*, *"Ecossistema digital / experiência única"*.
   - Foco na dor do cliente: lentidão, falhas operacionais, retrabalho com digitação manual de dados, sistemas legados travando o crescimento.

---

## 3. Mapeamento Detalhado de Substituições Textuais por Seção

### 3.1 Header & Configurações Globais (`src/config/site.ts` e `src/components/layout/Header.tsx`)
- **`src/config/site.ts`**:
  - `description`: "Engenharia de software sob medida para empresas que precisam destravar operações, integrar sistemas e construir produtos digitais robustos."
  - `company.location`: "Atendimento remoto em todo o Brasil."
- **`src/components/layout/Header.tsx`**:
  - Manter navegação limpa: `Serviços`, `Como trabalhamos`, `Experiência`, `Engenharia`, `Sobre nós`.
  - Botão de Ação: `Fale conosco` (consistente e objetivo).

### 3.2 Home (`src/pages/Home.tsx`, `Hero.tsx`, `HomeServicesBento.tsx`, `HomeProcessPipeline.tsx`, `HomeResultsStrip.tsx`)
- **`src/pages/Home.tsx`**:
  - Metatags: Título "EPM DevTech | Engenharia de Software Sob Medida para Empresas"; Descrição: "Desenvolvemos sistemas web, APIs e integrações sob medida para destravar a operação da sua empresa. Fale direto com a liderança técnica."
  - H2 Bloco 1: "Engenharia sob medida para os gargalos da sua operação" (mantido, direto e forte).
  - Parágrafo Bloco 1: "Soluções práticas para substituir processos manuais, conectar ferramentas isoladas e modernizar softwares essenciais da sua empresa."
  - Parágrafo Bloco 2 (Processo): "Alinhamentos objetivos, entregas frequentes em homologação e zero intermediários comerciais."
  - Parágrafo Bloco 3 (Resultados): "Métricas consolidadas em ambientes com exigência máxima de estabilidade, volume e conformidade regulatória."
  - Nota de rodapé: "* Resultados alcançados pela liderança técnica em projetos de missão crítica em outras organizações."
- **`src/components/sections/Hero.tsx`**:
  - Subheadline: "Desenvolvemos sistemas web, APIs e integrações sob medida para operações que não podem parar por instabilidade ou lentidão."
  - Cabeçalho do Seletor: "Qual é o principal desafio da sua empresa hoje?"
  - Badge do Seletor: "Diagnóstico técnico direto"
  - Cenários:
    1. "Criar um novo sistema, portal ou plataforma corporativa"
    2. "Conectar sistemas isolados e acabar com retrabalho manual"
    3. "Modernizar um software legado sem interromper o dia a dia"
    4. "Avaliar a arquitetura do meu sistema com um olhar sênior"
- **`src/components/sections/HomeServicesBento.tsx`**:
  - APIs e Back-end: "Processe regras complexas e alto volume com segurança, sem lentidão ou quedas em momentos de pico."
  - Sistemas e Portais: "Substitua planilhas confusas e controles manuais por sistemas web intuitivos, rápidos e adaptados à rotina da sua equipe."
  - Integrações de Dados: "Elimine o retrabalho de redigitar dados conectando seu ERP, CRM e ferramentas externas de forma confiável e sem perda de informações."
  - Modernização de Legados: "Atualize sistemas antigos que travam o crescimento do seu negócio de forma gradual, sem colocar em risco a operação diária."
- **`src/components/sections/HomeProcessPipeline.tsx`**:
  - 01 ENTENDIMENTO: "Mapeamos os gargalos operacionais e desenhamos a arquitetura mais eficiente para o seu momento."
  - 02 DEFINIÇÃO: "Definimos critérios claros de aceite, cronograma realista e prioridades de negócio antes de codificar."
  - 03 DESENVOLVIMENTO: "Código testado com validações periódicas em homologação para sua equipe acompanhar a evolução real."
  - 04 EVOLUÇÃO: "Acompanhamento próximo em produção, monitoramento de estabilidade e suporte técnico ágil."
- **`src/components/sections/HomeResultsStrip.tsx`**:
  - 99.9%: "Disponibilidade contínua" — "Sistemas operando sem paradas não planejadas em setores críticos de energia e educação."
  - 2.500 RPS: "Capacidade de carga" — "Arquiteturas dimensionadas para milhares de acessos simultâneos sem gargalos de banco de dados."
  - 100%: "Consistência de dados" — "Processamento regulatório sem perda ou duplicidade de registros em operações sensíveis."
  - −35%: "Tempo operacional poupado" — "Eliminação de tarefas manuais e digitações repetitivas através de automações inteligentes."

### 3.3 Rota Serviços (`src/pages/ServicesPage.tsx` e `src/components/sections/Services.tsx`)
- **`src/pages/ServicesPage.tsx`**:
  - PageHeader: "Soluções de software sob medida para destravar sua empresa"
  - Descrição: "Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
  - Botão CTA: "Conversar sobre seu projeto"
  - Faixa de Garantias:
    - 01 // ESCOPO: "Escopo e metas claras" — "Critérios objetivos de aceite e validações em cada ciclo, eliminando surpresas contratuais."
    - 02 // SUSTENTABILIDADE: "Código fácil de manter" — "Arquitetura limpa, testes automatizados e documentação para que seu software evolua com tranquilidade."
    - 03 // COMUNICAÇÃO: "Contato direto com quem faz" — "Você conversa diretamente com os engenheiros responsáveis pelo projeto, sem ruídos de intermediação."
- **`src/components/sections/Services.tsx`**:
  - Sistemas Web:
    - Trigger ("Quando sua empresa precisa:"): "Sua equipe perde tempo gerenciando processos em planilhas desconectadas ou precisa de uma plataforma própria para atender clientes e colaboradores com segurança e velocidade."
    - Descrição: "Desenvolvemos sistemas internos, portais e ferramentas corporativas com interfaces ágeis, fluxos intuitivos e estabilidade técnica comprovada."
  - APIs e Back-end:
    - Trigger ("Quando sua empresa precisa:"): "O sistema atual trava ou fica lento em horários de pico, ou novos serviços precisam consumir regras de negócio com segurança e resposta em milissegundos."
    - Descrição: "Construímos APIs robustas e arquiteturas preparadas para absorver grandes picos de uso sem lentidão e sem indisponibilidade."
  - Integrações de Dados:
    - Trigger ("Quando sua empresa precisa:"): "Sua equipe gasta horas do dia redigitando informações entre ERP, CRM e ferramentas financeiras, com risco frequente de erros e inconsistências."
    - Descrição: "Criamos pontes automatizadas e seguras entre suas ferramentas, garantindo que os dados cheguem ao destino certo sem perdas e sem esforço manual."
  - Modernização de Legados:
    - Trigger ("Quando sua empresa precisa:"): "A empresa depende de um sistema antigo que ninguém tem coragem de mexer por medo de travar a operação, mas que já não acompanha as necessidades do negócio."
    - Descrição: "Substituímos e refatoramos módulos antigos passo a passo, garantindo que o negócio continue faturando normalmente durante toda a transição."

### 3.4 Rota Como Trabalhamos (`src/pages/HowWeWorkPage.tsx` e `src/components/sections/ProcessExplorer.tsx`)
- **`src/pages/HowWeWorkPage.tsx`**:
  - Descrição do PageHeader: "Um processo transparente e previsível para transformar problemas operacionais em sistemas confiáveis, com validações frequentes e comunicação direta."
  - Manifesto de Parceria:
    - // GARANTIA OPERACIONAL: "Previsibilidade do início ao fim" — "Alinhamos a arquitetura e os critérios de sucesso antes de escrever a primeira linha de código. Cada funcionalidade é entregue em homologação para que você acompanhe o projeto avançando sem surpresas de prazo ou custo."
    - // GESTÃO DIRETA: "Sem intermediários, sem ruído" — "Você fala diretamente com a liderança técnica que planeja a arquitetura e implementa o código. Decisões são tomadas de forma ágil e registradas com transparência."
- **`src/components/sections/ProcessExplorer.tsx`**:
  - 01 Entendemos: "Investigamos a fundo o funcionamento da sua empresa, os sistemas em uso e onde estão os verdadeiros gargalos. Nenhum código é iniciado sem termos clareza do problema que precisa ser resolvido."
  - 02 Definimos: "Organizamos a solução em entregas claras e priorizadas por impacto no negócio. Definimos regras, interfaces e cronograma de forma que sua equipe saiba exatamente o que esperar de cada ciclo."
  - 03 Desenvolvemos: "Construímos o código com testes automatizados rigorosos e deploys contínuos em ambiente de homologação. Você testa e valida cada etapa funcionando, sem caixas-pretas."
  - 04 Evoluímos: "Colocamos o sistema no ar de forma assistida, com monitoramento ativo e resposta rápida. Acompanhamos a operação de perto para garantir estabilidade contínua e evolução segura."

### 3.5 Rota Experiência (`src/pages/ExperiencePage.tsx` e `src/config/experience.ts`)
- **`src/pages/ExperiencePage.tsx`**:
  - Descrição do PageHeader: "Conhecimento construído em operações reais com requisitos rigorosos de estabilidade, integração e volume de dados."
  - Verticais:
    - Indústria: "Conexão direta entre o chão de fábrica e a gestão corporativa, garantindo rastreabilidade de máquinas, controle de insumos e fim das anotações em papel."
    - Varejo: "Prevenção de lentidão e perdas de vendas em picos promocionais, mantendo checkouts rápidos e estoque 100% sincronizado."
    - Educação: "Sustentação de portais com picos intensos de inscrições e processamento de dados acadêmicos com segurança e alta disponibilidade."
    - Energia: "Monitoramento contínuo de dados operacionais e conformidade com regras estritas do setor elétrico, com tolerância zero para perda de dados."
  - Nota de Contexto: "Nota de contexto: Organizações e projetos em que a liderança técnica da EPM DevTech atuou profissionalmente em outras empresas. Não são clientes da EPM DevTech."

### 3.6 Rota Engenharia (`src/pages/EngineeringPage.tsx`, `ArchitecturalBlueprint.tsx` e `src/config/architecture.ts`)
- **`src/pages/EngineeringPage.tsx`**:
  - Descrição do PageHeader: "Decisões pragmáticas de arquitetura, código sustentável e rotinas de qualidade automatizadas para garantir que seu software continue rápido e seguro por muitos anos."
  - Filosofia de Execução:
    - 01 "Comunicação técnica direta" — "Você conversa com quem projeta e implementa o código. Sem camadas comerciais distorcendo prazos ou viabilidade técnica."
    - 02 "Arquitetura fácil de manter" — "Construímos código modular e bem testado para que sua empresa possa evoluir o sistema no futuro sem medo de quebrar o que já funciona."
    - 03 "Pragmatismo voltado ao negócio" — "Não inventamos complexidade desnecessária. Cada tecnologia e padrão escolhido serve para resolver um problema real com custo previsível."
- **`src/config/architecture.ts`**:
  - Tooltips de tecnologias reescritos com foco em benefícios de estabilidade, segurança e manutenibilidade para o negócio.

### 3.7 Rota Sobre nós (`src/pages/AboutPage.tsx`)
- **Preservação**: O H1 monocromático (*"Transformando desafios em soluções que funcionam"*) e subtítulo institucional entregues na SPEC-090/091 são preservados.
- **Linha do Tempo (`MILESTONES`)**:
  - 2015: "Início da atuação em engenharia de sistemas corporativos, com foco em modelagem sólida de dados e arquitetura de código sustentável."
  - 2019: "Experiência prática em projetos de missão crítica em setores regulados (energia, infraestrutura e educação), com tolerância zero a falhas."
  - 2023: "Atuação focada no desenvolvimento de APIs de alta performance, microsserviços e modernização de sistemas corporativos essenciais."
  - Hoje: "Modelo de trabalho consultivo e direto: contato com a liderança técnica, escopo transparente e foco na resolução de gargalos reais."
- **Princípios (`PRINCIPLES`)**:
  - PRINCIPIO_01: "Excelência Pragmática" — "Não vendemos tecnologias da moda nem criamos complexidade desnecessária. Cada componente ou banco de dados existe para resolver uma dor concreta da operação com custo previsível."
  - PRINCIPIO_02: "Transparência Total" — "Conversas diretas entre quem decide e quem implementa. Apresentamos cenários realistas de prazo e viabilidade técnica, sem meias-palavras."
  - PRINCIPIO_03: "Código que Pertence a Você" — "Repositórios, documentação e infraestrutura pertencem integralmente à sua empresa. Escrevemos código limpo e testado para que qualquer bom desenvolvedor consiga dar continuidade."
  - PRINCIPIO_04: "Estabilidade Operacional" — "Seu negócio não pode parar. Planejamos cada entrega com testes automatizados e homologação cuidadosa para garantir alta disponibilidade no dia a dia."

### 3.8 Contato, FAQ e Rodapé (`src/pages/ContactPage.tsx`, `Contact.tsx`, `src/config/faq.ts`, `Footer.tsx`)
- **`src/components/sections/Contact.tsx`**:
  - Placeholder de Mensagem: "Descreva resumidamente o desafio do seu sistema ou a demanda da sua empresa..."
  - Feedback Toast: "Mensagem recebida. Retornamos em até 24 horas úteis."
  - Próximos Passos:
    - Diagnóstico técnico: "Avaliamos seu cenário, gargalos e viabilidade arquitetural logo no primeiro contato."
    - Retorno ágil: "Retorno objetivo em até 24 horas úteis para agendarmos uma conversa técnica."
    - Sigilo profissional: "Suas regras de negócio e dados tratados com confidencialidade total, com NDA quando solicitado."
- **`src/config/faq.ts`**:
  - Pergunta 4 (removendo menção a Toledo/sede física):
    - Pergunta: "Como funciona o atendimento remoto da EPM DevTech para empresas de diferentes regiões?"
    - Resposta: "Atuamos de forma 100% remota com empresas e operações em qualquer estado do país. Nosso modelo de trabalho se baseia em comunicação direta, alinhamentos periódicos e entregas incrementais em ambiente de homologação, garantindo proximidade e acompanhamento contínuo em cada etapa do projeto."
- **`src/components/sections/Footer.tsx`**:
  - Localização: Substituição de "Toledo, Paraná." por "Atendimento 100% remoto em todo o Brasil".
  - Descrição: "Engenharia de software sob medida, sistemas web e integrações corporativas."

---

## 4. Quality Gates e Testes

1. `npx tsc --noEmit` — 0 erros de tipagem.
2. `npm run lint` — 0 erros/warnings de ESLint.
3. `npm test -- --run` — 100% de aprovação na suíte de testes unitários (atualizando asserts que testavam cópias textuais anteriores).
4. `npx playwright test` — 100% de aprovação na suíte E2E.
5. `npm run build` — Build e pré-renderização estática das 7 rotas sem erros.

---

## 5. Critérios de Aceite

1. [ ] 100% dos textos do site foram revisados e humanizados conforme o Guia de Voz e Tom.
2. [ ] Zero ocorrências de termos banidos (lista negra).
3. [ ] Nenhuma alteração estrutural de design, classes Tailwind, ícones ou animações foi realizada.
4. [ ] Remoção de qualquer menção a sedes físicas no corpo do site e no FAQ, posicionando a empresa como remota nacional.
5. [ ] Todos os testes unitários e E2E passam com 100% de sucesso.
