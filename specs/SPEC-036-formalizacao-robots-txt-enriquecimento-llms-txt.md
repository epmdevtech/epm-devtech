# SPEC-036: Formalização de robots.txt para Bots de IA e Enriquecimento de llms.txt e llms-full.txt

| Campo         | Valor                                                                               |
|---------------|-------------------------------------------------------------------------------------|
| **ID**        | SPEC-036                                                                            |
| **Título**    | Formalização de robots.txt para Bots de IA e Enriquecimento de llms.txt / llms-full.txt |
| **Prioridade**| Alta (SEO Técnico, GEO, Descoberta por Modelos de Linguagem e RAG)                   |
| **Origem**    | Demanda PO (2026-09-08)                                                             |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                      |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo - 2026-09-08)                 |
| **Data**      | 2026-09-08                                                                          |

---

## 1. Contexto e Motivação

Com a conclusão da SPEC-035 (reorganização narrativa em 10 etapas, nova seção de Setores de Atuação e reestruturação da FAQ com 10 perguntas de desmistificação/objeções), os arquivos de leitura automatizada e consumo de IA ficaram desatualizados em relação à nova arquitetura do site.

Motores de busca com inteligência artificial generativa (ChatGPT/SearchGPT, Perplexity AI, Claude/Anthropic, Google Gemini/AI Overviews, Apple Intelligence, Copilot, Cohere) e indexadores LLM utilizam arquivos de regras e contexto semântico (`robots.txt`, `llms.txt`, `llms-full.txt` e `sitemap.xml`) para sintetizar respostas e citar fontes em consultas corporativas.

Além disso, conforme diretrizes do projeto:
- Todo o conteúdo deve adotar português brasileiro natural, sem o uso de travessões artificiais de IA (`—`), utilizando hifens (`-`), vírgulas, parênteses ou dois-pontos;
- As métricas de autoridade devem manter fidelidade factual absoluta aos dados reais verificados do fundador (CAPES, ONS, Energia Pecém, Governo MT, Grupo Paraíso);
- O site deve fornecer descoberta transparente de contexto de IA através de tags de cabeçalho no `index.html`.

---

## 2. Escopo Detalhado

### 2.1. `public/robots.txt`
Formalização completa de permissão de rastreamento para todos os principais bots de IA e motores de busca modernos:
- **Padrão:** `User-agent: *` com `Allow: /` e `Disallow: /src/`.
- **OpenAI:** `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`.
- **Perplexity AI:** `PerplexityBot`.
- **Anthropic:** `ClaudeBot`, `Claude-Web`, `anthropic-ai`.
- **Google:** `Google-Extended`, `Googlebot`.
- **Microsoft:** `Bingbot`.
- **Meta AI:** `FacebookBot`.
- **Apple:** `Applebot-Extended`, `Applebot`.
- **Outros indexadores de LLM:** `Bytespider` (ByteDance), `CCBot` (Common Crawl), `Diffbot`, `cohere-ai`.
- **Permissão explícita:** Garantir acesso livre a `/llms.txt`, `/llms-full.txt` e `/sitemap.xml`.
- **Metadados:** Referências ao `Sitemap` e notas de contexto para LLMs.
- **Higienização de texto:** Substituição de travessões `—` por hifens normais `-`.

### 2.2. `public/llms.txt` (Resumo Estruturado para LLMs)
Atualização do arquivo padrão de entrada para modelos de linguagem com:
- Identificação da empresa e do fundador (Elessandro Prestes Macedo, +9 anos de experiência);
- Ordem narrativa das 10 etapas do site: Hero, Autoridade, Sobre, Setores, Serviços, Tecnologias, Diferenciais, FAQ, Contato, Rodapé;
- Apresentação concisa dos 4 Setores de Atuação: Indústria (manufatura e chão de fábrica), Varejo (e-commerce e checkout), Educação (CAPES/MEC e plataformas federais) e Energia (ONS e sistemas de alta criticidade);
- Apresentação dos 6 Serviços Principais alinhados aos problemas reais resolvidos;
- As 10 perguntas e respostas da FAQ organizadas por categoria (Contratação, Sistemas Existentes, Processo e Engenharia com SDD);
- Métricas factuais consolidadas (CAPES 10.000 usuários e 2.500 RPS; ONS 99,9% uptime e deploy -60%; Energia Pecém +50% capacidade; Governo MT 650 escolas em 141 municípios; 56.400 linhas de legado removidas);
- Links canônicos e referência ao `llms-full.txt`.

