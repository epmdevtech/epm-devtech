# Auditoria Técnica de Validação — Blog EPM DevTech

| Campo | Valor |
|---|---|
| **Data** | 2026-10-22 |
| **Branch auditada** | `develop` (`94e200b`) |
| **Documento auditado** | `docs/blog.md` |
| **Escopo** | Validação independente das afirmações e recomendações do relatório anterior |
| **Natureza** | Auditoria somente leitura — nenhuma correção, blog, dependência ou configuração foi alterada |
| **Artefatos gerados** | `docs/blog-auditoria-validacao.md`, `specs/SPEC-118-blog-tecnico.md` (draft) |
| **Artefatos de build/teste** | `dist/`, `test-results/` (ambos ignorados pelo Git) |

> **Atualização 2026-10-22:** este documento registra a auditoria histórica de validação. O blog foi implementado na TASK-118; consulte `docs/blog-publicacao.md` para o guia operacional.

---

## 1. Resumo executivo

A auditoria confirma a maior parte das afirmações de `docs/blog.md`, com seis correções de entendimento relevantes:

1. **O soft 404 é real e confirmado em produção.** `/blog`, `/blog/slug-inexistente` e rotas aleatórias retornam HTTP 200 com o HTML da home. O `NotFound` do React só aparece depois da execução de JavaScript.
2. **O HTML inicial não contém o corpo das páginas.** As sete rotas pré-renderizadas contêm apenas título, metadados e um `<header>` oculto com H1 e descrição. A home não é pré-renderizada e não possui H1 no HTML inicial.
3. **Não existe hidratação.** `src/main.tsx` usa `createRoot`, não `hydrateRoot`. O conteúdo estático dentro de `#root` é descartado e re-renderizado no cliente. A proposta do blog precisa declarar isso explicitamente; "hidratação sem divergências" não é o comportamento atual.
4. **O JSON-LD é global e o `FAQPage` não corresponde integralmente ao conteúdo visível.** Há divergência em 3 respostas e 1 pergunta entre `index.html` e `src/config/faq.ts`, além de `FAQPage` ser injetado em todas as rotas, inclusive na 404.
5. **As 17 vulnerabilidades de produção existem, mas a priorização do scanner não corresponde ao risco real.** `next` e `sharp` entram por causa do pacote `geist`, que não é importado. A remoção de `geist` tende a eliminar a cadeia mais crítica. A maior parte das demais ocorrências é de ferramentas de build, sem entrada não confiável no fluxo atual.
6. **A arquitetura suporta o blog, mas o pipeline proposto precisa de ajustes.** O manifesto precisa ser gerado antes do `vite build`, o sitemap precisa deixar de ser manual, o 404 real precisa ser resolvido na hospedagem e o prerender precisa gerar corpo de artigo, não apenas metadados.

**Recomendação final: apto após correções prévias específicas.** Não há evidência técnica que justifique migrar de Vite/React Router para outro framework. O blog é viável com Markdown versionado e geração estática, desde que as correções de 404, pipeline, sitemap, testes e dependências sejam tratadas em tarefas separadas.

---

## 2. Estado inicial do repositório e limitações

### 2.1 Estado observado

```text
## develop...origin/develop
?? docs/blog.md
```

- Branch `develop`, sincronizada com `origin/develop`.
- Única alteração preexistente: `docs/blog.md` não rastreado.
- Nenhum arquivo de código, configuração, dependência ou lockfile foi alterado durante esta auditoria.
- `npm run build` e os testes geraram `dist/` e `test-results/`, ambos cobertos pelo `.gitignore` (`.gitignore:11` e `.gitignore:36`).
- Nenhum `npm audit fix`, atualização, commit, push ou deploy foi executado.

### 2.2 Limitações

- O servidor local usado para simular a Vercel foi escrito em `/tmp` e não reproduz os redirects do `vercel.json`; por isso `/servicos` foi validado apenas em produção.
- O `curl` de produção foi somente leitura, limitado ao domínio do próprio projeto.
- O Playwright local registrou erros `SyntaxError: Unexpected token '<'` em `_vercel/insights/script.js` e `_vercel/speed-insights/script.js`. São artefatos da simulação local (os endpoints da Vercel não existem no servidor de teste), não erros da aplicação.
- A suíte E2E completa não foi executada; foi executada integralmente a suíte `e2e/multi-route-navigation.spec.ts` (13/13).
- Lighthouse não foi executado.
- Contagens de `npm audit` dependem do registry e da base de advisories na data da execução.

---

## 3. Matriz de validação das afirmações de `blog.md`

