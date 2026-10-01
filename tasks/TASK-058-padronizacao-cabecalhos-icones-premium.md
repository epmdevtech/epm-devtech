# TASK-058 — Padronização de Cabeçalhos de Seção e Sistema de Ícones Premium Autoral

- **Status:** Concluída
- **Responsável:** Gemini/Antigravity
- **Início:** 2026-09-30
- **Conclusão:** 2026-09-30
- **SPEC de Referência:** SPEC-058

---

## 1. Escopo de Arquivos

### Cabeçalhos de Seção e Acessibilidade (Parte A)
- [x] `src/components/sections/Authority.tsx` (remover override `titleClassName` para igualar escala H2 e associar `aria-labelledby`)
- [x] `src/components/sections/Services.tsx` (associar `aria-labelledby="servicos-heading"`)
- [x] `src/components/sections/HowWeWork.tsx` (associar `aria-labelledby="como-trabalhamos-heading"`)
- [x] `src/components/sections/Technologies.tsx` (associar `aria-labelledby="tecnologias-heading"`)
- [x] `src/components/sections/Sectors.tsx` (associar `aria-labelledby="setores-heading"`)
- [x] `src/components/sections/FAQ.tsx` (associar `aria-labelledby="faq-heading"`)
- [x] `src/components/sections/Contact.tsx` (associar `aria-labelledby="contato-heading"`)

### Ícones e Preview (Parte B)
- [x] `src/components/icons/index.ts` (exportar wrapper `Icon` genérico adicional)
- [x] `scripts/generate-icon-preview.cjs` (script para gerar grade visual de preview dos ícones autorais em 16/20/24/32 px)
- [x] `docs/evidence/icons/` (armazenamento da grade de evidência)

### Quality Gates e Documentação
- [x] Validação de TypeScript (`npx tsc --noEmit`)
- [x] Validação de ESLint (`npm run lint`)
- [x] Testes unitários e cobertura (`npm run test:coverage`)
- [x] Testes E2E no Playwright (`npm run test:e2e`)
- [x] Build de produção (`npm run build`)
- [x] Relatório de QA em `reviews/QA-058.md`
- [x] Atualização de `PROJECT.md` e `CHANGELOG.md`

---

## 2. Checklist de Execução

- [x] 1. Alinhar escala tipográfica e `aria-labelledby` em todas as seções
- [x] 2. Exportar wrapper `Icon` em `src/components/icons/`
- [x] 3. Gerar grade de preview dos ícones para evidência de QA
- [x] 4. Executar bateria de testes unitários e cobertura (`npm run test:coverage`)
- [x] 5. Executar bateria de testes E2E Playwright (`npm run test:e2e`)
- [x] 6. Executar linter e typecheck (`npm run lint`, `npx tsc --noEmit`)
- [x] 7. Executar build de produção (`npm run build`)
- [x] 8. Gerar relatório de QA em `reviews/QA-058.md`
- [x] 9. Atualizar `PROJECT.md` e `CHANGELOG.md`

