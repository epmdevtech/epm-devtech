# SPEC-018 — Refatoração da Seção Diferenciais: Copywriting Técnico, Tipografia Monocromática e Autoridade de Engenharia

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Refatoração da Seção Diferenciais: Copywriting Técnico e Autoridade   |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

A seção "Diferenciais" (`#diferenciais` / `Differentials.tsx`) apresenta a esteira de valor e os princípios metodológicos da EPM DEVTECH. 

Para acompanhar a maturidade de posicionamento das demais seções já refatoradas (Hero, Sobre, Serviços e Trust Bar de Autoridade), o copywriting desta seção precisa evoluir de frases genéricas para termos precisos de engenharia de software que conversem diretamente com diretores técnicos, CTOs e gestores de produto.

Adicionalmente, a estrutura visual da seção é um elemento de grande identidade e sofisticação no projeto (linha do tempo animada no topo com dots numerados e cards verticais escalonados com setas e ícones), devendo ter seu layout, CSS e animações **rigorosamente preservados**.

---

## 2. Requisitos e Restrições Inegociáveis

### 2.1 Restrição Inegociável de Layout
- A linha do tempo horizontal no topo (`.diff-pipeline-wrapper`, `.diff-pipeline`, `.diff-pipeline-fill`, `.diff-dot`, `.diff-connector`) e o layout em grid dos 6 cards (`.diff-cards-grid`, `.diff-card`) **não devem sofrer nenhuma alteração estrutural**.
- Devem ser mantidos 100% intactos os containers, CSS, flexbox/grid, posicionamento dos badges numéricos (01 a 06), setas indicadoras (`.diff-card-arrow`), tags e ícones no rodapé de cada card (`MessageCircle`, `Shield`, `CheckCircle2`, `Sparkles`, `GitMerge`, `Clock`).
- Somente os textos de títulos, tags (handles) e descrições devem ser atualizados.

### 2.2 Regras de Tipografia e Boas Práticas de UI/UX
- **Título da Seção (H2)**: "Por Que Escolher a EPM DEVTECH"
  - 100% monocromático através do componente padronizado `SectionHeader` (`text-zinc-900` no modo claro e `dark:text-white` no modo escuro).
  - Proibição absoluta de títulos bicolores, spans coloridos ou gradientes no texto.
  - Linearidade tipográfica: `font-bold tracking-tight text-3xl sm:text-4xl leading-tight`.
- **Títulos dos Cards (H3)**:
  - Marcação semântica com `<h3 className="diff-card-title">`.
  - Peso uniforme e legível (`font-semibold`), cor neutra do design system (`hsl(var(--foreground))`) e tracking compacto.
- **Copywriting em PT-BR Culta**:
  - Proibição absoluta de travessão longo (`—`) ou meia-risca (`–`). Pontuação natural com vírgulas, pontos e marcadores em bullet (`•`).

---

## 3. Especificação do Conteúdo

### 3.1 Cabeçalho da Seção (`SectionHeader`)
- **Badge Superior (Overline)**: `DIFERENCIAIS`
- **Título (H2 Monocromático)**: `Por Que Escolher a EPM DEVTECH`
- **Subtítulo / Descrição**: `Rigor de engenharia, arquitetura escalável e compromisso com entregas previsíveis em cada linha de código.`

### 3.2 Conteúdo dos 6 Cards da Timeline

1. **Card 01 (Ícone `MessageCircle`)**:
   - Badge Numérico: `01`
   - Título (H3): `Comunicação Transparente`
   - Tags: `ALINHAMENTO • PREVISIBILIDADE`
   - Descrição: `Acompanhamento constante, relatórios claros de progresso e alinhamento direto com quem realmente executa a engenharia, eliminando ruídos e surpresas.`

2. **Card 02 (Ícone `Shield`)**:
   - Badge Numérico: `02`
   - Título (H3): `Arquitetura Planejada`
   - Tags: `MICROSSERVIÇOS • CLEAN ARCHITECTURE`
   - Descrição: `Sistemas projetados para crescer sem criar gargalos técnicos. Escolhas arquiteturais sólidas desde o primeiro dia para facilitar manutenções futuras.`

3. **Card 03 (Ícone `CheckCircle2`)**:
   - Badge Numérico: `03`
   - Título (H3): `Código Limpo e Testável`
   - Tags: `SOLID • TESTES AUTOMATIZADOS`
   - Descrição: `Aplicação de boas práticas consolidadas e esteiras de testes rigorosas para garantir estabilidade operacional e evolução contínua da aplicação.`

4. **Card 04 (Ícone `Sparkles`)**:
   - Badge Numérico: `04`
   - Título (H3): `Padrões de Engenharia`
   - Tags: `SONARQUBE • CODE REVIEW`
   - Descrição: `Revisões sistemáticas de código, análise estática de vulnerabilidades e observabilidade em produção para manter a saúde do ecossistema.`

5. **Card 05 (Ícone `GitMerge`)**:
   - Badge Numérico: `05`
   - Título (H3): `Esteira DevOps e CI/CD`
   - Tags: `DEPLOY SEGURO • ROLLBACK`
   - Descrição: `Pipelines automatizados com validações estritas antes de cada publicação, minimizando riscos de falhas em produção e permitindo rollback imediato.`

6. **Card 06 (Ícone `Clock`)**:
   - Badge Numérico: `06`
   - Título (H3): `Entregas Previsíveis`
   - Tags: `PRAZOS REAIS • QUALIDADE`
   - Descrição: `Estimativas realistas baseadas em complexidade técnica real, sem atalhos que comprometam a segurança e a longevidade do seu software.`

---

## 4. Plano de Testes e Validação

1. **Testes Unitários (`Differentials.test.tsx`)**:
   - Validar cabeçalho da seção com o H2 e o novo subtítulo.
   - Validar presença da linha de pipeline e preenchimento animado.
   - Validar presença de todos os 6 novos títulos de cards, badges numéricos (01 a 06) e tags.
   - Validar renderização em viewport inicial (`useInView: false`).
2. **Testes End-to-End (`design-system-and-stability.spec.ts`)**:
   - Validar aprovação contínua na suíte Playwright para o heading `#diferenciais`.
3. **Quality Gates**:
   - Cobertura de código $\ge 90\%$.
   - Zero erros no ESLint.
   - Build de produção sem chunks > 600KB.
