# TASK-033 — Inclusão Explícita da Meta Tag `theme-color` no `index.html`

| Campo        | Valor                                        |
|--------------|----------------------------------------------|
| **SPEC**     | SPEC-033-theme-color-meta-tag.md             |
| **Status**   | ✅ Concluída                              |
| **Início**   | 2026-09-08                                   |
| **Executor** | Gemini/Antigravity                           |

---

## Arquivos a modificar

| Arquivo      | Operação | Descrição                            |
|--------------|----------|--------------------------------------|
| `index.html` | Editar   | Adicionar 4 meta tags no `<head>`    |

---

## Checklist de Implementação

- [x] SPEC-033 aprovada
- [ ] Adicionar `<meta name="theme-color">` (dark + light) no `index.html`
- [ ] Adicionar `<meta name="apple-mobile-web-app-capable">` no `index.html`
- [ ] Adicionar `<meta name="apple-mobile-web-app-status-bar-style">` no `index.html`
- [ ] `npm run build` — sem erros
- [ ] `npm run lint` — zero erros
- [ ] `npm run test:coverage` — sem regressões
- [ ] QA-033 preenchido
- [ ] PROJECT.md atualizado
- [ ] CHANGELOG.md atualizado

