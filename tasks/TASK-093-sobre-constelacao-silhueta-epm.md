# TASK-093 — Constelação Vetorial de Engenharia com Silhueta do Ícone EPM DevTech no Hero de /sobre

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-093-sobre-constelacao-silhueta-epm.md`

---

## 1. Escopo da Tarefa

1. **Desenvolvimento do Componente `src/components/sections/EpmConstellation.tsx`**:
   - Mapeamento das coordenadas normalizadas SVG (`viewBox="0 0 600 600"`) para os vértices da moldura exterior (tela/circuito com cantos arredondados e pinos de barramento) e núcleo interno (chaves de código `{ }` e divisor `/`).
   - Arestas estruturais e conexões de malha estelar com espessuras e cores semânticas (`#2DD4BF`, `#14B8A6`, `rgba(45, 212, 191, 0.2)`).
   - Nós estelares com núcleo luminoso e halos concêntricos de difusão de luz.
   - Animação de entrada com traçado progressivo (`pathLength: 0` a `1`) e nós em cascata (`staggerChildren`).
   - Animação contínua orgânica em loop de respiração lenta (`idle breathing` / pulsação luminosa).
   - Interatividade de mouse tracking com realce dos nós e linhas sob proximidade do cursor.
   - Suporte estrito a `useReducedMotion()`.

2. **Integração na Rota `/sobre` (`src/pages/AboutPage.tsx`)**:
   - Substituição do grafo genérico anterior por `EpmConstellation.tsx`.
   - Posicionamento responsivo, sem caixas fechadas, com transparência e harmonia em relação ao H1 e subtítulo editorial.

3. **Testes Unitários & E2E**:
   - Criação da suite `src/components/sections/__tests__/EpmConstellation.test.tsx` cobrindo nós, conexões, eventos de mouse e acessibilidade com `useReducedMotion`.
   - Atualização de asserções em testes que monitoram a rota `/sobre` caso necessário.

4. **Quality Gates, Evidências & Release**:
   - `npx tsc --noEmit`, `npm run lint`, `npm test -- --run`, `npm run build`, `npx playwright test`.
   - Captura de evidências visuais (Desktop Dark, Desktop Light e Mobile Dark).
   - Criação de `reviews/QA-093.md`.
   - Atualização de `PROJECT.md` e `CHANGELOG.md`.
   - Git commit no branch `develop` em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-093-sobre-constelacao-silhueta-epm.md`.
- [x] Obter aprovação formal do PO.
- [x] Implementar `src/components/sections/EpmConstellation.tsx` e `src/config/epmConstellation.ts`.
- [x] Integrar `EpmConstellation` no Hero de `src/pages/AboutPage.tsx`.
- [x] Criar testes unitários em `src/components/sections/__tests__/EpmConstellation.test.tsx`.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais nos temas Dark, Light e Mobile.
- [x] Criar relatório `reviews/QA-093.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-093 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-093-sobre-constelacao-silhueta-epm.md` (Criado / Aprovado)
- `tasks/TASK-093-sobre-constelacao-silhueta-epm.md` (Criado / Concluído)
- `src/components/sections/EpmConstellation.tsx` (Criado)
- `src/config/epmConstellation.ts` (Criado)
- `src/components/sections/__tests__/EpmConstellation.test.tsx` (Criado)
- `src/pages/AboutPage.tsx` (Modificado)
- `e2e/hero-identity-token-locks.spec.ts` (Modificado)
- `reviews/QA-093.md` (Criado)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
