# QA-XXX — Evidências de QA

| Campo            | Valor                          |
|------------------|-------------------------------|
| **ID**           | QA-XXX                        |
| **TASK**         | TASK-XXX                      |
| **Data**         | YYYY-MM-DD                    |
| **Agente**       | Gemini/Antigravity            |
| **Status**       | Aprovado / Reprovado          |

---

## Resultado dos Testes Unitários

| Métrica           | Resultado |
|-------------------|-----------|
| Testes totais     | XX        |
| Passando          | XX        |
| Falhando          | 0         |
| Cobertura geral   | XX%       |
| Cobertura (alvo)  | XX%       |

```
# Output do npm run test:coverage
```

---

## Resultado do Build

| Chunk             | Tamanho  | Status   |
|-------------------|----------|----------|
| `framer-motion`   | XXX KB   | ✅ OK     |
| `react`           | XXX KB   | ✅ OK     |
| `router`          | XXX KB   | ✅ OK     |
| `radix`           | XXX KB   | ✅ OK     |
| `index`           | XXX KB   | ✅ OK     |

```
# Output do npm run build
```

---

## Checklist de Testes Manuais

### Responsividade
- [ ] Mobile (320px): layout correto, sem overflow horizontal
- [ ] Mobile (375px): layout correto
- [ ] Tablet (768px): layout correto
- [ ] Desktop (1024px+): layout correto

### Temas
- [ ] Dark mode: visual consistente
- [ ] Light mode: visual consistente
- [ ] Troca de tema: transição suave

### Acessibilidade
- [ ] Navegação por teclado: Tab, Shift+Tab, Enter
- [ ] Skip link funcional
- [ ] Foco visível em elementos interativos

### Funcionalidade
- [ ] Links de navegação funcionando
- [ ] Scroll spy atualizando URL corretamente
- [ ] Formulário de contato: validação e envio
- [ ] Cookie banner: aceitar/recusar

---

## Resultado Lighthouse

| Métrica           | Score    | Meta  |
|-------------------|----------|-------|
| Performance       | XX       | ≥ 90  |
| Acessibilidade    | XX       | ≥ 90  |
| SEO               | XX       | ≥ 90  |
| Best Practices    | XX       | ≥ 90  |

---

## Bloqueadores

> Se status = Reprovado, listar aqui os bloqueadores antes de aprovar:

- [ ] [Bloqueador 1]

---

## Status Final

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Decisão**        | ✅ Aprovado / ❌ Reprovado |
| **Data**           |                          |
