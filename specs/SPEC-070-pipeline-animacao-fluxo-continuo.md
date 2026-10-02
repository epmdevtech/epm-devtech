# SPEC-070 — Animação Fluida do Pipeline de Engenharia com Framer Motion

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Motivação

A seção de Processo / Metodologia da Home (`HomeProcessPipeline.tsx`) conecta as etapas 01 a 04 sem caixas fechadas. No entanto, a linha condutora atual é estática, transmitindo pouca sensação de esteira de engenharia ativa e fluxo contínuo de trabalho.

O objetivo desta especificação é refatorar a linha do pipeline utilizando **Framer Motion**, adicionando uma animação fluida e contínua (feixe de luz / beam pulse) que conduz o olhar do usuário do passo 01 ao 04, reforçando a ideia de esteira técnica em produção contínua.

---

## 2. Decisões de Design e Animação

### 2.1. Arquitetura da Linha (Camadas)
1. **Trilho Base (Linha de Fundo)**:
   - Linha estática sutil conectando exatamente o centro dos nós circulares (`top-[18px]` no desktop e `left-[17px]` no mobile).
   - Cor base semântica: `bg-border-subtle/80` (respeitando Dark e Light Mode).
2. **Feixe de Luz Ativo (Beam Pulse)**:
   - `<motion.div>` sobreposto com gradiente de alta performance (`will-change-transform`):
     - **Desktop (Horizontal)**: Feixe `w-32 h-full bg-gradient-to-r from-transparent via-brand to-transparent`, animando `x: ["-100%", "300%"]` em loop contínuo (`duration: 3s`, `repeat: Infinity`, `ease: "easeInOut"`).
     - **Mobile (Vertical)**: Feixe `h-24 w-full bg-gradient-to-b from-transparent via-brand to-transparent`, animando `y: ["-100%", "300%"]` em loop contínuo.
   - Respeito estrito a `prefers-reduced-motion`: feixe estático/desativado quando o usuário preferir movimento reduzido.

### 2.2. Reação e Halo dos Nós (01 ao 04)
- Cada nó circular (01 a 04) possui micro-interação ao hover com halo de brilho temático (`group-hover:shadow-[0_0_15px_rgba(45,212,191,0.35)]`).
- Ao passar o mouse sobre o passo, o círculo e a descrição ganham contraste imediato (`group-hover:text-primary transition-colors`).

### 2.3. Preservação Semântica
- Preservação intacta da lista ordenada acessível `<ol>`, dos 4 passos (`01` a `04`), identificadores de fase (`ENTENDIMENTO`, `DEFINIÇÃO`, `DESENVOLVIMENTO`, `EVOLUÇÃO`), títulos e descrições técnicas.

---

## 3. Escopo de Arquivos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-070-pipeline-animacao-fluxo-continuo.md` | Criar | Especificação da animação do pipeline |
| `tasks/TASK-070-pipeline-animacao-fluxo-continuo.md` | Criar | Tarefa e checklist de execução |
| `src/components/sections/HomeProcessPipeline.tsx` | Modificar | Implementação do feixe animado com Framer Motion |
| `src/components/sections/__tests__/HomeProcessPipeline.test.tsx` | Modificar | Testes unitários com renderização da animação |
| `reviews/QA-070.md` | Criar | Relatório de validação de QA |

---

## 4. Critérios de Aceitação

1. Linha do pipeline com trilho base contínuo e feixe animado dinâmico com Framer Motion (`via-brand`).
2. Feixe percorre da esquerda para a direita no desktop e de cima para baixo no mobile.
3. Desativação limpa da animação infinita sob `prefers-reduced-motion`.
4. Todos os 4 passos, textos e atributos semânticos preservados.
5. Quality Gates 100% aprovados.
