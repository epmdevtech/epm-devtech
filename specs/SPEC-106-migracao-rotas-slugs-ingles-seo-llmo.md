# SPEC-106 — Migração de Rotas e Slugs para Inglês + Redirecionamentos 301 e SEO/LLMO

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-106                                   |
| **Data**      | 2026-10-03                                 |
| **Autor**     | Elessandro Prestes Macedo / Gemini         |
| **Status**    | Aprovada                                   |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

As rotas atuais usam slugs em português (`/servicos`, `/como-trabalhamos`, ...). Objetivo: padronizar as URLs em inglês (convenção de mercado, melhor legibilidade para crawlers de IA/LLMs), **mantendo todo o conteúdo visual em português**, sem perder autoridade de domínio (link equity) das URLs já indexadas pelo Google.

## Objetivo

1. Migrar todos os slugs de navegação para inglês (rotas, links internos, canonicals, pré-render).
2. Garantir **301 reais (edge/Vercel)** das URLs legadas para as novas, com fallback client-side no React Router.
3. Atualizar `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `site.webmanifest`, JSON-LD do `index.html` e `PROJECT.md`.

---

## Diagnóstico (levantamento do código atual)

- Rotas definidas em `src/App.tsx` (linhas 37–51) com `<Route path>` e `<Navigate>` legados (`/setores`, `/autoridade`, `/diferenciais`, `/tecnologias`, `/faq`).
- 301s existentes em `vercel.json` apontam para slugs **antigos** (`/experiencia`, `/engenharia`, `/duvidas-frequentes`) → criariam **cadeias de redirecionamento** (2 saltos) se não forem reapontados diretamente aos novos destinos.
- ~234 ocorrências de slugs antigos em 27 arquivos de `src/`, `e2e/`, `public/`, `index.html`, `scripts/prerender.js`, `vercel.json`.
- Observação técnica: `<Navigate replace>` do React Router é redirecionamento **client-side** (não emite HTTP 301 e não transfere autoridade para o Googlebot). O 301 real só é obtido em `vercel.json`. Ambos serão implementados (camadas complementares).

## Mapeamento de Rotas

| Rota legada            | Nova rota        | Componente (inalterado)  |
|------------------------|------------------|--------------------------|
| `/`                    | `/`              | `Home.tsx`               |
| `/servicos`            | `/services`      | `ServicesPage.tsx`       |
| `/como-trabalhamos`    | `/how-we-work`   | `HowWeWorkPage.tsx`      |
| `/experiencia`         | `/experience`    | `ExperiencePage.tsx`     |
| `/engenharia`          | `/engineering`   | `EngineeringPage.tsx`    |
| `/sobre`               | `/about` ✅ D1    | `AboutPage.tsx`          |
| `/contato`             | `/contact`       | `ContactPage.tsx`        |
| `/duvidas-frequentes`  | `/faq` ✅ D2      | `FAQPage.tsx`            |

Legados antigos (já em 301) são **reapontados diretamente** ao destino final (sem cadeias):

| Origem        | Destino final    |
|---------------|------------------|
| `/setores`    | `/experience`    |
| `/autoridade` | `/experience`    |
| `/diferenciais` | `/engineering` |
| `/tecnologias`  | `/engineering` |

### Decisões do PO (resolvidas em 2026-10-03)

- **D1:** `/about` — **aprovado**.
- **D2:** `/faq` — **aprovado** (`/duvidas-frequentes` → 301 `/faq`). Contexto: o briefing não citava `/duvidas-frequentes`. Recomendado: `/faq` (a rota `/faq` hoje é redirect legado → passa a ser canônica; `/duvidas-frequentes` → 301 `/faq`). Alternativas: `/frequently-asked-questions` ou manter `/duvidas-frequentes`.

---

## Escopo

### Está incluído (IN)

1. **Roteador (`src/App.tsx`):** novas rotas em inglês + `<Navigate replace>` para cada slug legado (incluindo `/servicos`, `/como-trabalhamos`, `/experiencia`, `/engenharia`, `/sobre`, `/contato`, `/duvidas-frequentes`, `/setores`, `/autoridade`, `/diferenciais`, `/tecnologias`).
   - Nota: o trecho JSX do briefing contém sintaxe corrompida (`element="{<Navigate"`); será usada a sintaxe correta `element={<Navigate to="..." replace />}`.
2. **Links internos:** `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `HomeServicesBento.tsx`, `Home.tsx`, `NotFound.tsx`, `ServicesPage`, `ContactPage`, `AboutPage`, `FAQPage`, `ScrollManager.tsx` (mapa de hashes legados → novas rotas). Centralização das rotas em constante tipada `src/config/routes.ts` (fonte única) usada pelos componentes.
3. **Canonicals/OG/Twitter** em todas as páginas (`<link rel="canonical">`, `og:url`).
4. **Pré-render (`scripts/prerender.js`):** `path` das rotas em inglês → `dist/services/index.html` etc.
5. **`vercel.json`:** 301 permanentes diretos legado → novo (inclui variantes com barra final e `:path*` quando aplicável), preservando o rewrite SPA e sem afetar `/odontologia-demo`.
6. **SEO/LLMO:** `public/sitemap.xml` (apenas URLs novas, `lastmod` atualizado, hreflang `pt-BR` mantido), `public/robots.txt` (sitemap e verificação de que não bloqueia as novas rotas; sem `Disallow` de legados para o Google seguir os 301), `public/llms.txt`, `public/llms-full.txt`, `public/site.webmanifest` (`shortcuts` apenas se existirem URLs; caso contrário, sem alteração), JSON-LD em `index.html` (`@id`/`url` de `/servicos#…`, `/duvidas-frequentes`).
7. **Testes:** atualização de testes unitários (Vitest) e E2E (Playwright) para novas rotas; novos testes de redirecionamento legado → novo.
8. **Documentação:** `PROJECT.md` (tabela de rotas, 301, estrutura), `CHANGELOG.md`, TASK, QA e checklist manual de Search Console.

