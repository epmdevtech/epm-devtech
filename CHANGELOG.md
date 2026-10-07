# CHANGELOG

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

## [0.0.114-remocao-secao-bottom-cta-sobre-nos-e-engenharia] - 2026-10-07

### Removido
- **Seção Intermediária de Bottom CTA em `/about`** (`src/pages/AboutPage.tsx`):
  - Remoção completa do bloco `<SectionWrapper id="sobre-cta" tone="base">` contendo o banner "Vamos conversar sobre o seu próximo projeto?", o subtítulo "Converse diretamente com a liderança técnica da EPM DevTech para avaliar desafios e viabilidade arquitetural." e o botão "VAMOS CONVERSAR".
  - Eliminação de redundância visual e espaço vazio antes do rodapé, harmonizando o encerramento da rota após o Manifesto Técnico diretamente para o Footer (`anchor -> base -> alt -> anchor`).
  - Limpeza de dependências e hooks órfãos: remoção de `useNavigate`, `MagneticButton` e da referência `bottomCtaRef`.
- **Seção Intermediária de Bottom CTA em `/engineering`** (`src/pages/EngineeringPage.tsx`):
  - Remoção completa do bloco `<SectionWrapper id="engenharia-cta" tone="base">` contendo o banner "Vamos conversar sobre a engenharia do seu projeto?", o subtítulo "Converse diretamente com quem projeta e implementa o código para desenhar uma arquitetura sólida e escalável." e o botão "VAMOS CONVERSAR".
  - Eliminação de redundância visual antes do rodapé, harmonizando o encerramento da rota após a Matriz de Especialidades Técnicas diretamente para o Footer (`anchor -> base -> alt -> anchor`).
  - Limpeza de dependências e hooks órfãos: remoção de `useNavigate`, `MagneticButton` e da referência `bottomCtaRef`.

### Modificado
- **`src/pages/__tests__/pages.test.tsx`**: Atualização do teste de `EngineeringPage` validando a ausência do botão CTA de fechamento redundante.

### Adicionado
- **`specs/SPEC-114-remocao-secao-bottom-cta-sobre-nos.md`**, **`tasks/TASK-114-remocao-secao-bottom-cta-sobre-nos.md`** e **`reviews/QA-114.md`**: Especificação técnica aprovada, checklist de tarefas e relatório de QA confirmando 100% dos quality gates aprovados (Vitest, ESLint, Vite build e Playwright E2E).

## [0.0.113-direcoes-de-arte-editoriais-heros] - 2026-10-07

### Adicionado
- **`specs/SPEC-113-direcoes-de-arte-editoriais-heros.md`**, **`tasks/TASK-113-direcoes-de-arte-editoriais-heros.md`** e **`reviews/QA-113.md`**: Especificação técnica aprovada, checklist de implementação e relatório de QA para eliminação do padrão mecânico de cards fechados (`bg-zinc-900 border rounded-xl shadow-lg`) e adoção de direções de arte autorais e abertas nos Heros das rotas.
- **Malha Vetorial Contínua (Integrated Circuit Mesh SVG)** (`src/components/sections/Hero.tsx`):
  - Remoção de qualquer card delimitador ou caixa opaca à direita.
  - Malha vetorial aberta em SVG com trilhas de circuito finíssimas, nós de solda e acento em `emerald-400`/`brand`, réguas técnicas de telemetria ("Operação em Tempo Real · 100% Ativa", "Estabilidade 99.98%") e conexões diretas aos 4 nós de cenários corporativos.
- **Architectural Spec Grid Aberto** (`src/components/layout/hero-visuals/ServicesHeroVisual.tsx`):
  - Grid de linhas finas (hairlines de 1px) respirando no fundo da página com coordenadas `[SPEC_GRID // 01-03]` e 3 faixas abertas com especificações: `01 // PLATAFORMAS & SISTEMAS WEB`, `02 // INTEGRAÇÕES CRÍTICAS & APIs`, `03 // MODERNIZAÇÃO DE SISTEMAS LEGADOS`.
- **Régua de Precisão de Engenharia (Execution Timeline Sequence)** (`src/components/layout/hero-visuals/HowWeWorkHeroVisual.tsx`):
  - Régua horizontal de precisão milimétrica em SVG com escala graduada de ticks e pulso luminoso contínuo conectando as 4 etapas de execução: `[01] DIAGNÓSTICO ESTRATÉGICO`, `[02] ARQUITETURA RESILIENTE`, `[03] CICLOS INCREMENTAIS`, `[04] PRODUÇÃO COM ZERO INTERRUPÇÃO`.
- **Composição Tipográfica Display de Métricas (Large-Scale Performance Index)** (`src/components/layout/hero-visuals/ExperienceHeroVisual.tsx`):
  - Números monumentais de escala display (`99.98%`, `0`) com linhas de cota técnica CAD de tolerância milimétrica (`±0.01%`) e faixa aberta de setores críticos atendidos (Fintech, Logística, Supply Chain, Saúde e Energia).
- **Blueprint Arquitetural Isométrico em Linha Fina CAD** (`src/components/layout/hero-visuals/EngineeringHeroVisual.tsx`):
  - Planta baixa vetorial isométrica em linhas finíssimas e sem fundos escuros opacos, revelando as 4 camadas de software (`01 // GATEWAY`, `02 // SERVICES`, `03 // EVENT STREAM`, `04 // DATA`).
- **Painel Tipográfico Integrado & Formulário Aberto** (`src/components/layout/hero-visuals/ContactHeroVisual.tsx` & `src/components/sections/Contact.tsx`):
  - Hero com canal P2P aberto conectando Decisor e Liderança Técnica.
  - Eliminação da caixa/card flutuante opaca ao redor do formulário de contato, integrando os campos de preenchimento underline (`border-b`) diretamente ao fundo da página com separação por hairlines.

### Modificado
- **`src/components/layout/PageHero.tsx`**: Adicionada propriedade opcional `visualClassName` para permitir máxima flexibilidade geométrica a composições abertas.
- **`src/components/layout/__tests__/PageHero.test.tsx`**: Atualização dos testes unitários para validar as novas diretrizes abertas e réguas de precisão da SPEC-113 (7/7 testes OK).
- **Quality Gates**:
  - 41/41 suítes Vitest aprovadas (275/275 testes unitários passando).
  - 46/46 testes Playwright E2E aprovados.
  - 0 erros no ESLint e build estático validado.

## [0.0.112-heros-dashboard-cards-negocio] - 2026-10-07

### Adicionado
- **`specs/SPEC-112-heros-dashboard-cards-negocio.md`** e **`tasks/TASK-112-heros-dashboard-cards-negocio.md`**: Especificação técnica aprovada e checklist para transição dos artefatos puramente orientados a código para métricas executivas de estabilidade e negócio.

## [0.0.111-page-hero-split-e-artefatos-visuais] - 2026-10-07

### Adicionado
- **`specs/SPEC-111-page-hero-split-e-artefatos-visuais.md`**, **`tasks/TASK-111-page-hero-split-e-artefatos-visuais.md`** e **`reviews/QA-111.md`**: Especificação técnica aprovada, checklist de implementação e relatório de QA para unificação dos Heros multi-rota em layout split 60/40 com artefatos visuais autorais dedicados.
- **Componente Base Reutilizável `PageHero.tsx`** (`src/components/layout/PageHero.tsx`):
  - Layout assimétrico split (60% editorial / 40% visual em desktop) com iluminação difusa esmeralda/ciano em segundo plano.
  - Acessibilidade WCAG estrita com H1 programático (`#page-title` / `#hero-title`), `aria-labelledby`, transição tonal de superfície `data-tone="anchor"` pura (sem divisores artificiais de borda) e container visual com `aria-hidden` automático.
  - Suporte à exibição de CTAs primários magnéticos chanfrados nos 4 cantos (`btn-bevel-4`) e integração ao hook de animações por rolagem (`useScrollReveal`).
- **5 Novos Artefatos Visuais Técnicos Autorais** (`src/components/layout/hero-visuals/`):
  - `ServicesHeroVisual.tsx`: Barramento de microsserviços em circuito impresso (PCB) com trilhas em 45º, status de roteador e telemetria de latência (`< 14ms`) e throughput (`2.500 req/s`).
  - `HowWeWorkHeroVisual.tsx`: Esteira sequencial com os 4 portais de validação de qualidade determinística (`01 DIAGNOSE`, `02 SPEC`, `03 BUILD`, `04 EVOLVE`).
  - `ExperienceHeroVisual.tsx`: Painel HUD industrial de cluster corporativo com disponibilidade de `99,9% uptime`, `2.500 req/s` de pico suportado e osciloscópio SVG de estabilidade.
  - `EngineeringHeroVisual.tsx`: Processador de arquitetura central `EPM-CORE 64-BIT SYNC` com 4 diodos de qualidade determinística e diretrizes Clean Architecture / SOLID / OWASP.
  - `ContactHeroVisual.tsx`: Conexão direta handshake P2P (`SYN/ACK ESTABLISHED`) conectando o decisor diretamente à liderança técnica sem intermediários.
- **Testes Unitários**:
  - `src/components/layout/__tests__/PageHero.test.tsx`: 7 novos testes unitários cobrindo layout split, acessibilidade, renderização de CTAs e integridade dos 5 artefatos visuais.

### Modificado
- **Integração nas 7 Rotas Canônicas**:
  - `src/components/sections/Hero.tsx` (`/`): Migrado para `PageHero`, preservando `id="hero"`, H1 monocromático da marca e o seletor interativo `BusinessScenarioSelector`.
  - `src/pages/ServicesPage.tsx` (`/services`): Substituição de `PageHeader` por `PageHero` com `ServicesHeroVisual` e CTA primário `"VAMOS CONVERSAR"`.
  - `src/pages/HowWeWorkPage.tsx` (`/how-we-work`): Substituição de `PageHeader` por `PageHero` com `HowWeWorkHeroVisual`.
  - `src/pages/ExperiencePage.tsx` (`/experience`): Substituição de `PageHeader` por `PageHero` com `ExperienceHeroVisual`.
  - `src/pages/EngineeringPage.tsx` (`/engineering`): Substituição de `PageHeader` por `PageHero` com `EngineeringHeroVisual`.
  - `src/pages/AboutPage.tsx` (`/about`): Substituição de header por `PageHero` com `EpmConstellation` vetorial interativa.
  - `src/pages/ContactPage.tsx` (`/contact`): Substituição de `PageHeader` por `PageHero` com `ContactHeroVisual`.
- **`src/components/sections/ArchitecturalBlueprint.tsx`**:
  - Refatoração do `useScrollReveal` para atuar no bloco da nuvem técnica sem interceptar os botões individuais, prevenindo conflito de CSS transforms com o `hover:scale` do Tailwind e garantindo o funcionamento estável dos tooltips do Radix.
- **Quality Gates**:
  - 41/41 suítes Vitest aprovadas (275 testes unitários passando).
  - 46/46 testes E2E Playwright aprovados.
  - 0 erros no ESLint e build pré-renderizado estático validado.


## [0.0.110-scroll-reveal-rotas-e-botoes-tipograficos] - 2026-10-07

### Adicionado
- **`specs/SPEC-110-scroll-reveal-rotas-e-botoes-tipograficos.md`**, **`tasks/TASK-110-scroll-reveal-rotas-e-botoes-tipograficos.md`** e **`reviews/QA-110.md`**: Especificação técnica aprovada, checklist de tarefa e relatório de QA para padronização global de animações de revelação por rolagem (Scroll Reveal), eliminação de ícones decorativos em botões e definição do e-mail oficial.
- **Scroll Reveal em Rotas Internas**:
  - `src/components/ui/PageHeader.tsx`: Animação de entrada escalonada (`opacity: 0 -> 1`, `y: 20 -> 0`, `stagger: 0.08`, `duration: 0.65`) ativada automaticamente para todos os cabeçalhos de rotas (`/services`, `/how-we-work`, `/experience`, `/engineering`, `/contact`, `/faq`).
  - `src/pages/ServicesPage.tsx`: Grade de garantias de engenharia com `useScrollReveal` (`selector: ":scope > div"`, `stagger: 0.1`, `y: 24`).
  - `src/pages/HowWeWorkPage.tsx` & `src/components/sections/ProcessExplorer.tsx`: Animação por rolagem no explorer de etapas e no manifesto de engenharia.
  - `src/pages/ExperiencePage.tsx`: Animação por rolagem no grid 2x2 de verticais e nas linhas do enterprise ledger corporativo.
  - `src/pages/EngineeringPage.tsx` & `src/components/sections/ArchitecturalBlueprint.tsx`: Animação da lista de princípios, janela do terminal CI/CD, nuvem tipográfica de tecnologias centrais e CTA final.
  - `src/pages/AboutPage.tsx`: Animação no hero editorial monocromático, timeline de marcos da jornada (`[data-testid^='milestone-']`), manifesto técnico e Bottom CTA.
  - `src/pages/ContactPage.tsx`: Animação na grade de cards de perguntas frequentes de apoio.

### Modificado
- **Botões Estritamente Tipográficos e Editoriais**:
  - Remoção de todos os ícones decorativos internos (`→`, `ArrowRight`, `ArrowUpRight`, `ChevronRight`, `Send`, `Maximize2`, `Home`, `Code2`, `Mail`) em botões e CTAs de `Hero.tsx`, `ServicesPage.tsx`, `FAQ.tsx`, `HomeServicesBento.tsx`, `ProcessExplorer.tsx`, `Contact.tsx`, `ContactForm.tsx`, `ContactPage.tsx` e `NotFound.tsx`.
- **E-mail Oficial de Contato**:
  - Atualizado para `elessandro@epmdevtech.com.br` (`mailto:elessandro@epmdevtech.com.br`) na seção/página de contato (`Contact.tsx`) e atualizadas as asserções em `Contact.test.tsx`.
  - Expurgo de menções residuais a promessas de "24h úteis" em `FAQ.tsx`, `config/faq.ts`, `FAQPage.tsx` e `Index.tsx`.
- **Testes & Quality Gates**:
  - 40/40 suítes Vitest aprovadas (268 testes unitários passando, 99.07% de cobertura de código).
  - 46/46 testes E2E Playwright aprovados.
  - ESLint com zero erros e build pré-renderizado estático validado.
- **`PROJECT.md`**: Atualizado o estado canônico do projeto.

## [0.0.109-humanizacao-contato-e-foco-editorial-engenharia] - 2026-10-07

### Adicionado
- **`specs/SPEC-109-humanizacao-contato-e-foco-editorial-engenharia.md`**, **`tasks/TASK-109-humanizacao-contato-e-foco-editorial-engenharia.md`** e **`reviews/QA-109.md`**: Especificação técnica aprovada, tarefa e relatório de QA para humanização da página/seção de contato e foco editorial na rota de engenharia.
- Bloco editorial de contato direto por e-mail em `src/components/sections/Contact.tsx` ("Prefere e-mail? Escreva diretamente para" `contato@epmdevtech.com.br`).
- Seção de fechamento comercial e Bottom CTA em `src/pages/EngineeringPage.tsx` com botão `VAMOS CONVERSAR` direcionando para `/contact`.

### Modificado
- **`src/components/sections/Contact.tsx`**:
  - Título editorial dominante atualizado para `"Vamos conversar sobre como podemos apoiar você e seu projeto"`.
  - Subtítulo atualizado para `"Assim que recebermos sua mensagem, entraremos em contato para entender o cenário técnico e agendar uma conversa."`.
  - Expurgo definitivo de promessas artificiais de prazo comercial ("retornamos em 24h", "24 horas úteis") do bloco informativo e do feedback de envio (`toast.success`).
  - Botão de envio atualizado para `"ENVIAR MENSAGEM"` com caixa alta obrigatória (`uppercase tracking-[0.04em] font-semibold`) e chanfro simétrico (`btn-bevel-4`).
- **`src/pages/ContactPage.tsx`**: Alinhamento de título e descrição de cabeçalho editorial e remoção de menções a 24h nos metadados.
- **`src/pages/EngineeringPage.tsx`**: Remoção definitiva do botão de CTA do topo (`VER TECNOLOGIAS`) no `PageHeader`, preservando foco estrito na documentação editorial e autoridade técnica.
- **`scripts/prerender.js`**: Atualização do HTML pré-renderizado de `/contact` expurgando menções a 24h e alinhando H1.
- **Testes**: Atualização de testes unitários (`Contact.test.tsx`, `pages.test.tsx`) e da suíte E2E multi-rota (`multi-route-navigation.spec.ts`).
- **`PROJECT.md`**: Atualizado o estado canônico do projeto.

## [0.0.108-refatoracao-ctas-hero-home-e-sobre] - 2026-10-07

### Adicionado
- **`specs/SPEC-108-refatoracao-ctas-hero-home-e-sobre.md`**, **`tasks/TASK-108-refatoracao-ctas-hero-home-e-sobre.md`** e **`reviews/QA-108.md`**: Especificação técnica aprovada, tarefa e relatório de QA para refatoração e foco dos CTAs no Hero da Home e na rota Sobre Nós.
- Seção de fechamento comercial e Bottom CTA em `src/pages/AboutPage.tsx` com botão `VAMOS CONVERSAR` direcionando para `/contact`.

### Modificado
- **`src/components/sections/Hero.tsx`**: CTA primário único atualizado para `"VAMOS CONVERSAR"` (`uppercase tracking-[0.04em] font-semibold`, `btn-bevel-4`) e remoção definitiva do botão secundário `"CONHEÇA AS SOLUÇÕES"`, garantindo foco singular de conversão.
- **`src/pages/AboutPage.tsx`**: Remoção definitiva do botão de CTA da primeira dobra (Hero), conferindo respiro editorial à narrativa e à constelação interativa `EpmConstellation`, sem redundância com o botão fixo da Navbar.
- **Testes**: Atualização das asserções de CTA no teste unitário `Hero.test.tsx` e na suíte E2E do Playwright (`design-system-and-stability.spec.ts`).
- **`PROJECT.md`**: Atualizado o estado canônico do projeto.

## [0.0.107-padronizacao-copy-estilo-botoes-ctas-uppercase] - 2026-10-07

### Adicionado
- **`specs/SPEC-107-padronizacao-copy-estilo-botoes-ctas-uppercase.md`**, **`tasks/TASK-107-padronizacao-copy-estilo-botoes-ctas-uppercase.md`** e **`reviews/QA-107.md`**: Especificação técnica aprovada, tarefa e relatório de QA para padronização de redação comercial B2B e estilo dos botões e CTAs em caixa alta (uppercase).
- Botão CTA secundário no Hero da Home (`CONHEÇA AS SOLUÇÕES`) em variante outline direcionando para `/services`.
- Botão de exploração técnica no PageHeader de Engenharia (`VER TECNOLOGIAS`) direcionando para `#tecnologias`.

### Modificado
- **`src/components/ui/MagneticButton.tsx`**: Estilo base atualizado com `uppercase tracking-wider font-semibold` e escalas de padding/fonte refinadas (`sm: px-5 py-2.5`, `lg: px-8 py-3.5`).
- **Padronização de redação e botões em todos os pontos de contato**:
  - `Header.tsx`: "FALE COMIGO" (desktop e gaveta móvel).
  - `Hero.tsx`: "FALE COMIGO" e "CONHEÇA AS SOLUÇÕES".
  - `Home.tsx`: "VER SOLUÇÕES", "COMO TRABALHAMOS", "VER EXPERIÊNCIA" e "CONHEÇA A EPM DEVTECH".
  - `HomeServicesBento.tsx`: "VER DETALHES" nos 4 cards bento.
  - `AboutPage.tsx`: "FALE COMIGO".
  - `ServicesPage.tsx`: "VAMOS CONVERSAR".
  - `Contact.tsx`: "SOLICITAR ORÇAMENTO" (com remoção de aria-label estático para refletir feedback de envio acessível).
  - `ContactForm.tsx`: "ENVIAR MENSAGEM".
  - `FAQPage.tsx`: "VAMOS CONVERSAR".
  - `FAQ.tsx`: "VAMOS CONVERSAR →".
  - `NotFound.tsx`: "PÁGINA INICIAL", "VER SOLUÇÕES", "FALE COMIGO".
- **Testes**: Atualização de asserções em suítes unitárias e E2E Playwright (`design-system-and-stability.spec.ts`, `multi-route-navigation.spec.ts`).
- **`PROJECT.md`**: Registrada padronização de CTAs e cobertura de 99,06%.

## [0.0.106-rotas-slugs-ingles] - 2026-10-03

### Adicionado
- **`specs/SPEC-106-*.md`**, **`tasks/TASK-106-*.md`** e **`reviews/QA-106.md`**: especificação aprovada (D1 = `/about`, D2 = `/faq`), tarefa e QA.
- **`src/config/routes.ts`**: fonte única de rotas canônicas (`ROUTES`) e mapa de redirects legados (`LEGACY_REDIRECTS`).
- **Testes**: `routes.test.ts` (consistência com `vercel.json`, sitemap, prerender e llms) e `App.redirects.test.tsx` (11 redirects legados, rota nova e 404).

### Modificado
- **Rotas/slugs em inglês** (conteúdo permanece em pt-BR): `/services`, `/how-we-work`, `/experience`, `/engineering`, `/about`, `/contact`, `/faq`.
- **`src/App.tsx`**: rotas via `ROUTES` e `<Navigate replace>` para todos os slugs legados.
- **Links internos, canonicals e `og:url`**: Header, Footer, Hero, HomeServicesBento, Home, NotFound, páginas e `ScrollManager`.
- **`vercel.json`**: 11 redirects 301 permanentes diretos (sem cadeias), incluindo `/duvidas-frequentes` → `/faq`.
- **`scripts/prerender.js`**: gera `dist/<rota-em-inglês>/index.html`.
- **SEO/LLMO**: `sitemap.xml` (URLs novas, `lastmod` 2026-10-03), `robots.txt` (nota de não bloqueio dos legados), `llms.txt`/`llms-full.txt` (URLs novas + nota de migração), JSON-LD em `index.html`.
- **Testes unitários e E2E** atualizados para as novas rotas; **`PROJECT.md`** atualizado.

### Observações
- O componente legado `src/pages/Index.tsx` (one-page, sem uso no roteador) e seu teste não foram alterados (fora do escopo).
- `npx tsc` reporta erros pré-existentes em `MagneticButton.tsx` e `use-idle.ts`, não relacionados a esta entrega.

## [0.0.105-constelacao-interativa-inspector] - 2026-10-03

### Adicionado
- **`specs/SPEC-105-constelacao-interativa-inspector-praticas.md`**, **`tasks/TASK-105-*.md`** e **`reviews/QA-105.md`**: especificação aprovada, tarefa e relatório de QA do Constellation Inspector.
- **`src/data/constellationPractices.ts`**: `ConstellationPractice`, `PRACTICES_DATA` (4 práticas mapeadas a `core_center`, `bra_l_tip`, `bra_r_tip`, `t_mid`) e `nodeIndexOf`.
- **`src/components/sections/constellation/`**: `ConstellationInspector`, `ConstellationNode`, `PracticeCard`, `ActiveNodeHighlight`, `useConstellationInspector`, `ConstellationEdgesLayer`, `ConstellationNodesLayer`, `ConstellationDefs` e testes (16 novos testes).
- Popover com `@radix-ui/react-popover` controlado: hover intent 120/150 ms, pin por clique/toque, foco por teclado, Esc, setas ←/→, hit areas ≥ 44px, card com chanfro 45° (`corner-top-right-shape: bevel` + fallback `clip-path`) e `prefers-reduced-motion`.

### Modificado
- **`EpmConstellation.tsx`**: camadas SVG memoizadas (hover de nó não re-renderiza arestas/nós), handlers de proximidade movidos ao contêiner, `aria-hidden` restrito ao `<svg>` quando `interactive=true`. Visual do logotipo inalterado sem nó ativo.
- **`EpmConstellation.test.tsx`**: ajustado para o novo posicionamento de `aria-hidden`.
- **`PROJECT.md`**: estado atualizado (38 suites, 249 testes, 99,05% de cobertura).

## [0.0.104-geometria-full-bevel-4-cantos] - 2026-10-03

### Adicionado
- **`specs/SPEC-104-geometria-full-bevel-4-cantos.md`**: Especificação técnica aprovada para a transição para a geometria "Full Bevel / 4-Corner Chamfer" (Octógono Simétrico de Engenharia com corte chanfrado a 45º em todos os 4 cantos) e implementação do sombreamento chanfrado em camadas com traço contínuo em 8 lados.
- **`tasks/TASK-104-geometria-full-bevel-4-cantos.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-104.md`**: Relatório de QA com validação integral dos quality gates (0 erros TypeScript, 0 erros ESLint, 233 testes unitários no Vitest com 99.18% de cobertura geral, 46 testes Playwright E2E aprovados e build de produção com pré-renderização estática de 7 rotas).
- **Utilitários de Sombreamento Chanfrado em Camadas em `src/index.css`**: Adicionados `.btn-bevel-shadow`, `.btn-bevel-shadow-sm`, `.btn-bevel-shadow-white` e `.btn-bevel-shadow-brand` gerando traço contínuo nítido de 1px ao redor de todos os 8 lados e sombra rígida extrudada a 45º no canto inferior direito (`5px 5px 0px` / `3px 3px 0px`) com translação mecânica no clique (`:active`).

### Modificado
- **`src/index.css`**: Implementados `.btn-bevel-4` e `.btn-bevel-4-sm` (polígono simétrico de 8 pontos com corte chanfrado a 45º nos 4 cantos) e unificado `.btn-chamfer` como alias.
- **`src/components/ui/button.tsx`**: Atualizadas as variantes `chamfer`, `chamfer-outline` e `chamfer-gradient` para a geometria `.btn-bevel-4`, adicionando os aliases `bevel` e `bevel-outline`.
- **`src/components/ui/MagneticButton.tsx`**: Adoção nativa da geometria octogonal `.btn-bevel-4` (e `.btn-bevel-4-sm` para botões compactos), aplicação automática do sombreamento `.btn-bevel-shadow` no wrapper geométrico `areaRef`, mantendo a sombra sincronizada em tempo real com a cinemática física do GSAP, e adição da prop `shadowVariant`.
- **`src/components/ui/__tests__/MagneticButton.test.tsx`**: Testes expandidos para validação do sombreamento chanfrado, classes `.btn-bevel-shadow`, `.btn-bevel-shadow-sm`, `.btn-bevel-shadow-white`, `.btn-bevel-shadow-brand` e desativação com `shadowVariant="none"`.
- **`src/components/ui/__tests__/button.test.tsx`**: Validação das variantes `bevel` e `bevel-outline`.
- **`PROJECT.md`**: Atualização canônica de componentes, design system e métricas de testes (233 testes unitários aprovados em 37 suítes).

## [0.0.103-padronizacao-botoes-engineering-chamfer] - 2026-10-03

