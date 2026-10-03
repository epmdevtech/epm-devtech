# SPEC-095 — Refatoração do Esquema Cromático do Modo Claro (Light Mode) e Cadência Visual Alternada

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX Design / Design System / Acessibilidade WCAG AA / Tailwind CSS

---

## 1. Contexto e Motivação

Durante a evolução visual do design system da EPM DevTech (notadamente após o Tonal Layering da SPEC-082), o Modo Escuro (Dark Mode) atingiu maturidade estética com três camadas tonais bem calibradas (`surface-anchor`, `surface-base` e `surface-alt`). No entanto, o Modo Claro (Light Mode) apresentava um tom esverdeado/acinzentado uniforme (`#E5EDEE` / `190 18% 91.5%`) nas âncoras e pouca diferenciação perceptiva entre as seções, gerando sensação de monobloco sem respiro e contraste abaixo do ideal para leitura corporativa B2B.

Faz-se necessária uma refatoração completa do esquema cromático do Light Mode em todas as rotas e páginas do site, implementando:
1. **Âncoras em Branco Puro (`#FFFFFF`)**: Hero e Footer sempre em branco puro.
2. **Cadência Alternada de Seções (Ritmo Visual)**: Alternância nítida entre Branco Puro (`bg-white`) e Tom Gelo / Off-white sutil (`bg-zinc-50` / `#FAFAFA`), com divisores horizontais sutis (`border-y border-zinc-200/70`).
3. **Hierarquia Tipográfica de Alto Contraste**: Títulos em preto profundo/carvão (`#09090B` / `text-zinc-900`), subtítulos em cinza escuro legível (`#52525B` / `text-zinc-600`) e acentos de marca em verde esmeralda/teal calibrado para acessibilidade WCAG AA (`#0F766E` / `text-teal-700`).
4. **Tratamento de Cards, Pipeline e Mocks**: Cards destacados com fundo branco e sombra suave sobre o fundo gelo, pipeline com trilho em `zinc-200`, nós em branco com borda `zinc-300` e preservação dos terminais técnicos escuros (`bg-zinc-950`) como destaques.
5. **Preservação Integral do Dark Mode**: O Dark Mode existente deve permanecer 100% inalterado.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Calibração dos Tokens Semânticos do Modo Claro (`src/index.css`)**:
   - `--surface-anchor`: de `190 18% 91.5%` para `0 0% 100%` (Branco Puro `#FFFFFF`).
   - `--surface-base`: de `190 18% 95.0%` para `240 5% 98%` (Tom Gelo / Off-white `bg-zinc-50` / `#FAFAFA`).
   - `--surface-alt`: de `190 18% 98.5%` para `0 0% 100%` (Branco Puro `#FFFFFF`).
   - `--text-primary`: `#09090B` (Preto profundo / Carvão `zinc-950`, contraste > 18:1).
   - `--text-secondary`: `#52525B` (Cinza escuro legível `zinc-600`, contraste > 7:1).
   - `--text-muted`: `#71717A` (Cinza médio `zinc-500`, contraste > 4.5:1).
   - `--text-brand`: `#0F766E` (Teal 700, contraste WCAG AA > 4.7:1 sobre branco e gelo).
   - `--border-default`: `#E4E4E7` (`zinc-200`).
   - `--border-subtle`: `#F4F4F5` (`zinc-100`).
   - `--border-strong`: `#D4D4D8` (`zinc-300`).
   - `--bg-elevated`: `#FFFFFF` (Garante que cards sobre tom gelo tenham fundo branco puro com elevação).

2. **Ajustes no `SectionWrapper` (`src/components/ui/SectionWrapper.tsx`)**:
   - Adicionar divisor sutil superior/inferior para o tom `base` no Light Mode:
     `base: "bg-surface-base text-foreground border-y border-zinc-200/70 dark:border-transparent"`
   - Manter `anchor` e `alt` sem bordas divisórias intrusivas.

