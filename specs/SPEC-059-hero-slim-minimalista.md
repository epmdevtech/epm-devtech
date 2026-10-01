# SPEC-059 — Hero Slim e Minimalista (Sem Animações Exageradas) & CTA de Header

| Metadado | Valor |
|---|---|
| **ID** | SPEC-059 |
| **Título** | Hero Slim e Minimalista com Foco em Performance (CWV), Acessibilidade e Identidade Canônica |
| **Status** | Aprovada |
| **Data de Criação** | 2026-10-01 |
| **Autor** | Elessandro Prestes Macedo (PO) |
| **Executor** | Gemini/Antigravity |
| **Versão** | 1.0.0 |

---

## 1. Contexto e Motivação

O Hero atual da EPM DEVTECH acumulou uma altura excessiva (1234px em desktop e até 1127px em mobile), ultrapassando 137% a 176% da viewport inicial. Isso empurrava a seção de Serviços completamente para baixo da dobra e impactava a métrica de LCP em conexões móveis (3.5s no baseline mobile), devido ao uso de animações de entrada sequenciais do Framer Motion e renderização de gradientes cônicos pesados (`LampContainer`).

Esta especificação define o redesenho estrito do Hero em um formato **slim e minimalista**, com uma única coluna centralizada, permitindo que o visitante veja imediatamente o início do catálogo de serviços sem rolar a página em 1440×900, ao mesmo tempo em que preserva rigorosamente a identidade visual e os tokens canônicos da marca.

---

## 2. Requisitos Detalhados

### 2.1 Escopo e Limites Rigorosos
- **Escopo Autorizado:** Redesenho exclusivo da seção Hero (`#hero`) e adição do botão de CTA de acento no Header fixo. Todo o restante do site permanece inalterado.
- **Identidade Inegociável:** Paleta, tokens, tipografia, acento esmeralda (`#10B981`) e suporte pleno aos temas Dark, Light e System permanecem intactos.
- **Proibição Total de Gradientes no Hero:** Nenhum `linear-gradient`, `radial-gradient`, `conic-gradient`, `mask-image`, `border-image` ou texto com `background-clip`. Apenas cores sólidas dos tokens.
- **Sem Novas Dependências:** Sem bibliotecas adicionais, canvas, WebGL ou animações proprietárias.

### 2.2 Estrutura e Dimensões (Faixa Slim de Uma Coluna)
- **Altura Total:** Entre ~320px e ~440px em telas ≥ 1024px (≤ 50% da viewport em 1440×900). Padding vertical fluido (`clamp(56px, 8vw, 104px)` ou classes utilitárias proporcionais).
- **Visibilidade Acima da Dobra:** Em 1440×900, o título H2 da seção seguinte (`Serviços`) fica visível sem necessidade de rolagem. Em 390×844, H1, subheadline e botão principal ficam visíveis.
- **Coluna Única Centralizada:** Conteúdo alinhado e centralizado no eixo horizontal:
  1. Eyebrow: `BrandChipIcon` + `SOFTWARE HOUSE` em uma linha.
  2. H1: `Desenvolvemos software sob medida para o seu negócio.` (quebra natural em 2 linhas com `[text-wrap:balance]` e `max-w-[20ch]`, sem `<br>` forçado).
  3. Subheadline: `Sistemas web, APIs, integrações e soluções digitais construídas para resolver problemas reais e acompanhar a evolução da sua empresa.` (`[text-wrap:pretty]`, `max-w-2xl`, cor secundária).
  4. CTAs: Botão primário (`#contato`) + Link de texto secundário (`#sobre`).
  5. Detalhe de transição: Linha de 1px com nó esmeralda sólido no centro.

### 2.3 Tipografia e Ritmo Vertical
- **H1:** Família Sans do site, `font-bold`, escala fluida `clamp(2rem, 1.2rem + 3.2vw, 3.5rem)`, `line-height: 1.12–1.15`, cor monocromática sólida (`text-foreground`).
- **Subheadline:** Família Sans, `font-normal`, escala `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)`, `line-height: 1.6`, cor atenuada dos tokens (`text-muted-foreground`).
- **Eyebrow:** Família Mono, `text-[11.5px]`, `font-medium`, `uppercase`, `tracking-[0.1em]`, `text-zinc-500 dark:text-zinc-400`.
- **Ritmo Vertical:** Eyebrow → H1 ≈ 16px; H1 → Subheadline ≈ 16–20px; Subheadline → CTAs ≈ 28–32px.

