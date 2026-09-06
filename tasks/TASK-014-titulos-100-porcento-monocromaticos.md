# TASK-014 — Títulos 100% Monocromáticos e Tipografia Linear B2B

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-014                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluído                                                         |

---

## 1. Escopo de Arquivos Afetados

### Componentes de UI
- `src/components/ui/SectionHeader.tsx`: Ajustar dimensões de badge para `px-3 py-1 mb-4 rounded-full uppercase tracking-wider font-semibold text-xs` e garantir renderização monocromática pura de `title` e `subtitle`.
- `src/components/sections/Hero.tsx`: Ajustar badge para `px-3 py-1` e remover span colorido de `h1`, tornando-o 100% monocromático.
- `src/components/sections/Services.tsx`: Remover span colorido e passar `title="Soluções End-to-End"` para `SectionHeader`.
- `src/components/sections/Technologies.tsx`: Remover span colorido e passar `title="Tecnologias Modernas"` para `SectionHeader`.
- `src/components/sections/Differentials.tsx`: Remover span colorido e passar `title="Por Que Escolher a EPM DEVTECH"` para `SectionHeader`.
- `src/components/sections/Contact.tsx`: Remover span colorido e passar `title="Vamos Construir Juntos"` para `SectionHeader`.
- `src/components/sections/About.tsx`: Remover span colorido e passar `title="Engenharia de Software com Excelência Técnica"` para `SectionHeader`.
- `src/components/sections/Authority.tsx`: Remover span colorido e passar `title="Autoridade Técnica que Gera Resultados"` para `SectionHeader`.

### Testes
- `src/components/ui/__tests__/SectionHeader.test.tsx`: Atualizar testes para validar títulos puramente monocromáticos e sem elementos filhos coloridos.
- `src/components/sections/__tests__/Hero.test.tsx`: Validar título H1 completo como texto puro sem span colorido.
- `e2e/design-system-and-stability.spec.ts`: Adicionar asserção automatizada garantindo que nenhum `h1`, `h2` ou `h3` contenha classes de cor verde (`text-emerald-*`, `text-green-*`, `text-teal-*`, `text-primary`) ou gradientes.

### Documentação e Registros SDD
- `reviews/QA-014.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Ajustar `SectionHeader.tsx` para o padrão exato de badge (`px-3 py-1 text-xs`) e tipografia monocromática
- [x] Atualizar `Hero.tsx` removendo `span` verde do `h1`
- [x] Atualizar `Services.tsx` removendo `span` verde do título
- [x] Atualizar `Technologies.tsx` removendo `span` verde do título
- [x] Atualizar `Differentials.tsx` removendo `span` verde do título
- [x] Atualizar `Contact.tsx` removendo `span` verde do título
- [x] Atualizar `About.tsx` removendo `span` verde do título
- [x] Atualizar `Authority.tsx` removendo `span` verde do título
- [x] Atualizar suítes de testes unitários e testes E2E
- [x] Validar todos os Quality Gates (Vitest cobertura >= 90%, ESLint 0 erros, Build sem warnings, Playwright 8/8)
- [x] Gerar QA-014, atualizar PROJECT.md e CHANGELOG.md
- [x] Efetuar commits semânticos no git
