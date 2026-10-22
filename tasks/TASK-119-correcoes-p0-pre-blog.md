# TASK-119 — Correções P0 Pré-Blog

| Campo | Valor |
|---|---|
| **ID** | TASK-119 |
| **SPEC** | SPEC-118 (seção 9 — pré-requisitos aprovados) |
| **Data de início** | 2026-10-22 |
| **Agente** | OpenCode |
| **Status** | Concluída (validação final de 404 na Vercel pendente) |

---

## Escopo da Implementação

> Esta TASK implementa exclusivamente os pré-requisitos P0 da SPEC-118. O blog (TASK-118) só será criado depois das evidências abaixo.

### Fase A — 404 real
- [x] Gerar `dist/404.html` no build, com conteúdo visível, `noindex` e sem canonical da home.
- [x] Remover o rewrite catch-all do `vercel.json`.
- [x] Garantir que rotas desconhecidas recebam HTTP 404 na Vercel.

### Fase B — Sitemap e rotas
- [x] Extrair metadados das rotas para fonte única (`scripts/site-routes.js`).
- [x] Gerar `dist/sitemap.xml` no build a partir dessa fonte.
- [x] Remover `public/sitemap.xml` manual.
- [x] Atualizar testes de rotas/sitemap para a fonte única.

### Fase C — Metadados
- [x] Remover `og:image` duplicado do `index.html`.
- [x] Adicionar `twitter:image` ao HTML inicial.
- [x] Impedir que o Helmet remova o `meta robots` global.
- [x] Remover o `FAQPage` global e recriá-lo apenas em `/faq`, alinhado a `src/config/faq.ts`.

### Fase D — Dependências (pendente)
- [x] Remover `geist` e confirmar saída de `next`/`sharp` da cadeia de produção.
- [x] Aplicar patches seguros e rodar lint/test/build/E2E.

### Fase E — Decisão de renderização
- [x] Registrar ADR-010 com a decisão entre injeção de corpo + `createRoot` e SSG completo + `hydrateRoot`.

---

## Arquivos a Criar

| Arquivo | Descrição |
|---|---|
| `scripts/generate-404.js` | Gera `dist/404.html` a partir do HTML base |
| `scripts/site-routes.js` | Fonte única dos metadados das rotas e do sitemap |
| `scripts/__tests__/p0-build-artifacts.test.js` | Testes dos artefatos de build |
| `adr/ADR-010-estrategia-renderizacao-blog.md` | Decisão de renderização |
| `tasks/TASK-119-correcoes-p0-pre-blog.md` | Esta task |
| `reviews/QA-119.md` | Evidências de QA |
| `reviews/REVIEW-119-correcoes-p0-pre-blog.md` | Review |

## Arquivos a Modificar

| Arquivo | Mudança |
|---|---|
| `package.json` | Build passa a gerar 404 e sitemap |
| `vercel.json` | Remover rewrite catch-all |
| `index.html` | Metadados duplicados, robots e FAQPage global |
| `src/pages/FAQPage.tsx` | JSON-LD `FAQPage` específico da rota |
| `src/config/__tests__/routes.test.ts` | Sitemap/fonte única |
| `vitest.config.ts` | Incluir testes de `scripts/` |
| `scripts/prerender.js` | Consumir `site-routes.js` e gerar sitemap |
| `public/sitemap.xml` | Remover (substituído por geração no build) |
| `PROJECT.md` | Atualizar estado canônico |
| `CHANGELOG.md` | Registrar mudança |

---

## Checklist de Implementação

- [x] 404.html gerado e sem dependência de JavaScript para o conteúdo principal
- [x] Sitemap gerado com todas as rotas canônicas, sem lastmod inventado
- [x] Metadados sem duplicidade e com `twitter:image`
- [x] `FAQPage` somente em `/faq` e igual ao conteúdo visível
- [x] Nenhuma dependência nova
- [x] Nenhuma alteração fora do escopo P0

---

## Checklist de Testes

- [x] `npm run lint`
- [x] `npm test`
- [x] `npm run build`
- [x] Verificação local de `dist/404.html` e `dist/sitemap.xml`
- [x] `npm run test:e2e` (rotas existentes sem regressão)

---

## Evidências de Conclusão

### Resultado dos Testes
```
43 arquivos / 291 testes passando
Cobertura: 99,12% statements e linhas
E2E: 51/51
(vide reviews/QA-119.md)
```

### Resultado do Build
```
Build + prerender + sitemap (8 URLs) + 404.html: OK
(vide reviews/QA-119.md)
```

---

## Notas do Agente

- A Fase D foi executada nesta task: `geist` removido; `next`/`sharp` fora da árvore; `react-router-dom` 6.30.6; `tailwindcss-animate` movido para dev; audit de produção reduzido de 17 para 2 ocorrências moderadas.
- A Fase E foi registrada no `ADR-010`; a implementação do blog consumirá a decisão.
- Ressalva: o status 404 foi validado em servidor estático equivalente, não em preview da Vercel.
- Nenhum `npm audit fix --force`, commit, push ou deploy foi executado.
