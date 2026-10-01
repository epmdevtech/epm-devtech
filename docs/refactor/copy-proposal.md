# Proposta de Copywriting (ANTES → DEPOIS) — EPM DevTech

> Documento gerado na **Fase 1 (Auditoria e Planejamento)**.  
> Qualquer fato novo ou afirmação que dependa de validação do proprietário está explicitamente marcado com **`[CONFIRMAR]`**.

---

## 1. Metadados e Compartilhamento (SEO & Open Graph)

### 1.1 Meta Title e Meta Description
- **Nova função:** Apresentar a empresa, o que resolve e convidar ao contato em até 155 caracteres.
- **ANTES:**
  - `<title>`: `EPM DEVTECH | Software House: Desenvolvimento de Software Sob Medida`
  - `<meta name="description">`: `"Software house especializada em desenvolvimento web, APIs escaláveis e arquitetura de sistemas. +9 anos de experiência. PHP, Laravel, Node.js, React, AWS, Docker. Solicite um orçamento."` (197 caracteres)
- **DEPOIS:**
  - `<title>`: `EPM DevTech | Software House e Desenvolvimento de Software Sob Medida`
  - `<meta name="description">`: `"Software house que desenvolve sistemas web, APIs e integrações sob medida para empresas. Crie, integre ou modernize seu sistema. Fale sobre seu projeto."` (152 caracteres)

### 1.2 Open Graph e Twitter Card
- **ANTES:**
  - `og:description` / `twitter:description`: `"Software house especializada em APIs escaláveis, sistemas web e arquitetura sólida. +9 anos de experiência em projetos de médio e grande porte."`
  - `og:image`: `https://epmdevtech.com.br/android-chrome-512x512.png` (ícone quadrado 512×512)
  - `meta author`: `"Elessandro Prestes Macedo | EPM DEVTECH"`
  - `twitter:creator`: `@elessandrodev`
- **DEPOIS:**
  - `og:description` / `twitter:description`: `"Software house que desenvolve sistemas web, APIs e integrações sob medida para empresas. Crie, integre ou modernize seu sistema. Fale sobre seu projeto."`
  - `og:image`: `https://epmdevtech.com.br/og-image-1200x630.png` (nova imagem 1200×630 gerada com logotipo oficial, fundo escuro da marca e título monocromático, sem carregar na página).
  - `meta author`: `"EPM DevTech"`
  - `twitter:creator`: `[CONFIRMAR: Manter @elessandrodev associado ou remover para preservar perfil puramente institucional @epmdevtech?]`
  - `meta keywords`: **Remover** completamente do `index.html`.

---

## 2. Seção 1 — Hero

- **Nova função:** Proposta de valor clara e direta + Call To Action principal.
- **ANTES:**
  - Eyebrow: `EPM DEVTECH • SOFTWARE HOUSE`
  - H1: `Desenvolvemos software sob medida para o seu negócio.`
  - Subtítulo: `Sistemas, aplicações web, APIs e integrações construídos para resolver problemas reais, com segurança, escala e evolução contínua.`
  - Ações: Botão 1: `Falar sobre meu projeto` / Botão 2: `Conhecer a EPM`
  - Microprova: `Da ideia à produção • Engenharia direta • +9 anos de experiência`
- **DEPOIS:**
  - Eyebrow: `EPM DEVTECH • ENGENHARIA DE SOFTWARE`
  - H1: `Desenvolvemos software sob medida para o seu negócio.`
  - Subtítulo: `Sistemas web, APIs, integrações e soluções digitais construídas para resolver problemas reais e acompanhar a evolução da sua empresa.`
  - CTA Principal: `Falar sobre meu projeto`
  - CTA Secundário: `Conhecer a EPM DevTech` (âncora para `#sobre`)
  - Microprova: `Da concepção ao deploy • Engenharia direta • Arquitetura para evolução`
  *(Nota: Menção a anos de experiência removida daqui e concentrada com precisão na seção Sobre).*

---

## 3. Seção 2 — Prova de Contexto e Autoridade (antiga seção "Autoridade")

- **Nova função:** Evidência de complexidade operacional e capacidade de entrega, sem tom de currículo individual.
- **ANTES:**
  - Título: `Prova Social & Autoridade — Projetos em produção, não em portfólio`
  - Métricas: `99,9% Uptime em ambientes de produção` \| `2.500+ RPS Throughput suportado em arquiteturas distribuídas` \| `+448 IES e 650 Escolas Impacto em plataformas educacionais e federais` \| `Zero Perda Integridade em dados regulatórios e integrações críticas`
  - Faixa: `Engenharia comprovada em projetos e sistemas para grandes organizações e setores estratégicos: CAPES • MEC, ONS, Energia Pecém, Governo do MT, Indústria e Manufatura`
