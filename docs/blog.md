# Blog — Auditoria de Viabilidade e Infraestrutura

| Campo | Valor |
|---|---|
| **Status** | Auditoria histórica — implementação concluída na TASK-118 |
| **Data** | 2026-10-22 |
| **Escopo** | Análise da arquitetura atual e viabilidade de blog |
| **Branch analisada** | `develop` (`develop...origin/develop`, limpa) |
| **Alterações de código** | Nenhuma |

> **Atualização 2026-10-22:** este documento registra a auditoria histórica anterior à implementação. O blog foi implementado na TASK-118; consulte `docs/blog-publicacao.md` para o guia operacional.

---

## 1. Objetivo

Registrar a auditoria do site da EPM DevTech e responder, com base no código real:

- qual é a arquitetura atual;
- como as páginas são renderizadas e indexadas;
- quais componentes e padrões podem ser reaproveitados;
- quais riscos de regressão existem;
- se é possível adicionar um blog sem reescrever a aplicação;
- qual estratégia de conteúdo, renderização e SEO é recomendada.

Este documento é apenas de análise. Nenhuma rota, componente, configuração ou dependência foi criada ou alterada.

---

## 2. Evidências executadas

| Verificação | Resultado |
|---|---|
| `npm run test` | 42 arquivos, 285 testes, todos passando |
| `npm run lint` | zero erros |
| `git status` | limpo, sem alterações pendentes |
| `npm audit --omit=dev` | 17 vulnerabilidades: 1 critical, 11 high, 5 moderate |
| `curl https://epmdevtech.com.br/services` | 200, title/canonical pré-renderizados, H1 oculto no HTML |
| `curl https://epmdevtech.com.br/blog` | 200 com HTML da home (soft 404 — blog não existe) |
| `curl https://epmdevtech.com.br/rota-inexistente-1234` | 200 (soft 404) |
| `curl https://epmdevtech.com.br/servicos` | 308 permanente → `/services` |
| `curl https://epmdevtech.com.br/services/` | 200 (variante com trailing slash) |

Build de produção e testes E2E **não** foram executados nesta auditoria, pois escrevem em `dist/` e `test-results/`. Os resultados acima refletem o estado do repositório e do site no momento da análise.

---

## 3. Arquitetura identificada

### 3.1 Stack

- **Front-end:** React 18, TypeScript, Vite 5, Tailwind CSS 3, shadcn/ui e Radix UI.
- **Roteamento:** React Router 6 (`BrowserRouter`).
- **Metadados:** `react-helmet-async`.
- **Animação/scroll:** Framer Motion, GSAP, Lenis, hooks próprios de scroll reveal.
- **Formulário:** EmailJS, configurado por `VITE_EMAILJS_*`.
- **Analytics:** `@vercel/analytics` e `@vercel/speed-insights`, carregados de forma diferida.
- **Gerenciador de pacotes:** npm (`package-lock.json`).
- **Hospedagem:** Vercel.
- **CI:** GitHub Actions (`npm ci`, lint, testes e build em push/PR para `main`/`develop`). E2E não roda no CI.

### 3.2 Build e publicação

```json
"build": "vite build && node scripts/prerender.js"
```

O `scripts/prerender.js` roda **depois** do Vite e grava HTML específico em `dist/<rota>/index.html`. A Vercel serve arquivos estáticos antes de aplicar o rewrite SPA, o que foi confirmado pelo HTML pré-renderizado de `/services` em produção.

O `vercel.json` contém:

- redirects permanentes das URLs legadas;
- headers para a imagem OG;
- rewrite de fallback para `/index.html`;
- nenhuma configuração de status 404 real.

O `middleware.ts` atua apenas nos subdomínios de demonstração (`odontologia` e `brs`), com proxy reverso e headers de segurança. Não interfere no site principal nem no blog.

### 3.3 Estrutura relevante

