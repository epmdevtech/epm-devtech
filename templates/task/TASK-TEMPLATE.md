# TASK-XXX — [Título da Task]

| Campo              | Valor                    |
|--------------------|--------------------------|
| **ID**             | TASK-XXX                 |
| **SPEC**           | SPEC-XXX                 |
| **Data de início** | YYYY-MM-DD               |
| **Agente**         | Gemini/Antigravity       |
| **Status**         | Aberta / Em progresso / Concluída / Bloqueada |

---

## Escopo da Implementação

> Baseado na SPEC-XXX aprovada, esta TASK implementa:

- Item 1
- Item 2

---

## Arquivos a Criar

| Arquivo                                    | Descrição                |
|--------------------------------------------|--------------------------|
| `src/components/sections/Novo.tsx`         | Novo componente de seção |
| `src/components/sections/__tests__/Novo.test.tsx` | Testes do componente |

---

## Arquivos a Modificar

| Arquivo                    | Mudança                              |
|----------------------------|--------------------------------------|
| `src/pages/Index.tsx`      | Adicionar novo componente             |
| `PROJECT.md`               | Atualizar estado atual                |
| `CHANGELOG.md`             | Registrar mudança                     |

---

## Checklist de Implementação

- [ ] Componente criado com TypeScript estrito
- [ ] Mobile First aplicado (breakpoints: sm, md, lg)
- [ ] Dark/Light mode funcionando
- [ ] Animações Framer Motion com `useReducedMotion`
- [ ] ARIA labels e semântica HTML correta
- [ ] Imports usando alias `@/`
- [ ] Zero erros TypeScript
- [ ] Zero erros ESLint

---

## Checklist de Testes

- [ ] Testes unitários criados em `__tests__/`
- [ ] `npm run test` passando
- [ ] Cobertura ≥ 90% nos arquivos afetados
- [ ] Teste manual: mobile, tablet, desktop
- [ ] Teste manual: dark mode e light mode
- [ ] Teste manual: navegação por teclado

---

## Evidências de Conclusão

### Resultado dos Testes
```
# Cole o output do npm run test:coverage aqui
```

### Resultado do Build
```
# Cole o output do npm run build aqui
```

---

## Notas do Agente

> Registrar aqui decisões tomadas durante a implementação, bloqueios encontrados,
> divergências da SPEC e como foram resolvidas (sempre com aprovação do PO).
