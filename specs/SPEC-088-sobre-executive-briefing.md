# SPEC-088 — Unificação da Dobra Inicial da Rota /sobre em Executive Briefing e Remoção de Informações Burocráticas

- **Status:** APROVADO
- **Data de Aprovação:** 2026-10-02
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Copywriting B2B / Posicionamento Institucional

---

## 1. Contexto e Motivação

Na rota `/sobre` (`src/pages/AboutPage.tsx`), foram identificados pontos críticos de redundância, prolixidade e ruído burocrático que enfraqueciam o posicionamento institucional e corporativo da EPM DevTech:

1. **Duplicação de Conteúdo no Topo:** O cabeçalho de página (`PageHeader` com *"Engenharia de software com foco em longevidade e impacto real"*) e a seção imediatamente seguinte (*"Visão & Posicionamento"* com *"Engenharia de software com visão de negócio"*) repetiam praticamente os mesmos argumentos, premissas e frases em sequência direta, gerando cansaço visual e impressão de texto duplicado.
2. **Dados Burocráticos e Locais Desnecessários para o Decisor:** O card lateral direito *"Transparência Operacional"* continha informações cadastrais/fiscais burocráticas (CNPJ, menção à sede física de Toledo-PR e endereço fiscal) que não agregam valor de conversão na apresentação de uma software house corporativa de escala nacional.
3. **Personalização Excessiva e Métricas Descontextualizadas:** Menções nominais isoladas (*"Elessandro Prestes Macedo"*) e o badge estático solto (*"+9 anos"*) diminuíam o peso institucional de empresa de engenharia sólida perante clientes corporativos de médio e grande porte.

Portanto, esta especificação define a unificação da dobra inicial em um **Executive Briefing** de alto impacto para decisores de tecnologia e negócios, eliminando a duplicação, removendo dados fiscais/locais e destacando os **Compromissos de Parceria** da EPM DevTech.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Unificação da Dobra Inicial (Executive Briefing):**
   - Eliminar a sobreposição entre `PageHeader` e a primeira seção, consolidando tudo em um único bloco amplo, imersivo e bem diagramado na camada `anchor` (`bg-surface-anchor`).
   - **Coluna Esquerda (`lg:col-span-7`):**
     * Eyebrow padronizado: `[ QUEM SOMOS // POSICIONAMENTO ]` com tipografia monospace ciano/esmeralda (`text-text-brand`) e ícone `BrandChipIcon`.
     * Título H1: *"Engenharia de software sob medida com visão real de negócio"* com acento cromático na expressão *"visão real de negócio"* (`text-text-brand`).
     * Parágrafo Institucional Executivo (foco em clientes corporativos):
       *"A EPM DevTech projeta, constrói e moderniza aplicações corporativas críticas. Desenvolvemos ecossistemas sob medida para operações que exigem estabilidade contínua, integrações sem perda de dados e comunicação técnica direta, sem camadas comerciais intermediárias."*
     * Remoção completa dos parágrafos secundários repetitivos e do contador estático `+9 anos`.

2. **Redesenho do Painel Lateral: "Compromissos de Parceria":**
   - Substituição do antigo card burocrático por um quadro executivo corporativo (`lg:col-span-5`):
     * Container refinado: `bg-zinc-950/70 border border-zinc-800 rounded-2xl p-6 sm:p-7 backdrop-blur-sm shadow-xl`.
     * Cabeçalho: Título *"Como atuamos com a sua equipe"* com badge de status discreto (`● Parceria Direta`).
     * 3 Pilares Estratégicos B2B com ícones dedicados:
       1. **"Atendimento 100% Remoto & Nacional"** — Conexão ágil com empresas de qualquer região do país através de cerimônias e alinhamentos contínuos. (Ícone `Globe`)
       2. **"Contato Direto com a Liderança Técnica"** — Você fala diretamente com quem planeja a arquitetura e implementa o código do seu projeto. (Ícone `Users`)
       3. **"Propriedade Total do Código & Entregas Incrementais"** — Repositórios, documentação e infraestrutura pertencem 100% à sua empresa, com validações frequentes em homologação. (Ícone `ShieldCheck`)
     * Remoção do botão de contato duplicado dentro do card (o Header global já provê o CTA `"Fale conosco"`).

3. **Remoção Estrita de Informações Burocráticas e Pessoais:**
   - Remover menção a CNPJ, sede física em Toledo-PR, endereço fiscal e nomes pessoais isolados de `/sobre`.
   - Manter a formalidade cadastral no local correto e canônico: os termos legais e rodapé institucional (`Footer` / `LegalModals`).

4. **Harmonização do Ritmo Tonal (SPEC-082) e Transição Fluida:**
   - Hero / Executive Briefing: Camada `anchor` (`bg-surface-anchor`).
   - Seção *"Nossa Jornada"* (`#jornada`): Ajustada para Camada `base` (`tone="base"`, `bg-surface-base`), conectando com transição fluida sem faixas desproporcionais.
   - Seção *"Missão e Princípios"* (`#principios`): Ajustada para Camada `alt` (`tone="alt"`, `bg-surface-alt`).
   - Rodapé institucional: Camada `anchor` (`bg-surface-anchor`).
   - Ritmo resultante: `anchor` → `base` → `alt` → `anchor` (alternância rigorosa 100% compatível com SPEC-082).

