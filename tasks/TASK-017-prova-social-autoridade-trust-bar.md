# TASK-017 — Substituição da Seção de Credenciais por Trust Bar de Prova Social e Autoridade Técnica

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-017                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluído                                                         |

---

## 1. Escopo de Arquivos Afetados

### Componentes de UI
- `src/components/sections/Authority.tsx`:
  - Substituir os 5 cards verticais pesados pelo layout horizontal compacto de Trust Bar / Social Proof Strip.
  - Implementar cabeçalho com badge "Prova Social & Autoridade" e título H2 monocromático "Autoridade técnica e impacto em missão crítica".
  - Implementar Bloco 1 com 4 métricas reais de missão crítica (99,9% uptime, 2.500+ RPS, +448 IES e 650 Escolas, Zero Perda).
  - Implementar Bloco 2 com faixa de marcas, órgãos e setores estratégicos com selos tipográficos elegantes e microinteração de hover.
  - Manter o ID `#autoridade` para compatibilidade total de ancoragem, scroll spy e lazy loading.

### Testes
- `src/components/sections/__tests__/Authority.test.tsx`:
  - Atualizar asserções para o novo título, métricas quantitativas, legendas e selos institucionais.
- `e2e/design-system-and-stability.spec.ts`:
  - Atualizar o heading esperado da seção `#autoridade` para "Autoridade técnica e impacto em missão crítica".

### Documentação SDD
- `reviews/QA-017.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Implementar novo componente Trust Bar em `src/components/sections/Authority.tsx`
- [x] Atualizar testes unitários em `src/components/sections/__tests__/Authority.test.tsx`
- [x] Atualizar asserção E2E em `e2e/design-system-and-stability.spec.ts`
- [x] Executar Quality Gates: `npm run lint`, `npm run test:coverage`, `npm run build`, `npx playwright test`
- [x] Preencher relatório de QA em `reviews/QA-017.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git
