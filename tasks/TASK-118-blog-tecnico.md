# TASK-118 — Blog Técnico com Conteúdo Versionado e Geração Estática

| Campo | Valor |
|---|---|
| **ID** | TASK-118 |
| **SPEC** | SPEC-118 (aprovada em 2026-10-22) |
| **ADR** | ADR-010 (injeção estática + `createRoot` com teste de paridade) |
| **Pré-requisitos** | TASK-119 concluída (P0) |
| **Data de início** | 2026-10-22 |
| **Agente** | OpenCode |
| **Status** | Concluída — aguardando review humano |

---

## Escopo da Implementação

Implementar o MVP do blog técnico em `/blog` e `/blog/:slug`, com:

- artigos em `content/blog/*.md` com frontmatter YAML validado no build;
- parser/renderizador de Markdown fora do bundle do cliente;
- manifesto gerado antes do `vite build`;
- listagem estática e artigo estático no HTML inicial;
- metadados por artigo, `BlogPosting` e sitemap com artigos publicados;
- 404 real para slug inexistente;
- rascunhos excluídos de todos os artefatos públicos;
- estado vazio com CTA para `/contact`;
- testes unitários, de integração e E2E.

### Fora de escopo

- CMS, backend, autenticação, busca, filtros, tags, paginação, comentários;
- MDX, componentes React no Markdown ou syntax highlighting;
- migração de framework, Tailwind 4, React Router 7 ou Vite 8;
- alteração de `middleware.ts` ou subdomínios de demonstração;
- inclusão do link "Blog" no header desktop e no footer; menu desktop com 6 links validado em 1024px sem colisão.

---

## Decisões de Implementação

1. **Parser:** `gray-matter` para frontmatter e `markdown-it` com `html: false` para o corpo. Dependências apenas de build (`devDependencies`).
2. **Manifesto:** `scripts/blog/build.js` gera `src/generated/blog-manifest.json` e `src/generated/blog/<slug>.json`. `src/generated/` é ignorado no Git e recriado em `dev`, `test`, `test:coverage` e `build`.
3. **Cliente:** a listagem lê o manifesto; a página de artigo lê os JSONs gerados via `import.meta.glob`. Nenhum parser de Markdown entra no bundle.
4. **HTML estático:** `scripts/prerender.js` injeta a listagem e o corpo do artigo dentro de `#root`, visíveis, sem `opacity:0`, `height:0` ou `aria-hidden`.
5. **Paridade:** o HTML estático e o React usam os mesmos metadados e o mesmo HTML de corpo gerado no build.
6. **Segurança:** HTML bruto do Markdown é escapado (`html: false`); links externos recebem `rel="noopener noreferrer"`; metadados são escapados; JSON-LD escapa `<`.
7. **Categorias fechadas:** `Engenharia`, `Arquitetura`, `Segurança`, `Dados`.
8. **Artigo inicial:** um artigo real sobre o problema de soft 404 em SPA, baseado nas evidências da TASK-119.
9. **Header:** sem novo link no desktop; "Blog" entra na navegação do footer.
10. **Sitemap:** `/blog` e artigos publicados, com `lastmod` real quando houver data.

---

## Arquivos a Criar

