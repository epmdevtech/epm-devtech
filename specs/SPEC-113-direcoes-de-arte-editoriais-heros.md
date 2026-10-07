# SPEC-113 — Direções de Arte Editoriais e Abertas nos Heros das Rotas

## Status
- **Status:** Aprovado pelo PO
- **Data:** 2026-10-07
- **Autor:** Principal Design Director (UX/UI Lead) & Creative Front-end Technologist Sênior
- **Decisão:** Abandonar o padrão mecânico de cards flutuantes fechados (`bg-zinc-900 border rounded-xl shadow-lg`) em favor de direções de arte autorais, abertas e integradas diretamente no layout para cada rota interna.

---

## 1. Contexto & Problema de Design

O redesign anterior unificou o layout dos Heros em uma proporção split 60/40 com cards fechados. No entanto, a aplicação uniforme desse padrão gerou uma repetição mecânica de "texto à esquerda + card fechado à direita", empobrecendo a percepção de marca e tornando o site previsível como um template.

Apenas a rota `/about` possuía identidade autoral plena com a Constelação SVG interativa. Todas as demais rotas demandam direções de arte espacialmente distintas, inspiradas no design editorial de alta engenharia (como Linear, Stripe e Vercel):
- Layouts abertos sem caixas/containers opacos confinados
- Tipografia display de grande impacto
- Réguas técnicas milimétricas e hairlines de 1px
- Blueprints vetoriais CAD e malhas de dados integradas ao fundo

---

## 2. Direções de Arte Específicas por Rota

### 2.1 Rota `/` (Home) — Malha Vetorial Contínua (Integrated Circuit Mesh)
- **Eliminação:** Remoção da caixa/card flutuante opaca ao redor do seletor de cenários.
- **Visual:** Malha vetorial contínua em SVG com linhas de circuito finíssimas (`stroke-zinc-800` / `stroke-zinc-700/50` com acentos em `emerald-400/50` e `#2DD4BF`), conectando os nós de cenários diretamente à infraestrutura da malha.
- **Interatividade:** Preservação estrita dos seletores de cenários corporativos (`data-testid="hero-scenario-selector"`, `scenario-link-sistemas`, `scenario-link-integracoes`, `scenario-link-legados`, `scenario-link-diagnostico`).
- **Ancoragem:** Ponto ativo com `.animate-pulse` em `bg-brand` (#2DD4BF) e CTA primário único "VAMOS CONVERSAR" (`btn-bevel-4`).

### 2.2 Rota `/services` — Grid Tipográfico Técnico Aberto (Architectural Spec Grid)
- **Eliminação:** Remoção de cards empilhados fechados.
- **Visual:** Grid aberto delimitado por hairlines de 1px (`border-zinc-800`), respirando no fundo da página, com marcadores milimétricos e três faixas de especificação técnica editorial:
  * `01 // PLATAFORMAS & SISTEMAS WEB`
  * `02 // INTEGRAÇÕES CRÍTICAS & APIs`
  * `03 // MODERNIZAÇÃO DE SISTEMAS LEGADOS`
- **Tipografia:** Fonte mono/display com coordenadas técnicas e réguas milimétricas integradas.

### 2.3 Rota `/how-we-work` — Régua de Precisão de Engenharia (Execution Timeline Sequence)
- **Eliminação:** Remoção do card flutuante em caixa fechada.
- **Visual:** Régua horizontal de precisão milimétrica integrada à dobra, com graduação milimétrica (ticks SVG) e linha técnica contínua conectando as 4 fases de entrega:
  * `[01] DIAGNÓSTICO ESTRATÉGICO`
  * `[02] ARQUITETURA RESILIENTE`
  * `[03] CICLOS INCREMENTAIS`
  * `[04] PRODUÇÃO COM ZERO INTERRUPÇÃO`
- **Microinterações:** Pulso sutil de sinal técnico ao longo da régua, transmitindo previsibilidade e ritmo de engenharia.

### 2.4 Rota `/experience` — Composição Tipográfica Display de Métricas (Large-Scale Performance Index)
- **Eliminação:** Remoção de cartões pequenos confinados.
- **Visual:** Números monumentais em escala display (`text-5xl md:text-7xl font-bold tracking-tighter text-white`) acompanhados de linhas de cota técnica CAD e marcadores de precisão:
  * `99.98%` — Disponibilidade e estabilidade em ambientes de produção
  * `0` — Tolerância a paradas não planejadas
  * Setores Críticos — Fintech, Logística, Supply Chain e Saúde
- O contraste entre os grandes números e linhas de cota de 1px atua como a própria identidade de arte da página.

### 2.5 Rota `/engineering` — Blueprint Arquitetural Isométrico em Linha Fina (Technical Wireframe Projection)
- **Eliminação:** Remoção de terminais escuros e cards de vidro opaco.
- **Visual:** Blueprint vetorial isométrico/ortogonal em linha fina (estilo CAD técnico sem preenchimento opaco), revelando as 4 camadas de software corporativo:
  * `01 // API GATEWAY (Edge Ingress & Auth)`
  * `02 // CORE SERVICES (Distributed Business Logic)`
  * `03 // EVENT STREAM (Message Broker & Pipelines)`
  * `04 // PERSISTENT DATA (High-Availability Storage)`
- Linhas tracejadas finas de barramento, cotas de precisão e nós conectores limpos.

### 2.6 Rota `/about` — Constelação SVG Interativa
- **Manutenção:** Preservação da Constelação interativa já existente (`EpmConstellation`), que já obedece à linguagem aberta sem containers fechados.

### 2.7 Rota `/contact` — Painel Tipográfico Integrado (Direct Line Terminal)
- **Hero:** Visual aberto ponto-a-ponto conectando "Decisor / Empresa" à "Liderança Técnica EPM", com canal de sinal técnico e sem caixa flutuante.
- **Formulário:** Eliminação do container delimitador fechado (`rounded-2xl shadow-xl bg-surface border`). O formulário passa a respirar diretamente no fundo da seção com linhas limpas de preenchimento underline (`border-b border-zinc-700 bg-transparent`), tipografia editorial elegante e botão "ENVIAR MENSAGEM".

---

## 3. Requisitos Não Funcionais & Quality Gates

1. **Acessibilidade & Contraste:** Cores e textos com contraste mínimo WCAG 2.1 AA (ou AAA em textos principais).
2. **Reduced Motion:** Respeito integral a `prefers-reduced-motion: reduce`.
3. **Responsividade:** Layouts fluidos do mobile (320px) ao desktop (1920px+).
4. **Retrocompatibilidade de Testes:**
   - Manutenção de todos os `data-testid`, H1s canônicos, IDs de seção e ancoragem.
   - Preservação da suíte de 41 testes Vitest e 46 testes E2E do Playwright.
5. **Git Protocol:** Nenhum commit será realizado até validação e aprovação expressa do usuário.

---

_Aprovado pelo PO em 2026-10-07._
