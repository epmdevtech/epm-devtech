# TASK-029 — Posicionamento de Notificações Toast e Feedback de Envio de Contato

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-029                                                              |
| **Data**      | 2026-09-07                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluída — 07/09/2026                                             |

---

## 1. Contexto

Corrigir a localização da notificação de envio do formulário de contato, que aparecia na extremidade inferior direita sobre o rodapé e ao lado do botão de ScrollToTop. A solução reconfigura o componente `Toaster` do Sonner para `top-center` com offset seguro abaixo do Header fixo em desktop e mobile, além de adicionar microinteração transitória de sucesso diretamente no botão de envio.

---

## 2. Checklist Planejado

- [x] Reconfigurar `src/components/ui/sonner.tsx` com `position="top-center"`, `offset={{ top: "84px" }}`, `mobileOffset={{ top: "76px", left: "16px", right: "16px" }}` e `closeButton`
- [x] Implementar estado `isSuccess` no botão de envio em `src/components/sections/Contact.tsx` com ícone `Check` e feedback imediato
- [x] Atualizar testes unitários em `src/components/sections/__tests__/Contact.test.tsx`
- [x] Executar Quality Gates: `npm run lint` (0 erros)
- [x] Executar Quality Gates: `npm run test:coverage` (cobertura ≥ 90%)
- [x] Executar Quality Gates: `npm run build` (sucesso, chunks < 600KB)
- [x] Executar Quality Gates: `npx playwright test` (9/9 testes E2E)
- [x] Gerar relatório de evidências em `reviews/QA-029.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git na branch `develop`
- [ ] Push na `develop` e validação do CI verde
- [ ] Merge na `main`, push e acompanhamento do deploy na Vercel
