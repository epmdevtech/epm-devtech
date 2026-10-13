# ADR-008 — Proxy Reverso Multi-Subdomínios via Vercel Edge Middleware (BRS e Odontologia)

**Status:** ✅ Aceito  
**Data:** 2026-10-13  
**Decisores:** Elessandro Prestes Macedo  
**Contexto:** TASK-116 / SPEC-116 (Evolução do ADR-006)

---

## 1. Contexto

O projeto institucional da EPM DEVTECH (`epmdevtech.com.br`) está hospedado na Vercel, com a zona DNS do domínio delegada aos nameservers autoritativos da Vercel.

Demos de soluções setoriais desenvolvidas pela empresa rodam em Cloudflare Workers (ex.: `dentistry-demo.elessandrodev.workers.dev` para odontologia e `brs-automotive-repair.elessandrodev.workers.dev` para oficina mecânica/funilaria BRS).

### Por que o proxy é feito na Vercel?
Como os nameservers autoritativos do domínio raiz pertencem à Vercel e não à Cloudflare, o recurso nativo de "Custom Domain" do Cloudflare Workers não pode validar e gerenciar certificados SSL diretamente na Cloudflare sem transferência da zona DNS completa ou contratação do Cloudflare for SaaS. Dessa forma, a Vercel atua como ponto de entrada TLS/Edge para todos os subdomínios `*.epmdevtech.com.br`.

No ADR-006, estabeleceu-se o proxy reverso para `odontologia.epmdevtech.com.br` via `middleware.ts` para isolar caminhos de assets absolutos (`/assets/`). Com a adição do subdomínio automotivo BRS (`brs.epmdevtech.com.br`) e a necessidade de comportar futuras demos sem duplicação de lógica ou código solto, foi necessário padronizar a arquitetura do Edge Middleware.

---

## 2. Decisão

Adotar uma arquitetura de proxy reverso declarativa em `middleware.ts` baseada em um mapa de roteamento (`PROXIES`), com suporte completo a aplicações dinâmicas (SSR, APIs e mutações de formulários):

```typescript
const PROXIES: Record<string, string> = {
  "odontologia.epmdevtech.com.br": "dentistry-demo.elessandrodev.workers.dev",
  "brs.epmdevtech.com.br": "brs-automotive-repair.elessandrodev.workers.dev",
};
```

### Comportamento Arquitetural:
1. **Bypass Não-Intrusivo:** Requisições a domínios que não constam no mapa (como `epmdevtech.com.br` e `www.epmdevtech.com.br`) retornam `undefined`, sendo atendidas nativamente pelo SPA sem sobrecarga.
2. **Preservação de Path e Query:** A rota upstream é construída com `url.pathname + url.search` sobre `https://<upstream>`.
3. **Encaminhamento de Cabeçalhos e Identidade:**
   - Remove o cabeçalho `host` original da requisição do cliente para evitar rejeição no worker upstream.
   - Adiciona `x-forwarded-host: <url.hostname>` e `x-forwarded-proto: https`.
4. **Streaming de Payload Dinâmico:**
   - Métodos não-GET/HEAD (POST, PUT, PATCH, DELETE) repassam `request.body` com `{ duplex: "half" }` habilitado no `fetch`, garantindo compatibilidade com envio de formulários e APIs no Node/Edge Runtime.
5. **Tratamento Manual de Redirecionamentos (`Location` Rewrite):**
   - Executa upstream com `redirect: "manual"`.
   - Caso o backend responda com status 30x e cabeçalho `Location`, qualquer ocorrência de `https://<upstream>` é reescrita para o domínio público correspondente (`https://<url.hostname>`), impedindo que o navegador do usuário seja redirecionado para `*.workers.dev`.
6. **Hardening Uniforme (AppSec):**
   - Injeta os 4 cabeçalhos de segurança corporativos (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`) em todas as respostas dos subdomínios.

---

## 3. Como Adicionar Novos Subdomínios

Para registrar um novo subdomínio de demonstração no futuro:

1. **Painel Vercel:**
   - Acesse o projeto `epm-devtech-solutions` na Vercel > **Settings** > **Domains**.
   - Adicione o novo subdomínio (ex.: `clinica.epmdevtech.com.br`).
   - A Vercel provisionará o certificado SSL automaticamente caso o DNS use nameservers da Vercel ou CNAME apontando para `cname.vercel-dns.com`.
2. **Código (`middleware.ts`):**
   - Adicione uma linha no mapa `PROXIES`:
     ```typescript
     "clinica.epmdevtech.com.br": "clinica-demo.elessandrodev.workers.dev",
     ```
3. **Verificação & Deploy:**
   - Execute testes e validação de lint/build e envie para produção. Nenhuma outra alteração em código ou infraestrutura é necessária.

---

## 4. Consequências

- ✅ **Escalabilidade:** Adição de novos subdomínios com esforço de 1 linha de código.
- ✅ **Isolamento de Origem:** Cada subdomínio preserva sua raiz `/assets/` sem conflito com o SPA institucional.
- ✅ **Suporte a SSR & APIs:** Submissão de formulários e rotas com mutação funcionam via `duplex: "half"`.
- ✅ **Proteção de Marca:** Respostas com redirect 30x não revelam URLs técnicas `workers.dev`.
- ⚠️ **Limitações Conhecidas:**
  - WebSockets não são suportados através do Edge Middleware da Vercel (limitação da plataforma Vercel Edge).
  - Cookies emitidos com atributo explícito `Domain=.workers.dev` pelo worker upstream não serão aplicados ao subdomínio `*.epmdevtech.com.br` a menos que o worker emita cookies sem restrição de domínio ou específicos para o host repassado em `x-forwarded-host`.

---

_Maintainer: Elessandro Prestes Macedo | 2026-10-13_
