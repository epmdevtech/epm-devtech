# SPEC-118 — Blog Técnico com Conteúdo Versionado e Geração Estática

| Campo | Valor |
|---|---|
| **ID** | SPEC-118 |
| **Data** | 2026-10-22 |
| **Autor** | Auditoria Técnica Pré-Blog |
| **Status** | **Aprovada pelo PO em 2026-10-22** |
| **Versão** | 1.0 |
| **Documento de origem** | `docs/blog.md` |
| **Auditoria de validação** | `docs/blog-auditoria-validacao.md` |

> **Nenhuma implementação está autorizada por este documento.** Conforme `AGENTS.md`, a TASK-118 só deve ser criada após a aprovação formal desta SPEC e após a conclusão das correções prévias listadas na seção 9.

---

## 1. Contexto e Motivação

O site é uma SPA React/Vite com React Router 6, prerender parcial em `scripts/prerender.js` e hospedagem Vercel. A auditoria de `docs/blog.md` confirmou que:

- o HTML inicial das rotas pré-renderizadas não contém o corpo das páginas;
- rotas inexistentes retornam HTTP 200 (soft 404);
- o sitemap é manual;
- os testes dependem de contagens fixas de rotas, links e URLs;
- o JSON-LD é global e o `FAQPage` diverge do conteúdo visível;
- não há hidratação (`src/main.tsx` usa `createRoot`, não `hydrateRoot`);
- as dependências de produção incluem uma cadeia crítica liderada por `next`, instalada por causa do pacote não utilizado `geist`.

O blog é a primeira necessidade de conteúdo editorial do projeto. Ele deve ser adicionado sem reescrever a aplicação e sem repetir os problemas de SEO/HTML encontrados.

---

## 2. Objetivo

Adicionar um blog técnico em `/blog` e `/blog/:slug`, com artigos em Markdown versionados no Git, geração estática no build, metadados específicos por artigo, conteúdo completo no HTML inicial, sitemap apenas com artigos publicados e 404 real para slugs inexistentes.

---

## 3. Escopo

### 3.1 Está incluído (IN)

- Conteúdo em `content/blog/<slug>.md` com frontmatter YAML.
- Validação de frontmatter no build.
- Parsing e renderização de Markdown no build, fora do bundle do cliente.
- Manifesto de artigos publicados.
- Geração de `dist/blog/index.html` e `dist/blog/<slug>/index.html`.
- Listagem em `/blog`, em ordem cronológica decrescente.
- Artigo em `/blog/:slug`.
- Estado vazio com CTA para `/contact`.
- Metadados por rota: title, description, canonical, OG/Twitter, `og:type=article`, datas.
- JSON-LD `BlogPosting` por artigo.
- Sitemap gerado no build, apenas com conteúdo publicado.
- 404 real para slug inexistente e para rotas desconhecidas.
- Testes unitários, de integração e E2E contra build de produção.
- Documentação de publicação.
- Artefatos SDD: SPEC, TASK, QA, REVIEW.

### 3.2 Não está incluído (OUT)

- Migração de framework.
- CMS, banco de dados, autenticação ou backend.
- Busca, filtros, tags, paginação ou comentários no MVP.
- Edição de artigos pelo navegador.
- MDX ou execução de componentes React dentro do Markdown.
- Syntax highlighting no MVP.
- Alteração de `middleware.ts` ou dos subdomínios de demonstração.
- Atualização de Tailwind 4, React Router 7 ou Vite 8.
- Correção da dívida preexistente de dependências fora do escopo da seção 9.
- Remoção do padrão de header oculto nas páginas atuais (tarefa separada).

---

## 4. Requisitos Funcionais

1. O sistema deve ler artigos de `content/blog/*.md`.
2. O sistema deve validar `title`, `slug`, `description`, `publishedAt`, `category` e `draft`.
3. O sistema deve rejeitar slug inválido, duplicado, fora do kebab-case ou diferente do nome do arquivo.
4. O sistema deve excluir rascunhos de rotas, listagem, sitemap, relacionados e prerender.
5. O sistema deve gerar `/blog` com os artigos publicados, do mais recente para o mais antigo.
6. O sistema deve gerar `/blog/<slug>` com H1 único, data, categoria, tempo de leitura e conteúdo.
7. O sistema deve retornar 404 real para `/blog/<slug-inexistente>`.
8. O sistema deve gerar `sitemap.xml` com rotas estáticas e artigos publicados.
9. O sistema deve manter as rotas existentes e seus metadados inalterados.
10. O sistema deve exibir estado vazio em `/blog` quando não houver artigo publicado.
11. O sistema deve permitir navegação por teclado e leitores de tela.
12. O sistema deve manter o conteúdo visível no HTML inicial, sem `opacity:0`, `height:0` ou `aria-hidden`.

