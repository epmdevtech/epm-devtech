# SPEC-037: Hero Interativo Quordix — Tipografia Magnética, Subtítulo Dinâmico e Anéis Orbitais com Design System EPM DEVTECH

| Campo         | Valor                                                                               |
|---------------|-------------------------------------------------------------------------------------|
| **ID**        | SPEC-037                                                                            |
| **Título**    | Hero Interativo Quordix — Tipografia Magnética, Subtítulo Dinâmico e Anéis Orbitais |
| **Prioridade**| Alta (UI/UX, Engajamento Visual, Autoridade Técnica)                                |
| **Origem**    | Demanda PO (2026-09-09)                                                             |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                      |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo — 2026-09-09)                                 |
| **Data**      | 2026-09-09                                                                          |

---

## 1. Contexto e Motivação

A landing page da **EPM DEVTECH** possui uma narrativa comercial sólida, autoridade consolidada e rigorosa qualidade técnica. A seção Hero atual (`src/components/sections/Hero.tsx`) comunica com clareza o posicionamento sênior de engenharia de software sob medida.

Para levar a experiência visual a um patamar de estúdio de engenharia moderno e interativo (similar a referências internacionais como Quordix e Linear), adotaremos as mecânicas de física interativa extraídas do componente de referência `quordix-work-hero-reference.tsx`.

