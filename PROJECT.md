# PROJECT.md — Estado Canônico do Projeto

> **Nota:** Este é o documento de referência canônica do projeto EPM DEVTECH.
> Toda divergência entre este documento, as SPECs e o código deve ser tratada como defeito, mudança de escopo ou dívida documental — nunca resolvida silenciosamente.

---

## Identificação

| Campo             | Valor                                           |
|-------------------|-------------------------------------------------|
| **Nome**          | EPM DEVTECH — Landing Page                     |
| **Repositório**   | `ElessandroPrestes/epm-devtech-solutions`       |
| **URL Produção**  | https://epmdevtech.com.br                       |
| **Deploy**        | Vercel                                          |
| **Versão**        | 0.0.0 (pré-lançamento)                         |
| **Iniciado em**   | 2026                                            |
| **Autor**         | Elessandro Prestes Macedo                       |
| **Contato**       | elessandro.prestes@gmail.com                   |

---

## Propósito

Landing page institucional da **EPM DEVTECH**, Software House dedicada a:
- Desenvolvimento de software sob medida
- APIs REST/GraphQL escaláveis
- Arquitetura de sistemas de alta performance
- Soluções para Indústria, Varejo, Educação e Energia

A página apresenta serviços, tecnologias, diferenciais, projetos de autoridade e canal de contato direto.

---

## Stack Tecnológico

### Frontend
| Tecnologia        | Versão     | Papel                                |
|-------------------|------------|--------------------------------------|
| React             | ^18.3.1    | Interface declarativa e componentes  |
| TypeScript        | ^5.8.3     | Tipagem estática                     |
| Vite              | ^5.4.19    | Build tool e dev server              |
| Tailwind CSS      | ^3.4.17    | Estilização via utilitários          |
| shadcn/ui         | —          | Componentes acessíveis (Radix UI)    |
| Framer Motion     | ^12.29.2   | Animações e transições               |
| React Router DOM  | ^6.30.1    | Roteamento SPA                       |
| React Helmet Async| ^3.0.0     | Gerenciamento de SEO/meta            |
| TanStack Query    | ^5.83.0    | Gerenciamento de estado assíncrono   |
| React Hook Form   | ^7.61.1    | Gerenciamento de formulários         |
| Zod               | ^3.25.76   | Validação de schemas                 |
| EmailJS           | ^4.4.1     | Envio de e-mails pelo cliente        |
| next-themes       | ^0.3.0     | Dark/Light mode                      |
| lenis             | ^1.1.20    | Rolagem suave corporativa (smooth scroll) |
| gsap              | ^3.12.7    | Animações acopladas ao scroll (ScrollTrigger) |

### Infraestrutura
| Tecnologia        | Versão     | Papel                                |
|-------------------|------------|--------------------------------------|
| Vercel            | —          | Hospedagem e deploy contínuo         |
| Docker            | —          | Containerização do ambiente local    |
| Docker Compose    | —          | Orquestração do container            |

### Qualidade
| Tecnologia             | Versão     | Papel                            |
|------------------------|------------|----------------------------------|
| Vitest                 | ^3.2.4     | Testes unitários                 |
| React Testing Library  | ^16.0.0    | Testes de componentes            |
| @vitest/coverage-v8    | ^3.2.4     | Coverage (meta: >90%)            |
| ESLint                 | ^9.32.0    | Linting e qualidade de código    |
| @playwright/test       | ^1.58.2    | Testes ponta a ponta (E2E)       |

---

## Arquitetura

### Tipo
Single Page Application (SPA) multi-rota desacoplada com rotas independentes, hub comercial enxuto na raiz e pré-renderização estática de HTML no pós-build para SEO pleno.

