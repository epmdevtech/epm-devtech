# SPEC-034 — GEO/Rich Snippets: FAQPage Expandido, Service Schemas com Métricas Reais e Meta Descriptions com Foco em Conversão

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| **ID**        | SPEC-034                                                     |
| **Título**    | GEO/Rich Snippets: FAQPage + Service Schemas + Meta Descriptions |
| **Prioridade**| Alta — Alto Retorno (GEO/Rich Snippets)                      |
| **Origem**    | Demanda PO — 2026-09-08                                      |
| **Autor**     | Elessandro Prestes Macedo                                    |
| **Status**    | ✅ Aprovada                                      |
| **Data**      | 2026-09-08                                                   |

---

## Contexto e Motivação

O site atualmente possui:
- FAQPage com 7 perguntas genéricas no JSON-LD do `index.html`
- Service schemas sem métricas quantitativas reais
- Meta descriptions funcionais, mas sem gatilhos de conversão

O Google e os motores de busca com IA (ChatGPT, Perplexity, Claude) priorizam conteúdo com:
1. **Dados quantitativos verificáveis** (métricas de projetos reais)
2. **FAQ estruturado e detalhado** (elegível para Rich Snippets e respostas de IA)
3. **Meta descriptions com CTA claro e proposta de valor específica**

As métricas abaixo foram extraídas do currículo real de Elessandro Prestes Macedo e representam resultados comprovados de projetos executados.

---

## Métricas Reais Extraídas do Currículo

### Projetos de Referência

| Projeto | Empresa | Setor | Métricas Chave |
|---------|---------|-------|----------------|
| SIPREC | Datainfo/CAPES | Educação Federal | 10.000 usuários simultâneos, 2.500 RPS, latência <300ms, 448 IES |
| SISCAD | Datainfo/CAPES | Educação Federal | Milhares de processos de cobrança automatizados, arquitetura resiliente |
| SIGMA | Energia Pecém | Energia | Rastreabilidade +40%, falhas operacionais -35%, uptime 99,9% |
| GENIN | AMcom/ONS | Energia Elétrica | 100% integridade de dados, latência -40%, deploy -60%, uptime 99,9% |
| Xadrez Online | Intellectus/Governo MT | Educação/Governo | 650 escolas, 141 municípios, MTTR -50%, custos -35% |
| ERP Corporativo | Grupo Paraíso | Indústria | Eficiência operacional +30%, manutenção -40% |
| Modernização Legado | EPM DEVTECH | Geral | 56.400 linhas removidas, 2.399 testes, 384 rotas/endpoints, retrabalho -40% |
| SonarQube/QA | Datainfo | Qualidade | Qualidade de código +45%, vulnerabilidades críticas reduzidas |
| IA/SDD | Datainfo | Produtividade | Entrega de features por sprint +25% |
| Arquitetura Assíncrona | Energia Pecém | Energia | Capacidade de processamento +50%, gargalos eliminados |
| AWS CI/CD | AMcom/ONS | Cloud | Deploy -60%, disponibilidade 99,9% |
| ELK Stack | Intellectus | Observabilidade | MTTR -50% |

---

## Escopo

### 1. JSON-LD: FAQPage Expandido (no `index.html`)

**Remover** as 7 perguntas genéricas atuais e **substituir** por 10 perguntas de alta intenção de busca, organizadas em 3 categorias:

**Categoria A — Credibilidade e Casos de Uso (Rich Snippets de autoridade):**
1. "O que é a EPM DEVTECH e qual é sua especialidade?"
2. "Quais projetos de grande porte a EPM DEVTECH já entregou?"
3. "Quais setores a EPM DEVTECH já atendeu?"
4. "Quais são as métricas e resultados comprovados da EPM DEVTECH?"

**Categoria B — Serviços e Stack (intenção de contratação):**
5. "Quais serviços de desenvolvimento de software a EPM DEVTECH oferece?"
6. "Qual é a stack tecnológica da EPM DEVTECH?"
7. "A EPM DEVTECH trabalha com modernização de sistemas legados?"
8. "A EPM DEVTECH oferece DevOps e infraestrutura Cloud?"

**Categoria C — Processo e Contratação (bottom of funnel):**
9. "Como funciona o processo de contratação da EPM DEVTECH?"
10. "A EPM DEVTECH atende clientes fora de Toledo-PR?"

As respostas devem conter as métricas reais dos projetos listados acima.

---

### 2. JSON-LD: Service Schemas Detalhados (no `index.html`)

**Enriquecer** os 6 schemas de Service existentes com:
- `description` detalhada com métricas reais de projetos concluídos
- Exemplos concretos de entregas (`serviceOutput`)
- Resultado esperado com números verificáveis

**Serviços e métricas associadas:**

