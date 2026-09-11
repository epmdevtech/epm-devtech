# TASK-041 — ScrollToTop: Substituição de Ícone por ChevronUp, Remoção de Glow/Sombra e Visibilidade Condicionada (> 450px)

| Campo              | Valor                                                                               |
|--------------------|-------------------------------------------------------------------------------------|
| **ID**             | TASK-041                                                                            |
| **SPEC**           | SPEC-041                                                                            |
| **Data de início** | 2026-09-10                                                                          |
| **Agente**         | Gemini/Antigravity                                                                  |
| **Status**         | ✅ Concluída                                                                        |

---

## Escopo da Tarefa

1. **Atualização do Componente (`src/components/ui/ScrollToTop.tsx`)**:
   - Trocar ícone `Rocket` por `ChevronUp` (de `lucide-react`) mantendo `size={20}`.
   - Eliminar a tag `<style>` com `@keyframes scroll-top-pulse`, a classe `.scroll-top-glow` e o `<motion.div>` de halo luminoso/blur/sombra.
   - Remover sombras (`shadow-lg`, `hover:shadow-...`) e efeitos de blur (`backdrop-blur-...`).
   - Aplicar fundo e borda usando classes de tema adaptativas aos modos light, dark e system:
     - Fundo: `bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800`.
     - Borda: `border border-emerald-500` (1px sólida na cor da marca #10B981, sem cores hexadecimais fixas no código, em ambos os temas).
     - Ícone: `text-emerald-600 dark:text-emerald-400` com alto contraste WCAG AA/AAA.
   - Atualizar condição de scroll para `window.scrollY > 450`.
   - Implementar visibilidade condicionada com fade suave (300ms ease) iniciando oculto (`opacity: 0; pointer-events: none; invisible`) e aparecendo com fade-in suave (`opacity: 1; pointer-events: auto; visible`).
   - Preservar função de clique (`window.scrollTo({ top: 0, behavior: 'smooth' })`), posição fixa, z-index (50), elevação adaptativa ao rodapé (`data-elevated`) e `aria-label="Voltar ao topo"`.
2. **Atualização dos Testes Unitários (`src/components/ui/__tests__/ScrollToTop.test.tsx`)**:
   - Atualizar limiar de scroll de 400px para 450px.
   - Validar renderização do novo layout.
3. **Quality Gates & Evidências**:
   - Vitest com coverage ≥ 90%.
   - ESLint com 0 erros.
   - Build de produção sem warnings.
   - Playwright com 10/10 testes passando.
   - Criar `reviews/QA-041.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Criados / Modificados

- `specs/SPEC-041-scroll-to-top-chevron-sem-glow.md` (Criado / Aprovado)
- `tasks/TASK-041-scroll-to-top-chevron-sem-glow.md` (Criado)
- `src/components/ui/ScrollToTop.tsx` (A modificar)
- `src/components/ui/__tests__/ScrollToTop.test.tsx` (A modificar)
- `reviews/QA-041.md` (A criar)
- `PROJECT.md` (A modificar)
- `CHANGELOG.md` (A modificar)