### Estrutura de Rotas Canônicas
| Rota           | Componente            | Função                                                      |
|----------------|-----------------------|-------------------------------------------------------------|
| `/`            | `Home.tsx`            | Hub comercial sintetizado com Hero Slim                     |
| `/services`    | `ServicesPage.tsx`    | Catálogo com 4 ofertas e dores de negócio                   |
| `/how-we-work` | `HowWeWorkPage.tsx`   | Pipeline sequencial de 4 etapas                             |
| `/experience`  | `ExperiencePage.tsx`  | Indicadores de autoridade e contextos reais                 |
| `/engineering` | `EngineeringPage.tsx` | Filosofia de engenharia, Pipeline CI/CD e Nuvem Tipográfica |
| `/about`       | `AboutPage.tsx`       | Institucional com liderança técnica e dados                 |
| `/contact`     | `ContactPage.tsx`     | Formulário de contato, canais e SLA                         |
| `/faq`         | `FAQPage.tsx`         | 8 perguntas categorizadas (fonte única)                     |
| `/*`           | `NotFound.tsx`        | Página 404 em português com links de resgate                |

### Redirecionamentos 301 (Edge / Vercel) — SPEC-106
Slugs em inglês (conteúdo visual em português). Todos os legados apontam direto ao destino final (sem cadeias), espelhados em `vercel.json` (301 permanente) e em `LEGACY_REDIRECTS` (`src/config/routes.ts`, `<Navigate replace>` no cliente):
- `/servicos` → `/services`
- `/como-trabalhamos` → `/how-we-work`
- `/experiencia` → `/experience`
- `/engenharia` → `/engineering`
- `/sobre` → `/about`
- `/contato` → `/contact`
- `/duvidas-frequentes` → `/faq`
- `/setores`, `/autoridade` → `/experience`
- `/diferenciais`, `/tecnologias` → `/engineering`

### Gerenciamento de Foco e Rolagem (`ScrollManager`)
- Rolagem suave para o topo a cada transição de rota (respeitando `prefers-reduced-motion`).
- Transferência programática de foco para o `<h1>` da nova rota (`tabIndex={-1}`) para suporte pleno a leitores de tela.
- Interceptação de hashes legados na raiz (`/#servicos`, `/#contato`) redirecionando via `replaceState` para rotas canônicas.

### Estrutura de Diretórios
```
src/
├── App.tsx                     # Rotas aninhadas sob Layout e providers raiz
├── main.tsx                    # Ponto de entrada React
├── index.css                   # Estilos globais e tokens Tailwind
├── config/
│   ├── routes.ts               # Fonte única de rotas canônicas e redirects legados (SPEC-106)
│   ├── architecture.ts         # Camadas arquiteturais e mapeamento técnico de stack
│   ├── experience.ts           # Organizações aprovadas (CAPES, ONS, Energia Pecém)
│   └── faq.ts                  # Perguntas frequentes categorizadas
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # Shell persistente com skip-link, Header, Outlet e Footer
│   │   └── Header.tsx          # Menu enxuto (5 links + 1 botão CTA)
│   ├── routing/
│   │   └── ScrollManager.tsx   # Foco e rolagem acessível entre rotas
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Authority.tsx
│   │   ├── About.tsx
│   │   ├── Sectors.tsx
│   │   ├── Services.tsx
│   │   ├── Technologies.tsx
│   │   ├── TechConstellation.tsx
│   │   ├── ArchitecturalBlueprint.tsx
│   │   ├── Differentials.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── ui/                     # Componentes shadcn/ui, PageHeader e SectionHeader
│   ├── CursorOrb.tsx
│   ├── NavLink.tsx
│   ├── cookie-banner.tsx
│   └── theme-provider.tsx
├── hooks/
├── lib/
│   └── buildConstellationLayout.ts
├── pages/
│   ├── Home.tsx                # Homepage curta como hub comercial
│   ├── ServicesPage.tsx        # /services
│   ├── HowWeWorkPage.tsx       # /how-we-work
│   ├── ExperiencePage.tsx      # /experience
│   ├── EngineeringPage.tsx     # /engineering
│   ├── AboutPage.tsx           # /about
│   ├── ContactPage.tsx         # /contact
│   ├── FAQPage.tsx             # /faq
│   └── NotFound.tsx            # 404 em português
└── test/
    ├── setup.ts
    └── example.test.ts
```