```
src/
├── App.tsx                  # rotas
├── config/
│   ├── routes.ts            # fonte única de rotas
│   ├── site.ts              # dados institucionais
│   └── faq.ts               # padrão de conteúdo tipado
├── pages/                   # páginas por rota
├── components/
│   ├── layout/              # Layout, Header, PageHero
│   ├── sections/            # seções e Footer
│   └── ui/                  # shadcn e componentes próprios
├── hooks/                   # useScrollReveal etc.
└── lib/                     # utilitários

scripts/prerender.js         # geração de HTML estático
public/                      # sitemap, robots, llms, imagens
```

Não há banco de dados, API, autenticação, CMS ou pasta de conteúdo editorial.

---

## 4. Rotas e páginas existentes

Fonte única: `src/config/routes.ts:9`. Rotas montadas em `src/App.tsx`.

| Rota | Página |
|---|---|
| `/` | `src/pages/Home.tsx` |
| `/services` | `ServicesPage` |
| `/how-we-work` | `HowWeWorkPage` |
| `/experience` | `ExperiencePage` |
| `/engineering` | `EngineeringPage` |
| `/about` | `AboutPage` |
| `/contact` | `ContactPage` |
| `/faq` | `FAQPage` |
| `*` | `NotFound` |

Existem 11 redirecionamentos legados em `LEGACY_REDIRECTS`, espelhados em `vercel.json`. Os slugs canônicos são em inglês, com conteúdo visual em pt-BR (ADR-007).

Não existe rota, componente, SPEC ou configuração de blog. `src/pages/Index.tsx` é legado: não está roteado, mas ainda é exercitado por testes.

---

## 5. Estratégia atual de renderização

### 5.1 Diagnóstico

O site é uma **SPA com renderização no cliente (CSR)** e **prerender parcial**.

O `scripts/prerender.js`:

1. copia `dist/index.html` para `dist/<rota>/index.html`;
2. substitui `<title>`, meta description, canonical e OG/Twitter;
3. injeta um cabeçalho oculto com um `<h1>` e um parágrafo.

Trecho relevante (`scripts/prerender.js:127`):

```html
<header style="opacity:0;height:0;overflow:hidden" aria-hidden="true">
  <h1>...</h1>
  <p>...</p>
</header>
```

### 5.2 O que está no HTML inicial

| Elemento | Presente no HTML inicial? |
|---|---|
| Title específico por rota | Sim |
| Meta description | Sim |
| Canonical | Sim |
| OG/Twitter básicos | Sim |
| H1 | Sim, porém oculto |
| Conteúdo principal (corpo) | **Não** |
| Links internos do corpo | **Não** |
| JSON-LD específico por rota | **Não** (o JSON-LD é global) |
| Conteúdo do artigo | Não aplicável (blog não existe) |

O HTML inicial de `/services` foi inspecionado em `dist/services/index.html` e no site em produção: o `#root` contém apenas o cabeçalho oculto. O restante depende da execução de JavaScript.

### 5.3 Implicações para o blog

Repetir o padrão atual no blog não atenderia ao requisito de conteúdo indexável. Crawlers que não executam JavaScript, scrapers sociais e LLMs não veriam o corpo dos artigos. Para o blog, é necessário gerar o conteúdo no HTML estático, não apenas o título e a descrição.

---

## 6. SEO e sitemap

### 6.1 O que já existe

- Title, description, canonical, OG e Twitter por página via `react-helmet-async`.
- Canonicals absolutos nas rotas existentes.
- `public/sitemap.xml` estático com 8 URLs.
- `public/robots.txt` com `Allow: /`, referência ao sitemap e permissão explícita para crawlers de IA.
- `public/llms.txt` e `public/llms-full.txt` com contexto institucional.
- JSON-LD global com `WebSite`, `ProfessionalService`, `Person` e `FAQPage`.

### 6.2 Problemas preexistentes

