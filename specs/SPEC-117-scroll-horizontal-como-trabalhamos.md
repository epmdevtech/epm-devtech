# SPEC-117 — Scroll Horizontal Nativo na Rota `/how-we-work` (Como Trabalhamos)

## Status
- **Status:** ✅ Aprovada pelo PO (solicitação direta e detalhada do Product Owner, executada sob o protocolo SDD deste repositório)
- **Data:** 2026-10-16
- **Autor:** Senior Frontend / UX Engineer — Engenharia de Interfaces
- **Versão:** 1.0
- **Decisão:** Substituir o `ProcessExplorer` (tabs/acordeão) da rota `/how-we-work` por uma narrativa horizontal das 4 etapas controlada pelo scroll vertical, implementada com **CSS nativo de scroll-driven animations** (`position: sticky` + `animation-timeline: view()` + `animation-range`), com fallback vertical acessível e sem dependências novas.

---

## 1. Contexto e Motivação

A rota `/how-we-work` apresenta hoje o `ProcessExplorer` (tabs verticais no desktop e acordeão no mobile). O objetivo é elevar a percepção de engenharia premium e previsibilidade operacional, transformando as quatro etapas — **Entendimento, Definição, Desenvolvimento e Evolução** — em uma narrativa horizontal contínua conduzida pelo scroll vertical, inspirada na demonstração pública `scroll-driven-animations.style/demos/horizontal-section/css/` (técnica de `view-timeline` + `position: sticky`).

A mudança deve melhorar a compreensão do processo, mantendo legibilidade, acessibilidade, performance e conversão comercial como prioridades sobre o efeito visual.

---

## 2. Objetivo

Implementar, exclusivamente na rota `/how-we-work`, uma seção de scroll horizontal nativa que:

1. Reproduza o comportamento de scroll da referência (seção fixada enquanto o conteúdo desliza no eixo X).
2. Reutilize a identidade visual, tokens, tipografia e camadas tonais (SPEC-082) existentes.
3. Preserve integralmente os conteúdos comerciais já publicados (entregáveis concretos, resumos executivos e critérios de saída das 4 etapas, manifesto de Garantia Operacional e Gestão Direta).

---

## 3. Escopo

### 3.1 Está incluído (IN)

- **Parte A — Introdução convencional:** manter o `PageHero` atual (título "Como trabalhamos" + descrição) sem criar hero excessivamente alto.
- **Parte B — Narrativa horizontal:** 4 painéis com número, categoria, título, mensagem, elemento visual autoral (diagrama CSS/SVG) e a lista de entregáveis + critério de saída de cada etapa, preservados do conteúdo atual.
- **Parte C — Detalhamento e conversão:** manter o Manifesto Técnico (`// GARANTIA OPERACIONAL` e `// GESTÃO DIRETA`) em `tone="alt"` e encerrar com um CTA consistente para `/contact` (mecanismo de contato existente).
- **Fallback e acessibilidade:** apresentação vertical legível quando não houver suporte a `animation-timeline: view()`, em viewports < 1024px e sob `prefers-reduced-motion: reduce`.
- **Artefatos SDD:** SPEC, TASK, ADR, QA e REVIEW.

### 3.2 Não está incluído (OUT)

- Alterações na Home (`HomeProcessPipeline.tsx` / `HowWeWork.tsx`) e demais rotas.
- Alterações no `Header`, `Footer`, `Layout`, `SmoothScrollProvider` (Lenis/GSAP), tema claro/escuro, SEO/`Helmet`, `scripts/prerender.js`, `vercel.json` ou `middleware.ts`.
- Instalação de dependências.
- Criação de dashboards ou dados fictícios que possam ser confundidos com produtos reais.

---

## 4. Requisitos Funcionais