| # | Afirmação | Status | Evidência | Observação |
|---|---|---|---|---|
| 1 | Stack React 18, TypeScript, Vite 5, Tailwind 3, React Router 6, Helmet, Vercel | Confirmado | `package.json:17-101`, `src/App.tsx:3-4`, `vercel.json` | — |
| 2 | Build é `vite build && node scripts/prerender.js` | Confirmado | `package.json:8` | — |
| 3 | O prerender grava `dist/<rota>/index.html` | Confirmado | `scripts/prerender.js:75-132`; `dist/services/index.html` | Sete rotas; a home não é pré-renderizada |
| 4 | A Vercel serve arquivo estático antes do rewrite | Confirmado | `/services` em produção retorna o HTML pré-renderizado, não o `index.html` da home | Também confirmado pela documentação da Vercel |
| 5 | `vercel.json` tem redirects, headers, rewrite e nenhum 404 real | Confirmado | `vercel.json:2-58`, `vercel.json:78-83` | O rewrite catch-all intercepta qualquer URL |
| 6 | `middleware.ts` atua apenas nos subdomínios | Confirmado | `middleware.ts:14-17`, `:36-41` | Para o domínio principal retorna `undefined` |
| 7 | Não há banco, API, autenticação ou CMS | Confirmado | Estrutura do repositório | Há integração externa com EmailJS, mas sem backend próprio |
| 8 | Existem 8 rotas canônicas e um catch-all `*` | Confirmado | `src/config/routes.ts:9-18`, `src/App.tsx:36-55` | — |
| 9 | Existem 11 redirects legados espelhados em `vercel.json` | Confirmado | `src/config/routes.ts:23-34`, `vercel.json:2-57` | — |
| 10 | Documentação fala em 301, produção responde 308 | Confirmado | `src/config/routes.ts:7`, `vercel.json` (`permanent: true`), `curl /servicos` | 308 é permanente e preserva o método; para GET equivale ao 301 |
| 11 | `src/pages/Index.tsx` é legado, não roteado, mas testado | Confirmado | `src/App.tsx:10` importa `Home`; `src/pages/__tests__/Index.test.tsx` | — |
| 12 | O site é SPA com CSR e prerender parcial | Confirmado | `src/main.tsx:6`, `src/App.tsx:35`, `scripts/prerender.js` | A home não recebe prerender |
| 13 | O prerender copia `dist/index.html` e substitui metadados | Confirmado | `scripts/prerender.js:16`, `:83-122` | — |
| 14 | O prerender injeta `<header>` oculto com H1 e parágrafo | Confirmado | `scripts/prerender.js:124-128` | `opacity:0`, `height:0`, `overflow:hidden`, `aria-hidden="true"` |
| 15 | O HTML inicial não contém corpo nem links internos | Confirmado | `dist/services/index.html`; `curl` local e produção | `#root` contém apenas o header oculto |
| 16 | JSON-LD é global e não específico por rota | Confirmado | `index.html:194-380`; `scripts/prerender.js` não altera JSON-LD | O mesmo bloco aparece em todas as rotas, inclusive 404 |
| 17 | Title, description, canonical, OG e Twitter são específicos por rota | Parcialmente confirmado | `scripts/prerender.js:85-122`; páginas com `Helmet` | Vale para as 7 rotas pré-renderizadas. A home usa os metadados-base. `twitter:image` não existe no HTML inicial. |
| 18 | Sitemap é manual, com 8 URLs | Confirmado | `public/sitemap.xml`; `src/config/__tests__/routes.test.ts:42-47` | — |
| 19 | `robots.txt` permite crawlers de IA e referencia o sitemap | Confirmado | `public/robots.txt` | — |
| 20 | Existem `llms.txt` e `llms-full.txt` | Confirmado | `public/llms.txt`, `public/llms-full.txt` | O teste de rotas exige que todas as rotas canônicas apareçam neles |
| 21 | `FAQPage` está no JSON-LD global de todas as rotas | Confirmado | `index.html:307-377` | Também aparece na 404 |
| 22 | Rotas inexistentes retornam HTTP 200 | Confirmado | Produção e simulação local: `/rota-auditoria-xyz-987`, `/blog`, `/blog/slug-inexistente` | Soft 404 |
| 23 | `/blog` retorna 200 antes de existir | Confirmado | `curl https://epmdevtech.com.br/blog` | Retorna o HTML da home com canonical da home |
| 24 | Trailing slash retorna 200 | Confirmado | `curl https://epmdevtech.com.br/services/` | Mesmo HTML canônico de `/services` |
| 25 | O teste do sitemap exige igualdade exata | Confirmado | `src/config/__tests__/routes.test.ts:42-47` | Também há teste de exatidão das 8 rotas (`:12-23`) |
| 26 | `lastmod` do sitemap é fixo em `2026-10-03` | Confirmado | `public/sitemap.xml:7` e demais entradas | — |
| 27 | `@tailwindcss/typography` está instalado mas não habilitado | Confirmado | `package.json:79`; `tailwind.config.ts:210` | `plugins: [tailwindcssAnimate]` |
| 28 | O padrão `src/config/faq.ts` é precedente de conteúdo tipado | Confirmado | `src/config/faq.ts:1-12` | — |
| 29 | O HTML gerado por Markdown não é coberto pelo `content` do Tailwind | Condicionalmente confirmado | `tailwind.config.ts:6-9` | Só é problema se o Markdown gerar classes utilitárias arbitrárias; com `prose`/CSS próprio, o risco é menor |
| 30 | `tsconfig.app.json` usa `strict: false` | Confirmado | `tsconfig.app.json:19` | Reduz a proteção de tipos em novos modelos de conteúdo |
| 31 | O E2E usa `npm run dev` e testa CSR | Confirmado | `playwright.config.ts:25-30` | Não valida `dist/` nem status HTTP real |
| 32 | `npm audit --omit=dev` reporta 17 vulnerabilidades | Confirmado | `npm audit --omit=dev --json`: 1 critical, 11 high, 5 moderate | A enumeração do relatório omite `react-router-dom` entre os 5 moderate |
| 33 | `next` e `sharp` não aparecem no bundle final | Confirmado | Busca em `dist/` não encontrou `next` nem `sharp` | `next` é peer opcional instalado por causa de `geist`; `sharp` é dependência opcional de `next` |
| 34 | A maior parte das ocorrências está em ferramentas de build | Parcialmente confirmado | `npm explain next`; `npm ls` | `next`/`sharp` não são ferramentas de build: são dependências não utilizadas. As demais são majoritariamente build-time. |
| 35 | `geist` está em `dependencies` e não é importado | Confirmado | Nenhuma ocorrência de `geist` em `src/`, `index.html`, `vite.config.ts` ou `tailwind.config.ts` | É a causa raiz da instalação de `next` |
| 36 | O blog é viável sem reescrever a aplicação | Confirmado | Arquitetura de rotas, layout e componentes reutilizáveis | Com as ressalvas de pipeline, 404 e hidratação |
| 37 | Markdown no Git é a alternativa de menor complexidade | Confirmado | Ausência de CMS/backend; volume inicial pequeno | Recomendação compatível com o contexto |
| 38 | O pipeline proposto (manifesto + prerender) é suficiente | Parcialmente confirmado | `package.json:8`; `scripts/prerender.js` | Falta definir a ordem de geração do manifesto antes do `vite build` e a estratégia de hidratação/renderização |
| 39 | Os riscos de regressão listados existem | Confirmado | `routes.test.ts`, `Header.test.tsx`, E2E, `tailwind.config.ts` | Há um risco adicional: o teste de `llms.txt`/`llms-full.txt` se `/blog` entrar em `ROUTES` |
| 40 | Há um 6º link no header e risco em 1024px | Inconclusivo | `Header.test.tsx:23-43`; `e2e/multi-route-navigation.spec.ts:81` | Os testes enumeram 5 links esperados, mas não afirmam a ausência de um 6º; o comportamento visual em 1024px não foi testado |

---

## 4. Vulnerabilidades de dependências e priorização de risco

### 4.1 Resultado atual

| Comando | Resultado |
|---|---|
| `npm audit --omit=dev` | **17** vulnerabilidades: 1 critical, 11 high, 5 moderate |
| `npm audit` (com dev) | **33** vulnerabilidades: 4 critical, 19 high, 9 moderate, 1 low |
| Gerenciador/lockfile | npm 11.21.0 / `package-lock.json` (lockfileVersion 3) |
| Node local | v24.0.0 |

As 4 critical do audit completo incluem `vitest`, `tinypool` e `@vitest/coverage-v8`, que são ferramentas de teste e não fazem parte do runtime publicado. O relatório anterior analisou apenas produção; está correto nesse recorte, mas a dívida total é maior.

### 4.2 Tabela priorizada