### Padrões de Carregamento e SEO
- **Home**, **Layout** e **Header**: carregamento imediato na raiz (LCP instantâneo sem layout shift)
- Subrotas independentes: `React.lazy` + `Suspense` sob demanda
- Pré-render estático multi-rota via `scripts/prerender.js` gerando `dist/<rota>/index.html` pré-populado com `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph e H1 para crawlers e scrapers sem JavaScript.

---

## SEO

- Meta tags dinâmicas por rota via `react-helmet-async`
- Pré-render estático no pós-build para scrapers de redes sociais e SEO bot
- URL canônica individual por rota (`data-rh="true"`)
- Open Graph e Twitter Cards específicos por página
- Skip-to-content link para acessibilidade (`#conteudo-principal`)

---

## Estado Atual

| Área              | Status           | Notas                                      |
|-------------------|------------------|--------------------------------------------|
| Design            | ✅ Camadas Tonais & Light Mode Alternado | Sistema de Camadas Tonais e Refatoração Cromática do Light Mode (SPEC-082 / SPEC-095): Cadência rítmica alternada no Modo Claro eliminando o efeito de monobloco branco. Âncoras em branco puro (`surface-anchor: #FFFFFF`) no Hero e Rodapé, seções intermediárias alternadas entre Tom Gelo (`surface-base: #FAFAFA` / `zinc-50`) com divisores sutis `border-y border-zinc-200/70` e Branco Puro (`surface-alt: #FFFFFF`). Cards destacados sobre fundo gelo com fundo branco sólido e `shadow-sm`. Hierarquia tipográfica calibrada para acessibilidade WCAG AA: títulos em carvão profundo (`#09090B`), subtítulos em cinza escuro legível (`#52525B`), notas em `#71717A` e acentos de marca em teal-700 (`#0F766E`). Preservação integral do Dark Mode sem regressões. |
| Tipografia / Editorial B2B | ✅ Sistema Fluido & Editorial B2B | Refatoração da Experiência Tipográfica, Espacial e Textual (SPEC-096): Padrão editorial maduro inspirado em Codeminer42, Stripe e Vercel. Família sans priorizando `Inter`, escala tipográfica fluida com clamp (`H1 Hero Display clamp(3.25rem,6vw,5.5rem)`, leading `0.98`, tracking `-0.055em`; `H2 clamp(2.25rem,4vw,3.75rem)`, `H3 clamp(1.35rem,2.2vw,2rem)`, `Body clamp(1rem,1.15vw,1.125rem)`), eyebrows limpos sem caixas/badges com ícone oficial da marca, limite de caracteres por linha calibrado (`max-w-[58ch]` e `max-w-[65ch]`), container global unificado `.editorial-container` e respiro vertical consistente `py-[clamp(4.5rem,8vw,8rem)]`. |
| Iconografia       | ✅ Autoral / SVG | Conjunto autoral de 15 SVGs conceituais em `@/components/icons` com traço 1.5px, duotone 10%, nó teal de assinatura de marca e wrapper `Icon`; sem caixas de template |
| Hero              | ✅ Foco no CTA Primário & Seletor de Cenários | Enquadramento fullscreen adaptativo com Tonal Layering (`surface-anchor`), eyebrow tipográfico com `BrandChipIcon` (`[ ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO ]`), H1 rigorosamente monocromático em branco/primary ("Engenharia de software para construir, integrar e evoluir sistemas", eliminando mesclagem bicolor), subheadline orientada a decisores de negócio ("Desenvolvemos sistemas web, APIs e integrações sob medida para operações que não podem parar por instabilidade ou lentidão"), CTA primário único e focado ("Vamos conversar" direcionando para `/contact`) e Seletor Interativo de Cenários de Negócio com 4 cenários navegáveis ancorados (`/services#sistemas`, `/services#integracoes`, `/services#legados`, `/contact` - "Avaliar a arquitetura do meu sistema com um diagnóstico técnico", sem menção a qualificações RH de "sênior"), linha condutora SVG vertical animada, nós circulares e setas `ArrowUpRight` (SPEC-061 / SPEC-071 / SPEC-082 / SPEC-083 / SPEC-084 / SPEC-094) |
| Services          | ✅ Bento Grid (Home), Hero CTA & Z-Pattern (Página) | Na Home (`HomeServicesBento.tsx`), Bento Grid assimétrico editorial/técnico de 12 colunas. Na página dedicada `/services` (`ServicesPage.tsx`), inclusão de CTA centralizado de alta conversão no Hero ("Solicite uma conversa →" com fundo esmeralda brilhante, cantos arredondados, glow sutil e touch target de 44px direcionando para `/contact`) dentro de `PageHeader` extensível via `children`; 4 serviços estruturados em Z-Pattern alternado de 12 colunas com callout de negócio integrado ("Quando precisa:") em barra lateral esmeralda, 4 mocks com profundidade e fundo escuro refinado (`dark:bg-zinc-950/80`), Faixa de Garantias de Engenharia em 3 colunas limpas com tags monospace `[ 01 // ESCOPO ]` e encerramento direto conectando ao Footer sem CTA final redundante (SPEC-062 / SPEC-063 / SPEC-065 / SPEC-073 / SPEC-086 / SPEC-087) |
| Como Trabalhamos  | ✅ Pipeline Contínuo & Process Explorer | Na Home (`HomeProcessPipeline.tsx`), pipeline contínuo horizontal/vertical com feixe animado (loop de 3s), nós ocluídos com classes estáticas de alto contraste no Dark Mode (`dark:text-accent-blue`, `dark:text-accent-violet`, `dark:text-accent-amber`, `dark:text-text-brand`) e no Light Mode (`text-zinc-900`), garantindo visibilidade total dos números 01 a 04 com WCAG AAA (SPEC-062 / SPEC-066 / SPEC-070 / SPEC-072 / SPEC-074 / SPEC-087 / SPEC-097). Na rota dedicada `/how-we-work` (`ProcessExplorer.tsx` e `HowWeWorkPage.tsx`), Process Explorer interativo em 2 colunas no desktop (tabs verticais com borda esmeralda, painel escuro refinado com cabeçalho, resumo executivo, tags monospace de entregáveis concretos e critério de saída formal) e Accordion vertical no mobile; Manifesto Técnico de Engenharia em 2 colunas abertas com `md:divide-x` (`// GARANTIA OPERACIONAL` e `// GESTÃO DIRETA`) eliminando cards isolados e conectando diretamente ao Footer sem caixas repetitivas de CTA (SPEC-062 / SPEC-066 / SPEC-070 / SPEC-072 / SPEC-074 / SPEC-087) |
| Differentials     | ✅ 3 Colunas     | Cabeçalho centralizado, 3 colunas abertas sem moldura de card separadas por divisores sutis verticais, ícones autorais no topo e bloco inferior centralizado de práticas de engenharia (SPEC-053) |
| Multi-Rota Heros & Artefatos Visuais | ✅ Direções de Arte Editoriais Abertas & Sem Cards Fechados | Refatoração de alto impacto visual em todas as rotas canônicas eliminando o padrão mecânico de cards fechados (`bg-zinc-900 border rounded-xl shadow-lg`). Adoção de composições espaciais autorais e abertas de alta engenharia (inspiradas em Linear, Stripe e Vercel): Malha Vetorial Contínua (Integrated Circuit Mesh SVG) aberta na Home (`/`) integrada ao seletor de cenários; Architectural Spec Grid aberto em Serviços (`/services`) com hairlines de 1px e 3 faixas de especificação técnica; Régua de Precisão de Engenharia (Execution Timeline Sequence) em Como Trabalhamos (`/how-we-work`) com ticks milimétricos SVG e pulso luminoso contínuo; Composição Tipográfica Display de Métricas em Experiência (`/experience`) com números monumentais (`99.98%`, `0`), cotas técnicas CAD e setores críticos; Blueprint Arquitetural Isométrico em Linha Fina em Engenharia (`/engineering`) com 4 camadas de software CAD sem fundos opacos; preservação da Constelação interativa em Sobre Nós (`/about`); e Painel Tipográfico Integrado de canal P2P direto em Contato (`/contact`), com formulário aberto e sem caixa flutuante, integrado por hairlines ao fundo (SPEC-111 / SPEC-112 / SPEC-113). |
| Technologies / Engenharia | ✅ Nuvem Tipográfica & Constellation | Na rota dedicada `/engineering` (`EngineeringPage.tsx` e `ArchitecturalBlueprint.tsx`), apresentação tipográfica editorial aberta das 9 tecnologias centrais (React, TypeScript, Vue.js, Angular, Node.js, PHP, Laravel, AWS e Azure), com pesos de alto impacto, badge de autoridade `Node.js [CORE RUNTIME]`, AWS sem selo de certificado (ajuste de governança), tooltips contextuais com `<TooltipPrimitive.Portal>` e `disableHoverableContent={true}` funcionando perfeitamente em todas as linhas e breakpoints, Layout Dividido (Filosofia vs. Terminal CI/CD Quality Gate com "Validação Arquitetural Obrigatória" e "Revisão técnica de arquitetura", eliminando menção ao termo sênior). Primeira dobra 100% editorial sem CTA dispersivo no PageHeader e fechamento comercial com Bottom CTA "VAMOS CONVERSAR" direcionando para `/contact`. Na Home (`Technologies.tsx`), preservação do TechConstellation interativo com trilhas PCB. (SPEC-079 / SPEC-080 / SPEC-087 / SPEC-094 / SPEC-109 / SPEC-111) |
| Autoridade / Resultados | ✅ Stat Strip com Contadores Animados | Faixa tipográfica contínua sem caixas fechadas (`HomeResultsStrip.tsx`), integrando contadores numéricos animados com `CountUp` ativados sob demanda via `useInView` da `framer-motion` (com suporte estrito a `useReducedMotion`), divisores verticais discretos no desktop (`md:divide-x`), números em escala de alto impacto (`text-3xl sm:text-4xl lg:text-5xl font-mono text-primary font-extrabold`), rótulos em brand teal (`text-text-brand`) e descrições técnicas (`text-secondary`). Apresentação das 4 métricas consolidadas (99,9% disponibilidade assegurada em energia e educação, 2.500 RPS para picos de 10k usuários, 100% integridade de dados regulatórios sem perdas, −35% atividades manuais reduzidas via automações), nota de rodapé contextual e link canônico atualizado para "Ver projetos detalhados →" direcionando para `/experience` (SPEC-067 / SPEC-085) |
| Experiência / Verticais | ✅ Início Editorial Direto & Verticais | Na rota dedicada `/experience` (`ExperiencePage.tsx`), início direto no cabeçalho editorial (`PageHero`: "Experiência em projetos reais" com `ExperienceHeroVisual`) eliminando a faixa superior redundante de contadores numéricos (migrados para a Home); conexão fluida imediata com a Matriz de Verticais 2x2 (`#contextos`) com badges de especialidade técnica (`IoT INDUSTRIAL`, `ALTA CONCORRÊNCIA`, etc.) e capacidades técnicas inline; Enterprise Ledger corporativo contínuo (`#organizacoes`) com linhas elegantes e hover suave para projetos de grande escala (`CAPES`, `ONS`, `Energia Pecém`), nota de contexto editorial com ponto luminoso verde-água e encerramento limpo direto no Footer sem bloco repetitivo de contato. Ritmo de camadas tonais perfeitamente preservado: `anchor -> base -> alt -> anchor`. (SPEC-075 / SPEC-082 / SPEC-085 / SPEC-087 / SPEC-111) |
| Home / Layout     | ✅ Enxuto & Fluido | Remoção do bloco intermediário redundante de contato ("Vamos entender o cenário da sua empresa?") na Home, conectando a seção de Resultados diretamente ao rodapé. Padronização de CTAs: "Fale comigo" no Header (desktop e gaveta móvel), "VAMOS CONVERSAR" no Hero e rota canônica `/contact` para formulário (SPEC-071 / SPEC-108 / SPEC-111) |
| Sectors           | ✅ Refatorado    | Título "Experiência em diferentes contextos", 4 cards 3D isomórficos com ícones conceituais autorais e sem setas direcionais (falsa affordance removida) na Home |
| About / Sobre nós | ✅ Editorial Monocromático & Silhueta EPM DevTech | Na rota dedicada `/about` (`AboutPage.tsx`), Hero editorial estruturado em grid responsivo de 12 colunas na camada `anchor`: coluna esquerda (7 cols) com H1 100% monocromático em branco/primary ("Transformando desafios em soluções que funcionam"), tag monospace `[ QUEM SOMOS // POSICIONAMENTO ]` com `BrandChipIcon` e subtítulo institucional focado em soluções que simplificam operações e geram resultados reais; coluna direita (5 cols) acomodando o componente visual `EpmConstellation` com isolamento completo e respiro generoso, sem colisão ou sobreposição de texto em nenhum breakpoint (desktop, tablet ou mobile). Componente desenha a silhueta geométrica do ícone oficial da EPM DevTech com nós estelares luminosos, halos difusos, pulso sonar, trânsito de dados e rastreamento de mouse, com atributos SVG `r` estritamente definidos eliminando avisos de console Na SPEC-105, os nós-chave (núcleo, pontas das chaves `{ }` e topo da moldura) tornaram-se um **Constellation Inspector** interativo: hover (120 ms/150 ms), clique/toque (pinned), teclado (Tab, Enter/Espaço, ←/→, Esc) e popover Radix com card de prática (bevel 45°, `prefers-reduced-motion`), dados editáveis em `src/data/constellationPractices.ts` (SPEC-055 / SPEC-081 / SPEC-087 / SPEC-088 / SPEC-089 / SPEC-090 / SPEC-091 / SPEC-093 / SPEC-094 / SPEC-098 / SPEC-105 / SPEC-111). Seção "Nossa Jornada" (`tone="base"`) com timeline histórica e seção "Missão e Princípios de Engenharia" (`tone="alt"`) em Manifesto Técnico, com alternância no ritmo de camadas tonais (`anchor -> base -> alt -> anchor`) e encerramento direto no Footer. |
| FAQ               | ✅ Condensado    | 8 perguntas essenciais, pergunta de sites institucionais alocada na categoria "servicos", abas em sentence case e tokens semânticos |
| Contact           | ✅ Humanização Editorial & Contato Direto | Título editorial dominante "Vamos conversar sobre como podemos apoiar você e seu projeto", texto de apoio consultivo sem promessas artificiais de prazo (expurgo de 24h), bloco alternativo de e-mail direto (`elessandro@epmdevtech.com.br`), botão de submissão "ENVIAR MENSAGEM" (`uppercase tracking-[0.04em] font-semibold` com `btn-bevel-4`) e próximos passos focados em atendimento consultivo direto com `ContactHeroVisual`. (SPEC-109 / SPEC-111) |
| Footer            | ✅ Refatorado    | Links corporativos sincronizados via `site.ts`, LinkedIn e GitHub oficiais na coluna Contato com ícones SVG monocromáticos (20px) e touch target ≥ 44px; descrição factual "dedicada a..." (SPEC-057) |
| ScrollToTop       | ✅ Neutro / Flat | Ícone ChevronUp (20px), design utilitário neutro sem glow ou realce verde, fade suave >450px e elevação dinâmica no rodapé |
| Cookie Banner     | ✅ Otimizado     | Lazy load assíncrono + defer timer (3.5s)  |
| Multi-Rota & SEO  | ✅ Multi-Rota SPA | Transição de monólito one-page para SPA multi-rota com rotas canônicas independentes (`/`, `/services`, `/how-we-work`, `/experience`, `/engineering`, `/about`, `/contact`, `/faq`), menu enxuto (5 links + 1 CTA "Fale comigo"), preservação 301 de URLs e pré-render estático HTML pós-build (SPEC-060 / SPEC-071) |
| Smooth Scroll & Scroll Reveals | ✅ Lenis + GSAP ScrollTrigger Global | Sistema global de rolagem suave com `Lenis` integrado ao loop de animação de alta performance do GSAP (`gsap.ticker` com `lagSmoothing(0)`), sincronizado com `ScrollTrigger.update`, reset imediato em transições de rota, âncoras com offset de cabeçalho fixo, suporte estrito a `prefers-reduced-motion` e hook `useScrollReveal` com `gsap.context()` para revelações sóbrias escalonadas em todas as rotas e páginas do site (`/`, `/services`, `/how-we-work`, `/experience`, `/engineering`, `/about`, `/contact`), abrangendo cabeçalhos unificados via `PageHero`, matrizes de serviços, pipeline explorer, manifestos de engenharia, grades de verticais, enterprise ledgers, terminais CI/CD, nuvem técnica e cards de FAQ (SPEC-099 / SPEC-110 / SPEC-111). |
| Magnetic Buttons & CTAs | ✅ Full Bevel 4 Cantos & Botões Estritamente Tipográficos | Geometria de engenharia "Full Bevel / 4-Corner Chamfer" (Octógono Simétrico de 8 lados com corte a 45º nos 4 cantos via `.btn-bevel-4` e `.btn-bevel-4-sm`), com traço contínuo de 1px ao redor de todos os 8 lados e sombreamento rígido extrudado em camadas (`.btn-bevel-shadow` / `.btn-bevel-shadow-sm` / `.btn-bevel-shadow-white` / `.btn-bevel-shadow-brand`). Variantes sólidas (`bevel`/`chamfer`) e contornadas (`bevel-outline`/`chamfer-outline`). Componente reutilizável `MagneticButton` com geometria de referência estática imune a scroll da viewport, margem de proximidade restrita (20px fixos além das bordas físicas), clamping rígido de deslocamento mecânico (X ≤ 12px, Y ≤ 8px, texto ≤ 4.2px), desengate imediato (breakout), força atenuada (`strength = 0.15`) e interpolação ágil GSAP (`0.38s`, `power2.out`). Suporte polimórfico a `<button>`, `<Link>` e `<a>`, desativação automática em telas touch (`pointer: coarse`), suporte a `prefers-reduced-motion`, efeito tátil de compressão mecânica no clique (`:active`), e anel de foco acessível (:focus-visible). Remoção completa de ícones e setas decorativas internas (estritamente tipográficos, sólidos e editoriais) em todos os botões e CTAs do site (SPEC-100 / SPEC-101 / SPEC-102 / SPEC-103 / SPEC-104 / SPEC-110). |
| Copywriting & UX Writing | ✅ Humanização B2B Integral & E-mail Oficial | Auditoria e reescrita de 100% dos textos do site (Home, Serviços, Como Trabalhamos, Experiência, Engenharia, Sobre nós, Contato, FAQ, Rodapé e metadados). Foco estrito em dores operacionais concretas (gargalos de processos, lentidão, retrabalho com planilhas manuais, riscos de legados), pragmatismo técnico e comunicação direta de liderança técnica com decisores de negócio. Canal oficial direto de e-mail padronizado como `elessandro@epmdevtech.com.br` com expurgo total de prazos artificiais pré-fabricados (ex: "24h úteis"). Eliminação de jargões vazios, sem clichês de marketing, posicionamento 100% remoto em escala nacional e zero dados cadastrais burocráticos no corpo do site. (SPEC-092 / SPEC-109 / SPEC-110) |
| Testes unitários  | ✅ Implementado  | 41/41 suites, 275/275 testes passando (cobertura geral 99.07%) |
| Testes E2E        | ✅ Implementado  | Suíte Playwright completa (46/46 testes aprovados cobrindo multi-rota, design system, tokens, constelação, light mode, travas de identidade e estabilidade) |
| Acessibilidade    | ✅ 100% WCAG AAA | Botão primário com contraste 12.44:1 (WCAG AAA), texto primário 17.26:1 (Dark) e 17.81:1 (Light), skip-link acessível, foco programático em `<h1>`, `aria-current="page"`, touch target ≥ 44px, zero layout shift |
| Performance       | ✅ 100% Otimizado| Mobile Perf: 84 (+16 pontos vs baseline 68), TBT: 480ms (-77% de bloqueio), CLS: 0.000; Desktop Perf: 97, SEO: 100/100, FCP 0.5s / LCP 0.6s |
| Proxy Odontologia | ✅ Implementado  | `/odontologia-demo` → proxy reverso Vercel para `dentistry-demo.elessandrodev.workers.dev` com 4 headers AppSec (SPEC-044) |
| URLs em inglês    | ✅ Slugs EN + 301 | Migração de todos os slugs para inglês (`/services`, `/how-we-work`, `/experience`, `/engineering`, `/about`, `/contact`, `/faq`) com conteúdo em pt-BR, 301 diretos na Vercel, `Navigate` legado no cliente, canonicals, prerender, `sitemap.xml`, `robots.txt`, `llms.txt`/`llms-full.txt` atualizados (SPEC-106) |
| CTAs e Botões em Uppercase | ✅ Padronização B2B & Caixa Alta | Padronização integral da hierarquia verbal B2B de conversão e formatação de botões de ação e CTAs estritamente em CAIXA ALTA (UPPERCASE) com kerning refinado (`tracking-[0.04em]` a `tracking-wider`) e peso `font-semibold`. Base de `MagneticButton.tsx` configurada por padrão com `uppercase tracking-wider font-semibold` e escalas de tamanho refinadas (`sm: px-5 py-2.5`, `lg: px-8 py-3.5`). Na Home (`Hero.tsx`), CTA primário único 'VAMOS CONVERSAR' com remoção do botão secundário para foco cognitivo total; nas rotas Sobre Nós (`AboutPage.tsx`) e Engenharia (`EngineeringPage.tsx`), fluxo 100% editorial e encerramento limpo após os blocos de autoridade com condução natural para o Footer sem Bottom CTAs redundantes (SPEC-114). Na seção e página de Contato (`Contact.tsx` e `ContactForm.tsx`), botão de submissão 'ENVIAR MENSAGEM' com expurgo de prazos artificiais de resposta (SPEC-109). Demais pontos de contato: "FALE COMIGO" (Header, 404), "VER DETALHES" (4 cards Bento de serviços), "VAMOS CONVERSAR" (ServicesPage, FAQPage, FAQ da Home), "VER SOLUÇÕES", "COMO TRABALHAMOS", "VER EXPERIÊNCIA", "CONHEÇA A EPM DEVTECH" e "PÁGINA INICIAL". |
| i18n              | ❌ Não iniciado  | Não planejado na versão atual              |

