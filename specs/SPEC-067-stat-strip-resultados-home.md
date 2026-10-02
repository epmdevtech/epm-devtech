# SPEC-067 — Stat Strip Tipográfica para Seção de Resultados da Home

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Motivação

Atualmente, a seção de Resultados da Home ("Resultados comprovados em operações de grande escala" / "EXPERIÊNCIA PRÁTICA") apresenta as 4 métricas (`99,9%`, `2.500+`, `+448`, `Zero`) presas em cards fechados com bordas idênticas (`p-5 rounded-xl border border-border-default bg-surface`).

Essa repetição de containers fechados sobrecarrega visualmente a página com caixas desnecessárias e empobrece a leitura de números de alto impacto técnico.

A proposta é transformar essa seção em uma **Stat Strip tipográfica editorial** (estilo Linear.app / Stripe):
- Remoção total dos cards e bordas ao redor de cada número individual.
- Tipografia de grande escala (`text-4xl sm:text-5xl lg:text-6xl`) em fonte monospace de alta precisão.
- Rótulos em destaque com cor da marca (`text-text-brand` / teal) e descrições em `text-secondary`.
- Faixa envolta por divisores sutis horizontais (`border-y border-border-default/60`) e divisores verticais discretos entre as colunas, criando respiro editorial.

---

## 2. Princípios e Regras Fundamentais

1. **"Uma ideia, um lugar" & Preservação Factual de Dados**:
   - Manter as 4 métricas canônicas, títulos e descrições aprovadas na SPEC-062:
     - `99,9%` — Alta disponibilidade — Sistemas tolerantes a falhas em produção.
     - `2.500+` — Requisições por segundo — Back-ends sem gargalos de concorrência.
     - `+448` — Instituições e escolas — Operações simultâneas em escala nacional.
     - `Zero` — Perda de dados — Transações e conformidade operacional.
   - Preservar a nota de rodapé com asterisco: `* Resultados de projetos da liderança técnica da EPM DevTech em outras empresas.`
   - Preservar o link canônico `Ver projetos →` direcionando para `/experiencia`.
2. **Foco 100% Tipográfico**:
   - Eliminação de caixas fechadas. O peso visual é transmitido pela tipografia e pelo espaçamento negativo generoso.
3. **Tokens Semânticos em 2 Camadas (SPEC-063 / SPEC-064)**:
   - `text-primary` nos números para máximo contraste (17.26:1 no dark).
   - `text-text-brand` (`#2DD4BF` no dark / `#0F766E` no light) para os rótulos de métrica.
   - `text-secondary` (`#9DB0B3` no dark / `#3F5558` no light) para as descrições.
   - `text-muted` para a nota de rodapé.
   - `border-border-default/60` para as linhas limítrofes da faixa e separadores verticais.
   - Zero classes hardcoded de `zinc-*` ou `emerald-*`.
4. **Responsividade Estrita**:
   - Desktop (`md:` e `lg:`): 4 colunas horizontais com divisores verticais sutis (`md:divide-x`).
   - Mobile: Grid 2x2 ou coluna empilhada fluida sem quebras nem truncamento.

---

## 3. Arquitetura do Componente `HomeResultsStrip.tsx`

```
══════════════════════════════════════════════════════════════════════════════════ (border-y)
      99,9%                   2.500+                  +448                    Zero
 Alta disponibilidade   Requisições por seg.   Instituições e escolas    Perda de dados
 Sistemas tolerantes    Back-ends sem          Operações simultâneas     Transações e conform.
 a falhas em prod.      gargalos concorrênc.   escala nacional           operacional
══════════════════════════════════════════════════════════════════════════════════ (border-y)
```

- **Container da Faixa:** `py-8 sm:py-10 border-y border-border-default/60 my-8`
- **Grid de Métricas:** `grid grid-cols-2 md:grid-cols-4 md:divide-x divide-border-subtle/50 gap-6 md:gap-0`
- **Cada Métrica:**
  - `div` com padding horizontal uniforme (`md:px-6 first:md:pl-0 last:md:pr-0`).
  - Número: `font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-2`.
  - Rótulo: `text-xs sm:text-sm font-semibold text-text-brand uppercase tracking-wider mb-1.5`.
  - Descrição: `text-xs sm:text-sm text-secondary leading-relaxed`.

---

## 4. Critérios de Aceitação

1. **Design & Layout:**
   - Remoção completa de cards fechados individuais com bordas independentes.
   - Exibição de faixa tipográfica contínua com bordas horizontais (`border-y`) e divisores verticais discretos no desktop.
   - Números em destaque grande tipográfico (`text-4xl` a `text-5xl`).
2. **Dados e Links:**
   - Preservação exata das 4 métricas, rótulos, descrições, nota explicativa e link para `/experiencia`.
3. **Design System & Acessibilidade:**
   - 100% de uso de tokens semânticos em 2 camadas com contraste WCAG AAA/AA em Dark e Light Mode.
4. **Quality Gates:**
   - `npx tsc --noEmit` com 0 erros.
   - `npm run lint` com 0 erros.
   - `npm test -- --run` com 100% de aprovação nas 28 suítes de teste.
   - `npx playwright test` com 100% de aprovação nos 43 testes E2E.
   - `npm run build` bem-sucedido sem chunks > 600KB.
