# TASK-025 — Refinamento Visual e Alinhamento Estrito do Dropdown de Contato

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-025                                                              |
| **Data**      | 2026-09-07                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluída — 07/09/2026                                             |

---

## 1. Contexto & Agendamento

Esta tarefa foi registrada a pedido do PO para execução no início da sessão do dia **07/09/2026**.
O objetivo é o refinamento final de alinhamento e dimensionamento do menu dropdown do campo **"Desafio ou Tipo de Projeto"** no formulário de contato, com base na captura `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-09-06 19-17-35.png`.

---

## 2. Checklist Planejado

- [x] Revisar larguras relativas e alinhamento do grid dos campos em `Contact.tsx`
- [x] Ajustar o container de opções do Radix Select para perfeito encaixe sob o underline do campo
- [x] Executar Quality Gates: `npm run test:coverage`
- [x] Executar Quality Gates: `npm run lint`
- [x] Executar Quality Gates: `npm run build`
- [x] Executar Quality Gates: `npx playwright test`
- [x] Gerar relatório de evidências em `reviews/QA-025.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [ ] Realizar commits semânticos no git

---

## 3. Diagnóstico Técnico

### Problema Identificado
Na sessão de análise do código e captura de tela de referência (`Captura de tela de 2026-09-06 19-17-35.png`), foram identificados:

1. **Gap vertical entre underline do trigger e borda do menu**: O `select.tsx` base aplica `data-[side=bottom]:translate-y-1` (4px) ao `SelectContent` em modo `popper`. Isso cria um descolamento vertical visível entre a linha underline do campo e a borda superior do dropdown.
2. **Falta de `sideOffset={0}` explícito**: A API Radix Popper tem offset padrão que combinado com o translate resulta em afastamento indesejado.

### Arquivos Modificados
| Arquivo | Tipo de Mudança |
|---|---|
| `src/components/sections/Contact.tsx` | Ajuste de classes e prop `sideOffset` no `SelectContent` |

### Solução Implementada
Em `Contact.tsx` (linha 254-258), adicionado ao `SelectContent`:
- `sideOffset={0}` — garante offset zero via API Radix Popper
- `data-[side=bottom]:translate-y-0` — neutraliza o `translate-y-1` herdado do `select.tsx` base sem alterar o arquivo base (preserva outros usos do componente)

Esta abordagem cirúrgica respeita o escopo da SPEC-025 sem impacto em outros componentes.