| Problema | Evidência |
|---|---|
| Corpo das páginas ausente no HTML inicial | `scripts/prerender.js:127` |
| H1 pré-renderizado oculto (`opacity:0`, `aria-hidden`) | `scripts/prerender.js:127` |
| `og:image` duplicado | `index.html:34` e `index.html:45` |
| `FAQPage` no JSON-LD global de todas as rotas | `index.html:308` |
| Rotas inexistentes retornam HTTP 200 | `vercel.json` rewrite + SPA |
| `/blog` retorna 200 antes de existir | comportamento do catch-all |
| Trailing slash retorna 200 | `/services/` e `/blog/` |
| Sitemap manual e com teste de igualdade exata | `src/config/__tests__/routes.test.ts:42` |
| `lastmod` fixo em `2026-10-03` | `public/sitemap.xml` |
| Documentação fala em 301, produção responde 308 | `vercel.json` + `curl` |

O 308 é permanente e equivalente ao 301 para GET; a divergência é documental.

---

## 7. Componentes reutilizáveis

### 7.1 Layout e navegação

- `src/components/layout/Layout.tsx` — skip link, `main`, Header, Footer, ScrollManager.
- `src/components/layout/Header.tsx` — navegação desktop/mobile, foco e `aria-current`.
- `src/components/sections/Footer.tsx` — navegação, contato, tema e links legais.
- `src/components/routing/ScrollManager.tsx` — scroll e foco no H1 em troca de rota.

### 7.2 Conteúdo e UI

- `PageHero`, `PageHeader`, `SectionHeader`, `SectionWrapper`.
- `Card`, `Badge`, `Button`, `MagneticButton`, `Separator`, `Accordion`.
- `BrandChipIcon`.
- `useScrollReveal`.
- Tokens de cor, tipografia e espaçamento em `src/index.css` e `tailwind.config.ts`.

`@tailwindcss/typography` está instalado, mas **não habilitado** em `tailwind.config.ts`. Para o blog, é preciso habilitá-lo ou criar estilos próprios de artigo.

O padrão `src/config/faq.ts` (dados tipados + página) é o precedente mais próximo para conteúdo estruturado.

---

## 8. Limitações identificadas

1. Não há infraestrutura de conteúdo (Markdown/MDX/CMS).
2. Não há biblioteca de parsing de Markdown.
3. O prerender tem rotas hardcoded e não gera corpo de conteúdo.
4. O sitemap é manual e validado por igualdade exata.
5. A lista de rotas é duplicada entre `routes.ts`, `prerender.js` e `sitemap.xml`.
6. Não há status HTTP 404 real.
7. O Header foi originalmente desenhado para 5 links; o 6º link (Blog) foi adicionado e validado em 1024px sem colisão.
8. HTML gerado por Markdown não é coberto pelo `content` do Tailwind, com risco de purge.
9. O E2E usa `npm run dev` e testa CSR, não o HTML de `dist/`.
10. `tsconfig.app.json` usa `strict: false`, o que reduz a proteção de tipos em novos modelos de conteúdo.
11. O site não tem conteúdo publicado, então o blog nasceria vazio.

---

## 9. Segurança e dependências

### 9.1 Código

- Não há segredos em `src/`, `index.html` ou `public/`.
- `.env` está no `.gitignore`; `.env.example` contém apenas chaves vazias.
- Único uso de `dangerouslySetInnerHTML`: `src/components/ui/chart.tsx:70`, com conteúdo estático do shadcn.
- Links externos existentes usam `rel="noopener noreferrer"`.
- EmailJS usa chave pública no cliente, por design.

### 9.2 Dependências

`npm audit --omit=dev` reporta:

- 1 critical: `next` (transitivo de `@vercel/analytics`, `@vercel/speed-insights` e `geist`);
- 11 high: `lodash`, `sharp`, `postcss`, `chokidar`, `micromatch`, `nanoid`, `picomatch`, `braces`, `fast-glob`, `source-map-js`, `tailwindcss`;
- 5 moderate: `react-router`, `@remix-run/router`, `baseline-browser-mapping`, `postcss-selector-parser`.

