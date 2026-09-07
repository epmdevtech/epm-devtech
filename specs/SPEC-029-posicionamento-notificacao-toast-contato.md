# SPEC-029 — Posicionamento de Notificações Toast e Feedback de Envio de Contato

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **Título**    | Posicionamento de Notificações Toast e Feedback de Envio de Contato    |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX)  |
| **PO**        | Elessandro Prestes Macedo                                              |
| **Status**    | ✅ Aprovada (PO Elessandro Prestes Macedo)             |
| **Data**      | 2026-09-07                                                             |
| **Versão**    | 1.0                                                                    |

---

## 1. Contexto & Defeito Identificado

### 1.1 Evidência Visual
- Captura de tela: [`Captura de tela de 2026-09-07 19-15-24.png`](file:///home/elessandro/Imagens/Capturas%20de%20tela/Captura%20de%20tela%20de%202026-09-07%2019-15-24.png)

### 1.2 Descrição do Problema
1. **Posicionamento Inadequado da Mensagem de Sucesso (Rodapé / Canto Inferior)**:
   - Ao submeter o formulário de contato com sucesso, o toast de confirmação (*"Mensagem enviada! Retornarei em breve."*) surge na posição default do Sonner (`bottom-right`).
   - O toast aparece sobre o Rodapé (Footer) e imediatamente ao lado do botão flutuante de *Voltar ao Topo* (ScrollToTop), gerando poluição visual e uma sensação de desconexão em relação ao formulário preenchido.
2. **Ausência de Feedback Imediato no Ponto Focal da Ação**:
   - O botão "Enviar Mensagem" retorna imediatamente ao estado inicial após o disparo, exigindo que o usuário desvie o olhar para o canto inferior direito da tela para ter certeza de que o formulário foi processado.
3. **Experiência Mobile**:
   - Em telas móveis, notificações na base da tela podem sofrer sobreposição com a barra de navegação/endereço do navegador mobile ou o botão de retorno ao topo.

---

## 2. Solução Proposta & Boas Práticas de UX/UI

### 2.1 Reconfiguração do Posicionamento do Toaster (`src/components/ui/sonner.tsx`)
- Definir `position="top-center"` como padrão do componente `Toaster` do Sonner.
- Configurar compensação de offset superior:
  - `offset={{ top: "84px" }}` no desktop (evita sobreposição com o Header fixo de ~60-80px).
  - `mobileOffset={{ top: "76px", left: "16px", right: "16px" }}` no mobile (seguro, abaixo do header e centralizado).
- Adicionar `closeButton` para permitir dispensa rápida pelo usuário.

### 2.2 Microinteração de Sucesso no Botão de Envio (`src/components/sections/Contact.tsx`)
- Adicionar estado transitório de sucesso (`isSuccess` temporário por 4 segundos) no formulário:
  - Ao enviar com sucesso:
    - O botão transiciona suavemente para o estado confirmado com ícone `Check` (Lucide) e texto *"Mensagem Enviada!"*, com estilo `bg-emerald-600` e desabilitado temporariamente.
    - O formulário é limpo via `reset()`.
    - O toast no topo (`top-center`) confirma institucionalmente o envio e tempo de retorno.
    - Após 4 segundos, o botão retorna ao estado padrão *"Enviar Mensagem"*.

---

## 3. Critérios de Aceite (Quality Gates)

- [ ] O componente `Toaster` em `sonner.tsx` posiciona as notificações em `top-center` com offset seguro abaixo do Header fixo em desktop e mobile.
- [ ] O toast nunca mais aparece sobreposto ao rodapé ou ao botão de *ScrollToTop*.
- [ ] Ao enviar o formulário, o botão exibe confirmação visual imediata (*"Mensagem Enviada!"* com ícone `Check`) antes de retornar ao estado original.
- [ ] `npm run lint` executa com 0 erros.
- [ ] `npm run test:coverage` passa com 100% dos testes e cobertura ≥ 90%.
- [ ] `npm run build` executa sem advertências de chunk.
- [ ] `npx playwright test` passa com 9/9 testes E2E.
- [ ] Atualização dos documentos SDD (`TASK-029`, `QA-029`, `CHANGELOG.md`, `PROJECT.md`).

---

## 4. Aprovação

- [ ] Aprovado pelo PO (Elessandro Prestes Macedo)
