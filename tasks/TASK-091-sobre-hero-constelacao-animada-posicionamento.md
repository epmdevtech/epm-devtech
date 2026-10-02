# TASK-091 — Aproximação e Animação Viva da Constelação Técnica no Hero de /sobre

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-091-sobre-hero-constelacao-animada-posicionamento.md`

---

## 1. Escopo da Tarefa

1. **Aproximação e Reenquadramento Espacial da Constelação em `/sobre`**:
   - Ajustar o posicionamento de `EngineeringNetworkGraph` em `src/pages/AboutPage.tsx` para aproximá-lo do conteúdo e preencher a metade direita do Hero (`absolute -right-20 sm:-right-12 lg:-right-6 xl:right-4 top-1/2 -translate-y-1/2`), ancorando-o ao `container max-w-6xl`.
   - Ajustar dimensões responsivas para harmonia visual e eliminação de vazios.
2. **Implementação de Animações Vivas com Framer Motion em `EngineeringNetworkGraph.tsx`**:
   - Rotação contínua e suave dos anéis orbitais concêntricos em sentidos opostos (42s horário e 65s anti-horário, linear loop).
   - Efeito sonar/pulso expansivo emanando do nó Core central (`r: [10, 52]`, repetição em loop a cada 3.2s).
   - Feixes ativos de dados com `strokeDashoffset` animado de forma contínua.
   - Partículas de pacotes de dados (`motion.circle`) trafegando pelas conexões da malha.
   - Micro-flutuação orgânica (`y: [-2, 2, -2]`) e pulsação suave dos nós satélites.
   - Suporte estrito a `useReducedMotion()`.
3. **Quality Gates & Evidências**:
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Vitest (`npm test -- --run`), Playwright e Build.
   - Capturar screenshots em Desktop Dark, Desktop Light e Mobile Dark.
   - Criar `reviews/QA-091.md`, atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Git commit em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-091-sobre-hero-constelacao-animada-posicionamento.md`.
- [x] Obter aprovação formal do PO.
- [x] Implementar animações vivas em `src/components/sections/EngineeringNetworkGraph.tsx`.
- [x] Ajustar posicionamento espacial aproximado em `src/pages/AboutPage.tsx`.
- [x] Criar teste unitário em `src/components/sections/__tests__/EngineeringNetworkGraph.test.tsx`.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais (Desktop Dark, Desktop Light, Mobile Dark).
- [x] Criar relatório `reviews/QA-091.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-091 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-091-sobre-hero-constelacao-animada-posicionamento.md` (Criado)
- `tasks/TASK-091-sobre-hero-constelacao-animada-posicionamento.md` (Criado / Atualizado)
- `src/components/sections/EngineeringNetworkGraph.tsx` (Modificado)
- `src/pages/AboutPage.tsx` (Modificado)
- `src/components/sections/__tests__/EngineeringNetworkGraph.test.tsx` (Criado)
- `reviews/QA-091.md` (Criado)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