### Está excluído (OUT)

- Tradução do conteúdo visual (permanece pt-BR).
- IDs de âncora internos (`#sistemas`, `#integracoes`, `#contextos`, `#organizacoes`, etc.) e `/odontologia-demo`.
- Renomeação de arquivos de componentes/páginas.
- Edição de SPECs/QAs/REVIEWs históricos (registros imutáveis).
- Ação no Google Search Console (feita manualmente pelo PO — ver checklist abaixo).
- Deploy.

---

## Requisitos Funcionais

1. Cada nova rota renderiza o mesmo componente da rota legada correspondente.
2. Qualquer URL legada responde com 301 (Vercel) e, no cliente, com `Navigate replace` para o destino final em **um único salto**.
3. Nenhum link interno, canonical, `og:url`, sitemap ou llms aponta para slug legado.
4. Hashes legados na raiz (`/#servicos`, ...) redirecionam para as novas rotas.
5. A rota 404 continua tratando URLs desconhecidas.

## Requisitos Não-Funcionais

| Requisito        | Critério                                                         |
|------------------|------------------------------------------------------------------|
| SEO              | Canonical único e em inglês por rota; sitemap só com URLs novas; zero cadeias de redirect |
| Acessibilidade   | Foco programático no `<h1>`/`aria-current` preservados nas novas rotas |
| Testes           | Cobertura ≥ 90%; E2E multi-rota atualizado                       |
| Build            | Sem warnings de chunk > 600KB; pré-render gera `dist/<nova-rota>/index.html` |

---

## Comportamento Esperado

### Cenário 1: Acesso à nova URL
**Dado** que o usuário acessa `/services`
**Quando** a página carrega
**Então** `ServicesPage` é renderizada, canonical = `https://epmdevtech.com.br/services` e o item "Serviços" do menu tem `aria-current="page"`.