- **DEPOIS:**
  - Eyebrow: `EXPERIÊNCIA E CONTEXTO`
  - Título: `Sistemas construídos para operações que não podem parar`
  - Subtítulo: `Projetos desenvolvidos para cenários de alta disponibilidade, grande volume de dados e regras de negócio complexas.`
  - Métricas qualitativas e verificáveis:
    - `99,9%` — Disponibilidade observada em ambientes de produção `[CONFIRMAR]`
    - `2.500+ RPS` — Throughput sustentado em arquiteturas distribuídas `[CONFIRMAR]`
    - `Zero Perda` — Integridade rigorosa em conciliações de dados críticos `[CONFIRMAR]`
  - Faixa de Atuação por Setor:
    - *Opção Recomendada (sem expor nomes de órgãos sem autorização formal):*  
      `Experiência comprovada em setores estratégicos: Educação Superior e Redes de Ensino [CONFIRMAR], Operação Energética Nacional [CONFIRMAR], Indústria e Manufatura, Varejo e E-commerce.`
    - *Se o dono autorizar formalmente o uso dos nomes:*  
      `CAPES/MEC [CONFIRMAR], ONS [CONFIRMAR], Energia Pecém [CONFIRMAR], Governo MT [CONFIRMAR], Indústria e Varejo.`

---

## 4. Seção 3 — Sobre a Empresa (About)

- **Nova função:** Quem é a empresa e quem é sua liderança técnica (uma única aparição bem enquadrada do fundador).
- **ANTES:**
  - Tagline: `Sobre a EPM DEVTECH`
  - Título: `Uma trajetória técnica, não um discurso de vendas`
  - Texto: `A EPM DEVTECH nasceu da experiência de Elessandro Prestes Macedo, Engenheiro de Software Sênior e Tech Lead, ao longo de mais de 9 anos arquitetando e modernizando plataformas corporativas para instituições que não podem parar. Hoje trabalhamos com metodologia Spec-Driven Development (SDD) combinada a ferramentas modernas de IA, o que garante requisitos rastreáveis, especificações precisas e entregas previsíveis a cada ciclo.`
  - Stats: `+9 Anos de Experiência` \| `4 Setores Críticos` \| `99.9% Uptime em Produção`
  - Box lateral: `Liderança Técnica — Compromisso com arquitetura sólida: Todas as soluções são concebidas sob supervisão técnica direta...`
  - 3 Pilares redundantes: `Arquitetura para Escala`, `Engenharia de Qualidade`, `Governança e Previsibilidade`.
- **DEPOIS:**
  - Tagline: `SOBRE A EPM DEVTECH`
  - Título: `Engenharia de software com visão de negócio`
  - Texto principal:  
    `A EPM DevTech é uma software house dedicada a desenvolver e modernizar sistemas sob medida para empresas que buscam eficiência operacional, estabilidade e capacidade de escala.`  
    `Fundada e liderada tecnicamente por Elessandro Prestes Macedo [CONFIRMAR título: fundador e liderança técnica], a empresa combina mais de 9 anos de experiência técnica [CONFIRMAR] em projetos de alta complexidade com métodos modernos de especificação e desenvolvimento de software (Spec-Driven Development), garantindo escopo claro, comunicação direta e entregas previsíveis.`
  - Indicadores / Fatos Qualitativos (sem números placeholder):
    - `+9 anos` — De experiência da liderança técnica em sistemas corporativos `[CONFIRMAR]`
    - `Direto com a Engenharia` — Sem intermediários comerciais ou camadas burocráticas
    - `Metodologia SDD` — Especificações detalhadas e testes automatizados antes do deploy
  - Box Lateral / Posicionamento de Liderança:
    - Título: `Compromisso com arquitetura sustentável`
    - Texto: `Cada decisão de arquitetura é tomada para resolver o problema atual sem criar gargalos futuros. Você conversa diretamente com quem desenha e implementa a solução.`

---

## 5. Seção 4 — Setores de Atuação (Sectors)

- **Nova função:** Prova de contexto em 4 setores críticos, demonstrando domínio de regras específicas.
- **ANTES:**
  - Título: `Cada setor tem suas próprias regras`
  - Subtítulo: `Backoffice, saúde, indústria: cada um exige uma leitura diferente...`
  - Handles com nomes de clientes: `CAPES · MEC · GOVERNO FEDERAL`, `ONS · ENERGIA PECÉM`.
