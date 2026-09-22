# ADR-006 — Subdomínio Dedicado para Demos via Edge Middleware

**Status:** ✅ Aceito  
**Data:** 2026-09-22  
**Decisores:** Elessandro Prestes Macedo  
**Contexto:** TASK-044 / SPEC-044

---

## Contexto

A tentativa de servir o Worker Cloudflare da demo de odontologia via proxy reverso em sub-rota (`epmdevtech.com.br/odontologia-demo`) falhou porque o Worker foi compilado com Vite sem `base` path configurado. Todos os seus assets referenciam caminhos absolutos a partir da raiz (`/assets/`), conflitando com os assets do SPA EPM DEVTECH na mesma origem.

## Decisão

Adotar **subdomínio dedicado** `odontologia.epmdevtech.com.br` servido via **Vercel Edge Middleware** no projeto existente.

O middleware intercepta todas as requisições ao subdomínio e as proxia para o Worker Cloudflare (`dentistry-demo.elessandrodev.workers.dev`), incluindo assets (`/assets/*.js`, `/assets/*.css`, `/assets/*.webp`), preservando MIME types corretos e adicionando os 4 headers AppSec.

## Alternativas Consideradas

| Alternativa | Rejeitada por |
|-------------|---------------|
| Sub-rota `/odontologia-demo` via `rewrites` | Assets do Worker usam paths absolutos — conflito de origem |
| Sub-rota via `routes` API (Build Output) | Mesmo problema de paths absolutos |
| Cloudflare CNAME direto ao Worker | Não passa pela Vercel — perde o hardening AppSec |
| Rebuild do Worker com `base: '/odontologia-demo/'` | Não temos controle sobre o código do Worker |

## Consequências

- ✅ Assets do Worker resolvem corretamente (mesma origem = `odontologia.epmdevtech.com.br`)
- ✅ Headers AppSec aplicados via middleware a todas as respostas do subdomínio
- ✅ SPA EPM DEVTECH em `epmdevtech.com.br` sem nenhuma alteração
- ✅ Padrão extensível: novos Workers de demo seguem o mesmo modelo (`clinica.epmdevtech.com.br`, etc.)
- ⚠️ Requer adicionar domínio custom no painel Vercel + registro DNS CNAME
- ⚠️ Latência adicional de um hop extra (cliente → Vercel Edge → Worker Cloudflare)

---

_Maintainer: Elessandro Prestes Macedo | 2026-09-22_
