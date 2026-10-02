# SPEC-083 — Refatoração do Hero: Seletor Interativo de Cenários de Negócio e Proposta de Valor Orientada a Decisores

- **Status:** APROVADO (por Elessandro Prestes Macedo)
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo
- **Branch:** `develop`

---

## 1. Contexto e Motivação

Atualmente, na Home (`/`), a coluna direita da seção Hero exibe um quadro visual decorativo intitulado "Topologia de Arquitetura" (`architecture.overview.ts`) contendo camadas estáticas de linguagens e status simulado de "HEALTHY / 99.9% uptime".

### Problemas Identificados:
1. **Comunicação desalinhada**: O card fala com desenvolvedores e foca em detalhes de baixo nível, em vez de dialogar com clientes e decisores de negócio que buscam resolver gargalos operacionais e contratar a construção de software.
2. **Percepção de template artificial**: Códigos e status fictícios geram distanciamento e remetem a templates genéricos gerados por IA.
3. **Disputa de atenção e baixa utilidade**: Não guia o visitante a identificar a dor específica de sua empresa nem atua como alavanca de conversão para as soluções da software house.

### Objetivo:
Substituir o card decorativo por um **Seletor Interativo de Cenários de Negócio** ("O que sua empresa precisa agora?"), estruturar a coluna da esquerda com copy de alto valor, acento visual intencional de leitura, e incluir uma **faixa de confiança operacional** com fatos verificáveis.

---

## 2. Decisões de Design e UX

### 2.1. Coluna da Esquerda (Copy, Decisão & Conversão)

1. **Tag Superior (Eyebrow)**:
   - Manter estilo refinado monospace com o ícone oficial da marca sem pílula/badge:
     `[ ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO ]` via `BrandChipIcon` e `text-text-brand`.
2. **Headline H1 de Alto Impacto com Acento Visual Intencional**:
   - Texto canônico: *"Engenharia de software para construir, integrar e evoluir sistemas."*
   - Acento cromático em `<span className="text-text-brand">construir, integrar e evoluir</span>` utilizando a cor oficial de destaque (*teal* / verde-água), conduzindo o olhar do decisor para o núcleo da entrega técnica sem recorrer a gradientes artificiais.
3. **Subheadline Editorial de Proposta de Valor**:
   - Inclusão de parágrafo explicativo claro:
     *"Sistemas sob medida para empresas que precisam criar plataformas, conectar operações ou modernizar o software do seu negócio."*
   - Tipografia: `text-base sm:text-lg text-secondary leading-relaxed max-w-xl mb-8`.
4. **CTAs Padronizados**:
   - **Botão Primário**: *"Vamos conversar"* direcionando para `/contato`.
   - **Botão Secundário**: *"Ver soluções"* (estilo outline/ghost) direcionando para `#servicos` com rolagem suave.
5. **Faixa de Confiança Operacional**:
   - Posicionada imediatamente abaixo dos botões de ação:
     `"Aplicações corporativas críticas · Energia, educação, indústria e varejo · Retorno em até 24h úteis"`
   - Tipografia refinada: `text-xs sm:text-sm text-secondary/80 font-mono flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-border-default/40`.

---

### 2.2. Coluna da Direita: Seletor Interativo de Cenários de Negócio

1. **Estrutura do Painel**:
   - Painel escuro refinado e elegante:
     `bg-zinc-950/70 dark:bg-zinc-950/70 bg-surface/90 border border-border-default/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl`.
   - Cabeçalho:
     - Título: *"O que sua empresa precisa agora?"* (`text-base sm:text-lg font-bold text-primary`).
     - Indicador discreto: `● Direcionamento técnico imediato` com ponto luminoso em verde-água (`bg-brand animate-pulse`).
