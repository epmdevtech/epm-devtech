# REVIEW-118 — Blog Técnico

| Campo | Valor |
|---|---|
| **ID** | REVIEW-118 |
| **Referência** | TASK-118 / SPEC-118 / ADR-010 / QA-118 |
| **Tipo** | Code Review + QA Review |
| **Data** | 2026-10-22 |
| **Revisor** | Pendente — Elessandro Prestes Macedo |
| **Status** | Pendente de revisão humana |

---

## 1. Escopo Revisado

### Pipeline e conteúdo

- `scripts/blog/config.js`
- `scripts/blog/markdown.js`
- `scripts/blog/articles.js`
- `scripts/blog/generated.js`
- `scripts/blog/render-static.js`
- `scripts/blog/build.js`
- `scripts/serve-dist.js`
- `content/blog/soft-404-em-spa-react.md`

### Cliente

- `src/lib/blog/types.ts`
- `src/lib/blog/manifest.ts`
- `src/components/blog/BlogCard.tsx`
- `src/components/blog/BlogPostMeta.tsx`
- `src/components/blog/ArticleContent.tsx`
- `src/components/blog/BlogEmptyState.tsx`
- `src/pages/BlogPage.tsx`
- `src/pages/BlogPostPage.tsx`
- `src/config/routes.ts`
- `src/App.tsx`
- `src/index.css`
- `src/components/sections/Footer.tsx`

### Build, SEO e testes

- `scripts/site-routes.js`
- `scripts/generate-sitemap.js`
- `scripts/prerender.js`
- `playwright.config.ts`
- `package.json` e `package-lock.json`
- `src/lib/blog/__tests__/articles.test.ts`
- `src/pages/__tests__/BlogPages.test.tsx`
- `e2e/blog-navigation.spec.ts`
- `e2e/blog-production.spec.ts`
- `e2e/blog-parity.spec.ts`
- `src/config/__tests__/routes.test.ts`
- `src/components/sections/__tests__/Footer.test.tsx`
- `docs/blog-publicacao.md`
- `PROJECT.md` e `CHANGELOG.md`

---

## 2. Checklist de Code Review

- [x] TypeScript compila e o build Vite conclui sem erros
- [x] ESLint sem erros e sem warnings
- [x] Nomenclatura consistente com o projeto
- [x] Conteúdo separado do código em `content/blog/`
- [x] Parser Markdown fora do bundle do cliente
- [x] Manifesto gerado antes do Vite
- [x] `src/generated/` ignorado no Git e recriado no build
- [x] Rotas `/blog` e `/blog/:slug` lazy, seguindo o padrão existente
- [x] Link Blog no header desktop e no footer; menu com 6 links validado em 1024px
- [x] Drafts excluídos de listagem, artigo, sitemap e prerender
- [x] Slug validado como kebab-case e igual ao arquivo
- [x] Categorias fechadas e tipadas
- [x] Datas ISO validadas, incluindo `updatedAt >= publishedAt`
- [x] Sitemap com `lastmod` apenas em artigos
- [x] 404 real para slug inexistente e rota desconhecida
- [x] Teste de paridade HTML estático x React
- [x] E2E de produção separado do E2E de dev
- [x] Sem dependência de runtime nova no bundle

---

## 3. Checklist de Segurança

- [x] Markdown renderizado com `html: false`; HTML bruto é escapado
- [x] Links externos recebem `noopener noreferrer`
- [x] Metadados escapados no prerender
- [x] JSON-LD serializado com escape de `<`
- [x] `dangerouslySetInnerHTML` recebe apenas HTML gerado no build, não entrada de usuário em runtime
- [x] Nenhum segredo ou credencial no conteúdo ou nos scripts
- [x] `serve-dist.js` é ferramenta local de QA, não rota de produção
- [x] Capas exigem caminho local em `public/` e existência do arquivo
- [ ] Sanitização de HTML para um futuro CMS permanece fora do escopo

---

## 4. Checklist de SEO e Acessibilidade

- [x] H1 único na listagem e no artigo
- [x] `<title>`, description, canonical e OG por artigo
- [x] `article:published_time`, `article:modified_time` e `article:section`
- [x] `BlogPosting` com autor, publisher, imagem, `mainEntityOfPage` e `wordCount`
- [x] `/blog` com OG `website`
- [x] Sitemap com `/blog` e artigos publicados
- [x] 404 com `noindex, nofollow`, sem canonical/OG/Twitter/JSON-LD
- [x] Conteúdo principal visível no HTML inicial
- [x] Links com foco visível e touch target ≥ 44px
- [x] Navegação mobile e por teclado coberta no E2E
- [x] Blocos de código com `tabindex="0"`, `role="region"` e `aria-label`

