# SPEC-051 — Rodada 2: Veracidade, Redundância, Estrutura e Sites Institucionais

| Campo             | Valor                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| **Título**        | Rodada 2: Veracidade, Redundância, Estrutura e Sites Institucionais         |
| **Autor**         | Gemini/Antigravity (Pair Programming com Elessandro Prestes Macedo)        |
| **Status**        | Aprovada                                                                    |
| **Data**          | 2026-09-30                                                                  |
| **Versão**        | 0.0.51                                                                      |
| **Tipo**          | Refatoração de Conteúdo, Arquitetura da Informação, UX Writing e SEO        |

---

## 1. Contexto e Motivação

Após a conclusão da primeira rodada (SPEC-049 / TASK-050 / QA-050), a revisão minuciosa do site em execução no `localhost:8070` identificou oportunidades críticas de aprimoramento em quatro eixos fundamentais:
1. **Veracidade e Risco Contratual**: Remoção de métricas de desempenho sem comprovação documental no repositório (bloco de autoridade com 99,9%, 2.500+ RPS, etc.) e suavização de expressões absolutas ("inviolável", "Zero Perdas", "100%", "sem parada").
2. **Redundância e Densidade**: Eliminação de repetições conceituais entre seções (menções repetidas a setores, "fala direto com o desenvolvedor", jargões técnicos internos como SDD e Strangler Fig Pattern no fluxo de leitura leigo).
3. **Estrutura e Fluxo da Homepage**: Reordenação para alinhamento ideal `Hero → Serviços → Como trabalhamos (Processo) → Diferenciais → Tecnologias → Setores (Evidência) → Sobre → FAQ → Contato → Footer`.
4. **Novo Serviço — Sites Institucionais**: Inclusão de demanda real de sites institucionais e portais corporativos sem enfraquecer o posicionamento central de software sob medida.

---

## 2. Requisitos e Escopo

### 2.1 Veracidade e Linguagem Contratual
- **Remoção do Bloco de Autoridade/Métricas**: Como o repositório não dispõe de telemetria ou evidências contratuais diretas da EPM DevTech para os números `99,9%`, `2.500+ RPS`, `Zero Perda` e `Multi-setor`, o componente/bloco `Authority` é removido da visualização principal. Fica registrado como pendência para o PO comprovar contextos específicos no futuro.
- **Diagrama de Arquitetura do Hero**: Substituir termos com tom de garantia contratual por descrições de prática:
  - `"Zero Perdas"` → `"Processamento resiliente"`
  - `"Multi-Região"` → `"Redundância"`
  - `"CDN Global"` → `"Entrega otimizada"`
  - `"Alta Disponibilidade"` → `"Foco em disponibilidade"`
  - `"Alta Vazão"` → `"Escalável"`
- **Suavização de Promessas Absolutas**:
  - Padrão inviolável → Prática de processo.
  - Retorno em 24h → Retorno em até 24 horas úteis.
  - Segurança absoluta → Tratados com confidencialidade, com NDA quando solicitado.
  - Sem parada operacional → De forma incremental, reduzindo o risco de interrupção.
  - Tolerância a falhas / tempo real → Foco em confiabilidade e consistência dos dados.
- **Atribuição de Experiência nos Setores**: Redação voltada à experiência da liderança técnica ("Experiência em...") em vez de verbos de entrega corporativa da empresa ("Executamos", "Desenvolvemos").

### 2.2 Redundância e Jargão
- **Setores**: Apresentados exclusivamente na seção de evidência ("Experiência em diferentes contextos").
- **Sobre**: Manter apenas o stat "9+ anos de experiência técnica". Condensar a liderança técnica em parágrafo sóbrio sobre o papel do fundador na arquitetura, sem repetição de pilares.
- **"Fala direto com quem desenvolve"**: Restrito ao pilar 01 de Diferenciais e pontualmente no FAQ.
- **Jargões Internos**: SDD mantido apenas no FAQ explicado para leigos. "Strangler Fig Pattern" substituído por migração gradual.

### 2.3 Estrutura da Homepage e "Como Trabalhamos"
- Nova ordem de renderização:
  1. `Hero`
  2. `Serviços` (`#servicos`)
  3. `Como Trabalhamos` (`#como-trabalhamos`) — componente de processo 01-04 (Entendemos, Definimos, Desenvolvemos, Evoluímos).
  4. `Diferenciais` (`#diferenciais`)
  5. `Tecnologias` (`#tecnologias`)
  6. `Setores` (`#setores`)
  7. `Sobre` (`#sobre`)
  8. `FAQ` (`#faq`)
  9. `Contato` (`#contato`)
  10. `Footer`
- Header e Footer sincronizados com a nova ordem.
- FAQ enxugado de 10 para 8 perguntas estratégicas.

### 2.4 Sites Institucionais
- Primeiro card de Serviços: *"Sistemas Web, Portais e Sites Institucionais"*.
- Formulário de Contato: inclusão da opção *"Site Institucional"* no select de projetos.
- FAQ: Pergunta 8 abordando sites institucionais e portais corporativos.
- Footer: link renomeado para *"Sistemas, Portais e Sites"*.
- Sem alteração no H1, meta description ou foco central em software sob medida.

### 2.5 Ajustes Menores
- Placeholder do telefone com DDD regional de Toledo/PR: `(45) 99999-9999`.
- Metadados: remoção de `twitter:creator` pessoal não confirmado.
- Análise de renderização inicial (SSG/client-side) documentada.

---

## 3. Quality Gates
1. `npx tsc --noEmit` — 0 erros.
2. `npm run lint` — 0 erros.
3. `npm run test` — 100% de testes unitários passando.
4. `npm run test:coverage` — Cobertura mantida ≥ 90%.
5. `npm run test:e2e` — 100% de testes E2E Playwright passando.
6. `npm run build` — Build de produção limpo sem chunks > 600KB.
7. **Sem commit**: Alterações retidas na branch `develop` para validação humana.
