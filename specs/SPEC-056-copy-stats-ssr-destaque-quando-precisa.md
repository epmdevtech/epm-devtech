# SPEC-056 — Ajustes de Copywriting, Eliminação dos Stats Zerados e Destaque do "Quando precisa:"

## Metadados
- **ID:** SPEC-056
- **Título:** Ajustes de copywriting factual e eliminação de repetições, renderização direta dos valores finais nos contadores de autoridade (eliminação de placeholders 0 e concatenações acessíveis) e destaque visual do gatilho "Quando precisa:" nos cards de serviço
- **Data:** 2026-09-30
- **Autor:** Gemini/Antigravity (Senior UX Writer + Senior Frontend Engineer)
- **PO:** Elessandro Prestes Macedo
- **Status:** Aprovado (Diretiva do PO)

---

## 1. Contexto e Motivação

1. **Ajustes de Copywriting e Veracidade**:
   - O card de serviço "Modernização & evolução de legados" apresentava repetição do gerúndio "reduzindo" e redundância de conceitos ("migração gradual" e "de forma incremental").
   - O diagrama de arquitetura do Hero (nó 02 Core / Domain Services) continha repetição da palavra "modular" ("Microsserviços modulares e regras de negócio com desacoplamento modular") e a legenda inferior estática repetia a mesma palavra.
   - Presença da atribuição de "especializada" sem comprovação formal no rodapé e metadados, demandando transição para termos factuais ("dedicada a", "atua em").
   - Necessidade de varredura sistemática de pares de palavras-raiz redundantes na mesma frase ou frases adjacentes em toda a landing page.

2. **Stats de Autoridade e Experiência Técnica (HTML Inicial e A11y)**:
   - A extração de texto revelava `0,0%`, `0 RPS`, `0%` e concatenações acessíveis como `redução de 35%−0%`.
   - O componente `CountUp` inicializava o DOM com o valor `0`, gerando riscos de indexação por motores de busca, leitura deficiente por leitores de tela e previews de links desatualizados.
   - O HTML inicial renderizado deve conter imediatamente os valores finais (`99,9%`, `2.500 RPS`, `100%` e `−35%`). A contagem animada deve ser exclusivamente aprimoramento progressivo via viewport e desligada sob `prefers-reduced-motion: reduce`.
   - O contador visual animado deve ser marcado com `aria-hidden="true"`, e o valor acessível final apresentado sem duplicar com o visual para leitores de tela.

3. **Destaque do Gatilho "Quando precisa:" nos Cards de Serviço**:
   - O gatilho de reconhecimento de dor "Quando precisa:" possui alto valor de conversão, porém encontrava-se com peso tipográfico e contraste idênticos à descrição do serviço.
   - O PO determinou valorizar visualmente esse bloco mantendo-o estritamente dentro do card (sem nova seção, sem carrossel, sem alterar texto e sem elementos clicáveis falsos).
   - Rótulo com acento verde da marca (`text-primary` / emerald), família mono, uppercase, peso semibold.
   - Pergunta em cor primária (`text-foreground`), peso médio (`font-medium`), separador fino (`border-t`) e alinhamento à base (`mt-auto`) para que todos os gatilhos fiquem nivelados horizontalmente entre colunas.

---

## 2. Especificação Técnica

### 2.1 Ajustes de Copywriting e Metadados

1. **Card de Serviço "Modernização & evolução de legados" (`Services.tsx`)**:
   - **Antes:** `"Refatoração e migração gradual de plataformas legadas, reduzindo custos de manutenção e dívida técnica de forma incremental, reduzindo o risco de interrupção da operação."`
   - **Depois:** `"Refatoração e migração gradual de plataformas legadas, reduzindo custos de manutenção e dívida técnica, com evolução incremental e menor risco de interrupção da operação."`

2. **Diagrama do Hero (`HeroArchitecture.tsx`)**:
   - **Nó 02 (Core / Domain Services)**:
     - **Antes:** `"Microsserviços modulares e regras de negócio com desacoplamento modular."`
     - **Depois:** `"Microsserviços modulares e regras de negócio com desacoplamento entre serviços."`
   - **Legenda da Camada Ativa**:
     - Tornar dinâmica de acordo com a camada ativa selecionada (`TOPOLOGY_NODES`):
       - Nó 01 (Client / Edge): `"Baixa latência & proteção perimetral"`
       - Nó 02 (Domain Services): `"Regras de negócio isoladas & resiliência operacional"` (definido pelo PO)
       - Nó 03 (Event Stream): `"Fluxos assíncronos & alta tolerância a falhas"`
       - Nó 04 (Cloud & Data): `"Integridade transacional & persistência confiável"`
     - Saneamento de chips para eliminar repetições na mesma área do diagrama:
       - Nó 03: chips `["Filas Confiáveis", "Workers Dedicados", "Absorção de Picos"]` (remove repetição de "Processamento resiliente" e "Eventos").
       - Nó 04: chips `["Replicação Ativa", "Cache em Memória", "Alta Disponibilidade"]` (remove repetição de "Redundância").