---

## 5. Requisitos Não-Funcionais

| Requisito | Critério |
|---|---|
| SEO | Title, description, canonical, OG/Twitter e JSON-LD específicos por artigo |
| HTML inicial | Corpo do artigo presente e visível no `dist/blog/<slug>/index.html` |
| Segurança | HTML bruto rejeitado ou sanitizado; metadados escapados; links externos com `rel` |
| Acessibilidade | WCAG 2.1 AA; H1 único; `article`; `time datetime`; foco visível; teclado |
| Performance | Parser de Markdown fora do bundle do cliente; capas com dimensões e `loading` |
| Responsividade | 320px, 768px, 1024px+; código com scroll horizontal acessível |
| Testes | Unitários, integração, E2E de produção e paridade HTML/React |
| Hospedagem | Compatível com Vercel; `404.html`; sem catch-all que devolva 200 |
| Build | Tempo e tamanho compatíveis com o volume inicial; sem regressão nas rotas atuais |

---

## 6. Comportamento Esperado

### Cenário 1: Listagem com artigos publicados

**Dado** que existem artigos com `draft: false`  
**Quando** o visitante acessa `/blog`  
**Então** o HTML inicial contém a listagem com título, resumo, categoria, data e link de cada artigo, e os rascunhos não aparecem.

### Cenário 2: Artigo publicado

**Dado** que o visitante acessa `/blog/<slug>` de um artigo publicado  
**Quando** a página é carregada diretamente  
**Então** o HTML inicial contém H1, corpo do artigo, data, categoria, canonical, OG e `BlogPosting`, sem depender de JavaScript.

### Cenário 3: Slug inexistente

**Dado** que o visitante acessa `/blog/<slug-inexistente>`  
**Quando** a requisição chega à Vercel  
**Então** a resposta é HTTP 404 com a página 404, `noindex`, sem canonical da home e sem `FAQPage`.

### Cenário 4: Rascunho

**Dado** que um arquivo tem `draft: true`  
**Quando** o build é executado  
**Então** nenhum HTML, link, entrada de sitemap ou relacionado é gerado para ele.

### Cenário 5: Estado vazio

**Dado** que não existe artigo publicado  
**Quando** o visitante acessa `/blog`  
**Então** a página exibe uma mensagem editorial e CTA para `/contact`, sem erro e sem conteúdo inventado.

---

## 7. Critérios de Aceitação

- [ ] `/blog` retorna 200 com a listagem publicada no HTML inicial.
- [ ] `/blog/<slug>` retorna 200 com o corpo do artigo no HTML inicial.
- [ ] `/blog/<slug-inexistente>` retorna 404 real.
- [ ] O HTML do artigo não usa `opacity:0`, `height:0` ou `aria-hidden` para o conteúdo principal.
- [ ] Há um único H1 por página.
- [ ] Title, description, canonical, OG/Twitter e `BlogPosting` são específicos do artigo.
- [ ] O sitemap inclui apenas artigos publicados e rotas estáticas.
- [ ] Rascunhos não aparecem em nenhum artefato público.
- [ ] Links externos usam `rel="noopener noreferrer"`.
- [ ] HTML bruto no Markdown é rejeitado ou sanitizado.
- [ ] O parser de Markdown não está no bundle do cliente.
- [ ] O HTML estático e o HTML renderizado pelo React coincidem em H1, título, descrição, canonical e corpo.
- [ ] As rotas existentes continuam com o mesmo status, title, canonical e H1.
- [ ] `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e` passam.
- [ ] O E2E de produção cobre `/blog`, artigo, slug inválido, mobile e teclado.
- [ ] O `404.html` é servido com status 404 no preview da Vercel.

---

## 8. Impactos e Dependências

### 8.1 Arquivos a criar

