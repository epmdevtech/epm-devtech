# SPEC-094 — Alinhamento Responsivo da Constelação em /sobre, Textos Rigorosamente Monocromáticos e Remoção da Palavra Sênior

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX Design / Responsividade / Tipografia / Copywriting

---

## 1. Contexto e Motivação

Durante a homologação visual do Hero da rota `/sobre` e auditoria global de design/copywriting, foram identificadas três inconsistências críticas de experiência e comunicação:

1. **Sobreposição e proximidade excessiva da Constelação em `/sobre`:**
   - O componente `EpmConstellation` estava posicionado de forma absoluta com dimensões que invadiam o espaço do título H1 ("Transformando desafios em soluções que funcionam").
   - Em tablets e dispositivos móveis, a constelação ficava posicionada diretamente atrás do texto, gerando ruído visual e prejudicando a leitura do título.
   - Faz-se necessário um redesenho do layout responsivo do Hero da página `/sobre`, garantindo separação espacial, respiro e proporção harmônica em telas de computador (desktop/ultrawide), tablets e smartphones.

2. **Textos com cores mescladas (bicolores):**
   - No Hero da Home (`src/components/sections/Hero.tsx`), o título H1 continha palavras com cor diferente no meio da frase (`<span className="text-text-brand">construir, integrar e evoluir</span>`).
   - A diretriz do PO e de design do projeto determina que **todos os textos devem ter cor única e padrão**: se a cor predominante for branco (`text-primary`), todo o texto deve ser 100% branco uniforme, sem mescla de verde e branco em palavras da mesma oração.

3. **Remoção total da palavra "sênior" em todo o site:**
   - O termo "sênior / senior" transmite jargão interno de RH/desenvolvedores que não agrega valor ao cliente decisor (o cliente busca soluções estáveis, confiabilidade e diagnóstico técnico direto, e não categorização interna de cargos).
   - Identificadas ocorrências em `src/components/sections/Hero.tsx` e `src/pages/EngineeringPage.tsx`.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Alinhamento e Responsividade de `EpmConstellation` em `/sobre` (`src/pages/AboutPage.tsx`):**
   - **Estrutura de Grid Responsivo:**
     * Transição do posicionamento absoluto sobreposto para um layout em container de 2 colunas no desktop (`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center`).
     * **Coluna da Esquerda (Texto Editorial):** `lg:col-span-7 flex flex-col justify-center text-left`. Largura controlada (`max-w-xl xl:max-w-2xl`) com margem segura garantindo que o H1 e o subtítulo nunca colidam com o artefato visual.
     * **Coluna da Direita (Constelação no Desktop):** `lg:col-span-5 flex justify-center lg:justify-end relative`. Dimensões equilibradas (`w-[320px] sm:w-[380px] lg:w-[440px] xl:w-[480px] h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[480px]`), preenchendo a lateral com respiro elegante.
     * **Mobile e Tablet (`< 1024px`):** Posicionamento fluido e centrado da constelação após o bloco de texto editorial (`mt-8 sm:mt-10 mx-auto`), com escala adaptativa (`w-[280px] sm:w-[340px] h-[280px] sm:h-[340px]`) e opacidade equilibrada, eliminando qualquer colisão com as letras do título e subtítulo.
     * Zero overflow horizontal em todas as viewports (320px, 390px, 768px, 1024px, 1440px).

2. **Unificação Cromática dos Textos (Fim dos Textos Bicolores):**
   - **Hero da Home (`src/components/sections/Hero.tsx`):**
     * Remoção do `span.text-text-brand` dentro do H1.
     * O título passa a ser 100% monocromático em `text-primary`:
       *"Engenharia de software para construir, integrar e evoluir sistemas."*
     * Atualização do teste E2E em `e2e/design-system-and-stability.spec.ts` para validar o H1 sem text-accent bicolor.
   - Auditoria confirmando que todos os headings (`h1`, `h2`, `h3`) e parágrafos do site mantêm cor uniforme (sem mesclas de branco e verde na mesma sentença).

3. **Eliminação da Palavra "Sênior" do Site:**
   - **Home Hero (`src/components/sections/Hero.tsx`):**
     * De: *"Avaliar a arquitetura do meu sistema com um olhar sênior"*
     * Para: *"Avaliar a arquitetura do meu sistema com um diagnóstico técnico"*
     * Atualização de `src/components/sections/__tests__/Hero.test.tsx`.
   - **Engenharia (`src/pages/EngineeringPage.tsx`):**
     * Métrica e detalhe no card de CI/CD:
       - De: `metric: "Senior Validation Required"`, `detail: "Revisão arquitetural sênior · OWASP Top 10 · Protocolo SDD"`
       - Para: `metric: "Validação Arquitetural Obrigatória"`, `detail: "Revisão técnica de arquitetura · OWASP Top 10 · Protocolo SDD"`
     * Atualização do teste E2E em `e2e/multi-route-navigation.spec.ts`.

4. **Quality Gates & Testes:**
   - Execução completa de `npx tsc --noEmit`, `npm run lint`, `npm test -- --run`, `npx playwright test` e `npm run build`.
   - Captura de evidências visuais comprovando o espaçamento harmonioso no Desktop Dark, Desktop Light e Mobile Dark.

### 2.2 Fora de Escopo

- Alterações na lógica geométrica dos nós ou conexões de `EpmConstellation.tsx` (a silhueta aprovada na SPEC-093 permanece íntegra).
- Alterações em regras de negócio ou estrutura do formulário de contato.

---

## 3. Critérios de Aceite

1. [ ] No Hero de `/sobre`, a constelação possui respiro adequado e NÃO sobrepõe nem encosta no título H1 em resolução alguma (Desktop, Tablet e Mobile).
2. [ ] No mobile e tablet, a constelação fica posicionada de forma fluida sem disputar contraste ou legibilidade com o título.
3. [ ] O H1 da Home (`src/components/sections/Hero.tsx`) é 100% monocromático em branco/primary, sem palavras em verde no meio da frase.
4. [ ] Nenhuma ocorrência da palavra "sênior / senior" existe no corpo de textos e componentes do site.
5. [ ] Todos os testes unitários (Vitest) e testes E2E (Playwright) passam com 100% de aprovação.
6. [ ] Zero erros de compilação TypeScript e zero advertências de ESLint.
7. [ ] Build de produção pré-renderiza com sucesso e sem chunks acima de 600KB.

---

## 4. Arquivos Impactados

- **Modificar:** `src/pages/AboutPage.tsx` (reestruturação do Hero em grid 2 colunas com respiro para EpmConstellation)
- **Modificar:** `src/components/sections/Hero.tsx` (H1 100% monocromático e remoção da palavra sênior)
- **Modificar:** `src/pages/EngineeringPage.tsx` (remoção da palavra sênior na esteira de qualidade)
- **Modificar:** `src/components/sections/__tests__/Hero.test.tsx` (sincronização de texto do cenário)
- **Modificar:** `e2e/design-system-and-stability.spec.ts` (remoção de asserção de acento cromático no H1)
- **Modificar:** `e2e/multi-route-navigation.spec.ts` (sincronização de texto de validação técnica)
- **Criar:** `tasks/TASK-094-alinhamento-constelacao-textos-monocromaticos-remocao-senior.md`
- **Criar:** `reviews/QA-094.md`
- **Modificar:** `PROJECT.md` e `CHANGELOG.md`

---

## 5. Decisão de Aprovação do PO

Aguardando aprovação explícita do Product Owner para abertura da **TASK-094** e implementação das alterações.