`next` e `sharp` não aparecem no bundle final de `dist/assets`. A maior parte das ocorrências está em ferramentas de build. Ainda assim, é dívida de segurança a ser tratada em tarefa separada; não deve ser misturada com o blog.

`geist` está em `dependencies`, mas não é importado no `src` (a fonte é carregada do Google Fonts). Higiene de dependências, fora do escopo do blog.

---

## 10. Acessibilidade e performance

### 10.1 O que já existe

- Skip link para `#conteudo-principal`.
- `main` com `aria-label`.
- Foco visível com `focus-visible`.
- `aria-current="page"` nos links ativos.
- Menu mobile com `aria-expanded`, `aria-controls`, fechamento por Escape e devolução de foco.
- `prefers-reduced-motion` respeitado no scroll e nas animações.
- Foco no H1 após troca de rota.
- Fontes carregadas de forma não bloqueante.

### 10.2 Requisitos para o blog

- Um único H1 por página.
- `article`, `time datetime`, hierarquia correta de H2/H3.
- Cards com link no título, sem elementos interativos aninhados.
- Código com scroll horizontal e foco por teclado.
- Contraste validado nos temas claro e escuro.
- Capas com `width`, `height`, `alt` e `loading` adequado.
- Sem animações novas além do reveal existente.
- Conteúdo pré-renderizado visível, não oculto, para evitar aparência de cloaking.

---

## 11. Viabilidade do blog

**É viável adicionar o blog sem reescrever a aplicação.**

A arquitetura atual suporta novas rotas, novos componentes e novas páginas. O design system é reutilizável. O ponto crítico não é o roteamento, e sim a **renderização do conteúdo**: o prerender atual não entrega o corpo das páginas no HTML.

A solução de menor complexidade é **conteúdo versionado no Git + geração estática no build**, sem CMS, banco, API ou autenticação.

---

## 12. Alternativas avaliadas

| Critério | A — Markdown no Git | B — CMS headless |
|---|---|---|
| Publicação | Commit + build | Painel editorial |
| Custo operacional | Baixo | Médio/alto |
| Dependências externas | Nenhuma | Fornecedor, autenticação, limites |
| SEO estático | Sim, no próprio build | Exige webhook + prerender mesmo assim |
| Segurança | Superfície mínima | Tokens, autenticação, conteúdo remoto |
| Adequação ao volume inicial | Alta | Desnecessária |
| Editor não técnico | Baixa/média | Alta |
| Complexidade de manutenção | Baixa | Média/alta |

### Decisão recomendada

**Alternativa A.** O projeto é mantido pelo próprio responsável técnico, o volume inicial é pequeno e não há requisito de fluxo editorial colaborativo. Um CMS só se justifica com publicação frequente por pessoa não técnica.

### Limitações da alternativa A

- Publicar exige commit e build.
- Sem editor visual.
- Sem agendamento nativo.
- O conteúdo cresce no repositório.
- Mudanças de slug exigem redirect manual.
- O conteúdo precisa ser validado no build.

---

## 13. Estratégia recomendada

### 13.1 Conteúdo

- Artigos em `content/blog/<slug>.md`, com frontmatter YAML.
- Um único módulo de build parseia, valida e renderiza o Markdown.
- O mesmo módulo alimenta a aplicação e o prerender, evitando duas implementações.
- Rascunhos (`draft: true`) não entram em rotas, listagem, sitemap, relacionados nem prerender.

Exemplo de frontmatter:

```yaml
title: "..."
slug: "..."
description: "..."
publishedAt: "AAAA-MM-DD"
updatedAt: null
category: "Segurança"
cover: null
draft: true
```

### 13.2 Validação

