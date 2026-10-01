# SPEC-001-phase1-audit-proposal.md

## Objetivo
Realizar auditoria completa da homepage da **EPM DevTech**, abrangendo estrutura técnica, conteúdo, SEO, performance, acessibilidade e gerar proposta de copy para a fase 2.

## Escopo da tarefa
| Área | Atividades |
|------|------------|
| **Auditoria técnica** | Identificar framework, rotas, estrutura de pastas, componentes de seção, arquivos de conteúdo, textos hard‑coded. Listar design‑system, tokens, bibliotecas de animação. Analisar formulário de contato (campos, validação, envio, tratamento de erro/sucesso). Mapear analytics e scripts de terceiros. Extrair metadados atuais (title, description, keywords, canonical, OG/Twitter, favicon, manifest, JSON‑LD). Verificar modo de renderização (SSG/SSR vs SPA) e seu impacto em SEO/AC. Executar Lighthouse (performance, acessibilidade, SEO, boas práticas) e registrar baseline.
| **Inventário de conteúdo** | Criar tabela da homepage (seção → função atual → informação nova → redundância → etc.) conforme modelo solicitado. Destacar redundâncias, placeholders, linguagem em primeira pessoa e aparições do fundador.
| **Metadados** | Confirmar itens listados em seu briefing (descrição, OG, author, keywords, imagem OG, JSON‑LD, sitemap, robots, canonical, `lang`).
| **Proposta de copy** | Para cada seção (Hero, Sobre, Setores/Experiência, Serviços, Tecnologias, Diferenciais, Credenciais, Processo, CTA final, Footer) apresentar **ANTES → DEPOIS**. Marcar `[CONFIRMAR]` em todas as afirmações factuais novas. Indicar nova função da seção.
| **Plano e pendências** | Listar priorização de problemas encontrados. Definir plano de alterações por arquivo/componente (ex.: `src/components/sections/Hero.tsx`). Enumerar pendências que precisam da aprovação do dono (porte da empresa, título do fundador, clientes citáveis, prazo de resposta, perfis sociais, etc.). Identificar riscos técnicos (ex.: renderização apenas no cliente).
| **Entregáveis** | `docs/refactor/audit.md` (detalhamento técnico e resultados do Lighthouse). `docs/refactor/inventory.md` (tabela de conteúdo). `docs/refactor/copy-proposal.md` (ANTES → DEPOIS, marcações `[CONFIRMAR]`). `docs/refactor/plan.md` (lista de alterações, pendências, riscos). |

## Critérios de aceite (QA)
- Nenhum arquivo de código‑fonte é modificado nesta fase.
- Todos os documentos acima são criados dentro da pasta `docs/refactor/`.
- Cada afirmação factual nova está claramente marcada `[CONFIRMAR]`.
- O relatório de Lighthouse inclui *performance, acessibilidade, SEO, boas‑práticas* (score ≥ 80 % antes de mudanças).
- O plano indica exatamente quais arquivos/componentes serão alterados na fase 2, sem extrapolar o escopo.
- Todas as pendências são listadas com perguntas claras para o Product Owner.

## Restrições (conforme brief)
- **Não** haverá redesign visual, adição de bibliotecas, criação de rotas ou novos componentes.
- **Não** inventaremos fatos; quaisquer novos dados recebem `[CONFIRMAR]`.
- **Não** alteraremos o layout; apenas reorganizaremos ou condensaremos conteúdo dentro dos componentes existentes.

## Prazo proposto
- **Entrega da documentação**: 2 dias úteis após a aprovação desta SPEC.

## Próximos passos
1. Revisar este documento e confirmar se está alinhado com suas expectativas.
2. Aprovar a SPEC (responder “Aprovo” ou sugerir ajustes).

> **⚠️ Importante:** Nenhuma alteração de código será feita antes da fase 2. Só iniciaremos a criação das tarefas (`/tasks/...`) após a sua aprovação explícita.
