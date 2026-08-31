# TASK-005 — Implementação de Otimizações para PageSpeed Insights 100

| Campo              | Valor                       |
|--------------------|-----------------------------|
| **ID**             | TASK-005                    |
| **SPEC**           | SPEC-005                    |
| **Data de início** | 2026-08-31                  |
| **Agente**         | Gemini/Antigravity          |
| **Status**         | ✅ Concluída              |

---

## Escopo da Implementação

1. `src/components/sections/Hero.tsx`: Substituir `framer-motion` por CSS classes (`animate-in`, `fade-in`, `slide-in-from-bottom`). Adicionar listener de scroll com requestAnimationFrame se necessário.
2. `src/components/layout/Header.tsx`: Remover `framer-motion`. Adicionar `srcSet` no logo.
3. `src/App.tsx` e `src/pages/Index.tsx`: Atrasar renderização dos componentes dentro de `Suspense` usando um efeito/estado de idle para evitar TBT e carregamento ansioso.

## Checklist de Testes

- [ ] Testes unitários executados com 100% de sucesso (`npm run test`)
- [ ] Build de produção executado com sucesso sem avisos no main chunk.