1. A seção da Parte B deve conter exatamente quatro painéis, na ordem 01→04, com as categorias `ENTENDIMENTO`, `DEFINIÇÃO`, `DESENVOLVIMENTO` e `EVOLUÇÃO`.
2. O scroll vertical deve conduzir o deslocamento horizontal de todos os painéis e retornar ao fluxo vertical normal após o último painel.
3. Cada painel deve exibir número, categoria, título, mensagem, elemento visual e os entregáveis/critério de saída já existentes no projeto.
4. O manifesto e o CTA da Parte C devem permanecer no fluxo vertical convencional.

### 4.1 Conteúdo canônico dos painéis (reuso do texto existente)

| Etapa | Categoria | Título | Mensagem | Entregáveis (preservados) | Critério de Saída (preservado) |
|---|---|---|---|---|---|
| 01 | ENTENDIMENTO | Diagnóstico inicial | "Mapeamos a operação, os sistemas existentes e os gargalos antes de iniciar a implementação." | Matriz de Riscos & Restrições · Diagrama C4 Inicial · Estimativa de Custo de Nuvem · Documento de Visão de Produto | Alinhamento técnico e de objetivos formalmente acordado antes da implementação. |
| 02 | DEFINIÇÃO | Escopo e entregáveis | "Definimos prioridades, arquitetura, critérios de aceite e planejamento antes de codificar." | Especificações Técnicas (SPECs) · Contratos de API (OpenAPI) · Backlog Técnico Priorizado · Cronograma de Marcos e Sprints | Escopo, arquitetura e marcos de entrega validados em conjunto com a sua equipe. |
| 03 | DESENVOLVIMENTO | Entregas incrementais | "Desenvolvemos, testamos e validamos incrementos para que o cliente acompanhe a evolução real." | Código com Cobertura de Testes (≥90%) · Pipeline CI/CD Automatizado · Builds Incrementais Homologados · Documentação Viva de Código | Funcionalidades testadas e homologadas pela sua equipe antes de entrarem em produção. |
| 04 | EVOLUÇÃO | Sustentação e melhoria | "Acompanhamos a operação e evoluímos a solução de acordo com as necessidades do negócio." | Dashboards de Telemetria e Logs · Métricas de Performance e SLAs · Plano de Sustentação Contínua · Guia de Repasse e Transferência | Sistema em produção com telemetria ativa e suporte técnico dedicado. |

---

## 5. Requisitos Não-Funcionais

| Requisito | Critério |
|---|---|
| Estratégia de animação | CSS nativo (`animation-timeline: view()`); sem GSAP/Framer Motion/Lenis novos para a animação |
| Geometria | Altura da seção derivada das larguras reais dos painéis (sem `500vh` arbitrário); sem deslocamento horizontal excedente |
| Compatibilidade | Fallback vertical sem dependência de recurso experimental |
| Acessibilidade | WCAG 2.1 AA; ordem semântica; navegação por teclado; foco visível; `prefers-reduced-motion` |
| Responsividade | Mobile (<1024px) e movimento reduzido usam o layout vertical; desktop usa o horizontal |
| SEO | H1 único preservado; metadados da rota inalterados |
| Testes | Suíte Vitest verde; lint e build sem erros |

---

## 6. Comportamento Esperado

### Cenário 1: Desktop com suporte a scroll-driven animations
**Dado** que o visitante acessa `/how-we-work` em viewport ≥ 1024px, sem movimento reduzido e com suporte a `animation-timeline: view()`  
**Quando** ele rola verticalmente pela seção  
**Então** os quatro painéis deslizam horizontalmente até que o último esteja alinhado à direita, e o scroll vertical retoma normalmente.

### Cenário 2: Fallback (sem suporte, mobile ou movimento reduzido)
**Dado** que o recurso não é suportado, a viewport é < 1024px ou `prefers-reduced-motion: reduce` está ativo  
**Quando** o visitante percorre a seção  
**Então** os quatro passos aparecem em sequência vertical legível, sem deslocamento animado.