- Slug obrigatório, único, em kebab-case e igual ao nome do arquivo.
- `title`, `description`, `publishedAt` e `category` obrigatórios.
- Categoria em lista fechada.
- Datas ISO válidas; `updatedAt >= publishedAt`.
- Capa exige `alt`, dimensões e arquivo existente.
- HTML bruto no Markdown rejeitado ou sanitizado.
- Links permitidos: `http`, `https`, `mailto` e relativos.
- Links externos com `rel="noopener noreferrer"`.
- Autor fixo e real, sem inventar credenciais.
- Tempo de leitura calculado por contagem de palavras.
- Datas formatadas com `Intl.DateTimeFormat("pt-BR")`.

### 13.3 Pipeline de build

1. Gerar o manifesto do blog a partir dos arquivos Markdown.
2. O manifesto contém metadados e HTML já renderizado.
3. `scripts/prerender.js` usa o mesmo gerador para criar:
   - `dist/blog/index.html` com listagem e links reais;
   - `dist/blog/<slug>/index.html` com corpo, metadados e JSON-LD;
   - `dist/sitemap.xml` apenas com artigos publicados.
4. A aplicação React lê o manifesto e renderiza listagem/artigo.
5. O parser de Markdown fica fora do bundle do cliente.

Dependências de build previstas: `gray-matter` e `marked` (ou equivalente). Elas devem ficar em `devDependencies`, pois são usadas apenas no build.

### 13.4 Rotas e interface

- `/blog` — listagem em ordem cronológica decrescente.
- `/blog/:slug` — artigo individual.
- Slug inválido — `NotFound` com `noindex`.
- Sem filtros, busca, tags ou paginação no MVP.
- Estado vazio com CTA para `/contact`.
- Cards com título, resumo, categoria, data e tempo de leitura.
- Artigo com H1 único, data, categoria, tempo de leitura, conteúdo, referências, CTA discreto, link de retorno e relacionados quando houver volume.
- Reutilizar `PageHeader`, `SectionWrapper`, `Card`, `Badge`, `Button` e os tokens atuais.

### 13.5 SEO por artigo

- Title e description específicos.
- Canonical absoluto sem trailing slash.
- `og:type=article`, `article:published_time` e `article:modified_time`.
- JSON-LD `BlogPosting` com autor, publisher, datas e idioma reais.
- Escape de `<` no JSON-LD e de atributos no HTML.
- Sitemap apenas com artigos publicados.
- Links internos reais no HTML estático.
- Não prometer indexação ou posicionamento.

### 13.6 Segurança

- Conteúdo é do repositório, não é entrada de usuário.
- Ainda assim, rejeitar HTML bruto e sanitizar links.
- Escapar metadados interpolados no prerender.
- Não adicionar scripts, iframes ou conteúdo incorporado sem necessidade.
- Não introduzir dependências de runtime desnecessárias.

### 13.7 Acessibilidade e performance

- Manter skip link, `main`, foco visível, `aria-current` e `prefers-reduced-motion`.
- Layout responsivo e navegação por teclado.
- Código com scroll e foco acessível.
- Imagens com dimensões e `alt`.
- Sem biblioteca de syntax highlighting no MVP.
- CSS do artigo via `@tailwindcss/typography` habilitado ou classe `.article-prose` própria.

### 13.8 Testes

- Unitários: validação, slug duplicado, rascunho, datas, categorias, tempo de leitura, escape e geração de HTML.
- Componentes: listagem, estado vazio, artigo, 404 e metadados.
- Rotas/sitemap/prerender: atualizar testes existentes.
- E2E: `/blog`, artigo válido, slug inválido, mobile e teclado.
- Validar o HTML de `dist/` após o build, pois o E2E atual testa apenas o dev server.

---

## 14. Riscos de regressão