### Adicionado
- **`specs/SPEC-103-padronizacao-botoes-engineering-chamfer.md`**: Especificação técnica aprovada para a padronização visual global dos botões de ação e CTAs do ecossistema EPM DevTech com a geometria técnica autoral "Engineering Chamfer" (3 cantos arredondados e canto superior direito chanfrado a 45º via `clip-path`).
- **`tasks/TASK-103-padronizacao-botoes-engineering-chamfer.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-103.md`**: Relatório de QA com validação integral dos quality gates (0 erros TypeScript, 0 erros ESLint, 231 testes unitários no Vitest com 99.18% de cobertura geral, 46 testes Playwright E2E aprovados e build de produção com pré-renderização estática).
- **`src/components/ui/__tests__/button.test.tsx`**: Suíte de testes unitários para o componente base `Button` cobrindo variantes `chamfer`, `chamfer-outline`, `chamfer-gradient`, tamanhos (`sm`, `md`, `lg`, `default`), `asChild` com Slot e disparos de evento.

### Modificado
- **`src/index.css`**: Adicionados utilitários `.btn-chamfer` e `.btn-chamfer-dual` na camada `@layer utilities` com polígonos CSS de precisão a 45º.
- **`src/components/ui/button.tsx`**: Adicionadas as variantes `chamfer` (fundo sólido `bg-brand`, texto `text-on-brand`, sombra e scale active), `chamfer-outline` (fundo translúcido escuro, borda sutil, hover esmeralda/ciano e backdrop-blur) e `chamfer-gradient`, além do tamanho `md` (`h-10 px-6 py-2.5`).
- **`src/components/ui/MagneticButton.tsx`**: Herança padrão da geometria `.btn-chamfer` e `rounded-md`, adição das variantes `chamfer` e `chamfer-outline`, tamanho `md` e adaptação da cortina filler animada.
- **`src/components/layout/Header.tsx`**: Botão CTA desktop e drawer mobile padronizados com `variant="chamfer"`.
- **`src/components/sections/Hero.tsx`**: CTA primário "Vamos conversar" atualizado com `variant="chamfer"` e `size="lg"`, mantendo estritamente os tokens de marca e regras de conversão.
- **`src/pages/ServicesPage.tsx`**: CTA principal da página de serviços atualizado com `variant="chamfer"` e `size="lg"`.
- **`src/pages/AboutPage.tsx`**: Integrado CTA institucional no hero editorial com `variant="chamfer"` e `size="md"`.
- **`src/pages/FAQPage.tsx`**: CTA final da página de dúvidas atualizado com `variant="chamfer"`.
- **`src/pages/NotFound.tsx`**: Botões da página 404 padronizados com `variant="chamfer"` e `variant="chamfer-outline"`.
- **`src/components/ContactForm.tsx` & `src/components/sections/Contact.tsx`**: Botões de envio de formulário padronizados com `variant="chamfer"`.
- **`src/components/ui/__tests__/MagneticButton.test.tsx`**: Testes expandidos para as novas variantes `chamfer` e `chamfer-outline`.
- **`PROJECT.md`**: Atualização do catálogo canônico e contadores de testes unitários (231 testes em 37 suítes).


### Adicionado
- **`specs/SPEC-102-recalibracao-ux-magnetic-button.md`**: Especificação técnica aprovada para recalibração cinemática e de usabilidade do `MagneticButton`, eliminando o comportamento invasivo de *cursor hijacking* através de margem estrita de proximidade e trava física de deslocamento.
- **`tasks/TASK-102-recalibracao-ux-magnetic-button.md`**: Tarefa e checklist de execução sob o protocolo Universal SDD.
- **`reviews/QA-102.md`**: Relatório de QA com validação integral dos quality gates (0 erros TypeScript, 0 erros ESLint, 224 testes unitários no Vitest com 99.18% de cobertura, 46 testes Playwright E2E e build de produção com pré-renderização estática).

### Modificado
- **`src/components/ui/MagneticButton.tsx`**: Recalibração de UX:
  * Substituição do trigger radius baseado na largura do botão por margem de proximidade fixa de `20px` (`proximityMargin = 20`) além das bordas físicas.
  * Clamping mecânico rígido com limites máximos de translação: `maxTravelX = 12px`, `maxTravelY = 8px` e texto interno limitado a `±4.2px` (`-clampedX * 0.35`).
  * Mecânica de desengate imediato (*breakout*): soltura imediata do cursor ao ultrapassar a margem de 20px com retorno amortecido suave à posição de repouso `(0, 0)`.
  * Força atenuada padrão (`strength = 0.15`) e interpolação ágil do GSAP (`0.38s`, `ease: "power2.out"`), prevenindo sensações de oscilação elástica ou gelatina.
- **`src/components/ui/__tests__/MagneticButton.test.tsx`**: Atualização e expansão da suíte de testes unitários para validar a detecção de borda dentro/fora da margem de 20px, desengate imediato (*breakout*) e clamping estrito do deslocamento nos eixos X e Y.
- **`PROJECT.md`**: Atualização dos registros canônicos de componentes e métricas de testes (224 testes unitários em 36 suítes).


### Adicionado
- **`specs/SPEC-101-refatoracao-definitiva-magnetic-button.md`**: Especificação técnica aprovada para a refatoração e implementação definitiva do componente `MagneticButton`, imune a oscilações no scroll, com container geométrico fixo (`areaRef`), isolamento com GSAP 3 `gsap.context()`, transição vertical Codrops do texto (`swapText`) e suporte polimórfico a navegação SPA.
- **`tasks/TASK-101-refatoracao-definitiva-magnetic-button.md`**: Tarefa e checklist de execução sob o protocolo Universal SDD.
- **`reviews/QA-101.md`**: Relatório de QA com validação integral dos quality gates (0 erros TypeScript, 0 erros ESLint, 223 testes unitários no Vitest com 99.18% de cobertura, 46 testes Playwright E2E e build de produção com pré-renderização estática).

