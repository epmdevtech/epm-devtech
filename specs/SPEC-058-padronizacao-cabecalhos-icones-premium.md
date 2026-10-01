# SPEC-058 — Padronização de Cabeçalhos de Seção e Sistema de Ícones Premium Autoral

| Metadado | Valor |
|---|---|
| **ID** | SPEC-058 |
| **Título** | Padronização Estrita de Cabeçalhos (SectionHeader) e Suíte de Ícones Conceituais Autorais |
| **Status** | Aprovada |
| **Data de Criação** | 2026-09-30 |
| **Autor** | Elessandro Prestes Macedo |
| **Executor** | Gemini/Antigravity |
| **Versão** | 1.0.0 |

---

## 1. Contexto e Motivação

O projeto EPM DevTech passou por diversas iterações e necessita consolidar com total rigor e uniformidade dois pilares visuais e de design system:
1. **Sistema Único de Cabeçalhos de Seção (`SectionHeader`)**:
   - Eliminar qualquer assimetria ou cabeçalho alinhado à esquerda em seções de conteúdo.
   - Padrão 100% centralizado para blocos curtos (eyebrow + H2 + subtítulo), mantendo todo texto longo corrido à esquerda dentro do corpo da seção.
   - Unificar a escala tipográfica do H2 sem overrides arbitrários (remoção de classes personalizadas como `text-2xl sm:text-3xl` em `Authority.tsx`).
   - Aplicar semântica estrita de acessibilidade (`aria-labelledby="[id]-heading"` em cada `<section>` apontando para o H2).
   - Aplicar `[text-wrap:balance]` para prevenção de viúvas/órfãs visuais.
   - Garantir sentence case em 100% dos títulos, botões e labels.
2. **Suíte de Ícones Premium e Autoral (Adeus "Cara de IA")**:
   - Erradicação de caixas genéricas esmeralda translúcidas nos rodapés dos cards.
   - Suíte vetorial SVG inline autoral desenhada sobre grid 24×24 / 32×32, traço refinado de 1.5px, preenchimento duotone suave (10–12%) e nó verde de assinatura da marca (`hsl(var(--primary))`).
   - Posicionamento orgânico e intencional no topo dos cards ou junto aos títulos.
   - Ícones utilitários mantidos com Lucide de forma sóbria e consistente.

---

## 2. Requisitos Detalhados

### 2.1 Parte A — Cabeçalhos de Seção
- **Unificação**: Todas as seções de conteúdo (`Serviços`, `Como Trabalhamos`, `Diferenciais`, `Tecnologias`, `Autoridade`, `Setores`, `Sobre`, `FAQ`, `Contato`) utilizam exclusivamente o componente `<SectionHeader>`.
- **Alinhamento Centralizado**: Todas as seções possuem `align="center"`. Hero é o único componente com layout próprio (exceção documentada).
- **Semântica e Acessibilidade**:
  - Cada `<section id="X">` recebe `aria-labelledby="X-heading"`.
  - O `<SectionHeader id="X-heading">` associa o id diretamente ao elemento `<HeadingTag>` (`h2`).
  - Hierarquia estrita sem saltos: H1 no Hero, H2 no `SectionHeader`, H3 nos cards/itens filhos.
- **Escala e Tipografia Fluida**:
  - H2 padronizado com `text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18] max-w-3xl mx-auto`.
  - Subtítulo com `text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto`.
  - `[text-wrap:balance]` ativo no H2 e no subtítulo.
- **Ritmo Vertical**: Espaçamento `py-24` uniforme em todas as seções principais (e `py-14 lg:py-16` no trust bar de autoridade).
- **Sentence Case**: Títulos de seção, cards, abas e navegação em sentence case.

### 2.2 Parte B — Ícones Autorais Premium
- Suíte autoral mantida em `src/components/icons/` com 15 ícones conceituais:
  - Comunicação transparente, Engenharia evolutiva, Foco no problema.
  - Entendemos, Definimos, Desenvolvemos, Evoluímos.
  - Diagnóstico técnico, Retorno em até 24h, Sigilo e confidencialidade.
  - Indústria, Varejo, Educação, Energia.
  - Liderança técnica.
- Geometria consistente: traço 1.5px, `stroke-linecap="round"`, `stroke-linejoin="round"`, cantos arredondados suaves e nó verde (#10B981) como assinatura visual.
- Sem caixas esmeralda translúcidas nos rodapés dos cards.

### 2.3 Parte C — Ajustes de Copy e Diagrama
- FAQ: Pergunta de sites institucionais alocada na categoria `"servicos"`.
- Diagrama do Hero: Texto factual sem promessas superlativas ("desacoplamento entre serviços", "Redundância", sem "estrito" ou "multi-zona").

---

## 3. Critérios de Aceite e Quality Gates

- [ ] Todas as seções com `SectionHeader` centralizado e `aria-labelledby` associado.
- [ ] Escala tipográfica do H2 100% igual entre todas as seções (removido override em `Authority.tsx`).
- [ ] Zero caixas verdes genéricas em rodapés de cards.
- [ ] Suíte de ícones autorais utilizada em Diferenciais, Como Trabalhamos, Contato, Setores e Sobre.
- [ ] `npx tsc --noEmit` conclui com 0 erros.
- [ ] `npm run lint` conclui com 0 erros e 0 warnings.
- [ ] `npm run test:coverage` com cobertura ≥ 90% em todos os arquivos.
- [ ] `npm run test:e2e` com 18/18 testes passando no Playwright.
- [ ] `npm run build` gerando bundle limpo com chunks < 600KB.