5. **Atualização de SEO, Prerender e Testes:**
   - Meta tags (`<Helmet>`): Título atualizado para *"Sobre a EPM DevTech | Engenharia de Software Corporativa"* e descrição corporativa nacional.
   - Script de pré-renderização (`scripts/prerender.js`): Atualizar rota `sobre` com novo título, descrição e H1.
   - Teste E2E (`e2e/multi-route-navigation.spec.ts`): Atualizar expectativas de H1 e Title da rota `/sobre`.
   - Testes Unitários (`src/pages/__tests__/pages.test.tsx`): Atualizar suite de `/sobre` para validar o novo H1, o eyebrow, os 3 pilares de parceria e confirmar a ausência de CNPJ e termos burocráticos.

### 2.2 Fora de Escopo

- Alterações na timeline de marcos históricos (`MILESTONES`) ou nos princípios técnicos (`PRINCIPLES`).
- Alterações em dados cadastrais no `Footer.tsx` ou em `LegalModals.tsx`.
- Modificações em outras rotas além de `/sobre`.

---

## 3. Arquitetura de Componentes e Estrutura Visual

```
AboutPage (/sobre)
├── Helmet (SEO & Metatags B2B corporativas)
├── Executive Briefing Hero (tone: anchor)
│   └── Container (max-w-6xl mx-auto px-6)
│       └── Grid (grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14)
│           ├── Coluna 1 (lg:col-span-7) — Manifesto & Proposta de Valor
│           │   ├── Eyebrow: [ QUEM SOMOS // POSICIONAMENTO ] (BrandChipIcon)
│           │   ├── H1: Engenharia de software sob medida com [visão real de negócio]
│           │   └── Lead: "A EPM DevTech projeta, constrói e moderniza aplicações corporativas críticas..."
│           └── Coluna 2 (lg:col-span-5) — Compromissos de Parceria
│               └── Painel (bg-zinc-950/70 border-zinc-800 rounded-2xl p-6 sm:p-7)
│                   ├── Header: "Como atuamos com a sua equipe" + Badge "● Parceria Direta"
│                   ├── Pilar 1: Atendimento 100% Remoto & Nacional (Globe)
│                   ├── Pilar 2: Contato Direto com a Liderança Técnica (Users)
│                   └── Pilar 3: Propriedade Total do Código & Entregas Incrementais (ShieldCheck)
├── Seção: Nossa Jornada (#jornada, tone: base)
│   └── Timeline Alternada Desktop / Vertical Mobile
└── Seção: Missão e Princípios (#principios, tone: alt)
    └── Manifesto de Diretrizes Técnicas
```

---

## 4. Matriz de Ritmo Tonal (SPEC-082)

| Seção | Camada Tonal | Fundo Dark | Fundo Light | Justificativa |
|---|---|---|---|---|
| **Executive Briefing Hero** | `anchor` | `bg-surface-anchor` (#06080B) | #F1F4F8 | Abertura imersiva da página |
| **Nossa Jornada (#jornada)** | `base` | `bg-surface-base` (#090D12) | #FFFFFF | Leitura da linha do tempo com alto contraste |
| **Missão & Princípios (#principios)**| `alt` | `bg-surface-alt` (#0E1520) | #F8FAFC | Encerramento editorial diferenciado |
| **Footer Institucional** | `anchor` | `bg-surface-anchor` (#06080B) | #F1F4F8 | Fechamento da aplicação |

*Nenhuma camada adjacente repete o mesmo tom (`anchor` → `base` → `alt` → `anchor`).*

---

## 5. Critérios de Aceite

1. [ ] A sobreposição entre `PageHeader` e a primeira seção foi eliminada; a rota `/sobre` inicia com um único bloco integrado Executive Briefing.
2. [ ] O H1 exibe *"Engenharia de software sob medida com visão real de negócio"*, com destaque ciano/esmeralda no trecho-chave.
3. [ ] O eyebrow exibe `[ QUEM SOMOS // POSICIONAMENTO ]` acompanhado do `BrandChipIcon`.
4. [ ] O texto institucional reflete estritamente o posicionamento corporativo de aplicações críticas e comunicação direta sem intermediários.
5. [ ] O painel lateral direito apresenta os 3 pilares de *"Compromissos de Parceria"* com seus respectivos ícones (`Globe`, `Users`, `ShieldCheck`), cabeçalho executivo e badge `● Parceria Direta`.
6. [ ] Foram totalmente removidas da rota `/sobre` as menções a CNPJ, Toledo-PR, endereço fiscal, nomes pessoais e o badge `+9 anos`.
7. [ ] A transição entre o Executive Briefing e a timeline *"Nossa Jornada"* é contínua e harmônica.
8. [ ] O ritmo tonal segue rigorosamente a alternância `anchor` → `base` → `alt` → `anchor`.
9. [ ] As meta tags e o arquivo `scripts/prerender.js` foram atualizados para refletir o novo H1 e descrição corporativa.
10. [ ] Todos os testes automatizados (unitários e E2E) e quality gates (TS, ESLint, Vitest, Playwright, Build) passam com 100% de sucesso.