| Pacote | Severidade | Caminho da dependência | Impacto demonstrado | Correção sugerida | Prioridade |
|---|---|---|---|---|---|
| `next` 16.1.6 | Crítica (scanner) | `geist@1.7.0` (peer obrigatório) → `next`; também peer opcional de `@vercel/analytics` e `@vercel/speed-insights` | Nenhum no runtime atual: não é importado, não está no `dist/`, não há servidor Next. Os advisories críticos exigem runtime Next (RCE em servidor Windows, RCE na Image Optimization API, SSRF, bypass de middleware). | Remover `geist` (não utilizado) e confirmar que `next`/`sharp` saem do lockfile. Não atualizar Next isoladamente. | Alta (higiene), baixa (exploração) |
| `sharp` 0.34.5 | Alta | `next` (opcional) → `sharp` | Nenhum: processamento de imagem do Next não é executado. Não está no bundle. | Sai junto com `next`; se voltar a ser usado, atualizar para `0.35.5`. | Baixa |
| `postcss` 8.5.6 (direto/dev) e 8.4.31 (via `next`) | Alta | `postcss` direto; `next` → `postcss@8.4.31` | Build-time. Advisories de XSS ao serializar `</style>`, leitura arbitrária de `.map` via `sourceMappingURL` e path traversal. O build atual processa CSS do próprio repositório, não entrada de usuário. | Atualizar `postcss` para `8.5.31` (patch/minor compatível com Tailwind 3 e Vite 5). | Média |
| `lodash` 4.17.23 | Alta | `recharts@2.15.4` → `lodash` | Runtime potencial, mas `recharts` só é importado por `src/components/ui/chart.tsx`, que não é consumido por nenhuma página. `lodash` não aparece no `dist/`. Advisories de injeção via `_.template` e prototype pollution em `_.unset`/`_.omit`; não há uso com dados não confiáveis. | Atualizar para `4.18.1` quando `recharts`/`chart.tsx` for usado; ou remover `recharts` se continuar dead code. | Baixa |
| `nanoid` 3.3.11 | Alta | `postcss` → `nanoid` | Build-time. Loops com tamanho negativo/zero em geradores customizados. O build controla o tamanho. | Atualizar para `3.3.18`. | Baixa |
| `source-map-js` 1.2.1 | Alta | `postcss` → `source-map-js` | Build-time. ReDoS com seções indexadas de source map. Entrada é o CSS do próprio projeto. | Atualizar para `1.2.2`. | Baixa |
| `picomatch` 2.3.1 / 4.0.3 | Alta | `micromatch`/`chokidar`/`tailwindcss`; `vitest` (dev) | Build-time/teste. ReDoS via quantificadores extglob e injeção em classes POSIX. Padrões controlados pelo desenvolvedor. | Atualizar 2.x para `2.3.2` e 4.x para `4.0.4` quando as faixas permitirem. | Baixa |
| `braces` 3.0.3 | Alta | `micromatch`/`chokidar` → `braces` | Build-time. Exaustão de pilha com padrões profundamente aninhados. | Não há 3.0.4 publicado; a correção exige `chokidar` 4 / Tailwind 4. Não migrar só por isso. | Baixa |
| `micromatch` 4.0.8 | Alta | `tailwindcss`/`fast-glob` → `micromatch` | Build-time. Herda `braces`. | Sem correção compatível com Tailwind 3; avaliar Tailwind 4 em tarefa separada. | Baixa |
| `chokidar` 3.6.0 | Alta | `tailwindcss` → `chokidar` | Build/watch. Herda `braces`. | Correção exige Tailwind 4 / chokidar 4. Não é bloqueador do blog. | Baixa |
| `fast-glob` 3.3.3 | Alta | `tailwindcss` → `fast-glob` | Build-time. Herda `micromatch`/`braces`. | Sem correção compatível; avaliar com Tailwind 4. | Baixa |
| `tailwindcss` 3.4.19 | Alta | Direto (dev) | Build-time. Agrega `chokidar`, `fast-glob`, `micromatch`, `braces`. | Correção sugerida pelo scanner é Tailwind `4.3.3` (major). Não recomendada para o blog sem SPEC própria. | Baixa |
| `react-router` 6.30.3 | Moderada | `react-router-dom` → `react-router` | Runtime no navegador. Advisories de open redirect via `\` e URL protocol-relative, e injeção de construtor na hidratação SSR. O app só navega para destinos estáticos (`/contact`, redirects legados); não há destino controlado por usuário. A hidratação SSR não existe. | `react-router-dom` 6.30.6 corrige parte; o advisory de open redirect via backslash só tem correção em 7.18.4 (major). Avaliar 6.30.6 primeiro; 7.x exige SPEC de migração. | Baixa/Média |
| `react-router-dom` 6.30.3 | Moderada | Direto | Mesmo cenário acima. | Atualizar para `6.30.6` e testar navegação/redirects. | Média |
| `@remix-run/router` 1.23.2 | Moderada | `react-router`/`react-router-dom` | Mesmo cenário; advisory de open redirect por URL protocol-relative. | Atualizar via `react-router-dom` 6.30.6 (esperado `1.23.4`). | Média |
| `baseline-browser-mapping` 2.10.0 | Moderada | `next` e `browserslist` | Build-time. DoS com entrada inválida. | Atualizar para `2.11.30`; parte sai com `next`. | Baixa |
| `postcss-selector-parser` 6.0.10 (dev) e 6.1.2 | Moderada | `@tailwindcss/typography`; `tailwindcss` | Build-time. DoS por recursão/complexidade quadrática ao parsear seletores. | Avaliar atualização compatível; não é bloqueador. | Baixa |

### 4.3 Leitura de risco

- **A presença de um pacote vulnerável não prova exploração.** `next`, `sharp`, `lodash`, `nanoid`, `source-map-js`, `braces`, `chokidar`, `fast-glob`, `micromatch`, `picomatch` e `tailwindcss` não recebem entrada não confiável no fluxo atual.
- **A ausência no bundle reduz, mas não elimina, o risco.** Pacotes de build continuam executando em CI e na máquina do desenvolvedor; um comprometimento de dependência ou um conteúdo malicioso no repositório ainda pode explorá-los. Para o blog, o Markdown passa a ser uma nova entrada de build e deve ser tratado como não confiável na validação/sanitização.
- **A correção de maior alavancagem é remover `geist`.** Ele é a única razão pela qual `next` é instalado como peer obrigatório. `@vercel/analytics` e `@vercel/speed-insights` declaram `next` como peer opcional, e os imports usados são `@vercel/analytics/react` e `@vercel/speed-insights/react`.
- **Não misturar a correção de dependências com o blog.** Uma atualização de Tailwind 4, React Router 7 ou Vite 8 pode introduzir regressões visuais e de build que contaminariam o diagnóstico do blog.

---

## 5. Rotas e tratamento de HTTP 404

### 5.1 Camada de aplicação

- `src/App.tsx:53-54` define `<Route path="*" element={<NotFound />} />`.
- `src/pages/NotFound.tsx:16-19` define title e `meta robots noindex, nofollow`, mas **não define canonical, description ou Open Graph**.
- O NotFound é renderizado apenas no cliente. Ele não tem poder de alterar o status HTTP de uma resposta já enviada pelo servidor.

### 5.2 Camada de hospedagem

`vercel.json:78-83` contém:

```json
"rewrites": [
  {
    "source": "/((?!og-odontologia\\.jpg).*)",
    "destination": "/index.html"
  }
]
```

Esse rewrite captura qualquer caminho que não seja a imagem OG e devolve o `index.html` com status 200. Não existe `404.html` em `dist/` nem regra de status 404. Portanto, o status HTTP é sempre 200 para rotas desconhecidas.

### 5.3 Evidência de status e conteúdo

Produção (`https://epmdevtech.com.br`), `curl` somente leitura:

| URL | Status | Content-Type | Title inicial | Canonical inicial | Robots inicial | H1 inicial | `#root` |
|---|---|---|---|---|---|---|---|
| `/` | 200 | `text/html; charset=utf-8` | Home | `https://epmdevtech.com.br/` | `index, follow, ...` | 0 | vazio |
| `/services` | 200 | `text/html` | Serviços | `/services` | `index, follow, ...` | 1 (oculto) | header oculto |
| `/services/` | 200 | `text/html` | Serviços | `/services` | `index, follow, ...` | 1 (oculto) | header oculto |
| `/blog` | 200 | `text/html` | Home | `/` | `index, follow, ...` | 0 | vazio |
| `/blog/slug-inexistente` | 200 | `text/html` | Home | `/` | `index, follow, ...` | 0 | vazio |
| `/rota-auditoria-xyz-987` | 200 | `text/html` | Home | `/` | `index, follow, ...` | 0 | vazio |
| `/servicos` | 308 | `text/plain` | — | — | — | 0 | — |

Simulação local com precedência de arquivo estático + rewrite catch-all: os mesmos resultados de 200 para `/`, `/services`, `/services/`, `/blog`, `/blog/slug-inexistente`, `/rota-inexistente-1234` e `/faq`.

### 5.4 O que acontece depois do JavaScript

| URL | Título renderizado | Robots renderizado | Canonical renderizado | H1 renderizado | Texto útil em `#root` |
|---|---|---|---|---|---|
| `/services` | Serviços | **ausente** | `/services` | 1 | 4.239 caracteres, 20 links internos |
| `/rota-inexistente-1234` | Página Não Encontrada (404) | `noindex, nofollow` | **ausente** | 1 | 838 caracteres, 22 links |
| `/blog` | Página Não Encontrada (404) | `noindex, nofollow` | **ausente** | 1 | 838 caracteres |
| `/blog/slug-inexistente` | Página Não Encontrada (404) | `noindex, nofollow` | **ausente** | 1 | 838 caracteres |

