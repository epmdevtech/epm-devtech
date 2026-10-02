# TASK-085 — Reorganização de Métricas: Migração de Contadores Numéricos para a Home e Início Editorial em Experiência

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-085-metricas-home-experiencia.md`

---

## 1. Escopo da Tarefa

1. **Refatoração de `HomeResultsStrip.tsx`**:
   - Integrar componente `CountUp` e hook `useInView` da `framer-motion`.
   - Implementar os 4 itens de métricas com valores técnicos exatos:
     * 99,9% | "Disponibilidade assegurada" | "Em plataformas críticas de energia e educação."
     * 2.500 RPS | "Arquitetura dimensionada" | "Para picos de 10.000 usuários simultâneos sem gargalos."
     * 100% | "Integridade de dados" | "Na consolidação regulatória do setor elétrico, sem perdas."
     * −35% | "Atividades manuais reduzidas" | "Automações e integrações em plataformas modernizadas."
   - Preservar formato Stat Strip com divisores sutis verticais no desktop e acessibilidade (`sr-only` e `aria-hidden`).
2. **Atualização em `Home.tsx`**:
   - Atualizar texto do link de navegação para: `"Ver projetos detalhados →"`.
3. **Refatoração em `ExperiencePage.tsx`**:
   - Remover bloco superior de contadores numéricos (`<Authority />` / `<SectionWrapper id="resultados">`).
   - Iniciar página diretamente no `PageHeader` seguido pela Matriz de Verticais (`#contextos`) e Ledger de Organizações (`#organizacoes`).
   - Readequar o ritmo de camadas tonais:
     * `#contextos` (Matriz de Verticais): tom `base`
     * `#organizacoes` (Enterprise Ledger): tom `alt`
     * `#cta` (Fechamento Comercial): tom `base`
   - Limpar import não utilizado de `Authority`.
4. **Testes & Quality Gates**:
   - Atualizar `src/components/sections/__tests__/HomeResultsStrip.test.tsx`.
   - Executar testes unitários Vitest, testes E2E Playwright, linter, typecheck e build.
5. **Documentação & Encerramento**:
   - Criar `reviews/QA-085.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Commit Git com mensagem em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Criar especificação `specs/SPEC-085-metricas-home-experiencia.md`.
- [x] Obter aprovação do PO.
- [x] Implementar `HomeResultsStrip.tsx` com contadores animados `CountUp`.
- [x] Atualizar link em `Home.tsx`.
- [x] Refatorar `ExperiencePage.tsx` removendo bloco de contadores e ajustando ritmo tonal.
- [x] Atualizar testes unitários (`HomeResultsStrip.test.tsx`).
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Gerar capturas de tela e evidências visuais.
- [x] Elaborar relatório de QA (`reviews/QA-085.md`).
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-085-metricas-home-experiencia.md` (Criado)
- `tasks/TASK-085-metricas-home-experiencia.md` (Criado)
- `src/components/sections/HomeResultsStrip.tsx` (Modificar)
- `src/pages/Home.tsx` (Modificar)
- `src/pages/ExperiencePage.tsx` (Modificar)
- `src/components/sections/__tests__/HomeResultsStrip.test.tsx` (Modificar)
- `reviews/QA-085.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
