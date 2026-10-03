# SPEC-096 — Refatoração da Experiência Tipográfica, Espacial e Textual Editorial (Padrão B2B Alto Nível)

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX Design / Design System / Tipografia Fluida / Tailwind CSS

---

## 1. Contexto e Motivação

O site oficial da EPM DevTech evoluiu significativamente em arquitetura, roteamento, humanização textual e calibração de contraste no Dark e Light Mode (SPECs 060 a 095). Contudo, a experiência visual ainda faz uso de classes tipográficas discretas (`text-4xl sm:text-5xl lg:text-6xl`) e espaçamentos fixos por breakpoint (`py-16 sm:py-20 md:py-24 lg:py-28`), resultando em saltos bruscos entre viewports e oportunidades de aprimoramento na imponência editorial.

Inspirando-se nos padrões de design editorial maduro, sóbrio e tipográfico de referências globais de engenharia de software e SaaS B2B (como **Stripe**, **Codeminer42** e **Vercel**), esta especificação define a refatoração do sistema tipográfico e espacial do projeto, implementando:
1. **Escala Tipográfica Fluida com `clamp()` e `letter-spacing` calibrado** para display, títulos, subtítulos, corpo e eyebrows.
2. **Container Global Unificado e Proporcional** (`max-w-[1280px] w-[min(100%-48px,1280px)] mx-auto px-0`, mobile `w-[min(100%-32px,1280px)]`).
3. **Respiro Vertical Sistêmico e Fluido entre Seções** (`py-[clamp(4.5rem,8vw,8rem)]`).
4. **Controle Rigoroso de Largura de Linha (Measure / Readability)**: limites em `ch` (`58ch` para parágrafos do Hero, `65ch` para textos institucionais e `20ch` para títulos quando aplicável).
5. **Eyebrows Editoriais Limpos**: ausência total de molduras/caixas artificiais de IA, com tipografia técnica precisa.
6. **Preservação Integral da Identidade da Marca**: paleta ciano/esmeralda, monocromatismo estrito dos títulos (SPEC-094), WCAG AA/AAA e harmonia em Dark e Light Mode.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Configuração Tipográfica Global (`tailwind.config.ts` & `src/index.css`)**:
   - Ajustar a família de fontes primária para priorizar `Inter` com fallbacks robustos (`Inter`, `Geist`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`).
   - Adicionar classes utilitárias ou extensões para a escala editorial fluida:
     * **Display / Hero H1:** `text-[clamp(3.25rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.055em]`
     * **Headings de Seção H2:** `text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.045em]`
     * **Subheadings / Card Headers H3:** `text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.15] tracking-[-0.025em]`
     * **Corpo de Texto (Body / Parágrafos):** `text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.65] tracking-[-0.01em]`
     * **Eyebrows / Overlines:** `text-[0.8rem] font-semibold tracking-[0.04em] text-text-brand uppercase leading-[1.3] mb-3 block select-none`
   - Configurar utilitário de container editorial unificado em `src/index.css`:
     `w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] max-w-[1280px] mx-auto px-0`

2. **Refatoração do `SectionWrapper` (`src/components/ui/SectionWrapper.tsx`)**:
   - Atualizar padding vertical de seção de `py-16 sm:py-20 md:py-24 lg:py-28` para o ritmo fluido `py-[clamp(4.5rem,8vw,8rem)]`.
   - Atualizar o container interno para a largura proporcional unificada `w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] max-w-[1280px] mx-auto px-0`.

3. **Refatoração dos Componentes de Cabeçalho (`SectionHeader.tsx` & `PageHeader.tsx`)**:
   - **`SectionHeader.tsx`**:
     * Eyebrow: `text-[0.8rem] font-semibold tracking-[0.04em] text-text-brand uppercase leading-[1.3] mb-3 inline-flex items-center gap-2 select-none`.
     * Título H2: `text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.045em] text-primary [text-wrap:balance]`.
     * Subtítulo: `text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.65] tracking-[-0.01em] text-secondary max-w-[65ch] mx-auto [text-wrap:balance]`.
   - **`PageHeader.tsx`**:
     * Container: `w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] max-w-[1280px] mx-auto px-0`.
     * Eyebrow: tipografia editorial limpa sem caixas.
     * Título H1: `text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.05em] text-primary [text-wrap:balance]`.
     * Descrição: `text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65] tracking-[-0.01em] text-secondary max-w-[65ch]`.

4. **Refatoração do Hero da Home (`src/components/sections/Hero.tsx`)**:
   - Container: `w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] max-w-[1280px] mx-auto px-0`.
   - Eyebrow: tipografia técnica `text-[0.8rem] font-semibold tracking-[0.04em] text-text-brand uppercase leading-[1.3] mb-4`.
   - H1 Display: `text-[clamp(3.25rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-primary mb-6 [text-wrap:balance]`, 100% monocromático sem quebras artificiais `<br>`.
   - Parágrafo de valor: `text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.65] tracking-[-0.01em] text-secondary max-w-[58ch] mb-8`.
   - CTA primário mantido com tap target de alta conversão (altura mínima 48px / tap confortável).

5. **Ajuste Espacial e Tipográfico nos Componentes Centrais**:
   - `HomeServicesBento.tsx`: H2 com escala fluida, cards com H3 `text-[clamp(1.35rem,2.2vw,2rem)]` e descrições `max-w-[65ch]`.
   - `HomeProcessPipeline.tsx`: Ritmo fluido e tipografia calibrada para as etapas.
   - `HomeResultsStrip.tsx`: Números de impacto tipográfico preservados com descrições em `max-w-[58ch]`.
   - `AboutPage.tsx`: Grid mantido com proporções refinadas e respiro fluido.
   - `ServicesPage.tsx`, `HowWeWorkPage.tsx`, `ExperiencePage.tsx`, `EngineeringPage.tsx`, `ContactPage.tsx`, `FAQPage.tsx`: Títulos de página consumindo `PageHeader` atualizado.

6. **Validação de Testes e Quality Gates**:
   - Sincronização dos testes unitários em `SectionWrapper.test.tsx`, `SectionHeader.test.tsx`, `PageHeader.test.tsx` e `Hero.test.tsx`.
   - Execução completa da suíte Vitest (201 testes) e Playwright E2E (53 testes).
   - Validação da ausência de overflow horizontal em 320px, 360px, 390px, 768px, 1024px, 1440px e 1920px.

### 2.2 Fora de Escopo

- Alteração da paleta institucional de cores da marca (ciano/esmeralda sobre fundo escuro e branco/gelo no modo claro).
- Criação de fotos fictícias de equipe ou depoimentos inventados.
- Inclusão de bibliotecas 3D pesadas (Three.js, WebGL pesado).
- Alteração da lógica de envio de formulário via EmailJS ou roteamento SPA.

---

## 3. Diretrizes de UX, Copywriting e Acessibilidade

1. **Princípio da Mensagem**:
   - Problema → Solução → Benefício Real → Confiança → Engenharia.
   - Copywriting factual, direto e desprovido de clichês proibidos ("impulsione", "leve ao próximo nível", "transforme sua visão", "tecnologia de ponta", "soluções inovadoras").
2. **Monocromatismo Estrito dos Títulos (Garantia SPEC-094)**:
   - Todos os H1 e H2 permanecem 100% monocromáticos na cor predominante (`text-primary`), sem divisão de cores na mesma palavra ou frase.
3. **Acessibilidade**:
   - Respeito irrestrito a `prefers-reduced-motion`.
   - Contraste WCAG AA calibrado para textos normais (> 4.5:1) e grandes (> 3:1) em Dark e Light Mode.
   - Touch targets de botões e links navegáveis ≥ 44px de altura.

---

## 4. Plano de Implementação

1. **Etapa 1:** Atualização de `tailwind.config.ts` e `src/index.css` com as fontes prioritárias, utilitários tipográficos fluidos e classes de container unificado.
2. **Etapa 2:** Refatoração de `SectionWrapper.tsx`, `SectionHeader.tsx` e `PageHeader.tsx`.
3. **Etapa 3:** Refatoração de `Hero.tsx` e componentes de seção da Home (`HomeServicesBento.tsx`, `HomeProcessPipeline.tsx`, `HomeResultsStrip.tsx`).
4. **Etapa 4:** Refatoração das páginas dedicadas (`ServicesPage.tsx`, `HowWeWorkPage.tsx`, `ExperiencePage.tsx`, `EngineeringPage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `FAQPage.tsx`).
5. **Etapa 5:** Sincronização de testes unitários e testes E2E Playwright.
6. **Etapa 6:** Execução dos Quality Gates (`npx tsc`, `npm run lint`, `npm test`, `npx playwright test`, `npm run build`).
7. **Etapa 7:** Captura de evidências visuais responsivas e elaboração de `reviews/QA-096.md`.
8. **Etapa 8:** Atualização de `PROJECT.md`, `CHANGELOG.md` e commit em `develop` em Português do Brasil (`pt-BR`).

---

## 5. Quality Gates

| Gate | Critério |
|------|----------|
| **TypeScript** | `npx tsc --noEmit` — 0 erros |
| **ESLint** | `npm run lint` — 0 erros, 0 warnings |
| **Vitest Unit** | `npm test -- --run` — 100% dos testes aprovados |
| **Playwright E2E** | `npx playwright test` — 100% dos testes aprovados |
| **Build & Prerender** | `npm run build` — Chunks < 600KB, 7 rotas pré-renderizadas |
| **Responsividade** | Zero overflow horizontal em 360px, 390px, 768px, 1024px, 1440px e 1920px |
| **Acessibilidade** | WCAG AA garantido para todos os textos e interações |

---

_Mantenedor: Elessandro Prestes Macedo | Gemini_
