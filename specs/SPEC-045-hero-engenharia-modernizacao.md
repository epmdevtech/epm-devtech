# SPEC-045 — Implementação do Hero EPM DEVTECH (Engenharia de Software & Modernização)

| Campo         | Valor                                                                                             |
|---------------|---------------------------------------------------------------------------------------------------|
| **ID**        | SPEC-045                                                                                          |
| **Título**    | Novo Hero Institucional — Estrutura Hero 3 (21st.dev) Adaptada para Engenharia de Software EPM    |
| **Prioridade**| Alta (Posicionamento Estratégico, UI/UX, Autoridade Técnica, Conversão)                           |
| **Origem**    | Demanda PO (Prompt Engineer — Implementação do Hero EPM DevTech)                                  |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                                    |
| **Status**    | ✅ Aprovada pelo PO                                                                               |
| **Data**      | 2026-09-28                                                                                        |

---

## 1. Contexto e Motivação

O site institucional da **EPM DEVTECH** (`https://epmdevtech.com.br/`) precisa comunicar com clareza imediata seu posicionamento como **empresa de engenharia de software e modernização de sistemas**, afastando qualquer percepção de agência de marketing ou estúdio genérico de criação de sites.

Adotaremos a estrutura e hierarquia visual de composição inspirada no componente `Hero 3` da 21st.dev, adaptando-o integralmente para:
1. A stack tecnológica existente (React 18, Vite, TypeScript 5, Tailwind CSS 3, shadcn/ui, Framer Motion, Lucide React).
2. A identidade visual canônica da EPM DEVTECH (tokens semânticos, paleta com verde esmeralda institucional `#10B981`, suporte nativo a Light/Dark Mode, títulos 100% monocromáticos conforme SPEC-014).
3. A direção de copy estratégica focada em engenharia e arquitetura de sistemas.
4. Um elemento visual central que represente **arquitetura de software, sistemas distribuídos, cloud e integração**, construído inteiramente em código (sem imagens externas, WebGL ou vídeos).

---

## 2. Requisitos Técnicos e Contrato Visual

### 2.1. Copywriting e Hierarquia
- **Eyebrow / Status Badge**:
  - Padrão estrutural do Hero 3 com container de badge elegante (`group flex w-fit items-center gap-2.5 rounded-sm border bg-card/80 p-1 shadow-xs`).
  - Chip interno com indicador monospaçado: `EPM DEVTECH`.
  - Texto de apoio: `Engenharia de Software & Modernização`.
  - Divisor vertical sutil e ícone `ArrowRight` com microinteração no hover apontando para a seção `#sobre`.
- **Headline Principal (`<h1>`)**:
  - Texto canônico: `Engenharia de software para sistemas que precisam evoluir.`
  - Tipografia: 100% monocromática (`text-foreground`), sem gradientes no texto, peso `font-bold`, escala responsiva fluida (`text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]`), `leading-[1.15]`.
- **Supporting Text (`<p>`)**:
  - Texto canônico: `Arquitetura, desenvolvimento e modernização de software sob medida para empresas que precisam transformar processos complexos em sistemas confiáveis, escaláveis e sustentáveis.`
  - Cor: `text-muted-foreground`, tipografia confortável (`text-base sm:text-lg md:text-xl`), max-w-2xl a max-w-3xl.
- **Ações Comerciais (Dual CTA)**:
  - **CTA Principal**: Botão primário com rótulo `Falar sobre um projeto`, levando à seção `#contato`, com ícone `ArrowRight` no final.
  - **CTA Secundário**: Botão outline (`variant="outline"`) com rótulo `Conhecer a EPM`, levando à seção `#sobre`, com ícone `Code2` ou `Layers`.

### 2.2. Elemento Visual Central: Representação de Arquitetura de Software
- Em substituição às capturas de tela genéricas do componente de referência da 21st.dev, criaremos o componente `HeroArchitecture`:
  - Moldura de alta fidelidade: container com borda sutil (`rounded-xl border border-border bg-card/80 shadow-2xl backdrop-blur-md p-4 sm:p-6 overflow-hidden`).
  - Barra de status de engenharia:
    - Indicador de status operacional (`High-Availability Distributed Architecture`).
    - Métricas em tempo real/estáticas: `Uptime 99.9%`, `P99 Latency <25ms`, `Event-Driven`.
  - Diagrama visual de camadas de engenharia (Frontend / Edge → API Gateway / BFF → Microservices & Event Stream → Data & Cloud Resilience).
  - Trilhas de pulso/sinal animadas e fluxos conectando as camadas com acento no verde institucional (#10B981) e ciano elétrico (#00D4FF).
  - Sem imagens externas, sem WebGL, sem vídeos, 100% CSS/React com SVG vetorial inline e suporte completo a `prefers-reduced-motion`.

### 2.3. Responsividade e Performance
- Responsivo em 320px, 375px, 390px, 768px, 1024px, 1280px e 1440px+.
- Zero overflow horizontal (`max-w-full`, contenção visual estrita).
- Animações leves via Framer Motion e transições CSS de `transform` e `opacity`.
- Cobertura de testes ≥ 90% na suíte do componente.

---

## 3. Escopo Detalhado

### IN
- `src/components/sections/Hero.tsx`: Nova implementação da seção Hero seguindo a estrutura Hero 3 e tokens da EPM DEVTECH.
- `src/components/sections/hero/HeroBadge.tsx`: Subcomponente de status/eyebrow.
- `src/components/sections/hero/HeroArchitecture.tsx`: Subcomponente visual de arquitetura técnica de software.
- `src/components/sections/__tests__/Hero.test.tsx`: Testes unitários atualizados cobrindo a nova headline, badge, CTAs e a11y.
- `e2e/design-system-and-stability.spec.ts`: Atualização das validações de H1 e CTAs do Hero.
- `PROJECT.md` e `CHANGELOG.md`: Registro da evolução e release notes.

### OUT
- Não alterar o Header (`src/components/layout/Header.tsx`).
- Não alterar o Footer (`src/components/sections/Footer.tsx`).
- Não alterar outras seções da landing page (`About`, `Sectors`, `Services`, `Contact`, etc.).
- Não adicionar bibliotecas externas adicionais (sem Next.js, sem Three.js, etc.).