Conclusões:

- **O status 404 real não existe hoje.** A página visual de erro é correta, mas chega com HTTP 200.
- **Crawlers que não executam JavaScript e scrapers sociais veem a home**, com canonical da home, `index, follow` e metadados da home. Isso é um soft 404 clássico.
- **Após a execução do JavaScript, a 404 perde canonical, description e Open Graph**, mas mantém o JSON-LD global. O estado inicial e o estado renderizado são inconsistentes.
- **`/services/` não redireciona para `/services`.** Ambos retornam 200 com o mesmo canonical. O canonical mitiga a duplicação, mas não elimina a variante.

### 5.5 Correção recomendada

1. **Gerar `dist/404.html` no build** com título "Página não encontrada", `meta robots noindex`, sem canonical da home, sem FAQPage e com mensagem visível. A Vercel serve `404.html` automaticamente para caminhos não encontrados, com status 404, quando nenhum arquivo ou rewrite os captura.
2. **Remover ou restringir o rewrite catch-all.** Como todas as rotas públicas atuais são pré-renderizadas (a home é `dist/index.html`; as demais são `dist/<rota>/index.html`), o catch-all pode ser removido. A navegação interna do React não depende dele; apenas carregamentos diretos de rotas não geradas passariam a 404, que é o comportamento desejado.
3. **Manter o `NotFound` do React** para navegação interna para caminhos desconhecidos e para o fallback visual.
4. **Testar em preview da Vercel**: `curl -I` para rota inexistente deve retornar `404`, e o corpo deve conter a página 404, não a home.
5. **Não confiar apenas em `noindex` no cliente** para resolver soft 404. O status HTTP precisa vir da hospedagem.

---

## 6. Renderização estática, HTML inicial e hidratação

### 6.1 Pipeline atual

```text
vite build
  └─ gera dist/index.html + assets
node scripts/prerender.js
  ├─ copia dist/index.html para dist/<rota>/index.html
  ├─ substitui title, description, canonical, OG e Twitter
  └─ injeta <header oculto> com H1 + descrição
```

O script não renderiza a árvore React. Ele apenas manipula strings do HTML base. As sete rotas pré-renderizadas são `services`, `how-we-work`, `experience`, `engineering`, `about`, `contact` e `faq` (`scripts/prerender.js:21-71`). A home não está na lista.

### 6.2 HTML inicial versus DOM renderizado

| Elemento | `/services` inicial | `/services` após JS | `/` inicial | `/` após JS |
|---|---|---|---|---|
| Title específico | Sim | Sim | Sim (home) | Sim |
| Description | Sim | Sim | Sim | Sim |
| Canonical | Sim | Sim | Sim | Sim |
| OG/Twitter | Parcial (sem `twitter:image`) | Sim | Parcial | Sim |
| Robots | Sim (`index, follow...`) | **Não** | Sim | **Não** |
| H1 | 1 oculto | 1 visível | 0 | 1 |
| Corpo principal | Não | Sim (4.239 caracteres) | Não | Sim |
| Links internos do corpo | 0 | 20 | 0 | 32 |
| JSON-LD específico | Não (global) | Não (global) | Não (global) | Não (global) |

Evidências:

- `dist/services/index.html`: `#root` contém exatamente o header oculto com H1 e descrição; nenhum link interno.
- Playwright após `networkidle`: 4.239 caracteres de texto e 20 links internos em `/services`; o header oculto não está mais no DOM.
- `dist/index.html`: `#root` vazio; nenhum H1 no HTML inicial.
- Com JavaScript desabilitado, `/services` exibe apenas o H1 e a descrição ocultos; `/rota-inexistente-1234` e `/blog` exibem corpo vazio.

### 6.3 Hidratação

**Não há hidratação.** `src/main.tsx:6` usa:

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(...)
```

`createRoot` não hidrata markup existente; ele renderiza do zero e substitui o conteúdo do container. Por isso o header oculto desaparece após o JavaScript. A afirmação de `blog.md` sobre "hidratação" é imprecisa: o comportamento atual é CSR com substituição do HTML pré-renderizado.

Isso tem consequência direta para o blog:

- Se o prerender injetar o corpo do artigo em `#root`, o React o substituirá no cliente.
- Para o crawler, o HTML estático é suficiente.
- Para o usuário, pode haver um flash entre o HTML estático e a primeira renderização React, dependendo do CSS e do tempo de carregamento do bundle.
- Para cumprir "hidratação sem divergências", seria necessário usar `hydrateRoot` e renderizar a árvore React completa no build (SSR/SSG), o que é uma mudança arquitetural maior.

### 6.4 Erros de hidratação e renderização

- Não foram observados erros de hidratação da aplicação.
- Os únicos `pageerror` no teste local foram `SyntaxError: Unexpected token '<'` para `_vercel/insights/script.js` e `_vercel/speed-insights/script.js`, endpoints que não existem no servidor de simulação. Não são erros do app.
- O console da aplicação não apresentou warnings de hidratação; o React Router emite apenas os avisos conhecidos de future flags em testes unitários.

### 6.5 Compatibilidade de `dist/blog/index.html` e `dist/blog/<slug>/index.html`

**É compatível com a hospedagem atual**, desde que:

- o build gere os arquivos antes do deploy;
- a Vercel continue dando precedência ao arquivo estático sobre o rewrite (comportamento confirmado por `/services`);
- o rewrite catch-all seja removido ou restrito, para que slugs inexistentes não caiam no `index.html` com 200;
- o `404.html` seja gerado.

O padrão `dist/<rota>/index.html` já é servido para `/services` em produção. O mesmo mecanismo atende `/blog` e `/blog/<slug>`.

### 6.6 Publicados, rascunhos e slugs inexistentes

O build atual não tem como distinguir nada disso, porque não há conteúdo. A implementação precisa:

- gerar arquivos apenas para artigos com `draft: false` (ou ausência de `draft`) e data de publicação válida;
- excluir rascunhos de listagem, sitemap, relacionados e prerender;
- não gerar `dist/blog/<slug>/index.html` para slug inexistente;
- deixar o slug inexistente cair no `404.html` da hospedagem;
- validar colisões de slug com rotas estáticas e entre artigos.

### 6.7 Riscos de renderização

| Risco | Evidência | Mitigação |
|---|---|---|
| HTML desatualizado | `scripts/prerender.js` copia o HTML base no build | Gerar no mesmo build; nunca versionar `dist/` |
| Conteúdo duplicado | `createRoot` substitui o HTML; o manifesto pode gerar HTML diferente | Teste de paridade entre HTML estático e HTML renderizado pelo React |
| Rota sem arquivo | Rewrite catch-all devolve 200 para qualquer URL | Remover catch-all + `404.html` |
| Flash visual | HTML estático substituído pelo React | CSS crítico + teste visual; ou `hydrateRoot` em SPEC própria |
| JSON-LD incorreto | Bloco global copiado para todas as rotas | Injetar JSON-LD por rota no prerender |
| Escape de HTML | `scripts/prerender.js:86-122` interpola strings sem escape | Escapar `& < > " '` em metadados e JSON-LD |

---

## 7. SEO, conteúdo oculto e semântica

### 7.1 O header oculto

Código responsável (`scripts/prerender.js:124-128`):

```js
routeHtml = routeHtml.replace(
  /<div id="root"><\/div>/,
  `<div id="root"><header style="opacity:0;height:0;overflow:hidden" aria-hidden="true"><h1>${route.h1}</h1><p>${route.description}</p></header></div>`
);
```

Fatos observados:

