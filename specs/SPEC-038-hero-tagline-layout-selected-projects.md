# SPEC-038: Hero Tagline — Substituição de Badge por Overline Minimalista com Linhas Flanqueadas (Estilo Quordix Selected Projects)

| Campo         | Valor                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------|
| **ID**        | SPEC-038                                                                                                   |
| **Título**    | Hero Tagline — Substituição de Badge por Overline Minimalista com Linhas Flanqueadas (Estilo Selected Projects) |
| **Prioridade**| Média (UI/UX, Alinhamento Visual com Referência Quordix)                                                    |
| **Origem**    | Demanda PO (2026-09-10)                                                                                    |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                                             |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo — 2026-09-10)                                                       |
| **Data**      | 2026-09-10                                                                                                 |

---

## 1. Contexto e Motivação

Na seção Hero (`src/components/sections/Hero.tsx`), a tagline superior atualmente utiliza um formato de "badge pill" tradicional (`rounded-full`, fundo `bg-emerald-50 dark:bg-emerald-950/50`, borda e dot verde pulsante com `animate-pulse`).

Conforme orientação do PO e referência visual enviada (`Captura de tela de 2026-09-10 21-37-29.png`), esse formato de badge encapsulado com fundo e ponto pulsante será substituído pelo padrão tipográfico de **overline minimalista flanqueado por linhas horizontais** (idêntico à referência do Quordix acima do título principal: `—— SELECTED PROJECTS ——`).

Essa mudança traz maior leveza visual, refinamento editorial de estúdio de alta engenharia de software e harmoniza perfeitamente com os anéis orbitais e a física magnética da headline introduzidos na SPEC-037.

---

## 2. Requisitos de UI/UX e Design System

### 2.1. Remoção do Formato Badge Atual
- [x] Remover o contêiner em cápsula/pílula (`rounded-full`, `bg-emerald-50`, `border-emerald-200/70`, `dark:bg-emerald-950/50`, `dark:border-emerald-800/60`, `shadow-sm`).
- [x] Remover o ponto pulsante verde (`animate-pulse`).

### 2.2. Novo Layout no Estilo "Selected Projects"
- [x] **Linhas Flanqueadoras Horizontais**: Inserir uma linha horizontal antes e uma linha horizontal depois do texto da tagline.
  - Espessura: `1px` (`h-px`).
  - Largura responsiva: `w-6 sm:w-10 md:w-12` (evita quebrar em telas estreitas e expande com elegância em desktop).
  - Cor das linhas: `bg-emerald-600/60 dark:bg-emerald-400/60` (sintonizada com a cor da marca e a opacidade editorial).
  - Acessibilidade: `aria-hidden="true"` nas linhas decorativas.
- [x] **Tipografia da Tagline**:
  - Texto mantido: `Engenharia de Software & Modernização`.
  - Caixa: `uppercase`.
  - Tracking (letter-spacing): `tracking-[0.2em]` (espaçamento amplo característico de overlines premium).
  - Tamanho de fonte: `text-xs sm:text-[13px] font-semibold`.
  - Cores preservadas rigorosamente: `text-emerald-700 dark:text-emerald-400` (mantendo o contraste aprovado e a fidelidade aos tokens do badge original).
  - Espaçamento do container: `gap-3 sm:gap-4 mb-6 sm:mb-8`.
- [x] **Animação & Motion**:
  - Preservar entrada suave com Framer Motion (`opacity: 0, y: 10` para `opacity: 1, y: 0`), respeitando estritamente `prefers-reduced-motion`.

---

## 3. Matriz Comparativa (Antes vs. Depois)

| Elemento | Antes (Badge Pill) | Depois (Overline Selected Projects) |
|---|---|---|
| **Formato** | Pílula fechada com borda e fundo | Aberto, clean, texto flanqueado por duas linhas horizontais |
| **Ponto Pulsante** | Dot circular com `animate-pulse` | Removido em favor de linhas simétricas estáticas |
| **Tipografia** | `text-xs font-semibold uppercase tracking-wider` | `text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em]` |
| **Cores do Texto** | `text-emerald-700 dark:text-emerald-400` | `text-emerald-700 dark:text-emerald-400` (Preservadas 100%) |
| **Fundo/Borda** | `bg-emerald-50 border ...` | Sem fundo e sem borda de container |
| **Linhas Decorativas**| Inexistentes | Linhas horizontais `h-px w-6 sm:w-10 md:w-12 bg-emerald-600/60 dark:bg-emerald-400/60` |

---

## 4. Impacto em Testes e Quality Gates

1. **Testes Unitários (`src/components/sections/__tests__/Hero.test.tsx`)**:
   - O teste existente busca `getByText(/Engenharia de Software & Modernização/i)`, portanto continuará passando sem regressões.
   - Atualizar eventuais asserções estruturais para garantir validação do novo layout.
2. **Testes E2E (`e2e/design-system-and-stability.spec.ts`)**:
   - Zero regressões no H1 monocromático e no carregamento do Hero.
3. **Acessibilidade**:
   - `aria-hidden="true"` nas linhas decorativas;
   - Contraste do texto `text-emerald-700` no fundo claro (4.9:1) e `text-emerald-400` no fundo escuro (9.2:1), atendendo WCAG AA e AAA.

---

## 5. Próximos Passos (Aguardando Aprovação)

1. Aprovação formal do Product Owner (Elessandro Prestes Macedo).
2. Criação da `TASK-038-hero-tagline-layout-selected-projects.md`.
3. Implementação das alterações em `src/components/sections/Hero.tsx`.
4. Execução de testes unitários (`npm run test`), lint (`npm run lint`), build (`npm run build`) e Playwright.
5. Emissão do relatório de QA (`reviews/QA-038.md`) e atualização do `PROJECT.md` e `CHANGELOG.md`.
