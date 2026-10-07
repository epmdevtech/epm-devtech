# TASK-114 — Remoção da Seção Intermediária de Chamada de Contato (Bottom CTA em Sobre Nós e Engenharia)

- **SPEC Relacionada:** [SPEC-114](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/specs/SPEC-114-remocao-secao-bottom-cta-sobre-nos.md)
- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Data de Início:** 2026-10-07
- **Data de Conclusão:** 2026-10-07

---

## 1. Escopo de Arquivos Modificados

- `src/pages/AboutPage.tsx` (remoção da seção `#sobre-cta`, limpeza de `useNavigate`, `MagneticButton` e `bottomCtaRef`)
- `src/pages/EngineeringPage.tsx` (remoção da seção `#engenharia-cta`, limpeza de `useNavigate`, `MagneticButton` e `bottomCtaRef`)
- `src/pages/__tests__/pages.test.tsx` (atualização da asserção de ausência de Bottom CTA em `/engineering`)
- `specs/SPEC-114-remocao-secao-bottom-cta-sobre-nos.md`
- `reviews/QA-114.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Execução

- [x] Criar SPEC-114 e registrar TASK-114
- [x] Remover a seção `<SectionWrapper id="sobre-cta" tone="base">` de `src/pages/AboutPage.tsx`
- [x] Limpar imports e hooks não utilizados em `AboutPage.tsx` (`useNavigate`, `navigate`, `MagneticButton`, `bottomCtaRef`)
- [x] Remover a seção `<SectionWrapper id="engenharia-cta" tone="base">` de `src/pages/EngineeringPage.tsx`
- [x] Limpar imports e hooks não utilizados em `EngineeringPage.tsx` (`useNavigate`, `navigate`, `MagneticButton`, `bottomCtaRef`)
- [x] Atualizar testes em `src/pages/__tests__/pages.test.tsx` (9/9 OK)
- [x] Executar `npm run lint` (ESLint 0 erros)
- [x] Executar `npx vitest run src/pages/__tests__/pages.test.tsx` e `npm run test` (275/275 OK)
- [x] Executar `npm run build` (Vite build e pré-render: OK)
- [x] Executar `npm run test:e2e` (Playwright: 46/46 OK)
- [x] Atualizar `reviews/QA-114.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