- Aparece nas 7 rotas pré-renderizadas; não aparece na home.
- O H1 oculto corresponde ao H1 visível em todas as 7 rotas (comparação feita com Playwright).
- O parágrafo oculto corresponde à meta description.
- `aria-hidden="true"` remove o conteúdo da árvore de acessibilidade.
- `opacity:0`, `height:0` e `overflow:hidden` o tornam invisível para usuários sem JavaScript.
- Após o React montar, o header oculto é removido; não há dois H1 no DOM final.
- O conteúdo não é diferente do conteúdo visível; portanto, **não é cloaking por conteúdo**. É um workaround frágil para dar H1 a scrapers/curl.

Avaliação:

- **Não é uma prática recomendada.** Texto oculto com `aria-hidden` e altura zero pode ser sinalizado por mecanismos de busca, mesmo quando o conteúdo coincide com o visível. Também não atende a usuários sem JavaScript nem a tecnologias assistivas.
- **Para o blog, não repetir o padrão.** O HTML do artigo deve ser visível, sem `opacity:0`, sem `height:0`, sem `aria-hidden`, com H1 único e corpo completo.
- **Para as páginas atuais, é dívida preexistente.** A correção adequada é gerar o conteúdo visível no HTML inicial (ou remover o header oculto e aceitar que o SEO dependa de JavaScript). Isso deve ser uma tarefa separada da implementação do blog.

### 7.2 Problemas de metadados encontrados

| Problema | Evidência | Impacto | Recomendação |
|---|---|---|---|
| `og:image` duplicado | `index.html:34` e `index.html:45` | HTML inválido; após o Helmet, chegam a existir 3 ocorrências | Manter uma única tag com `data-rh="true"` |
| `twitter:image` ausente no HTML inicial | `grep twitter:image dist/services/index.html` só encontra `twitter:image:alt` | Scrapers sociais que não executam JS não recebem a imagem do Twitter/X | Adicionar `twitter:image` no HTML base e no prerender |
| `robots` desaparece após o JavaScript | `meta[name="robots"]` com `data-rh="true"` em `index.html:22`; Helmet remove porque as páginas não o declaram | Perde-se `max-image-preview:large` e diretivas correlatas em crawlers que renderizam JS | Remover `data-rh` da meta global ou declará-la em cada `Helmet` |
| 404 inicial tem canonical da home | `dist/index.html` base; rewrite catch-all | Soft 404 com canonical da home para crawlers sem JS | 404 real na hospedagem + 404.html sem canonical da home |
| 404 renderizada perde canonical/description/OG | Playwright em `/rota-inexistente-1234` | Estado inicial e renderizado inconsistentes | Gerar 404.html estática e não depender do Helmet para isso |
| `FAQPage` global e divergente | `index.html:307-377` vs `src/config/faq.ts` | Dados estruturados não correspondem ao conteúdo visível em 3 respostas e 1 pergunta | Mover `FAQPage` para a rota `/faq` e gerar a partir de `FAQ_ITEMS`; comparar em teste |
| `og:type` é `website` em todas as rotas | `index.html:28`; prerender não altera | Artigos precisam de `og:type=article` | Injetar `og:type`, `article:published_time` e `article:modified_time` por artigo |

### 7.3 Divergências exatas do FAQ

Comparação entre `index.html` e `src/config/faq.ts`:

- Pergunta 2: mesma pergunta, **resposta diferente** (o JSON-LD promete retorno em até 24 horas úteis; o conteúdo visível não contém essa promessa).
- Pergunta 3: mesma pergunta, **resposta diferente** (formatação e texto dos modelos de contratação).
- Pergunta 4: **pergunta e resposta diferentes** (JSON-LD pergunta sobre atendimento fora de Toledo; o visível pergunta sobre atendimento remoto por região).
- Perguntas 1, 5, 6, 7 e 8: correspondem.

Isso é um problema de SEO/dados estruturados, não de segurança. A recomendação é gerar o JSON-LD a partir da mesma fonte tipada do conteúdo visível e adicionar um teste de igualdade semântica.

---

## 8. Sitemap, canonical URLs e dados estruturados

### 8.1 Sitemap

- `public/sitemap.xml` é manual, com 8 URLs.
- Todas as 8 URLs existem e retornam 200.
- O `lastmod` é fixo em `2026-10-03` em todas as entradas.
- Não há geração automática no build.
- O teste `src/config/__tests__/routes.test.ts:42-47` exige igualdade exata entre as URLs do sitemap e as 8 rotas canônicas.
- Não há URL de rascunho porque não há blog. Quando houver, o sitemap manual é um risco de incluir rascunho ou esquecer artigo publicado.

**Recomendação:** gerar `dist/sitemap.xml` no build a partir de uma fonte única (rotas estáticas + manifesto de artigos publicados). Incluir `/blog` apenas quando houver pelo menos um artigo publicado. Usar `updatedAt ?? publishedAt` como `lastmod`. Atualizar o teste para validar o gerador e o conjunto esperado, não um número fixo.

### 8.2 Canonical URLs

- O domínio é consistente: `SITE_CONFIG.url` e `BASE_URL` usam `https://epmdevtech.com.br` (`src/config/site.ts:6`, `scripts/prerender.js:18`).
- As rotas canônicas não usam barra final.
- `/services/` retorna 200 com canonical `/services`; a variante não é redirecionada.
- O sitemap usa as mesmas URLs sem barra final.
- A 404 inicial herda o canonical da home; após o JS, o canonical desaparece.

**Recomendação:** manter canonical sem barra final, gerar 404.html sem canonical da home e, se possível, configurar `trailingSlash: false` na Vercel ou um redirect 308 de `/services/` para `/services` (decisão separada, com teste).

### 8.3 Dados estruturados

- O JSON-LD é válido (parseado com `JSON.parse`).
- Há um único bloco `application/ld+json`.
- O bloco contém `WebSite`, `ProfessionalService`, `Person` e `FAQPage`.
- O `FAQPage` é copiado para todas as rotas, inclusive 404.
- O `FAQPage` não corresponde integralmente ao conteúdo visível.
- Não há `BlogPosting`, `BreadcrumbList` ou `Article` porque não há blog.
- `og:image` está duplicado; `twitter:image` falta no HTML inicial.

**Recomendação:** separar o JSON-LD global (WebSite/Organization/Person) do JSON-LD por rota. Injetar `FAQPage` apenas em `/faq` e `BlogPosting` apenas em artigos. Não adicionar marcação sem conteúdo visível correspondente.

### 8.4 Viabilidade de sitemap por artigo

Sim. O build pode:

1. ler `content/blog/*.md`;
2. validar e filtrar publicados;
3. gerar as URLs de artigos;
4. combinar com as rotas estáticas;
5. escrever `dist/sitemap.xml`.

O mesmo manifesto deve alimentar a listagem, o prerender e o sitemap, evitando três listas divergentes.

---

## 9. Testes existentes e riscos de regressão

### 9.1 Testes que dependem de números fixos

| Teste | Dependência | Risco ao adicionar blog |
|---|---|---|
| `src/config/__tests__/routes.test.ts:12-23` | Exatamente 8 rotas, na ordem | Falha se `/blog` entrar em `ROUTES` |
| `src/config/__tests__/routes.test.ts:42-47` | Exatamente 8 URLs no sitemap | Falha se o sitemap ganhar artigos |
| `src/config/__tests__/routes.test.ts:49-53` | Extrai rotas do prerender por regex `path: "..."` | Pode capturar `blog/:slug` ou falhar com rotas dinâmicas |
| `src/config/__tests__/routes.test.ts:55-65` | Todas as rotas canônicas devem aparecer em `llms.txt` e `llms-full.txt` | Falha se `/blog` entrar em `ROUTES` e os arquivos não forem atualizados |
| `src/components/layout/__tests__/Header.test.tsx:23-43` | Enumera 5 links esperados; não afirma a ausência de um 6º | Não falha necessariamente com "Blog"; exige atualização se o conjunto esperado mudar |
| `e2e/multi-route-navigation.spec.ts:81` | Nome do teste e conjunto de "5 links + 1 CTA" | Não afirma contagem total; o risco principal é visual/layout |
| `e2e/design-system-and-stability.spec.ts:425-435` | Lista fixa de 8 rotas | Não cobre blog; pode precisar de atualização se o teste for de cobertura total |
| `src/pages/__tests__/Index.test.tsx` | Página legada `Index.tsx` | Não é afetada pelo blog, mas é dívida a considerar |

