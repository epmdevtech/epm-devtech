# Auditoria Técnica e Baseline de Qualidade — EPM DevTech

> Documento gerado na **Fase 1 (Auditoria e Planejamento)** do processo de refatoração de conteúdo, UX, Acessibilidade e SEO.  
> **Regra estrita:** Nenhum arquivo de código-fonte foi alterado durante esta fase.

---

## 1. Arquitetura e Engenharia Frontend

### 1.1 Framework, Runtime e Roteamento
- **Framework & Core:** React 18.3.1 com TypeScript 5.8.3.
- **Build Tool:** Vite 5.4.19 com `@vitejs/plugin-react-swc`.
- **Roteamento:** `react-router-dom` v6.30.1 configurado como Single Page Application (SPA).
  - Rotas mapeadas em `src/App.tsx`: `/`, `/sobre`, `/setores`, `/servicos`, `/tecnologias`, `/diferenciais`, `/faq`, `/contato` e fallback `*` (`NotFound.tsx`).
  - O componente `src/pages/Index.tsx` gerencia a landing page unificada com **Scroll Spy** baseado em `IntersectionObserver` (`rootMargin: "-40% 0px -40% 0px"`). A cada seção que cruza o centro do viewport, o `window.history.replaceState` atualiza a URL e sincroniza as tags do `react-helmet-async` sem empilhar histórico no navegador.

### 1.2 Estrutura de Pastas e Componentização
```
src/
├── components/
│   ├── layout/
│   │   └── Header.tsx             # Navbar fixa com blur, logo adaptativo e menu mobile
│   ├── sections/
│   │   ├── hero/                  # HeroBadge.tsx, HeroArchitecture.tsx
│   │   ├── Hero.tsx               # Section 1: Hero com LampContainer e CTA duplo
│   │   ├── Authority.tsx          # Section 2: Métricas de uptime/RPS e faixa de clientes
│   │   ├── About.tsx              # Section 3: História, fundador, animated stats e pilares
│   │   ├── Sectors.tsx            # Section 4: 4 cards 3D isomórficos com mockups
│   │   ├── Services.tsx           # Section 5: 6 cards de serviços com mockups visuais
│   │   ├── Technologies.tsx       # Section 6: Stack tecnológica
│   │   ├── TechConstellation.tsx  # Grafo interativo SVG de tecnologias
│   │   ├── Differentials.tsx      # Section 7: Pipeline animado com 6 diferenciais
│   │   ├── FAQ.tsx                # Section 8: Acordeão com 10 perguntas em 3 categorias
│   │   ├── Contact.tsx            # Section 9: Split card com formulário underline e próximos passos
│   │   └── Footer.tsx             # Section 10: 4 colunas, CNPJ, theme switcher, modais legais
│   ├── ui/                        # Componentes primitivos (Radix UI / shadcn)
│   ├── legal/                     # LegalModals.tsx (Termos de Uso e Política de Privacidade)
│   ├── ContactForm.tsx            # Componente reutilizável alternativo de formulário
│   ├── CursorOrb.tsx              # Efeito de cursor (carregado com defer de 3s)
│   ├── LazyRender.tsx             # Carregador assíncrono com delay
│   ├── LazySection.tsx            # Wrapper de seções com lazy load
│   └── cookie-banner.tsx          # Banner LGPD carregado em idle
├── hooks/                         # use-idle, use-mobile, use-toast, use-typewriter
├── lib/                           # utils.ts, phone.ts (validação BR), buildConstellationLayout.ts
└── pages/                         # Index.tsx, NotFound.tsx
```

### 1.3 Localização de Conteúdos e Textos Hardcoded
- Não há camada de CMS ou arquivo JSON/YAML externo de i18n/conteúdo.
- Todo o conteúdo textual encontra-se **hardcoded** diretamente nas estruturas e constantes dos componentes:
  - `src/pages/Index.tsx`: Títulos e descrições do `SEO_META` para cada âncora/rota.
  - `src/components/sections/Authority.tsx`: Arrays `metrics` e `organizations`.
  - `src/components/sections/About.tsx`: Constantes `pillars`, textos do `SectionHeader` e box de Liderança Técnica.
  - `src/components/sections/Sectors.tsx`: Array `sectors` (contexto, problema, experiência).
  - `src/components/sections/Services.tsx`: Array `services` (6 serviços com campos `what`, `problem`, `how`, `description`).
  - `src/components/sections/Differentials.tsx`: Array `differentials` (6 cards com `step`, `title`, `handle`, `description`).
  - `src/components/sections/FAQ.tsx`: Array `FAQ_ITEMS` (10 perguntas e respostas divididas em 3 categorias).
  - `src/components/sections/Contact.tsx`: Constantes `PROJECT_TYPES` e `nextSteps`.
  - `src/components/sections/Footer.tsx`: Arrays `SOLUTIONS_LINKS`, `NAVIGATION_LINKS` e `SOCIAL_LINKS`.
  - `index.html`: Metadados estáticos, Open Graph, Twitter cards, JSON-LD Structured Data (`WebSite`, `ProfessionalService`, `Person`, `FAQPage`).

