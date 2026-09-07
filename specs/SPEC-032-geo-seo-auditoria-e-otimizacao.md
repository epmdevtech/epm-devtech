# SPEC-032 — GEO & Technical SEO: Auditoria e Otimização para LLMs e Motores Generativos

**Número:** SPEC-032
**Título:** GEO & Technical SEO — Auditoria completa e otimização para indexação por LLMs e motores de busca generativos
**Status:** 🟡 Aguardando aprovação do PO
**Autor:** Agente Gemini/Antigravity
**Data:** 2026-09-07
**Prioridade:** Alta

---

## Contexto e Motivação

O site `epmdevtech.com.br` possui estrutura SEO parcialmente implementada, mas apresenta lacunas
críticas para ser corretamente indexado, compreendido e **recomendado diretamente por LLMs e
motores de busca generativos** (ChatGPT/SearchGPT, Perplexity, Gemini, Claude).

A auditoria identificou problemas em 4 camadas: rastreadores de IA, llms.txt, dados estruturados
JSON-LD e meta tags/Open Graph.

---

## Auditoria — Problemas Encontrados

### 🔴 Crítico — `robots.txt`
**Arquivo:** `public/robots.txt`

**Estado atual:**
```
User-agent: *
Allow: /
Disallow: /src/
Disallow: /*.json$
Sitemap: https://epmdevtech.com.br/sitemap.xml
```

**Problemas:**
1. ❌ Nenhum bloco dedicado para crawlers de IA — GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot,
   `anthropic-ai` e `Google-Extended` não têm permissão explícita.
2. ❌ `Disallow: /*.json$` bloqueia qualquer arquivo `.json` — incluindo potencialmente `llms.txt`
   (se servido como JSON) e arquivos de manifesto acessados por bots.
3. ❌ Ausência de referência ao `llms.txt` no arquivo.

---

### 🟡 Médio — `llms.txt`
**Arquivo:** `public/llms.txt`

**Estado atual:** Arquivo existe e tem estrutura básica (nome, serviços, contatos).

**Problemas:**
1. ⚠️ Conteúdo superficial — não descreve cada serviço com profundidade nem menciona setores
   atendidos (Educação CAPES/MEC, Energia ONS, Indústria).
2. ⚠️ Não menciona métricas de autoridade (99,9% uptime, 2.500+ RPS, +448 IES, 9 anos).
3. ⚠️ Não menciona diferenciais competitivos (código limpo, CI/CD, microsserviços, Clean Architecture).
4. ⚠️ Não menciona stack completa de backend (PHP, Laravel, Symfony, PostgreSQL, RabbitMQ, Kafka).
5. ⚠️ Não cita endereço/localização (Toledo - PR, Brasil) — útil para buscas locais.
6. ⚠️ `llms-full.txt` não existe — versão ampliada que LLMs usam para contexto completo.

---

### 🔴 Crítico — JSON-LD Structured Data (`index.html`)
**Arquivo:** `index.html` (linhas 141-210)

**Estado atual:** Possui `WebSite`, `ProfessionalService` e `Person`.

**Problemas:**
1. ❌ `email` no `ProfessionalService` está com `elessandrodev@gmail.com` — e-mail pessoal antigo,
   deveria ser `elessandro@epmdevtech.com.br` (e-mail corporativo da empresa).
2. ❌ `theme_color` no `site.webmanifest` está `#2979FF` (azul) — inconsistente com a brand color
   verde da EPM DEVTECH (`#10B981`).
3. ❌ Ausência de `@type: Service` individualmente para cada serviço principal — apenas
   `OfferCatalog` sem descrição detalhada de cada serviço.
4. ❌ Ausência de `@type: FAQPage` — crítico para rich results no Google e citação direta por LLMs.
5. ❌ Ausência de `@type: WebPage` por seção — LLMs se beneficiam de `breadcrumb` e estrutura
   de página clara.
6. ⚠️ `foundingDate: "2015"` — verificar se é a data correta de fundação da EPM DEVTECH.

---

### 🟡 Médio — Meta Tags e Open Graph (`index.html` + `Index.tsx`)
**Arquivos:** `index.html`, `src/pages/Index.tsx`

**Problemas:**
1. ⚠️ `og:image` usa `android-chrome-512x512.png` (512×512px) — ideal seria uma imagem OG dedicada
   com dimensão 1200×630px (padrão para preview no LinkedIn, WhatsApp, Twitter/X).
   *(bloqueador: dependência de asset externo — marcado como dependência de configuração)*