### 9.2 Testes executados nesta auditoria

| Comando | Resultado |
|---|---|
| `npm run lint` | Exit 0; zero erros |
| `npm test` | 42 arquivos, 285 testes, todos passando; exit 0 |
| `npm run build` | Exit 0; 7 rotas pré-renderizadas |
| `npm run test:e2e -- e2e/multi-route-navigation.spec.ts` | 13/13 passando |
| Suíte E2E completa | Não executada nesta auditoria |
| Lighthouse | Não executado |

### 9.3 Limitações dos testes atuais para o blog

- O E2E usa `npm run dev` (`playwright.config.ts:25-30`), não o build de produção. Ele não valida status HTTP 404, HTML inicial nem `dist/`.
- Não há teste de resposta HTTP. O teste de 404 verifica apenas o texto e o `noindex` no DOM renderizado (`e2e/multi-route-navigation.spec.ts:148-166`).
- O teste de sitemap lê `public/sitemap.xml`, não o artefato de `dist/`.
- O teste de rotas lê `scripts/prerender.js` por regex, o que é frágil.
- A cobertura do Vitest inclui `src/components/sections`, `src/components/layout` e `src/pages`; não inclui `scripts/` nem um futuro `src/lib/blog`.

### 9.4 Cobertura necessária para o blog

- Validação de frontmatter: campos obrigatórios, tipos, datas, categoria, slug.
- Slug: formato, unicidade, igualdade com o nome do arquivo, colisão com rotas estáticas.
- Rascunho: ausência de rota, listagem, sitemap, relacionados e prerender.
- Markdown: headings, listas, links, código, imagens, HTML bruto rejeitado/sanitizado, links externos com `rel`.
- Escape de metadados e JSON-LD.
- Geração de HTML por artigo e paridade com o componente React.
- Sitemap: apenas publicados, `lastmod` correto, sem duplicatas.
- 404: status HTTP real, corpo correto, `noindex`, sem canonical da home.
- Hidratação/CSR: ausência de divergências visuais e de console.
- Navegação: listagem, artigo, links internos, voltar, mobile e teclado.
- Produção: E2E contra um servidor que reproduza a Vercel (arquivo estático + `404.html`), não apenas o dev server.

---

## 10. Viabilidade arquitetural do blog

| Critério | Avaliação | Evidência/Observação |
|---|---|---|
| React 18 + Vite 5 + TypeScript | Compatível | Stack atual; sem necessidade de troca |
| React Router 6 | Compatível | Basta adicionar rotas; cuidado com testes de contagem |
| Markdown versionado no Git | Compatível | Não há CMS/backend; volume inicial pequeno |
| Parsing de Markdown no build | Compatível | `gray-matter` + `marked` em `devDependencies`; parser fora do bundle |
| Sanitização/HTML bruto | Requer implementação | `marked` não sanitiza por padrão; desabilitar HTML bruto ou usar allowlist |
| Validação de frontmatter | Requer implementação | Pode usar Zod (já instalado) ou validação manual |
| Geração de HTML por artigo | Compatível, com ajuste de pipeline | Precisa gerar antes do `vite build` se o app importar o manifesto |
| Metadados/canonical/OG por rota | Compatível | O prerender já substitui; falta `og:type=article`, `article:*` e `twitter:image` |
| Sitemap por artigo | Compatível | Gerar no build; hoje é manual |
| Página 404 real | Requer mudança na hospedagem | `404.html` + remoção do catch-all |
| Hospedagem Vercel | Compatível | Precedência de arquivo estático confirmada em produção |
| Impacto no build | Baixo para volume pequeno | N artigos = N arquivos HTML; parser só no build |
| Necessidade de CMS/backend | Não | Sem requisito de fluxo editorial colaborativo |
| Risco de regressão | Médio | Testes de contagem, header, sitemap, llms, prerender e Tailwind |
| Migração de framework | Não justificada | Nenhuma evidência de limitação estrutural do Vite/React Router |

**Conclusão:** a arquitetura é adequada. O blog deve ser implementado como extensão, não como reescrita. As mudanças críticas são de pipeline e de hospedagem, não de framework.

### 10.1 Lacunas técnicas que a proposta de `blog.md` não resolve completamente

1. **Ordem do build.** `package.json:8` executa `vite build` antes do prerender. Se o manifesto for gerado apenas no prerender, o bundle do cliente não o terá. É necessário gerar o manifesto antes do `vite build` (por exemplo, `prebuild` ou script próprio) ou usar um plugin Vite que o gere durante o build.
2. **Hidratação.** O app usa `createRoot`, não `hydrateRoot`. O HTML do artigo será substituído, não hidratado. Isso precisa ser uma decisão explícita, com teste de paridade, ou o projeto precisa migrar para SSG com `hydrateRoot` em uma SPEC separada.
3. **404 real.** O rewrite catch-all precisa sair; `404.html` precisa existir. Sem isso, o blog nascerá com o mesmo soft 404.
4. **Sitemap e testes.** O sitemap manual e os testes de igualdade exata precisam ser substituídos por um gerador e testes baseados no manifesto.
5. **Tailwind.** `content` cobre apenas `index.html` e `src/**/*.{ts,tsx}`. Classes utilitárias dentro do Markdown não serão geradas. Usar `prose`/CSS próprio e não permitir classes arbitrárias no Markdown.
6. **Tipos.** `strict: false` reduz a proteção dos novos modelos de conteúdo. Recomenda-se um módulo de blog com tipos explícitos e validação em runtime, independentemente do `strict` global.

---

## 11. As quatro decisões técnicas adicionais

### 11.1 Estratégia de conteúdo

**Alternativas:**

| Opção | Vantagens | Limitações |
|---|---|---|
| Markdown + frontmatter YAML | Simples, versionado, sem CMS, parser só no build, diff legível | Sem editor visual; validação precisa ser implementada; HTML bruto exige cuidado |
| MDX | Componentes React no conteúdo | Aumenta a superfície de execução, o bundle e o risco de XSS; parser mais complexo |
| Conteúdo em JSON/TS | Tipagem forte, sem parser de Markdown | Pior experiência de escrita; não resolve o corpo rico |
| CMS headless | Fluxo editorial para não técnicos | Fornecedor, autenticação, tokens, webhook, custo e complexidade desnecessários no volume atual |

**Recomendação:** Markdown + frontmatter YAML em `content/blog/<slug>.md`, com validação estrita no build. Não usar MDX no MVP.

**Regras mínimas de validação:**

- `slug` obrigatório, único, kebab-case, igual ao nome do arquivo, sem colisão com rotas estáticas.
- `title`, `description`, `publishedAt` e `category` obrigatórios.
- `category` em lista fechada.
- Datas ISO válidas; `updatedAt` ausente ou `>= publishedAt`.
- `draft` booleano; rascunhos excluídos de tudo que é público.
- `cover` opcional, mas se presente exige `alt`, `width`, `height` e arquivo existente.
- HTML bruto no Markdown rejeitado ou sanitizado por allowlist.
- Links permitidos: `http`, `https`, `mailto` e relativos; externos com `rel="noopener noreferrer"`.
- Autor fixo e real; sem inventar credenciais.
- Tempo de leitura calculado por contagem de palavras.
- Datas formatadas com `Intl.DateTimeFormat("pt-BR")`.

