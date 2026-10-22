# Blog Técnico — Guia de Publicação

| Campo | Valor |
|---|---|
| **SPEC** | SPEC-118 |
| **ADR** | ADR-010 |
| **Task** | TASK-118 |
| **Local** | `content/blog/*.md` |
| **Rotas** | `/blog` e `/blog/:slug` |

---

## 1. Como o blog funciona

O blog é versionado no próprio repositório. Cada artigo é um arquivo Markdown em `content/blog/`, com frontmatter YAML validado durante o build.

```text
content/blog/
└── php2shell-vulnerabilidades-criticas-php.md

public/blog/
└── php2shell-cover.svg
```

O pipeline executa:

```text
npm run dev / npm test / npm run build
  └─ node scripts/blog/build.js
       ├─ valida o frontmatter
       ├─ renderiza o Markdown com markdown-it (html: false)
       ├─ gera src/generated/blog-manifest.json
       └─ gera src/generated/blog/<slug>.json

npm run build
  └─ vite build
       └─ node scripts/prerender.js
            ├─ injeta a listagem em dist/blog/index.html
            ├─ injeta o corpo em dist/blog/<slug>/index.html
            ├─ gera metadados, canonical, OG e BlogPosting
            └─ gera dist/sitemap.xml
```

`src/generated/` é ignorado no Git. Os artefatos são recriados por `predev`, `pretest`, `pretest:coverage`, `pretest:watch` e no início do `build`.

---

## 2. Estrutura de um artigo

```md
---
title: "Título do artigo com pelo menos 10 caracteres"
slug: "titulo-do-artigo"
description: "Descrição entre 50 e 200 caracteres, usada em SEO e nos cards."
publishedAt: "2026-10-22"
updatedAt: null
category: "Engenharia"
draft: false
cover: null
---

Primeiro parágrafo do artigo.

## Um subtítulo

Conteúdo em Markdown.
```

### Campos obrigatórios

| Campo | Regra |
|---|---|
| `title` | 10 a 120 caracteres |
| `slug` | kebab-case, único e igual ao nome do arquivo sem `.md` |
| `description` | 50 a 200 caracteres |
| `publishedAt` | data ISO `AAAA-MM-DD` válida |
| `category` | `Engenharia`, `Arquitetura`, `Segurança` ou `Dados` |
| `draft` | `true` ou `false` |
| corpo | não pode estar vazio |

### Campos opcionais

| Campo | Regra |
|---|---|
| `updatedAt` | data ISO `AAAA-MM-DD` igual ou posterior a `publishedAt` |
| `cover` | objeto `{ src, alt, width, height }` ou `null` |

Exemplo de capa:

```yaml
cover:
  src: "/og-image-1200x630.png"
  alt: "Descrição objetiva da imagem"
  width: 1200
  height: 630
```

O `src` precisa começar com `/` e existir em `public/`. Sem capa, o artigo usa `/og-image-1200x630.png`.

---

## 3. Publicar um artigo

1. Crie `content/blog/<slug>.md` com o frontmatter acima.
2. Use `draft: true` enquanto o texto não estiver pronto.
3. Rode `npm run blog:build` para validar frontmatter e gerar os artefatos.
4. Rode `npm run dev` e abra `http://localhost:5213/blog`.
5. Confira o artigo em `http://localhost:5213/blog/<slug>`.
6. Rode `npm run lint`, `npm test` e `npm run build`.
7. Valide o build estático:

```bash
node scripts/serve-dist.js 5214
```

Abra `http://localhost:5214/blog` e `http://localhost:5214/blog/<slug>`.

8. Rode `npm run test:e2e`.
9. Atualize `CHANGELOG.md` e `PROJECT.md` quando a entrega for aprovada.

> Não faça commit, push ou deploy sem autorização explícita do Product Owner.

---

## 4. Rascunhos

Com `draft: true`, o artigo:

- não aparece em `/blog`;
- não gera rota estática em `dist/blog/<slug>/`;
- não entra no sitemap;
- não é retornado por `getBlogArticle`;
- não é escrito em `src/generated/blog/`.

Para publicar, altere para `draft: false` e rode o build novamente.

---

## 5. Markdown suportado

O renderizador usa `markdown-it` com `html: false`. Isso significa:

- títulos, parágrafos, listas, tabelas, citações, links e imagens funcionam;
- HTML bruto no Markdown é escapado;
- blocos de código são renderizados como `<pre><code>`;
- links externos recebem `target="_blank"` e `rel="noopener noreferrer"`;
- não há syntax highlighting, MDX ou componentes React no corpo.