### 2.3. `public/llms-full.txt` (Contexto Completo e Aprofundado)
Versão estendida de alta densidade semântica para RAG, grounding e bots de pesquisa avançada:
- Perfil institucional completo, canais oficiais e localização (Toledo, PR com atuação nacional/remota);
- Detalhamento aprofundado dos 4 Setores com a tríade: Contexto Operacional, Desafio/Problema Resolvido e Solução de Engenharia da EPM DEVTECH;
- Detalhamento dos 6 Serviços com entregáveis, stack e cases reais correspondentes;
- Stack tecnológica categorizada com níveis de proficiência (Backend, Frontend, Banco de Dados, Infraestrutura/DevOps, Qualidade);
- Métricas detalhadas por projeto com validação factual;
- Íntegra das 10 perguntas e respostas humanizadas do FAQ;
- Arquitetura de informação da landing page e metodologia Spec-Driven Development (SDD);
- Higienização textual completa: zero travessões `—`.

### 2.4. `public/sitemap.xml`
- Adição das rotas que possuem tratamento dedicado de SEO em `src/pages/Index.tsx`:
  - `https://epmdevtech.com.br/setores` (priority: 0.8)
  - `https://epmdevtech.com.br/faq` (priority: 0.7)
- Atualização da data `lastmod` de todas as entradas para `2026-09-08`.

### 2.5. `index.html` (Auto-descoberta e Harmonização)
- Inclusão no `<head>` das tags de link para descoberta automática de arquivos LLM por agentes autônomos:
  ```html
  <link rel="alternate" type="text/plain" href="/llms.txt" title="EPM DEVTECH Contexto LLM" />
  <link rel="alternate" type="text/plain" href="/llms-full.txt" title="EPM DEVTECH Contexto LLM Completo" />
  ```
- Revisão dos textos em JSON-LD (`FAQPage`) para garantir ausência de travessões artificiais `—` e total consonância com as 10 perguntas reais da FAQ atualizada.

---

## 3. Critérios de Aceitação e Quality Gates

1. **robots.txt:**
   - Sintaxe válida e legível por analisadores padrão de robots.txt;
   - Contempla todos os User-agents listados;
   - Sem caracteres `—`;
   - Aponta para `sitemap.xml` e faz referência a `llms.txt`.
2. **llms.txt e llms-full.txt:**
   - Formato Markdown semântico válido;
   - Alinhados com a arquitetura de 10 seções do site;
   - Incluem os 4 setores (`Indústria`, `Varejo`, `Educação`, `Energia`);
   - FAQ com as 10 perguntas reais organizadas nas 3 categorias;
   - Sem travessões artificiais `—`;
   - Apenas dados factuais verificados.
3. **sitemap.xml:**
   - XML válido com schema sitemaps.org;
   - Contém `/setores` e `/faq` além das rotas existentes;
   - `lastmod` atualizado para `2026-09-08`.
4. **index.html:**
   - Links `rel="alternate"` presentes no `<head>`;
   - JSON-LD válido sem erros de sintaxe e sem travessões `—`.
5. **Quality Gates do Projeto:**
   - `npm run lint` -> 0 erros;
   - `npm run test:coverage` -> cobertura >= 90% (todas as suítes passando);
   - `npm run build` -> sem chunks > 600KB e build concluído com sucesso.

---

## 4. Plano de Implementação

1. Criar `tasks/TASK-036-formalizacao-robots-txt-enriquecimento-llms-txt.md` após aprovação do PO;
2. Atualizar `public/robots.txt`;
3. Atualizar `public/llms.txt`;
4. Atualizar `public/llms-full.txt`;
5. Atualizar `public/sitemap.xml`;
6. Atualizar `index.html` (links de auto-descoberta e sincronização de FAQPage);
7. Executar testes automatizados, linter e build;
8. Elaborar `reviews/QA-036.md`;
9. Atualizar `PROJECT.md` e `CHANGELOG.md`;
10. Apresentar ao PO para validação final.
