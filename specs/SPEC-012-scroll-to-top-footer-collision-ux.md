# SPEC-012 — Correção de Oclusão do Botão Voltar ao Topo no Rodapé (UX/UI & Safe Area)

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-012                                   |
| **Data**      | 2026-09-06                                 |
| **Autor**     | Gemini/Antigravity                         |
| **PO**        | Elessandro Prestes Macedo                  |
| **Status**    | ✅ Aprovada                                |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

Conforme evidenciado na captura de tela enviada pelo Product Owner (`Captura de tela de 2026-09-06 10-46-31.png`), o botão flutuante **Voltar ao Topo** (`src/components/ui/ScrollToTop.tsx`), posicionado como `fixed bottom-6 right-6 md:bottom-8 md:right-8`, colide diretamente sobre as informações do rodapé quando o usuário rola até o final da página.

### Problemas Identificados:
1. **Oclusão do Copyright**: O botão repousa diretamente sobre a linha `@EPM DEVTECH 2026. Todos os direitos reservados.` no canto inferior direito do footer.
2. **Oclusão Amplificada pelo Tooltip**: O tooltip acoplado ao botão estava configurado com `side="left"`, projetando uma caixa de texto horizontal de ~120px ("VOLTAR AO TOPO") diretamente sobre os textos à esquerda do botão ao receber hover ou foco.
3. **Inconsistência de Tokens de Cores**: O arquivo `ScrollToTop.tsx` ainda continha referências hardcoded ao azul antigo (`hsla(218, 100%, 58%)` e `rgba(41, 121, 255)`), destoando do Design System Verde Esmeralda (`hsl(var(--primary))`) padronizado na SPEC-008.

---

## Objetivo

Implementar uma solução de UX/UI refinada e adaptativa para eliminar qualquer oclusão entre o botão flutuante "Voltar ao Topo" e as informações do rodapé:
1. **Evitação Dinâmica de Rodapé (*Smart Footer Docking / Elevation*)**: O botão detecta a visibilidade do footer via `IntersectionObserver` e eleva-se suavemente (`bottom-20 md:bottom-24`) ao entrar na área do rodapé, repousando harmoniosamente acima da barra inferior de copyright e redes sociais.
2. **Reorientação do Tooltip**: Alterar o tooltip para `side="top"`, abrindo verticalmente para cima no espaço vazio, sem cobrir qualquer texto horizontal.
3. **Safe Area no Rodapé**: Ajuste de padding/margem segura na linha de copyright em `src/components/sections/Footer.tsx`.
4. **Alinhamento ao Design System**: Substituição de cores hex/hsl legadas pelos tokens oficiais de CSS (`hsl(var(--primary))` e `hsl(var(--border))`).
5. **Cobertura de Testes**: Implementação de suíte de testes unitários para `ScrollToTop` e teste E2E no Playwright.

---

## Escopo

### IN
- `src/components/ui/ScrollToTop.tsx`: Elevação adaptativa via IntersectionObserver, tooltip `side="top"`, tokens do design system.
- `src/components/sections/Footer.tsx`: Safe area e margem de respiro no copyright.
- `src/components/ui/__tests__/ScrollToTop.test.tsx`: Testes unitários para renderização, clique, scroll e acessibilidade.
- `e2e/design-system-and-stability.spec.ts`: Teste E2E de validação da elevação do botão ao alcançar o rodapé sem oclusão de texto.
- `tasks/TASK-012-scroll-to-top-footer-collision-ux.md`: Registro da tarefa SDD.
- `reviews/QA-012.md`: Evidências de QA e validação dos quality gates.
- `PROJECT.md` e `CHANGELOG.md`: Atualização de estado canônico.

### OUT
- Não desativar o botão nem remover a funcionalidade de rolagem suave até o topo.
- Não alterar as colunas de navegação do Footer.

---

## Critérios de Aceitação

- [x] O botão "Voltar ao topo" não cobre o texto de copyright nem links do rodapé em nenhuma resolução.
- [x] Ao rolar até o rodapé, o botão translada suavemente para cima (elevação adaptativa).
- [x] O tooltip "Voltar ao topo" abre exclusivamente para cima (`side="top"`), sem sobrepor textos adjacentes.
- [x] O botão utiliza estritamente o verde esmeralda institucional (`hsl(var(--primary))`) para bordas, sombras e estados de hover.
- [x] 100% dos testes unitários (Vitest) passando com cobertura global ≥ 90%.
- [x] 100% dos testes E2E (Playwright) passando.
- [x] Zero erros no ESLint e build de produção sem warnings.

---

## Aprovação

| Campo              | Valor                     |
|--------------------|---------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-09-06                |
| **Status**         | ✅ Aprovada                |