### 2.4 CTAs (Ação Dominante Única)
- **Primário:** Componente `Button` oficial do shadcn/ui, cor sólida de acento (`bg-primary text-primary-foreground hover:bg-primary/90`), `min-height: 44px`, contraste WCAG AA ≥ 4.5:1. Sem ícones, setas ou degradês. Texto exato: `"Falar sobre meu projeto"` com âncora `#contato`.
- **Secundário:** Link de texto (não botão), `min-height: 44px` (alvo de toque acessível), cor atenuada (`text-muted-foreground hover:text-foreground`), sublinhado/realce no hover e foco visível. Texto exato: `"Conhecer a EPM DevTech"` com âncora `#sobre`.
- **Alinhamento:** Centralizados lado a lado com `gap: 16–24px`. Abaixo de 480px: empilhados e centralizados.

### 2.5 Fundo e Transição
- **Fundo:** Superfície-base sólida do tema (`bg-background`). Sem gradientes.
- **Transição para a próxima seção:** Linha horizontal de 1px (`border-t border-border` em cor sólida) com nó centralizado esmeralda sólido (`bg-primary`, 8–10px de diâmetro), sem halo nem glow.

### 2.6 Header (CTA de Acento Integrado)
- Adicionar botão de acento `"Falar sobre meu projeto"` (`#contato`) à direita da barra de navegação no Header desktop via componente `Button` (tamanho compacto, touch target ≥ 44px).
- Rótulo íntegro sem abreviação. Antecipar breakpoint do menu móvel se necessário para acomodar a navegação em 1024px.
- No menu móvel, o botão é renderizado como o último item, em destaque visual.
- Manter o link `"Pular para o conteúdo"` como primeiro elemento focável.

### 2.7 Remoção do Diagrama de Arquitetura e Limpeza
- Remover do Hero o diagrama de arquitetura (`HeroArchitecture.tsx`), as camadas 01–04, chips e legenda interativa.
- Remover arquivos e estilos exclusivos órfãos (`src/components/ui/lamp.tsx`, `HeroBadge.tsx`, `HeroArchitecture.tsx`, classes `@keyframes hero-orbit` e `.hero-brand-aura` de `index.css`).
- Garantir que nenhum texto do diagrama permaneça em testes ou metadados.
- Preservar o `<h1>` como único da página.

### 2.8 Movimento e Performance
- Zero animações contínuas, flutuações, rotações ou loops.
- Sem animação de entrada no H1 e subheadline para garantir FCP e LCP instantâneos.
- Apenas transições CSS discretas de hover/foco nos botões e links (150–200ms).
- Respeitar estritamente `prefers-reduced-motion: reduce`.

### 2.9 Verificação Automatizada de Identidade (Playwright)
- Criar teste E2E que audite em Dark e Light os estilos computados de `#hero` (H1, subheadline, eyebrow, botão, link, divisor):
  - Cores computadas pertencentes ao conjunto canônico de tokens.
  - Ausência absoluta de `gradient(` em `background-image` em qualquer elemento do Hero.
  - Fontes e raios compatíveis com o design system.

---

## 3. Quality Gates

| Gate | Critério |
|---|---|
| **TypeScript** | `npx tsc --noEmit` sem nenhum erro |
| **ESLint** | `npm run lint` com zero erros |
| **Testes Unitários** | `npm run test:coverage` com cobertura ≥ 90% |
| **Testes E2E** | `npm run test:e2e` com 100% dos testes aprovados |
| **Build** | `npm run build` limpo e sem chunks > 600KB |
| **Acessibilidade** | WCAG 2.2 AA (contraste ≥ 4.5:1, touch targets ≥ 44px, foco visível) |
| **Performance** | LCP, TBT e bundle iguais ou melhores que a baseline |
