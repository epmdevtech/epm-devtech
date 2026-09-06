# TASK-025 — Refinamento Visual e Alinhamento Estrito do Dropdown de Contato

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-025                                                              |
| **Data**      | 2026-09-07                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ⏳ Agendada para 07/09/2026                                           |

---

## 1. Contexto & Agendamento

Esta tarefa foi registrada a pedido do PO para execução no início da sessão do dia **07/09/2026**.
O objetivo é o refinamento final de alinhamento e dimensionamento do menu dropdown do campo **"Desafio ou Tipo de Projeto"** no formulário de contato, com base na captura `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-09-06 19-17-35.png`.

---

## 2. Checklist Planejado

- [ ] Revisar larguras relativas e alinhamento do grid dos campos em `Contact.tsx`
- [ ] Ajustar o container de opções do Radix Select para perfeito encaixe sob o underline do campo
- [ ] Executar Quality Gates: `npm run test:coverage`
- [ ] Executar Quality Gates: `npm run lint`
- [ ] Executar Quality Gates: `npm run build`
- [ ] Executar Quality Gates: `npx playwright test`
- [ ] Gerar relatório de evidências em `reviews/QA-025.md`
- [ ] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [ ] Realizar commits semânticos no git