2. **4 Cenários de Negócio Interativos**:
   - **Cenário 1**: *"Criar um novo sistema, portal ou plataforma web"*
     - Destino: `/servicos#sistemas` (direciona para a vertical de plataformas em `/servicos`).
   - **Cenário 2**: *"Conectar sistemas antigos e automatizar fluxos de dados"*
     - Destino: `/servicos#integracoes` (direciona para a vertical de integrações e barramentos).
   - **Cenário 3**: *"Modernizar e refatorar um software legado sem parar a operação"*
     - Destino: `/servicos#legados` (direciona para modernização e estrangulamento de monólitos).
   - **Cenário 4**: *"Avaliar arquitetura e ter uma segunda opinião técnica sênior"*
     - Destino: `/contato` (direciona para agendamento de diagnóstico técnico direto com o fundador).
3. **Design dos Itens & Affordance**:
   - Cada linha funciona como um bloco interativo envolvente:
     `group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-transparent hover:border-border-default hover:bg-surface-elevated/70 dark:hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer`.
   - **Nó Circular Indicador à Esquerda**:
     - Círculo de nó conectado à linha condutora: ao hover ou foco do teclado, transiciona de neutro (`bg-zinc-800 border-zinc-700`) para verde-água luminoso (`bg-brand border-brand shadow-glow-brand scale-110`).
   - **Texto da Dor/Demanda**:
     - `text-xs sm:text-sm font-medium text-secondary group-hover:text-primary transition-colors`.
   - **Seta Direcional à Direita**:
     - Ícone `ArrowUpRight` (16px) do `lucide-react`, com transição de translado suave (`group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand`).

---

### 2.3. Linha Condutora Conectada & Animação

1. **Linha SVG Vertical Contínua**:
   - Um traço SVG vertical elegante interligando os nós dos 4 cenários.
   - Animação de entrada suave e discreta: desenha-se uma única vez ao carregar (`pathLength: 0 -> 1` em 800ms).
   - Acessibilidade: com `useReducedMotion()`, a linha renderiza imediatamente completa sem animação (`pathLength: 1`).
2. **Interatividade Micro**:
   - Ao passar o mouse sobre um cenário, o nó correspondente reage com escala e brilho sutil, proporcionando feedback visual imediato.

---

### 2.4. Integração com o Sistema de Camadas Tonais (SPEC-082)

- O Hero preserva integralmente seu tom `data-tone="anchor"` e fundo `bg-surface-anchor text-foreground`.
- Compatibilidade 100% com Dark Mode e Light Mode via tokens semânticos (`text-primary`, `text-secondary`, `bg-surface`, `border-border-default`).

---

## 3. Arquitetura e Arquivos Afetados

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-083-hero-seletor-cenarios-negocio.md` | Criar | Esta especificação |
| `tasks/TASK-083-hero-seletor-cenarios-negocio.md` | Criar | Registro de execução da tarefa SDD |
| `src/components/sections/Hero.tsx` | Modificar | Refatoração completa com copy, faixa operacional e seletor de cenários |
| `src/components/sections/__tests__/Hero.test.tsx` | Modificar | Atualização de testes unitários para a nova estrutura |
| `e2e/design-system-and-stability.spec.ts` | Modificar | Ajuste no teste de headings para validar acento cromático intencional no H1 do Hero |
| `reviews/QA-083.md` | Criar | Relatório de validação e evidências visuais |
| `PROJECT.md` | Modificar | Atualização do estado canônico do Hero |
| `CHANGELOG.md` | Modificar | Registro da versão `[0.0.83-hero-seletor-cenarios-negocio]` |

---

## 4. Quality Gates

1. **TypeScript**: Zero erros (`npx tsc --noEmit`).
2. **ESLint**: Zero erros e warnings (`npm run lint`).
3. **Vitest**: 100% dos testes passando (`npm test -- --run`).
4. **Playwright**: Todos os testes E2E aprovados (`npx playwright test`).
5. **Build**: `npm run build` sem warnings de chunk > 600KB e SSR prerender bem-sucedido.
6. **Acessibilidade**: WCAG AAA, foco por teclado nos 4 links de cenário, contraste de texto preservado, respeito a `prefers-reduced-motion`.