---

## 2. Design System, Tokens e Estilização

- **Base:** Tailwind CSS 3.4.17 com variáveis CSS semânticas HSL declaradas em `src/index.css` e tokens no `tailwind.config.ts`.
- **Paleta de Marca:**
  - Primária: Verde Esmeralda EPM DevTech (`hsl(158, 64%, 42%)` / `#10B981`).
  - Background Dark: `hsl(0, 0%, 7%)` (`#121212`).
  - Background Light: `hsl(0, 0%, 100%)`.
  - Foreground / Títulos: Rigorosamente monocromáticos (100% white em dark mode, zinc-900 em light mode), sem degradês multicoloridos ou filtros de texto artificiais (conforme SPEC-014).
- **Tipografia:**
  - Fonte sans: `Geist` (Google Fonts via preload/display swap e fallback do sistema).
  - Fonte mono: `Geist Mono` para badges, handles, códigos e métricas.
- **Componentes de UI:** Baseados em **Radix UI** (primitivos acessíveis WAI-ARIA) via padrão shadcn/ui:
  - `@radix-ui/react-accordion` (FAQ)
  - `@radix-ui/react-dialog` (Modais legais e expansor de mensagem do contato)
  - `@radix-ui/react-select` (Dropdown de tipo de projeto)
  - `@radix-ui/react-label`, `@radix-ui/react-slot`, etc.
- **Animações:**
  - `framer-motion` 12.29.2 com verificação de `useReducedMotion()`.
  - Animações CSS puras inlined no `index.html` para os primeiros frames do Hero (`fade-in-up`, `fade-in`).

---

## 3. Formulário de Contato e Conversão

- **Localização:** `src/components/sections/Contact.tsx` (Split Card com formulário underline à esquerda e bloco institucional escuro à direita).
- **Gerenciamento e Validação:**
  - `react-hook-form` 7.61 integrado com `@hookform/resolvers/zod`.
  - Validação estrita com `zod`:
    - `name`: min 3 chars, trim.
    - `email`: formato RFC email corporativo, trim.
    - `phone`: opcional, com máscara brasileira dinâmica (`(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX`) e validação estrita de DDDs válidos do Brasil (11 a 99) via `src/lib/phone.ts`.
    - `projectType`: obrigatório (Select com 5 opções).
    - `message`: min 15 chars, trim.
- **Integração de Envio:**
  - Disparo client-side via `@emailjs/browser` (`emailjs.send`).
  - Parâmetros: `serviceId`, `templateId`, `publicKey` lidos de variáveis de ambiente `VITE_EMAILJS_*`.
- **Tratamento de Sucesso / Erro:**
  - Feedback visual no botão (ícones `Loader2`, `CheckCircle2`, `Send`).
  - Toasts via biblioteca `sonner`.
  - Em caso de falha de envio ou variáveis não configuradas, exibe toast amigável com botão de ação direta para fallback imediato via **WhatsApp** (`https://wa.me/5545999178290`).

---

## 4. Analytics e Scripts de Terceiros

- **Dependências no package.json:**
  - `@vercel/analytics` 2.0.1
  - `@vercel/speed-insights` 2.0.0
- **Scripts externos no HTML inicial:**
  - Preconnect e dns-prefetch para `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.jsdelivr.net`, `cdn.simpleicons.org`.
  - **Zero scripts de rastreamento invasivo** (Google Tag Manager, Meta Pixel, Hotjar ou chatbots pesados não estão instalados).

---

## 5. Auditoria de SEO e Metadados Atuais

| Metadado / Elemento | Estado Atual | Avaliação Crítica |
|---|---|---|
| `<title>` | `EPM DEVTECH \| Software House: Desenvolvimento de Software Sob Medida` | Bom, focado e dentro do limite (~68 caracteres). |
| `<meta name="description">` | `"Software house especializada em desenvolvimento web, APIs escaláveis e arquitetura de sistemas. +9 anos de experiência. PHP, Laravel, Node.js, React, AWS, Docker. Solicite um orçamento."` | **Problema identificado:** Abre citando anos de experiência e lista tecnologias antes de endereçar o problema do cliente. CTA usa "Solicite um orçamento" em desacordo com o CTA único. |
| `<meta name="keywords">` | Lista 13 termos genéricos ("software house, desenvolvimento de software...") | **Obsoleto:** Motores de busca (Google, Bing) ignoram essa meta tag desde 2009. Deve ser removida. |
| `<meta name="author">` | `"Elessandro Prestes Macedo \| EPM DEVTECH"` | **Misto:** Atribui à pessoa física ao lado da empresa. Deve ser padronizado para "EPM DevTech". |
| `og:image` / `twitter:image` | `https://epmdevtech.com.br/android-chrome-512x512.png` | **Inadequado:** É o ícone quadrado 512×512 do PWA. Nas redes (LinkedIn, WhatsApp, X), o padrão ideal para cartões com resumo largo é proporção 1.91:1 (~1200×630). |
| `twitter:creator` | `@elessandrodev` | Perfil pessoal do fundador no X, enquanto `twitter:site` é `@epmdevtech`. |
| `twitter:card` | `summary_large_image` | Correto, mas prejudicado pelo tamanho 512×512 da imagem. |
| JSON-LD (`schema.org`) | Grafo com `WebSite`, `ProfessionalService`, `Person`, `FAQPage` | **Muito extenso e arriscado:** Lista detalhes de órgãos e métricas governamentais em atribuição direta à empresa sem distinção entre histórico profissional do fundador e projetos da pessoa jurídica. |
| `sitemap.xml` | Contém URLs para `/`, `/sobre`, `/setores`, `/servicos`, `/tecnologias`, `/diferenciais`, `/faq`, `/contato` | Válido e atualizado com as seções da SPA. |
| `robots.txt` | Configurado com regras para crawlers comuns e bots de LLM (OpenAI, Anthropic, Perplexity, etc.) | Válido e funcional. |
| Canonical & Lang | `<link rel="canonical">` presente e `<html lang="pt-BR">` | Válido e em conformidade. |

