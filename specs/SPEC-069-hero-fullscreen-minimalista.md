# SPEC-069 — Hero Fullscreen Minimalista: Remoção de Badges e Enquadramento 100vh

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Motivação

O usuário identificou oportunidades de apuro visual para eliminar qualquer aspecto remanescente de "template" e conferir impacto editorial de primeiro nível à Home:
1. **Remoção de Cápsulas/Badges Desnecessárias**:
   - Eliminar a moldura/badge arredondada em torno do eyebrow `ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO`, mantendo a tipografia técnica limpa com o ícone oficial da marca.
   - Eliminar a badge/pílula arredondada em torno de `HEALTHY / 99.9% uptime` no cabeçalho da janela dev de arquitetura, mantendo apenas a tipografia técnica e o ponto de status ativo.
2. **Eliminação de Textos Redundantes e Limpeza Minimalista**:
   - Remover a frase de micro social proof `"Sistemas em produção nos setores de energia, indústria, logística e corporativo."` e o respectivo ponto verde.
   - Remover o parágrafo descritivo subheadline (`"Desenvolvemos sistemas corporativos, APIs escaláveis e integrações sob medida, além de modernizar aplicações legadas com foco em qualidade, estabilidade e evolução contínua."`), permitindo que o H1 maduro conduza a leitura imediatamente para os botões de ação (CTAs).
3. **Hero Fullscreen Responsivo (100% da Altura da Tela - 100vh / 100svh)**:
   - A seção Hero deve ocupar a totalidade da primeira dobra visível (`min-h-screen` / `min-h-[100svh]`) de forma adaptativa em computadores, notebooks, tablets e smartphones.
   - A seção subsequente (`#servicos`) não deve aparecer na tela inicial (above the fold), surgindo exclusivamente quando o usuário efetuar a rolagem (scroll).

---

## 2. Decisões de Design e UX

### 2.1. Tipografia e Eyebrow
- **Eyebrow Minimalista**:
  - `data-testid="hero-eyebrow"`
  - `inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-text-brand select-none mb-6`
  - Sem classes de borda, padding de pílula ou fundo (`border`, `bg-brand/5`, `rounded-full`, `px-3`, `py-1` removidos).

### 2.2. Cabeçalho da Janela de Arquitetura
- **Status HEALTHY sem Pílula**:
  - `flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-text-brand`
  - Sem `bg-brand-subtle`, sem `border border-brand/20`, sem `px-2 py-0.5 rounded`.
  - Ponto de status pulsante mantido: `w-1.5 h-1.5 rounded-full bg-brand animate-pulse`.

### 2.3. Fluxo Visual Direto da Coluna Esquerda
- Eyebrow ➔ H1 ➔ CTAs:
  - H1 com margem inferior generosa (`mb-8`).
  - Botões de conversão imediatos ("Falar sobre meu projeto" e "Ver soluções").
  - Remoção de subtítulo e social proof inferior, concentrando 100% da atenção na headline e na ação.

### 2.4. Enquadramento Viewport Fullscreen (100vh / 100svh)
- Container `#hero`:
  - `relative w-full min-h-screen min-h-[100svh] flex flex-col justify-center bg-base bg-gradient-to-b from-transparent to-surface/40 pt-20 pb-12 sm:pb-16 overflow-hidden`
  - Conteúdo perfeitamente centralizado verticalmente na tela.
  - A seção seguinte (`#servicos`) fica localizada a partir de `100vh` do topo, garantindo que a primeira dobra seja 100% dedicada ao Hero em qualquer resolução (desktop, notebook, tablet e mobile).

---

## 3. Escopo de Arquivos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-069-hero-fullscreen-minimalista.md` | Criar | Especificação técnica aprovada |
| `tasks/TASK-069-hero-fullscreen-minimalista.md` | Criar | Rastreamento da tarefa e checklist |
| `src/components/sections/Hero.tsx` | Modificar | Remoção de badges, remoção de subtítulo e social proof, e ajuste para fullscreen 100vh |
| `src/components/sections/__tests__/Hero.test.tsx` | Modificar | Atualização das asserções para o novo layout minimalista |
| `e2e/hero-identity-token-locks.spec.ts` | Modificar | Harmonização dos testes E2E com ausência de subtítulo e nova estrutura |
| `reviews/QA-069.md` | Criar | Relatório de validação dos quality gates |
| `PROJECT.md` e `CHANGELOG.md` | Modificar | Atualização do estado canônico e versão |

---

## 4. Critérios de Aceitação

1. Eyebrow exibido como texto técnico limpo com `BrandChipIcon`, sem cápsula/badge ao redor.
2. Indicador `HEALTHY / 99.9% uptime` exibido como texto técnico com ponto pulsante, sem cápsula/badge ao redor.
3. Subtítulo e frase de micro social proof com ponto verde 100% removidos.
4. `#hero` configurado com `min-h-screen min-h-[100svh] flex flex-col justify-center`, ocupando a tela inteira sem exibir a seção de serviços na primeira dobra antes da rolagem.
5. Responsividade plena em mobile, tablet, notebook e monitores desktop.
6. Zero erros em `npx tsc --noEmit`, `npm run lint`, `npm test -- --run`, `npx playwright test` e `npm run build`.
