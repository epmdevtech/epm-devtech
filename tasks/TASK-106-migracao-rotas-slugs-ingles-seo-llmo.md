# TASK-106 — Migração de Rotas e Slugs para Inglês + 301 e SEO/LLMO

| Campo              | Valor                    |
|--------------------|--------------------------|
| **ID**             | TASK-106                 |
| **SPEC**           | SPEC-106                 |
| **Data de início** | 2026-10-03               |
| **Agente**         | Gemini/Antigravity       |
| **Status**         | Concluída                |

---

## Escopo da Implementação

Baseado na SPEC-106 aprovada (D1 = `/about`, D2 = `/faq`):

- Fonte única de rotas em `src/config/routes.ts`
- Novas rotas em inglês + redirects legados no React Router
- Links internos, canonicals, ScrollManager, prerender
- `vercel.json` com 301 diretos (sem cadeias)
- `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `site.webmanifest`, JSON-LD
- Testes unitários/E2E, PROJECT.md, CHANGELOG.md, QA-106

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/config/routes.ts` | Constantes de rotas novas e mapa de legados |
| `src/config/__tests__/routes.test.ts` | Teste do mapa de rotas/redirects (incl. vercel.json) |
| `reviews/QA-106.md` | Relatório de QA |
| `src/config/__tests__/App.redirects.test.tsx` | Testes dos redirects no roteador |
| `adr/ADR-007-slugs-de-url-em-ingles.md` | Decisão arquitetural |

## Arquivos a Modificar

`src/App.tsx`, `Header`, `Footer`, `Hero`, `HomeServicesBento`, `ScrollManager`, `Home`, páginas (`Services`, `HowWeWork`, `Experience`, `Engineering`, `About`, `Contact`, `FAQ`, `NotFound`), testes afetados, `e2e/*.spec.ts`, `scripts/prerender.js`, `vercel.json`, `index.html`, `public/*`, `PROJECT.md`, `CHANGELOG.md`.

---

## Checklist de Implementação

- [x] routes.ts criado
- [x] App.tsx com rotas novas + Navigate legados
- [x] Links internos migrados
- [x] Canonicals/OG migrados
- [x] prerender.js migrado
- [x] vercel.json com 301 diretos
- [x] sitemap/robots/llms/webmanifest/JSON-LD atualizados
- [x] Testes unitários e E2E atualizados
- [x] `npm run lint` zero erros
- [x] `npm run test:coverage` ≥ 90%
- [x] `npm run build` sem warnings > 600KB
- [x] QA-106 preenchido
- [x] PROJECT.md e CHANGELOG.md atualizados

## Dúvidas / Bloqueios

Nenhum.