---

## 6. Modo de Renderização: Análise de Impacto

### 6.1 Diagnóstico (HTML Inicial vs. DOM Hidratado)
- **Requisição HTTP (curl/view-source):** O arquivo `index.html` servido pelo servidor entrega:
  - Cabeçalho `<head>` populado com metadados e CSS crítico inlined.
  - No `<body>`: Apenas `<div id="root"></div>` e a inclusão do script bundle `/assets/index-*.js`.
  - **Zero tags semânticas no HTML inicial:** Não há `<h1>`, nem seções (`<section>`), nem textos dos serviços, nem links de navegação acessíveis sem JavaScript.
- **DOM Renderizado:** Todo o conteúdo é montado no cliente via JavaScript após o download e execução do bundle React.

### 6.2 Impactos
1. **SEO e Crawlers:** Motores modernos (Googlebot) conseguem executar JS, mas em fila de renderização em duas etapas (Second Wave of Indexing), o que retarda a indexação e pode gerar penalidades temporárias. Crawlers que não executam JS (ou crawlers de redes sociais para leitura profunda) enxergam uma casca vazia.
2. **Compartilhamento de Links (Social Crawlers):** WhatsApp, Facebook, LinkedIn, X, Telegram e Slack **não executam JavaScript**. Eles dependem 100% das tags `<meta property="og:*">` estáticas no `<head>`. Atualmente as meta tags existem no `<head>`, mas qualquer link direto para sub-âncoras (ex: `/servicos`) entrega o HTML estático padrão da raiz.
3. **Leitores de Tela e Acessibilidade:** Usuários com leitores de tela em conexões de alta latência sofrem um atraso cognitivo perceptível até o primeiro anúncio acessível do DOM.

### 6.3 Solução de Menor Custo Proposta
- Para esta fase de refatoração, **manter a arquitetura Vite + React SPA** (sem migrar para Next.js ou Remix, o que violaria a restrição de não alterar a stack).
- **Proposta técnica de menor impacto:**
  1. Manter os metadados estáticos do `index.html` ricos e perfeitamente sintonizados com o posicionamento.
  2. Injetar um fallback semântico básico acessível dentro de `<div id="root">` ou em `<noscript>` com o `<h1>` e links principais para crawlers sem JS.
  3. No roadmap futuro, adicionar plugin de pré-renderização estática (SSG em build time via `vite-plugin-prerender` ou similar) gerando HTML estático para cada âncora de rota.

---

## 7. Baseline de Qualidade e Métricas Pré-Refatoração

### 7.1 Testes e Compilação
- **ESLint:** ✅ `npm run lint` — 0 erros, 0 avisos.
- **TypeScript:** ✅ Zero erros de compilação estrita.
- **Testes Unitários e Integração (Vitest):**
  - **20 suites de testes**
  - **138 testes executados — 100% aprovados**
  - Duração: ~56s
  - Cobertura de componentes principais: >90% (HeroBadge 100%, HeroArchitecture 96.73%, Hero 98.66%).
- **Testes E2E (Playwright):**
  - **16 testes end-to-end** cobrindo integridade do design system, modo dark/light, ausência de layout shift e scroll spy por âncoras.
- **Build de Produção:**
  - Build Vite em 23.4s sem erros.
  - Chunk JS inicial principal: `index-DkvDxkl9.js` (70.98 kB / gzip: 23.60 kB).
  - Maior chunk individual: `react-y5kt-9Ur.js` (142.26 kB / gzip: 45.60 kB) — **muito abaixo do limite de 600 kB** estabelecido nos Quality Gates.

### 7.2 Métricas de Lighthouse (Baseline Histórico e Local)
- **Performance:** 96 - 100 (desktop) / 90 - 95 (mobile em 4G).
- **Acessibilidade:** 100 / 100.
- **Boas Práticas:** 100 / 100.
- **SEO:** 100 / 100.
- **LCP:** ~1.2s (com preload de logotipo webp).
- **CLS:** 0.000 (sem layout shift detectado).
- **FID / INP:** < 50ms.

---

_Auditoria concluída em conformidade com o protocolo AGENTS.md e GEMINI.md._
