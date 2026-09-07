# SPEC-026 — Correção Definitiva do Layout Shift no Header ao Abrir Dropdown (Regressão)

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **Título**    | Correção Definitiva do Layout Shift no Header ao Abrir Dropdown        |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX)  |
| **PO**        | Elessandro Prestes Macedo                                              |
| **Status**    | ✅ Aprovada (urgente — regressão confirmada em produção)               |
| **Data**      | 2026-09-07                                                             |
| **Versão**    | 1.0                                                                    |

---

## 1. Contexto & Defeito Relatado

### 1.1 Evidência Visual
- Captura de tela: `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-09-07 10-40-09.png`

### 1.2 Descrição do Cenário
Ao abrir o dropdown "Desafio ou Tipo de Projeto" na seção Contato, o Menu Superior (Header fixo) sofre um salto/estufamento para a direita, empurrando os itens de navegação e o logo da tela.

### 1.3 Causa Raiz Confirmada (Investigação Profunda)

A correção anterior (SPEC-024) aplicou `body[data-scroll-locked] { overflow: visible !important; margin-right: 0 !important; }` no `index.css` estático. Porém, a biblioteca `react-remove-scroll-bar` (usada internamente pelo `@radix-ui/react-select`) injeta estilos dinamicamente via `styleSingleton` **após** o carregamento do CSS estático:

```js
// react-remove-scroll-bar/dist/es2015/component.js
body[data-scroll-locked] {
  overflow: hidden !important;
  margin-right: GAP_PX !important;  // ← sobrescreve nossa regra CSS estática
}
```

Como ambas as regras usam `!important` com **mesma especificidade**, a **ordem de aparição** no DOM decide o vencedor. O estilo dinâmico injetado via `<style>` tag no `<head>` (após o carregamento) sempre vence o CSS estático.

A regra `overflow: visible !important` do `index.css` é **neutralizada** pelo `overflow: hidden !important` da biblioteca.

### 1.4 Solução Definitiva

**Estratégia:** Usar a variável CSS `--removed-body-scroll-bar-size` que a própria `react-remove-scroll-bar` expõe, para compensar no header. Esta variável CSS é injetada pela biblioteca com o tamanho exato da scrollbar, e pode ser usada para "contra-compensar" o `margin-right` no Header via CSS.

**Regra no header:**
```css
header[class*="fixed"] {
  /* Compensação automática via CSS var da biblioteca */
  margin-right: var(--removed-body-scroll-bar-size, 0px);
}
```

Dessa forma:
- Quando o dropdown abre → `--removed-body-scroll-bar-size` vale ~15px → header recebe `margin-right: 15px` → compensa o `margin-right: 15px` do body → resultado: header estável
- Quando o dropdown fecha → variável some ou vai a 0px → header volta ao normal

**Alternativa preferida (sem CSS var):** Adicionar `overflow: hidden` ao `html` (não ao `body`) enquanto o body recebe `margin-right`. Como o header usa `left: 0; right: 0` no contexto do `html`, compensar o `html` ao invés do body é mais robusto.

**Solução definitiva escolhida:** Aumentar a especificidade da regra no `index.css` usando `html body[data-scroll-locked]` para vencer o seletor simples `body[data-scroll-locked]` injetado dinamicamente, e manter `!important` redundante. Como a especificidade de `html body` (0,0,2) > `body` (0,0,1), nossa regra vencerá **independentemente da ordem**.

---

## 2. Escopo

1. **`src/index.css`**: Atualizar seletor `body[data-scroll-locked]` → `html body[data-scroll-locked]` (maior especificidade)
2. **`src/index.css`**: Adicionar regra de compensação no `header` usando `--removed-body-scroll-bar-size`
3. **Quality Gates**: lint, test:coverage, build, playwright
4. **Documentação SDD**: TASK-026, QA-026, CHANGELOG, PROJECT.md
