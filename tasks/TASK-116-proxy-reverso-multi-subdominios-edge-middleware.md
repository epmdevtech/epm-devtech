# TASK-116 — Proxy Reverso Multi-Subdomínios via Vercel Edge Middleware (BRS e Odontologia)

- **SPEC Relacionada:** [SPEC-116](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/specs/SPEC-116-proxy-reverso-multi-subdominios-edge-middleware.md)
- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Data de Início:** 2026-10-13
- **Data de Conclusão:** 2026-10-13

---

## 1. Escopo de Arquivos Modificados / Criados

- `middleware.ts` (refatoração para mapa `PROXIES`, repasse de body/stream com `duplex: "half"`, rewrite de `Location`)
- `src/__tests__/middleware.test.ts` (testes unitários automatizados do proxy reverso)
- `specs/SPEC-116-proxy-reverso-multi-subdominios-edge-middleware.md`
- `tasks/TASK-116-proxy-reverso-multi-subdominios-edge-middleware.md`
- `adr/ADR-008-proxy-reverso-multi-subdominios-edge-middleware.md`
- `adr/ADR-006-subdominio-demos-edge-middleware.md` (anotação cruzada)
- `reviews/QA-116.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Execução

- [x] Criar SPEC-116 e registrar TASK-116
- [x] Refatorar `middleware.ts` com mapa declarativo `PROXIES`:
  - [x] `odontologia.epmdevtech.com.br` → `dentistry-demo.elessandrodev.workers.dev`
  - [x] `brs.epmdevtech.com.br` → `brs-automotive-repair.elessandrodev.workers.dev`
- [x] Implementar bypass para hosts desconhecidos (`return undefined`)
- [x] Preservar target com `url.pathname + url.search`
- [x] Encaminhar método, headers (removendo `host`, injetando `x-forwarded-host` e `x-forwarded-proto`) e body com `{ duplex: "half" }` para métodos não-GET/HEAD
- [x] Configurar `redirect: "manual"` e interceptar/reescrever header `Location`
- [x] Injetar cabeçalhos de segurança AppSec (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
- [x] Criar testes unitários em `src/__tests__/middleware.test.ts` cobrindo todos os fluxos
- [x] Registrar ADR-008 documentando a decisão arquitetural e o guia de expansão
- [x] Executar typecheck (`npx tsc --noEmit`), lint (`npm run lint`), testes (`npm test`) e build (`npm run build`)
- [x] Gerar relatório QA-116
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Apresentar diff, comandos de teste pós-deploy e análise de riscos