3. **Saneamento de "especializada" e Superlativos sem Comprovação**:
   - `src/config/site.ts`: `"Software house dedicada a software sob medida, APIs escaláveis e modernização de plataformas corporativas."`
   - `public/site.webmanifest`: `"Software house dedicada a software sob medida, APIs escaláveis e arquitetura de sistemas."`
   - `public/llms.txt`: `"> Software house brasileira dedicada a software sob medida, APIs escaláveis,"`
   - `public/llms-full.txt`: Ajuste de "com excelência de engenharia" para "com rigor de engenharia", e cabeçalho de tabela para "Nível de Proficiência".
   - `index.html`: Atualização no JSON-LD (`description` do `WebSite` e `ProfessionalService`).
   - `README.md`: Substituição por `"software house dedicada a software sob medida, APIs escaláveis e modernização de plataformas corporativas."`
   - `LegalModals.tsx`: Saneamento de `"serviços especializados de engenharia"` para `"serviços de engenharia"`.
   - `buildConstellationLayout.ts`: Remoção de `"de excelência"` (Laravel) e `"Nuvem líder"` (AWS).

4. **Saneamento de Repetições na Homepage**:
   - `Differentials.tsx`: Alterar `"reduzindo ruídos e alinhando expectativas"` para `"reduzindo ruídos e nivelando expectativas"` (elimina repetição com "Alinhamento contínuo").
   - `Technologies.tsx`: Alterar subtítulo para `"Selecionamos as tecnologias de acordo com as necessidades de cada projeto..."` (elimina repetição de "Tecnologias").
   - `FAQ.tsx`: Alterar resposta de legados para `"plano para estabilização, correção de gargalos, manutenção contínua ou evolução do sistema"` (elimina repetição de "gargalos").
   - `Contact.tsx`: Alterar descrição de confidencialidade para `"Suas ideias, dados e regras de negócio tratados sob sigilo e proteção, com NDA quando solicitado."` (elimina repetição de "confidencialidade").

---

### 2.2 Stats da Seção Autoridade (`Authority.tsx` e `CountUp.tsx`)

1. **HTML Inicial com Valores Finais**:
   - `CountUp.tsx`: O JSX retornado deve sempre renderizar `{formatVal(end)}` por padrão.
   - Nenhuma variável de estado ou renderização condicional deve emitir `formatVal(0)` no markup inicial.
   - Valores finais no DOM: `99,9%`, `2.500 RPS`, `100%`, `−35%`.

2. **Progressive Enhancement da Contagem**:
   - `useEffect`: Se `!isCounting` ou `prefersReducedMotion` ou ambiente de teste, aborta sem alterar o DOM.
   - Somente quando `isCounting === true` E `prefersReducedMotion === false`: inicia o loop `requestAnimationFrame` partindo de 0 e atingindo `formatVal(end)` com curva ease-out.

3. **Acessibilidade e Desduplicação**:
   - `<CountUp>` recebe `aria-hidden="true"` como padrão.
   - Cada indicador possui texto acessível em `<span className="sr-only">`:
     - Stat 1: `"99,9%"`
     - Stat 2: `"2.500 RPS"`
     - Stat 3: `"100%"`
     - Stat 4: `"redução de 35%"` (com valor visual `\u221235%`)
   - Leitores de tela ignoram o elemento animado via `aria-hidden="true"` e leem unicamente o rótulo acessível e descritivo.

---

### 2.3 Estilo dos Gatilhos "Quando precisa:" (`Services.tsx`)

1. **Localização e Estrutura**:
   - Preservado estritamente dentro do card de cada serviço.
   - Container com `mt-auto pt-3.5 border-t border-border/50` para nivelamento automático de altura.

2. **Tipografia e Cores**:
   - Rótulo `Quando precisa:`: `<span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">Quando precisa:</span>`
   - Pergunta: `<p className="text-[12.5px] sm:text-[13px] leading-relaxed text-foreground font-medium">`
   - Contraste WCAG AA garantido em temas Dark e Light.

3. **Interatividade e Responsividade**:
   - Sem seta, sem cursor pointer, sem hover enganoso (conteúdo estático).
   - Remoção de `line-clamp-2` para permitir quebra fluida sem cortes em viewports 320px a 1440px.

---

## 3. Quality Gates

1. `npx tsc --noEmit`: 0 erros de compilação.
2. `npm run lint`: 0 erros / 0 warnings.
3. `npm run test`: 100% das suítes e testes passando.
4. `npm run test:coverage`: Cobertura global ≥ 90%.
5. `npm run test:e2e`: Testes Playwright aprovados (incluindo testes de stats sem rolagem, reduced-motion e no-JS).
6. `npm run build`: Compilação de produção limpa, sem chunks > 600KB.
7. Evidências visuais de Services antes e depois (1440, 768, 375 px em Dark e Light).