---

## 5. Pontos de Atenção

| # | Arquivo | Descrição | Severidade |
|---|---|---|---|
| 1 | `src/pages/BlogPage.tsx` | O estado vazio é testado no componente, mas a página não é exercitada com manifesto vazio; cobertura de branch de `BlogPage.tsx` ficou em 0% nesse ponto. | Menor |
| 2 | `src/components/blog/ArticleContent.tsx` | Usa `dangerouslySetInnerHTML`. É seguro enquanto o HTML vem do build com `html: false`; um CMS futuro exigirá sanitização explícita. | Menor |
| 3 | `scripts/serve-dist.js` | Servidor local de QA; não deve ser usado como servidor de produção nem referenciado no deploy. | Informativo |
| 4 | `vercel.json` | O 404 real só pode ser confirmado no primeiro preview da Vercel. A simulação local usa `serve-dist.js`. | Menor |
| 5 | `package-lock.json` | `gray-matter` e `markdown-it` são devDependencies; a auditoria completa subiu para 28 ocorrências de ferramentas de build/teste. Produção permanece com 2 moderadas. | Informativo |
| 6 | `src/pages/BlogPage.tsx` | A imagem OG da listagem usa `SITE_CONFIG.url`, enquanto o prerender usa `BASE_URL`; ambos apontam para o mesmo domínio, mas a duplicação de fonte pode divergir no futuro. | Menor |

---

## 6. Ações Requeridas

- [ ] Aprovar formalmente a TASK-118 e o REVIEW-118.
- [ ] Confirmar o status 404 real no primeiro preview da Vercel.
- [ ] Decidir se a fonte da URL canônica será unificada (`SITE_CONFIG.url` x `BASE_URL`).
- [ ] Manter a dívida de `react-router` 7.x em SPEC separada.

---

## 7. Decisão Final

| Campo | Valor |
|---|---|
| **Decisão** | ⏳ Pendente de revisão humana |
| **Aprovado por** | — |
| **Data** | — |
| **Observações** | Quality gates verdes: lint 0/0, 307/307 testes, cobertura 99,11% de statements/linhas, build com 10 URLs e 404, 64/64 E2E (incluindo paridade HTML/React, 404 real e contraste AA no Sobre). |

---

## 8. Atualização — conteúdo PHP2Shell e carrossel da Home

- O artigo soft 404 foi substituído pelo artigo de PHP2Shell, com capa SVG, 1.203 palavras e 7 min calculados.
- O CTA "Fale sobre seu projeto" foi removido do fechamento do artigo, tanto no React quanto no HTML estático.
- A Home passou a exibir a seção `#blog` com `BlogNewsCarousel`, card em destaque para um único artigo e setas acessíveis quando houver múltiplos.
- "Ver todos os artigos" foi posicionado no cabeçalho da seção para evitar sobreposição com o botão fixo de voltar ao topo.
- `BlogCard` passou a renderizar capa quando o artigo define `cover`.
- Gates atuais: lint 0/0, 307/307 testes, cobertura 99,11% de statements/linhas, build com 10 URLs e 404, 64/64 E2E.
- A decisão de aprovação humana e a confirmação do 404 na Vercel permanecem pendentes.

---

## 9. Atualização — contraste no Sobre em modo light

- A seção "Nossa Jornada Técnica" em `/about` usava superfícies e bordas escuras fixas (`bg-zinc-950/90`, `border-zinc-800/80`), deixando o texto com contraste insuficiente no modo light.
- A correção trocou as cores fixas por tokens semânticos (`bg-surface`, `border-border-default`, `text-primary/secondary/muted`) em cards, nós e linha conectora; a seção de princípios recebeu o mesmo tratamento.
- Foi adicionado o E2E `Sobre (light): cards da jornada mantêm contraste WCAG AA`, que calcula a luminância e exige razão ≥ 4,5:1 para título, descrição e tag.
- Gates atuais: lint 0/0, 307/307 testes, cobertura 99,11% de statements/linhas, build com 10 URLs e 404, 64/64 E2E.
- Aprovação humana e confirmação do 404 na Vercel continuam pendentes.