| Serviço | Dados a adicionar |
|---------|-------------------|
| Desenvolvimento Web e SPAs | CAPES/MEC: 10.000 usuários simultâneos, 2.500 RPS, <300ms latência, 448 IES |
| APIs REST e Backends Escaláveis | ONS: 100% integridade, deploy -60%, 99,9% uptime; Energia Pecém: processamento +50% |
| Modernização de Legados | EPM: 56.400 linhas removidas, retrabalho -40%, Strangler Fig Pattern; Grupo Paraíso: manutenção -40% |
| Arquitetura de Software | 384 rotas/endpoints, 2.399 testes automatizados, Clean Architecture, DDD, Event-Driven |
| DevOps e Cloud | AWS CodeBuild, API Gateway, CloudWatch; deploy -60%, 99,9% uptime; CI/CD GitHub Actions |
| Consultoria Técnica | SonarQube: qualidade +45%; features/sprint +25%; 650 escolas, 141 municípios integradas |

---

### 3. Meta Descriptions com Foco em Conversão (em `src/pages/Index.tsx`)

Reescrever todas as 6 meta descriptions do objeto `SEO_META` seguindo o framework:
**[Proposta de valor específica] + [Prova social/métrica] + [CTA claro]**

| Rota | Description atual (antes) | Description proposta (depois) |
|------|--------------------------|-------------------------------|
| `/` (home) | "Software house especializada em desenvolvimento web, APIs escaláveis e arquitetura de sistemas. +9 anos de experiência. PHP, Laravel, Node.js, React, AWS, Docker." | "Software house que entregou sistemas para CAPES, ONS e Energia Pecém: 2.500 RPS, 10.000 usuários simultâneos e 99,9% de uptime. PHP, Laravel, Node.js, AWS. Solicite seu orçamento." |
| `/sobre` | "Conheça a EPM DEVTECH: fundada por Elessandro Prestes Macedo, Engenheiro de Software Sênior com +9 anos construindo sistemas críticos para CAPES, ONS, Governo e Indústria. Arquitetura sólida, código limpo." | "Fundada por Elessandro Prestes Macedo — Tech Lead com +9 anos em sistemas críticos para CAPES, ONS e Indústria. 56.400 linhas de legado eliminadas, 2.399 testes automatizados. Conheça nossa história." |
| `/servicos` | "Desenvolvimento web, APIs REST escaláveis, modernização de legados, arquitetura de microsserviços, DevOps/AWS e consultoria técnica. Atendemos Educação, Energia, Indústria e E-commerce." | "APIs escaláveis a 2.500 RPS, modernização de legados com Strangler Fig Pattern, DevOps AWS com 99,9% uptime. Projetos para CAPES, ONS, Governo e Indústria. Veja nossos serviços." |
| `/tecnologias` | "PHP, Laravel, Symfony, Node.js, React, TypeScript, PostgreSQL, AWS, Docker, Kubernetes, RabbitMQ e Kafka. Stack completo de engenharia de software da EPM DEVTECH." | "Stack enterprise comprovada em produção: PHP/Laravel, Node.js, React, PostgreSQL, AWS, Docker, RabbitMQ e Kafka. Mesma tecnologia usada em sistemas do ONS e CAPES. Explore nossa stack." |
| `/diferenciais` | "Código limpo, arquitetura planejada, CI/CD robusto, comunicação transparente e prazos cumpridos. Descubra os diferenciais técnicos da EPM DEVTECH." | "Qualidade de código +45% via SonarQube, entrega de features +25% com IA aplicada, deploy automatizado com rollback. Não vendemos promessas — entregamos métricas. Veja nossos diferenciais." |
| `/contato` | "Tem um projeto em mente? Fale com a EPM DEVTECH: elessandro@epmdevtech.com.br ou WhatsApp (45) 99917-8290. Retorno em até 24h úteis." | "Tem um sistema crítico para construir ou modernizar? Retorno técnico em até 24h úteis. E-mail: elessandro@epmdevtech.com.br · WhatsApp: (45) 99917-8290. Solicite um orçamento agora." |

---

## Arquivos Afetados

| Arquivo                    | Operação | Descrição                                             |
|----------------------------|----------|-------------------------------------------------------|
| `index.html`               | Editar   | FAQPage com 10 perguntas + Service schemas enriquecidos |
| `src/pages/Index.tsx`      | Editar   | Reescrever 6 meta descriptions com foco em conversão  |

---

## Critérios de Aceitação

- [ ] FAQPage com 10 perguntas validadas no Google Rich Results Test
- [ ] Cada Service schema com métricas reais e `description` ≥ 200 caracteres
- [ ] Todas as 6 meta descriptions reescritas (≤ 160 caracteres cada)
- [ ] JSON-LD válido (sem erros de sintaxe)
- [ ] `npm run build` sem erros
- [ ] `npm run lint` zero erros
- [ ] `npm run test:coverage` sem regressões
- [ ] localhost confirmado pelo PO antes do push

---

## Quality Gates

| Gate           | Critério                                    |
|----------------|---------------------------------------------|
| Build          | `npm run build` sem erros                   |
| TypeScript     | Zero erros de compilação                    |
| Lint           | `npm run lint` — zero erros                 |
| Testes         | 124/124 passando, cobertura ≥ 98%           |
| JSON-LD        | Válido segundo schema.org                   |

---

## Aprovação

| Papel          | Nome                        | Assinatura | Data       |
|----------------|-----------------------------|------------|------------|
| Product Owner  | Elessandro Prestes Macedo   | ✅ Aprovado | 2026-09-08 |

---

_SPEC gerada por Gemini/Antigravity em 2026-09-08 com base em métricas reais do currículo do PO_
