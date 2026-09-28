# SPEC-048 — Hero: Responsividade para Notebook — CTAs Sempre Visíveis

> **Status:** ✅ Aprovado — 2026-09-28 por Elessandro Prestes Macedo (PO)  
> **Criado em:** 2026-09-28  
> **Autor:** AI Agent (Antigravity)  
> **Refs:** SPEC-047, TASK-047

---

## 1. Contexto

A entrega SPEC-047 integrou o efeito `LampContainer` ao hero da landing page EPM DEVTECH.
O `LampContainer` utiliza uma div de atmosfera com altura fixa (`h-[280px] sm:h-[320px] md:h-[360px]`) e um conteúdo sobreposto via margem negativa (`-mt-44 sm:-mt-52 md:-mt-60`).

Em viewports de notebook/laptop (tipicamente 1280×800 ou 1366×768 com escala de display 125–150%), a soma de espaços no hero (padding top + atmosfera Lamp + conteúdo + HeroArchitecture) excede a altura da viewport, empurrando os botões CTA ("Falar sobre meu projeto" e "Conhecer a EPM") para fora da dobra visível — ou cortando-os completamente.

---

## 2. Problema

| Viewport | Comportamento observado |
|---|---|
| ≤ 1280 × 800 (notebook 13") | CTAs e microprova ocultos abaixo da dobra inicial |
| 1366 × 768 (notebook HD) | CTAs parcialmente visíveis ou cortados |
| ≥ 1440 × 900 (monitor standard) | Exibição correta |

---

## 3. Objetivo

Garantir que todos os elementos do hero — eyebrow badge, headline, supporting copy, **CTAs (ambos os botões)**, microprova social e diagrama HeroArchitecture — sejam visíveis sem rolagem em qualquer viewport com largura ≥ 1024px (breakpoint `lg`) e altura ≥ 768px.

Em viewports menores (mobile, tablet), o scroll natural é aceitável; o importante é que os CTAs não sumam antes de aparecer.

---

## 4. Escopo

### 4.1 Incluído

- Ajuste das alturas responsivas da atmosfera Lamp (`h-[...]`) nos breakpoints `sm` e `md` para consumir menos espaço vertical em telas menores
- Ajuste das margens negativas (`-mt-[...]`) no contêiner de conteúdo do `LampContainer` para preservar o efeito visual sem empurrar os CTAs
- Ajuste do padding top/bottom da `section#hero` para viewports de notebook
- Garantia de que o `HeroArchitecture` mostre scroll ou seja reduzido (`max-h` + `overflow-y-auto`) quando a viewport não comportar o componente inteiro, sem ocultar os CTAs acima dele
- Manutenção total do efeito visual Lamp (cones de luz, glow, emitter line) — sem remoção ou degradação do design

### 4.2 Excluído

- Alteração de conteúdo textual (copy)
- Mudança de tokens de cor
- Alteração de qualquer outra seção da landing page
- Adição de novos componentes, animações ou dependências

---

## 5. Solução Técnica

### 5.1 `src/components/ui/lamp.tsx`

Reduzir a altura da div de atmosfera nos breakpoints menores e ajustar as margens negativas de forma proporcional:

| Breakpoint | Altura atmosfera atual | Altura proposta | Margem negativa atual | Margem proposta |
|---|---|---|---|---|
| `base` (mobile) | `280px` | `220px` | `-mt-44` (176px) | `-mt-36` (144px) |
| `sm` (640px+) | `320px` | `260px` | `-mt-52` (208px) | `-mt-44` (176px) |
| `md` (768px+) | `360px` | `300px` | `-mt-60` (240px) | `-mt-52` (208px) |

> O delta entre altura e margem negativa controla quanto do conteúdo aparece abaixo da linha do emitter. Mantendo o delta proporcional, o efeito visual é preservado.

### 5.2 `src/components/sections/Hero.tsx`

Reduzir o padding top da seção em breakpoints menores:

- Atual: `pt-20 sm:pt-24 md:pt-28`
- Proposto: `pt-16 sm:pt-20 md:pt-24`

Reduzir o `mt` da div do `HeroArchitecture` em breakpoints menores:

- Atual: `mt-12 sm:mt-16 md:mt-20`
- Proposto: `mt-8 sm:mt-12 md:mt-16`

### 5.3 `src/components/sections/hero/HeroArchitecture.tsx`

Adicionar `max-h` com `overflow-y-auto` apenas em viewports onde a altura total excede o disponível. Usar classes responsivas do Tailwind:

- Adicionar `lg:max-h-none max-h-[340px] overflow-y-auto` ao container raiz do componente (apenas para viewports menores que `lg`)

---

## 6. Critérios de Aceite

| # | Critério | Como verificar |
|---|---|---|
| CA-1 | CTAs "Falar sobre meu projeto" e "Conhecer a EPM" visíveis sem scroll em viewport 1280×800 | Playwright E2E ou inspeção visual no DevTools |
| CA-2 | CTAs visíveis em viewport 1366×768 | Idem |
| CA-3 | Efeito Lamp (cones, glow, emitter line) permanece visualmente íntegro em todos os breakpoints | Inspeção visual |
| CA-4 | Zero regressões em testes unitários existentes (20 suites, 138 testes) | `npm run test` |
| CA-5 | Zero erros de TypeScript | `npx tsc --noEmit` |
| CA-6 | Zero erros de ESLint | `npm run lint` |
| CA-7 | Build sem warnings de chunk size | `npm run build` |
| CA-8 | Overflow horizontal zero em todas as viewports testadas | Playwright viewport suite |

---

## 7. Impacto e Riscos

| Item | Avaliação |
|---|---|
| Impacto visual | Baixo — apenas ajuste de proporções verticais, efeito Lamp preservado |
| Risco de regressão | Baixo — mudanças limitadas a classes Tailwind de espaçamento |
| Impacto em testes | Nenhum esperado — testes existentes cobrem estrutura, não alturas absolutas |
| Compatibilidade | Tailwind CSS 3.x — classes utilizadas são nativas |

---

## 8. Artefatos Gerados

- `specs/SPEC-048-hero-responsividade-notebook-ctas-visiveis.md` (este arquivo)
- `tasks/TASK-048-01-hero-responsividade-notebook-ctas-visiveis.md`
- Alterações em: `src/components/ui/lamp.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/hero/HeroArchitecture.tsx`

---

_Status: **Draft** — implementação bloqueada até aprovação explícita do PO._
