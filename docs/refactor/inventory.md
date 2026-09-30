# Inventário de Conteúdo da Homepage — EPM DevTech

> Documento gerado na **Fase 1 (Auditoria e Planejamento)**.  
> Mapeamento de todas as seções da homepage, de cima para baixo, avaliando função, redundâncias, densidade técnica e foco (empresa vs. fundador).

---

## 1. Tabela Geral de Seções

| Seção | Função atual | Informação nova que traz | Já apareceu antes? | Muito técnica? | Fala da empresa ou do fundador? | Ação proposta |
|---|---|---|---|---|---|---|
| **Header (Navbar)** | Navegação primária por âncoras e exibição da marca. | Logotipo adaptativo (dark/light) com efeito Typewriter "Software House". | Não (abertura). | Não. | Empresa. | **Preservar**. Alinhar nomes dos links com a nova hierarquia e garantir acessibilidade no mobile. |
| **Hero** | Proposta de valor inicial e conversão primária. | Título principal de software sob medida, subtítulo de serviços e CTAs de ação rápida. | Não. | Média (diagrama de arquitetura e microprova com +9 anos). | Misto (fala de software sob medida, mas traz "+9 anos" sem contexto claro). | **Refatorar copy**: Manter H1 "Desenvolvemos software sob medida para o seu negócio." Padronizar CTA único "Falar sobre meu projeto" (remover concorrência de CTAs). Remover menção a anos de experiência desta seção para não queimar a credencial antes da hora. Preservar componente `HeroArchitecture`. |
| **Autoridade (Authority)** | Faixa de prova social com métricas numéricas e chips de clientes/órgãos. | Métricas de 99,9% uptime, 2.500+ RPS, +448 IES/650 escolas, Zero perda; menção a CAPES, MEC, ONS, Energia Pecém. | Não. | Alta (RPS, arquitetura distribuída, dados regulatórios). | Projetos do fundador apresentados diretamente como da empresa. | **Desacoplar de credenciais autônomas**. Nomes de órgãos (CAPES, MEC, ONS) marcados com `[CONFIRMAR]`. As métricas verdadeiras serão qualificadas e mantidas como prova de contexto, sem tom de currículo pessoal. |
| **Sobre (About)** | Apresentação institucional, biografia técnica do fundador e pilares de engenharia. | Trajetória de Elessandro Prestes Macedo (+9 anos), animated stats (+9 anos, 4 setores, 99.9% uptime), 3 pilares conceituais. | **Sim.** Repete métricas do Hero e da faixa de Autoridade (99.9% uptime, +9 anos). | Alta (SDD com IA, monólitos desacoplados, microsserviços). | **Fundador como produto primário** ("Engenheiro de Software Sênior e Tech Lead"). | **Reposicionar radicalmente**: Focar na EPM DevTech como empresa de engenharia. Apresentar o fundador **uma única vez** como líder técnico. Título "Engenharia de software com visão de negócio". Manter "+9 anos" uma única vez aqui `[CONFIRMAR]`. Remover repetição de números. |
| **Setores (Sectors)** | Demonstração de experiência setorial com 4 cards 3D e mockups. | Aplicação em Indústria, Varejo, Educação e Energia com contexto, problema e experiência. | Parcialmente (CAPES, MEC, ONS reaparecem nos handles). | Moderada (boa divisão contexto/problema/experiência). | Experiência técnica aplicada aos setores. | **Preservar layout 3D e mockups**. Título "Experiência em diferentes contextos". Remover nomes diretos de órgãos sensíveis se não confirmados, substituindo por descrições de setor (`[CONFIRMAR]`). |
| **Serviços (Services)** | Catálogo de 6 serviços com mockups visuais detalhados. | Detalhamento de Sistemas Web, APIs, Integrações, Arquitetura, Legados e Consultoria. | Parcialmente (arquitetura e qualidade já citadas em Sobre). | **Excessiva nos mockups e descrições** (N+1 query, Clean Architecture, BFF, DDD, Strangler Fig). | Serviços da empresa. | **Condensar em 4 funções essenciais**: 1. Sistemas Web, 2. APIs & Back-end, 3. Integrações, 4. Modernização & Evolução. Incorporar perguntas gatilho ("Quando sua empresa precisa...") dentro dos cards. Focar no benefício/dor do comprador antes dos jargões. |
| **Tecnologias (Technologies)** | Exibição de ferramentas e tecnologias via grafo interativo (TechConstellation). | Visualização interativa das linguagens, frameworks, bancos, nuvens e mensageria. | Sim (muitas tecnologias já foram citadas ao longo da página). | Alta (destinada primariamente a desenvolvedores). | Ferramentas dominadas pela empresa. | **Preservar visual e interação**. Ajustar cabeçalho para reposicionar a stack como meio/evidência e não como produto: "Tecnologias que usamos para construir soluções". |
| **Diferenciais (Differentials)** | Pipeline horizontal com 6 cards de processos e qualidade. | 6 diferenciais: Comunicação, Arquitetura, Código Limpo, Padrões, DevOps/CI-CD, Prazos. | **Sim.** Repete fortemente os pilares da seção Sobre e dos Serviços. | Alta (SOLID, SonarQube, Code Review, Rollback). | Processo da empresa. | **Consolidar de 6 para 3 pilares centrais**: 1. Comunicação transparente; 2. Engenharia que facilita evoluir; 3. Foco no problema do negócio. Abaixo do grid, adicionar uma linha discreta sobre práticas de engenharia (`[CONFIRMAR]`). Reduzir carga cognitiva. |
| **FAQ** | Resolução de dúvidas e quebra de objeções em 3 categorias. | Respostas sobre modelos contratuais (escopo vs alocação), legados e atuação 100% remota. | Não. | Moderada. | Empresa e liderança técnica. | **Refinar copy**: Preservar acordeão funcional, calibrar promessas operacionais (ex: resposta em até 24h úteis) com `[CONFIRMAR]`. Assegurar que responde as dúvidas do comprador corporativo. |
| **Contato (Contact)** | Conversão final, formulário de captura e garantia de retorno. | Campos do formulário e coluna escura com próximos passos (Diagnóstico, Retorno 24h, Sigilo). | Não (é o destino de conversão). | Baixa. | Atendimento direto da engenharia. | **Unificar CTA** para "Falar sobre meu projeto" no botão. Ajustar textos para tom receptivo e consultivo. Manter validação e campos. Marcar garantia de 24h com `[CONFIRMAR]`. |
| **Rodapé (Footer)** | Encerramento, links secundários, dados cadastrais e modais legais. | CNPJ, localização em Toledo/PR, links de soluções e navegação, modais LGPD. | Sim (reúne links de seções anteriores). | Não. | Empresa. | **Enxugar e alinhar**: Sincronizar catálogo de soluções com os 4 serviços consolidados. Manter dados cadastrais, CNPJ e seletor de tema neutro. |

