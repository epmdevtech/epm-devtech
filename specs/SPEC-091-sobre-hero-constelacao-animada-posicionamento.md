# SPEC-091 — Aproximação e Animação Viva da Constelação Técnica no Hero de /sobre

- **Status:** APROVADO
- **Data de Aprovação:** 2026-10-02
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Motion Design / SVG Animation

---

## 1. Contexto e Motivação

No Hero da rota `/sobre` (`src/pages/AboutPage.tsx`), a constelação técnica de nós e conexões de engenharia ([`EngineeringNetworkGraph.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/EngineeringNetworkGraph.tsx)) foi implementada com sucesso, porém apresenta duas limitações de design identificadas pelo PO:
1. **Posicionamento muito afastado:** O elemento estava ancorado na borda extrema da viewport (`right-0` absoluto em telas largas), gerando um vazio escuro desproporcional entre o bloco de texto editorial à esquerda e a constelação à direita.
2. **Sensação de elemento estático:** As linhas e anéis eram traços estáticos sem movimento visível, e a sutil variação de opacidade existente não transmitia a sensação de software vivo, fluxo de dados e conectividade contínua esperada de uma software house corporativa de alta tecnologia.

Esta especificação define a **aproximação e integração espacial** da constelação ao bloco de conteúdo e a introdução de **animações visuais fluidas, contínuas e refinadas** em SVG e Framer Motion.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Aproximação e Reenquadramento Espacial ("menos afastada"):**
   - Reposicionar a constelação para que se aproxime do bloco de texto, preenchendo a metade direita do Hero de forma equilibrada no desktop (`lg:right-6 xl:right-16` ou ancorada internamente em relação à largura útil do container `max-w-6xl`).
   - Dimensionamento balanceado (`w-[480px] sm:w-[580px] lg:w-[680px] h-[400px] sm:h-[480px] lg:h-[560px]`), evitando vazios entre texto e artefato visual.
   - No mobile, manter o recuo lateral e opacidade controlada para preservar legibilidade do texto.

2. **Animações Vivas e Fluidas com Framer Motion:**
   - **Rotação Contínua dos Anéis Orbitais:**
     * Anel orbital interno girando suavemente em sentido horário (`rotate: 360`, ciclo lento de 40s em loop infinito com interpolação linear).
     * Anel orbital externo girando em sentido anti-horário (`rotate: -360`, ciclo de 60s em loop linear).
   - **Feixes de Fluxo e Partículas de Dados em Trânsito:**
     * Feixes de pulso luminoso contínuo percorrendo as conexões principais entre o Core central e os hubs/satélites através de `strokeDasharray` e `strokeDashoffset` animados.
     * Partículas luminosas (`motion.circle`) simulando pacotes de dados viajando entre os nós da rede.
   - **Efeito Sonar / Pulso Expansivo no Nó Central:**
     * Ondas concêntricas sutis que se expandem a partir do Core central (`scale: [1, 2.2]`, `opacity: [0.5, 0]`, repetição a cada 3.5s).
   - **Micro-respiração dos Nós Satélites:**
     * Flutuação sutil de escala e luminosidade nos nós da rede (`scale: [0.95, 1.08, 0.95]`, `opacity: [0.4, 0.9, 0.4]`).

3. **Governança de Acessibilidade (`prefers-reduced-motion`):**
   - Respeito obrigatório ao hook `useReducedMotion()` do Framer Motion: se ativado pelo usuário no sistema operacional, todas as rotações, translações e expansões de sonar são desativadas, apresentando a constelação estática com contraste equilibrado.

4. **Testes & Quality Gates:**
   - Validação da suite completa de testes unitários (Vitest) e testes E2E (Playwright).
   - Execução do build de produção e geração de evidências visuais nos temas Dark, Light e Mobile.

### 2.2 Fora de Escopo

- Modificações em outras seções da página `/sobre` (timeline e manifesto de princípios).
- Alterações em outras rotas ou no Header global.

---

## 3. Critérios de Aceite

1. [ ] A constelação técnica está espacialmente aproximada do bloco de texto editorial, eliminando a sensação de elemento "afastado" ou vazio visual no centro-direita do Hero.
2. [ ] A constelação possui movimento vivo e contínuo perceptível: rotação suave de anéis orbitais, feixes/pulsos de dados fluindo e pulso expansivo no nó central.
3. [ ] A animação é fluida (60 FPS), sem jank e sem bloquear a rolagem ou interação com a página.
4. [ ] O hook `useReducedMotion` é respeitado estritamente quando ativado.
5. [ ] Todos os quality gates (TypeScript, ESLint, Vitest, Playwright, Build) passam com 100% de sucesso.