| Arquivo | Descrição |
|---|---|
| `content/blog/soft-404-em-spa-react.md` | Artigo inicial publicado e posteriormente substituído pelo artigo de PHP2Shell |
| `content/blog/php2shell-vulnerabilidades-criticas-php.md` | Artigo publicado: PHP2Shell (7 min, capa SVG) |
| `scripts/blog/config.js` | Categorias, metadados do índice e caminhos |
| `scripts/blog/markdown.js` | Renderização segura do Markdown |
| `scripts/blog/articles.js` | Leitura, validação, manifesto e metadados |
| `scripts/blog/render-static.js` | HTML estático da listagem e do artigo |
| `scripts/blog/build.js` | CLI de geração dos artefatos |
| `scripts/blog/generated.js` | Leitura dos artefatos gerados pelo prerender |
| `scripts/serve-dist.js` | Servidor estático local com 404 real para QA |
| `src/lib/blog/types.ts` | Tipos do manifesto e do artigo |
| `src/lib/blog/manifest.ts` | Leitura do manifesto e dos artigos no cliente |
| `src/components/blog/BlogCard.tsx` | Card da listagem |
| `src/components/blog/BlogPostMeta.tsx` | Data, categoria e tempo de leitura |
| `src/components/blog/ArticleContent.tsx` | Corpo do artigo |
| `src/components/blog/BlogEmptyState.tsx` | Estado vazio |
| `src/pages/BlogPage.tsx` | Listagem `/blog` |
| `src/pages/BlogPostPage.tsx` | Artigo `/blog/:slug` |
| `docs/blog-publicacao.md` | Guia de publicação |
| `reviews/QA-118.md` | Evidências de QA |
| `reviews/REVIEW-118-blog-tecnico.md` | Review |
| `src/pages/__tests__/BlogPages.test.tsx` | Testes das páginas do blog |
| `src/lib/blog/__tests__/articles.test.ts` | Validação, HTML seguro, drafts e sitemap |
| `e2e/blog-navigation.spec.ts` | E2E de navegação no cliente |
| `e2e/blog-production.spec.ts` | E2E do build de produção e 404 real |
| `e2e/blog-parity.spec.ts` | Paridade HTML estático x React |

## Arquivos a Modificar

| Arquivo | Mudança |
|---|---|
| `package.json` | Scripts `predev`/`pretest` e build do blog |
| `package-lock.json` | Dependências de build |
| `.gitignore` | Ignorar `src/generated/` |
| `src/config/routes.ts` | Rota `blog` |
| `src/App.tsx` | Rotas `/blog` e `/blog/:slug` |
| `src/components/sections/Footer.tsx` | Link "Blog" |
| `src/index.css` | Estilos `.article-prose` |
| `scripts/site-routes.js` | Metadados de `/blog` |
| `scripts/generate-sitemap.js` | Suporte a `lastmod` |
| `scripts/prerender.js` | Listagem e artigos estáticos |
| `src/config/__tests__/routes.test.ts` | Nova rota e sitemap |
| `playwright.config.ts` | Projetos dev e production |
| `public/llms.txt` e `public/llms-full.txt` | Referência ao blog |
| `PROJECT.md` e `CHANGELOG.md` | Estado e registro |

---

## Checklist de Implementação

- [x] Frontmatter validado com erros claros
- [x] Slug kebab-case, único e igual ao arquivo
- [x] Rascunhos fora de listagem, artigo, sitemap e prerender
- [x] Manifesto gerado antes do Vite
- [x] `/blog` com listagem e estado vazio
- [x] `/blog/:slug` com H1 único, data, categoria e leitura
- [x] HTML inicial com corpo visível
- [x] Metadados e `BlogPosting` por artigo
- [x] Sitemap com artigos publicados
- [x] 404 real para slug inexistente
- [x] Links externos seguros
- [x] Parser fora do bundle
- [x] Teste de paridade HTML/React

---

## Checklist de Testes

- [x] `npm run lint`
- [x] `npm test`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] Verificação de `dist/blog/index.html`, `dist/blog/<slug>/index.html` e `dist/sitemap.xml`
- [x] Verificação de status 404 em servidor estático

---

## Evidências de Conclusão

| Verificação | Resultado |
|---|---|
| Lint | `eslint .` sem erros/warnings |
| Testes unitários | 46 arquivos, 307/307 testes |
| Cobertura | statements/linhas 99,11%; branches 87,54%; funções 87,00% |
| Build | Vite + prerender + sitemap com 10 URLs + `dist/404.html` |
| HTML de `/blog` | Título, H1, canonical, listagem e link do artigo no HTML inicial |
| HTML do artigo | Título, H1, canonical, OG `article`, `BlogPosting` e corpo visível |
| 404 real | `/blog/slug-inexistente` e rota aleatória retornam HTTP 404 |
| Sitemap | `/blog` e `/blog/php2shell-vulnerabilidades-criticas-php` com `lastmod` |
| E2E | 64/64 (57 dev + 7 production, incluindo carrossel da home, paridade, mobile, teclado e contraste AA no Sobre) |
| Auditoria | Produção: 2 moderadas; completa: 28 (dev/build) |

Detalhes completos em `reviews/QA-118.md`.

---

## Notas do Agente

- Nenhum commit, push ou deploy será executado nesta task.
- A aprovação humana do REVIEW-118 é obrigatória antes de release.