2. ⚠️ `twitter:card` é `summary_large_image` mas a imagem é 512×512 (quadrada) — o card não vai
   renderizar corretamente no X/Twitter.
3. ⚠️ Meta `description` da rota `/servicos` está genérica demais — não menciona setores atendidos.
4. ⚠️ Meta `description` da rota `/sobre` não menciona o fundador nem os 9 anos.
5. ⚠️ `sitemap.xml` tem `lastmod: 2026-03-10` — desatualizado (último deploy foi em setembro/2026).
6. ⚠️ Ausência de `twitter:site` e `twitter:creator` no `<head>`.

---

## Escopo da Implementação

### ✅ O que será feito nesta SPEC

| # | Arquivo | Mudança |
|---|---------|---------|
| 1 | `public/robots.txt` | Adicionar blocos explícitos para todos os crawlers de IA |
| 2 | `public/llms.txt` | Expandir com profundidade: setores, métricas, diferenciais, stack completa, localização |
| 3 | `public/llms-full.txt` | **Criar** — versão detalhada e ampliada para contexto de LLMs |
| 4 | `index.html` | Corrigir `email` no JSON-LD (`elessandrodev@gmail.com` → `elessandro@epmdevtech.com.br`) |
| 5 | `index.html` | Adicionar `@type: Service` individuais com `description` rica por serviço |
| 6 | `index.html` | Adicionar `@type: FAQPage` com as perguntas relevantes para o negócio |
| 7 | `index.html` | Adicionar `twitter:site` e `twitter:creator` |
| 8 | `public/site.webmanifest` | Corrigir `theme_color` de `#2979FF` para `#10B981` |
| 9 | `public/sitemap.xml` | Atualizar `lastmod` para a data atual (2026-09-07) |
| 10 | `src/pages/Index.tsx` | Enriquecer `description` das rotas `/servicos` e `/sobre` |

### ❌ O que NÃO está no escopo (dependências externas)
| Dependência | Ação Necessária | Responsável |
|-------------|-----------------|-------------|
| Imagem OG 1200×630px | Criar asset e substituir `og:image` | PO (design) |
| Google Search Console | Submeter sitemap após deploy | PO |
| Bing Webmaster Tools | Submeter sitemap | PO |
| Perplexity Pages | Verificar indexação manual | PO |

---

## Critérios de Aceite

- [ ] `robots.txt` contém blocos para: `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`,
  `anthropic-ai`, `Google-Extended`, `Googlebot`
- [ ] `llms.txt` menciona setores, métricas reais, stack completa, localização e diferenciais
- [ ] `llms-full.txt` criado com conteúdo completo e detalhado
- [ ] JSON-LD não contém `elessandrodev@gmail.com`
- [ ] JSON-LD contém `@type: FAQPage` com mínimo 5 perguntas relevantes
- [ ] JSON-LD contém `@type: Service` individuais por serviço
- [ ] `site.webmanifest` com `theme_color: "#10B981"`
- [ ] `sitemap.xml` com `lastmod` atual
- [ ] `npm run build` sem erros
- [ ] `npm run lint` zero erros
- [ ] `npm run test:coverage` ≥ 90% (testes existentes não afetados — mudanças são em arquivos estáticos)

---

## Arquivos a Criar/Modificar

```
public/robots.txt         — MODIFICAR
public/llms.txt           — MODIFICAR
public/llms-full.txt      — CRIAR (novo)
public/site.webmanifest   — MODIFICAR
public/sitemap.xml        — MODIFICAR
index.html                — MODIFICAR
src/pages/Index.tsx       — MODIFICAR
```

---

## Quality Gates

| Gate | Critério |
|------|----------|
| ESLint | Zero erros |
| Build | Sem warnings de chunk > 600KB |
| Testes | Todos os testes existentes passando (não há testes novos — mudanças são em arquivos estáticos) |
| Validação JSON-LD | Testar em https://validator.schema.org/ |

---

## Documentação a Atualizar

- `CHANGELOG.md` — adicionar entry `[0.0.32]`
- `PROJECT.md` — atualizar status de SEO Agêntico e GEO
- `tasks/TASK-032-geo-seo-auditoria-e-otimizacao.md` — criar ao iniciar implementação
- `reviews/QA-032.md` — criar ao concluir

---

## ✍️ Assinatura de Aprovação

**PO:** Elessandro Prestes Macedo
**Decisão:** ⬜ Aprovado | ⬜ Reprovado | ⬜ Requer ajustes

> *Assine aprovando ou indique os ajustes necessários antes da implementação iniciar.*

---

_Spec criada em: 2026-09-07 | Agente: Gemini/Antigravity_