| Risco | Origem |
|---|---|
| Teste exige exatamente 8 rotas | `src/config/__tests__/routes.test.ts:12` |
| Teste exige exatamente 8 URLs no sitemap | `routes.test.ts:42` |
| Teste extrai rotas do prerender por regex | `routes.test.ts:49` |
| Teste do Header enumera 5 links | `src/components/layout/__tests__/Header.test.tsx:23` |
| E2E descreve “5 links + 1 CTA” e rotas fixas | `e2e/multi-route-navigation.spec.ts:81` |
| Alteração no prerender pode quebrar o deploy | `npm run build` |
| CSS do HTML gerado pode ser removido pelo Tailwind | `tailwind.config.ts` |
| Dois H1 no HTML estático | `scripts/prerender.js:127` |
| Flash entre HTML estático e React | novo fluxo de artigos |
| Nav com 6 links pode apertar o header em `lg` | `Header.tsx` |
| Slug alterado sem redirect | `vercel.json` |

---

## 15. Arquivos que precisarão ser alterados

- `src/config/routes.ts`
- `src/App.tsx`
- `scripts/prerender.js`
- `public/sitemap.xml`
- `src/components/layout/Header.tsx`
- `src/components/sections/Footer.tsx`
- `tailwind.config.ts`
- `src/index.css`
- `package.json`
- `src/config/__tests__/routes.test.ts`
- `src/components/layout/__tests__/Header.test.tsx`
- `e2e/multi-route-navigation.spec.ts`
- `e2e/design-system-and-stability.spec.ts`
- `PROJECT.md`
- `CHANGELOG.md`

Novos arquivos previstos:

- `content/blog/*.md`
- gerador/validador do blog
- `src/pages/BlogPage.tsx`
- `src/pages/BlogPostPage.tsx`
- componentes de card/artigo
- testes unitários e E2E
- documentação de publicação
- SPEC, TASK e QA

---

## 16. Arquivos que devem permanecer intactos

- Páginas existentes: `Home`, `ServicesPage`, `HowWeWorkPage`, `ExperiencePage`, `EngineeringPage`, `AboutPage`, `ContactPage`, `FAQPage`, `NotFound`.
- `ContactForm`, `LegalModals`, `cookie-banner`, `CursorOrb`, `ScrollManager`, `SmoothScrollProvider`, `LazyRender`.
- `middleware.ts`.
- Redirects existentes em `vercel.json`.
- `.env.example`, `public/robots.txt`, `public/llms*.txt` (exceto inclusão opcional do blog).
- Tokens visuais, fontes, assets e integrações de analytics/EmailJS.

---

## 17. Decisões pendentes

1. **Pipeline:** aprovar geração estática no build, com duas dependências de build e alteração no `prerender.js`.
2. **Branch:** `develop` é compartilhada; criar `feat/blog`?
3. **Navegação:** “Blog” no header (6º link) ou apenas no footer + home?
4. **Slugs:** inglês (ADR-007) ou português?
5. **Conteúdo inicial:** quem fornece os artigos reais? Sem conteúdo, `/blog` nasce vazio.
6. **Status 404 real:** manter 200 + `noindex` no cliente ou tratar em tarefa separada?
7. **Categorias:** confirmar a taxonomia inicial.
8. **Soft 404 global:** corrigir agora ou registrar como dívida separada?

---

## 18. Próximos passos

Conforme o `AGENTS.md`, a implementação exige SPEC aprovada pelo PO:

1. Criar `SPEC-118-blog-tecnico` com escopo, decisões e critérios de aceite.
2. Criar `TASK-118` após aprovação.
3. Implementar apenas o escopo aprovado.
4. Executar lint, testes, build e E2E.
5. Registrar QA e review.
6. Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## 19. Comandos de validação

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

Após o build, inspecionar manualmente:

```bash
dist/blog/index.html
dist/blog/<slug>/index.html
dist/sitemap.xml
dist/services/index.html
```

---

## 20. Observações finais

- Nenhum deploy foi realizado.
- Nenhum arquivo de código foi alterado.
- Nenhum artigo foi inventado.
- O blog é viável, mas depende de aprovação da estratégia de geração estática no build.
- A qualidade da arquitetura existente deve ser preservada; o blog deve ampliar o site, não reescrevê-lo.
