# ADR-007 — Slugs de URL em inglês com redirecionamentos 301 legados

| Campo      | Valor                       |
|------------|-----------------------------|
| **Status** | ✅ Aceito                    |
| **Data**   | 2026-10-03                  |
| **SPEC**   | SPEC-106                    |

## Contexto
As rotas usavam slugs em português (`/servicos`, `/sobre`, ...). Desejava-se padronizar URLs em inglês (convenção de mercado, melhor legibilidade para crawlers e LLMs), mantendo o conteúdo visual em pt-BR e sem perder autoridade de domínio.

## Decisão
- Slugs canônicos em inglês: `/services`, `/how-we-work`, `/experience`, `/engineering`, `/about`, `/contact`, `/faq`.
- Fonte única em `src/config/routes.ts` (`ROUTES`, `LEGACY_REDIRECTS`).
- 301 permanentes diretos (sem cadeias) em `vercel.json` para todas as URLs legadas; `<Navigate replace>` no React Router como fallback client-side (não transfere autoridade, serve apenas favoritos/dev local).
- Testes automatizados garantem consistência entre `routes.ts`, `vercel.json`, `sitemap.xml`, `prerender.js` e `llms*.txt`.

## Consequências
- Positivas: URLs padronizadas, equity preservada via 301, validação automatizada.
- Negativas: reindexação temporária no Google; os 301 devem ser mantidos por ≥ 12 meses.
