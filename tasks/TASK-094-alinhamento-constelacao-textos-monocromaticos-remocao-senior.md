# TASK-094 — Alinhamento Responsivo da Constelação em /sobre, Textos Rigorosamente Monocromáticos e Remoção da Palavra Sênior

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-094-alinhamento-constelacao-textos-monocromaticos-remocao-senior.md`

---

## 1. Escopo da Tarefa

1. **Alinhamento e Responsividade de `EpmConstellation` em `/sobre` (`src/pages/AboutPage.tsx`)**:
   - Estruturar o Hero em grid responsivo de 2 colunas no desktop (`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center`).
   - Coluna da esquerda (`lg:col-span-7`): texto editorial com respiro e largura máxima controlada (`max-w-xl xl:max-w-2xl`).
   - Coluna da direita (`lg:col-span-5`): constelação posicionada em espaço próprio com proporção harmônica (`w-[340px] sm:w-[380px] lg:w-[440px] xl:w-[480px] h-[340px] sm:h-[380px] lg:h-[440px] xl:h-[480px]`).
   - Em mobile e tablets (`< 1024px`), renderizar a constelação abaixo do bloco de texto com escala fluida (`w-[280px] sm:w-[340px] h-[280px] sm:h-[340px]`) e centralizada, eliminando qualquer colisão com as letras do H1.

2. **Unificação Cromática dos Textos (Fim dos Textos Bicolores)**:
   - Em `src/components/sections/Hero.tsx`, remover `<span className="text-text-brand">` dentro do H1, mantendo-o 100% monocromático em `text-primary`.
   - Garantir que todos os títulos e textos do site adotem cor uniforme padrão.

3. **Remoção da Palavra "Sênior"**:
   - Em `src/components/sections/Hero.tsx`: alterar *"Avaliar a arquitetura do meu sistema com um olhar sênior"* para *"Avaliar a arquitetura do meu sistema com um diagnóstico técnico"*.
   - Em `src/pages/EngineeringPage.tsx`: alterar *"Senior Validation Required"* para *"Validação Arquitetural Obrigatória"* e *"Revisão arquitetural sênior"* para *"Revisão técnica de arquitetura"*.

4. **Sincronização de Testes**:
   - Atualizar `src/components/sections/__tests__/Hero.test.tsx` com o novo texto do cenário.
   - Atualizar `e2e/design-system-and-stability.spec.ts` para verificar o H1 100% monocromático.
   - Atualizar `e2e/multi-route-navigation.spec.ts` caso haja asserções relacionadas.

5. **Quality Gates & Release**:
   - `npx tsc --noEmit`, `npm run lint`, `npm test -- --run`, `npx playwright test`, `npm run build`.
   - Capturar evidências visuais no Desktop Dark, Desktop Light e Mobile Dark.
   - Criar `reviews/QA-094.md`, atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Commit Git no branch `develop` em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-094-alinhamento-constelacao-textos-monocromaticos-remocao-senior.md`.
- [x] Obter aprovação formal do PO.
- [x] Implementar grid responsivo no Hero de `src/pages/AboutPage.tsx`.
- [x] Unificar cor do H1 do Hero da Home e remover palavra sênior em `src/components/sections/Hero.tsx`.
- [x] Remover termo sênior em `src/pages/EngineeringPage.tsx`.
- [x] Sincronizar suítes de testes unitários e E2E (`Hero.test.tsx`, `design-system-and-stability.spec.ts`, etc.).
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais (Desktop Dark, Desktop Light, Mobile Dark).
- [x] Criar relatório `reviews/QA-094.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-094 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-094-alinhamento-constelacao-textos-monocromaticos-remocao-senior.md` (Criado / Aprovado)
- `tasks/TASK-094-alinhamento-constelacao-textos-monocromaticos-remocao-senior.md` (Criado)
- `src/pages/AboutPage.tsx` (Modificar)
- `src/components/sections/Hero.tsx` (Modificar)
- `src/pages/EngineeringPage.tsx` (Modificar)
- `src/components/sections/__tests__/Hero.test.tsx` (Modificar)
- `e2e/design-system-and-stability.spec.ts` (Modificar)
- `reviews/QA-094.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
