# TASK-020 — Refatoração do Rodapé (Footer): Layout Moderno, Monocromático e 4 Colunas

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **SPEC**      | SPEC-020                                                              |
| **Data**      | 2026-09-06                                                            |
| **Executor**  | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Status**    | ✅ Concluído                                                          |

---

## 1. Escopo de Arquivos Afetados

### Componentes de UI
- `src/components/sections/Footer.tsx`:
  - Refatorar layout para grid de 4 colunas responsivo (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
  - Coluna 1: Logo adaptativo, texto de posicionamento, localização (Toledo, Paraná) e redes sociais (GitHub e LinkedIn).
  - Coluna 2: Título "SOLUÇÕES" e os 5 links reais de serviços.
  - Coluna 3: Título "NAVEGAÇÃO" e os 5 links âncora do menu.
  - Coluna 4: Título "CONTATO" e os 3 canais rápidos (e-mail direto, WhatsApp e SLA de retorno).
  - Sub-footer: Divisor de 1px com copyright no lado esquerdo, ThemeSwitcher integrado e "Código limpo, arquitetura sólida e alta disponibilidade." no lado direito.

### Testes
- `src/components/sections/__tests__/Footer.test.tsx`:
  - Atualizar asserções para cobrir as 4 colunas, os novos links e textos, mantendo cobertura total das funcionalidades do ThemeSwitcher.
- `e2e/design-system-and-stability.spec.ts`:
  - Atualizar regex de tolerância cromática do botão principal do Hero para compatibilidade precisa com hsl(158 64% 42%).

### Documentação SDD
- `reviews/QA-020.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Implementação

- [x] Implementar novo layout do Footer em `src/components/sections/Footer.tsx`
- [x] Atualizar suíte de testes unitários em `src/components/sections/__tests__/Footer.test.tsx`
- [x] Validar testes unitários e cobertura: `npm run test:coverage` (100% de cobertura no Footer, 98.22% global)
- [x] Validar linting: `npm run lint` (0 erros)
- [x] Validar compilação de produção: `npm run build` (sem warnings > 600KB)
- [x] Validar testes ponta a ponta: `npx playwright test` (8/8 aprovados)
- [x] Gerar relatório de QA em `reviews/QA-020.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commits semânticos no git