3. **Navbar / Header (`src/components/layout/Header.tsx`)**:
   - Ajustar classes de fundo e borda para garantir transparência com blur ou branco puro no Light Mode:
     * Normal: `bg-surface-anchor text-foreground` (Branco Puro no Light, Deep Anchor no Dark).
     * Scrolled: `backdrop-blur-md bg-white/80 dark:bg-surface-anchor/85 border-b border-zinc-200/80 dark:border-border/40 shadow-xs`.

4. **Rodapé / Footer (`src/components/sections/Footer.tsx`)**:
   - Manter `bg-surface-anchor` (Branco Puro no Light Mode) e adicionar borda superior nítida no Light Mode:
     `border-t border-zinc-200 dark:border-zinc-800`.

5. **Cadência Alternada de Seções nas Páginas**:
   - **Home (`/`)**:
     * Hero: Branco puro (`surface-anchor`)
     * O que Desenvolvemos / Serviços (Bento Grid): Gelo (`surface-base` - `bg-zinc-50` com divisor sutil)
     * Processo e Previsibilidade (Pipeline): Branco puro (`surface-alt` - `bg-white`)
     * Experiência Prática / Resultados: Gelo (`surface-base` - `bg-zinc-50` com divisor sutil)
     * Rodapé (Footer): Branco puro (`surface-anchor` com `border-t border-zinc-200`)
   - **Serviços (`/servicos`)**:
     * PageHeader (Hero): Branco puro (`surface-anchor`)
     * Serviços em Z-Pattern: Alternância rítmica com mocks técnicos destacados
     * Faixa de Garantias de Engenharia: Gelo (`surface-base`)
   - **Como Trabalhamos (`/como-trabalhamos`)**:
     * PageHeader (Hero): Branco puro (`surface-anchor`)
     * Process Explorer: Gelo (`surface-base`) com cards brancos e tabs refinadas
     * Manifesto de Parceria: Branco puro (`surface-alt`)
   - **Experiência (`/experiencia`)**:
     * PageHeader (Hero): Branco puro (`surface-anchor`)
     * Matriz de Verticais: Gelo (`surface-base`)
     * Enterprise Ledger: Branco puro (`surface-alt`)
   - **Engenharia (`/engenharia`)**:
     * PageHeader (Hero): Branco puro (`surface-anchor`)
     * Nuvem Tipográfica & Filosofia: Gelo (`surface-base`)
     * Architectural Blueprint & CI/CD Terminal: Fundo escuro intencional preservado como destaque técnico
   - **Sobre nós (`/sobre`)**:
     * Hero com Constelação EPM: Branco puro (`surface-anchor`), constelação com contraste ajustado para Light Mode
     * Nossa Jornada (Timeline): Gelo (`surface-base`)
     * Missão e Princípios: Branco puro (`surface-alt`)
   - **Contato (`/contato`) & FAQ (`/duvidas-frequentes`)**:
     * PageHeader: Branco puro (`surface-anchor`)
     * Formulário / Accordion: Gelo (`surface-base`) com cards em branco puro

6. **Componentes Gráficos e Mocks Técnicos**:
   - **Pipeline (`HomeProcessPipeline.tsx`)**:
     * Trilho base: `bg-zinc-200 dark:bg-zinc-800`
     * Pulso/feixe animado: `bg-emerald-600 dark:bg-teal-400`
     * Nós/círculos: `bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100`
   - **Cards do Bento Grid (`HomeServicesBento.tsx`)**:
     * Fundo branco sólido sobre tom gelo: `bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-border-subtle/40 shadow-sm`
   - **Terminais / Snippets**:
     * Preservação do `bg-zinc-950 text-zinc-100` com visual dev/hacker profissional em ambos os modos.