### 11.2 Geração estática

**Alternativas:**

| Opção | Como funciona | Vantagens | Limitações |
|---|---|---|---|
| A. SSG completo com `renderToString` + `hydrateRoot` | Renderiza a árvore React inteira no build e hidrata no cliente | Hidratação real, sem flash, melhor UX | Exige `StaticRouter`, tratar `Helmet`, `ThemeProvider`, Lenis/GSAP, `window`/`document`, lazy components; alto risco de regressão |
| B. Injeção do corpo no HTML + `createRoot` | O build injeta o HTML do artigo em `#root`; o React substitui no cliente | Menor mudança no prerender atual; crawlers veem o conteúdo; parser fora do bundle | Não é hidratação; pode haver flash; exige teste de paridade entre HTML estático e React |
| C. Páginas de artigo estáticas independentes | Gera HTML completo por artigo sem React; a listagem pode ser React ou estática | Melhor SEO/performance; zero divergência de hidratação; menor risco | Duplica header/footer ou exige template compartilhado; links para artigos fazem navegação completa |

**Recomendação:** para o MVP, **opção B com teste de paridade**, assumindo explicitamente que não há hidratação. Se o requisito de "hidratação sem divergências" for obrigatório, a opção A deve ser uma SPEC separada, com prova de conceito e orçamento de regressão. A opção C é a mais robusta para conteúdo e pode ser avaliada se o blog crescer e a duplicação de layout for aceitável.

**Garantias necessárias em qualquer opção:**

- Gerar `dist/blog/index.html` e `dist/blog/<slug>/index.html` no build.
- Injetar title, description, canonical, OG, Twitter e JSON-LD específicos.
- Incluir o corpo completo no HTML inicial, visível.
- Só gerar artigos publicados.
- Gerar `dist/404.html` e remover o catch-all.
- Gerar `dist/sitemap.xml` a partir do manifesto.
- Testar o HTML de `dist/`, não apenas o dev server.

### 11.3 Tratamento de erros HTTP

**Alternativas:**

| Camada | O que faz | Limitação |
|---|---|---|
| Aplicação React (`NotFound`) | Mostra a página 404 no cliente | Não altera o status HTTP; soft 404 |
| Servidor/hospedagem (`404.html` + ausência de catch-all) | Retorna 404 real e serve a página estática | Precisa ser configurado e testado no provedor |
| Configuração da hospedagem (`routes` com status 404) | Retorna 404 explícito para padrões | `routes` é mais complexo; `404.html` é suficiente na Vercel |
| Combinação | Hospedagem retorna 404 real; React cobre navegação interna | É a opção correta |

**Recomendação:** combinação. A hospedagem é a única camada que pode definir o status HTTP. O React continua responsável pela 404 de navegação interna e pelo fallback visual. Não usar apenas `noindex` no cliente.

### 11.4 Segurança e manutenção

**Recomendação:** separar em duas trilhas:

1. **Trilha de dívida de dependências (antes do blog):** remover `geist`; confirmar a saída de `next`/`sharp`; atualizar `postcss`, `source-map-js`, `nanoid`, `picomatch` e, se compatível, `react-router-dom` 6.30.6; avaliar `lodash`/`recharts`; adiar Tailwind 4, React Router 7 e Vite 8. Rodar lint, testes, build e E2E após cada grupo.
2. **Trilha do blog (depois):** Markdown + validação + sanitização + prerender + sitemap + 404 + testes. Não misturar com upgrades de dependências.

Adicionais:

- Adicionar `npm audit --omit=dev` ao CI somente depois da limpeza, com limite explícito (por exemplo, falhar em critical/high de produção).
- Avaliar CSP para o site principal. Hoje o `middleware.ts` aplica headers de segurança apenas aos subdomínios; o domínio principal não tem CSP nem `X-Content-Type-Options` no `vercel.json`. Com conteúdo Markdown, uma CSP reduz o impacto de HTML/JS injetado.
- Não usar `dangerouslySetInnerHTML` com HTML de Markdown sem sanitização/allowlist.
- Manter o parser de Markdown fora do bundle do cliente.

---

## 12. Plano de correção priorizado

### P0 — Antes de iniciar o blog

1. **404 real na hospedagem**
   - Gerar `dist/404.html` com `noindex`, sem canonical da home, sem `FAQPage`, com mensagem visível.
   - Remover ou restringir o rewrite catch-all de `vercel.json:78-83`.
   - Testar em preview da Vercel com `curl -I` e `curl`.
   - Critério: rota inexistente retorna 404; `/services` e `/faq` continuam 200.

2. **Fonte única de rotas e sitemap**
   - Gerar `dist/sitemap.xml` a partir de rotas estáticas + artigos publicados.
   - Atualizar `routes.test.ts` para validar o gerador, não números fixos.
   - Atualizar `llms.txt`/`llms-full.txt` se `/blog` entrar em `ROUTES`.
   - Critério: sitemap sem rascunhos, sem duplicatas, com `lastmod` correto.

3. **Pipeline de conteúdo**
   - Definir a ordem: geração do manifesto antes do `vite build`.
   - Criar um único módulo de parsing/validação/renderização usado pelo app e pelo prerender.
   - Critério: `npm run build` gera HTML de artigo e o bundle consegue ler o manifesto.

4. **Dependências**
   - Remover `geist`; confirmar `next`/`sharp` fora do lockfile.
   - Atualizar `postcss`, `source-map-js`, `nanoid`, `picomatch`.
   - Avaliar `react-router-dom` 6.30.6.
   - Critério: `npm audit --omit=dev` reduz drasticamente; lint/test/build/E2E verdes.

5. **Metadados e dados estruturados**
   - Corrigir `og:image` duplicado; adicionar `twitter:image`.
   - Remover `data-rh` da meta `robots` ou declará-la em cada `Helmet`.
   - Mover `FAQPage` para `/faq` e gerar a partir de `FAQ_ITEMS`.
   - Critério: uma única `og:image`, `twitter:image` presente, `FAQPage` apenas em `/faq` e igual ao conteúdo visível.

6. **Decisão de renderização**
   - Escolher entre B (injeção + `createRoot`, com teste de paridade) e A (SSG + `hydrateRoot`, em SPEC separada).
   - Critério: decisão registrada na SPEC-118; nenhuma promessa de hidratação sem `hydrateRoot`.

### P1 — Blog MVP

1. `content/blog/*.md` + validação.
2. Manifesto + geração de HTML por artigo.
3. `/blog` e `/blog/:slug` com React Router.
4. Metadados, canonical, OG/Twitter e JSON-LD `BlogPosting`.
5. Sitemap gerado.
6. 404 real para slug inexistente.
7. Listagem, estado vazio, artigo, relacionados (quando houver volume).
8. Testes unitários, de integração e E2E contra produção simulada.
9. Acessibilidade: H1 único, `article`, `time datetime`, links, teclado, contraste.
10. Documentação de publicação.

### P2 — Endurecimento

1. CSP no domínio principal.
2. Sanitização/allowlist de Markdown e links.
3. Remoção do padrão de header oculto nas páginas atuais.
4. Avaliação de Tailwind 4, React Router 7 e Vite 8 em SPECs separadas.
5. Revisão de `tsconfig` estrito para os novos módulos.
6. Lighthouse e Core Web Vitals do blog.

---

## 13. Critérios objetivos de aceite

### 13.1 Correções P0

