# SPEC-072 — Alinhamento Geométrico Rigoroso da Linha do Pipeline

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Diagnóstico

Na seção de Processo / Metodologia (`HomeProcessPipeline.tsx`), a linha condutora horizontal no desktop estava posicionada com `left-[12.5%] right-[12.5%]`.

### 1.1. Diagnóstico da Falha de Alinhamento
- Os nós `01` a `04` estão alinhados à esquerda de cada coluna no grid de 4 colunas (`grid-cols-4`).
- Cada nó possui dimensão `w-9 h-9` (36px × 36px), situando o seu centro geométrico em **X = 18px** da coluna.
- Em um container de 1200px, a classe `left-[12.5%]` posiciona o início da linha em **X = 150px**, gerando um vão de mais de 130px após o nó 01 e fazendo com que a linha nasça no espaço entre o nó 01 e o nó 02.
- No extremo oposto, a linha ultrapassava o nó 04, que também se situa no início de sua respectiva coluna.

---

## 2. Decisões de Design e Correção Geométrica

### 2.1. Ancoragem Geométrica da Linha (Desktop `md:`)
1. **Ponto Inicial (Nó 01)**:
   - `left-[18px]` — ancorado exatamente no centro geométrico do nó 01.
2. **Ponto Final (Nó 04)**:
   - No grid de 4 colunas com gap, a distância do centro do nó 04 até a borda direita total do grid obedece à equação $C - 18\text{px}$, onde $C$ é a largura da coluna.
   - Para `md:gap-6` (24px de gap): $RightOffset = \text{calc}(25\% - 36\text{px})$.
   - Para `lg:gap-8` (32px de gap): $RightOffset = \text{calc}(25\% - 42\text{px})$.
   - Classes aplicadas no container do trilho: `left-[18px] md:right-[calc(25%-36px)] lg:right-[calc(25%-42px)]`.
3. **Alinhamento Vertical (Eixo Y)**:
   - `top-[17px]` com altura `h-[2px]`, posicionando o centro da linha exatamente em Y = 18px (centro do círculo de 36px).

### 2.2. Camadas de Z-Index e Oclusão
1. **Trilho e Linha Animada**:
   - `z-0 pointer-events-none` — posicionados estritamente na camada de fundo.
2. **Nós Circulares (01, 02, 03, 04)**:
   - `relative z-10 bg-surface dark:bg-zinc-950` — fundo sólido opaco para garantir que o trilho passe por trás dos nós sem sobrepor o número tipográfico.

### 2.3. Calibração da Animação Framer Motion
1. **Desktop**:
   - Feixe de luz com largura total do trilho (`w-full h-full`) e gradiente `from-transparent via-brand to-transparent`.
   - Partida e chegada relativas ao próprio trilho corrigido:
     - `initial={{ x: "-100%" }}`
     - `animate={{ x: "100%" }}`
     - `transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}`
   - O feixe nasce suavemente de dentro do nó 01, percorre os nós 02 e 03 e alcança o nó 04.
2. **Mobile**:
   - Linha vertical em `left-[17px] top-[18px] bottom-[18px] w-[2px]`.
   - Feixe vertical: `initial={{ y: "-100%" }}`, `animate={{ y: "100%" }}`, `transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}`.
3. **Acessibilidade (`prefers-reduced-motion`)**:
   - Utilização de `useReducedMotion()`. Quando ativo, o feixe animado é inibido, mantendo o trilho base contínuo estático.

---

## 3. Critérios de Aceite (Quality Gates)

- [ ] A linha estática e o feixe animado partem exatamente de X = 18px (centro do nó 01) e terminam exatamente no centro do nó 04.
- [ ] Os círculos 01 a 04 possuem `z-10` e fundo sólido `bg-surface dark:bg-zinc-950`, sobrepondo a linha sem vazamento visual.
- [ ] O feixe animado Framer Motion corre continuamente de nó 01 a 04 sem quebras ou offsets incorretos.
- [ ] Suporte a `useReducedMotion()` mantido.
- [ ] Semântica `<ol>` e `<li>`, textos e testes unitários 100% preservados.
- [ ] `npx tsc --noEmit` sem erros.
- [ ] `npm run lint` sem erros ou warnings.
- [ ] `npm test -- --run` com 100% de aprovação.
- [ ] `npx playwright test` com 100% de aprovação.
- [ ] `npm run build` concluído com sucesso e sem chunks excessivos.

---

## 4. Plano de Implementação

1. **Fase 1 — Aprovação**: Obter aprovação formal do PO para esta SPEC-072.
2. **Fase 2 — Criação da TASK-072**: Registrar `tasks/TASK-072-alinhamento-geometrico-pipeline.md`.
3. **Fase 3 — Refatoração do Componente**: Ajustar classes Tailwind e parâmetros Framer Motion em `src/components/sections/HomeProcessPipeline.tsx`.
4. **Fase 4 — Testes**: Atualizar e rodar suíte unitária e E2E.
5. **Fase 5 — Quality Gates & Relatório**: Executar pipeline completo e documentar em `reviews/QA-072.md`.
6. **Fase 6 — Documentação & Commit**: Atualizar `PROJECT.md`, `CHANGELOG.md` e commitar no Git.