7. **Sincronização de Testes e Quality Gates**:
   - `e2e/hero-identity-token-locks.spec.ts`: atualizar asserção de cor do Hero no Light Mode para `rgb(255, 255, 255)` e H1 para `rgb(9, 9, 11)`.
   - `src/components/ui/__tests__/SectionWrapper.test.tsx`: atualizar asserções caso haja novas classes de borda.
   - Execução de 100% dos testes unitários (Vitest) e E2E (Playwright).
   - Captura de evidências visuais de todas as páginas em Light Mode.

### 2.2 Fora de Escopo

- Alteração na estrutura semântica ou no layout do Dark Mode.
- Modificação de rotas, textos, títulos ou copywriting estabelecidos na SPEC-092 e SPEC-094.
- Inclusão de novas bibliotecas externas.

---

## 3. Diretrizes de Acessibilidade e Contraste (WCAG 2.2 AA / AAA)

| Elemento | Token Light Mode | Cor de Fundo | Cor do Texto | Rácio de Contraste | Nível WCAG |
|----------|-------------------|--------------|--------------|-------------------|------------|
| Títulos H1-H3 | `--text-primary` | `#FFFFFF` / `#FAFAFA` | `#09090B` | **19.8:1** | **AAA** |
| Parágrafos / Subtítulos | `--text-secondary` | `#FFFFFF` / `#FAFAFA` | `#52525B` | **7.5:1** | **AAA** |
| Legendas / Notas | `--text-muted` | `#FFFFFF` / `#FAFAFA` | `#71717A` | **4.6:1** | **AA** |
| Links / Destaques Marca | `--text-brand` | `#FFFFFF` / `#FAFAFA` | `#0F766E` | **4.8:1** | **AA** |
| Botão Primário | `--brand` + `--text-on-brand` | `#14B8A6` | `#04201C` | **8.2:1** | **AAA** |

---

## 4. Plano de Implementação

1. **Fase 1: Tokens e Sistema Base**:
   - Atualizar tokens em `src/index.css` (:root e [data-theme="light"]).
   - Atualizar `src/components/ui/SectionWrapper.tsx` com divisor sutil para tom `base`.
2. **Fase 2: Header e Footer**:
   - Atualizar `src/components/layout/Header.tsx` (blur/branco no Light Mode).
   - Atualizar `src/components/sections/Footer.tsx` (borda superior nítida).
3. **Fase 3: Refinamento de Componentes (Home e Páginas)**:
   - Calibrar `HomeProcessPipeline.tsx` (trilho, nó e pulso).
   - Calibrar `HomeServicesBento.tsx` (cards brancos elevados).
   - Revisar componentes de `/servicos`, `/como-trabalhamos`, `/experiencia`, `/engenharia` e `/sobre`.
4. **Fase 4: Sincronização de Testes & QA**:
   - Atualizar asserções de teste em Vitest e Playwright.
   - Executar bateria completa de Quality Gates (`tsc`, `lint`, `test`, `e2e`, `build`).
   - Capturar screenshots em Light Mode (Desktop e Mobile).
   - Elaborar `reviews/QA-095.md`.
5. **Fase 5: Documentação e Governança**:
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## 5. Critérios de Aceite

1. O Hero de todas as 7 rotas canônicas e o Rodapé renderizam com fundo branco puro (`#FFFFFF`) no Light Mode.
2. A Navbar possui fundo branco ou transparente com blur e borda divisória sutil (`border-zinc-200/80`) no Light Mode.
3. Seções intermediárias em tom Gelo (`bg-zinc-50`) possuem divisores sutis (`border-y border-zinc-200/70`) e cards em branco puro com sombra leve (`shadow-sm`).
4. A hierarquia tipográfica exibe títulos em preto profundo (`#09090B`) e subtítulos legíveis em cinza escuro (`#52525B`), eliminando qualquer texto apagado.
5. O Dark Mode permanece 100% inalterado e estável.
6. 100% dos testes unitários (Vitest) e ponta a ponta (Playwright) passam com sucesso.
7. Zero erros de compilação TypeScript e zero avisos de ESLint.