### Cenário 2: Acesso à URL legada (Googlebot)
**Dado** que um crawler requisita `/servicos`
**Quando** o edge da Vercel processa a requisição
**Então** responde `301 Location: /services` (um salto).

### Cenário 3: Favorito antigo no SPA / dev local
**Dado** que o usuário abre `/sobre` em ambiente sem edge
**Quando** o React Router resolve a rota
**Então** `Navigate replace` leva a `/about` sem entrada no histórico.

### Cenário 4: Legado antigo encadeado
**Dado** `/setores` → **Então** 301 direto para `/experience` (sem passar por `/experiencia`).

---

## Critérios de Aceitação

- [ ] `grep` por slugs legados em `src/` (exceto mapa de redirects/testes de legado), `public/`, `index.html`, `scripts/` retorna zero ocorrências fora dos pontos de redirect
- [ ] `vercel.json` contém 301 para todos os 11 legados, sem cadeias
- [ ] `sitemap.xml` lista 8 URLs novas, nenhuma legada
- [ ] `llms.txt`/`llms-full.txt` com links novos
- [ ] `dist/<rota>/index.html` gerado para as 7 rotas novas com canonical correto
- [ ] Testes unitários e E2E verdes; cobertura ≥ 90%
- [ ] `npm run lint` zero erros; `npm run build` sem warning > 600KB
- [ ] PROJECT.md e CHANGELOG.md atualizados

---

## Impactos e Dependências

### Arquivos a criar
- `src/config/routes.ts`
- `tasks/TASK-106-migracao-rotas-slugs-ingles-seo-llmo.md`
- `reviews/QA-106.md`

### Arquivos a modificar
`src/App.tsx`, `src/components/layout/Header.tsx`, `src/components/sections/{Footer,Hero,HomeServicesBento}.tsx`, `src/components/routing/ScrollManager.tsx`, `src/pages/{Home,ServicesPage,HowWeWorkPage,ExperiencePage,EngineeringPage,AboutPage,ContactPage,FAQPage,NotFound}.tsx`, testes correspondentes em `__tests__/`, `e2e/*.spec.ts`, `scripts/prerender.js`, `vercel.json`, `index.html`, `public/{sitemap.xml,robots.txt,llms.txt,llms-full.txt,site.webmanifest}`, `PROJECT.md`, `CHANGELOG.md`.

### Dependências
- Depende de: SPEC-060 / SPEC-071 (estrutura multi-rota)
- Bloqueia: nenhuma

---

## Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Perda temporária de ranking | Média | 301 diretos, sitemap atualizado, manter 301 por ≥ 12 meses |
| Cadeias de redirect | Média | Reapontar 301 antigos ao destino final; teste automatizado |
| Redirect loop (`/faq` legado → canônico) | Baixa | Remover o redirect `/faq` antigo e testar |
| Prerender gera path errado | Baixa | Teste/inspeção de `dist/` |
| Links quebrados em docs externos (LinkedIn, GitHub) | Média | Cobertos pelos 301; PO revisa perfis |

## Checklist manual do PO (pós-deploy, fora do escopo da IA)

1. Search Console: reenviar `sitemap.xml`.
2. Inspecionar URL das novas rotas e solicitar indexação.
3. (Opcional) Ferramenta "Mudança de endereço" **não** se aplica (mesmo domínio); apenas monitorar relatório de Páginas/Redirecionamentos.
4. Atualizar links em LinkedIn/GitHub/Google Business Profile.

---

## Referências

- ADR relacionado: avaliar ADR-007 (convenção de URLs em inglês) — a ser criado na implementação, por ser decisão arquitetural.
- SPEC-060 / SPEC-071.

---

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-10-03               |
| **Assinatura**     | [x] Aprovado [ ] Rejeitado |
| **Observações**    | D1 = /about; D2 = /faq   |
