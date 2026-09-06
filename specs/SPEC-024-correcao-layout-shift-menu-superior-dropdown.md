# SPEC-024 — Correção do Layout Shift e Estufamento do Menu Superior ao Abrir Dropdown

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **Título**    | Correção de Layout Shift do Menu Superior ao Interagir com Dropdowns   |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX)  |
| **PO**        | Elessandro Prestes Macedo                                              |
| **Status**    | Aprovado                                                               |
| **Data**      | 2026-09-06                                                             |
| **Versão**    | 1.0                                                                    |

---

## 1. Contexto e Diagnóstico do Defeito

### 1.1 Sintoma Relatado
Ao clicar no campo de seleção **"Desafio ou Tipo de Projeto"** do formulário na seção de Contato (`#contato` / `Contact.tsx`), o menu superior (Header fixo contendo a navegação institucional) sofre um salto perceptível para o lado direito ("estourando para o lado direito"), retornando à posição original ao fechar o seletor.

### 1.2 Causa Raiz Técnica
1. **Comportamento Padrão do Radix UI Select**:
   - Ao abrir as opções do seletor, o componente `@radix-ui/react-select` invoca internamente o utilitário `react-remove-scroll` para bloquear a rolagem de fundo.
   - O `react-remove-scroll` adiciona o atributo `data-scroll-locked="1"` ao elemento `<body>` e injeta estilos dinâmicos:
     ```css
     body[data-scroll-locked] {
       overflow: hidden !important;
       margin-right: [gap]px !important;
     }
     ```
2. **Remoção da Barra de Rolagem Nativa**:
   - Em sistemas operacionais e navegadores com barra de rolagem não-overlay (Linux e Windows com largura típica de 15px a 17px), a aplicação de `overflow: hidden` oculta imediatamente a calha vertical da barra de rolagem.
3. **Deslocamento de Elementos Fixos e Containers**:
   - O elemento `<header>` possui posicionamento fixo (`fixed top-0 left-0 right-0 z-50`).
   - Ao perder a barra de rolagem, a largura utilizável da janela do navegador aumenta instantaneamente em ~16px.
   - O container centralizado `<div className="container px-6">` dentro do `<header>` recalcula seu alinhamento horizontal (`mx-auto`), deslocando o logotipo e os links de navegação cerca de 8px para a direita.
   - Esse fenômeno gera o efeito visual desagradável de estufamento e tremor ("layout jump / layout shift").

---

## 2. Requisitos da Solução

### 2.1 Requisitos Funcionais e Visuais
1. **Estabilidade Absoluta do Menu Superior (Zero Layout Shift)**:
   - Ao abrir e fechar o menu dropdown de tipo de projeto (ou qualquer outro dropdown), a posição horizontal `x` do cabeçalho, do logotipo e de cada link de navegação (`nav a`) deve ter variação exatamente zero (`diff = 0px`).
2. **Preservação da Barra de Rolagem**:
   - A barra de rolagem nativa da página não deve sumir nem piscar ao abrir dropdowns de seleção.
3. **Calha de Rolagem Estável (`scrollbar-gutter: stable`)**:
   - Aplicação da diretriz moderna de CSS para manter o espaço da barra de rolagem garantido em qualquer estado.
4. **Confinamento da Caixa de Opções**:
   - A caixa flutuante do dropdown deve manter-se 100% contida dentro da largura do trigger do campo (`w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]`), sem ultrapassar para o bloco escuro à direita.
5. **Acessibilidade e Interatividade Preservadas**:
   - Manter a navegação por teclado intacta (ArrowUp, ArrowDown, Enter, Escape).
   - Sem quebras no contraste ou no design system.

---

## 3. Plano de Implementação

1. **`src/index.css`**:
   - No bloco `html`: adicionar `scrollbar-gutter: stable;` para estabilização de viewport.
   - Adicionar regra de normalização de scroll lock:
     ```css
     body[data-scroll-locked] {
       overflow: visible !important;
       margin-right: 0px !important;
       padding-right: 0px !important;
     }
     ```
2. **`src/components/layout/Header.tsx`**:
   - Revisar alinhamento e estrutura do container para reforçar imunidade a redimensionamentos.
3. **Validação E2E (Playwright)**:
   - Adicionar teste formal na suíte E2E medindo a estabilidade de pixels do Header e dos links de navegação antes e depois da abertura do Select.
4. **Quality Gates**:
   - Testes unitários (Vitest) $\ge 90\%$.
   - Zero erros no ESLint.
   - Build de produção sem warnings de chunk size $> 600\text{ KB}$.
   - Suíte completa do Playwright passando com 100% de sucesso.