- **DEPOIS:**
  - Tagline: `CONTEXTOS DE NEGÓCIO`
  - Título: `Experiência em diferentes contextos`
  - Subtítulo: `Projetos desenvolvidos em ambientes com diferentes níveis de complexidade, integração e requisitos operacionais.`
  - Cards (mantendo estrutura 3D e mockups):
    - **Card 01 — Indústria:**  
      - Handle: `OPERAÇÃO & MANUFATURA`  
      - Contexto: Rastreabilidade, automação de chão de fábrica e integração contínua com ERPs corporativos.
    - **Card 02 — Varejo & E-commerce:**  
      - Handle: `ALTO VOLUME & TRANSAÇÕES`  
      - Contexto: Plataformas transacionais, esteiras de checkout seguras e sincronização de estoques em tempo real.
    - **Card 03 — Educação & Gestão Pública:**  
      - Handle: `PLATAFORMAS INSTITUCIONAIS [CONFIRMAR menção a CAPES/MEC]`  
      - Contexto: Sistemas com grande volume de acessos simultâneos, tramitação de editais e conformidade institucional.
    - **Card 04 — Energia & Infraestrutura:**  
      - Handle: `DADOS CRÍTICOS & REGULAÇÃO [CONFIRMAR menção a ONS]`  
      - Contexto: Monitoramento de dados com tolerância zero para inconsistências e consolidação regulatória.

---

## 6. Seção 5 — Serviços (Services)

- **Nova função:** O que podemos desenvolver e resolver para o cliente (condensado em 4 funções claras com frases de gatilho).
- **ANTES:** 6 cards técnicos (SPA, APIs, Integrações, Arquitetura de Software, Modernização, Consultoria).
- **DEPOIS (Consolidação em 4 Cards com frases de dor do cliente):**
  - Tagline: `SERVIÇOS`
  - Título: `Soluções sob medida para cada estágio da sua operação`
  - Subtítulo: `Da criação de um novo produto à modernização de sistemas existentes, atuamos com rigor técnico e foco no resultado do seu negócio.`
  
  - **Card 1: Sistemas Web e Plataformas**
    - *Gatilho de dor:* `Precisa criar um sistema novo ou modernizar a interface da sua operação?`
    - *O que é:* Aplicações web sob medida para operações corporativas, portais e sistemas de gestão internos. Interfaces rápidas, acessíveis e desenhadas para a rotina da sua equipe.
    - *Mockup:* Mockup do navegador (MockBrowser).

  - **Card 2: APIs & Back-end Escalável**
    - *Gatilho de dor:* `Seu sistema atual sofre lentidão em horários de pico ou precisa centralizar regras?`
    - *O que é:* Arquitetura de serviços e APIs desenhadas para suportar alto volume de requisições, garantir baixa latência e sustentar aplicações com estabilidade.
    - *Mockup:* Mockup de API REST (MockAPI).

  - **Card 3: Integrações & Comunicação entre Sistemas**
    - *Gatilho de dor:* `Sua empresa perde tempo com processos manuais porque seus sistemas não conversam?`
    - *O que é:* Conexão segura entre ERPs, CRMs, gateways de pagamento, plataformas legadas e serviços de terceiros via APIs e mensageria em tempo real.
    - *Mockup:* Mockup de Hub de Integração (MockIntegration).

  - **Card 4: Modernização & Evolução de Sistemas**
    - *Gatilho de dor:* `Tem um sistema antigo essencial, mas com alto custo de manutenção e medo de mexer?`
    - *O que é:* Refatoração e migração incremental de plataformas legadas (Strangler Fig Pattern), eliminando dívida técnica e reduzindo custos operacionais sem paralisação do negócio.
    - *Mockup:* Mockup de Diff de código / refatoração (MockMaintenance).

*(Nota de layout: O componente existente de grid comporta 4 ou 6 cards perfeitamente. Os 4 cards cobrem 100% da demanda corporativa sem dispersão conceitual).*

---

## 7. Seção 6 — Tecnologias (Technologies)

- **Nova função:** Como construímos — evidência técnica de capacidade, e não catálogo de vendas.
- **ANTES:**
  - Título: `Stack Tecnológica` (sem subtítulo, caindo direto na constelação interativa).
- **DEPOIS:**
  - Tagline: `STACK E FERRAMENTAS`
  - Título: `Tecnologias que usamos para construir soluções`
  - Subtítulo: `Escolhemos tecnologias de acordo com as necessidades de cada projeto, considerando desempenho, segurança, manutenção e evolução contínua.`
  *(Preserva integralmente o componente TechConstellation com o grafo de nós e conexões).*

---

## 8. Seção 7 — Diferenciais e Processo (Consolidação de Diferenciais e Credenciais)

- **Nova função:** Por que confiar na EPM DevTech (3 pilares sólidos) + Como trabalhamos (processo linear).
- **ANTES:**
  - 6 cards de diferenciais técnicos com termos voltados para desenvolvedor (SonarQube, SOLID, TDD, Rollback).
