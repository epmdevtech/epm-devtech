# SPEC-071 — Limpeza Estrutural da Home e Padronização de CTAs (Header e Hero)

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Motivação

1. **Remoção de CTA Intermediário Redundante na Home**:
   - A página inicial (`src/pages/Home.tsx`) contém atualmente uma seção intermediária de chamada ("Vamos entender o cenário da sua empresa?" / "Compartilhe seu desafio operacional...") logo abaixo da seção de Experiência Prática / Resultados (`#autoridade`).
   - Essa seção repete o fechamento comercial e sobrecarrega a rolagem antes do rodapé. A transição após a seção de Resultados (`HomeResultsStrip.tsx`) deve conduzir diretamente ao Footer de forma limpa e fluida.
2. **Diferenciação e Padronização dos Botões CTA**:
   - Atualmente, múltiplos botões repetem o mesmo texto ("Falar sobre meu projeto"), gerando ambiguidade na intenção de clique.
   - **Header / Navbar**: O botão do menu superior deve ser conciso e direto: `"Fale conosco"`.
   - **Hero**: O botão primário da dobra inicial deve convidar ao diálogo com foco consultivo: `"Vamos conversar"` (apontando para `/contato`). O botão secundário `"Ver soluções"` é mantido.

---

## 2. Decisões de Design e UX

### 2.1. Remoção da Seção Intermediária de Contato em `Home.tsx`
- Remover completamente a seção `<section id="contato" ...>` em `src/pages/Home.tsx`.
- Descartar os elementos associados que se tornam órfãos na Home (`Clock` import, texto "Resposta em até 24h úteis", link para "/duvidas-frequentes").
  * Observação: O tempo de resposta ("Resposta em até 24h úteis") já é formalmente declarado na página canônica de contato (`/contato`), e o link para dúvidas frequentes está permanentemente no menu e no Footer.
- A Home encerra harmoniosamente após a seção de Experiência Prática / Resultados, fazendo a transição direta para o Footer global persistente.

### 2.2. Atualização dos Textos de CTA
1. **`src/components/layout/Header.tsx`**:
   - Desktop CTA: Alterar de `"Falar sobre meu projeto"` para `"Fale conosco"`.
   - Mobile Drawer CTA: Alterar de `"Falar sobre meu projeto"` para `"Fale conosco"`.
   - `aria-label`: `"Fale conosco"`.
2. **`src/components/sections/Hero.tsx`**:
   - Botão Primário: Alterar de `"Falar sobre meu projeto"` para `"Vamos conversar"`.
   - `aria-label`: `"Vamos conversar sobre seu projeto"`.
   - Botão Secundário: Preservar `"Ver soluções"` direcionando para `#servicos`.

---

## 3. Escopo de Arquivos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-071-limpeza-cta-home-padronizacao-botoes.md` | Criar | Especificação da limpeza e CTAs |
| `tasks/TASK-071-limpeza-cta-home-padronizacao-botoes.md` | Criar | Tarefa e checklist de execução |
| `src/pages/Home.tsx` | Modificar | Remoção da seção intermediária redundante de CTA |
| `src/components/layout/Header.tsx` | Modificar | Atualização do botão para "Fale conosco" |
| `src/components/sections/Hero.tsx` | Modificar | Atualização do botão primário para "Vamos conversar" |
| `src/components/layout/__tests__/Header.test.tsx` | Modificar | Atualização da asserção do botão do Header |
| `src/components/sections/__tests__/Hero.test.tsx` | Modificar | Atualização da asserção do botão do Hero |
| `e2e/multi-route-navigation.spec.ts` | Modificar | Atualização da asserção do CTA do Header |
| `e2e/design-system-and-stability.spec.ts` | Modificar | Atualização da asserção do CTA do Hero |
| `reviews/QA-071.md` | Criar | Relatório de validação de QA |

---

## 4. Critérios de Aceitação

1. Seção intermediária de CTA em `Home.tsx` removida sem quebra de layout ou espaçamento órfão.
2. Botão no Header (desktop e mobile) renderiza `"Fale conosco"`.
3. Botão primário no Hero renderiza `"Vamos conversar"`.
4. Botão secundário no Hero permanece `"Ver soluções"`.
5. 100% dos testes unitários e E2E Playwright atualizados e aprovados.