- [ ] `curl -I https://epmdevtech.com.br/rota-inexistente` retorna `404`.
- [ ] `curl -I https://epmdevtech.com.br/blog/slug-inexistente` retorna `404`.
- [ ] O corpo da 404 contém "Página não encontrada" e `noindex`; não contém canonical da home nem `FAQPage`.
- [ ] `curl https://epmdevtech.com.br/services` continua 200 com o mesmo title, canonical e H1 visível.
- [ ] `curl https://epmdevtech.com.br/sitemap.xml` contém apenas rotas estáticas + artigos publicados; nenhum rascunho.
- [ ] `npm audit --omit=dev` não reporta `next`, `sharp` nem as vulnerabilidades críticas de produção.
- [ ] `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e` passam.
- [ ] O `dist/404.html` existe e é servido pela Vercel com status 404.

### 13.2 Blog

- [ ] `curl https://epmdevtech.com.br/blog` retorna 200 com a listagem de artigos publicados no HTML inicial.
- [ ] `curl https://epmdevtech.com.br/blog/<slug>` retorna 200 com H1, corpo completo, data, autor, canonical, OG e `BlogPosting` no HTML inicial.
- [ ] O HTML inicial do artigo contém o texto principal, não apenas metadados.
- [ ] O HTML inicial não contém `opacity:0`, `height:0` ou `aria-hidden` no conteúdo do artigo.
- [ ] Rascunhos não aparecem em `/blog`, no sitemap, nos relacionados nem em `dist/blog/<slug>/index.html`.
- [ ] Slug inexistente retorna 404 real.
- [ ] O sitemap inclui `/blog` apenas se houver artigo publicado.
- [ ] O JSON-LD do artigo é válido e corresponde ao conteúdo visível.
- [ ] O HTML estático e o HTML renderizado pelo React coincidem em H1, título, descrição, canonical e corpo (teste de paridade).
- [ ] Navegação por teclado, foco visível, contraste e `prefers-reduced-motion` preservados.
- [ ] O build não aumenta o bundle do cliente com o parser de Markdown.
- [ ] E2E de produção cobre `/blog`, artigo, slug inválido, mobile e teclado.

---

## 14. Comandos executados e resultados

| Comando | Resultado | Observação |
|---|---|---|
| `git status --porcelain=v1 -b` | `## develop...origin/develop`; `?? docs/blog.md` | Única alteração preexistente |
| `npm audit --omit=dev --json` | 17: 1 critical, 11 high, 5 moderate | Confirmado |
| `npm audit --json` | 33: 4 critical, 19 high, 9 moderate, 1 low | Inclui dev/testes |
| `npm ls --omit=dev --depth=0` | Dependências diretas listadas | `next` não é direto; `geist` é |
| `npm explain next` | `geist` peer obrigatório; `@vercel/*` peer opcional | Causa raiz identificada |
| `npm run lint` | Exit 0; zero erros | — |
| `npm test` | 42 arquivos, 285 testes, todos passando; exit 0 | — |
| `npm run build` | Exit 0; 7 rotas pré-renderizadas | `dist/` gerado (ignorado) |
| `npm run test:e2e -- e2e/multi-route-navigation.spec.ts` | 13/13 passando | Usa dev server |
| Servidor local `/tmp` na porta 4987 | Simulação de arquivo estático + rewrite | `/`, `/services`, `/services/`, `/blog`, `/blog/slug-inexistente`, `/rota-inexistente-1234`, `/faq` = 200 |
| `curl https://epmdevtech.com.br/...` | 200 para `/`, `/services`, `/services/`, `/blog`, `/blog/slug-inexistente`, `/rota-auditoria-xyz-987`; 308 para `/servicos` | Somente leitura |
| Playwright local | `/services`: 1 H1, 4.239 caracteres, 20 links; header oculto removido; `/blog` e slug inexistente: NotFound com `noindex` | Erros de `_vercel/insights` são artefatos da simulação |
| Playwright sem JavaScript | `/services`: apenas H1 e descrição ocultos; `/blog` e rota inexistente: corpo vazio | Confirma dependência de JS |
| Comparação de H1 oculto vs visível | Igual em todas as 7 rotas | Não é cloaking por conteúdo |
| Comparação `FAQ_ITEMS` vs JSON-LD | 1 pergunta e 3 respostas divergentes | Ver seção 7.3 |

### 14.1 Artefatos gerados

- `dist/` — recriado pelo build; ignorado pelo Git.
- `test-results/` — criado pelo Playwright; ignorado pelo Git.
- `/tmp/opencode/*` — scripts de auditoria e logs temporários, fora do repositório.

Nenhum arquivo de código, configuração, dependência ou lockfile foi alterado.

---

## 15. Pontos pendentes de confirmação

1. **Comportamento exato da Vercel com `404.html` neste projeto.** A documentação confirma o padrão, mas é necessário validar em um preview deployment, porque o rewrite atual pode continuar interceptando.
2. **Política de trailing slash.** `/services/` retorna 200. Definir se haverá redirect 308 para `/services` ou se o canonical continuará sendo a única mitigação.
3. **Decisão sobre hidratação.** O projeto usará injeção de corpo + `createRoot` (opção B) ou SSG completo + `hydrateRoot` (opção A)? A resposta altera o esforço e os testes.
4. **Header com 6º link.** O comportamento em 1024px não foi testado; a decisão de incluir "Blog" no header ou apenas no footer/home precisa de validação visual.
5. **Conteúdo inicial.** Quem fornece os artigos reais e qual é a taxonomia inicial de categorias.
6. **Rascunhos e agendamento.** Se houver publicação agendada, o build precisa comparar a data com o momento do build e documentar o comportamento.
7. **CSP e sanitização.** A inclusão de CSP pode exigir nonce/hash para o script inline de tema em `index.html:65-82` e para os scripts da Vercel. Precisa de teste.
8. **Remoção de `geist`.** Nenhum uso foi encontrado, mas a remoção deve ser validada com `npm ls next sharp` e build completo.
9. **`recharts`/`chart.tsx`.** Se o componente for usado no futuro, `lodash` entra no bundle e a prioridade da vulnerabilidade sobe.
10. **Registro de advisories.** As contagens e versões podem mudar; a priorização deve ser revista na data da correção.
11. **E2E completo e Lighthouse.** Não executados nesta auditoria.

---

## 16. Recomendação final

**Apto após correções prévias específicas.**

Ordem recomendada:

1. Resolver o 404 real na hospedagem (`404.html` + remoção do catch-all).
2. Remover `geist` e limpar a cadeia `next`/`sharp`; aplicar patches seguros de dependências.
3. Corrigir a fonte única de sitemap/rotas e os testes de contagem.
4. Corrigir `FAQPage`, `og:image`, `twitter:image` e a meta `robots`.
5. Definir a estratégia de renderização (B com teste de paridade ou A em SPEC separada).
6. Só então implementar o blog sob a SPEC-118 aprovada.

O blog é tecnicamente viável na arquitetura atual. Não há evidência para migrar de framework. O maior risco não é o roteamento: é repetir o padrão de HTML inicial sem corpo, soft 404 e metadados globais incoerentes.

---

## 17. Artefatos SDD

- **Auditoria:** este documento (`docs/blog-auditoria-validacao.md`).
- **SPEC:** `specs/SPEC-118-blog-tecnico.md` — **Draft**, aguardando aprovação explícita do PO.
- **TASK-118:** não criada. Conforme `AGENTS.md` e `docs/workflows.md`, a TASK só é aberta após a aprovação da SPEC.
- **QA/REVIEW da implementação:** não criados, porque não houve implementação. As evidências desta auditoria estão na seção 14.

---

_Relatório produzido em 2026-10-22. Nenhum deploy, commit, push ou alteração de código foi realizado._