- **DEPOIS (3 Pilares Fundamentais):**
  - Tagline: `DIFERENCIAIS`
  - Título: `Por que trabalhar com a EPM DevTech`
  - Subtítulo: `Engenharia focada na longevidade do seu software, com transparência em cada etapa.`
  
  - **Pilar 1 — Comunicação Transparente**
    - *Descrição:* Alinhamento contínuo sobre escopo, decisões técnicas e prioridades. Você fala diretamente com quem planeja e executa a engenharia, sem intermediários.
  
  - **Pilar 2 — Engenharia que Facilita Evoluir**
    - *Descrição:* Arquitetura modular e código limpo pensados para facilitar manutenções futuras e permitir que o sistema cresça sem gerar gargalos de infraestrutura.
  
  - **Pilar 3 — Foco no Problema do Negócio**
    - *Descrição:* A tecnologia é uma ferramenta para viabilizar os objetivos da sua empresa, e não o inverso. Escolhas pragmáticas focadas em retorno real e estabilidade.

  - **Linha Secundária de Práticas de Engenharia (abaixo dos cards):**
    - *"Práticas aplicadas conforme o projeto: testes automatizados, revisão contínua de código, integração contínua (CI/CD) e arquitetura orientada à manutenção." [CONFIRMAR]*

  - **Etapas do Processo de Projeto (Como Trabalhamos):**
    1. **Entendemos:** Mapeamos seu contexto, as dores operacionais e os objetivos do negócio.
    2. **Definimos:** Transformamos necessidades em especificações claras, prioridades e arquitetura recomendada.
    3. **Desenvolvemos:** Construção incremental com testes automatizados e validações periódicas.
    4. **Evoluímos:** Deploy seguro em produção, acompanhamento e suporte para evolução contínua. `[CONFIRMAR]`

---

## 9. Seção 8 — FAQ (Dúvidas Frequentes)

- **Nova função:** Eliminar objeções e dúvidas pré-contratuais do comprador.
- **Calibração de copy:**
  - Preservar as 10 perguntas do acordeão, refinando o tom de voz para remover excesso de primeira pessoa ("eu", "minha") substituindo pela perspectiva da empresa ("nós", "a equipe de engenharia").
  - Promessa de tempo de retorno: `"Nosso retorno técnico ocorre em até 24 horas úteis..."` `[CONFIRMAR: Esse prazo de 24h úteis é mantido?]`

---

## 10. Seção 9 — Contato e Conversão Final (Contact)

- **Nova função:** Próximo passo simples e transparente para iniciar a conversa.
- **ANTES:**
  - Título: `Vamos entender o seu desafio`
  - Botão: `Enviar Mensagem`
- **DEPOIS:**
  - Tagline: `PRÓXIMO PASSO`
  - Título: `Fale sobre seu projeto`
  - Subtítulo: `Conte o que sua empresa precisa. Vamos entender o cenário e avaliar como a EPM DevTech pode ajudar.`
  - Botão de envio (CTA único): `Falar sobre meu projeto`
  - Mensagem de Sucesso: `Mensagem enviada com sucesso! [CONFIRMAR: Retornaremos em até 24 horas úteis.]`
  - Mensagem de Erro: `Não foi possível enviar sua mensagem. Verifique os campos destacados ou utilize o contato direto pelo WhatsApp.`
  - Próximos passos (lado escuro):
    1. `Diagnóstico Técnico:` Avaliação inicial da viabilidade e arquitetura.
    2. `Retorno Ágil:` Contato direto com a liderança técnica `[CONFIRMAR prazo]`.
    3. `Sigilo:` Tratamento confidencial das regras do seu negócio.

---

## 11. Seção 10 — Rodapé (Footer)

- **Nova função:** Encerramento institucional sóbrio, links essenciais e dados fiscais.
- **ANTES:** 5 soluções listadas (com SPA e Legados), links de redes pessoais misturados.
- **DEPOIS:**
  - Posicionamento: `EPM DevTech — Desenvolvimento de software sob medida, APIs escaláveis e modernização de plataformas corporativas.`
  - Soluções alinhadas aos 4 cards: `Sistemas Web · APIs & Back-end · Integrações · Modernização de Sistemas`
  - Navegação limpa: `Serviços · Diferenciais · Sobre · Dúvidas · Contato`
  - Dados legais: `© 2026 EPM DEVTECH · CNPJ 60.710.574/0001-85. Todos os direitos reservados.`
  - Links sociais: `[CONFIRMAR se GitHub e LinkedIn devem ser institucionais ou se mantém os perfis profissionais de Elessandro]`

---

_Proposta de copy finalizada para revisão e aprovação do Product Owner._
