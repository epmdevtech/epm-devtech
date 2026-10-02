# TASK-089 — Refatoração Editorial do Hero de /sobre com Inline Trust Marks e Malha de Conectividade em SVG

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-089-sobre-hero-editorial-network.md`

---

## 1. Escopo da Tarefa

1. **Remoção do Card Lateral Fechado em `/sobre` (`src/pages/AboutPage.tsx`)**:
   - Remover o container retangular escuro `"Como atuamos com a sua equipe"`, suas bordas e divisórias internas.
   - Eliminar caixas com bordas (`border`, `bg-zinc-950`) na dobra inicial.

2. **Criação do Componente Visual de Malha em SVG (`EngineeringNetworkGraph.tsx` ou modular no Hero)**:
   - Construir a malha SVG com nós e conexões de engenharia com animação suave de respiração via Framer Motion.
   - Posicionamento absoluto (`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none -z-0`).
   - Suporte estrito a `prefers-reduced-motion` através do hook `useReducedMotion`.

3. **Layout Editorial Amplo & Inline Trust Marks**:
   - Eyebrow: `[ QUEM SOMOS // POSICIONAMENTO ]` com `BrandChipIcon`.
   - H1 Amplo: *"Engenharia de software sob medida com <span className="text-text-brand">visão real de negócio</span>"*.
   - Parágrafo Institucional generoso (`max-w-3xl text-base sm:text-lg lg:text-xl text-secondary leading-relaxed`).
   - Linha horizontal de Inline Trust Marks:
     * `● Atendimento 100% Remoto & Nacional`
     * `● Contato Direto com Liderança Técnica`
     * `● Propriedade Integral do Código`

4. **Transição e Ritmo Tonal**:
   - Hero na camada `anchor` (`bg-surface-anchor`), com respiro adequado (`pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pb-28`) e conexão fluida com a seção `#jornada` (`tone="base"`).

5. **Testes & Quality Gates**:
   - Atualizar testes em `src/pages/__tests__/pages.test.tsx`.
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Vitest (`npm test -- --run`), Playwright e Build.
   - Capturar screenshots em Desktop Dark, Desktop Light e Mobile Dark.
   - Criar `reviews/QA-089.md`, atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Git commit em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-089-sobre-hero-editorial-network.md`.
- [x] Obter aprovação formal do PO.
- [x] Implementar `EngineeringNetworkGraph` e o novo Hero editorial em `src/pages/AboutPage.tsx`.
- [x] Atualizar testes em `src/pages/__tests__/pages.test.tsx`.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais (Desktop Dark, Desktop Light, Mobile Dark).
- [x] Criar relatório `reviews/QA-089.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-089 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-089-sobre-hero-editorial-network.md` (Criado)
- `tasks/TASK-089-sobre-hero-editorial-network.md` (Criado)
- `src/components/sections/EngineeringNetworkGraph.tsx` (Criar)
- `src/pages/AboutPage.tsx` (Modificar)
- `src/pages/__tests__/pages.test.tsx` (Modificar)
- `reviews/QA-089.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