- `content/blog/*.md`
- `scripts/blog/` (parser, validador, gerador de manifesto e sitemap)
- `src/lib/blog/` (tipos e leitura do manifesto)
- `src/pages/BlogPage.tsx`
- `src/pages/BlogPostPage.tsx`
- `src/components/blog/` (card, artigo, metadados)
- testes unitários e E2E
- `dist/404.html` (gerado no build)
- `specs/SPEC-118-blog-tecnico.md`
- `tasks/TASK-118-blog-tecnico.md` (somente após aprovação)
- `reviews/QA-118.md`
- `reviews/REVIEW-118-blog-tecnico.md`
- documentação de publicação

### 8.2 Arquivos a modificar

- `package.json` (scripts de build; dependências de build)
- `src/config/routes.ts`
- `src/App.tsx`
- `scripts/prerender.js`
- `public/sitemap.xml` (substituído por geração em `dist/`)
- `vercel.json` (404 real; remoção/restrição do catch-all)
- `src/components/layout/Header.tsx` e `Footer.tsx` (se "Blog" for incluído)
- `tailwind.config.ts` e `src/index.css` (se `prose`/estilos de artigo)
- `src/config/__tests__/routes.test.ts`
- `src/components/layout/__tests__/Header.test.tsx`
- `e2e/multi-route-navigation.spec.ts`
- `e2e/design-system-and-stability.spec.ts`
- `public/llms.txt` e `public/llms-full.txt` (se `/blog` entrar em `ROUTES`)
- `PROJECT.md`
- `CHANGELOG.md`

### 8.3 Dependências

- Depende de: correções P0 da auditoria (404 real, sitemap/rotas, pipeline, dependências, metadados, decisão de renderização).
- Bloqueia: nenhum.
- Não depende de CMS, backend ou autenticação.

---

## 9. Pré-requisitos Obrigatórios (P0)

Antes da TASK-118:

1. `dist/404.html` gerado e servido com status 404; catch-all removido ou restrito.
2. Sitemap gerado a partir de fonte única; testes de contagem fixa atualizados.
3. Ordem do build definida para gerar o manifesto antes do `vite build`.
4. `geist` removido; `next`/`sharp` fora da cadeia de produção; patches seguros de dependências aplicados.
5. `FAQPage` restrito a `/faq` e alinhado a `src/config/faq.ts`.
6. `og:image` duplicado corrigido; `twitter:image` adicionado; `robots` preservado após o Helmet.
7. Decisão registrada entre injeção de corpo + `createRoot` (com teste de paridade) ou SSG completo + `hydrateRoot` (SPEC separada).

---

## 10. Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Soft 404 continuar após o blog | Alta | 404.html + remoção do catch-all + E2E de status |
| HTML estático divergir do React | Média | Teste de paridade; fonte única de conteúdo |
| Rascunho vazar para sitemap/listagem | Média | Filtro no manifesto + testes |
| XSS via Markdown | Baixa/Média | Rejeitar HTML bruto ou sanitizar; CSP em tarefa separada |
| Tailwind remover estilos do artigo | Média | Usar `prose`/CSS próprio; não permitir classes arbitrárias |
| Testes de contagem quebrarem | Alta | Atualizar testes para o manifesto, não para números fixos |
| Build ficar mais lento | Baixa | Parser só no build; cache quando necessário |
| Header com 6º link apertar em 1024px | Média | Validar visualmente; considerar apenas footer/home no MVP |
| Regressão nas rotas atuais | Média | Rodar lint, testes, build e E2E de `multi-route-navigation` |

---

## 11. Referências

- `docs/blog.md` — relatório original.
- `docs/blog-auditoria-validacao.md` — auditoria independente.
- `AGENTS.md` — protocolo SDD.
- `docs/workflows.md` — fluxo obrigatório.
- `ADR-007` — slugs de URL em inglês.
- `ADR-004` — deploy na Vercel.
- `src/config/routes.ts`
- `scripts/prerender.js`
- `vercel.json`

---

## 12. Aprovação

| Campo | Valor |
|---|---|
| **Aprovado por** | Elessandro Prestes Macedo (PO) |
| **Data** | 2026-10-22 |
| **Assinatura** | [x] Aprovado [ ] Rejeitado |
| **Observações** | Aprovação registrada. A criação da TASK-118 permanece condicionada à conclusão dos pré-requisitos P0 da seção 9. |

> A SPEC está aprovada. A TASK-118 só deve ser criada após a conclusão e evidência dos pré-requisitos P0 da seção 9, conforme condição aprovada.
