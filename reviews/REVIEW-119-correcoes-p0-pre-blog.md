# REVIEW-119 — Correções P0 Pré-Blog

| Campo | Valor |
|---|---|
| **ID** | REVIEW-119 |
| **Referência** | TASK-119 / SPEC-118 / ADR-010 / QA-119 |
| **Tipo** | Code Review + QA Review |
| **Data** | 2026-10-22 |
| **Revisor** | Pendente — Elessandro Prestes Macedo |
| **Status** | Pendente de revisão humana |

---

## 1. Escopo Revisado

- `scripts/site-routes.js` (novo): fonte única de metadados.
- `scripts/generate-sitemap.js` (novo): geração do sitemap.
- `scripts/faq-schema.js` (novo): JSON-LD do FAQ a partir da fonte única.
- `scripts/generate-404.js` (novo): geração de `dist/404.html`.
- `scripts/prerender.js` (modificado): consome a fonte única, gera sitemap e injeta FAQPage.
- `src/config/faq.json` (novo) e `src/config/faq.ts` (modificado).
- `src/config/__tests__/routes.test.ts` e `src/config/__tests__/p0-artifacts.test.ts`.
- `index.html`, `vercel.json`, `package.json`, `package-lock.json`, `tsconfig.app.json`.
- `adr/ADR-010-estrategia-renderizacao-blog.md`.

---

## Checklist de Code Review

- [x] TypeScript: sem erros; `resolveJsonModule` habilitado para o JSON do FAQ
- [x] ESLint: zero erros e zero warnings
- [x] Nomenclatura: scripts em kebab-case; helpers com verbos claros
- [x] Sem dependências novas
- [x] Sem `npm audit fix --force`
- [x] `geist` removido; `next` e `sharp` fora da árvore
- [x] `tailwindcss-animate` reclassificado como devDependency
- [x] `react-router-dom` atualizado para `6.30.6`
- [x] Sitemap sem `lastmod` inventado
- [x] 404 sem canonical, OG, Twitter ou JSON-LD
- [x] FAQPage restrito a `/faq` e com a mesma fonte do conteúdo visível
- [x] Testes significativos para 404, sitemap, metadados e FAQ

---

## Checklist de Segurança

- [x] Nenhum segredo exposto
- [x] JSON-LD serializado com escape de `<`
- [x] 404 não declara canonical da home
- [x] Nenhum HTML bruto de usuário no 404
- [x] Dependências críticas de produção removidas
- [ ] Revisão de CSP permanece fora do escopo (tarefa separada)

---

## Pontos de Atenção

| # | Arquivo | Descrição | Severidade |
|---|---|---|---|
| 1 | `scripts/generate-404.js` | O conteúdo estático do 404 duplica parte do texto de `NotFound.tsx`. O teste cobre o artefato, mas não impede divergência futura de copy. | Menor |
| 2 | `vercel.json` | A remoção do rewrite precisa ser confirmada em preview; o comportamento local foi simulado com servidor equivalente. | Menor |
| 3 | `package-lock.json` | A remoção de `geist` reduziu 17 pacotes e alterou o lockfile; a árvore foi validada, mas o deploy deve ser monitorado. | Menor |
| 4 | `react-router` | Permanecem 2 advisories moderadas de produção; correção integral exige 7.x (major). | Menor |
| 5 | `scripts/faq-schema.js` | O JSON-LD é gerado no build; em `npm run dev` o `/faq` não terá o schema estático. Produção é o alvo. | Informativo |

---

## Ações Requeridas

- [ ] Confirmar status 404 real no primeiro preview da Vercel.
- [ ] Aprovar formalmente a remoção de `geist` e a atualização de `react-router-dom`.
- [ ] Decidir se a dívida de `react-router` 7.x será tratada antes ou depois do blog.

---

## Decisão Final

| Campo | Valor |
|---|---|
| **Decisão** | ⏳ Pendente de revisão humana |
| **Aprovado por** | — |
| **Data** | — |
| **Observações** | Quality gates verdes: lint 0/0, 291/291 testes, cobertura 99,12%, build + prerender + 404 OK, 51/51 E2E, auditoria de produção reduzida de 17 para 2 ocorrências moderadas. |
