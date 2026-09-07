# TASK-027 — Resiliência de Envio no Formulário de Contato e Normalização de Autofill

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-027                                                              |
| **Data**      | 2026-09-07                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluída — 07/09/2026                                             |

---

## 1. Contexto

Ao testar o envio de e-mail na seção de Contato, o provedor EmailJS retornou erro HTTP 412 (`Gmail_API: Invalid grant`), indicando que a credencial OAuth2 do Gmail expirou no painel do EmailJS. Além disso, foram identificados o vazamento da mensagem de erro da API no Toast para o usuário final e a quebra visual nos campos com preenchimento automático (autofill).

---

## 2. Checklist Planejado

- [x] Ajustar tratamento de exceção em `Contact.tsx` para exibir mensagem institucional amigável no Toast com ação de contingência para WhatsApp
- [x] Preservar log detalhado do erro via `console.error` para auditoria técnica
- [x] Adicionar regras de normalização de `-webkit-autofill` em `src/index.css` para manter fundo transparente nos inputs underline
- [x] Atualizar testes unitários em `Contact.test.tsx` para validar a nova mensagem amigável de erro
- [x] Executar Quality Gates: `npm run lint` (0 erros)
- [x] Executar Quality Gates: `npm run test:coverage` (99/99 testes, 98.25%)
- [x] Executar Quality Gates: `npm run build` (sucesso, chunks < 600KB)
- [x] Executar Quality Gates: `npx playwright test` (9/9 testes, 51.0s)
- [x] Gerar relatório de evidências em `reviews/QA-027.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [ ] Realizar commits semânticos no git