### Modificado
- **`src/components/ui/MagneticButton.tsx`**: Refatoração estrutural com referência geométrica estática sem transform (`areaRef`), cálculo viewport-relative imune a rolagem (`getBoundingClientRect()` vs `clientX`/`clientY`), física 2.5D oposta para o texto interno, transição vertical com timeline GSAP (`swapText`), cortina filler dinâmica para variante `outline`, suporte polimórfico a `<button>`, `<Link to="...">` e `<a href="...">`, além de variantes corporativas `primary` (token `bg-brand` #2DD4BF e `text-on-brand` #04201C), `outline`, `ghost` e `secondary`.
- **`src/components/ui/__tests__/MagneticButton.test.tsx`**: Atualização e expansão da suíte de testes unitários para cobrir a cinemática de aproximação, callbacks `onHoverStart`/`onHoverEnd`, variantes de estilo, bypass para `prefers-reduced-motion` e touch screens, desabilitação e limpeza de memória.
- **`src/components/layout/Header.tsx`**: Integração do botão de contato desktop e mobile utilizando o `MagneticButton` com `variant="primary"` e acionamento por navegação.
- **`src/components/sections/Hero.tsx`**: Atualização do CTA primário "Vamos conversar" com navegação via `onClick` e preservação dos tokens de identidade visual.
- **`src/pages/ServicesPage.tsx`**: Atualização do CTA principal de Serviços com `MagneticButton`.
- **`src/pages/FAQPage.tsx`**: Atualização do CTA final de dúvidas com `MagneticButton`.
- **`src/setupTests.ts`**: Adição de polyfills seguros para `requestAnimationFrame`/`cancelAnimationFrame` e encerramento de intervalos residuais do `ScrollTrigger` via `afterEach`.
- **`PROJECT.md`**: Atualização dos registros canônicos de componentes e métricas de testes (223 testes unitários em 36 suítes).

## [0.0.100-componente-magnetic-button-cta] - 2026-10-02

### Adicionado
- **`specs/SPEC-100-componente-magnetic-button-cta.md`**: Especificação técnica aprovada pelo PO para implementação de componente reutilizável de botão magnético (*Magnetic Button*) baseado na mecânica clássica da Codrops / Cuberto, com 3 camadas cinemáticas de parallax e snap-back elástico.
- **`tasks/TASK-100-componente-magnetic-button-cta.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-100.md`**: Relatório de QA com validação de 100% dos quality gates (zero erros de compilação, linting sem advertências, 221 testes unitários passando, 46 testes E2E do Playwright aprovados e conformidade estrita com travas de tokens).
- **`src/components/ui/MagneticButton.tsx`**: Componente polimórfico (`button`, `Link` do React Router e âncora `<a>`) com 3 camadas cinemáticas independentes (Hitbox, Superfície com translação moderada, Conteúdo com translação ampliada para parallax 2.5D), expansão radial do filler a partir do ponto de entrada do cursor, retorno elástico amortecido no `mouseleave` (`ease: "elastic.out(1.1, 0.4)"`), desativação automática em telas touch (`pointer: coarse`), respeito a `prefers-reduced-motion` e anel de foco acessível (`:focus-visible`).
- **`src/components/ui/__tests__/MagneticButton.test.tsx`**: Suíte de testes unitários cobrindo renderização polimórfica, variantes visuais, interações com mouse, redução de movimento, desabilitação e limpeza de memória.

### Modificado
- **`src/components/layout/Header.tsx`**: Substituição do CTA desktop e mobile pelo novo `<MagneticButton>`.
- **`src/components/sections/Hero.tsx`**: Substituição do CTA primário da Home ("Vamos conversar") por `<MagneticButton>`, preservando o token semântico `text-on-brand` e raio de 6px (`rounded-md`).
- **`src/pages/ServicesPage.tsx`**: Integração do `<MagneticButton>` no CTA de abertura ("Conversar sobre seu projeto").
- **`src/pages/FAQPage.tsx`**: Integração do `<MagneticButton>` no CTA de encerramento ("Falar sobre meu projeto").
- **`src/components/sections/Contact.tsx` & `src/components/ContactForm.tsx`**: Integração do `<MagneticButton>` no botão de envio do formulário de contato.
- **`PROJECT.md`**: Atualização do catálogo de componentes e contadores de testes unitários (221 testes em 36 suítes).

## [0.0.99-sistema-smooth-scroll-lenis-gsap-scroll-reveals] - 2026-10-02

### Adicionado
- **`specs/SPEC-099-sistema-smooth-scroll-lenis-gsap-scroll-reveals.md`**: Especificação técnica aprovada pelo PO para implementação de sistema de rolagem suave (*smooth scroll*) com Lenis e revelações reativas acopladas à rolagem (*scroll-driven reveals*) com GSAP + ScrollTrigger, com física inercial corporativa sóbria e elegante.
- **`tasks/TASK-099-sistema-smooth-scroll-lenis-gsap-scroll-reveals.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-099.md`**: Relatório de QA com validação de 100% dos quality gates (zero erros de compilação, linting sem advertências, 211 testes unitários passando, 46 testes E2E do Playwright aprovados e chunking otimizado).
- **`src/components/layout/SmoothScrollProvider.tsx` & `src/hooks/useSmoothScroll.ts`**: Provedor global de rolagem suave com `lenis`, sincronização estrita de frames via `gsap.ticker` com `lagSmoothing(0)`, integração de transições de rotas SPA no React Router (`immediate: true` e `ScrollTrigger.refresh()`), suporte a hash de âncoras com offset para cabeçalho fixo, suporte defensivo a `prefers-reduced-motion` e descarte limpo (`ctx.revert()`, `lenis.destroy()`).
- **`src/hooks/useScrollReveal.ts`**: Hook corporativo com `gsap.context()` para revelações atreladas à rolagem, suporte a parâmetros de animação configuráveis, normalização de seletores relativos (`:scope > ...`), redução de deslocamento em mobile e respeito estrito a `prefers-reduced-motion`.
- **`src/components/layout/__tests__/SmoothScrollProvider.test.tsx`** e **`src/hooks/__tests__/useScrollReveal.test.tsx`**: Testes unitários cobrindo renderização, contexto, navegação com hash, redução de movimento vestibular e ciclo de vida de limpeza.

### Modificado
- **`package.json`**: Adicionadas as dependências `lenis` e `gsap`.
- **`vite.config.ts`**: Configurado chunk manual `gsap-lenis` com limite e isolamento estrito (tamanho resultante do chunk: 134.78 kB bruto / 51 kB gzip).
- **`src/components/layout/Layout.tsx`**: Encapsulado com `<SmoothScrollProvider>`.
- **`src/components/ui/SectionHeader.tsx`**: Integrado `useScrollReveal` para revelação suave e contínua do cabeçalho de seção.
- **`src/components/sections/HomeServicesBento.tsx`**: Integrado `useScrollReveal` com stagger nos cards de serviços.
- **`src/components/sections/HomeProcessPipeline.tsx`**: Integrado `useScrollReveal` com stagger nas 4 etapas do processo.
- **`src/setupTests.ts`**: Adicionados mocks defensivos de `window.matchMedia`, `ResizeObserver` e `window.scrollTo` para o ambiente jsdom.
- **`PROJECT.md`**: Atualização do stack frontend, contadores de testes unitários (211 testes em 35 suítes) e descrição do módulo de Smooth Scroll & Scroll Reveals.

## [0.0.98-correcao-atributo-r-svg-circle-constelacao] - 2026-10-02

### Adicionado
- **`specs/SPEC-098-correcao-atributo-r-svg-circle-constelacao.md`**: Especificação técnica aprovada pelo PO para eliminação de erro no console referente ao atributo `r` do SVG `<circle>` / `<motion.circle>` vindo de `framer-motion.js` ao navegar para a rota `/sobre`.
- **`tasks/TASK-098-correcao-atributo-r-svg-circle-constelacao.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-098.md`**: Relatório de QA com validação de 100% dos quality gates e teste automatizado de console comprovando 0 erros.

### Modificado
- **`src/components/sections/EpmConstellation.tsx`**: Inclusão de `r={15}` explícito e `initial={{ r: 15, opacity: ... }}` nos dois elementos `<motion.circle>` do sonar central do logo da EPM DevTech, eliminando a inicialização de atributo com valor `undefined`. Implementação de fallbacks numéricos defensivos em todos os nós (`r={haloRadius || 8}`, `r={nodeRadius || 3}` e `r={(nodeRadius || 3) * 0.45 || 1.5}`).
- **`src/components/sections/__tests__/EpmConstellation.test.tsx`**: Adicionada asserção automatizada garantindo que 100% dos elementos `<circle>` possuem atributo `r` numérico válido (> 0) e nunca `undefined` ou `NaN`.
- **`PROJECT.md`**: Atualização do estado do componente de Constelação e contadores de testes unitários (203 testes).

## [0.0.97-correcao-contraste-numeros-pipeline-dark-mode] - 2026-10-02

### Adicionado
- **`specs/SPEC-097-correcao-contraste-numeros-pipeline-dark-mode.md`**: Especificação técnica aprovada pelo PO para correção de contraste e visibilidade dos números das etapas do pipeline no Modo Escuro (Dark Mode).
- **`tasks/TASK-097-correcao-contraste-numeros-pipeline-dark-mode.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-097.md`**: Relatório de QA com validação de 100% dos quality gates e captura de tela demonstrando nitidez dos números das etapas no Dark Mode.

### Modificado
- **`src/components/sections/HomeProcessPipeline.tsx`**: Eliminação de classes dinâmicas concatenadas com prefixo `dark:${...}` no elemento circular dos nós. Declaração de classes completas e estáticas para Dark e Light mode nos tokens das 4 etapas (`dark:text-accent-blue`, `dark:text-accent-violet`, `dark:text-accent-amber`, `dark:text-text-brand` e bordas iluminadas temáticas), garantindo varredura estática pelo Tailwind CSS e contraste WCAG AAA (8.4:1 a 12.8:1) sobre `dark:bg-zinc-950`.
- **`src/components/sections/__tests__/HomeProcessPipeline.test.tsx`**: Adicionada asserção automatizada garantindo presença das classes estáticas de modo escuro nos 4 nós técnicos.
- **`PROJECT.md`**: Atualização do estado do componente de Pipeline e métricas de testes.

## [0.0.96-refatoracao-experiencia-tipografica-espacial-editorial] - 2026-10-02

### Adicionado
- **`specs/SPEC-096-refatoracao-experiencia-tipografica-espacial-editorial.md`**: Especificação técnica aprovada pelo PO para refatoração da experiência tipográfica, espacial e textual no padrão editorial B2B maduro (inspirado em referências como Codeminer42, Stripe e Vercel).
- **`tasks/TASK-096-refatoracao-experiencia-tipografica-espacial-editorial.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-096.md`**: Relatório de QA com validação de 100% dos quality gates e evidências de capturas visuais responsivas em Desktop e Mobile nos temas Dark e Light.
- **Classes Utilitárias Editoriais em `src/index.css`**: Criação de classes para tipografia e containers fluida (`.editorial-container`, `.editorial-h1`, `.editorial-h2`, `.editorial-h3`, `.editorial-body`, `.editorial-eyebrow`).

### Modificado
- **`tailwind.config.ts`**: Priorização de `Inter` na família tipográfica primária (`font-sans`).
- **`src/components/ui/SectionWrapper.tsx`**: Adoção de padding vertical fluido `py-[clamp(4.5rem,8vw,8rem)]` e container unificado `.editorial-container`.
- **`src/components/ui/SectionHeader.tsx`**: Eyebrow minimalista editorial sem bordas/badges (`text-[0.8rem] tracking-[0.04em] uppercase text-text-brand`), título H2 fluido (`clamp(2.25rem,4vw,3.75rem)` com leading `1.05` e tracking `-0.045em`) e descrição com measure `max-w-[65ch]`.
- **`src/components/ui/PageHeader.tsx`**: Escala fluida em H1 (`clamp(2.5rem,5vw,4.5rem)`) e subtítulo com `max-w-[65ch]`.
- **`src/components/sections/Hero.tsx`**: Headline H1 em escala fluida dominante (`clamp(3.25rem,6vw,5.5rem)`, leading `0.98`, tracking `-0.055em`, monocromático), subheadline com `max-w-[58ch]`, container unificado e respiro superior otimizado (`pt-24 sm:pt-28`).
- **`src/components/sections/HomeServicesBento.tsx`**, **`HomeProcessPipeline.tsx`**, **`HomeResultsStrip.tsx`**, **`Services.tsx`**, **`Contact.tsx`**: Calibração dos cabeçalhos H3, medidas de leitura e espaçamento vertical.
- **Páginas de rotas canônicas (`Home.tsx`, `AboutPage.tsx`, `HowWeWorkPage.tsx`, `ExperiencePage.tsx`, `FAQPage.tsx`)**: Alinhamento à experiência editorial sem alteração da paleta da marca.
- **`src/components/ui/__tests__/SectionHeader.test.tsx`**: Sincronização dos testes unitários com as novas dimensões e tracking tipográficos.
- **`PROJECT.md`**: Atualização do estado canônico de tipografia, container e governança.

## [0.0.95-refatoracao-esquema-cromatico-light-mode] - 2026-10-02

### Adicionado
- **`specs/SPEC-095-refatoracao-esquema-cromatico-light-mode.md`**: Especificação técnica aprovada pelo PO para refatoração do esquema cromático do Modo Claro (Light Mode) com cadência rítmica alternada e alto contraste.
- **`tasks/TASK-095-refatoracao-esquema-cromatico-light-mode.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-095.md`**: Relatório de QA com validação de 100% dos quality gates e evidências de capturas visuais em Light Mode nas principais rotas (Home, Sobre, Serviços, Como Trabalhamos, Engenharia e Footer).

### Modificado
- **`src/index.css`**: Recalibração dos tokens semânticos do Light Mode: âncoras em branco puro (`--surface-anchor: 0 0% 100%` / `#FFFFFF`), seções intermediárias em tom gelo sutil (`--surface-base: 240 5% 98%` / `#FAFAFA` - `zinc-50`) e branco puro (`--surface-alt: 0 0% 100%`). Hierarquia de contraste WCAG AA para `--text-primary` (`#09090B` / `zinc-950`), `--text-secondary` (`#52525B` / `zinc-600`), `--text-muted` (`#71717A` / `zinc-500`) e `--text-brand` (`#0F766E` / `teal-700`).
- **`src/components/layout/Header.tsx`**: Header em branco translúcido com desfoque e borda inferior refinada (`bg-white/80 dark:bg-surface-anchor/85 border-b border-zinc-200/80 dark:border-border/40`), e gaveta móvel em `bg-white/95 dark:bg-zinc-950/95`.
- **`src/components/sections/Footer.tsx`**: Rodapé fixado em branco puro (`bg-surface-anchor`) com borda divisória superior nítida `border-t border-zinc-200 dark:border-zinc-800/80`.
- **`src/components/ui/SectionWrapper.tsx`**: Adicionada borda sutil `border-y border-zinc-200/70 dark:border-transparent` para seções de tom `base` (Gelo) delimitando a alternância visual.
- **`src/components/sections/HomeServicesBento.tsx`**: Cards em fundo branco sólido (`bg-white dark:bg-zinc-900/50`) com `shadow-sm` para destaque sobre o fundo gelo.
- **`src/components/sections/HomeProcessPipeline.tsx`**: Trilhos em `bg-zinc-200 dark:bg-zinc-800`, linha de pulso em `via-emerald-600 dark:via-brand`, nós circulares em `bg-white dark:bg-zinc-950 border-zinc-300 dark:... text-zinc-900 dark:...`.
- **`src/components/sections/Services.tsx`**: Delimitação sutil `border-y border-zinc-200/70 dark:border-transparent` para o bloco intermediário.
- **`src/components/ui/__tests__/SectionWrapper.test.tsx`**: Sincronização das asserções de classe do wrapper.
- **`e2e/hero-identity-token-locks.spec.ts`**: Atualização das asserções de estilo para validar Hero em `rgb(255, 255, 255)` e H1 em `rgb(9, 9, 11)` no Light Mode.
- **`PROJECT.md`**: Atualização do estado canônico de Design e Light Mode, além de métricas dos testes E2E.



### Adicionado
- **`specs/SPEC-094-alinhamento-constelacao-textos-monocromaticos-remocao-senior.md`**: Especificação técnica aprovada pelo PO para alinhamento e isolamento responsivo da constelação vetorial em `/sobre`, garantia de textos 100% monocromáticos e remoção integral da palavra "sênior".
- **`tasks/TASK-094-alinhamento-constelacao-textos-monocromaticos-remocao-senior.md`**: Tarefa e checklist de execução concluídos sob o protocolo Universal SDD.
- **`reviews/QA-094.md`**: Relatório de QA com validação de 100% dos quality gates e evidências de capturas visuais em Desktop Dark, Desktop Light e Mobile Dark.

### Modificado
- **`src/pages/AboutPage.tsx`**: Reestruturação do Hero em CSS Grid de 12 colunas (`grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`), posicionando o bloco de texto editorial na coluna esquerda (7 cols, `max-w-xl xl:max-w-2xl`) e o componente `EpmConstellation` na coluna direita (5 cols), eliminando qualquer colisão ou sobreposição de texto em todas as resoluções de tela.
- **`src/components/sections/Hero.tsx`**: Remoção do `<span className="text-text-brand">` do H1, tornando-o estritamente monocromático em `text-primary` ("Engenharia de software para construir, integrar e evoluir sistemas.") e remoção da palavra "sênior" do quarto cenário ("Avaliar a arquitetura do meu sistema com um diagnóstico técnico").
- **`src/pages/EngineeringPage.tsx`**: Atualização da esteira de qualidade para "Validação Arquitetural Obrigatória" e "Revisão técnica de arquitetura", eliminando menção ao termo sênior.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização dos testes unitários para validar H1 estritamente monocromático e novo texto do cenário de diagnóstico.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização das asserções Playwright para H1 monocromático e cenário de diagnóstico sem termo sênior.
- **`PROJECT.md`**: Atualização do estado canônico das seções Hero, Engenharia e Sobre nós.


### Adicionado
- **`specs/SPEC-093-sobre-constelacao-silhueta-epm.md`**: Especificação técnica aprovada pelo PO para constelação vetorial de engenharia desenhando a silhueta geométrica do ícone oficial da EPM DevTech no Hero de `/sobre`.
- **`tasks/TASK-093-sobre-constelacao-silhueta-epm.md`**: Tarefa e checklist de execução do protocolo Universal SDD.
- **`reviews/QA-093.md`**: Relatório de QA com validação de 100% dos quality gates e evidências de capturas visuais em Desktop Dark, Desktop Light e Mobile Dark.
- **`src/components/sections/EpmConstellation.tsx`**: Componente vetorial interativo em SVG e Framer Motion com nós estelares luminosos, halos difusos, pulso sonar, feixes de dados em trânsito e rastreamento de mouse com realce por proximidade.
- **`src/config/epmConstellation.ts`**: Mapeamento de coordenadas normalizadas (viewBox 0 0 600 600) para a moldura externa de tela/circuito com barramentos, chaves de código `{ }` centrais e divisor técnico `/`.
- **`src/components/sections/__tests__/EpmConstellation.test.tsx`**: Suíte de testes unitários cobrindo renderização da silhueta, nós, arestas, mouse tracking e acessibilidade com `useReducedMotion()`.

### Modificado
- **`src/pages/AboutPage.tsx`**: Integração do componente `EpmConstellation` no Hero, proporcionando identidade de marca exclusiva, profundidade tecnológica, contraste semântico otimizado e total compatibilidade com Dark e Light Mode.
- **`PROJECT.md`**: Atualização do estado canônico da rota `/sobre` e contadores de testes unitários (33 suítes, 201 testes).

## [0.0.92-humanizacao-completa-copywriting-b2b] - 2026-10-02

### Adicionado
- **`specs/SPEC-092-humanizacao-completa-copywriting-b2b.md`**: Especificação técnica e guia de tom de voz para humanização de 100% dos textos do site com foco em decisores de negócio e dores operacionais B2B.
- **`tasks/TASK-092-humanizacao-completa-copywriting-b2b.md`**: Tarefa e checklist de execução do protocolo Universal SDD.
- **`reviews/QA-092.md`**: Relatório de QA com validação de 100% dos quality gates (Vitest, Playwright, ESLint, TypeScript, Build e Prerender).

### Modificado
- **`src/config/site.ts`**: Atualizada descrição canônica e localização institucional para "Atendimento remoto em todo o Brasil".
- **`src/pages/Home.tsx` & `src/components/sections/Hero.tsx`**: Proposta de valor humanizada, H1 de forte impacto ("Engenharia de software para construir, integrar e evoluir sistemas"), subheadline editorial direta, seletor de cenários focado em dores concretas ("Qual é o principal desafio da sua empresa hoje?" com diagnóstico técnico direto).
- **`src/components/sections/HomeServicesBento.tsx`**: 4 serviços com descrições pragmáticas de ganho operacional (Sistemas sob medida, Integrações de APIs sem perda de dados, Modernização segura de legados e Consultoria de arquitetura).
- **`src/components/sections/HomeProcessPipeline.tsx`**: Etapas do pipeline (01 a 04) detalhadas em entregáveis tangíveis sem jargão vazio.
- **`src/components/sections/HomeResultsStrip.tsx`**: Legendas e rótulos acessíveis humanizados para autoridade e consistência técnica.
- **`src/pages/ServicesPage.tsx` & `src/components/sections/Services.tsx`**: H1 do PageHeader, faixa de garantias de engenharia e seções em Z-pattern estruturadas com gatilhos "Quando sua empresa precisa:".
- **`src/pages/HowWeWorkPage.tsx` & `src/components/sections/ProcessExplorer.tsx`**: Manifesto técnico em 2 colunas e resumos executivos com critérios de saída formais por fase no explorador interativo.
- **`src/pages/ExperiencePage.tsx`**: Descrições e desafios solucionados nas verticais de Indústria, Varejo, Educação e Energia, com nota de contexto honesta sobre projetos corporativos.
- **`src/pages/EngineeringPage.tsx` & `src/config/architecture.ts`**: Tooltips contextuais de tecnologias (React, TypeScript, Node.js, AWS, etc.) reescritos com foco no benefício gerado para a operação do cliente.
- **`src/pages/AboutPage.tsx`**: Marcos históricos na timeline e princípios de engenharia com sobriedade e maturidade institucional.
- **`src/components/sections/Contact.tsx`, `src/config/faq.ts` & `src/components/sections/Footer.tsx`**: Mensagem de retorno ágil em formulário (24h úteis), FAQ sobre modelo de atendimento 100% remoto nacional e rodapé sincronizado.
- **`scripts/prerender.js` & `index.html`**: Sincronização de metatags canônicas e HTML estático pré-renderizado para todas as 7 rotas.
- **Testes Unitários & E2E (`pages.test.tsx`, `Hero.test.tsx`, `Services.test.tsx`, `Contact.test.tsx`, `Footer.test.tsx`, `FAQ.test.tsx`, `hero-identity-token-locks.spec.ts`, etc.)**: Sincronizadas todas as asserções de conteúdo textual e tokens para 100% de aprovação nas suítes.
- **`PROJECT.md`**: Atualização do estado canônico do projeto com o registro da humanização B2B integral.

## [0.0.91-sobre-hero-constelacao-animada-posicionamento] - 2026-10-02

### Adicionado
- **`specs/SPEC-091-sobre-hero-constelacao-animada-posicionamento.md`**: Especificação técnica aprovada pelo PO para aproximação espacial e animações vivas em SVG e Framer Motion da constelação no Hero de `/sobre`.
- **`tasks/TASK-091-sobre-hero-constelacao-animada-posicionamento.md`**: Tarefa e checklist de execução do protocolo Universal SDD.
- **`reviews/QA-091.md`**: Relatório de QA com validação de 100% dos quality gates e evidências de capturas visuais em Desktop Dark, Desktop Light e Mobile Dark.
- **`src/components/sections/__tests__/EngineeringNetworkGraph.test.tsx`**: Suíte de testes unitários para validar renderização SVG, elementos de conectividade, gradientes, satélites e suporte a `prefers-reduced-motion`.

### Modificado
- **`src/components/sections/EngineeringNetworkGraph.tsx`**:
  - Implementada rotação contínua de anéis orbitais em sentidos opostos (anel interno a 42s horário e externo a 65s anti-horário).
  - Adicionado pulso sonar expansivo contínuo a partir do Core central (`r: [10, 52]`, repetição a cada 3.2s com ondas defasadas).
  - Implementado fluxo de pacotes de dados (`strokeDashoffset` animado nas linhas e partículas luminosas `motion.circle` viajando entre nós).
  - Adicionada micro-flutuação orgânica (`y: [-2, 2, -2]`) e pulsação luminosa suave nos nós satélites.
  - Suporte estrito a `useReducedMotion()`.
- **`src/pages/AboutPage.tsx`**:
  - Reposicionado `<EngineeringNetworkGraph>` para dentro do `container max-w-6xl mx-auto px-6 relative`, eliminando o vazio lateral em telas largas e aproximando a constelação do bloco editorial.
- **`PROJECT.md`**: Atualização do estado canônico da rota `/sobre` e contadores de testes unitários (32 suítes, 196 testes).


### Adicionado
- **`specs/SPEC-090-sobre-hero-copy-monocromatico.md`**: Especificação técnica para ajuste de copywriting e tipografia 100% monocromática do Hero de `/sobre`.
- **`tasks/TASK-090-sobre-hero-copy-monocromatico.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-090.md`**: Relatório de QA com validação dos quality gates e evidências visuais nos temas Dark, Light e Mobile.

### Removido
- **`src/pages/AboutPage.tsx`**:
  - Excluída a faixa de Inline Trust Marks (`● Atendimento 100% Remoto & Nacional`, `● Contato Direto com Liderança Técnica` e `● Propriedade Integral do Código`).
  - Removido o destaque verde/ciano nas palavras do H1.

### Modificado
- **`src/pages/AboutPage.tsx`**:
  - H1 atualizado para *"Transformando desafios em soluções que funcionam"*, 100% monocromático (`text-primary`).
  - Subtítulo atualizado para *"Unimos tecnologia, experiência e visão de negócio para criar soluções digitais que simplificam operações e geram resultados reais."*.
- **`scripts/prerender.js`**: H1 atualizado para a rota `sobre`.
- **`e2e/multi-route-navigation.spec.ts`**: Atualizada expectativa de H1 para `/sobre`.
- **`src/pages/__tests__/pages.test.tsx`**: Testes unitários atualizados para validar o novo H1 e a ausência das trust marks.
- **`PROJECT.md`**: Atualização do estado canônico da rota `/sobre`.

## [0.0.89-sobre-hero-editorial-network] - 2026-10-02

### Adicionado
- **`specs/SPEC-089-sobre-hero-editorial-network.md`**: Especificação técnica para refatoração editorial do Hero de `/sobre` com Inline Trust Marks e malha de conectividade em SVG.
- **`tasks/TASK-089-sobre-hero-editorial-network.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-089.md`**: Relatório de QA com validação dos quality gates e evidências de capturas de tela nos temas Dark, Light e Mobile.
- **`src/components/sections/EngineeringNetworkGraph.tsx`**: Componente visual de malha em SVG com Framer Motion (nós e feixes interconectados pulsantes com suporte a `prefers-reduced-motion`).
- **Faixa de Inline Trust Marks**: Três compromissos essenciais dispostos horizontalmente sem caixas fechadas (`● Atendimento 100% Remoto & Nacional`, `● Contato Direto com Liderança Técnica` e `● Propriedade Integral do Código`).

### Removido
- **`src/pages/AboutPage.tsx`**:
  - Removido completamente o card retangular fechado lateral *"Como atuamos com a sua equipe"*, seu container escuro (`bg-zinc-950/70`), bordas e divisórias internas.

### Modificado
- **`src/pages/AboutPage.tsx`**:
  - Layout editorial amplo (largura generosa `max-w-4xl`) integrando H1 de alto padrão tipográfico, eyebrow com `BrandChipIcon`, parágrafo institucional expandido e Inline Trust Marks.
  - Integração do `EngineeringNetworkGraph` posicionado de forma absoluta no canto direito/fundo com profundidade visual sutil.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização dos testes unitários para validar a nova faixa de Inline Trust Marks e a ausência do card fechado.
- **`PROJECT.md`**: Atualização do estado canônico da rota `/sobre`.

## [0.0.88-sobre-executive-briefing] - 2026-10-02

### Adicionado
- **`specs/SPEC-088-sobre-executive-briefing.md`**: Especificação técnica para unificação da dobra inicial da rota `/sobre` em Executive Briefing corporativo e remoção de dados burocráticos.
- **`tasks/TASK-088-sobre-executive-briefing.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-088.md`**: Relatório de QA com validação dos quality gates e evidências de capturas de tela nos temas Dark, Light e Mobile.
- **Painel "Compromissos de Parceria"**: Quadro executivo com 3 pilares estratégicos de alto impacto corporativo (*Atendimento 100% Remoto & Nacional*, *Contato Direto com a Liderança Técnica* e *Propriedade Total do Código & Entregas Incrementais*), acompanhado de badge `● Parceria Direta`.

### Removido
- **`src/pages/AboutPage.tsx`**:
  - Removido cabeçalho `PageHeader` antigo e primeira seção duplicada ("Visão & Posicionamento").
  - Removido card burocrático contendo dados cadastrais/fiscais (CNPJ, menção à sede física de Toledo-PR e endereço fiscal).
  - Removidas menções nominais isoladas ("Elessandro Prestes Macedo") e badge solto `+9 anos` da rota `/sobre`.
  - Removido botão de contato redundante interno ao card.

### Modificado
- **`src/pages/AboutPage.tsx`**:
  - Unificação da dobra inicial em um bloco integrado **Executive Briefing Hero** na camada tonal `anchor` (`bg-surface-anchor`).
  - H1 com acento cromático no trecho-chave: *"Engenharia de software sob medida com visão real de negócio"*.
  - Eyebrow padronizado: `[ QUEM SOMOS // POSICIONAMENTO ]` com `BrandChipIcon` em monospace ciano/esmeralda.
  - Parágrafo Institucional B2B focado em aplicações corporativas críticas e comunicação direta sem camadas comerciais.
  - Harmonização do ritmo de camadas tonais (SPEC-082): `anchor` (Hero) → `base` (Nossa Jornada) → `alt` (Missão & Princípios) → `anchor` (Footer).
  - Atualização do `<Helmet>` para metadados corporativos nacionais sem referência a Toledo-PR.
- **`scripts/prerender.js`**: Atualização do title, description e H1 pré-renderizados para a rota `sobre`.
- **`e2e/multi-route-navigation.spec.ts`**: Atualização do teste E2E para o novo título e H1 de `/sobre`.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização dos testes unitários de `AboutPage` validando o Executive Briefing e assertando a ausência de dados burocráticos.
- **`PROJECT.md`**: Atualização do estado canônico da rota `/sobre`.


### Adicionado
- **`specs/SPEC-087-remocao-ctas-finais-rotas.md`**: Especificação técnica para remoção global de seções finais de CTA redundantes em todas as rotas do projeto.
- **`tasks/TASK-087-remocao-ctas-finais-rotas.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-087.md`**: Relatório de QA com validação dos quality gates e confirmação de estabilidade estrutural.

### Removido
- **`src/pages/ServicesPage.tsx`**: Bloco final de fechamento comercial contendo *"Quer avaliar qual solução se encaixa no seu momento?"*, botão *"Iniciar diagnóstico do projeto"* e link *"Entenda como trabalhamos →"*. A página agora encerra diretamente na Faixa de Garantias de Engenharia.
- **`src/pages/HowWeWorkPage.tsx`**: Bloco final contendo *"Ficou com alguma dúvida sobre o processo?"*, botão *"Fale com um engenheiro"* e link *"Ver dúvidas frequentes"*. A página encerra diretamente no Manifesto Técnico de Engenharia.
- **`src/pages/ExperiencePage.tsx`**: Bloco final contendo *"Sua empresa tem uma demanda de alta complexidade?"* e botão *"Falar sobre meu projeto"*. A página encerra diretamente no Enterprise Ledger de Organizações.
- **`src/pages/EngineeringPage.tsx`**: Bloco final contendo *"Precisa de engenharia sólida no seu produto ou sistema interno?"* e botão *"Falar sobre meu projeto"*. A página encerra diretamente na Matriz de Camadas de Software / Nuvem Tipográfica.
- **`src/pages/AboutPage.tsx`**: Bloco final contendo *"Pronto para construir sua próxima solução com quem entende de código?"* e botão *"Fale conosco"*. A página encerra diretamente na tabela de Missão & Princípios de Engenharia.

### Modificado
- Limpeza de imports órfãos em todos os arquivos (`Button`, `ArrowRight`, `HelpCircle`), reduzindo o bundle size de cada rota em até 10%.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização dos testes unitários para assertar a ausência dessas caixas em todas as rotas e validar elementos estruturais genuínos.
- **`PROJECT.md`**: Atualização do estado canônico das rotas de Serviços, Como Trabalhamos, Engenharia, Experiência e Sobre nós.

## [0.0.86-servicos-hero-cta] - 2026-10-02

### Adicionado
- **`specs/SPEC-086-servicos-hero-cta.md`**: Especificação técnica para inclusão de botão de chamada para ação (CTA) centralizado de alta conversão no Hero da rota `/servicos`.
- **`tasks/TASK-086-servicos-hero-cta.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-086.md`**: Relatório de QA com validação dos quality gates e evidências de capturas de tela nos temas Dark, Light e Mobile.

### Modificado
- **`src/components/ui/PageHeader.tsx`**:
  - Inclusão das propriedades opcionais `children?: React.ReactNode` e `containerClassName?: string` em `PageHeaderProps`.
  - Renderização de `children` preservando alinhamento semântico centralizado e retrocompatibilidade com todas as demais páginas.
- **`src/pages/ServicesPage.tsx`**:
  - Inserção do botão CTA centralizado *"Solicite uma conversa"* logo abaixo da descrição (`mt-8`), estilizado no verde esmeralda vibrante da marca (`bg-emerald-400 hover:bg-emerald-300`), tipografia escura de alto contraste (`text-zinc-950 font-semibold`), cantos arredondados (`rounded-xl`), glow luminoso difuso e ícone `ArrowRight` com microinteração de hover.
  - Conexão de navegação via `<Link to="/contato">` para direcionamento canônico ao fluxo de atendimento e agendamento.
  - Otimização para dispositivos móveis com `w-full max-w-xs sm:w-auto` e touch target mínimo de 44px (`min-h-[44px]`).
- **`src/pages/__tests__/pages.test.tsx`**:
  - Atualização dos testes unitários para validar a renderização de `children` em `PageHeader` e a presença/direcionamento do botão de ação em `/servicos`.
- **`PROJECT.md`**:
  - Atualização do estado canônico de `Services` registrando a inclusão do CTA centralizado no Hero da rota `/servicos`.

## [0.0.85-metricas-home-experiencia] - 2026-10-02

### Adicionado
- **`specs/SPEC-085-metricas-home-experiencia.md`**: Especificação técnica para reorganização de métricas entre a Home (`/`) e a rota `/experiencia`, migrando os contadores numéricos animados e iniciando `/experiencia` diretamente nas verticais de negócio.
- **`tasks/TASK-085-metricas-home-experiencia.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-085.md`**: Relatório de QA com evidências de conformidade aos quality gates e capturas visuais.

### Modificado
- **`src/components/sections/HomeResultsStrip.tsx`**:
  - Incorporação do componente de contadores numéricos animados `CountUp` acionados dinamicamente via `useInView(ref, { once: true, margin: "-50px" })`.
  - Suporte rigoroso a `useReducedMotion` para acessibilidade.
  - Implementação das 4 métricas técnicas consolidadas:
    * `99,9%` | *"Disponibilidade assegurada"* | *"Em plataformas críticas de energia e educação."*
    * `2.500 RPS` | *"Arquitetura dimensionada"* | *"Para picos de 10.000 usuários simultâneos sem gargalos."*
    * `100%` | *"Integridade de dados"* | *"Na consolidação regulatória do setor elétrico, sem perdas."*
    * `−35%` (com sinal de menos tipográfico `\u2212`) | *"Atividades manuais reduzidas"* | *"Automações e integrações em plataformas modernizadas."*
  - Preservação da nota de rodapé contextual e lista semântica (`role="list"` com rótulos `aria-label`/`sr-only`).
- **`src/pages/Home.tsx`**:
  - Atualização do texto do link de navegação na seção de resultados para: *"Ver projetos detalhados →"* direcionando para `/experiencia`.
- **`src/pages/ExperiencePage.tsx`**:
  - Remoção completa do bloco superior redundante de contadores numéricos (`<Authority />` / `#resultados`).
  - Início imediato no cabeçalho editorial `PageHeader` ("Experiência em projetos reais") conectando-se diretamente à Matriz de Verticais de Negócio (`#contextos`) e ao Ledger de Organizações (`#organizacoes`).
  - Ajuste no ritmo do Sistema de Camadas Tonais (SPEC-082): `anchor` (Header) → `base` (`#contextos`) → `alt` (`#organizacoes`) → `base` (`#cta`) → `anchor` (Footer).
  - Redução de bundle de 13.02 kB para 9.47 kB (-27%).
- **`src/components/routing/ScrollManager.tsx`**:
  - Remoção do mapeamento de hash obsoleto `"#autoridade": "/experiencia#resultados"`, permitindo que navegações para `/#autoridade` permaneçam na seção de resultados da Home.
- **`src/components/sections/__tests__/HomeResultsStrip.test.tsx`**:
  - Atualização dos testes unitários com mock de `useInView` e validação das 4 métricas técnicas com formatação exata.
- **`PROJECT.md`**:
  - Atualização do estado canônico de `Autoridade / Resultados`, `Experiência / Verticais` e contagem de testes unitários (194 testes).

## [0.0.84-hero-simplificacao-copy-cta] - 2026-10-02

### Adicionado
- **`specs/SPEC-084-hero-simplificacao-copy-cta.md`**: Especificação técnica para simplificação do Hero da Home (`/`), focando no CTA primário de conversão direta e removendo elementos auxiliares.
- **`tasks/TASK-084-hero-simplificacao-copy-cta.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-084.md`**: Relatório de QA com evidências de conformidade aos quality gates e capturas de tela.

### Modificado
- **`src/components/sections/Hero.tsx`**:
  - Remoção do botão de CTA secundário *"Ver soluções"* (`#servicos`), eliminando bifurcação e redundância com o Seletor de Cenários.
  - Remoção da faixa de confiança operacional *"Aplicações corporativas críticas · Energia, educação, indústria e varejo · Retorno em até 24h úteis"* (`hero-operational-trust`) e respectiva borda divisória.
  - CTA primário consolidado e destacado: botão *"Vamos conversar"* direcionando para `/contato`.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização dos testes unitários para validar a presença exclusiva do botão *"Vamos conversar"* e a ausência do botão secundário e da faixa de confiança.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização do teste de ancoragem a partir do Hero para navegar via cenário de negócio e assertar ausência de elementos removidos.
- **`PROJECT.md`**: Atualização do estado canônico da seção Hero.

## [0.0.83-hero-seletor-cenarios-negocio] - 2026-10-02

### Adicionado
- **`specs/SPEC-083-hero-seletor-cenarios-negocio.md`**: Especificação técnica para refatoração da seção Hero da Home (`/`), substituindo o card de topologia fictícia por um Seletor Interativo de Cenários de Negócio orientado a tomadores de decisão e copy de alto valor.
- **`tasks/TASK-083-hero-seletor-cenarios-negocio.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-083.md`**: Relatório de QA com evidências de conformidade aos quality gates, validações de acessibilidade e capturas de tela nos modos Dark e Light.

### Modificado
- **`src/components/sections/Hero.tsx`**:
  - H1 com acento cromático intencional no brand teal (`#2DD4BF` / `text-text-brand`) na expressão *"construir, integrar e evoluir"*.
  - Nova subheadline orientada a decisores de negócio: *"Sistemas sob medida para empresas que precisam criar plataformas, conectar operações ou modernizar o software do seu negócio."*
  - Faixa de confiança operacional factual com divisores sutis: *"Aplicações corporativas críticas · Energia, educação, indústria e varejo · Retorno em até 24h úteis"*.
  - Painel interativo de decisão *"O que sua empresa precisa agora?"* com status de direcionamento técnico imediato e 4 cenários navegáveis ancorados:
    1. *"Criar um novo sistema, portal ou plataforma web"* → `/servicos#sistemas`
    2. *"Conectar sistemas antigos e automatizar fluxos de dados"* → `/servicos#integracoes`
    3. *"Modernizar e refatorar um software legado sem parar a operação"* → `/servicos#legados`
    4. *"Avaliar arquitetura e ter uma segunda opinião técnica sênior"* → `/contato`
  - Linha condutora vertical SVG conectando os nós com animação pontual (`pathLength: 0 -> 1`), microinterações com glow esmeralda/teal no hover/focus e suporte estrito a `prefers-reduced-motion`.
  - Compatibilidade com o Design System de Camadas Tonais (SPEC-082) em Dark e Light Mode.
- **`src/components/sections/Services.tsx`**: Inclusão dos IDs de ancoragem semânticos (`id="sistemas"`, `id="apis"`, `id="integracoes"`, `id="legados"`) nos artigos de serviço para navegação direta vinda do seletor da Home.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização completa da suíte de testes unitários validando novos títulos, CTAs, faixa de confiança operacional e navegação dos 4 cenários de negócio.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização do teste de títulos para permitir acento cromático intencional da marca no H1 do Hero, e inclusão de validação E2E completa do seletor de cenários de negócio.
- **`PROJECT.md`**: Atualização do estado canônico da seção Hero.

## [0.0.82-sistema-camadas-tonais] - 2026-10-02

### Adicionado
- **`specs/SPEC-082-tonal-layering-design-system.md`**: Especificação técnica para substituição das linhas divisórias horizontais inter-seções por separação por camadas tonais (*tonal layering*) em todas as rotas e nos temas Dark e Light.
- **`tasks/TASK-082-tonal-layering-design-system.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-082.md`**: Relatório de QA com evidências de conformidade aos quality gates e capturas visuais.
- **`src/components/ui/SectionWrapper.tsx`**: Componente reutilizável de seção com prop explícita `tone="anchor" | "base" | "alt"`, padding vertical responsivo consistente (`py-16` a `py-28`) e container centralizado flexível.
- **`src/components/ui/__tests__/SectionWrapper.test.tsx`**: Suíte de testes unitários para o `SectionWrapper`.

### Modificado
- **`src/index.css`**: Adição dos tokens semânticos HSL `--surface-anchor`, `--surface-base` e `--surface-alt` para os temas dark e light ($\Delta L = 3.5\%$), restauração de bordas em `forced-colors: active` e transição de background respeitando `prefers-reduced-motion`.
- **`tailwind.config.ts`**: Mapeamento das classes semânticas utilitárias `surface-anchor`, `surface-base` e `surface-alt`.
- **`src/components/layout/Header.tsx`**: Consumo de `surface-anchor` e aplicação de backdrop blur + borda inferior sutil exclusivamente sob scroll.
- **`src/components/sections/Footer.tsx`**: Consumo de `surface-anchor` e remoção da linha horizontal divisória superior.
- **`src/components/ui/PageHeader.tsx`**: Consumo de `surface-anchor` e eliminação da borda inferior `border-b border-border/40`.
- **`src/pages/Home.tsx`**: Refatoração das seções adotando o ritmo tonal estrito `anchor -> base -> alt -> base -> alt -> base -> alt -> base -> alt -> base -> anchor` e remoção de divisores horizontais.
- **`src/pages/ServicesPage.tsx`**: Ritmo tonal `anchor -> base -> alt -> base -> anchor` com `SectionWrapper`.
- **`src/pages/HowWeWorkPage.tsx`**: Ritmo tonal `anchor -> base -> alt -> base -> anchor` com `SectionWrapper`.
- **`src/pages/ExperiencePage.tsx`**: Ritmo tonal `anchor -> base -> alt -> base -> alt -> anchor` com `SectionWrapper`.
- **`src/pages/EngineeringPage.tsx`**: Ritmo tonal `anchor -> base -> alt -> base -> anchor` com `SectionWrapper`.
- **`src/pages/AboutPage.tsx`**: Ritmo tonal `anchor -> base -> alt -> base -> alt -> anchor` com `SectionWrapper`.
- **`src/pages/ContactPage.tsx`**: Ritmo tonal `anchor -> base -> alt -> anchor` com `SectionWrapper`.
- **`src/pages/FAQPage.tsx`**: Ritmo tonal `anchor -> base -> alt -> anchor` com `SectionWrapper`.
- **`src/pages/NotFound.tsx`**: Ritmo tonal `anchor -> base -> anchor` com `SectionWrapper`.
- **`src/components/layout/__tests__/Header.test.tsx`**: Atualização do teste de scroll para verificar classes de camadas tonais.
- **`e2e/design-system-and-stability.spec.ts`**: Adição de testes E2E validando a ausência de linhas divisórias entre seções, ritmo tonal contínuo e alternância em Dark/Light mode em todas as 8 rotas principais.
- **`PROJECT.md`**: Atualização do status de Design para Camadas Tonais.

## [0.0.81-sobre-nos-timeline-e-manifesto] - 2026-10-02

### Adicionado
- **`specs/SPEC-081-sobre-nos-timeline-e-manifesto.md`**: Especificação técnica para refatoração da rota `/sobre` com layout de Timeline Histórica Alternada e Manifesto Técnico de Engenharia, e atualização da Navbar para "Sobre nós".
- **`tasks/TASK-081-sobre-nos-timeline-e-manifesto.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-081.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/components/layout/Header.tsx`**: Atualização do rótulo no menu de links de `"Sobre"` para `"Sobre nós"`, preservando a rota `/sobre`.
- **`src/pages/AboutPage.tsx`**:
  - H1 de alto impacto: *"Engenharia de software com foco em longevidade e impacto real"*, com subtítulo editorial de contextualização do fundador Elessandro Prestes Macedo (+9 anos de experiência) e painel de transparência operacional.
  - Seção "Nossa Jornada" com Timeline Histórica Alternada (desktop: linha horizontal com nós centrais e balões alternados acima/abaixo; mobile: timeline vertical contínua à esquerda com nós luminosos e cards empilhados).
  - Seção "Missão e Princípios de Engenharia" em formato de Manifesto Técnico / Tabela de Diretrizes com divisores sutis (`divide-y`), eliminando os 3 cards fechados genéricos.
  - Fechamento comercial com card técnico *"Pronto para construir sua próxima solução com quem entende de código?"* e botão CTA `"Fale conosco"` apontando para `/contato`.
- **`src/components/layout/__tests__/Header.test.tsx`**: Atualização dos testes unitários assertando `"Sobre nós"`.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização dos testes unitários validando novo H1, fundação, timeline e manifesto na `AboutPage`.
- **`e2e/multi-route-navigation.spec.ts`**: Atualização dos testes E2E do Playwright para validar o H1 e link `"Sobre nós"`.
- **`scripts/prerender.js`**: Atualização do H1 canônico da rota `sobre` para pré-render estático SSR.
- **`PROJECT.md`**: Atualização do estado canônico da rota `/sobre` e Navbar.

## [0.0.80-engenharia-ajuste-aws-tooltips] - 2026-10-02

### Adicionado
- **`specs/SPEC-080-engenharia-ajuste-aws-e-tooltips-inferiores.md`**: Especificação técnica para remoção da badge de certificado da AWS, correção de abertura de tooltips na linha inferior da nuvem tipográfica e formalização da regra de commits em português no SDD.
- **`tasks/TASK-080-engenharia-ajuste-aws-e-tooltips-inferiores.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-080.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`AGENTS.md` & `GEMINI.md`**: Inclusão de regra mandatória no protocolo SDD determinando que todas as mensagens de commit do Git sejam redigidas em Português do Brasil (pt-BR).
- **`src/config/architecture.ts`**: Remoção da badge `[Certificado]` e variantes visuais associadas da AWS, mantendo estritamente a autoridade técnica com tipografia e ícone oficial.
- **`src/components/ui/tooltip.tsx`**: Inclusão de `<TooltipPrimitive.Portal>` em `TooltipContent`, projetando balões de informação diretamente no `document.body` e eliminando colapso de dimensões (0.95px x 0.95px) gerado por transformações CSS do elemento pai.
- **`src/components/sections/ArchitecturalBlueprint.tsx`**: Configuração de `disableHoverableContent={true}` no `TooltipProvider`, eliminando a área de retenção de hover do Radix UI que bloqueava a ativação de tooltips contíguos na navegação horizontal do mouse.
- **`src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx`**: Atualização dos testes unitários para validar a presença da badge de `Node.js [Core Runtime]` e ausência estrita de badge em AWS.
- **`e2e/design-system-and-stability.spec.ts`**: Expansão do teste E2E para testar a abertura individual de tooltips em todas as 9 tecnologias (linha superior e inferior).
- **`PROJECT.md`**: Atualização do status de tecnologias da rota `/engenharia`.

## [0.0.79-engenharia-apresentacao-tipografica-tecnologias] - 2026-10-02

### Adicionado
- **`specs/SPEC-079-engenharia-nuvem-tipografica-tecnologias.md`**: Especificação técnica aprovada para eliminação de caixas/camadas fechadas e implementação de apresentação tipográfica editorial das 9 tecnologias centrais na rota `/engenharia`.
- **`tasks/TASK-079-engenharia-apresentacao-tipografica-tecnologias.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-079.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/config/architecture.ts`**:
  - Curadoria estrita mantendo exclusivamente as 9 tecnologias centrais do projeto: React, TypeScript, Vue.js, Angular, Node.js, PHP, Laravel, AWS e Azure.
  - Remoção de 15 ferramentas operacionais, bancos de dados e mensagerias: Grafana, Prometheus, GitHub Actions, Terraform, Kubernetes, Docker, MongoDB, Oracle, MySQL, PostgreSQL, Redis, Kafka, RabbitMQ, Symfony e Tailwind CSS.
  - Metadados tipados de escala de fonte (`sizeClass`), acentuação de cor (`accentClass`) e badges de autoridade (`AWS [Certificado]`, `Node.js [Core Runtime]`).
- **`src/components/sections/ArchitecturalBlueprint.tsx`**:
  - Eliminação de caixas horizontais `LAYER 01..04` em favor de uma nuvem tipográfica editorial contínua (`tech-editorial-cloud`), inspirada diretamente na referência visual.
  - Tipografia de alto impacto (`text-2xl` a `text-5xl font-extrabold tracking-tight`), badges douradas/âmbar e brand teal inline e micro-interação de hover e tooltips contextuais.
- **`src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx`**: Atualização da suíte de testes unitários validando a presença das 9 tecnologias, badges de autoridade e ausência estrita das 15 ferramentas descontinuadas.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização das asserções de cabeçalho da rota `/engenharia`.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização dos testes E2E do Playwright para validar a nuvem tipográfica editorial e tooltips contextuais.
- **`PROJECT.md`**: Atualização da rota `/engenharia` e status de tecnologias.


### Adicionado
- **`specs/SPEC-078-engenharia-tecnologias-curadoria-visual.md`**: Especificação técnica para curadoria de tecnologias e refinamento tipográfico na rota `/engenharia`.
- **`tasks/TASK-078-engenharia-tecnologias-curadoria-visual.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-078.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/config/architecture.ts`**:
  - Inclusão das especialidades: Next.js, JavaScript, Python, Go, PHP, Ruby on Rails, React Native, Android, Swift e Programação com IA.
  - Remoção de bancos de dados isolados, observabilidade, Tailwind CSS, frameworks secundários (Laravel, Symfony), mensagerias (RabbitMQ, Kafka, Redis) e orquestradores de infraestrutura.
  - Reorganização das 4 camadas: Camada 01 (Web & Interfaces Reativas), Camada 02 (Back-end & APIs), Camada 03 (Mobile & Engenharia de IA) e Camada 04 restrita estritamente a **AWS e Azure**.
  - Metadados de badges (`Certificado`, `Core Runtime`, `Inovação`) e marcações de destaque.
- **`src/components/sections/ArchitecturalBlueprint.tsx`**:
  - Refinamento tipográfico editorial com nomes destacados (`font-bold text-sm sm:text-base tracking-tight`), ícones oficiais de alta resolução e badges de autoridade.
  - Destaque especial e ícone `Sparkles` para `Programação com IA`.
  - Badge dourada/âmbar `[CERTIFICADO]` associada à AWS, replicando a autoridade da referência visual.
- **`src/pages/EngineeringPage.tsx`**: Atualização do terminal de simulação CI/CD Quality Gate para 30 suites e 189 testes aprovados.
- **`src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx`**: Atualização completa da suíte de testes unitários validando presença das novas especialidades, badges e ausência dos itens descontinuados.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização das asserções de tags de camada para a rota `/engenharia`.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização dos testes E2E do Playwright validando os novos identificadores de camada e tooltips.
- **`PROJECT.md`**: Atualização de métricas e status canônico de tecnologias da rota `/engenharia`.


### Adicionado
- **`specs/SPEC-077-engenharia-architectural-blueprint.md`**: Especificação técnica para redesenho da rota `/engenharia` aplicando os padrões Architectural Blueprint (Matriz de Camadas de Software) e Layout Dividido (Princípios de Engenharia vs. Terminal CI/CD Quality Gate).
- **`tasks/TASK-077-engenharia-architectural-blueprint.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-077.md`**: Relatório de QA com evidências de conformidade aos quality gates.
- **`src/config/architecture.ts`**: Mapeamento canônico das 4 camadas de arquitetura de software (Apresentação & Edge, Aplicação & APIs, Mensageria & Eventos, Nuvem/Dados & Observabilidade) e 25 tecnologias com descrição de propósito arquitetural e ícones oficiais.
- **`src/components/sections/ArchitecturalBlueprint.tsx`**: Componente de rack/slot de arquitetura em 4 camadas horizontais com indicadores de status de camada (`[LAYER 0X // ...]`), badges estilizadas com logos oficiais e micro-interação contextual de tooltip ao passar o mouse.
- **`src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx`**: Suíte de testes unitários com 5 testes cobrindo renderização das camadas, badges, interações de tooltip e atributos de acessibilidade.

### Modificado
- **`src/pages/EngineeringPage.tsx`**:
  - Reestruturação da seção de princípios de engenharia em Layout Dividido de 2 colunas: Coluna 1 com princípios numerados editorialmente (`01`, `02`, `03`) e traço esmeralda de destaque; Coluna 2 com simulação de terminal de Quality Gate contínuo (`ci-cd-quality-gate.yml`) com checks automatizados e badges esmeralda.
  - Substituição da constelação dispersa de ícones pelo componente `<ArchitecturalBlueprint />` sob `#tecnologias`.
  - Refinamento do fechamento comercial e CTA para diagnóstico técnico.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização dos testes unitários de `EngineeringPage` refletindo o novo Layout Dividido e o Architectural Blueprint.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização dos testes E2E 104 e 139 para inspecionar os elementos do Architectural Blueprint e tooltips na rota `/engenharia`.
- **`PROJECT.md`**: Atualização da estrutura de diretórios, descrição da rota `/engenharia`, status de tecnologias e contagem de testes unitários para 188.


### Adicionado
- **`specs/SPEC-076-experiencia-remocao-linhas-duplas.md`**: Especificação técnica para eliminação de linhas horizontais duplas na rota `/experiencia`.
- **`tasks/TASK-076-experiencia-remocao-linhas-duplas.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-076.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/components/sections/Authority.tsx`**: Suporte à prop opcional `className?: string`, mesclada às classes base com `cn()` e `twMerge`.
- **`src/pages/ExperiencePage.tsx`**: Configuração de `<Authority className="border-y-0 bg-transparent py-6 sm:py-10" />`, unificando a hierarquia de divisores e removendo a segunda linha horizontal que aparecia sob o `PageHeader`.
- **`src/components/sections/__tests__/Authority.test.tsx`**: Novo teste unitário validando a sobrescrita limpa de classes via prop `className`.
- **`PROJECT.md`**: Atualização do total de testes unitários para 183.

## [0.0.75-experiencia-enterprise-ledger] - 2026-10-02

### Adicionado
- **`specs/SPEC-075-experiencia-enterprise-ledger.md`**: Especificação técnica para redesenho da rota `/experiencia` aplicando os padrões Engineering Matrix para verticais e Enterprise Ledger para projetos corporativos.
- **`tasks/TASK-075-experiencia-enterprise-ledger.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-075.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/pages/ExperiencePage.tsx`**:
  - Preservação estrita dos 4 contadores animados com `CountUp` na faixa de métricas (`<Authority />`).
  - Substituição dos cards 3D isolados e mockups artificiais pela **Engineering Matrix** (Grid 2x2 com bordas internas limpas, badges de especialidade `IoT INDUSTRIAL`, `ALTA CONCORRÊNCIA`, `ESCALA NACIONAL`, `DADOS REGULATÓRIOS` e capacidades técnicas inline de `Stack & Soluções`).
  - Reformatação da Nota de Contexto em linha editorial monospace discreta com ponto luminoso indicador em verde-água (`w-1.5 h-1.5 rounded-full bg-brand`), declarando expressamente *"Não são clientes da EPM DevTech"*.
  - Substituição dos 3 cards fechados de organizações pelo **Enterprise Ledger** horizontal contínuo (`divide-y divide-border-default/80 border-y`) com colunas alinhadas, badges de setor e transição de hover refinada (`hover:bg-surface-elevated/40`).
  - Refinamento do fechamento comercial e CTA para demandas de alta complexidade.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização da suíte de testes unitários validando a presença da Engineering Matrix e do Enterprise Ledger.

## [0.0.74-como-trabalhamos-process-explorer] - 2026-10-01

### Adicionado
- **`specs/SPEC-074-como-trabalhamos-process-explorer.md`**: Especificação técnica para refatoração da rota `/como-trabalhamos` com Process Explorer interativo em 2 colunas, entregáveis concretos, critérios de saída, Manifesto Técnico de Engenharia e CTA de contato compacto.
- **`tasks/TASK-074-como-trabalhamos-process-explorer.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-074.md`**: Relatório de QA com evidências de conformidade aos quality gates.
- **`src/components/sections/ProcessExplorer.tsx`**: Componente Process Explorer com tabs verticais no desktop (`md:`), painel de detalhamento técnico com tags de entregáveis concretos e critério formal de saída por etapa, e Accordion vertical fluido no mobile.
- **`src/components/sections/__tests__/ProcessExplorer.test.tsx`**: Suíte de testes unitários para o Process Explorer cobrindo seleção de etapas, renderização de entregáveis e acordeão mobile.

### Modificado
- **`src/pages/HowWeWorkPage.tsx`**:
  - Integração do componente `<ProcessExplorer />` em substituição ao componente estático replicado da Home.
  - Substituição dos 2 cards soltos de garantias pelo **Manifesto Técnico de Engenharia** estruturado em 2 colunas abertas com `md:divide-x` e badges `// GARANTIA OPERACIONAL` e `// GESTÃO DIRETA`.
  - Reestruturação do fechamento comercial com barra compacta de FAQ e CTA ("Fale com um engenheiro" para `/contato` e "Ver dúvidas frequentes" para `/duvidas-frequentes`).
- **`src/pages/__tests__/pages.test.tsx`**: Atualização do teste de `HowWeWorkPage` validando semântica do novo Manifesto Técnico e botões de conversão.

## [0.0.73-servicos-redesign-editorial-zpattern] - 2026-10-01

### Adicionado
- **`specs/SPEC-073-servicos-redesign-editorial-zpattern.md`**: Especificação técnica para redesign editorial da página e seção de serviços com layout em Z-Pattern alternado, callouts de negócio integrados, faixa limpa de garantias de engenharia e CTA comercial refinado.
- **`tasks/TASK-073-servicos-redesign-editorial-zpattern.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-073.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/components/sections/Services.tsx`**:
  - Eliminação da grade 2x2 com cards idênticos.
  - Implementação de layout em Z-Pattern alternado de 12 colunas:
    - Serviços ímpares (0 e 2): texto na esquerda (`lg:col-span-6`), mock visual na direita (`lg:col-span-6`).
    - Serviços pares (1 e 3): mock visual na esquerda (`lg:col-span-6 lg:order-1`), texto na direita (`lg:col-span-6 lg:order-2`).
    - Mobile: fluxo natural com texto no topo e mock visual logo abaixo.
  - Callout de contexto de negócio com borda lateral esmeralda (`border-l-2 border-brand/60 pl-4 py-2 bg-brand/5 rounded-r-md`) com identificador `QUANDO PRECISA:`.
  - Tags técnicas identificadoras (`01 // WEB & PORTAIS`, `02 // APIS & BACK-END`, `03 // INTEGRAÇÃO DE DADOS`, `04 // MODERNIZAÇÃO`).
  - Containers escuros refinados para os 4 mocks técnicos (`bg-surface/80 dark:bg-zinc-950/80 border border-border-default/80 rounded-xl p-5 shadow-2xl backdrop-blur-sm`).
- **`src/pages/ServicesPage.tsx`**:
  - Eliminação dos 3 cards fechados e checks genéricos.
  - Faixa de Garantias de Engenharia em 3 colunas abertas com tags monospace `[ 01 // ESCOPO ]`, `[ 02 // SUSTENTABILIDADE ]` e `[ 03 // COMUNICAÇÃO ]` em brand teal.
  - Fechamento comercial integrado com botões `"Iniciar diagnóstico do projeto"` (`/contato`) e `"Entenda como trabalhamos →"` (`/como-trabalhamos`).
- **`src/components/sections/__tests__/Services.test.tsx`**: Atualização da suíte de testes unitários com suporte a `motion.article` e validação das tags do Z-Pattern.

## [0.0.72-alinhamento-geometrico-pipeline] - 2026-10-01

### Adicionado
- **`specs/SPEC-072-alinhamento-geometrico-pipeline.md`**: Especificação técnica para alinhamento geométrico rigoroso da linha do pipeline da Home e calibração do feixe Framer Motion.
- **`tasks/TASK-072-alinhamento-geometrico-pipeline.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-072.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/components/sections/HomeProcessPipeline.tsx`**:
  - Ancoragem do trilho horizontal desktop corrigida de `left-[12.5%]` para `left-[18px]` (centro geométrico do nó 01) e finalização em `md:right-[calc(25%-36px)] lg:right-[calc(25%-42px)]` (centro geométrico do nó 04), eliminando o offset que iniciava a linha no vão entre os nós 01 e 02.
  - Alinhamento vertical centralizado com `top-[17px] h-[2px]` no eixo Y dos nós de 36px.
  - Posicionamento da linha e feixe em `z-0 pointer-events-none`.
  - Nós circulares atualizados com `relative z-10 bg-surface dark:bg-zinc-950` garantindo oclusão sólida da linha por trás de cada círculo sem vazamento sobre a tipografia.
  - Feixe Framer Motion calibrado em largura total (`w-full h-full`) com `initial={{ x: "-100%" }}`, `animate={{ x: "100%" }}` e `repeat: Infinity, duration: 3, ease: "easeInOut"` (e no mobile `y: ["-100%", "100%"]`).
- **`src/components/sections/__tests__/HomeProcessPipeline.test.tsx`**: Inclusão de teste unitário validando classes de ancoragem geométrica, `z-0` no trilho e `z-10` com fundo sólido nos nós.

## [0.0.71-limpeza-cta-home-padronizacao-botoes] - 2026-10-01

### Adicionado
- **`specs/SPEC-071-limpeza-cta-home-padronizacao-botoes.md`**: Especificação técnica para eliminação da seção intermediária redundante de contato na Home e padronização dos botões de ação e conversão.
- **`tasks/TASK-071-limpeza-cta-home-padronizacao-botoes.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-071.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/pages/Home.tsx`**: Remoção do bloco intermediário redundante `<section id="contato">` ("Vamos entender o cenário da sua empresa?"), permitindo uma transição fluida e natural da seção de Resultados para o rodapé; limpeza de imports orfãos (`Clock`, `Button`).
- **`src/components/layout/Header.tsx`**: Padronização do botão de ação no Header desktop e gaveta móvel para `"Fale conosco"` com `aria-label="Fale conosco"`.
- **`src/components/sections/Hero.tsx`**: Padronização do CTA primário do Hero para `"Vamos conversar"` com `aria-label="Vamos conversar sobre seu projeto"` direcionando para `/contato`, preservando o secundário `"Ver soluções"` direcionando para `#servicos`.
- **`src/components/layout/__tests__/Header.test.tsx`**: Atualização da asserção do botão CTA para `"Fale conosco"`.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização da asserção do botão CTA primário para `"Vamos conversar"`.
- **`src/pages/__tests__/pages.test.tsx`**: Atualização para verificar ausência do bloco intermediário removido.
- **`e2e/multi-route-navigation.spec.ts`**: Atualização do teste E2E do Header para validar `"Fale conosco"`.
- **`e2e/design-system-and-stability.spec.ts`**: Remoção de seção `#contato` da lista de headings da Home e atualização do CTA principal do Hero para `"Vamos conversar"`.

## [0.0.70-pipeline-animacao-fluxo-continuo] - 2026-10-01

### Adicionado
- **`specs/SPEC-070-pipeline-animacao-fluxo-continuo.md`**: Especificação técnica da animação contínua da esteira de engenharia no pipeline de metodologia com Framer Motion.
- **`tasks/TASK-070-pipeline-animacao-fluxo-continuo.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-070.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/components/sections/HomeProcessPipeline.tsx`**:
  - Implementação de arquitetura de duas camadas na linha condutora: trilho base estático (`bg-border-subtle/80`) e feixe animado em loop contínuo de 3s (`motion.div` com gradiente `from-transparent via-brand to-transparent`).
  - Suporte a layout responsivo: feixe horizontal da esquerda para a direita no desktop (`x: ["-100%", "300%"]`) e feixe vertical de cima para baixo no mobile (`y: ["-100%", "300%"]`).
  - Suporte a acessibilidade com `useReducedMotion()`, pausando a animação e exibindo feixe estático sutil.
  - Micro-interações de hover táteis nos nós circulares com halo de brilho verde-água (`shadow-[0_0_16px_rgba(45,212,191,0.3)]`) e realce de contraste no texto da descrição (`group-hover:text-foreground/90`).
- **`src/components/sections/__tests__/HomeProcessPipeline.test.tsx`**: Suíte de testes unitários com 100% de cobertura validando nós, textos e conformidade de renderização.

## [0.0.69-hero-fullscreen-minimalista] - 2026-10-01

### Adicionado
- **`specs/SPEC-069-hero-fullscreen-minimalista.md`**: Especificação técnica para Hero minimalista fullscreen (100vh), remoção de badges e foco estrito na conversão.
- **`tasks/TASK-069-hero-fullscreen-minimalista.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-069.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/components/sections/Hero.tsx`**:
  - Enquadramento fullscreen adaptativo com `min-h-screen min-h-[100svh] flex flex-col justify-center`, garantindo que o Hero ocupe 100% da viewport e que a seção de serviços não apareça na primeira dobra antes da rolagem.
  - Remoção de badge/pílula ao redor do eyebrow `ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO`, exibindo tipografia técnica pura com `BrandChipIcon`.
  - Remoção de badge/pílula ao redor de `HEALTHY / 99.9% uptime` no cabeçalho da janela dev de arquitetura.
  - Remoção completa da subheadline descritiva e da frase de micro social proof inferior, concentrando o fluxo visual em **Eyebrow ➔ H1 ➔ CTAs**.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização dos testes unitários para validar enquadramento fullscreen, ausência de subheadline e ausência de badges.
- **`e2e/hero-identity-token-locks.spec.ts`**: Atualização dos testes E2E validando ausência de badges, altura total da viewport e conformidade de tokens.

## [0.0.68-hero-redesign-editorial-arquitetura] - 2026-10-01

### Adicionado
- **`specs/SPEC-068-hero-redesign-editorial-arquitetura.md`**: Especificação do redesign completo do Hero institucional, com eliminação de divisores artificiais e introdução de janela dev interativa de arquitetura ativa.
- **`tasks/TASK-068-hero-redesign-editorial-arquitetura.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-068.md`**: Relatório de QA com evidências de conformidade aos quality gates.

### Modificado
- **`src/components/sections/Hero.tsx`**:
  - Remoção definitiva da linha divisória horizontal inferior e do ponto verde estático.
  - Altura e respiro de tela aprimorados (`min-h-[85vh]`, `py-20 md:py-28`) com transição orgânica suave (`bg-gradient-to-b from-transparent to-surface/40`).
  - Eyebrow em formato de badge cápsula refinada com `BrandChipIcon` e `ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO`.
  - H1 com kerning e impacto editorial (`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary`).
  - CTAs com feedback tátil e glow sutil ao hover (`hover:shadow-glow-brand hover:scale-[1.02]`).
  - Micro social proof com indicador em tempo real pulsante (`animate-ping`) declarando estabilidade operacional em múltiplos setores.
  - Janela Dev "Sistema & Arquitetura Ativa" (`architecture.overview.ts`), indicador `HEALTHY / 99.9% uptime`, spotlight ambiente em background e 4 camadas de arquitetura conectadas com tags coloridas temáticas (`accent-blue`, `accent-violet`, `accent-amber`, `brand`).
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização das asserções da suíte unitária para os novos elementos e remoção do divisor.
- **`e2e/hero-identity-token-locks.spec.ts`**: Atualização dos testes E2E harmonizando a ausência de divisória com a presença do indicador operacional ativo e contraste semântico.

## [0.0.67-stat-strip-resultados-home] - 2026-10-01

### Adicionado
- **`specs/SPEC-067-stat-strip-resultados-home.md`**: Especificação da refatoração da seção de Resultados da Home, transformando cards fechados em uma Stat Strip tipográfica editorial de alto impacto.
- **`tasks/TASK-067-stat-strip-resultados-home.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-067.md`**: Relatório de QA com evidências de conformidade aos quality gates.
- **`src/components/sections/HomeResultsStrip.tsx`**: Componente de Stat Strip tipográfica com:
  - 4 métricas técnicas em escala editorial (`99,9%`, `2.500+`, `+448`, `Zero`) com tipografia monospace de grande impacto (`font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary`).
  - Rótulos semânticos em brand teal (`text-text-brand`) e descrições objetivas em `text-secondary`.
  - Estrutura contínua com divisores horizontais (`border-y border-border-default/60`) e separadores verticais discretos no desktop (`md:divide-x divide-border-subtle/50`).
  - Layout responsivo fluído no mobile sem truncamento de conteúdo.
- **`src/components/sections/__tests__/HomeResultsStrip.test.tsx`**: Suíte de testes unitários com 100% de aprovação para métricas, rótulos, descrições e divisores.

### Modificado
- **`src/pages/Home.tsx`**: Integração de `<HomeResultsStrip />` substituindo a grade de caixas fechadas, preservando o cabeçalho de seção (`SectionHeader`), nota explicativa factual com asterisco e link de navegação para `/experiencia`.

## [0.0.66-pipeline-processo-home] - 2026-10-01

### Adicionado
- **`specs/SPEC-066-pipeline-processo-home.md`**: Especificação da refatoração da seção de Processo da Home, substituindo cards fechados por um Pipeline contínuo de engenharia.
- **`tasks/TASK-066-pipeline-processo-home.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-066.md`**: Relatório de QA com evidências de conformidade aos quality gates.
- **`src/components/sections/HomeProcessPipeline.tsx`**: Componente de Pipeline contínuo com:
  - Lista semântica acessível `<ol>` conectando as etapas 01 a 04.
  - Linha condutora contínua no desktop (horizontal) e mobile (vertical na lateral esquerda).
  - Marcadores de nós (nodes) técnicos em tipografia monospace (`01`, `02`, `03`, `04`) com micro-interações de escala e glow temático em hover.
  - Hierarquia visual limpa e descrições sem caixas fechadas isoladas.
- **`src/components/sections/__tests__/HomeProcessPipeline.test.tsx`**: Suíte de testes unitários com 100% de aprovação para semântica, etapas, títulos e descrições.

### Modificado
- **`src/pages/Home.tsx`**: Integração do componente `<HomeProcessPipeline />` preservando o cabeçalho institucional, títulos e link canônico para `/como-trabalhamos`.

## [0.0.65-bento-grid-servicos-home] - 2026-10-01

### Adicionado
- **`specs/SPEC-065-bento-grid-servicos-home.md`**: Especificação do Bento Grid de 12 colunas para a seção de Serviços da Home, substituindo a grade simétrica de 4 cards por composição editorial/técnica.
- **`tasks/TASK-065-bento-grid-servicos-home.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-065.md`**: Relatório de QA com evidências de conformidade aos quality gates e aprovação visual pelo PO.
- **`src/components/sections/HomeServicesBento.tsx`**: Componente modular do Bento Grid assimétrico de 12 colunas com 4 serviços:
  - Card 1 (`col-7`): APIs e back-end (destaque principal, mock visual de terminal HTTP `POST /api/v2/transactions`, 18ms latência, 2.500+ RPS, badge pulsante "Alta Concorrência").
  - Card 2 (`col-5`): Sistemas e portais (tags técnicas React 18/TypeScript/Tailwind CSS, garantia de arquitetura limpa e indicador 100% Type-Safe).
  - Card 3 (`col-5`): Integrações de dados (topologia visual de conectores ERP ➔ Event Hub ➔ CRMs/APIs, badge "Sync Ativo", fila com retry e 99.9% confiabilidade).
  - Card 4 (`col-7`): Modernização de legados (transição conceitual direta Antes/Depois via padrão Strangler Fig, badge "Zero Downtime" e evolução segura).
- **`src/components/sections/__tests__/HomeServicesBento.test.tsx`**: Suíte de testes unitários validando renderização de títulos, descrições de negócio, micro-artefatos técnicos e acessibilidade dos links.

### Modificado
- **`src/pages/Home.tsx`**: Substituição da grade de 4 colunas simétricas pelo componente `<HomeServicesBento />`, preservando cabeçalho, títulos aprovados e link canônico para `/servicos`.

## [0.0.64-correcao-contraste-textos-cursor-dark] - 2026-10-01

### Adicionado
- **`specs/SPEC-064-correcao-contraste-textos-cursor-dark.md`**: Especificação técnica para resolução de conflito de namespace de cores de texto e visibilidade do Cursor Orb no tema Dark.
- **`tasks/TASK-064-correcao-contraste-textos-cursor-dark.md`**: Tarefa e checklist de execução do protocolo SDD.
- **`reviews/QA-064.md`**: Relatório de QA com rácio de contraste WCAG 2.1 (AAA/AA) e validação dos quality gates.

### Corrigido
- **Contraste de Textos no Dark Mode (`tailwind.config.ts`)**:
  - Resolução da colisão de namespace onde `text-muted` e `text-secondary` resolviam para cores de superfície de fundo (`--bg-surface-rgb` e `--bg-elevated-rgb`), tornando eyebrows, parágrafos de cards e rodapé quase invisíveis.
  - Inclusão explícita de `theme.extend.textColor` mapeando `primary` (#F2F7F7 a 17.26:1), `secondary` (#9DB0B3 a 9.12:1), `muted` (#71868A a 5.36:1), `brand` e `on-brand` com conformidade estrita WCAG AAA/AA.
- **Cursor Orb Customizado (`src/components/CursorOrb.tsx`, `Layout.tsx`, `src/index.css`)**:
  - Desacoplamento do componente `CursorOrb` do delay de 2500ms em `Layout.tsx`, ativando o ponteiro customizado imediatamente na carga da página.
  - Elevação do empilhamento do cursor para `z-[9999]` com `pointer-events-none`, garantindo visibilidade irrestrita sobre cards, botões, modais e elementos opacos.
  - Escopo condicional da regra CSS `cursor: none !important;` para `html.custom-cursor-active`, adicionada dinamicamente pelo `CursorOrb` apenas em ambientes com mouse (`pointer: fine`) e sem redução de movimento.
  - Ponto de mira (dot) ampliado para 8px com preenchimento sólido `#2DD4BF` e glow nítido, além de anel reativo fluido com feedback tátil em interações.

## [0.0.63-sistema-cores-tokens-temas] - 2026-10-01

### Adicionado
- **`specs/SPEC-063-sistema-cores-tokens-temas.md`**: Especificação completa da refatoração do sistema de cores, tokens semânticos em 2 camadas e temas ricos (Dark, Light, System) com contraste WCAG AAA.
- **`tasks/TASK-063-sistema-cores-tokens-temas.md`**: Registro de execução e checklist de qualidade da tarefa SDD.
- **`reviews/QA-063.md`**: Relatório de qualidade, matriz de contraste WCAG 2.1 e evidências dos quality gates.
- **`docs/design-system/color-tokens-guide.md`**: Guia de uso dos tokens de cores, regra 60/30/10, catálogo de superfícies e tabela de contraste.

### Modificado
- **`src/index.css`**:
  - Implementação da arquitetura em 2 camadas: Primitivas (Camada 1: neutral, teal, blue, violet, amber, red, green) e Semânticas (Camada 2: base, surface, elevated, overlay, border-*, text-*, brand-*, accent-*).
  - Configuração de neutros tingidos (frio esverdeado/azulado) em vez de preto e branco puros.
  - Suporte completo a `:root, [data-theme="light"]` e `[data-theme="dark"], .dark` com transições suaves e respeito a `prefers-reduced-motion`.
- **`tailwind.config.ts`**:
  - Mapeamento de tokens semânticos via `rgb(var(--*-rgb) / <alpha-value>)`.
  - Isolamento de `backgroundColor.base` para prevenir colisão com a classe utilitária de tipografia `text-base` do Tailwind.
  - Inclusão dos tokens semânticos `on-brand`, `brand`, `text.*`, `accent.*`, `glow-brand` e sombras.
- **`index.html`**:
  - Script inline anti-FOUC no `<head>` sincronizando `data-theme`, classes e `color-scheme` no frame 0.
  - Meta tags `theme-color` adaptativas (`#0A0F10` para dark e `#F6FAFA` para light).
  - Atualização do CSS crítico inline com a nova paleta institucional.
- **`src/components/theme-provider.tsx`**:
  - Suporte nativo ao atributo `data-theme`, `color-scheme`, listener de alteração no sistema e atualização dinâmica da meta tag `theme-color`.
- **`src/components/ui/button.tsx`**:
  - Botão primário (`variant: "default"`) com `bg-brand` (`#2DD4BF`) e `text-on-brand` (`#04201C`), alcançando contraste **12.44:1 (WCAG AAA)**.
  - Variantes outline, secondary e ghost adaptadas para tokens semânticos.
- **Componentes e Seções**:
  - `Hero.tsx`, `Home.tsx`, `Header.tsx`, `Footer.tsx`, `Contact.tsx`, `Services.tsx`, `FAQ.tsx`, `Authority.tsx`, `HowWeWork.tsx`, `Differentials.tsx`: remoção de todas as classes `zinc-*` e `emerald-*`, padronizando 100% da interface em tokens semânticos.
  - Distribuição consistente das cores de apoio nos 4 serviços (01: Blue, 02: Violet, 03: Amber, 04: Teal).
- **Testes & E2E**:
  - Atualização de `e2e/design-system-and-stability.spec.ts` para verificar o verde-água da marca (`rgb(45, 212, 191)`).
  - Atualização de `e2e/hero-identity-token-locks.spec.ts` para validar as travas de tokens e ausência de gradientes com os novos tokens semânticos.
  - 100% dos testes passando (163 unitários com 99.44% de cobertura, 43 E2E no Playwright).

## [0.0.62-eliminacao-redundancias-home] - 2026-10-01

### Adicionado
- **`specs/SPEC-062-eliminacao-redundancias-home.md`**: Especificação de eliminação de redundâncias da Home baseada no princípio "Uma ideia, um lugar".
- **`tasks/TASK-062-eliminacao-redundancias-home.md`**: Tarefa de execução e checklist de qualidade SDD.
- **`reviews/QA-062.md`**: Relatório de qualidade com evidências de conformidade, quality gates e validações E2E.
- **`src/pages/AboutPage.tsx`**: Adicionada a seção institucional dos 3 Pilares de Atuação ("Comunicação transparente", "Engenharia que facilita evoluir", "Foco no problema do negócio") movida da Home.

### Modificado
- **`src/components/sections/Hero.tsx`**:
  - Padronização do CTA primário para `"Falar sobre meu projeto"` (`/contato`).
  - CTA secundário transformado em âncora suave para a seção de serviços: `"Ver soluções"` (`#servicos`).
  - Card "Topologia de Arquitetura" simplificado para stack visual pura de engenharia (removidas descrições longas, métricas 99,9%, 2.500+ RPS e selos).
- **`src/pages/Home.tsx`**:
  - Seção Serviços ("O que desenvolvemos"): 4 cards inteiros clicáveis para `/servicos` focados estritamente em problemas de negócio (≤ 14 palavras cada); título e subtítulo reescritos sem repetir "estabilidade"; link curto `"Ver todos os serviços →"`.
  - Seção Processo ("Como trabalhamos"): compactada em stepper horizontal de 4 etapas (≤ 10 palavras cada), com diferencial de contato direto em linha única e link curto `"Ver metodologia →"`.
  - Seção Resultados ("Experiência Prática"): consolidada como único ponto de métricas da Home, com link curto `"Ver projetos →"`.
  - Unificação de Confiança + CTA Final: eliminação do bloco Sobre repetitivo e criação de seção comercial enxuta com linha de confiança (*"Toledo (PR) · Atendimento em todo o Brasil · 9+ anos em sistemas críticos"*), promessa de SLA (*"Resposta em até 24h úteis"*) e link discreto para `"Dúvidas frequentes →"`.
  - Remoção completa da seção de Pilares da Home (`#diferenciais`).
- **`src/components/sections/Footer.tsx`**:
  - Redução da descrição institucional para 1 linha concisa: *"Engenharia de software sob medida, sistemas web e integrações corporativas."*.
- **`src/components/CursorOrb.tsx` & `src/components/layout/Layout.tsx`**:
  - Cursor posicionado atrás do conteúdo (`z-0`), com opacidade reduzida e desativação em dispositivos touch (`pointer: coarse`) e sob `prefers-reduced-motion: reduce`.
- **Testes & E2E**:
  - `src/components/sections/__tests__/Hero.test.tsx`: validação dos novos CTAs e ausência de métricas redundantes no canvas.
  - `src/pages/__tests__/pages.test.tsx`: atualização dos headings esperados na Home.
  - `src/components/sections/__tests__/Footer.test.tsx`: validação da nova descrição institucional de 1 linha.
  - `e2e/design-system-and-stability.spec.ts`: atualização de títulos e navegação de âncora.

## [0.0.61-hero-engenharia-software-b2b] - 2026-10-01

### Adicionado
- **`specs/SPEC-061-hero-engenharia-software-b2b.md`**: Especificação completa de refatoração do Hero com layout assimétrico de duas colunas, posicionamento de engenharia B2B e canvas de topologia arquitetural.
- **`tasks/TASK-061-hero-engenharia-software-b2b.md`**: Registro de execução e quality gates da tarefa SDD.
- **`reviews/QA-061.md`**: Relatório de qualidade com evidências de conformidade, métricas de viewport e homologação de testes.

### Modificado
- **`src/components/sections/Hero.tsx`**: Redesenho completo do Hero:
  - Layout assimétrico de duas colunas ocupando ~80vh–90vh no desktop (875px em 1440x900).
  - Eyebrow contextual com `BrandChipIcon`: `ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO`.
  - Headline comercial madura e memorável: *"Engenharia de software para construir, integrar e evoluir sistemas."*.
  - Subheadline factual em 2 linhas detalhando desenvolvimento sob medida, APIs e modernização de legados.
  - Duas chamadas para ação claras: CTA primário `"Falar sobre um projeto"` (`/contato`) e CTA secundário `"Conhecer soluções"` (`/servicos`).
  - Linha de autoridade factual comprovada nos setores de energia, indústria, educação, varejo e sistemas corporativos.
  - Canvas de Engenharia de Software no lado direito: topologia técnica de 4 camadas conectadas (Aplicações & Portais, APIs & Back-end, Barramento de Integração & Eventos, Persistência Transacional & Nuvem) com tags de tecnologias reais da stack (`React`, `TypeScript`, `Node.js`, `PHP / Laravel`, `RabbitMQ`, `PostgreSQL`, `Redis`, `AWS`, `Docker`) e `aria-hidden="true"`.
  - Otimização responsiva para mobile com descrições recolhidas e chips compactos, eliminando rolagem desnecessária e mantendo zero overflow horizontal.
  - Motion design sutil via Framer Motion respeitando `prefers-reduced-motion: reduce`.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização da suíte de testes unitários para a nova estrutura, textos exatos, links e acessibilidade (8/8 testes passando).
- **`e2e/hero-identity-token-locks.spec.ts`**: Atualização de seletores de CTA e divisor de transição para validação estrita de tokens canônicos.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização das asserções de H1, navegação e CTAs do Hero.
- **`e2e/multi-route-navigation.spec.ts`**: Atualização do H1 esperado da rota raiz `/`.
- **`PROJECT.md`**: Atualização do status canônico da seção Hero e contagem de testes.

## [0.0.60-arquitetura-informacao-multi-rota] - 2026-10-01

### Adicionado
- **`specs/SPEC-060-arquitetura-informacao-multi-rota.md`**: Especificação completa da arquitetura de informação multi-rota, navegação enxuta, SEO estruturado e regras de preservação de URL.
- **`tasks/TASK-060-arquitetura-informacao-multi-rota.md`**: Tarefa SDD com inventário de rotas, componentes e checklist de validação.
- **`reviews/QA-060.md`**: Relatório de qualidade com evidências, quality gates (161 testes unitários, 43 testes E2E, cobertura 99.64%) e auditoria Lighthouse.
- **`docs/refactor/inventory.md`**: Inventário técnico de rotas, navegação, metadados, baseline de testes e performance do monólito one-page anterior.
- **`docs/refactor/route-map.md`**: Tabela canônica de rotas novas, redirecionamentos 301 permanentes e estratégia de hash no cliente.
- **`docs/refactor/plan.md`**: Plano de execução detalhado com análise de impacto, pré-render e decisões de arquitetura.
- **`src/config/experience.ts`**: Dataset canônico tipado de organizações profissionais aprovadas (`CAPES`, `ONS`, `Energia Pecém`), com declaração explícita de não-clientes da EPM.
- **`src/config/faq.ts`**: Fonte única para as 8 perguntas frequentes categorizadas.
- **`src/components/ui/PageHeader.tsx`**: Componente de cabeçalho padronizado para páginas internas com eyebrow, título semântico `<h1>` e descrição.
- **`src/components/routing/ScrollManager.tsx`**: Gerenciador de restauração de rolagem, foco acessível no `<h1>` e redirecionamento de hashes legados.
- **`src/components/layout/Layout.tsx`**: Shell persistente compartilhado contendo Header, Skip-Link (`#conteudo-principal`), `<main>` com `<Outlet />` e Footer.
- **`src/pages/Home.tsx`**: Homepage curta como hub comercial combinando Hero Slim com resumos e links para páginas de aprofundamento.
- **`src/pages/ServicesPage.tsx`**: Rota `/servicos` com detalhamento das 4 ofertas, mockups e gatilhos "Quando precisa:".
- **`src/pages/HowWeWorkPage.tsx`**: Rota `/como-trabalhamos` com pipeline sequencial de 4 etapas de engenharia.
- **`src/pages/ExperiencePage.tsx`**: Rota `/experiencia` com indicadores de confiabilidade, 4 contextos de mercado e organizações de atuação profissional.
- **`src/pages/EngineeringPage.tsx`**: Rota `/engenharia` com os 3 pilares de engenharia, boas práticas e grafo `TechConstellation`.
- **`src/pages/AboutPage.tsx`**: Rota `/sobre` institucional com liderança técnica, atuação remota e dados cadastrais de Toledo/PR.
- **`src/pages/ContactPage.tsx`**: Rota `/contato` com formulário estruturado, SLA de resposta e canais diretos.
- **`src/pages/FAQPage.tsx`**: Rota `/duvidas-frequentes` com acordeão categorizado.
- **`scripts/prerender.js`**: Script de pós-build que gera arquivos estáticos `dist/<rota>/index.html` pré-populados com metadados para SEO e crawlers sem JS.
- **`e2e/multi-route-navigation.spec.ts`**: Bateria de 13 testes Playwright cobrindo carregamento direto F5, H1 único por rota, menu mobile e redirecionamentos.

### Modificado
- **`src/App.tsx`**: Configuração de rotas aninhadas em `Layout`, rotas de redirecionamento local e rota 404 limpa.
- **`src/components/layout/Header.tsx`**: Menu superior enxuto com 5 links (`NavLink` com `aria-current="page"`) + 1 botão CTA (`"Falar sobre meu projeto"` para `/contato`).
- **`src/components/sections/Footer.tsx`**: Links internos convertidos para rotas canônicas dedicadas.
- **`src/components/ContactForm.tsx`**: Alinhamento do campo `projectType` aos 4 serviços canônicos.
- **`src/pages/NotFound.tsx`**: Página 404 totalmente em português com meta `noindex` e links de recuperação de navegação.
- **`vercel.json`**: Adição de 5 regras de redirecionamento 301 permanente para rotas antigas.
- **`public/sitemap.xml`**: Atualização para as 8 URLs canônicas da nova arquitetura.
- **`public/llms.txt`**: Atualização do contexto canônico para agentes de IA e LLMs com 8 rotas, 4 serviços e CTA unificado.
- **`public/llms-full.txt`**: Documentação aprofundada de contexto institucional e técnico para motores de busca generativos.
- **`index.html`**: Refinamento de URLs no schema JSON-LD (`FAQPage` para `/duvidas-frequentes` e serviços).
- **`package.json`**: Integração do pré-render no comando `npm run build`.

## [0.0.59-hero-slim-minimalista] - 2026-10-01

### Adicionado
- **`specs/SPEC-059-hero-slim-minimalista.md`**: Especificação do redesenho minimalista slim do Hero, travas estritas de tokens e CTA integrado no Header.
- **`tasks/TASK-059-hero-slim-minimalista.md`**: Tarefa SDD rastreada com escopo de arquivos e checklist de execução concluído.
- **`reviews/QA-059.md`**: Relatório de QA com evidências completas, quality gates (100% aprovados, cobertura 99.75%, 30 testes E2E) e auditoria de performance/Lighthouse.
- **`docs/visual-identity-inventory.md`**: Inventário canônico de paleta, tipografia, raios, bordas, padrões de assinatura e travas de sistema.
- **`docs/hero-diagnosis.md`**: Diagnóstico detalhado de baseline (alturas, custos, animações e ocupação de tela).
- **`e2e/hero-identity-token-locks.spec.ts`**: Teste automatizado Playwright auditando ausência total de gradientes e aderência rigorosa aos tokens computados em Dark e Light Mode.
- **`e2e/diagnose-hero-before.spec.ts`** e **`e2e/diagnose-hero-after.spec.ts`**: Testes de medição automatizada de alturas e geração de evidências visuais.
- **`docs/evidence/hero-before/`** e **`docs/evidence/hero-after/`**: Capturas comparativas em 5 viewports em Dark e Light Mode, incluindo viewport fold em 1440×900.

### Modificado
- **`src/components/sections/Hero.tsx`**:
  - Redesenho completo para formato slim de coluna única centralizada (altura reduzida de 1234px para 458px em desktop).
  - Serviços visível acima da dobra em 1440×900 sem necessidade de rolagem.
  - Headline H1 100% monocromática com quebra balanceada em 2 linhas (`max-w-[20ch]`).
  - Eyebrow minimalista com `BrandChipIcon` e rótulo mono `Software House`.
  - Ação dominante única com botão primário sólido e link de texto secundário.
  - Detalhe de transição minimalista com linha de 1px e nó central esmeralda sólido (#10B981).
  - Erradicação de feixes luminosos, gradientes e animações de entrada que atrasavam o LCP.
- **`src/components/layout/Header.tsx`**:
  - Adição de botão de acento CTA `"Falar sobre meu projeto"` à direita da navegação desktop e no menu móvel.
  - Breakpoint de troca para menu móvel antecipado para `lg` (<1024px) para garantir espaçamento ideal.
- **`src/index.css`**:
  - Remoção de regras CSS legadas não utilizadas (`@keyframes hero-orbit`, `.hero-brand-aura`).

### Removido
- **`src/components/ui/lamp.tsx`**: Componente de feixes de luz cônicos volumétricos excluído por completo.
- **`src/components/sections/hero/HeroBadge.tsx`**: Badge duplo com seta removido.
- **`src/components/sections/hero/HeroArchitecture.tsx`**: Console interativo de arquitetura removido do Hero.

## [0.0.58-padronizacao-cabecalhos-icones-premium] - 2026-09-30

### Adicionado
- **`specs/SPEC-058-padronizacao-cabecalhos-icones-premium.md`**: Especificação técnica da padronização estrita de cabeçalhos de seção (`SectionHeader`) e consolidação da suíte de ícones conceituais autorais.
- **`tasks/TASK-058-padronizacao-cabecalhos-icones-premium.md`**: Tarefa SDD rastreada com escopo de arquivos e checklist de execução.
- **`reviews/QA-058.md`**: Relatório de QA com evidências, quality gates (100% aprovados, cobertura 99.46%, 18 testes E2E) e matriz de conformidade.
- **`src/components/icons/Icon.tsx`**: Componente wrapper reutilizável para ícones conceituais autorais com suporte a acessibilidade e tipagem estrita.
- **`src/components/icons/__tests__/Icon.test.tsx`**: Testes unitários para o componente wrapper `Icon`.
- **`scripts/generate-icon-preview.cjs`**: Script de geração da matriz de prévia dos 15 ícones autorais em 4 tamanhos (16, 20, 24, 32px) para Dark e Light Mode.
- **`docs/evidence/icons/`**: Matriz de evidência de renderização visual dos ícones.

### Modificado
- **`src/components/sections/Authority.tsx`**:
  - Remoção de override tipográfico no H2 (`titleClassName`), igualando a escala fluida padronizada a todas as seções do site.
  - Associação semântica com `aria-labelledby="autoridade-heading"`.
- **`src/components/sections/Services.tsx`**, **`Technologies.tsx`**, **`Sectors.tsx`**, **`FAQ.tsx`**, **`Contact.tsx`**:
  - Associação explícita de `aria-labelledby="[id]-heading"` em cada `<section>` referenciando o id do `SectionHeader`.
- **`src/components/icons/index.ts`**:
  - Exportação unificada de tipos, ícones conceituais e componente `Icon`.

## [0.0.57-metricas-lideranca-outras-empresas-links-sociais] - 2026-09-30

### Adicionado
- **`specs/SPEC-057-metricas-lideranca-outras-empresas-links-sociais.md`**: Especificação do refinamento factual da seção de autoridade e consolidação de links sociais oficiais no rodapé.
- **`tasks/TASK-057-metricas-lideranca-outras-empresas-links-sociais.md`**: Tarefa SDD rastreada com escopo e checklist de execução.
- **`reviews/QA-057.md`**: Relatório de QA com evidências, quality gates (100% aprovados, cobertura 99.46%, 18 testes E2E) e auditoria de segurança.

### Modificado
- **`src/components/sections/Authority.tsx`**:
  - Subtítulo refinado para *"Resultados de projetos da liderança técnica da EPM DevTech em outras empresas."*, eliminando a palavra "anteriores" para precisão temporal com a data de fundação da empresa.
- **`src/components/sections/__tests__/Authority.test.tsx`**:
  - Atualização dos matchers unitários para validar a nova legenda e garantir a ausência de "conduzidos" e "projetos anteriores".

## [0.0.56-copy-stats-ssr-destaque-quando-precisa] - 2026-09-30

### Adicionado
- **`specs/SPEC-056-copy-stats-ssr-destaque-quando-precisa.md`**: Especificação completa de ajustes textuais, saneamento de termos superlativos não comprovados, SSR/HTML inicial dos stats de autoridade sem zeros e destaque visual do "Quando precisa:".
- **`tasks/TASK-056-copy-stats-ssr-destaque-quando-precisa.md`**: Tarefa SDD rastreada com escopo de arquivos e checklist de execução.
- **`reviews/QA-056.md`**: Relatório de QA com evidências, quality gates (100% aprovados, cobertura 99.46%, 18 testes E2E), resultado da varredura grep e repetições saneadas.
- **`scripts/capture-services-cards.cjs`**: Script automatizado Playwright de captura visual dos cards de serviço antes e depois em 1440px, 768px e 375px (Dark e Light).
- **`docs/evidence/services-cards/`**: Matriz de capturas comparativas dos cards de serviço.

### Modificado
- **`src/components/ui/CountUp.tsx`**:
  - Renderização inicial direta com o valor final formatado (`formatVal(end)`), garantindo que indexadores, leitores de tela e visualizações sem rolagem recebam os valores consolidados.
  - Animação tratada como progressive enhancement estrito, respeitando `prefers-reduced-motion` e ambiente de teste.
  - Inclusão do atributo `aria-hidden="true"` por padrão nos elementos visuais do contador.
- **`src/components/sections/Authority.tsx`**:
  - Rótulos acessíveis dedicados via `<span className="sr-only">` para cada métrica, eliminando colisões de texto e concatenações espúrias.
- **`src/components/sections/Services.tsx`**:
  - Reescrita do Card 4 eliminando repetição do gerúndio "reduzindo".
  - Destaque visual dos gatilhos "Quando precisa:": rótulo mono verde esmeralda em caixa alta, pergunta com cor primária e peso médio, divisor fino e alinhamento nivelado na base via `mt-auto`.
  - Remoção de truncamento arbitrário de linhas.
- **`src/components/sections/hero/HeroArchitecture.tsx`**:
  - Nó 02 ajustado para "desacoplamento entre serviços" (eliminando repetição de "modular").
  - Mapeamento dinâmico de legendas de camadas para evitar repetição entre texto do cartão, chips e legenda ativa.
- **`src/config/site.ts`**, **`public/site.webmanifest`**, **`index.html`**, **`public/llms.txt`**, **`public/llms-full.txt`**, **`README.md`**:
  - Saneamento da autodescrição de "especializada" para "dedicada a", alinhada ao tom factual do projeto.
- **`src/components/sections/Differentials.tsx`**, **`Technologies.tsx`**, **`FAQ.tsx`**, **`Contact.tsx`**:
  - Correção de repetições pontuais de raiz léxica.
- **`e2e/design-system-and-stability.spec.ts`**:
  - Novos testes E2E Playwright validando valores finais sem zeros na seção de autoridade sob reduced-motion e com animação inibida.

## [0.0.55-animacao-contadores-autoridade-sobre-estatico] - 2026-09-30

### Adicionado
- **`src/components/ui/CountUp.tsx`**: Componente reutilizável de count-up com suporte a pt-BR, decimais, milhares, `requestAnimationFrame`, curva `easeOut` e `prefers-reduced-motion`.
- **`specs/SPEC-055-animacao-contadores-autoridade-sobre-estatico.md`**: Especificação funcional da redistribuição de animações de contagem.
- **`tasks/TASK-055-animacao-contadores-autoridade-sobre-estatico.md`**: Checklist técnico rastreado via SDD.
- **`reviews/QA-055.md`**: Relatório de QA e validação de quality gates (100% aprovados, cobertura 99.46%).

### Modificado
- **`src/components/sections/Authority.tsx`**:
  - Integração do `CountUp` aos 4 indicadores de desempenho técnico acionados quando a seção entra em viewport (`isInView`).
- **`src/components/sections/About.tsx`**:
  - Remoção da animação de contagem interna, tornando o indicador de experiência técnica (`+9`) 100% estático e sóbrio.

## [0.0.54-metricas-experiencia-links-rodape] - 2026-09-30

### Adicionado
- **`src/config/site.ts`**: Módulo canônico de configurações centralizando e-mail, telefone/WhatsApp, endereço, CNPJ e links oficiais de redes sociais.
- **`specs/SPEC-054-metricas-experiencia-links-rodape.md`**: Especificação para métricas de experiência técnica, links de redes no rodapé e saneamento de repositório público.
- **`tasks/TASK-054-metricas-experiencia-links-rodape.md`**: Checklist técnico rastreado via SDD.
- **`reviews/QA-054.md`**: Relatório de QA e validação de quality gates (TypeScript, ESLint, 145 unit tests, 16 Playwright E2E tests, cobertura de 98.64%).
- **`docs/evidence/stats-footer/`**: Matriz completa de evidências visuais antes × depois em 1440px, 768px e 375px (Dark e Light) para as seções de Experiência e Rodapé.

### Modificado
- **`src/components/sections/Authority.tsx`**:
  - Restauração da simetria de 4 estatísticas comprováveis de projetos anteriores da liderança técnica.
  - Substituição da métrica redundante "Zero perda" por "100%" de integridade de dados na apuração regulatória do setor elétrico.
  - Inclusão do 4º stat factual: "−35%" de atividades manuais via automações e integrações.
  - Ajuste de microcopy no subtítulo removendo o termo "conduzidos".
  - Inclusão de nota discreta de confidencialidade abaixo do grid.
  - Formatação pt-BR com vírgula decimal e sinal tipográfico de menos `−` (U+2212) acompanhado de `sr-only` ("redução de 35%").
- **`src/components/sections/Footer.tsx`**:
  - Inclusão dos links oficiais do LinkedIn da empresa e GitHub da organização na coluna "Contato".
  - Ícones oficiais SVG inline monocromáticos (20×20px) com labels visíveis e alvo de toque acessível (≥ 44px).
  - Remoção dos links pessoais obsoletos da coluna 1.
  - Consumo direto de `SITE_CONFIG` para todas as informações corporativas.
- **`index.html`**:
  - Atualização do campo `sameAs` em `ProfessionalService` apontando exclusivamente para os perfis corporativos da EPM DevTech.
- **`src/pages/Index.tsx`**:
  - Consumo de `BASE_URL` a partir de `SITE_CONFIG`.
- **`README.md`**:
  - Reescrita técnica e institucional neutra, removendo menções a clientes confidenciais e atualizando o contato comercial oficial.
- **`public/llms.txt` e `public/llms-full.txt`**:
  - Saneamento de nomes de clientes de projetos passados e alinhamento com as 4 métricas autorizadas.

## [0.0.53-padronizacao-cabecalhos-icones-premium] - 2026-09-30

### Adicionado
- **`specs/SPEC-053-padronizacao-cabecalhos-icones-premium.md`**: Especificação para padronização centralizada de cabeçalhos de seção, conjunto autoral de ícones SVG e refinamentos de copy.
- **`tasks/TASK-053-padronizacao-cabecalhos-icones-premium.md`**: Tarefa e checklist de execução rastreados via SDD.
- **`reviews/QA-053.md`**: Relatório de QA e validação de quality gates (TypeScript, ESLint, 144 unit tests com 98.61% coverage, 16 Playwright E2E tests).
- **`src/components/icons/`**: Conjunto autoral de 15 ícones conceituais nativos em SVG com traço de 1.5px, duotone a 10% e nó verde esmeralda com a assinatura de marca EPM DevTech.
- **`docs/evidence/headers-icons/`**: Evidências visuais de todas as seções e página completa em 1440px, 768px e 375px.

### Modificado
- **`src/components/ui/SectionHeader.tsx`**:
  - Elemento semântico `<header>`.
  - Padrão 100% centralizado em todas as seções de conteúdo.
  - Larguras máximas balanceadas (`max-w-3xl` para H2, `max-w-2xl` para subtítulo) e `text-wrap: balance`.
  - Espaçamentos verticais estritos e tipografia fluida.
- **`src/components/sections/Differentials.tsx`**:
  - Reorganização para cabeçalho centralizado superior e 3 colunas abertas sem molduras de cards, separadas por divisores verticais sutis.
  - Ícones conceituais autorais no topo de cada coluna.
  - Bloco inferior centralizado de chips de práticas de engenharia.
- **`src/components/sections/HowWeWork.tsx`**:
  - Ícones conceituais autorais integrados ao cabeçalho do card ao lado dos números `01…04`.
  - Remoção de containers quadrados com fundo esmeralda no rodapé.
- **`src/components/sections/Sectors.tsx`**:
  - Ícones autorais para Indústria, Varejo, Educação e Energia.
  - Remoção da seta direcional `ArrowRight` (falsa affordance de link em cards informativos).
- **`src/components/sections/About.tsx`**:
  - Cabeçalho padronizado e centralizado com `tagline="Sobre a empresa"`.
  - Card de liderança técnica com ícone autoral.
- **`src/components/sections/Contact.tsx`**:
  - Ícones autorais para diagnóstico técnico, resposta rápida e confidencialidade.
  - Remoção de círculos com fundo verde plano nos próximos passos.
- **`src/components/sections/hero/HeroArchitecture.tsx`**:
  - Suavização de termos contratuais para linguagem estritamente factual da engenharia.
- **`src/components/sections/FAQ.tsx`**:
  - Pergunta sobre sites institucionais movida para a categoria `"servicos"`.
- **Padronização Global em Sentence Case**:
  - Ajustados títulos e rótulos de navegação, rodapé, serviços, setores e diferenciais.

### Modificado
- **`src/components/sections/HowWeWork.tsx`**:
  - Estruturação semântica em lista ordenada `<ol role="list">` e itens `<li>`.
  - Adição de `aria-hidden="true"` aos selos numéricos e texto para leitores de tela (`Etapa 01: ...`).
  - Timeline vertical no mobile (< 1024px) com linha contínua e pinos laterais alinhados aos cards.
  - Suporte total a `prefers-reduced-motion` com renderização estática imediata.
  - Validação de contraste WCAG AA nas tags e microcopy.
- **`src/components/sections/Differentials.tsx`**:
  - Novo layout de 2 colunas no desktop (≈ 40% cabeçalho alinhado à esquerda e chips de práticas; ≈ 60% 3 linhas sem moldura de card com hover indicator).
  - Remoção de timeline horizontal, pinos, números `01/02/03`, setas `→` e molduras fechadas.
  - Nova animação stagger suave na entrada do viewport respeitando `prefers-reduced-motion`.
- **`src/components/ui/SectionHeader.tsx`**:
  - Suporte à prop opcional `id` repassada para o `HeadingTag` para amarração de `aria-labelledby`.
- **Suítes de Testes**:
  - Testes unitários atualizados em `HowWeWork.test.tsx` e `Differentials.test.tsx` (144/144 passando, 98.57% cobertura geral).

## [0.0.51-rodada-2-veracidade-estrutura-sites] - 2026-09-30

### Adicionado
- **`src/components/sections/HowWeWork.tsx`**: Nova seção de processo ("Como trabalhamos") com âncora `#como-trabalhamos` e pipeline 01-04 (*01 Entendemos → 02 Definimos → 03 Desenvolvemos → 04 Evoluímos*).
- **`src/components/sections/__tests__/HowWeWork.test.tsx`**: Suíte de testes unitários para a seção de processo com cobertura total.
- **`specs/SPEC-051-rodada-2-veracidade-estrutura-sites.md`**: Especificação da rodada 2 cobrindo veracidade, nova estrutura e sites institucionais.
- **`tasks/TASK-051-rodada-2-veracidade-estrutura-sites.md`**: Tarefa e checklist de execução rastreados via SDD.
- **`reviews/QA-051.md`**: Relatório de QA e validação de quality gates da rodada 2.

### Modificado
- **`src/components/sections/Authority.tsx`**:
  - Título enquadrado como *"Experiência em operações que não podem parar"*.
  - Legenda explícita: *"Resultados de projetos anteriores conduzidos pela liderança técnica da EPM DevTech."*.
  - Redução de 4 para 3 métricas comprovadas (99,9%, 2.500 RPS, Zero perda de dados) e remoção de badges duplicados.
- **`src/components/sections/hero/HeroArchitecture.tsx`**:
  - Rótulos ajustados para práticas sem promessas absolutas (*"Processamento resiliente"*, *"Redundância"*, *"Entrega otimizada"* e mantidos *"Alta Vazão"* e *"Alta Disponibilidade"*).
- **`src/components/sections/Services.tsx`**:
  - Card 1 atualizado para *"Sistemas Web, Portais e Sites Institucionais"*, cobrindo empresas com alta exigência de performance e SEO.
  - Suavização de termos contratuais nos cards de microsserviços e modernização legado.
- **`src/components/sections/About.tsx`**:
  - Preservado apenas 1 stat destacado (*"9+ Anos de Experiência Técnica"*).
  - Card de liderança técnica condensado sem duplicação de pilares ou detalhamento interno de metodologia.
  - Eliminação completa de "engenheiro" no pessoal em conformidade ética e legal.
- **`src/components/sections/Differentials.tsx`**:
  - 3 pilares focados no cliente com ponto único de "Contato direto com quem desenvolve".
- **`src/components/sections/FAQ.tsx`**:
  - Condensado de 10 para 8 perguntas essenciais, incluindo sites institucionais (Q8) e explicação desmistificada de SDD para leigos.
- **`src/components/sections/Contact.tsx`**:
  - Adicionada opção *"Site Institucional"* no select de tipo de projeto.
  - Placeholder do telefone atualizado para `(45) 99999-9999`.
  - Próximos passos e prazos suavizados para estimativas sem rigidez contratual.
- **`src/pages/Index.tsx`**:
  - Reordenação da homepage: Hero → Serviços → Como trabalhamos → Diferenciais → Tecnologias → Autoridade + Setores → Sobre → FAQ → Contato → Footer.
  - Sincronização de rotas em `SEO_META`.
- **`src/components/layout/Header.tsx` & `src/components/sections/Footer.tsx`**:
  - Itens de navegação sincronizados com a nova estrutura; rodapé com link *"Sistemas, Portais e Sites"* e e-mail único centralizado (`elessandro@epmdevtech.com.br`).
- **`index.html` & Agêntico**:
  - `foundingDate: "2026"`, remoção de `twitter:creator` pessoal, sincronização de schemas e atualização de `llms.txt` e `llms-full.txt`.
- **Suíte de Testes**:
  - 21 suites, 141 testes unitários passando, 16 testes E2E Playwright passando, cobertura de 98.55%.

## [0.0.50-refatoracao-conteudo-ux-a11y-seo] - 2026-09-30

### Adicionado
- **`public/og-image-1200x630.png`**: Imagem Open Graph de alta resolução (1200×630) baseada nos ativos visuais da marca EPM DevTech (gradiente esmeralda, tipografia Geist e logotipo).
- **`docs/refactor/`**: Auditoria completa, inventário de conteúdo, proposta de copy de-para e plano de implementação da refatoração (`audit.md`, `inventory.md`, `copy-proposal.md`, `plan.md`).
- **`specs/SPEC-049-refatoracao-conteudo-ux-a11y-seo.md`**: Especificação completa da refatoração de conteúdo, UX writing, acessibilidade e SEO aprovada pelo PO.
- **`tasks/TASK-050-refatoracao-conteudo-ux-a11y-seo.md`**: Tarefa e checklist de execução rastreados via SDD.
- **`reviews/QA-050.md`**: Relatório de QA e validação integral dos quality gates.

### Modificado
- **`index.html`**:
  - Meta description otimizada (152 caracteres) focada em problemas de negócio e soluções sob medida.
  - Remoção de `meta keywords` obsoletas.
  - Metatags `og:*` e `twitter:*` completas apontando para a imagem 1200×630.
  - Atualização do schema JSON-LD como `ProfessionalService` consolidado e honesto.
- **`src/pages/Index.tsx`**:
  - Dicionário `SEO_META` sincronizado em todas as rotas e seções (`/`, `/sobre`, `/setores`, `/servicos`, `/tecnologias`, `/diferenciais`, `/faq`, `/contato`).
- **CTA Primário Unificado**:
  - Unificação de 100% dos pontos de conversão e metadados no CTA único: **"Falar sobre meu projeto"**.
- **`src/components/sections/Hero.tsx`**:
  - Supporting copy focado em soluções corporativas sob medida.
  - CTA secundário ajustado para *"Conhecer a EPM DevTech"* (`#sobre`).
  - Microprova social concisa: *"Da concepção ao deploy • Engenharia direta • Arquitetura para evolução"*.
- **`src/components/sections/Authority.tsx`**:
  - Título *"Sistemas construídos para operações que não podem parar"*.
  - Métricas e badges contextuais por setor (`Educação Superior & Redes`, `Operação Energética`, `Indústria & Manufatura`, `Varejo & E-commerce`).
- **`src/components/sections/About.tsx`**:
  - Posicionamento institucional centrado na empresa, apresentando o fundador de forma sóbria como liderança técnica e arquiteto de software.
  - AnimatedStats calibrados (9 anos de experiência, 4 contextos de negócio, 100% engenharia direta).
- **`src/components/sections/Sectors.tsx`**:
  - Título *"Experiência em diferentes contextos"*, mantendo os 4 blocos 3D e mockups com linguagem corporativa e rigor técnico.
- **`src/components/sections/Services.tsx`**:
  - Grid equilibrado 2×2 consolidando 4 ofertas estratégicas com gatilhos de dor claros (`Quando precisa:`).
- **`src/components/sections/Technologies.tsx`**:
  - Título *"Tecnologias que usamos para construir soluções"* com justificativa técnica.
- **`src/components/sections/Differentials.tsx`**:
  - 3 pilares estratégicos centrados em valor para o cliente (*Comunicação Transparente*, *Engenharia que Facilita Evoluir*, *Foco no Problema do Negócio*) acompanhados de linha de práticas de engenharia.
- **`src/components/sections/FAQ.tsx`**:
  - Respostas calibradas para modelos de trabalho e atendimento remoto em todo o Brasil, com link direto para o CTA primário.
- **`src/components/sections/Contact.tsx`**:
  - Cabeçalho *"Fale sobre seu projeto"*, botão de envio alinhado ao CTA único e cards com garantias de diagnóstico, agilidade e sigilo.
- **`src/components/sections/Footer.tsx`**:
  - Soluções espelhadas, navegação sem redundâncias e posicionamento conciso.
- **Suítes de Testes**:
  - Atualização dos testes unitários (138/138 passando) e E2E (16/16 passando) refletindo o novo conteúdo com 98.57% de cobertura.

### Adicionado
- **`src/components/ui/lamp.tsx`**: Componente `LampContainer` adaptado com foco em UX/UI e integração plena aos tokens do Design System da EPM DEVTECH:
  - Feixes de luz cônicos volumétricos em tons verde esmeralda (`#10B981` / `from-emerald-500`, `bg-emerald-400`, `bg-emerald-500/40`).
  - Suporte responsivo com zero layout shift e contenção de overflow horizontal em viewports móveis e desktops.
  - Compatibilidade com temas Dark e Light via tokens semânticos (`bg-background`).
  - Suporte completo a `prefers-reduced-motion`.
- **`tailwind.config.ts`**: Adição da utilidade `gradient-conic` para suporte a gradientes cônicos angulares.
- **`specs/SPEC-047-hero-lamp-software-house.md`**: Especificação do Hero Lamp e posicionamento Software House aprovada pelo PO.
- **`tasks/TASK-047-hero-lamp-software-house.md`**: Rastreamento de execução da TASK-047.
- **`reviews/QA-047.md`**: Relatório de QA e validação dos quality gates.

### Modificado
- **`src/components/sections/Hero.tsx`**: Atualização do copywriting e incorporação do efeito Lamp:
  - Eyebrow badge: `EPM DEVTECH` • `SOFTWARE HOUSE` direcionando para `#sobre`.
  - Headline monocromática (`<h1>`): *"Desenvolvemos software sob medida para o seu negócio."*
  - Supporting copy: *"Sistemas, aplicações web, APIs e integrações construídos para resolver problemas reais, com segurança, escala e evolução contínua."*
  - Dual CTAs: *"Falar sobre meu projeto →"* (`#contato`) e *"Conhecer a EPM"* (`#sobre`).
  - Microprova social: *"Da ideia à produção • Engenharia direta • +9 anos de experiência"*.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização dos testes unitários cobrindo o novo texto de Software House, badge e CTAs (138/138 testes passando).
- **`e2e/design-system-and-stability.spec.ts`**: Atualização das validações de H1 e CTA principal do Hero (16/16 testes passando).
- **`PROJECT.md`**: Atualização do estado canônico da seção Hero.

## [0.0.46-hero-refino-visual-minimalista] - 2026-09-28

### Modificado
- **`src/components/sections/Hero.tsx`**: Refino minimalista e reorganização visual da seção Hero:
  - Centralização equilibrada e elegante da composição (badge, headline monocromática, supporting text e dual CTAs).
  - Remoção da linha intermediária de credenciais/tags (`+9 anos em sistemas críticos...`) acumulada abaixo dos CTAs, ampliando o respiro vertical e o protagonismo dos botões de ação e headline.
- **`src/components/sections/hero/HeroArchitecture.tsx`**: Reestruturação para uma representação sutil de topologia de sistemas distribuídos (`Client / Edge` → `Domain Services` → `Event Stream` → `Cloud & Data`):
  - Eliminação total de telemetria e números simulados (`14ms`, `2.500 req/s`, `99,9%`, badges redundantes de status).
  - Adoção de ícones discretos do Lucide React, tipografia técnica sóbria e acentos sutis na identidade EPM.
  - Implementação de desvanecimento suave na base do card (`bg-gradient-to-t from-background`) garantindo transição natural com o restante da página.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização dos testes unitários para validar a topologia limpa, ausência de telemetria artificial e interatividade dos nós arquiteturais (138/138 testes passando).
- **`specs/SPEC-046-hero-refino-visual-minimalista.md`**: Especificação do refino visual aprovada pelo PO.
- **`tasks/TASK-046-hero-refino-visual-minimalista.md`**: Rastreamento de execução e validação da TASK-046.
- **`reviews/QA-046.md`**: Relatório de QA e validação dos quality gates com retenção para gate de produção.

## [0.0.45-hero-engenharia-modernizacao] - 2026-09-28

### Adicionado
- **`src/components/sections/hero/HeroBadge.tsx`**: Componente modular de status/eyebrow com chip mono (`EPM DEVTECH`), texto institucional (`Engenharia de Software & Modernização`) e microinteração de seta com hover.
- **`src/components/sections/hero/HeroArchitecture.tsx`**: Console interativo de arquitetura de software e sistemas distribuídos (`sys-topology`), apresentando 4 nós arquiteturais fundamentais (Edge Gateway, API & BFF, Core Services & Events, Cloud & Persistence), métricas operacionais em tempo real (Cluster Online, 2.5K RPS, 99.9% SLA) e tags técnicas, 100% em código (React/Tailwind/SVG/Framer Motion), sem imagens externas ou WebGL.
- **`specs/SPEC-045-hero-engenharia-modernizacao.md`**: Especificação formal do novo Hero institucional da EPM DevTech aprovada pelo PO.
- **`tasks/TASK-045-hero-engenharia-modernizacao.md`**: Rastreamento de tarefas e checklist de execução SDD.
- **`reviews/QA-045.md`**: Relatório de QA e validação dos quality gates.
- **`e2e/hero-visual-validation.spec.ts`**: Suíte de validação visual e responsividade cobrindo 5 viewports (320px, 390px, 768px, 1280px, 1440px) e modos Dark/Light com verificação de overflow zero.

### Modificado
- **`src/components/sections/Hero.tsx`**: Reimplementação completa do Hero institucional baseando-se no layout estrutural do Hero 3 (21st.dev) adaptado para engenharia de software da EPM DevTech:
  - Headline 100% monocromática (`<h1>`): *"Engenharia de software para sistemas que precisam evoluir."*
  - Supporting copy: *"Arquitetura, desenvolvimento e modernização de software sob medida para empresas que precisam transformar processos complexos em sistemas confiáveis, escaláveis e sustentáveis."*
  - Dual CTA acessível: *"Falar sobre um projeto"* (`#contato`) e *"Conhecer a EPM"* (`#sobre`).
  - Microprova social sênior: `+9 anos em sistemas críticos • Cloud-native • APIs resilientes • Código limpo`.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Suíte de testes unitários atualizada para cobrir a nova headline, badge, CTAs, a11y e interatividade do console de arquitetura (cobertura superior a 96% nos componentes do Hero).
- **`e2e/design-system-and-stability.spec.ts`**: Atualização das asserções de H1 e CTAs do Hero (10/10 testes passando).
- **`PROJECT.md`**: Atualização do estado canônico da seção Hero e dos contadores de testes.

## [0.0.44-proxy-reverso-odontologia-demo] - 2026-09-22

### Adicionado
- **`vercel.json`**: Rewrites de proxy reverso para `/odontologia-demo` e `/odontologia-demo/:path*` apontando para o Worker Cloudflare `dentistry-demo.elessandrodev.workers.dev`, expondo a demonstração de odontologia sob a rota institucional `https://epmdevtech.com.br/odontologia-demo`.
- **`vercel.json`**: 4 headers de segurança AppSec aplicados a `/odontologia-demo/:path*`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

### Preservado
- **`vercel.json`**: Rewrite SPA `/(.*) → /index.html` mantido intacto e posicionado após as regras de proxy.

## [0.0.43-padronizacao-eyebrows-titulos-secoes] - 2026-09-10

### Adicionado
- **`src/components/ui/BrandChipIcon.tsx`**: Componente SVG reutilizável com traço nítido do chip da marca (dimensão de 15px, traço `#10B981`, sem fundo nem borda retangular, contendo chaves `{ }` e pinos de circuito).

### Modificado
- **`src/components/ui/SectionHeader.tsx`**:
  - Remoção completa das cápsulas ou pills anteriores com fundo e borda arredondada.
  - Adoção do padrão `BrandChipIcon` com alinhamento vertical ao centro e espaçamento de 7px (`gap-[7px]`).
  - Tipografia padronizada em cinza secundário (`text-[11.5px] font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400`).
  - Flexibilização da prop `title` como opcional e ajuste automático de espaçamentos verticais para evitar vazios em seções sem título ou subtítulo.
- **Títulos e Textos das Seções**:
  - **Prova Social & Autoridade (`src/components/sections/Authority.tsx`)**: Eyebrow `AUTORIDADE & RESULTADOS`, novo título `Métricas reais de quem confia na nossa engenharia.` e remoção do parágrafo.
  - **Sobre a EPM DEVTECH (`src/components/sections/About.tsx`)**: Eyebrow `SOBRE A EPM DEVTECH`, novo título `Engenharia de software com DNA prático e foco em resultado.` e parágrafo unificado em bloco único.
  - **Experiência por Setor (`src/components/sections/Sectors.tsx`)**: Eyebrow `SETORIAL`, novo título `Soluções desenhadas para a realidade de cada mercado.` e novo subtítulo conciso.
  - **Serviços (`src/components/sections/Services.tsx`)**: Eyebrow `SERVIÇOS`, novo título `Do diagnóstico à sustentação: ciclo completo de software.` e novo subtítulo.
  - **Stack Tecnológica (`src/components/sections/Technologies.tsx`)**: Eyebrow `STACK TECNOLÓGICA` posicionado diretamente acima da constelação, com remoção do título e subtítulo.
  - **Diferenciais (`src/components/sections/Differentials.tsx`)**: Eyebrow `DIFERENCIAIS`, novo título `Por que empresas escolhem a EPM DEVTECH.` e remoção do parágrafo.
  - **Dúvidas Frequentes (`src/components/sections/FAQ.tsx`)**: Eyebrow `FAQ`, novo título `Respostas diretas para as dúvidas mais comuns.` e novo subtítulo.
  - **Contato (`src/components/sections/Contact.tsx`)**: Eyebrow `FALE CONOSCO`, novo título `Vamos construir a solução ideal para o seu negócio.` e novo subtítulo.
- **Higienização Geral de Textos**:
  - Varredura e eliminação integral de travessões (`—`) e pontos e vírgulas (`;`) em toda a cópia textual do projeto (`Contact.tsx`, `FAQ.tsx`, `Index.tsx`, `llms-full.txt`, etc.).
- **Testes e E2E**:
  - Atualização dos testes unitários de todas as 8 seções e do `SectionHeader` (136/136 aprovados).
  - Atualização dos testes ponta a ponta Playwright para as novas headlines (10/10 aprovados).

## [0.0.42-scroll-to-top-neutro-sem-verde] — 2026-09-10

### Modificado
- **`src/components/ui/ScrollToTop.tsx`**:
  - Neutralização completa de cores no botão e tooltip para eliminar competição visual com os CTAs primários do site (WhatsApp e "Fale Conosco").
  - Substituição da borda verde (`border-emerald-500`) por borda fina e sóbria em tons neutros (`border border-zinc-200 dark:border-zinc-800` e hover em `hover:border-zinc-300 dark:hover:border-zinc-700`).
  - Substituição do ícone verde (`text-emerald-600 dark:text-emerald-400`) por tons neutros monocromáticos de alto contraste (`text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100`).
  - Atualização do tooltip para borda neutra (`border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300`).
  - Preservação da visibilidade condicionada ao scroll (>450px), fade suave de 300ms ease, ícone ChevronUp e elevação dinâmica no rodapé.
- **`src/components/ui/__tests__/ScrollToTop.test.tsx`**: Validação de ausência de classes verdes (`border-emerald-500`) e assertividade nas bordas neutras (`border-zinc-200`) (135/135 testes passando).

## [0.0.41-scroll-to-top-chevron-sem-glow] — 2026-09-10

### Modificado
- **`src/components/ui/ScrollToTop.tsx`**:
  - Troca do ícone de foguete (`Rocket`) por seta chevron para cima (`ChevronUp` da biblioteca `lucide-react`), mantendo o tamanho original de 20px e espessura nítida (`strokeWidth={2.5}`).
  - Remoção completa de halo luminoso (glow), sombra de pulso (`@keyframes scroll-top-pulse`), classes de blur e box-shadow.
  - Adoção de design flat limpo com fundo e borda alinhados às variáveis de tema do rodapé (`bg-white dark:bg-zinc-900`, `border border-emerald-500` / `#10B981`) sem cores hexadecimais fixas no código, adaptando-se com alto contraste aos modos light, dark e system.
  - Gatilho de visibilidade atualizado para `window.scrollY > 450` com transição suave de fade-in e fade-out (300ms ease), iniciando oculto.
  - Preservação da função de rolagem suave até o topo, z-index (50), posição fixa no canto inferior direito, tooltip e elevação adaptativa ao rodapé (`data-elevated`).
- **`src/components/ui/__tests__/ScrollToTop.test.tsx`**: Atualização dos testes unitários para validar o novo gatilho de 450px, a presença de `border-emerald-500` e a ausência de classes de glow e blur (135/135 testes passando).

## [0.0.40-footer-cnpj-copyright-e-remocao-travessoes-legais] — 2026-09-10

### Modificado
- **`src/components/sections/Footer.tsx`**: Remoção do bloco vertical de CNPJ da Coluna 1 e consolidação da identificação jurídica diretamente na linha de copyright do sub-footer (`© 2026 EPM DEVTECH  ·  CNPJ 60.710.574/0001-85. Todos os direitos reservados.`), preservando o layout limpo e desobstruído da coluna de identidade.
- **`src/components/legal/LegalModals.tsx`**: Remoção completa de todos os caracteres de travessão (`—`) nos títulos e textos dos Termos de Uso e da Política de Privacidade (LGPD), assegurando pontuação formal e ortografia pt-BR sem traços artificiais.
- **`src/components/sections/__tests__/Footer.test.tsx`**: Ajuste das asserções de testes para certificar a presença do CNPJ no copyright e a ausência do bloco vertical da coluna 1 (135/135 testes passando).


### Adicionado
- **Dados Cadastrais Oficiais no Rodapé (`src/components/sections/Footer.tsx`)**: Inclusão dos dados corporativos abaixo de "Toledo, Paraná." (Razão Social: `ELESSANDRO PRESTES MACEDO DESENVOLVIMENTO DE SOFTWARE LTDA`, CNPJ: `60.710.574/0001-85 · Matriz` e Nome Fantasia: `EPM DEVTECH (ME)`).
- **Modais de Termos de Uso e Política de Privacidade (`src/components/legal/LegalModals.tsx`)**: Componente com diálogos acessíveis (`Dialog` shadcn/ui / Radix UI) e scroll suave interno (`ScrollArea`), apresentando termos contratuais, propriedade intelectual, foro de Toledo/PR e diretrizes da LGPD (Lei nº 13.709/2018) com contato direto do DPO.
- **Links Legais no Sub-footer**: Inserção de gatilhos para abertura dos modais no lado direito da barra inferior, preservando o espaçamento de segurança para o botão `ScrollToTop` (`lg:pr-14`).

### Modificado
- **`src/components/sections/Footer.tsx`**: Remoção do bloco de retorno técnico em até 24 horas na coluna de contato e da frase de valor "Código limpo, arquitetura sólida e alta disponibilidade." no sub-footer.
- **`src/components/sections/__tests__/Footer.test.tsx`**: Atualização da suíte de testes unitários para validar a renderização dos dados cadastrais, a presença dos botões dos modais e a remoção dos textos obsoletos (135/135 testes passando).


### Modificado
- **`src/components/sections/Hero.tsx`**: Substituição do formato tradicional de badge em cápsula (`rounded-full`, fundo e borda) e remoção do ponto pulsante verde na tagline superior por um layout overline minimalista flanqueado por linhas decorativas horizontais (`h-px w-6 sm:w-10 md:w-12 bg-emerald-600/60 dark:bg-emerald-400/60 shrink-0` com `aria-hidden="true"`), inspirado na referência de design Quordix ("SELECTED PROJECTS").
- **Tipografia & Design System**: Aplicação de caixa alta e tracking expandido (`tracking-[0.2em] uppercase font-semibold text-xs sm:text-[13px]`) preservando 100% das cores institucionais do texto (`text-emerald-700 dark:text-emerald-400`) e entrada suave Framer Motion compatível com `prefers-reduced-motion`.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Adição de teste unitário comprovando a ausência do pill badge / dot pulsante e a presença do overline com linhas decorativas (135/135 testes passando).


### Adicionado
- **Headline em Duas Linhas Equilibradas**: Divisão harmoniosa da headline em 2 linhas ("Software sob medida construído" / "para escalar o seu negócio.") eliminando palavras órfãs e evitando quebras desconexas.
- **Revelação Escalonada de Letras no Título**: Efeito sequencial letra a letra onde a Linha 1 surge primeiro e a Linha 2 surge em seguida com transição elástica suave (`[0.16, 1, 0.3, 1]`).
- **Mecânica Magnética Letra a Letra (`MagneticLetter`)**: Efeito de física com amortecimento elástico (`useAnimationFrame` + `useSpring`) em cada caractere do H1, reagindo a interações de mouse e touch.
- **Subtítulo com Projeção Dinâmica Acompanhando o Cursor (`SubtitleWord`)**: Quando o cursor percorre o título ou subtítulo, as palavras verticalmente alinhadas à coluna do mouse ganham destaque tipográfico imediato (`font-weight: 700`, `opacity: 1.0`, contraste nítido), enquanto palavras afastadas permanecem em peso normal (400) e opacidade suave (0.45). No estado inicial, todas as palavras carregam 100% uniformes (zero cores estáticas automáticas).
- **Anéis Orbitais Decorativos e Glow Atmosférico da Marca (`RINGS`)**: 4 anéis concêntricos com satélites luminosos em rotação contínua nos polos do gradiente da marca (`logo-Photoroom.png`: Ciano Elétrico `#00D4FF` no anel interno e Verde Esmeralda `#10B981` no anel de realce) e aura central atmosférica no gradiente oficial (`.hero-brand-aura`: Ciano -> Turquesa -> Esmeralda) em Light Mode e Dark Mode, eliminando integralmente cores estranhas (laranja e pêssego).
- **Keyframes CSS de Órbita no `index.css`**: Animações `@keyframes hero-orbit` e `@keyframes hero-orbit-rev` com `will-change: transform`.
- **Suporte Nativo a `prefers-reduced-motion`**: Desativação graciosa de cálculos magnéticos, paralaxe e rotações contínuas para usuários com sensibilidade a movimento.
- **Detecção de Touch (`useTouch`)**: Otimização suave para dispositivos móveis e coarse pointer com suporte a `active:`.

### Modificado
- **`src/components/sections/Hero.tsx`**: Refatoração completa incorporando entrada sequencial, física Quordix, eliminação de cores estáticas duplicadas no subtítulo, alinhamento do glow de fundo ao título em Light Mode, eliminação de warnings do Framer Motion e remoção dos botões de CTA a pedido do PO.
- **Preservação de Títulos 100% Monocromáticos (SPEC-014)**: H1 mantido em duas linhas estritamente monocromáticas em `text-zinc-900 dark:text-white`, aprovado em 100% dos testes E2E do Playwright.
- **`src/components/sections/__tests__/Hero.test.tsx`**: Atualização dos mocks do Framer Motion (`forwardRef`, `useSpring`, `useMotionValue`) e validação da renderização dos nós interativos (100% aprovado).
- **`index.html`**: Adição de `<meta name="mobile-web-app-capable" content="yes" />` para sanar deprecation do Chrome.
- **`e2e/design-system-and-stability.spec.ts`**: Atualização dos testes de resiliência e validação de 10/10 testes passando.

## [0.0.36-robots-txt-llms-txt-ai-crawlers] — 2026-09-08

### Adicionado
- **Tags de Auto-descoberta LLM em `index.html`**: Inclusão de `<link rel="alternate" type="text/plain" href="/llms.txt" />` e `/llms-full.txt` no `<head>` para indexadores e agentes autônomos.
- **Rotas `/setores` e `/faq` no `public/sitemap.xml`**: Inclusão das novas rotas com prioridades 0.8 e 0.7 e atualização da data `lastmod` para `2026-09-08`.

### Modificado
- **`public/robots.txt`**: Formalização de permissão explícita para 16 rastreadores de IA generativa e busca semântica (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `Google-Extended`, `Googlebot`, `Bingbot`, `FacebookBot`, `Applebot-Extended`, `Applebot`, `Bytespider`, `CCBot`, `Diffbot`, `cohere-ai`), regras de `Allow` para `llms.txt`, `llms-full.txt` e `sitemap.xml`, e remoção de caracteres de travessão.
- **`public/llms.txt`**: Reestruturação alinhada à narrativa de 10 seções do site, resumo dos 4 setores de atuação, 6 serviços principais focados no problema real, relação das 10 perguntas da FAQ e consolidação das métricas factuais reais em pt-BR natural sem travessões.
- **`public/llms-full.txt`**: Expansão com alta densidade semântica para RAG, detalhamento da tríade operacional dos 4 setores, especificações dos 6 serviços, matriz de proficiência técnica da stack, íntegra das 10 perguntas do FAQ e diretrizes de engenharia com zero travessões.
- **`public/site.webmanifest`**: Padronização do nome para `EPM DEVTECH | Software House` (substituição de travessão).
- **`index.html` (JSON-LD)**: Sincronização do schema `FAQPage` com as 10 perguntas reais de quebra de objeções da FAQ e remoção de travessões de IA em todo o cabeçalho e dados estruturados.


## [0.0.35-reorganizacao-ux-ui-arquitetura-informacao] — 2026-09-08

### Adicionado
- **`src/components/sections/Sectors.tsx`** — Seção 4 dedicada ("Experiência por Setor") modularizada, preservando integralmente os 4 cards 3D isomórficos (`Indústria`, `Varejo`, `Educação`, `Energia`), seus mockups internos interativos (`MockupIndustria`, `MockupVarejo`, `MockupEducacao`, `MockupEnergia`) e animações escalonadas, com copywriting refinado na tríade *Contexto + Problema + Experiência*.
- **Rota `/setores`** — Suporte dedicado a scroll spy via `IntersectionObserver` e metadados SEO específicos em `src/pages/Index.tsx`.
- **Suíte de Testes `src/components/sections/__tests__/Sectors.test.tsx`** — 5 testes unitários cobrindo cards 3D, mockups, badges e renderização.
- **Suíte de Testes `src/components/sections/__tests__/FAQ.test.tsx`** — 6 testes unitários cobrindo perguntas de objeção, acordeão, categorias e acessibilidade.

### Modificado
- **Nova Narrativa Comercial da Página (10 Etapas)**:
  1. `Hero` → 2. `Autoridade` (reposicionada logo após Hero) → 3. `Sobre` → 4. `Setores` → 5. `Serviços` → 6. `Tecnologias` → 7. `Diferenciais` → 8. `FAQ` → 9. `Contato` → 10. `Rodapé`.
- **`src/components/sections/Hero.tsx`**: CTA primário atualizado para *"Falar com a engenharia"* (`#contato`), com acessibilidade e microprova social preservadas.
- **`src/components/sections/About.tsx`**: Narrativa focada em apresentação institucional, fundador Elessandro Prestes Macedo (+9 anos de experiência em sistemas críticos), liderança técnica e pilares de engenharia, com indicadores animados `CountUp`.
- **`src/components/sections/Services.tsx`**: Destaque explícito para o problema resolvido no rodapé de cada card e copywriting sênior.
- **`src/components/sections/FAQ.tsx`**: 10 perguntas estritamente focadas na remoção de objeções reais (Contratação, Sistemas Legados, Processo com SDD), eliminação de redundâncias com listas de serviços/stack/setores, e correção de contraste para padrão WCAG AAA em Light e Dark Mode.
- **`src/components/layout/Header.tsx`**: Menu de navegação atualizado com links para `Setores` e `FAQ`.
- **`src/components/sections/Footer.tsx`**: Coluna "Navegação" atualizada com `Setores de Atuação` e `Dúvidas Frequentes`, espelhando simetricamente a navegação do topo.
- **`src/pages/Index.tsx`**: Ordem DOM atualizada, rota `/setores` e scroll spy sincronizado.
- **Suíte de Testes Geral**: Expandida para 20 suítes e 134 testes passando, com 98.5% de cobertura total de código.


### Adicionado
- **`src/components/sections/FAQ.tsx`** — Nova seção visual interativa de Perguntas Frequentes (FAQ) com:
  - 10 perguntas estratégicas divididas em 3 categorias: Credibilidade & Autoridade, Serviços & Stack, Processo & Contratação
  - Badges coloridos por categoria
  - Componente Accordion acessível (shadcn/ui, WCAG AA, navegação completa por teclado)
  - Animação suave com Framer Motion e suporte a `prefers-reduced-motion`
  - Redação em pt-BR natural (sem travessões ou artificialismos)
  - CTA ao final com link direto para `/contato`
- **Rota `/faq`** — Suporte a rota de scroll spy e metadados dedicados em `src/pages/Index.tsx`

### Modificado
- **`index.html` (JSON-LD / Schema.org)**:
  - Schema `FAQPage` expandido de 7 perguntas genéricas para 10 perguntas altamente detalhadas com dados reais de projetos
  - Schemas de `Service` enriquecidos com métricas comprovadas por serviço: SIPREC/CAPES (10.000 usuários simultâneos, 2.500 RPS, <300ms latência, 448 IES), GENIN/ONS (100% integridade, deploy -60%, 99,9% uptime), SIGMA/Energia Pecém (+50% processamento, -35% falhas), Governo MT (650 escolas, 141 municípios, MTTR -50%), modernização de legado (56.400 linhas removidas, 2.399 testes automatizados)
  - Atributos `serviceOutput` adicionados para cada um dos 6 serviços catalogados
  - Schemas `ProfessionalService` e `Person` atualizados com competências técnicas completas (Oracle, Azure, Pest, SDD, SonarQube, IA aplicada)
- **`src/pages/Index.tsx`**:
  - 6 meta descriptions reescritas com foco em alta conversão utilizando o framework [Proposta de Valor] + [Métrica Real / Prova Social] + [CTA Claro]
  - Import dinâmico (lazy load) de `FAQ.tsx`
  - Entrada de metadados SEO para a rota `/faq`


### Adicionado
- **`index.html`** — Meta tags explícitas no `<head>` para garantir cor correta da barra de navegação
  no Chrome/Android desde o frame 1 da primeira visita (antes do `.webmanifest` ser lido pelo browser):
  - `<meta name="theme-color" content="#10B981" media="(prefers-color-scheme: dark)">` — barra verde em dark mode
  - `<meta name="theme-color" content="#10B981" media="(prefers-color-scheme: light)">` — barra verde em light mode
  - `<meta name="apple-mobile-web-app-capable" content="yes">` — habilita modo standalone no iOS Safari
  - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` — status bar translúcida no iOS

### Contexto
- **VERIF-001 concluída:** `sitemap.xml` indexado com sucesso pelo Google (confirmado pelo PO em 2026-09-08)
- `theme_color` já existia no `site.webmanifest` (`#10B981`), mas o manifesto só é lido após o parse completo
  do HTML. As meta tags no `<head>` garantem aplicação imediata, eliminando possível flash de cor no mobile.

## [0.0.32-geo-seo-auditoria-e-otimizacao] — 2026-09-07

### Adicionado
- **`public/llms-full.txt`** — Novo arquivo de contexto completo para LLMs com: stack detalhada,
  todos os serviços com descrição, métricas reais (99,9% uptime, 2.500+ RPS), setores atendidos
  (CAPES/MEC, ONS, Indústria, Governo), FAQ com 7 perguntas, diferenciais e links oficiais.

### Modificado
- **`public/robots.txt`** — Adicionados blocos explícitos para crawlers de IA: `GPTBot`,
  `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`,
  `Googlebot`, `FacebookBot` e `Bingbot`. Removida regra genérica `Disallow: /*.json$`.
- **`public/llms.txt`** — Expandido com métricas reais, setores atendidos, stack completa (incluindo
  Symfony, RabbitMQ, Kafka, Kubernetes), localização (Toledo/PR/Brasil), diferenciais técnicos e link
  para `llms-full.txt`.
- **`public/site.webmanifest`** — Corrigido `theme_color` de `#2979FF` (azul) para `#10B981`
  (verde oficial EPM DEVTECH), alinhando branding do PWA com o design system.
- **`public/sitemap.xml`** — `lastmod` atualizado de `2026-03-10` para `2026-09-07` em todas as
  URLs. Prioridade de `/servicos` ajustada de `0.8` para `0.9`.
- **`index.html` — JSON-LD (`<script type="application/ld+json">`):**
  - E-mail corrigido de `elessandrodev@gmail.com` para `elessandro@epmdevtech.com.br`
  - `telephone` adicionado: `+55-45-99917-8290`
  - `address` adicionado: Toledo, PR, Brasil
  - `@type: Service` individuais com `description` rica para cada um dos 6 serviços
  - `@type: FAQPage` adicionado com 7 perguntas frequentes relevantes ao negócio
  - `jobTitle` e `description` do `Person` enriquecidos
  - `knowsAbout` expandido (Symfony, Kubernetes, Clean Architecture, DDD, Microsserviços)
- **`index.html` — Meta tags Twitter:**
  - Adicionados `twitter:site` e `twitter:creator`
- **`src/pages/Index.tsx`** — Meta descriptions enriquecidas para todas as rotas:
  - `/sobre` — menciona o fundador, CAPES, ONS, Governo e Indústria
  - `/servicos` — menciona modernização de legados, microsserviços, DevOps e setores atendidos
  - `/tecnologias` — stack completa incluindo Symfony, PostgreSQL, Kubernetes, RabbitMQ e Kafka
  - `/diferenciais` — menciona CI/CD, arquitetura planejada e prazos cumpridos
  - `/contato` — inclui e-mail e WhatsApp corporativos

### Qualidade
- ESLint: 0 erros
- Vitest: 18/18 suites, 124/124 testes, 98.28% cobertura global
- Build: todos os chunks < 600KB (maior: react 142.26 KB)

## [0.0.31-strict-phone-validation-and-mask] — 2026-09-07

### Adicionado & Blindado
- **Validação Estrita de WhatsApp / Telefone com Zod (`src/lib/phone.ts`)**:
  - Rejeição expressa de caracteres alfabéticos ou texto aleatório ("wewqewqeq...")
  - Validação de DDDs legítimos de todo o Brasil (11 a 99) via `VALID_BRAZILIAN_DDDS`
  - Validação de comprimento e estrutura: 10 dígitos (fixo: DDD + 8 dígitos) ou 11 dígitos (celular: DDD + 9 dígitos iniciando com 9)
  - Rejeição de números formados por dígitos repetidos (`11111111111`)
  - Mensagem de erro clara padronizada: `"Informe um número de WhatsApp/Telefone válido com DDD (ex: 11 99999-9999)"`
  - Suporte resiliente a números precedidos por `+55`
- **Máscara de Entrada Dinâmica em Tempo Real (`formatBrazilianPhone`)**:
  - Autoformatação enquanto o usuário digita nos padrões `(99) 9999-9999` e `(99) 99999-9999`
  - Preservação de texto alfabético para permitir que o validador Zod forneça feedback explícito e visual imediato
- **Atualização dos Formulários (`ContactForm.tsx` e `Contact.tsx`)**:
  - Configuração do `useForm` com `mode: "onBlur"` e `reValidateMode: "onChange"` para retorno instantâneo
  - Exibição de mensagem de erro em vermelho (`text-destructive` / `<FormMessage />`)
  - Harmonização das regras dos demais campos: `name` ($\ge 3$ caracteres), `email` corporativo válido, `projectType` obrigatório, `message` ($\ge 15$ caracteres)
- **Qualidade & Testes**:
  - Nova suíte de testes unitários para o utilitário de telefone (`src/lib/__tests__/phone.test.ts`) com 15 testes aprovados
  - Atualização dos testes unitários de `ContactForm` e `Contact` (totalizando 124 testes unitários e 98.28% de cobertura de código)
  - Novo teste E2E no Playwright (`e2e/design-system-and-stability.spec.ts`) validando a máscara e o fluxo de erro/correção no navegador real (10/10 E2E aprovados)
- **Documentação SDD**: Registro de `SPEC-031`, `TASK-031` e `QA-031` com conformidade aos quality gates

## [0.0.30-modular-contact-form-shadcn] — 2026-09-07

### Adicionado
- **Componente Modular `ContactForm` com Shadcn/UI (`ContactForm.tsx`)**:
  - Implementação robusta e autocontida utilizando os wrappers oficiais do design system: `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>` e `<FormMessage>`
  - Validação estrita via schema Zod (`contactFormSchema`) com mensagens claras em português e inferência de tipos (`ContactFormData`)
  - Suporte aos 5 campos especificados: nome completo ($\ge 3$ caracteres), e-mail corporativo válido, telefone brasileiro flexível ($\ge 10$ dígitos numéricos), tipo de projeto via `<Select>` e mensagem detalhada ($\ge 10$ caracteres)
  - Microinterações de loading com spinner (`Loader2`) e estado de sucesso `"✓ Mensagem Enviada!"` (`CheckCircle2`)
  - Notificações visuais elegantes com `toast.success` e `toast.error` via Sonner
  - Suporte opcional a callback customizado `onSubmitSuccess` ou integração direta e resiliente com EmailJS
- **Suíte de Testes Unitários (`ContactForm.test.tsx`)**: 6 testes cobrindo renderização, validações de erro, submissão com sucesso, callback customizado e fallback de erro
- **Documentação SDD**: Registro formal de `SPEC-030`, `TASK-030` e `QA-030` com 100% dos quality gates aprovados

## [0.0.29-toast-positioning-and-contact-feedback] — 2026-09-07

### Otimização & UX/UI
- **Posicionamento Superior Central de Notificações Toast (`sonner.tsx`)**:
  - Reconfiguração do `Toaster` do Sonner para `position="top-center"` no desktop e mobile, eliminando a renderização na base da tela sobre o Rodapé e a colisão com o botão de ScrollToTop
  - Configuração de offset superior inteligente: `offset={{ top: "84px" }}` no desktop e `mobileOffset={{ top: "76px", left: "16px", right: "16px" }}` no mobile para garantir afastamento harmônico abaixo do Header fixo
  - Habilitação de botão de fechamento rápido (`closeButton`)
- **Microinteração de Confirmação Imediata no Botão de Envio (`Contact.tsx`)**:
  - Adicionado estado transitório `isSuccess` com temporizador de 4 segundos: ao confirmar o envio, o botão transiciona suavemente para `"✓ Mensagem Enviada!"` com ícone `CheckCircle2`
  - Fornece feedback instantâneo sob o cursor/toque do usuário no momento da submissão

### Adicionado
- **Documentação SDD**: Registro formal de `SPEC-029`, `TASK-029` e `QA-029` com validação de todos os Quality Gates
- **Testes Unitários Atualizados (`Contact.test.tsx`)**: Validação do estado e rótulo `"Mensagem Enviada!"` no botão

## [0.0.28-contact-emailjs-success-log-removal] — 2026-09-07

### Limpeza & Otimização
- **Remoção de Log de Sucesso do EmailJS no Console (`Contact.tsx`)**:
  - Eliminação do log informativo `console.info("[EmailJS] Enviado com sucesso:", result.status, result.text);` executado após envio bem-sucedido
  - Redução de ruído no DevTools e eliminação de vazamento de detalhes internos da infraestrutura em produção
  - Preservação integral do feedback visual amigável (`toast.success`), limpeza do formulário (`reset()`) e rastreabilidade técnica de falhas (`console.error`)

### Adicionado
- **Documentação SDD**: Registro de `SPEC-028`, `TASK-028` e `QA-028` com evidências de qualidade (100% testes e E2E aprovados)

## [0.0.27-contact-resilience-and-autofill] — 2026-09-07

### Corrigido
- **Mensagem Amigável no Toast de Falha de Envio e Fallback para WhatsApp (`Contact.tsx`)**:
  - Substituição da mensagem técnica crua da API (`error.text`) por aviso institucional polido com botão direto "Chamar no WhatsApp"
  - Detalhes técnicos da falha restritos ao `console.error` para auditoria do time de engenharia
- **Normalização Visual de Autofill do Navegador (`index.css`)**:
  - Neutralização do fundo sólido do WebKit/Blink em campos com preenchimento automático mantendo fundo transparente e cor de texto consistentes

### Adicionado
- **Documentação SDD**: Registro formal de `SPEC-027`, `TASK-027` e `QA-027`

## [0.0.26-header-layout-shift-specificity-fix] — 2026-09-07

### Corrigido
- **Eliminação Definitiva do Layout Shift no Header ao Abrir Dropdowns via Especificidade CSS (`index.css`)**:
  - Resolução da regressão onde o menu superior sofria estufamento para a direita ao abrir o seletor "Desafio ou Tipo de Projeto"
  - Diagnóstico: a biblioteca `react-remove-scroll-bar` injetava dinamicamente no `<head>` via `styleSingleton` uma regra `body[data-scroll-locked] { margin-right: 15px !important; overflow: hidden !important; }`, que vencia a regra CSS estática por ordem de cascata
  - Solução: aumento da especificidade para `(0, 1, 2)` usando `html body[data-scroll-locked]` e blindagem adicional `html body[data-scroll-locked] header { right: 0px !important; margin-right: 0px !important; }` com especificidade `(0, 1, 3)`
  - Resultado: o body mantém `margin-right: 0px` e `overflow: visible`, preservando 100% da estabilidade visual do Header e da página

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-026`, `TASK-026` e `QA-026` com validação de Quality Gates
- **Aprimoramento de Teste E2E (`design-system-and-stability.spec.ts`)**: Validação ponta a ponta dos estilos computados do `body` e do `header` durante a abertura do dropdown

## [0.0.25-contact-dropdown-alignment-refinement] — 2026-09-07

### Corrigido
- **Refinamento de Alinhamento Vertical do Dropdown de Contato (`Contact.tsx`)**:
  - Eliminação do gap de 4px entre o underline do campo "Desafio ou Tipo de Projeto" e a borda superior do menu flutuante de opções
  - Causa raiz: o componente base `select.tsx` aplica `data-[side=bottom]:translate-y-1` em modo `position="popper"`, criando o afastamento indesejado
  - Solução cirúrgica em `Contact.tsx`: adição de `sideOffset={0}` (API Radix Popper) e sobrescrita `data-[side=bottom]:translate-y-0` no `SelectContent`, sem modificar o arquivo base compartilhado
  - Alinhamento milimétrico confirmado: borda superior do dropdown encosta diretamente no underline do trigger com gap = 0px

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-025`, `TASK-025` e `QA-025` com matriz de conformidade e evidências de quality gates



### Corrigido
- **Eliminação de Layout Shift do Menu Superior / Header ao Abrir Dropdowns (`index.css`)**:
  - Resolução do salto horizontal e estufamento do Header fixo para a direita causado pelo bloqueio forçado de scroll do Radix UI (`react-remove-scroll`)
  - Adição de `scrollbar-gutter: stable;` no elemento `html`, garantindo reserva perpétua da calha de rolagem do navegador
  - Inserção de regra de contenção em `body[data-scroll-locked]`, preservando `overflow: visible !important` e zerando margens espúrias introduzidas pelo script de remoção de scrollbar
  - Garantia de estabilidade espacial milimétrica (variação $0\text{px}$) no Header, logotipo e links de navegação

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-024`, `TASK-024` e `QA-024`
- **Teste Automatizado de Estabilidade Visual (E2E)**: Validação no Playwright (`design-system-and-stability.spec.ts`) assegurando zero layout shift e conformidade visual contínua

## [0.0.23-contact-dropdown-overflow-fix] — 2026-09-06

### Corrigido
- **Confinamento Estrutural e Resolução de Overflow do Dropdown de Contato (`Contact.tsx` & `select.tsx`)**:
  - Correção do menu flutuante (dropdown) do campo "Desafio ou Tipo de Projeto" que invadia o bloco escuro ao lado quando expandido
  - Adição de `relative` e `w-full` no container pai da coluna esquerda
  - Configuração de `w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]` no `SelectContent` e `SelectViewport` (modo `popper`), travando milimetricamente a largura do painel suspenso na largura exata do trigger
  - Aplicação de `truncate` nas opções do `SelectItem` para evitar que textos extensos causem expansão horizontal
  - Preservação da elevação e do Radix Portal (`z-50 shadow-lg`), sem corte por containers ancestrais

### Adicionado
- **Documentação SDD Completa**: Registro de `SPEC-023`, `TASK-023` e `QA-023` com validação de Quality Gates e matriz de conformidade

## [0.0.22-contact-next-steps-guarantees] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-022`, `TASK-022` e `QA-022` com matriz de conformidade de requisitos e evidências de quality gates
- **Fluxo de Próximos Passos & Garantias no Card de Contato (`Contact.tsx`)**:
  - Substituição da lista redundante de canais pelo fluxo de alinhamento de expectativas
  - Título interno monocromático: "O que acontece a seguir?"
  - Texto de apoio: "Nosso processo é direto com a engenharia, sem intermediários comerciais:"
  - `Bloco 1 (Diagnóstico Técnico)`: Ícone `CheckCircle2` com avaliação de cenário, gargalos e viabilidade arquitetural
  - `Bloco 2 (Retorno em até 24 Horas)`: Ícone `Clock` com resposta rápida para agendamento de conversa técnica
  - `Bloco 3 (Sigilo e Segurança)`: Ícone `ShieldCheck` com garantia de confidencialidade de ideias e regras de negócio
  - `Chamada Rápida WhatsApp`: Divisor inferior com pergunta "Prefere atendimento imediato?" e link direto "Chamar no WhatsApp direto →"
- **Centralização Institucional no Rodapé**:
  - Manutenção dos canais institucionais e localização exclusivamente no Footer, eliminando duplicidade visual no site

### Alterado
- **Atualização das Suítes de Testes**:
  - Testes unitários atualizados em `Contact.test.tsx` com 99.26% de cobertura e 100% de sucesso
  - Suíte Playwright E2E 100% aprovada (8/8 testes)

## [0.0.21-contact-split-card-underline] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-021`, `TASK-021` e `QA-021` com matriz de conformidade e evidências de quality gates
- **Layout em Card Duplo Unificado (Split Card) na Seção Contato (`Contact.tsx`)**:
  - Container integrado de duas colunas no desktop (`lg:grid-cols-12`) com acabamento arredondado (`rounded-2xl`) e sombra suave (`shadow-xl`)
  - `Lado Esquerdo (Formulário, 7 colunas)`: Fundo refinado (`bg-white dark:bg-zinc-900`), título interno "Envie sua mensagem", inputs minimalistas de linha inferior (underline style) sem bordas laterais ou superiores e foco em verde esmeralda institucional
  - `Lado Direito (Canais, 5 colunas)`: Bloco contrastante de tom escuro (`bg-zinc-900 text-white dark:bg-zinc-950`), título interno "Canais de Atendimento", texto de apoio e lista de 4 canais com ícones circulares discretos em fundo escuro (`w-10 h-10 rounded-full bg-zinc-800 text-emerald-400`)
- **Canais Completos com Ícones Circulares**:
  - Localização: Toledo, Paraná (ícone `MapPin`)
  - WhatsApp direto: (45) 99917-8290 (ícone `Phone`)
  - E-mail corporativo: elessandro@epmdevtech.com.br (ícone `Mail`)
  - Tempo de resposta: Retorno em até 24 horas úteis (ícone `Clock`)
- **Botão de Envio (Slim CTA)**: Posicionado e alinhado à esquerda na base do formulário com estado de carregamento e microinteração de hover

### Alterado
- **Atualização das Suítes de Testes**:
  - Testes unitários de `Contact.test.tsx` atualizados para validar o Card Duplo Unificado e os canais de atendimento (100% de sucesso, 99.27% de cobertura)
  - Suíte E2E em `design-system-and-stability.spec.ts` 100% aprovada (8/8 testes) com calibração de canal de cor esmeralda

## [0.0.20-footer-4-columns-redesign] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-020`, `TASK-020` e `QA-020` com rastreabilidade de requisitos, evidências de quality gates e matriz de conformidade
- **Layout de 4 Colunas Monocromático no Rodapé (`Footer.tsx`)**:
  - `Coluna 1 (Identidade e Posicionamento)`: Logotipo adaptativo WebP (dark e light), texto de apoio técnico, localização em Toledo-PR com ícone `MapPin` e links discretos para GitHub e LinkedIn
  - `Coluna 2 (Soluções)`: Título monocromático "SOLUÇÕES" e 5 links para os serviços reais da empresa
  - `Coluna 3 (Navegação)`: Título monocromático "NAVEGAÇÃO" e 5 links para as âncoras da página institucional
  - `Coluna 4 (Contato)`: Título monocromático "CONTATO", e-mail direto, WhatsApp e SLA de resposta técnica em até 24 horas úteis
  - `Barra Inferior (Sub-footer)`: Divisor de 1px com copyright à esquerda, seletor de tema (`ThemeSwitcher`) ao centro e frase de autoridade à direita com respiro lateral para compatibilidade com o botão `ScrollToTop`

### Alterado
- **Padronização Tipográfica do Rodapé**:
  - Títulos das colunas em caixa alta com peso firme e tracking amplo (`text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100`)
  - Ausência total de spans bicolores e gradientes
  - Redação em PT-BR sem uso de travessões (`—` ou `–`)
- **Atualização das Suítes de Testes**:
  - Testes unitários atualizados em `Footer.test.tsx` com 100% de cobertura
  - Suíte E2E em `design-system-and-stability.spec.ts` 100% aprovada (8/8 testes)

## [0.0.19-contact-tech-slim-redesign] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-019`, `TASK-019` e `QA-019` com rastreabilidade de requisitos, evidências de quality gates e matriz de conformidade
- **Abordagem Consultiva no Cabeçalho de Contato**: Subtítulo que acolhe clientes em diferentes estágios de maturidade técnica, incentivando o diálogo preliminar

### Alterado
- **Redesign Tech Slim da Seção Contato (`Contact.tsx`)**:
  - Título H2 100% monocromático via `SectionHeader`: "Vamos entender o seu desafio" (`text-zinc-900` / `dark:text-white`)
  - Subtítulo humanizado e consultivo focado em entender necessidades e avaliar o melhor caminho técnico
  - Card principal refinado com efeito glass/backdrop (`bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md`), bordas ultrafinas (`border-zinc-200/80 dark:border-zinc-800/80`), `rounded-2xl` e padding equilibrado (`p-6 sm:p-7`)
  - Inputs e Select compactos (`h-10`, `rounded-lg`, fundo sutil `bg-zinc-50/60 dark:bg-zinc-950/50`), foco suave com anel esmeralda (`focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500`)
  - Textarea com `rows={4}` compacto no fluxo normal, preservando o modal expansivo de mensagem para descrições detalhadas
  - Botão de envio compacto (`h-11`, `bg-emerald-600 hover:bg-emerald-500`), animação de spinner com `Loader2` e microinteração de hover no ícone de envio
- **Canais Diretos de Contato**:
  - Mini-cards com ícones em containers esmeralda discretos (`bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400`)
  - "E-mail direto": `elessandro@epmdevtech.com.br`
  - "WhatsApp direto": `(45) 99917-8290`
  - "Tempo de resposta": `Retorno técnico em até 24 horas úteis`
- **Padronização das Opções de Tipo de Projeto (`PROJECT_TYPES`)**:
  - "Novo Sistema ou Aplicação Web"
  - "Modernização de Sistema Legado"
  - "APIs, Microsserviços e Integrações"
  - "Consultoria Técnica e Arquitetura"
  - "Outro Desafio"
- **Atualização das Suítes de Testes**:
  - Testes unitários atualizados em `Contact.test.tsx` (100% dos testes passando, 99.19% de cobertura)
  - Teste ponta a ponta em `e2e/design-system-and-stability.spec.ts` sincronizado com o novo heading (8/8 testes E2E passando)

## [0.0.18-differentials-technical-authority] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-018`, `TASK-018` e `QA-018` com rastreabilidade de requisitos e matriz de conformidade

### Alterado
- **Copywriting Técnico Sênior da Seção Diferenciais (`Differentials.tsx`)**:
  - `Card 01`: "Comunicação Transparente" (Tags: `ALINHAMENTO • PREVISIBILIDADE`), foco em alinhamento direto com quem executa a engenharia
  - `Card 02`: "Arquitetura Planejada" (Tags: `MICROSSERVIÇOS • CLEAN ARCHITECTURE`), escolhas arquiteturais sólidas para eliminar gargalos técnicos
  - `Card 03`: "Código Limpo e Testável" (Tags: `SOLID • TESTES AUTOMATIZADOS`), esteiras de testes rigorosas e estabilidade operacional
  - `Card 04`: "Padrões de Engenharia" (Tags: `SONARQUBE • CODE REVIEW`), análise estática de vulnerabilidades e observabilidade
  - `Card 05`: "Esteira DevOps e CI/CD" (Tags: `DEPLOY SEGURO • ROLLBACK`), pipelines automatizados e rollback imediato
  - `Card 06`: "Entregas Previsíveis" (Tags: `PRAZOS REAIS • QUALIDADE`), estimativas realistas sem atalhos técnicos
- **Semântica e Acessibilidade**:
  - Títulos dos cards elevados para a tag semântica `<h3>` mantendo a classe de estilo `.diff-card-title`
  - Subtítulo da seção atualizado com foco em rigor de engenharia, arquitetura escalável e entregas previsíveis
- **Preservação Rígida de Layout e Animações**:
  - Linha do tempo horizontal (pipeline animado), dots numerados de 01 a 06, setas indicadoras e ícones no rodapé mantidos 100% intactos
- **Atualização da Suíte de Testes**:
  - Atualização dos testes unitários em `Differentials.test.tsx` com 100% de cobertura

## [0.0.17-trust-bar-social-proof] — 2026-09-06

### Adicionado
- **Trust Bar / Faixa de Prova Social e Autoridade Técnica (`Authority.tsx`)**:
  - Substituição dos 5 cards verticais pesados por um componente compacto, leve e fluido posicionado estrategicamente antes da seção de Contato
  - **Bloco 1 (Métricas de Missão Crítica)**: `99,9%` Uptime em ambientes de produção, `2.500+ RPS` Throughput em arquiteturas distribuídas, `+448 IES e 650 Escolas` em plataformas educacionais e federais, e `Zero Perda` em integridade regulatória
  - **Bloco 2 (Validação Institucional)**: Selos tipográficos corporativos refinados com microinteração de hover para `CAPES • MEC`, `ONS (Operador Nacional do Sistema Elétrico)`, `Energia Pecém`, `Governo do MT (SEDUC)` e `Indústria e Manufatura (IoT Industrial e ERP)`
- **Documentação SDD Completa**: Registro formal de `SPEC-017`, `TASK-017` e `QA-017`

### Alterado
- **Título da Seção de Autoridade**:
  - Título H2 100% monocromático: "Autoridade técnica e impacto em missão crítica" (`text-zinc-900` / `dark:text-white`) com badge pill superior "Prova Social & Autoridade"
- **Otimização de Performance**:
  - Redução do tamanho de bundle do componente de 4.51 kB para 3.50 kB (gzip: 1.48 kB)
- **Atualização das Suítes de Testes**:
  - Atualização dos testes unitários em `Authority.test.tsx` (100% de cobertura) e sincronização da asserção de heading no Playwright E2E

## [0.0.16-services-technical-copywriting] — 2026-09-06

### Adicionado
- **Documentação SDD Completa**: Registro formal de `SPEC-016`, `TASK-016` e `QA-016` com rastreabilidade de requisitos, matriz de conformidade e evidências de qualidade

### Alterado
- **Cabeçalho da Seção Serviços (`Services.tsx`)**:
  - Título H2 100% monocromático via `SectionHeader`: "Soluções de engenharia de ponta a ponta" (`text-zinc-900` / `dark:text-white`)
  - Subtítulo refinado com foco em rigor arquitetural, testes automatizados e performance de negócios
- **Copywriting Técnico Sênior dos 6 Cards de Serviços**:
  - `Card 1`: "Desenvolvimento Web e Aplicações SPA" com foco em interfaces performáticas em Angular, Vue.js e React
  - `Card 2`: "APIs e Backends Escaláveis" com foco em APIs REST e arquiteturas orientadas a eventos em PHP (Laravel) e Node.js
  - `Card 3`: "Integrações e Microsserviços" com mensageria via RabbitMQ, Kafka e webhooks assíncronos
  - `Card 4`: "Arquitetura de Software" com microsserviços e monólitos modulares, Clean Architecture, DDD, padrões Hexagonal e BFF
  - `Card 5`: "Modernização e Evolução de Legados" com migração sem downtime via Strangler Fig Pattern
  - `Card 6`: "Consultoria Técnica e Code Review" com diagnóstico de gargalos, análise estática e auditoria
- **Padronização Tipográfica dos Cards**:
  - Títulos H3 padronizados em `font-semibold` (`fontWeight: 600`), tracking compacto e cor monocromática alinhada ao design system
- **Preservação Rígida de Layout e Mockups**:
  - Estrutura de grid 3x2, containers `.svc-card`, efeitos glow e as 6 ilustrações em código/diagramas mantidos 100% intactos
- **Atualização das Suítes de Testes**:
  - Atualização dos testes unitários em `Services.test.tsx` (100% de cobertura) e do teste E2E do Playwright em `design-system-and-stability.spec.ts`

## [0.0.15-about-authority-and-metrics] — 2026-09-06

### Adicionado
- **Suporte a Decimais em Animações Numéricas (`CountUp` / `AnimatedStat`)**: Implementada prop `decimals` com formatação PT-BR (vírgula decimal) para animação fluida do `99,9% Uptime em Produção` tanto em runtime quanto em ambiente de testes
- **Documentação SDD Completa**: Registro formal de `SPEC-015`, `TASK-015` e `QA-015` com evidências completas de cobertura e validação

### Alterado
- **Autoridade Técnica e Storytelling Institucional (`About.tsx`)**:
  - Redação reconstruída com foco na trajetória sênior e de Tech Lead do fundador, destacando governança de sistemas complexos, APIs resilientes e arquitetura orientada a microsserviços
  - Integração de IA assistida sob Spec-Driven Development (SDD) para produtividade e previsibilidade
- **Novas Métricas de Alto Impacto**:
  - `+9 Anos de Experiência` (fundação e liderança técnica sólida)
  - `4 Setores Críticos` (conexão direta com os 4 cases de destaque)
  - `99,9% Uptime em Produção` (indicador quantitativo de confiabilidade operacional)
- **Alinhamento dos 4 Cards de Setores Estratégicos**:
  - `01 Indústria`: Sistemas de chão de fábrica, rastreabilidade IoT e integração direta com ERPs legados
  - `02 Varejo`: Motores de recomendação, pipelines de checkout resilientes e e-commerces de alto tráfego
  - `03 Educação`: Plataformas distribuídas de alta concorrência para programas federais (CAPES/MEC)
  - `04 Energia`: Telemetria em tempo real, monitoramento crítico de ativos e dados regulatórios (ONS/Pecém)
- **Preservação Rígida de Layout & CSS 3D**:
  - Estrutura de grid/flex, classes de posicionamento staggered, cartões 3D com efeito flutuante (`about-card`) e gradientes de borda preservados 100% intactos
- **Tipografia e Copywriting PT-BR**:
  - Título H2 100% monocromático via `SectionHeader` ("Engenharia de software com excelência técnica comprovada")
  - Eliminação absoluta de travessões (`—` / `–`) e vícios de IA

## [0.0.14-monochromatic-titles] — 2026-09-06

### Adicionado
- **Asserção Automatizada de Títulos Monocromáticos no E2E**: Novo teste ponta a ponta no Playwright garantindo que nenhum título `h1`, `h2` ou `h3` contenha classes coloridas de verde (`text-emerald-*`, `text-green-*`, `text-teal-*`, `text-primary`) ou elementos de gradiente
- **Documentação SDD Completa**: Registro formal de SPEC-014, TASK-014 e QA-014

### Alterado
- **Eliminação Definitiva de Títulos Bicolores**:
  - Remoção de tags `<span>` verdes (`text-emerald-600 dark:text-emerald-400`) de todos os títulos em Hero, Serviços, Tecnologias, Diferenciais, Contato, Sobre e Autoridade
  - Adoção estrita de monocromatismo puro nos títulos: `text-zinc-900` em Light Mode e `dark:text-white` em Dark Mode do início ao fim
  - Restrição da cor primária de destaque (verde esmeralda) exclusivamente a badges superiores, CTAs primários e estados de foco/pulso
- **Refinamento da Badge do Cabeçalho (`SectionHeader` e `Hero`)**:
  - Ajuste de dimensões para `px-3 py-1 mb-4 rounded-full uppercase tracking-wider font-semibold text-xs`
  - Subtítulos consolidados em `max-w-2xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed`

## [0.0.13-typography-and-copywriting] — 2026-09-06

### Adicionado
- **Componente Reutilizável `SectionHeader` (`src/components/ui/SectionHeader.tsx`)**: Centralização do contrato de design tipográfico de seções com suporte nativo a tags `h1`/`h2`, alinhamento `center`/`left`, badges responsivas com classes dinâmicas para Dark e Light mode, e subtítulos fluidos
- **Suíte de Testes Unitários de Tipografia (`SectionHeader.test.tsx`)**: 100% de cobertura com validação de renderização semântica, alinhamento, classes de tema claro/escuro e badges
- **Documentação SDD Completa**: Registro formal de SPEC-013, TASK-013 e QA-013 com evidências de qualidade

### Alterado
- **Linearidade Tipográfica Rigorosa**:
  - Remoção de inconsistências visuais de pesos mistos (`font-light` vs `font-semibold`) em títulos de todas as seções (Hero H1, Serviços H2, Tecnologias H2, Diferenciais H2, Contato H2, Sobre H2, Autoridade H2), adotando `font-bold` homogêneo com destaques em verde esmeralda institucional (`text-emerald-600 dark:text-emerald-400`)
  - Padronização de badges de overline: `uppercase tracking-wider font-semibold text-xs sm:text-sm` com contraste verificado em Dark (`emerald-950/50` / `emerald-800/60` / `emerald-400`) e Light (`emerald-50` / `emerald-200/70` / `emerald-700`)
  - Padronização dos subtítulos e corpos de texto: `font-normal text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400`
- **Erradicação Total de Travessões (`—` / `–`)**:
  - Eliminação de travessões de IA em mockups de serviços, cards de diferenciais, formulário de contato, projetos de autoridade e metatags SEO em `index.html` e `Index.tsx`, substituindo por pontuação natural de PT-BR (dois-pontos, vírgulas, parênteses e pontos finais)
- **Microcopy Direto & B2B**:
  - Botões de conversão e chamadas atualizados com imperativos claros ("Falar com especialista", "Ver serviços", "Enviar mensagem")

## [0.0.12-scroll-to-top-ux] — 2026-09-06

### Adicionado
- **Elevação Dinâmica no Rodapé (Smart Docking)**: Detecção automática da visibilidade do rodapé (`IntersectionObserver` com observação de mutações e rolagem) elevando o botão de `bottom-6 md:bottom-8` (24-32px) para `bottom-20 md:bottom-24` (80-96px)
- **Ajuste de Safe Area no Rodapé**: Margem de respiro `lg:pr-14` adicionada na linha de copyright para blindagem total contra sobreposições
- **Testes Unitários Dedicados**: Criação de `ScrollToTop.test.tsx` com 100% de aprovação (testando visibilidade ao rolar, acionamento do clique suave e docking do footer)
- **Teste End-to-End no Playwright**: Validação automatizada em navegador real garantindo ausência de colisão com o copyright
- Documentação do ciclo SDD: SPEC-012, TASK-012 e QA-012 registrados

### Alterado
- **Reorientação da Tooltip**: Tooltip alterada de `side="left"` para `side="top"`, abrindo verticalmente para a área livre acima do botão em vez de cruzar horizontalmente a linha de texto
- **Harmonização Visual da Marca**: Atualização das cores e sombras do botão para a paleta primária verde esmeralda institucional (`hsl(var(--primary))`)

## [0.0.11-hero-commercial-positioning] — 2026-09-06

### Adicionado
- **Tagline Superior no Hero**: "ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO" com badge minimalista e indicador pulsante na cor primária da marca
- **Dual CTA (Ações de Alta Conversão)**: Botão primário "Falar sobre meu projeto" direcionando para `#contato` e botão secundário "Conhecer serviços" direcionando para `#servicos`
- **Microprova Social e Credenciais Técnicas**: "+9 anos de experiência em sistemas críticos • Arquiteturas cloud-native • APIs resilientes • Código limpo" com ícone `ShieldCheck`

### Alterado
- **Headline (H1)**: Atualizado para "Software sob medida construído para escalar o seu negócio." mantendo sofisticação monocromática e contraste por peso
- **Subtítulo**: Atualizado para "Da concepção à infraestrutura: desenvolvemos sistemas web, APIs resilientes e arquiteturas de alta performance preparadas para acompanhar o crescimento da sua empresa."
- **Remoção Completa de Gradientes**: Eliminado `bg-gradient-hero` e os orbs coloridos desfocados (`blur-[128px]`) em ambos os modos (Dark e Light), adotando fundo sóbrio e limpo `bg-background noise`
- Documentação do ciclo SDD: SPEC-011, TASK-011 e QA-011 registrados

## [0.0.10-adaptive-logo] — 2026-09-06

### Adicionado
- Assets vetoriais e rasterizados de alta fidelidade para o logotipo em Modo Claro: `logo-epm-devtech-light-xs.webp` (149x50 px, ~5.2 KB), `logo-epm-devtech-light-sm.webp` (300x101 px, ~12.4 KB) e PNGs correspondentes
- Preload condicional com `media="(prefers-color-scheme: ...)"` em `index.html` para LCP instantâneo em ambos os temas
- Teste E2E no Playwright (`e2e/design-system-and-stability.spec.ts`) validando comutação dinâmica do logotipo entre Dark e Light Mode e ausência de moldura escura

### Alterado
- **Header (`src/components/layout/Header.tsx`)**: Remoção completa da classe paliativa `bg-gray-900` e introdução de renderização adaptativa CSS com variantes dark/light
- **Footer (`src/components/sections/Footer.tsx`)**: Remoção da moldura `bg-gray-900` e suporte nativo ao tema claro com fundo 100% transparente
- Preservação da árvore de acessibilidade com `alt="EPM DEVTECH"` único e `aria-hidden="true"` na variante do tema oposto, evitando anúncios duplicados em leitores de tela
- Documentação do ciclo SDD: SPEC-010, TASK-010 e QA-010 devidamente registrados

## [0.0.9-tech-constellation] — 2026-09-05

### Adicionado
- Novo componente **`TechConstellation`** (`src/components/sections/TechConstellation.tsx`) substituindo o marquee tradicional da seção "Stack Tecnológica"
- Visual de grafo de tecnologias organizado por categorias conectadas por trilhas estilo circuito impresso (PCB) com pulsos animados de fluxo de dados
- Interação *Focus & Context*: destaque visual do nó selecionado e conexões diretas via hover, foco por teclado e clique/touch, esmaecendo nós não relacionados
- **Painel Interativo de Arquitetura (`tech-details-panel`)**: Exibição detalhada no rodapé da constelação contendo papel arquitetural, categoria e fluxo de conexões de cada tecnologia
- Rótulos de categoria desacoplados e centralizados em pills de alto contraste, eliminando qualquer oclusão com os nós ou circuitos
- Nomes das tecnologias integrados nos nós em desktop e layout clean touch-first otimizado em mobile
- Descrições arquiteturais para todas as 24 tecnologias em `buildConstellationLayout.ts`
- Integração com `Tooltip` do shadcn/ui (`@/components/ui/tooltip`)
- Utilitário desacoplado de cálculo geométrico determinístico `src/lib/buildConstellationLayout.ts` com suporte a layout responsivo Desktop e Mobile
- Suíte de testes unitários (`buildConstellationLayout.test.ts` e `TechConstellation.test.tsx`) mantendo cobertura em 98.13% (91/91 testes passando)
- Testes ponta a ponta Playwright para grafo e painel de detalhes (6/6 testes passando)
- Documentação SDD: SPEC-009, TASK-009 e QA-009 atualizados


### Adicionado
- Automação de testes End-to-End (E2E) com **Playwright** (`@playwright/test`) validando estabilidade, ausência de flickers, conformidade de monocromatismo e navegação
- Script `npm run test:e2e` integrado ao `package.json`
- SPEC-008, TASK-008 e QA-008 documentados e aprovados pelo PO

### Alterado
- **Design System & Identidade Visual**: Substituição integral da cor primária azul pelo **Verde Oficial da EPM DEVTECH** (`#10B981` / Emerald 500, HSL `158 64% 42%` no Dark Mode e `158 75% 36%` no Light Mode) com contraste WCAG AA >= 4.5:1
- **Títulos 100% Monocromáticos**: Removidos `text-gradient` e estilos multicolores de todos os headings (`Hero`, `About`, `Services`, `Technologies`, `Differentials`, `Authority`, `Contact`). Contraste aplicado estritamente através do peso tipográfico (`font-light` vs `font-semibold`) em `text-foreground`
- **Harmonização Tipográfica**: Textos corridos e parágrafos padronizados em `Geist Sans`, reservando `Geist Mono` para dados técnicos, números e código
- Atualização das variáveis e gradientes de destaque para o verde esmeralda em `src/index.css` e `index.html`

### Corrigido
- Eliminado o bug de flicker / duplicação de título no Hero causado por skeleton estático concorrente no `index.html`
- Resolvida duplicação de ID `#servicos` e normalizado o ciclo de vida dos nós no `LazySection` e fallbacks do `Suspense`


## [0.0.4-treemap] — 2026-08-28

### Adicionado
- Critical inline CSS no `<head>` do `index.html` para renderização imediata do tema escuro no frame 1 (FCP acelerado)
- `<link rel="modulepreload" href="/src/main.tsx" />` para parsing JS prioritário
- Desacoplamento assíncrono com `React.lazy` + `Suspense` em `App.tsx` para `CookieBanner`, `Toaster`, `Sonner`, `Analytics` e `SpeedInsights`
- Redução de 67% no tamanho do chunk inicial `index.js` (101 KB → 32.8 KB)
- SPEC-003, TASK-003 e QA-003

### Corrigido
- Postergação da inicialização do `CookieBanner` para 3.5s evitando colisão de métrica com o LCP do Hero
- Adição de `fetchpriority="high"` e `loading="eager"` no logo do Header

## [0.0.3-perf] — 2026-08-28

### Adicionado
- Otimização do logo para WebP (`public/logo-emp-dev-tech-sm.webp` de 9.5 KB contra 134 KB original — economia de 93%)
- Atributos `width={145}` e `height={49}` explícitos nas tags `<img>` do Header e Footer
- Formato Markdown com links canônicos `[Título](URL)` no `public/llms.txt` (Lighthouse Agentic Navigation 3/3)
- SPEC-002, TASK-002 e QA-002 registrados no framework SDD

### Corrigido
- CLS no Hero eliminado (0.155 → 0.00) com renderização de texto estável e aceleração do LCP
- Contraste de botões primários (`--primary`): ajustado para HSL(221.2, 83.2%, 48%) garantindo taxa de contraste 5.22:1 (WCAG AA) com texto branco
- Animação de estatísticas no componente About otimizada para a thread do compositor

## [0.0.2-perf] — 2026-08-28

### Adicionado
- `public/llms.txt` seguindo spec llmstxt.org
- Preconnect + dns-prefetch para `cdn.jsdelivr.net` e `cdn.simpleicons.org`
- `content-visibility: auto` nas seções below-the-fold
- `will-change: transform` no `.tech-band-track` e `@media (prefers-reduced-motion)`
- SPEC-001, TASK-001 e QA-001

### Corrigido
- Contraste `muted-foreground` em light mode: 46.9% → 38% lightness
- `font-display` da fonte Geist: `optional` → `swap`

## [0.0.1-sdd] — 2026-08-28

### Adicionado
- Estrutura do Universal SDD aplicada ao projeto
- `PROJECT.md` — documento canônico do estado do projeto
- `AGENTS.md` — protocolo para agentes de IA e colaboradores
- `GEMINI.md` — protocolo específico para o agente Gemini/Antigravity
- Diretórios SDD: `/agents`, `/workflows`, `/profiles`, `/knowledge`, `/standards`, `/templates`, `/specs`, `/tasks`, `/reviews`, `/adr`, `/docs`
- Templates: SPEC, TASK, REVIEW, QA
- Standards: testing, quality-gates, ux-ui, accessibility
- ADRs: 001 a 005 documentando as decisões arquiteturais existentes
- Workflows: feature.md com o fluxo completo de desenvolvimento
- Knowledge base: stack.md e conventions.md

---

## [0.0.0] — 2026-08

### Adicionado
- Landing page institucional EPM DEVTECH
- Stack: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- Seções: Hero, About, Services, Technologies, Differentials, Authority, Contact, Footer
- Header com navegação responsiva e scroll spy
- SEO dinâmico por seção via react-helmet-async
- Dark/Light mode com next-themes
- Formulário de contato via EmailJS
- Cookie banner
- CursorOrb e ScrollToTop
- Suíte de testes com Vitest + React Testing Library (>90% cobertura)
- Deploy na Vercel
- Docker e Docker Compose para desenvolvimento local
- Bundle splitting manual via Vite manualChunks