---

## Quality Gates

- Cobertura de testes ≥ 90% nos componentes principais
- Zero erros de ESLint no pipeline
- Build sem warnings de chunk size (limite: 600KB)
- SEO: meta tags presentes em todas as rotas
- Acessibilidade: skip-link funcional, ARIA labels nos elementos interativos

---

## Decisões Arquiteturais (ADRs)

| ID      | Decisão                                              | Status       |
|---------|------------------------------------------------------|--------------|
| ADR-001 | React SPA com scroll spy + replaceState              | ✅ Aceito     |
| ADR-002 | shadcn/ui como biblioteca de componentes primária    | ✅ Aceito     |
| ADR-003 | EmailJS para envio de formulário (sem backend)       | ✅ Aceito     |
| ADR-004 | Vercel como plataforma de deploy                     | ✅ Aceito     |
| ADR-005 | Bundle splitting manual via Vite manualChunks        | ✅ Aceito     |
| ADR-007 | Slugs de URL em inglês com 301 legados               | ✅ Aceito     |

---

## Próximas Tarefas Agendadas

| Tarefa | Descrição | Data Agendada | Status |
|---|---|---|---|
| VERIF-001 | 1. Verificar indexação e status de Sucesso do `sitemap.xml` no Google Search Console (janela de 24h)<br>2. Avaliar necessidade de inclusão explícita da tag `<meta name="theme-color">` no `<head>` do `index.html` | 2026-09-08 | ✅ Concluído |

---

_Última atualização: 2026-10-07 | Maintainer: Elessandro Prestes Macedo_
