# SPEC-065 — Bento Grid Assimétrico para Seção de Serviços da Home

- **Status:** Concluído / Aprovado
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Motivação

Atualmente, a seção de Serviços da Home ("O que desenvolvemos" / "Engenharia sob medida para os gargalos da sua operação") utiliza uma grade simétrica de 4 colunas com cards retangulares idênticos contendo um ícone de 40x40px, título e descrição em texto.

Embora o conteúdo e a hierarquia semântica estejam corretos, a simetria uniforme dos 4 cards gera uma impressão visual de "template pronto" ou "layout gerado por IA".

Para alinhar a estética ao padrão de empresas de engenharia de software e produtos B2B de alto padrão (como Linear.app, Vercel e Stripe), a seção será refatorada para um **Bento Grid assimétrico de 12 colunas no desktop**, conferindo contraste visual, destaque técnico e micro-artefatos visuais informativos em cada frente de serviço.

---

## 2. Princípios e Regras Fundamentais

1. **"Uma ideia, um lugar" & Preservação da Copy**:
   - Manter rigorosamente os títulos, subtítulos e textos de negócio aprovados na SPEC-062.
   - Cada card foca no problema de negócio resolvido, complementado por um micro-artefato técnico editorial.
2. **Sistema de Tokens Semânticos em 2 Camadas (SPEC-063 / SPEC-064)**:
   - Uso exclusivo de tokens semânticos: `bg-surface`, `bg-surface-elevated`, `bg-base`, `border-border-default`, `text-primary`, `text-secondary`, `text-muted`, `text-brand`, `accent-blue`, `accent-violet`, `accent-amber`.
   - **Zero classes genéricas hardcoded** (sem `emerald-*` ou `zinc-*` avulsos).
   - Suporte perfeito e testado para Dark Mode (padrão) e Light Mode.
3. **Acessibilidade & Aterrissagem**:
   - Cada card do Bento Grid permanece 100% clicável como `<Link to="/servicos">` com `aria-label` descritivo e anel de foco visível (`focus-visible:ring-2 focus-visible:ring-focus-ring`).
   - Micro-interações respeitam `prefers-reduced-motion`.
4. **Responsividade Estrita**:
   - Desktop (>= 768px): Bento Grid 12 colunas assimétrico (7+5, 5+7).
   - Mobile (< 768px): Coluna única fluida (`col-span-12`) sem truncamento de texto ou código.

---

## 3. Arquitetura do Bento Grid (12 Colunas)

```
┌────────────────────────────────────────────────────────┬────────────────────────────────────────────┐
│  CARD 1: APIs e back-end (md:col-span-7)               │  CARD 2: Sistemas e portais (md:col-span-5)│
│  - Ícone Cpu + Badge de Alta Performance               │  - Ícone Code2                             │
│  - Título + Problema de Negócio                        │  - Título + Problema de Negócio            │
│  - Mock Técnico: Requisição HTTP, payload & latência   │  - Mock Técnico: Stack tags + Clean Arch   │
├────────────────────────────────────────────────────────┼────────────────────────────────────────────┤
│  CARD 3: Integrações de dados (md:col-span-5)          │  CARD 4: Modernização de legados (col-7)   │
│  - Ícone Database                                      │  - Ícone RefreshCw                         │
│  - Título + Problema de Negócio                        │  - Título + Problema de Negócio            │
│  - Mock Técnico: Flow de Webhooks / Hub de Eventos     │  - Mock Técnico: Monólito -> Desacoplado   │
└────────────────────────────────────────────────────────┴────────────────────────────────────────────┘
```

### 3.1. Detalhamento dos 4 Cards

#### Card 1 — APIs e back-end (`md:col-span-7` — Destaque Principal)
- **Accent:** `accent-violet` (`#A78BFA` no dark / `#6D28D9` no light).
- **Conteúdo:** "Processe regras complexas e alto volume com segurança, sem lentidão ou quedas inesperadas."
- **Mock Visual Técnico:** Terminal/pipeline de requisição HTTP em fonte monospace (`font-mono`):
  - Linha do endpoint: `POST /api/v2/transactions/settlement`
  - Headers / Status: `200 OK` com badge de latência `18ms`
  - Payload estruturado: `{ throughput: "2.5k RPS", idempotency: true, zero_loss: true }`

#### Card 2 — Sistemas e portais (`md:col-span-5`)
- **Accent:** `accent-blue` (`#38BDF8` no dark / `#0369A1` no light).
- **Conteúdo:** "Elimine gargalos operacionais e erros manuais com plataformas web sob medida para sua equipe."
- **Mock Visual Técnico:** Stack moderna de engenharia front-end + garantia de arquitetura:
  - Tags de tecnologias: `React 18`, `TypeScript`, `Tailwind CSS`, `Clean Architecture`
  - Visual de interface web simplificada com controles de janela e indicador `100% Type-Safe`.

#### Card 3 — Integrações de dados (`md:col-span-5`)
- **Accent:** `accent-amber` (`#FBBF24` no dark / `#B45309` no light).
- **Conteúdo:** "Conecte seus sistemas e automatize fluxos manuais com comunicação confiável e sem perdas."
- **Mock Visual Técnico:** Diagrama visual de fluxo de integração:
  - Conectores: `ERP Corporativo` ──▶ `RabbitMQ / Event Hub` ──▶ `CRM & APIs`
  - Status em tempo real: `Webhook Sincronizado` com pulso de atividade.

#### Card 4 — Modernização de legados (`md:col-span-7`)
- **Accent:** `brand` (`#2DD4BF` no dark / `#0F766E` no light).
- **Conteúdo:** "Atualize sistemas antigos que travam o crescimento do negócio sem interromper a operação diária."
- **Mock Visual Técnico:** Transição arquitetural direta:
  - Origem: `Monólito Legado` (sinal de alerta, dependências acopladas)
  - Transição: seta com badge `Migração Contínua (Zero Downtime)`
  - Destino: `Arquitetura Desacoplada` (modular, manutenível, escalável)

---

## 4. Estrutura de Componentes

Criar componente modular e dedicado:
- `src/components/sections/HomeServicesBento.tsx`: Implementação limpa do Bento Grid com TypeScript estrito, responsividade mobile-first e animações sutis.
- Atualizar `src/pages/Home.tsx` para importar e renderizar `<HomeServicesBento />` mantendo o cabeçalho existente e o link para `/servicos`.

---

## 5. Critérios de Aceitação

1. **Layout & Responsividade:**
   - No desktop (>= 768px), os 4 cards formam um Bento Grid de 12 colunas (7+5 na primeira linha, 5+7 na segunda).
   - No mobile (< 768px), os cards empilham verticalmente em coluna única com padding adequado e sem overflow horizontal.
2. **Tokens de Design System & Contraste:**
   - Uso exclusivo dos tokens semânticos (`bg-surface`, `bg-surface-elevated`, `border-border-default`, `text-primary`, `text-secondary`, `text-muted`, `accent-*`).
   - Contraste em Dark Mode e Light Mode aprovado em WCAG AAA/AA.
   - Zero classes utilitárias não-semânticas (`emerald-*`, `zinc-*`).
3. **Acessibilidade:**
   - Cards 100% acessíveis via teclado com foco visível.
   - `aria-label` completo em cada card direcionando para `/servicos`.
4. **Quality Gates:**
   - `npx tsc --noEmit` com 0 erros.
   - `npm run lint` com 0 erros.
   - `npm test -- --run` com 100% de aprovação nas 25 suítes de teste.
   - `npx playwright test` com 100% de aprovação nos 43 testes E2E.
   - `npm run build` bem-sucedido sem chunks > 600KB.
