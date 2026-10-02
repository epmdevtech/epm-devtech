# TASK-087 — Remoção Global de Seções Finais de CTA Redundantes em Todas as Rotas

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-087-remocao-ctas-finais-rotas.md`

---

## 1. Escopo da Tarefa

1. **Remoção das Caixas Finais de CTA**:
   - `src/pages/ServicesPage.tsx`: Remover `<SectionWrapper tone="base">` com "Quer avaliar qual solução se encaixa no seu momento?" e botões auxiliares.
   - `src/pages/HowWeWorkPage.tsx`: Remover `<SectionWrapper tone="base">` com "Ficou com alguma dúvida sobre o processo?" e botões auxiliares.
   - `src/pages/ExperiencePage.tsx`: Remover `<SectionWrapper tone="base">` com "Sua empresa tem uma demanda de alta complexidade?" e botão auxiliar.
   - `src/pages/EngineeringPage.tsx`: Remover `<SectionWrapper tone="base">` com "Precisa de engenharia sólida no seu produto ou sistema interno?" e botão auxiliar.
   - `src/pages/AboutPage.tsx`: Remover `<SectionWrapper tone="alt">` com "Pronto para construir sua próxima solução com quem entende de código?" e botão auxiliar.
2. **Limpeza de Imports & Arquitetura**:
   - Remover imports órfãos (`Button`, `ArrowRight`, `HelpCircle`, etc.) em cada página.
   - Validar que o espaçamento final (`py-16 md:py-24` ou `py-20 md:py-28`) e o ritmo de camadas tonais (SPEC-082) permanecem estritamente preservados.
3. **Testes & Quality Gates**:
   - Atualizar testes em `src/pages/__tests__/pages.test.tsx`.
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Vitest (`npm test -- --run`), Playwright e Build.
4. **Documentação & Encerramento**:
   - Elaborar relatório de QA (`reviews/QA-087.md`).
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit Git com mensagem em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-087-remocao-ctas-finais-rotas.md`.
- [x] Obter aprovação formal do PO.
- [x] Remover CTA final e limpar imports em `ServicesPage.tsx`.
- [x] Remover CTA final e limpar imports em `HowWeWorkPage.tsx`.
- [x] Remover CTA final e limpar imports em `ExperiencePage.tsx`.
- [x] Remover CTA final e limpar imports em `EngineeringPage.tsx`.
- [x] Remover CTA final e limpar imports em `AboutPage.tsx`.
- [x] Atualizar testes em `src/pages/__tests__/pages.test.tsx`.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Elaborar relatório de QA (`reviews/QA-087.md`).
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-087-remocao-ctas-finais-rotas.md` (Criado)
- `tasks/TASK-087-remocao-ctas-finais-rotas.md` (Criado)
- `src/pages/ServicesPage.tsx` (Modificar)
- `src/pages/HowWeWorkPage.tsx` (Modificar)
- `src/pages/ExperiencePage.tsx` (Modificar)
- `src/pages/EngineeringPage.tsx` (Modificar)
- `src/pages/AboutPage.tsx` (Modificar)
- `src/pages/__tests__/pages.test.tsx` (Modificar)
- `reviews/QA-087.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
