# TASK-012 — Correção de Oclusão do Botão Voltar ao Topo no Rodapé

| Campo              | Valor                                      |
|--------------------|--------------------------------------------|
| **ID**             | TASK-012                                   |
| **SPEC**           | SPEC-012                                   |
| **Data de início** | 2026-09-06                                 |
| **Agente**         | Gemini/Antigravity                         |
| **Status**         | ✅ Concluída                               |

---

## Escopo da Tarefa

1. **Refatoração do `ScrollToTop.tsx` (`src/components/ui/ScrollToTop.tsx`)**:
   - Implementar detecção de visibilidade do rodapé via `IntersectionObserver`.
   - Aplicar elevação suave (`bottom-20 md:bottom-24`) quando o footer estiver visível.
   - Ajustar tooltip de `side="left"` para `side="top"`.
   - Atualizar tokens de cores para o verde oficial da EPM DEVTECH (`hsl(var(--primary))`).
2. **Ajuste de Safe Area no Rodapé (`src/components/sections/Footer.tsx`)**:
   - Adicionar margem de segurança/respiro no copyright para prevenir colisões sob qualquer circunstância.
3. **Criação de Testes Unitários (`src/components/ui/__tests__/ScrollToTop.test.tsx`)**:
   - Testar visibilidade ao rolar > 400px.
   - Testar clique chamando `window.scrollTo`.
   - Testar acessibilidade e tooltip.
4. **Atualização dos Testes E2E (`e2e/design-system-and-stability.spec.ts`)**:
   - Adicionar teste Playwright validando a elevação do botão e ausência de colisão com o copyright.
5. **Quality Gates & Evidências**:
   - Vitest com 100% de aprovação e cobertura ≥ 90%.
   - Playwright com 100% de testes passando.
   - ESLint com 0 erros.
   - Build de produção limpo.
   - Registrar `reviews/QA-012.md`, atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Criados / Modificados

- `specs/SPEC-012-scroll-to-top-footer-collision-ux.md` (Criado)
- `tasks/TASK-012-scroll-to-top-footer-collision-ux.md` (Criado)
- `src/components/ui/ScrollToTop.tsx` (Modificado)
- `src/components/sections/Footer.tsx` (Modificado)
- `src/components/ui/__tests__/ScrollToTop.test.tsx` (Criado)
- `e2e/design-system-and-stability.spec.ts` (Modificado)
- `reviews/QA-012.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
