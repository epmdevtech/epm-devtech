# SPEC-081 — Refatoração da Rota /sobre (Jornada Histórica Alternada e Manifesto Técnico) e Atualização da Navbar para "Sobre nós"

- **Status:** APROVADO (por Elessandro Prestes Macedo)
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo
- **Branch:** `develop`

---

## 1. Contexto e Motivação

A rota `/sobre` atual exibe um layout institucional tradicional com blocos estáticos e 3 cards genéricos para os pilares de atuação. Além disso, o menu de navegação superior (Header) utiliza o rótulo "Sobre", que necessita ser atualizado para "Sobre nós" para conferir maior proximidade e alinhamento com a identidade da software house.

O objetivo desta especificação é:
1. Atualizar o menu de navegação global (Navbar / Header) alterando o item "Sobre" para **"Sobre nós"** (mantendo a rota `/sobre`).
2. Refatorar a rota `/sobre` com uma identidade visual técnica e de alto padrão (Linear/Vercel/Stripe style), eliminando cards repetitivos e introduzindo uma **Jornada / Timeline Histórica Alternada** e uma tabela de diretrizes em formato de **Manifesto Técnico de Engenharia**.

---

## 2. Decisões de Design e UX

### 2.1. Navegação Global (Navbar / Header)
- No componente [`src/components/layout/Header.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/layout/Header.tsx), atualizar a lista `navLinks`:
  - `label`: de `"Sobre"` para `"Sobre nós"`.
  - `href`: manter `"/sobre"`.
- Atualizar os testes unitários (`Header.test.tsx`) e E2E (`multi-route-navigation.spec.ts`) para validar o novo texto do link.

### 2.2. Seção Hero da Página `/sobre`
- **Eyebrow**: `// SOBRE NÓS` com tipografia mono e cor `text-text-brand`.
- **H1 (Título de Impacto)**: *"Engenharia de software com foco em longevidade e impacto real"*.
- **Subtítulo Editorial**: Contextualização clara da software house, fundada e conduzida pelo engenheiro Elessandro Prestes Macedo (+9 anos de experiência em arquitetura de sistemas), com foco em resolver gargalos críticos de negócios com pragmatismo, estabilidade e sem intermediários comerciais.
- **Card de Dados Operacionais e Institucionais**:
  - Preservar os dados de transparência corporativa (atendimento 100% remoto em todo o Brasil, sede em Toledo/PR e CNPJ oficial).

### 2.3. Seção "Nossa Jornada" (Timeline Histórica Alternada)
- **Identidade Visual Dark Mode / Engenharia**:
  - Linha condutora central com acento em gradiente (`bg-gradient-to-r from-zinc-800 via-brand/60 to-zinc-800`).
  - Nós de conexão (pulsos luminosos/conectores) marcando cada marco ao longo da linha.
  - Balões de marcos que alternam suavemente: Marco 01 acima, Marco 02 abaixo, Marco 03 acima, Marco 04 abaixo no desktop (`md:` para cima).
  - Traços verticais sutis conectando cada cartão ao seu respectivo nó no eixo central.
  - Estilo dos blocos de marco: `bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 hover:border-brand/40 transition-colors`, cantos limpos e tipografia mono/sans nítida.
- **Os 4 Marcos Históricos da EPM DevTech**:
  1. **Marco 01 (2015 — Fundamentos)**: Início da trajetória técnica — foco em engenharia profunda, arquitetura de sistemas corporativos e código sustentável.
  2. **Marco 02 (2019 — Operações Críticas)**: Atuação em projetos de grande escala e alta concorrência nos setores de energia, indústria e órgãos reguladores.
  3. **Marco 03 (2023 — Consolidação da Software House)**: Expansão do desenvolvimento de APIs de alto rendimento, microsserviços distribuídos e modernização de legados corporativos.
  4. **Marco 04 (Hoje — Engenharia Sob Medida)**: Operação consolidada com atendimento direto entre cliente e liderança técnica, sem intermediários comerciais e foco exclusivo em impacto de negócio.
- **Responsividade Mobile**:
  - Em telas menores (`< md`), a timeline converte-se fluidamente para um layout vertical alinhado à esquerda com linha condutora lateral e cards empilhados, assegurando leitura sem cortes ou sobreposição.

### 2.4. Seção "Missão e Princípios de Engenharia" (Manifesto Técnico)
- **Eliminação de Cards Fechados Repetitivos**:
  - Substituir os blocos convencionais por uma estrutura editorial em formato de **Manifesto Técnico / Tabela de Diretrizes** (`divide-y divide-zinc-800/80 border-y border-zinc-800/80 py-8`).
- **Estrutura de 3 Colunas no Grid**:
  - **Coluna 1 (Tag Monospace)**: `PRINCIPIO_01`, `PRINCIPIO_02`, `PRINCIPIO_03`, `PRINCIPIO_04`.
  - **Coluna 2 (Título do Princípio)**:
    1. *Excelência Pragmática*
    2. *Transparência Técnica*
    3. *Código Sustentável*
    4. *Compromisso com a Operação*
  - **Coluna 3 (Explicação Detalhada)**:
    1. *Excelência Pragmática*: Não vendemos complexidade desnecessária nem seguimos modismos tecnológicos; cada linha de código e padrão arquitetural existe para resolver um gargalo real do negócio com custo e retorno equilibrados.
    2. *Transparência Técnica*: Você fala diretamente com quem planeja a arquitetura e implementa as soluções. Nenhuma camada comercial ou gerencial distorce prazos, requisitos ou decisões de engenharia.
    3. *Código Sustentável*: Arquitetura modular, testes automatizados e tipagem estrita ponta a ponta garantem que o sistema continue fácil de manter, auditar e evoluir pelos próximos anos sem acumular passivo oculto.
    4. *Compromisso com a Operação*: Sistemas corporativos não toleram interrupções imprevistas. Projetamos pipelines resilientes, observabilidade ativa e recuperação rápida para garantir previsibilidade operacional 24/7.

### 2.5. Fechamento da Página (CTA Comercial Discreto)
- Bloco final convidativo com tipografia técnica:
  - *"Pronto para construir sua próxima solução com quem entende de código?"*
  - Subtexto: *"Converse diretamente com nossa liderança técnica e avalie a viabilidade da sua demanda."*
  - Botão de ação: `"Fale conosco"` (redirecionando para `/contato` com estilo primário da marca).

---

## 3. Arquivos Envolvidos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-081-sobre-nos-timeline-e-manifesto.md` | Criar | Especificação técnica detalhada (este documento) |
| `tasks/TASK-081-sobre-nos-timeline-e-manifesto.md` | Criar | Tarefa com checklist do fluxo SDD |
| `src/components/layout/Header.tsx` | Modificar | Atualização do label de "Sobre" para "Sobre nós" no menu |
| `src/pages/AboutPage.tsx` | Modificar | Redesenho completo da rota `/sobre` com Timeline Alternada e Manifesto |
| `src/components/layout/__tests__/Header.test.tsx` | Modificar | Atualização de testes para assertar "Sobre nós" |
| `src/pages/__tests__/pages.test.tsx` | Modificar | Atualização dos testes unitários da `AboutPage` |
| `e2e/multi-route-navigation.spec.ts` | Modificar | Atualização de testes E2E do menu e da rota `/sobre` |
| `reviews/QA-081.md` | Criar | Relatório de validação e evidências dos quality gates |
| `PROJECT.md` / `CHANGELOG.md` | Modificar | Atualização do estado canônico e histórico de versões |

---

## 4. Critérios de Aceite

1. [ ] No Header (Navbar), o link de navegação exibe o texto `"Sobre nós"` e continua apontando para `/sobre`.
2. [ ] O H1 da rota `/sobre` é *"Engenharia de software com foco em longevidade e impacto real"*, com metadados e SEO canônico íntegros.
3. [ ] A seção "Nossa Jornada" renderiza uma timeline histórica com 4 marcos, alternando acima/abaixo no desktop (`md:`) e vertical contínua no mobile.
4. [ ] A seção "Missão e Princípios de Engenharia" é exibida em formato de manifesto/diretrizes com divisores limpos (`divide-y`), sem cards fechados repetitivos.
5. [ ] A página conclui com a chamada para contato acompanhada do botão `"Fale conosco"` direcionando para `/contato`.
6. [ ] Zero regressões de acessibilidade: navegação via teclado, contrastes WCAG AAA e atributos ARIA preservados.
7. [ ] Todos os Quality Gates passam: `tsc`, `lint`, `vitest` (30 suítes), `playwright` (43 testes) e `build`.
8. [ ] O commit da entrega é redigido estritamente em português do Brasil (pt-BR).