### Cenário 3: Leitor de tela / teclado
**Dado** que o visitante usa leitor de tela ou teclado  
**Quando** navega pela seção  
**Então** encontra uma lista ordenada com os quatro passos, títulos e entregáveis acessíveis, sem foco preso.

---

## 7. Critérios de Aceitação

- [ ] A rota `/how-we-work` possui scroll horizontal funcional em desktop com suporte ao recurso.
- [ ] As quatro etapas existentes estão representadas com número, categoria, título, mensagem, entregáveis e critério de saída.
- [ ] A Home e as demais rotas permanecem inalteradas em comportamento.
- [ ] Funciona nos temas claro e escuro.
- [ ] Mobile oferece alternativa de leitura vertical adequada.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] O fallback funciona sem suporte a scroll-driven animations.
- [ ] Não há espaços vazios excessivos, painéis cortados ou scroll horizontal acidental.
- [ ] H1 único e metadados da rota preservados (E2E `multi-route-navigation`).
- [ ] Ritmo tonal (SPEC-082) preservado: `anchor → base → alt → anchor`.
- [ ] `npm run lint`, `npm test` e `npm run build` aprovados com resultados documentados.

---

## 8. Impactos e Dependências

### Arquivos a criar
- `src/components/sections/HowWeWorkHorizontal.tsx`
- `src/components/sections/__tests__/HowWeWorkHorizontal.test.tsx`
- `specs/SPEC-117-scroll-horizontal-como-trabalhamos.md`
- `tasks/TASK-117-scroll-horizontal-como-trabalhamos.md`
- `adr/ADR-009-scroll-horizontal-css-nativo.md`
- `reviews/QA-117.md`
- `reviews/REVIEW-117-scroll-horizontal-como-trabalhamos.md`

### Arquivos a modificar
- `src/pages/HowWeWorkPage.tsx`
- `PROJECT.md`
- `CHANGELOG.md`

### Arquivos a remover (dead code)
- `src/components/sections/ProcessExplorer.tsx`
- `src/components/sections/__tests__/ProcessExplorer.test.tsx`

### Dependências
- Depende de: SPEC-082 (camadas tonais), SPEC-096 (sistema editorial), SPEC-099 (smooth scroll Lenis/GSAP), SPEC-104 (chanfro), SPEC-110 (scroll reveal), SPEC-111 (PageHero).
- Supersede parcialmente a SPEC-087 apenas quanto ao CTA final da rota `/how-we-work` (reintrodução de um CTA único e discreto para `/contact`).
- Bloqueia: nenhum.

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Conflito entre Lenis e animações CSS de scroll | Média | Lenis usa scroll nativo (`window.scrollTo`), compatível com `view-timeline`; não alterar o provider |
| `overflow` de ancestrais quebrar `position: sticky` | Baixa | `body` usa `overflow-x: clip` (não cria scroll container); validado no reconhecimento |
| Suporte limitado a `animation-timeline` | Alta | `@supports` com fallback vertical; conteúdo sempre legível |
| Espaço vertical desproporcional | Média | Altura da seção calculada a partir da geometria real dos painéis |
| Falha no pré-render | Baixa | Componente puramente declarativo, sem `window`/`document` |

---

## 10. Referências

- Demonstração de referência: `https://scroll-driven-animations.style/demos/horizontal-section/css/`
- ADR relacionado: `adr/ADR-009-scroll-horizontal-css-nativo.md`
- SPECs relacionadas: SPEC-082, SPEC-087, SPEC-096, SPEC-099, SPEC-104, SPEC-110, SPEC-111

---

## Aprovação

| Campo | Valor |
|---|---|
| **Aprovado por** | Elessandro Prestes Macedo (Product Owner) |
| **Data** | 2026-10-16 |
| **Assinatura** | [x] Aprovado [ ] Rejeitado |
| **Observações** | Aprovação concedida por solicitação direta e detalhada do PO, com instrução explícita de implementação sob o protocolo SDD do repositório. |