A adaptação deve ser cirúrgica: preserva 100% da identidade visual, a paleta institucional verde esmeralda (#10B981), o modo escuro/claro nativo, a tipografia Geist, o contrato de títulos monocromáticos (SPEC-014), os botões de ação e a microprova social, descartando qualquer elemento estranho (como a navbar e o logo da referência).

---

## 2. Requisitos Técnicos e Contrato Visual

### 2.1. Mecânicas Herdados da Referência Quordix e Refinamentos UX
1. **`MagneticLetter` (Física Magnética Letra a Letra & Entrada Escalonada)**:
   - Cada caractere do H1 possui transição de entrada escalonada (`initial={{ y: "100%", opacity: 0 }}` para `animate={{ y: 0, opacity: 1 }}`), com a Linha 1 revelando-se letra a letra e em seguida a Linha 2 revelando-se letra a letra.
   - Em seguida, cada caractere reage dinamicamente ao mouse e toques touch através de `useAnimationFrame` combinada com `useSpring` para cálculo elástico contínuo (`x`, `y`, `skewX`, `scale`).
   - Posições dos caracteres cacheadas com recalibração sob `resize`.
2. **Subtítulo com Entrada Sequencial e Destaque Tipográfico Reativo Acompanhando o Cursor (`SubtitleWord`)**:
   - Revelação sequencial após a conclusão da entrada do título (delay 1.36s).
   - **Monocromático e uniforme inicial**: 100% das palavras e letras iniciam na mesma cor neutra uniforme (`text-zinc-600 dark:text-zinc-400`, peso 400, opacidade uniforme). Zero duas cores automáticas/estáticas no carregamento.
   - **Projeção reativa acompanhando o cursor**: Quando o cursor se move sobre o título ou o subtítulo, as palavras do subtítulo alinhadas horizontalmente à coluna do cursor ganham destaque tipográfico imediato (`font-weight: 700` e opacidade total `1.0`), tornando-se nítidas e destacadas (preto intenso em Light Mode e branco brilhante em Dark Mode), enquanto palavras distantes mantêm peso normal (400) e opacidade suave atenuada (0.45), exatamente como no esboço Quordix.
   - **Zero Layout Shift (CLS = 0)**: Espaçamento estável e container com folga calculada, garantindo estabilidade absoluta e sem saltos de linha.
3. **Anéis Orbitais Decorativos e Glow Atmosférico da Marca (`RINGS`)**:
   - 4 anéis orbitais circulares em rotação contínua (horária e anti-horária) centrados diretamente atrás do título (`top: 43%`), e não dispersos no meio da página.
   - Satélites luminosos em órbita materializando os dois polos do gradiente da marca (`logo-Photoroom.png`): Ciano Elétrico (`#00D4FF`) no anel interno (36vh) e Verde Esmeralda institucional (`#10B981`) no anel de realce (86vh), com satélite intermediário azul celeste (`#38bdf8`) no anel externo.
   - Glow atmosférico difuso (`.hero-brand-aura`) com o gradiente oficial da marca atrás da headline: transição suave entre ciano elétrico, turquesa e verde esmeralda em ambos os temas (Light e Dark Mode), eliminando qualquer cor estranha (laranja, âmbar ou pêssego).
4. **Scroll Parallax e Fade Out**:
   - Translação suave vertical (`yText`) e esmaecimento gradual (`opacityFade`) via `scrollY` global da janela.
5. **Suporte a Mouse e Touch**:
   - Detecção de coarse pointer com fallback suave no mobile e suporte a `active:` touch.

---

### 2.2. Adaptação Estrita aos Tokens da EPM DEVTECH

| Referência Original (Quordix) | Implementação EPM DEVTECH | Justificativa |
|---|---|---|
| Laranja `#f97316` / `#ea580c` no texto | Verde Esmeralda institucional `#10B981` nos detalhes de marca, satélites orbitais em ciano `#00D4FF` e esmeralda `#10B981` | Preservação da identidade visual institucional com fidelidade ao gradiente da marca (`logo-Photoroom.png`). |
| Slate `#0f172a` / `#475569` | Tokens `text-zinc-900 dark:text-white` e `text-zinc-600 dark:text-zinc-400` | Suporte perfeito e contraste WCAG AAA em Light e Dark Mode. |
| `background: #ffffff` forçado | `bg-background` (0 0% 100% / 0 0% 7%) | Respeita a alternância de temas do `next-themes`. |
| `@import Space Grotesk` | Tipografia `font-sans` (`Geist` / `Inter`) | Zero overhead de fontes externas; consistência com o restante do site. |
| `QuordixNavbar` e `QuordixLogo` | **Descartados integralmente** | O Header oficial do site é mantido intacto. |
| Título em inglês "PREVIOUS WORK" | Headline oficial: "Software sob medida construído para escalar o seu negócio." | Headline aprovada dividida em 2 linhas magnéticas equilibradas. |
| Título com cor laranja na linha 2 | **100% Monocromático** (`text-zinc-900 dark:text-white`) | Conformidade absoluta com a SPEC-014 e testes E2E do Playwright. |
| Subtítulo genérico em inglês | Subtítulo oficial em PT-BR | "Da concepção à infraestrutura: desenvolvemos sistemas web, APIs resilientes e arquiteturas de alta performance preparadas para acompanhar o crescimento da sua empresa." |
| Anéis laranjas e glow disperso | Anéis orbitais finos centrados atrás do título, com satélites ciano/esmeralda e aura difusa no gradiente oficial | Fidelidade ao gradiente do ícone da marca (`logo-Photoroom.png`) e elegância para software house de engenharia. |

---

### 2.3. Preservação de Elementos Essenciais
1. **Tagline Superior**: Badge translúcida em pílula com pulso verde esmeralda: `Engenharia de Software & Modernização`.
2. **Dual CTA**:
   - Primário: `Falar com a engenharia` (`#contato`), preenchido em verde esmeralda com sombra de realce.
   - Secundário: `Ver serviços` (`#servicos`), botão outline com ícone `Code2`.
3. **Microprova Social**:
   - `+9 anos de experiência em sistemas críticos • Arquiteturas cloud-native • APIs resilientes • Código limpo`.

---

### 2.4. Acessibilidade e Performance
1. **`prefers-reduced-motion`**:
   - Verificação dinâmica de preferência de movimento reduzido.
   - Quando ativado: magnetismo desativado, `yText` fixo em 0, anéis estáticos sem rotação contínua e transições instantâneas.
2. **Semântica e SEO**:
   - Mantido `<h1>` único para a headline principal.
   - Links com `aria-label` descritivos e foco visível acessível (`focus-visible:ring-2`).
   - Contraste de texto $\ge 4.5:1$ (WCAG AA) e $\ge 7:1$ (WCAG AAA nos títulos).
3. **Performance (Core Web Vitals)**:
   - `will-change: transform` nos elementos móveis.
   - Sem layout shifts (CLS = 0).
   - Renderização no primeiro ciclo sem flash de conteúdo em branco.

---

## 3. Escopo Detalhado

### IN
- `src/components/sections/Hero.tsx`: Refatoração completa incorporando `MagneticLetter`, `WeightWord`, anéis orbitais adaptados, glow verde, herança de tema, responsividade e `prefers-reduced-motion`.
- `src/components/sections/__tests__/Hero.test.tsx`: Atualização e expansão da suíte de testes unitários para validar a nova renderização interativa.
- `tasks/TASK-037-hero-quordix-magnetic-interativo.md`: Registro detalhado da tarefa no ciclo SDD.
- `reviews/QA-037.md`: Matriz de evidências de QA e validação dos quality gates.
- `PROJECT.md` e `CHANGELOG.md`: Registro da evolução arquitetural do Hero.

### OUT
- Não alterar o Header (`src/components/layout/Header.tsx`).
- Não alterar outras seções da aplicação (`Authority`, `About`, `Sectors`, etc.).
- Não importar fontes externas via `@import` ou CDN.
- Não usar cores fora da paleta do projeto (laranja proibido).

---

## 4. Critérios de Aceitação

- [ ] Nenhuma cor laranja/slate original remanescente no código.
- [ ] Cor de destaque alinhada ao verde oficial EPM DEVTECH (`#10B981` / `emerald-600` / `emerald-400`).
- [ ] Tipografia utiliza Geist (`font-sans`), sem importações externas de fontes.
- [ ] Header e navegação original do site preservados integralmente sem duplicação de navbar.
- [ ] H1 100% monocromático em duas linhas magnéticas, sem spans coloridos internos.
- [ ] Subtítulo interativo com física de aproximação de peso e destaque das palavras-chave em verde.
- [ ] Anéis orbitais decorativos centralizados com rotação suave e satélites verdes.
- [ ] Parallax de rolagem e fade out suaves sem comprometer o scroll.
- [ ] Responsividade total em mobile, tablet e desktop.
- [ ] `prefers-reduced-motion` respeitado com desativação graciosa de física e rotação.
- [ ] Dual CTA e microprova social visíveis, funcionais e com labels acessíveis.
- [ ] 100% dos testes Vitest passando com cobertura $\ge 90\%$.
- [ ] Zero erros no ESLint e build de produção limpo.
- [ ] Disponibilização e validação em localhost para aprovação do PO.
