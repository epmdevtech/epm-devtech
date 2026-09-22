# SPEC-044 — Proxy Reverso Odontologia Demo via Vercel

**Status:** ✅ Aprovada  
**Aprovado por:** Elessandro Prestes Macedo  
**Data de aprovação:** 2026-09-22  
**Implementado por:** Gemini/Antigravity  

---

## 1. Contexto

A demonstração para clínicas e profissionais de odontologia está hospedada num Cloudflare Worker:

> `https://dentistry-demo.elessandrodev.workers.dev`

A URL técnica com prefixo em inglês (`dentistry`) e sufixo `.workers.dev` prejudica a imagem institucional e a autoridade de marca da EPM DEVTECH no mercado brasileiro.

---

## 2. Objetivo

Configurar a Vercel para servir a demonstração por meio da rota institucional:

> **`https://epmdevtech.com.br/odontologia-demo`**

O tráfego recebido em `/odontologia-demo` (e subrotas) é encaminhado via proxy reverso transparente para o Worker upstream. O Worker **não** muda de nome — apenas o endereço público muda.

---

## 3. Escopo

### 3.1 Incluso

| # | Item |
|---|------|
| 1 | Rewrite `/odontologia-demo` → `https://dentistry-demo.elessandrodev.workers.dev` |
| 2 | Rewrite `/odontologia-demo/:path*` → `https://dentistry-demo.elessandrodev.workers.dev/:path*` |
| 3 | Headers de segurança AppSec sobre `/odontologia-demo/:path*` |
| 4 | Preservação do rewrite SPA existente `/(.*) → /index.html` |
| 5 | Preservação de todos os headers e rotas preexistentes no `vercel.json` |

### 3.2 Excluído

- Qualquer alteração no nome do Worker Cloudflare
- Configurações de domínio/DNS além do `vercel.json`
- Alterações em código-fonte React/TypeScript
- Deploy em produção

---

## 4. Requisitos Técnicos

### 4.1 Rewrites

```
Origem: /odontologia-demo
Destino: https://dentistry-demo.elessandrodev.workers.dev

Origem: /odontologia-demo/:path*
Destino: https://dentistry-demo.elessandrodev.workers.dev/:path*
```

> **Nota de Ordem:** As entradas de rewrite do proxy devem preceder a entrada SPA `/(.*) → /index.html` para que o Vercel as avalie com prioridade.

### 4.2 Headers de Segurança (AppSec)

Aplicados à fonte `/odontologia-demo/:path*`:

| Header | Valor | Objetivo |
|--------|-------|----------|
| `X-Content-Type-Options` | `nosniff` | Previne MIME-type sniffing |
| `X-Frame-Options` | `SAMEORIGIN` | Mitiga Clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protege paths e parâmetros de vazamento |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restringe permissões de hardware |

### 4.3 Integridade de Cookies

A configuração de proxy reverso da Vercel não encaminha cookies da origem corporativa `epmdevtech.com.br` para o Worker externo por padrão. Nenhuma configuração adicional é necessária.

---

## 5. Arquivo Afetado

| Arquivo | Ação |
|---------|------|
| `vercel.json` | Modificado — adição de rewrites e headers |

---

## 6. Quality Gates

| Gate | Critério |
|------|---------|
| JSON válido | `vercel.json` sem erros de sintaxe |
| Ordem de rewrites | Regras proxy antecedem a regra SPA |
| Headers presentes | 4 headers AppSec na entrada correta |
| Preservação | Rewrite SPA preexistente intacto |

---

## 7. ADR

Nenhum ADR novo é necessário — a plataforma Vercel já é decisão registrada em ADR-004.

---

_Maintainer: Elessandro Prestes Macedo | Agente: Gemini/Antigravity_
