# SPEC-116 — Proxy Reverso Multi-Subdomínios via Vercel Edge Middleware (BRS e Odontologia)

## Status
- **Status:** ✅ Aprovada pelo PO
- **Data:** 2026-10-13
- **Autor:** Engenheiro de Infraestrutura e Performance Web / Gemini
- **Decisão:** Refatorar o `middleware.ts` para suportar múltiplos subdomínios dedicados (`odontologia.epmdevtech.com.br` e `brs.epmdevtech.com.br`) através de um mapa extensível de proxies (`PROXIES`). O middleware atua como proxy reverso transparente completo: repassa método, headers, body com suporte a streaming (`duplex: "half"`), reescreve cabeçalhos de encaminhamento (`x-forwarded-host`, `x-forwarded-proto`), intercepta redirects manuais (`redirect: "manual"`) para reescrever o cabeçalho `Location` de volta para o subdomínio público, e aplica cabeçalhos de segurança AppSec uniformes.

---

## 1. Contexto & Motivação

O projeto corporativo da EPM DEVTECH (`epmdevtech.com.br`) roda na Vercel (`epm-devtech-solutions`), cujos nameservers gerenciam a zona DNS de `epmdevtech.com.br`. Demonstrações de verticais de negócio são desenvolvidas e hospedadas em Cloudflare Workers em contas dedicadas (ex.: `dentistry-demo.elessandrodev.workers.dev` e `brs-automotive-repair.elessandrodev.workers.dev`).

Como os nameservers autoritativos do domínio raiz estão na Vercel e não na Cloudflare, vincular um subdomínio como Custom Domain nativo direto no Cloudflare Worker não é viável sem transferir a zona DNS ou configurar Cloudflare for SaaS.

Anteriormente (ADR-006 / SPEC-044), implementou-se o proxy para `odontologia.epmdevtech.com.br` via `middleware.ts` com constantes fixas (`WORKER_HOST`, `DEMO_HOST`). Para acomodar a vertical automotiva BRS (`brs.epmdevtech.com.br`) e permitir futuras demos sem duplicação de lógica, é imperativo refatorar o middleware para um padrão declarativo baseado em mapa de hosts. Além disso, o worker da BRS possui rotas com SSR, formulários e mutações (POST/PUT/PATCH), exigindo repasse completo de payload (`duplex: "half"`) e tratamento de redirects de autenticação/rotas para evitar que o usuário seja ejetado para o domínio técnico `*.workers.dev`.

---

## 2. Requisitos Técnicos

### 2.1 Mapa Declarativo de Proxies
Substituir variáveis estáticas por um dicionário indexado pelo hostname público:
```typescript
const PROXIES: Record<string, string> = {
  "odontologia.epmdevtech.com.br": "dentistry-demo.elessandrodev.workers.dev",
  "brs.epmdevtech.com.br": "brs-automotive-repair.elessandrodev.workers.dev",
};
```

### 2.2 Roteamento & Bypass
- Interceptar apenas hosts presentes no mapa `PROXIES`.
- Se `url.hostname` não estiver registrado no mapa (ex.: `epmdevtech.com.br`, `www.epmdevtech.com.br` ou hosts locais de desenvolvimento), o middleware deve retornar imediatamente `undefined`, mantendo o ciclo de vida inalterado do SPA institucional.

### 2.3 Construção da Requisição Upstream
- Target URL: `https://${upstream}${url.pathname}${url.search}`.
- Método HTTP preservado (`request.method`).
- Headers:
  - Copiar todos os cabeçalhos recebidos do cliente.
  - Remover cabeçalho `host` original.
  - Definir `x-forwarded-host: url.hostname` (mantendo o host público original visível para o backend upstream).
  - Definir `x-forwarded-proto: "https"`.
- Body:
  - Para métodos com payload (`request.method !== "GET" && request.method !== "HEAD"`), repassar `request.body`.
  - Configurar `{ duplex: "half" }` na chamada `fetch` para compatibilidade com streaming de body do Fetch API / Node / Edge Runtime.

### 2.4 Tratamento de Redirects (Location Rewrite)
- Configurar `redirect: "manual"` na chamada ao upstream para capturar respostas 301, 302, 303, 307 e 308.
- Se a resposta contiver o cabeçalho `Location`:
  - Reescrever referências que apontem para o host técnico do worker upstream (`https://<upstream>`) para o domínio público correspondente (`https://<url.hostname>`), preservando query strings e paths.
  - Garantir que redirecionamentos relativos (ex.: `/login`) permaneçam válidos no domínio público.

### 2.5 Headers de Segurança (AppSec)
Aplicar uniformemente a todas as respostas do mapa `PROXIES`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 2.6 Preservação de Escopo
- Manter `export const config = { matcher: "/(.*)" }`.
- Preservar regras do `vercel.json` (incluindo negative lookahead para `/og-odontologia.jpg`).
- Não adicionar bibliotecas externas ou dependências no `package.json`.

---

## 3. Arquivos Afetados

| Arquivo | Ação |
|---------|------|
| `middleware.ts` | Refatoração estrutural com mapa `PROXIES`, `duplex: "half"` e rewrite de `Location` |
| `specs/SPEC-116-proxy-reverso-multi-subdominios-edge-middleware.md` | Criação da especificação canônica |
| `tasks/TASK-116-proxy-reverso-multi-subdominios-edge-middleware.md` | Criação e rastreamento da tarefa |
| `adr/ADR-008-proxy-reverso-multi-subdominios-edge-middleware.md` | Registro de decisão arquitetural |
| `PROJECT.md` | Atualização da tabela de entregas e ADRs |
| `CHANGELOG.md` | Registro de alterações |

---

## 4. Critérios de Aceite

1. `odontologia.epmdevtech.com.br` continua respondendo 200 via proxy com headers AppSec intactos.
2. `brs.epmdevtech.com.br` responde via proxy para `brs-automotive-repair.elessandrodev.workers.dev` com headers AppSec.
3. Requisições POST/PUT repassam corpo e método com `duplex: "half"`.
4. Respostas 30x do Worker não vazam `workers.dev` no header `Location`.
5. Requisições a `epmdevtech.com.br` (site institucional) passam sem modificação (`return undefined`).
6. Suíte de testes unitários (`npm test`), lint (`npm run lint`) e build (`npm run build`) continuam 100% aprovados.