Para usar um recurso novo de Markdown, altere `scripts/blog/markdown.js` e cubra com teste em `src/lib/blog/__tests__/articles.test.ts`.

---

## 6. SEO e metadados

Cada artigo publicado gera automaticamente:

- `<title>` no formato `Título | Blog EPM DevTech`;
- `meta description`;
- canonical absoluto;
- Open Graph `article`, com `article:published_time`, `article:modified_time` e `article:section`;
- Twitter Card;
- JSON-LD `BlogPosting`;
- entrada no `dist/sitemap.xml` com `lastmod`.

A listagem `/blog` gera canonical, description e OG `website`.

O `BlogPosting` usa o nome do autor definido em `scripts/blog/config.js`. Para mudar autor, URL, imagem padrão ou metadados do índice, edite esse arquivo.

---

## 7. Categorias

As categorias são fechadas para evitar taxonomia inconsistente:

- `Engenharia`
- `Arquitetura`
- `Segurança`
- `Dados`

Adicionar uma categoria exige alteração em:

1. `scripts/blog/config.js`;
2. `src/lib/blog/types.ts`;
3. testes de validação;
4. SPEC ou adição de escopo aprovada.

---

## 8. Validação e erros comuns

O build falha com mensagem clara quando:

| Erro | Correção |
|---|---|
| `slug deve ser igual ao nome do arquivo` | Renomeie o arquivo ou ajuste o `slug` |
| `slug deve estar em kebab-case` | Use apenas `a-z`, `0-9` e hífens |
| `description deve ter entre 50 e 200 caracteres` | Ajuste o texto |
| `category deve ser uma das opções` | Use uma categoria fechada |
| `draft é obrigatório` | Adicione `draft: true` ou `false` |
| `cover.src não existe em public` | Crie o arquivo ou corrija o caminho |
| `frontmatter YAML inválido` | Verifique aspas, dois-pontos e indentação |
| `o corpo do artigo está vazio` | Adicione conteúdo após o frontmatter |

Para validar sem subir o site:

```bash
npm run blog:build
```

---

## 9. Testes

| Suíte | Cobertura |
|---|---|
| `src/lib/blog/__tests__/articles.test.ts` | Frontmatter, slug, drafts, Markdown seguro, sitemap |
| `src/pages/__tests__/BlogPages.test.tsx` | Listagem, artigo, 404 e estado vazio |
| `src/components/blog/__tests__/BlogNewsCarousel.test.tsx` | Carrossel da home, links e controles acessíveis |
| `e2e/blog-navigation.spec.ts` | Navegação no cliente, carrossel da home, metadados e footer |
| `e2e/blog-production.spec.ts` | HTML inicial, 404 real, sitemap, mobile e teclado |
| `e2e/blog-parity.spec.ts` | Paridade entre HTML estático e React |

Comandos:

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

O projeto Playwright usa dois alvos:

- `chromium`: dev server em `5213`;
- `production`: `dist/` em `5214`, servido por `scripts/serve-dist.js`.

O `pretest:e2e` executa o build antes da suíte de produção.

---

## 10. Capa, listagem e carrossel da home

O campo opcional `cover` aponta para uma imagem local em `public/`. A capa é usada no card da listagem `/blog`, no carrossel da home e como imagem OG do artigo.

```yaml
cover:
  src: "/blog/php2shell-cover.svg"
  alt: "Descrição objetiva da imagem"
  width: 1200
  height: 630
```

A home exibe os até 5 artigos mais recentes no componente `BlogNewsCarousel`. Com apenas um artigo, ele aparece como card em destaque e as setas são omitidas. Com dois ou mais, o carrossel ganha navegação por setas, scroll horizontal com snap e foco visível. Em ambos os casos, há o link "Ver todos os artigos" para `/blog`.

Os artigos não exibem CTA de contato no rodapé. O fechamento mantém apenas o link "Voltar para o blog", tanto no HTML estático quanto no React.

---

## 11. Limites do MVP

Fora do escopo desta entrega:

- CMS ou painel editorial;
- busca, filtros, tags e paginação;
- comentários;
- MDX e componentes React no Markdown;
- syntax highlighting;
- múltiplos autores;
- feed RSS;
- imagens otimizadas automaticamente.

Esses itens exigem nova SPEC.
