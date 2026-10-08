# SPEC-115 — Servir Imagem OG Odontologia como Ativo Estático com Cabeçalhos Otimizados para WhatsApp

## Status
- **Status:** Aprovado pelo PO
- **Data:** 2026-10-08
- **Autor:** Engenheiro de Infraestrutura e Performance Web / Gemini
- **Decisão:** Hospedar o ativo de Open Graph `og-odontologia.jpg` no diretório público do projeto (`public/`) servido diretamente pela raiz da Vercel (`epmdevtech.com.br/og-odontologia.jpg`), isolando-o de regras de rewrite de SPA e configurando cabeçalhos HTTP explícitos (`Content-Type`, `Cache-Control`, `Access-Control-Allow-Origin`) para garantir a geração correta de preview de links pelo WhatsApp sem depender de proxies que descartam o cabeçalho `content-length`.

---

## 1. Contexto & Motivação

O subdomínio `odontologia.epmdevtech.com.br` direciona tráfego através de proxy reverso da Vercel para um Cloudflare Worker (`dentistry-demo.elessandrodev.workers.dev`). Durante o compartilhamento em mensageiros como o WhatsApp, o crawler do WhatsApp (`WhatsApp/2.23.20.0`) não exibia o preview da imagem `og:image` porque a resposta enviada através do proxy da Vercel não continha o cabeçalho `content-length` esperado pelo WhatsApp ou sofria interferências de streaming.

A solução consiste em servir a imagem diretamente como arquivo estático na raiz do domínio principal `epmdevtech.com.br` (`https://epmdevtech.com.br/og-odontologia.jpg`). Como arquivo estático hospedado na infraestrutura Vite + Vercel, o Vercel Edge Network fornece nativamente `content-length` e resposta rápida com headers HTTP calibrados.

---

## 2. Requisitos & Especificações Técnicas

### 2.1 Armazenamento do Arquivo Estático
- **Origem:** Baixar a imagem original de `https://dentistry-demo.elessandrodev.workers.dev/og-desktop-hero.jpg`.
- **Destino:** `public/og-odontologia.jpg`.
- **Validações:**
  - Formato: JPEG (`image/jpeg`), 1200x630 pixels.
  - Tamanho: Inferior a 300 KB (esperado ~73 KB / ~74.755 bytes).

### 2.2 Configuração de Roteamento no `vercel.json`
- **Isolamento de Rewrites SPA:**
  - O rewrite genérico de SPA (`"source": "/(.*)"` direcionando para `/index.html`) deve ser ajustado para excluir explicitamente o arquivo `/og-odontologia.jpg` utilizando negative lookahead PCRE:
    ```json
    {
      "source": "/((?!og-odontologia\\.jpg).*)",
      "destination": "/index.html"
    }
    ```
  - Isso assegura que requisições a `/og-odontologia.jpg` sejam resolvidas diretamente no sistema de arquivos estáticos (`public/` copiado para `dist/`).

### 2.3 Cabeçalhos HTTP no `vercel.json`
- Adicionar bloco `headers` direcionado a `/og-odontologia.jpg`:
  ```json
  "headers": [
    {
      "source": "/og-odontologia.jpg",
      "headers": [
        {
          "key": "Content-Type",
          "value": "image/jpeg"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
  ```
- O cabeçalho `Access-Control-Allow-Origin: *` deve ser definido uma única vez, sem duplicidades.

### 2.4 Restrições & Não-Escopo
- Não alterar regras de rewrite ou subdomínio de odontologia no repositório externo.
- Não instalar novas dependências no `package.json`.
- Não modificar nenhum outro arquivo além de `public/og-odontologia.jpg`, `vercel.json` e documentação de governança (`specs/`, `tasks/`, `reviews/`, `PROJECT.md`, `CHANGELOG.md`).

---

## 3. Critérios de Aceite

1. `file public/og-odontologia.jpg` retorna JPEG 1200x630.
2. `ls -l public/og-odontologia.jpg` confirma tamanho < 300 KB (~74.8 KB).
3. `npm run build` inclui `dist/og-odontologia.jpg` sem falhas.
4. `vercel.json` é um JSON sintaticamente válido contendo redirects originais, cabeçalhos para `/og-odontologia.jpg` e rewrite com exclusão explícita de `/og-odontologia.jpg`.
5. Todos os quality gates (`npm run test`, `npm run lint`, `npm run build`) continuam com 100% de aprovação.