---

## 2. Redundâncias Críticas Detectadas

1. **A métrica "+9 anos de experiência":**
   - Aparece no `index.html` (meta description), no `Index.tsx` (SEO_META), no `Hero.tsx` (microprova), no `About.tsx` (subtitle e animated stat) e no JSON-LD.
   - *Correção:* Manter **uma única vez** no site inteiro, dentro da seção **Sobre**, atribuída honestamente como experiência do fundador e liderança técnica (`[CONFIRMAR]`).
2. **Métricas de Infraestrutura repetidas (99.9% uptime, 2.500 RPS):**
   - Aparecem na seção `Authority.tsx`, na seção `About.tsx`, no JSON-LD e nos textos de SEO.
   - *Correção:* Manter a métrica consolidada na seção de autoridade/experiência e não duplicar nos stats do Sobre.
3. **Nomes de Órgãos Públicos e Clientes (CAPES, MEC, ONS, Energia Pecém):**
   - Aparecem no SEO description, no JSON-LD, na faixa de autoridade, nos handles dos cards de setores e no FAQ.
   - *Risco:* Se esses projetos foram desenvolvidos enquanto o fundador atuava como colaborador/PJ em outra integradora (ex: Datainfo, AMcom), não podem ser anunciados como contratos diretos da EPM DevTech sem autorização explícita e contexto factual correto.
   - *Correção:* Substituir por descrição de contexto de setor ("Educação", "Energia") e manter os nomes sob tag `[CONFIRMAR]`.
4. **Pilares de Engenharia redundantes:**
   - A seção `About.tsx` lista 3 pilares ("Arquitetura para Escala", "Engenharia de Qualidade", "Governança e Previsibilidade").
   - A seção `Differentials.tsx` lista 6 cards ("Comunicação", "Arquitetura", "Código Limpo", "Padrões", "DevOps", "Entregas").
   - A seção `Services.tsx` tem cards dedicados para "Arquitetura de Software" e "Consultoria Técnica e Code Review".
   - *Correção:* Concentrar a proposta de valor nos **3 Pilares de Diferenciais**, removendo a sobreposição conceitual do Sobre e mantendo Serviços focados em *entregáveis práticos para o negócio*.

---

## 3. Dispersão de Chamadas para Ação (CTAs Concorrentes)

Atualmente encontram-se variações ativas no projeto:
- Hero: `"Falar sobre meu projeto"` + `"Conhecer a EPM"`
- FAQ: `"Fale diretamente com a equipe técnica →"`
- Contact: `"Enviar Mensagem"` / `"Chamar no WhatsApp direto →"`
- Meta description atual: `"Solicite um orçamento."`
- Headings: `"Vamos entender o seu desafio"` / `"Envie sua mensagem"`

*Correção obrigatória:* Unificar a ação principal em **"Falar sobre meu projeto"** (botão do Hero, formulário de contato e metadados). CTA secundário (onde couber): **"Conhecer a EPM DevTech"**.

---

## 4. O Fundador como Produto vs. Empresa de Engenharia

| Onde ocorre | Como está hoje | Problema identificado | Direção após refatoração |
|---|---|---|---|
| `About.tsx` | "A EPM DEVTECH nasceu da experiência de Elessandro Prestes Macedo, Engenheiro de Software Sênior e Tech Lead..." | Tom de currículo (bio pessoal). | Apresentar a EPM DevTech como software house e enquadrar Elessandro como fundador e liderança técnica. |
| `index.html` (Author) | `<meta name="author" content="Elessandro Prestes Macedo \| EPM DEVTECH" />` | Mistura autor pessoa física com empresa. | Padronizar autor como "EPM DevTech". |
| `index.html` (JSON-LD) | `Person` com lista massiva de tecnologias (`knowsAbout`) e faculdade. | Detalhamento excessivo de perfil profissional. | Enxugar `Person` vinculada como `founder` da organização. |
| Título Profissional | "Engenheiro de Software" | Uso de "Engenheiro" tem reserva técnica no Brasil (CREA/CONFEA). | Substituir por "fundador e liderança técnica" (`[CONFIRMAR]`). |

---

_Inventário concluído para validação pelo Product Owner._
