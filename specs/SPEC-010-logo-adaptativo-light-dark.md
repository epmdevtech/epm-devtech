# SPEC-010 — Logotipo Adaptativo Dark/Light Mode com UX/UI Refinada e Zero FOUC/CLS

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-010                                   |
| **Data**      | 2026-09-06                                 |
| **Autor**     | Gemini/Antigravity                         |
| **PO**        | Elessandro Prestes Macedo                  |
| **Status**    | ✅ Aprovada                                |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

Atualmente, o logotipo institucional da **EPM DEVTECH** exibido no topo da página (`src/components/layout/Header.tsx`) e no rodapé (`src/components/sections/Footer.tsx`) foi originado de um asset transparente (`logo-emp-dev-tech-xs.webp` e `sm.webp`) contendo tipografia em branco puro (`#FFFFFF`).

Para permitir a leitura desse logotipo em modo claro (*Light Mode*), foi aplicada previamente uma solução paliativa: envolver a imagem em uma tag `<div>` com background escuro artificial (`bg-gray-900 dark:bg-transparent rounded-md px-2 py-0.5`). 

### Problemas Identificados de UX/UI e Engenharia:
1. **Quebra Estética no Modo Claro**: No tema Light, o header exibe uma "pílula preta" (`bg-gray-900`) isolada no canto superior esquerdo e no footer. Isso transmite a impressão de recorte incorreto, adesivo colado ou ausência de polimento visual institucional.
2. **Desequilíbrio de Hierarquia Visual**: A pílula preta atrai um peso visual desproporcional no modo claro, distraindo o usuário dos links de navegação e da chamada de ação (CTA).
3. **Contraste e Acessibilidade (WCAG)**: Embora a pílula preta permita ler o texto branco dentro dela, o elemento destoa do restante da barra de navegação translúcida (`glass bg-background/80`).
4. **Semântica Multi-Tema**: As melhores práticas da indústria (Vercel, Linear, Stripe, GitHub, Apple) prescrevem logotipos nativos adaptativos com fundo 100% transparente em ambos os modos, onde a marca gráfica (ícone/símbolo com gradiente de marca) se mantém íntegra e a tipografia (wordmark) inverte dinamicamente:
   - **Dark Mode**: Tipografia branca (`#FFFFFF` / `hsl(var(--foreground))`), contraste 17.8:1 contra o canvas escuro.
   - **Light Mode**: Tipografia em ardósia profunda (*Deep Slate* `#0F172A` / `hsl(var(--foreground))`), contraste 18.7:1 contra o canvas claro.

---

## Objetivo

Implementar a adaptação nativa e elegante do logotipo da EPM DEVTECH para os modos Light e Dark, removendo qualquer container escuro artificial (`bg-gray-900`), garantindo fundo 100% transparente, tipografia adaptativa com contraste WCAG AAA, zero Cumulative Layout Shift (CLS = 0), conformidade total com o Core Web Vitals (LCP otimizado) e acessibilidade exemplar para leitores de tela.

---

## Escopo

### Está incluído (IN)
1. **Geração de Assets Otimizados para Light Mode** (`public/`):
   - `logo-epm-devtech-light-xs.webp` (149x50 px, ~5.2 KB) — para Header mobile/desktop;
   - `logo-epm-devtech-light-sm.webp` (300x101 px, ~12.4 KB) — para Footer e telas retina;
   - `logo-epm-devtech-light.webp` e variantes PNG — preservação de fidelidade para resoluções ultra-high-definition.
2. **Atualização do Header** (`src/components/layout/Header.tsx`):
   - Eliminação da classe `bg-gray-900`;
   - Renderização adaptativa CSS sem flicker: variante dark exibida via `hidden dark:block` e variante light via `block dark:hidden`;
   - Preservação do `alt="EPM DEVTECH"` único no elemento principal e `aria-hidden="true"` na variante do tema oposto para manter a árvore de acessibilidade impecável e evitar duplicações em leitores de tela e testes automatizados.
3. **Atualização do Footer** (`src/components/sections/Footer.tsx`):
   - Remoção de `bg-gray-900` da moldura do logo;
   - Renderização responsiva e elegante da versão light/dark preservando o efeito interativo de glow suave da marca no hover.
4. **Otimização de Preload no HTML** (`index.html`):
   - Suporte a preload condicional com `media="(prefers-color-scheme: ...)"` garantindo LCP instantâneo em qualquer preferência do sistema.
5. **Validação de Testes e Quality Gates**:
   - Suíte unitária (Vitest) mantida com 100% de aprovação (91/91 testes);
   - Cobertura de código mantida acima do gate de 90%;
   - Zero erros no ESLint e build de produção limpo.

### Não está incluído (OUT)
- Não alterar a marca gráfica (o ícone de circuito com chaves `{ [ ] }` e gradiente azul-verde da EPM DEVTECH).
- Não modificar cores estruturais das demais seções da landing page já aprovadas na SPEC-008 e SPEC-009.

---

## Requisitos de UX/UI Design

| Critério | Especificação Dark Mode | Especificação Light Mode |
|----------|-------------------------|--------------------------|
| **Fundo do Logo** | Transparente (`bg-transparent`) | Transparente (`bg-transparent`, sem pill preta) |
| **Cor do Ícone** | Gradiente Oficial `#00D4FF` → `#10B981` | Gradiente Oficial `#00D4FF` → `#10B981` |
| **Cor do Wordmark** | Branco puro `#FFFFFF` | Deep Slate `#0F172A` / `#020817` |
| **Contraste WCAG** | 17.8:1 (Conforme WCAG AAA) | 18.7:1 (Conforme WCAG AAA) |
| **Layout Shift (CLS)** | 0 (mesmas dimensões 149x50 / 300x101) | 0 (mesmas dimensões 149x50 / 300x101) |

---

## Critérios de Aceitação

- [x] O logotipo no modo claro é exibido com fundo 100% transparente, sem o container `bg-gray-900`.
- [x] A tipografia "EPM DEVTECH" no modo claro é nítida, escura e de alto contraste contra o fundo branco.
- [x] No modo escuro, o logotipo permanece transparente com tipografia branca e alto contraste.
- [x] Alternar o tema através do Theme Switcher no Footer atualiza o logotipo de forma instantânea e fluida.
- [x] Testes unitários do Header e Footer passam sem erros de duplicação de `alt` text.
- [x] Suíte Playwright E2E e Vitest 100% verdes.
- [x] Zero erros no ESLint e chunk size no build < 600KB.

---

## Aprovação

| Campo              | Valor                     |
|--------------------|---------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-09-06                |
| **Status**         | ✅ Aprovada                |
