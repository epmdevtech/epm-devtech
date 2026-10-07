# SPEC-112 — Redesign dos Artefatos Visuais de Hero: Dashboards Abstratos & UI Cards de Negócio

| Campo             | Valor                                                                 |
|-------------------|-----------------------------------------------------------------------|
| **ID**            | SPEC-112                                                              |
| **Título**        | Refatoração dos Visuais de Hero com Foco em Decisores e Valor de Negócio |
| **Data**          | 2026-10-07                                                            |
| **Autor**         | Gemini / Antigravity                                                  |
| **Status**        | Aprovado pelo PO                                                      |
| **Implementação** | TASK-112                                                              |

---

## 1. Contexto & Problema de Negócio

Os artefactos visuais de microcircuitos, diodos e terminologia de baixo nível de código (ex: "PCB bus", "Kernel 64-bit", "Diodos de qualidade") comunicavam primariamente com programadores e desenvolvedores de software. No entanto, os verdadeiros tomadores de decisão corporativos — **CEOs, Diretores de Operações (COOs), CFOs e Gestores de Produto/Inovação** — tomam decisões de contratação orientadas a:
1. **Estabilidade Operacional**: Garantia de que a empresa não sofrerá paradas ou perdas de vendas.
2. **Previsibilidade de Entrega**: Certeza de prazos, escopos e visibilidade contínua de progresso sem surpresas de custo.
3. **Retorno sobre o Investimento (ROI)**: Automação, redução de custos com retrabalho e integração com ecossistemas corporativos já existentes (ERPs, nuvem, legados).
4. **Governança & Segurança**: Conformidade, rastreabilidade e proteção de dados em setores regulados.

Substituir diagramas puramente abstratos por **UI Cards de Produto / Dashboards Abstratos de Negócio** traduz a excelência em engenharia da EPM DevTech diretamente em impacto tangível e segurança corporativa.

---

## 2. Diretrizes de Design System para os Novos Artefatos Visuais

1. **Estilo Superficial & Acabamento**:
   - Superfície em vidro fosco sofisticado (`bg-zinc-900/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 shadow-2xl`).
   - Microiluminação com acentos sutis em esmeralda (`#10B981`), ciano (`#06B6D4`) e teal institucional (`#2DD4BF`).
   - Cantos: Chanfrados com geometria de precisão ou cantos arredondados industriais (`rounded-2xl`).
2. **Linguagem Visual Executiva**:
   - Eliminação de código em texto cru, diagramas herméticos de chips ou jargões de depuração.
   - Gráficos de barra/linha limpos em SVG, status de saúde da operação em tempo real ("100% Operacional", "Sincronizado", "99,98% Estabilidade"), indicadores executivos e mini-tabelas limpas.

---

## 3. Especificação por Rota

### 3.1 Home (`/`): `HomeHeroVisual` ("Painel de Orquestração Operacional")
- **Conceito**: Painel executivo mostrando a operação da empresa funcionando com alta estabilidade e sem gargalos.
- **Componentes**:
  - Header: Status "Operação em Tempo Real · 100% Ativa" com pulso esmeralda.
  - Indicadores Executivos:
    - *Transações Processadas*: Volume contínuo em tempo real com indicador de pico.
    - *Sistemas Conectados*: "ERP Corporativo + Nuvem + APIs" sincronizados.
    - *Tempo de Resposta Médio*: "< 85ms (Sem Lentidão)".
  - Card inferior: Seletor executivo rápido de cenários de negócio integrado, preservando a affordance de navegação fluida da Home.

### 3.2 Serviços (`/services`): `ServicesHeroVisual` ("Catálogo Modular de Soluções")
- **Conceito**: 3 cartões empilhados em perspectiva e profundidade representando as verticais de solução:
  - *Card 1*: **Plataformas Web & Portais Internos** — volume de usuários ativos diários e telas corporativas intuitivas.
  - *Card 2*: **Integrações & Conectores de Dados** — fluxo de dados contínuo entre sistemas sem retrabalho manual.
  - *Card 3*: **Modernização de Infraestrutura** — redução de custos e zero interrupção na operação.

### 3.3 Como Trabalhamos (`/how-we-work`): `HowWeWorkHeroVisual` ("Pipeline de Entrega Previsível")
- **Conceito**: Linha do tempo visual orientada a prazos, garantias e previsibilidade orçamentária:
  - *01. Alinhamento Estratégico*: Entendimento do modelo de negócio e requisitos críticos.
  - *02. Arquitetura Segura*: Planeamento prévio sem riscos de bloqueios técnicos futuros.
  - *03. Entregas Quinzenais*: Homologações frequentes com visibilidade total do software funcionando.
  - *04. Validação & Produção*: Entrada em operação suave sem paragens no dia a dia.

### 3.4 Experiência (`/experience`): `ExperienceHeroVisual` ("Impacto e Continuidade de Negócio")
- **Conceito**: Painel executivo comprovando a robustez em operações de grande escala:
  - *Zero Paragens Registadas*: 99,9% disponibilidade comprovada em cenários de alta demanda.
  - *Milhões de Transações & Registos*: Sustentação de operações em setores regulados (Energia, Educação, Indústria).
  - *Picos sem Degradação*: Aplicações preparadas para suportar 10x de demanda sem lentidão.

### 3.5 Engenharia (`/engineering`): `EngineeringHeroVisual` ("Garantia de Qualidade & Blindagem de Código")
- **Conceito**: Matriz visual limpa de integridade e governança de software:
  - *Cobertura Integral de Testes*: Rotinas automatizadas que impedem erros em produção.
  - *Proteção e Integridade de Dados*: Blindagem contra vazamentos e perdas financeiras.
  - *Arquitetura Modular*: Software que a sua empresa consegue manter e evoluir sem dependência exclusiva.

### 3.6 Sobre Nós (`/about`): `src/data/constellationPractices.ts` ("Constelação de Pilares de Confiança")
- **Conceito**: Manutenção da constelação interativa, refatorando os 4 popovers dos nós para linguagem de negócios e valor prático:
  - *Núcleo*: Engenharia voltada aos resultados concretos da sua empresa.
  - *Chave Esquerda*: Comunicação direta entre decisores e liderança técnica.
  - *Chave Direita*: Código de alta sustentabilidade que pertence 100% à sua empresa.
  - *Topo da Moldura*: Previsibilidade de cronogramas e entregas sem surpresas.

---

## 4. Quality Gates

- **Vitest**: 100% dos testes unitários passando (41+ suítes).
- **ESLint**: zero erros.
- **Build**: zero warnings de chunks > 600KB e pré-render estático preservado.
- **Playwright**: 46/46 testes E2E aprovados.
- **Acessibilidade**: WCAG AAA/AA em contraste, `:focus-visible` e `prefers-reduced-motion`.

---

_Aprovado pelo PO: Elessandro Prestes Macedo_
