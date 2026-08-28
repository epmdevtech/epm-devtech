# REVIEW-XXX — [Título do Review]

| Campo          | Valor                                              |
|----------------|----------------------------------------------------|
| **ID**         | REVIEW-XXX                                         |
| **Referência** | TASK-XXX / SPEC-XXX                                |
| **Tipo**       | Code Review / Design Review / QA Review            |
| **Data**       | YYYY-MM-DD                                         |
| **Revisor**    | Elessandro Prestes Macedo                          |
| **Status**     | Aprovado / Aprovado com ressalvas / Reprovado      |

---

## Checklist de Code Review

- [ ] TypeScript: sem erros, sem `any` desnecessário
- [ ] ESLint: zero erros ou warnings
- [ ] Nomenclatura: PascalCase para componentes, camelCase para funções
- [ ] Imports: usando alias `@/`, ordem correta
- [ ] Props: tipadas com interfaces TypeScript
- [ ] Sem código comentado ou dead code
- [ ] Performance: sem re-renders desnecessários
- [ ] Testes: cobertura ≥ 90%, testes significativos

---

## Checklist de Design Review

- [ ] Mobile First: comportamento correto em 320px, 768px, 1024px+
- [ ] Dark mode: consistente com o design system
- [ ] Light mode: consistente com o design system
- [ ] Animações: `useReducedMotion` respeitado
- [ ] Consistência visual: cores, tipografia, espaçamento dentro do design system
- [ ] Componentes: usa shadcn/ui quando disponível

---

## Checklist de Acessibilidade

- [ ] ARIA labels presentes nos elementos interativos
- [ ] Navegação por teclado funcional
- [ ] Foco visível em todos os elementos interativos
- [ ] Contraste adequado (4.5:1 para texto normal)
- [ ] Semântica HTML correta
- [ ] Skip link funcional (se aplicável)

---

## Pontos de Atenção

| # | Arquivo/Linha | Descrição | Severidade |
|---|---------------|-----------|------------|
| 1 | — | — | Crítico / Maior / Menor / Sugestão |

---

## Ações Requeridas

- [ ] [Ação 1 — responsável — prazo]
- [ ] [Ação 2 — responsável — prazo]

---

## Decisão Final

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Decisão**        | ✅ Aprovado / ❌ Reprovado / ⚠️ Aprovado com ressalvas |
| **Aprovado por**   |                          |
| **Data**           |                          |
| **Observações**    |                          |
