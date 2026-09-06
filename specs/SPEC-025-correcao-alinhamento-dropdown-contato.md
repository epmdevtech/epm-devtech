# SPEC-025 — Refinamento Visual e Alinhamento Estrito do Dropdown de Contato

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **Título**    | Refinamento Visual e Alinhamento Estrito do Dropdown de Contato        |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX)  |
| **PO**        | Elessandro Prestes Macedo                                              |
| **Status**    | ⏳ Draft / Agendada (07/09/2026)                                       |
| **Data**      | 2026-09-07                                                             |
| **Versão**    | 1.0                                                                    |

---

## 1. Contexto & Defeito Visual Relatado

### 1.1 Evidência Visual
- Captura de tela registrada: `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-09-06 19-17-35.png`.

### 1.2 Descrição do Cenário
Na seção de Contato (`#contato` / `Contact.tsx`), ao abrir o seletor do campo **"Desafio ou Tipo de Projeto"**, observa-se a necessidade de refinamento no alinhamento e dimensionamento da caixa flutuante de opções em relação à linha do campo (underline) e aos demais inputs da coluna esquerda (ex.: "E-mail Profissional").

### 1.3 Objetivos da Refatoração
1. Garantir que a largura do dropdown e o alinhamento da linha inferior coincidam com precisão de 100% com o grid de inputs da coluna branca.
2. Manter as boas práticas de UI/UX minimalista e alinhamento linear estrito.
3. Preservar o confinamento para que nenhuma opção ou borda se sobreponha ao bloco escuro lateral.

---

## 2. Escopo Planejado para 07/09/2026

1. **Ajuste Fino de Layout em `Contact.tsx` e `select.tsx`**:
   - Equalização das larguras dos inputs no grid `grid-cols-1 sm:grid-cols-2`.
   - Ajuste posicional do Popper para alinhamento milimétrico à esquerda e à direita do campo pai.
2. **Quality Gates**:
   - `npm run test:coverage` (cobertura $\ge 90\%$).
   - `npm run lint` (zero erros).
   - `npm run build`.
   - `npx playwright test`.
3. **Registro de Evidências em `QA-025.md`**.
