# TASK-044 — Proxy Reverso Odontologia Demo via Vercel

**SPEC:** [SPEC-044-proxy-reverso-odontologia-demo.md](../specs/SPEC-044-proxy-reverso-odontologia-demo.md)  
**Status:** ✅ Concluída  
**Agente:** Gemini/Antigravity  
**Data de início:** 2026-09-22  
**Data de conclusão:** 2026-09-22  

---

## Arquivos Modificados

| Arquivo | Ação |
|---------|------|
| `vercel.json` | Modificado — rewrites proxy + headers AppSec |

---

## Checklist de Implementação

- [x] SPEC-044 criada e aprovada pelo PO
- [x] Rewrites de proxy adicionados antes do rewrite SPA
- [x] Rewrite `/odontologia-demo` → Worker Cloudflare
- [x] Rewrite `/odontologia-demo/:path*` → Worker Cloudflare com passagem de path
- [x] 4 headers AppSec adicionados para `/odontologia-demo/:path*`
- [x] Rewrite SPA `/(.*) → /index.html` preservado
- [x] JSON sintacticamente válido

---

## Notas Técnicas

- As regras de proxy foram inseridas **antes** da catch-all SPA `/(.*) → /index.html` para garantir prioridade correta de avaliação no roteador Vercel.
- Os headers de segurança cobrem também a rota base `/odontologia-demo` (sem path), pois a entrada `/:path*` no Vercel faz match de zero ou mais segmentos.
- O Worker Cloudflare de origem (`dentistry-demo.elessandrodev.workers.dev`) não foi alterado.
- Cookies da origem corporativa `epmdevtech.com.br` não são encaminhados ao Worker por comportamento padrão da plataforma Vercel.

---

## QA

Ver: [QA-044.md](../reviews/QA-044.md)

---

_Agente: Gemini/Antigravity | 2026-09-22_
