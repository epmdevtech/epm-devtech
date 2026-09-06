# SPEC-023 — Correção de Overflow e Alinhamento do Menu Dropdown no Formulário de Contato

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Correção de Overflow e Alinhamento do Menu Dropdown no Contato        |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

No formulário de contato (`Contact.tsx`), no layout Split Card, o campo "Desafio ou Tipo de Projeto" está posicionado na segunda coluna do grid interno (`sm:grid-cols-2`), vizinho imediato da divisa com o bloco escuro à direita.

Ao abrir o menu dropdown de seleção, o container flutuante expandia para a direita devido à largura intrínseca dos textos mais longos (ex.: *"APIs, Microsserviços e Integrações"*), ultrapassando o limite da coluna do formulário e invadindo visualmente o bloco escuro vizinho.

Esta especificação define o ajuste de posicionamento e dimensionamento do dropdown para que sua largura fique 100% contida dentro da largura exata do seu campo pai (trigger).

---

## 2. Diagnóstico e Requisitos Técnicos

### 2.1 Container Pai do Campo
- Deve conter obrigatoriamente a classe `relative` e largura total `w-full` para servir de âncora contextual:
  `<div className="flex flex-col relative w-full">`

### 2.2 Trigger do Select
- Largura total explícita: `w-full`.
- Manutenção do estilo minimalista underline: `border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm`.

### 2.3 Menu Flutuante das Opções (`SelectContent`)
- **Largura Travada ao Trigger**:
  `w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]` (ou `w-full min-w-full max-w-full`).
- **Camada e Efeito**:
  `z-50 shadow-lg rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden`.
- **Posicionamento**:
  `position="popper"` com deslocamento vertical `translate-y-1` diretamente abaixo do input.

### 2.4 Itens do Dropdown (`SelectItem`)
- Quebra/truncamento de texto para que opções longas não estufem a caixa:
  `className="text-left px-3 py-2 text-sm truncate cursor-pointer ..."`
  Filho de texto com `<span className="truncate block w-full">{type}</span>`.

### 2.5 Card Principal
- Preservar integridade visual sem corte abrupto de elementos flutuantes.

---

## 3. Plano de Testes e Quality Gates

1. **Testes Unitários (`Contact.test.tsx`)**:
   - Manter 100% de aprovação na renderização do formulário, seleção de tipos de projeto e submissão.
2. **Quality Gates**:
   - `npm run test:coverage`: Cobertura $\ge 90\%$.
   - `npm run lint`: Zero erros.
   - `npm run build`: Zero erros e sem warnings.
   - `npx playwright test`: 100% de aprovação (8/8 testes).
