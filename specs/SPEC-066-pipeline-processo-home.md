# SPEC-066 — Pipeline Contínuo de Processo e Metodologia na Home

- **Status:** Concluído / Aprovado
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Motivação

Atualmente, a seção de Processo na Home ("PROCESSO E PREVISIBILIDADE" / "Engenharia previsível com contato direto com quem constrói") apresenta as 4 etapas (01 a 04) presas em cards retangulares fechados e isolados (`p-5 rounded-xl border border-border-default bg-surface`).

Essa apresentação em "caixas individuais" contradiz a essência de um fluxo contínuo de engenharia, além de reforçar o aspecto de template genérico. 

A refatoração transformará essas etapas em um **Pipeline contínuo de engenharia**:
- No **Desktop**: Linha condutora horizontal conectando nós técnicos (`01` a `04`) sem bordas de caixas fechadas.
- No **Mobile/Tablet**: Timeline vertical fluida com linha lateral contínua à esquerda, garantindo leitura linear e sem quebra visual.

---

## 2. Princípios e Regras Fundamentais

1. **"Uma ideia, um lugar" & Preservação da Copy**:
   - Manter rigorosamente os textos de negócio já aprovados na SPEC-062:
     - 01 · ENTENDIMENTO: "Diagnóstico técnico" — "Alinhamento direto de objetivos, arquitetura e viabilidade do projeto."
     - 02 · DEFINIÇÃO: "Escopo e arquitetura" — "Especificação detalhada, critérios de aceite e cronograma de entregas."
     - 03 · DESENVOLVIMENTO: "Ciclos incrementais" — "Código testado com validações contínuas em ambiente de homologação."
     - 04 · EVOLUÇÃO: "Sustentação e escala" — "Monitoramento contínuo e suporte direto para novas demandas operacionais."
   - Manter o cabeçalho existente (`BrandChipIcon`, título e subtítulo) e o link para `/como-trabalhamos`.
2. **Eliminação de Caixas Fechadas**:
   - Remoção de bordas de caixas isoladas ao redor de cada etapa.
   - O ritmo visual é conduzido pela linha conectora e pelos nós técnicos destacados.
3. **Tokens Semânticos em 2 Camadas (SPEC-063 / SPEC-064)**:
   - Uso de `text-primary`, `text-secondary`, `text-muted`, `border-border-default`, `border-subtle`, e as 4 cores de apoio semânticas:
     - Etapa 01: `accent-blue` (`#38BDF8` no dark / `#0369A1` no light)
     - Etapa 02: `accent-violet` (`#A78BFA` no dark / `#6D28D9` no light)
     - Etapa 03: `accent-amber` (`#FBBF24` no dark / `#B45309` no light)
     - Etapa 04: `brand` (`#2DD4BF` no dark / `#0F766E` no light)
   - Zero classes hardcoded de `zinc-*` ou `emerald-*`.
4. **Responsividade Estrita**:
   - Desktop (`md:` e `lg:`): 4 colunas horizontais com linha condutora superior conectando os centros dos nós.
   - Mobile (`< md`): Timeline vertical com linha contínua à esquerda e nós alinhados ao topo de cada passo.

---

## 3. Arquitetura do Componente `HomeProcessPipeline.tsx`

### 3.1. Estrutura Visual Desktop
```
  [01] ─────────────── [02] ─────────────── [03] ─────────────── [04]
ENTENDIMENTO         DEFINIÇÃO          DESENVOLVIMENTO        EVOLUÇÃO
Diagnóstico técnico  Escopo e arquit.   Ciclos incrementais    Sustentação e escala
Desc...              Desc...            Desc...                Desc...
```

- **Linha Condutora Horizontal:** Posicionada no eixo `top-[18px]` com gradiente sutil conectando `accent-blue` ➔ `accent-violet` ➔ `accent-amber` ➔ `brand`.
- **Nó Técnico (Node):** Círculo `w-9 h-9` em `bg-surface` com borda temática de 2px, numeração monospace (`01` a `04`), e micro-interação em hover (leve escala `scale-110` e glow temático).

### 3.2. Estrutura Visual Mobile / Tablet (< md)
```
  [01] ENTENDIMENTO · Diagnóstico técnico
   │   Alinhamento direto de objetivos, arquitetura e viabilidade...
  [02] DEFINIÇÃO · Escopo e arquitetura
   │   Especificação detalhada, critérios de aceite...
  [03] DESENVOLVIMENTO · Ciclos incrementais
   │   Código testado com validações contínuas...
  [04] EVOLUÇÃO · Sustentação e escala
       Monitoramento contínuo e suporte direto...
```

- **Linha Condutora Vertical:** Posicionada em `left-[17px]`, `top-4`, `bottom-4` com largura de `2px`.
- Espaçamento de leitura generoso (`pb-8`) com nó fixo à esquerda (`left-0`) e conteúdo recuado com `pl-14`.

---

## 4. Critérios de Aceitação

1. **Design & Layout:**
   - Eliminação completa de caixas fechadas (`border` em volta de cada card).
   - Desktop exibe linha horizontal contínua conectando os 4 nós.
   - Mobile (< 768px) exibe timeline vertical contínua conectada à esquerda.
2. **Tokens de Design System & Acessibilidade:**
   - 100% de uso de tokens semânticos (`text-primary`, `text-secondary`, `text-muted`, `accent-*`).
   - Contraste em conformidade WCAG AAA/AA em Dark e Light Mode.
   - Lista semanticamente acessível (`<ol>` ordenada para as etapas de processo).
3. **Quality Gates:**
   - `npx tsc --noEmit` com 0 erros.
   - `npm run lint` com 0 erros.
   - `npm test -- --run` com 100% de aprovação nas 27 suítes de teste.
   - `npx playwright test` com 100% de aprovação nos 43 testes E2E.
   - `npm run build` bem-sucedido sem chunks > 600KB.
