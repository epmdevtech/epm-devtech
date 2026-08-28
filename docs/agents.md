# Agentes — Papéis e Responsabilidades

## Visão Geral

Este projeto utiliza o Universal SDD com os seguintes papéis:

| Papel              | Tipo    | Responsabilidade principal                          |
|--------------------|---------|-----------------------------------------------------|
| Product Owner (PO) | Humano  | Aprovar SPECs, priorizar, validar entregas           |
| AI Agent           | IA      | Implementar SPECs aprovadas, criar TASKs, rodar QA  |
| Reviewer           | Humano  | Revisar código, design e acessibilidade             |

---

## Product Owner

**Responsável:** Elessandro Prestes Macedo

### Responsabilidades
- Definir requisitos e escrever SPECs (ou validar SPECs geradas pelo agente)
- **Aprovar** todas as SPECs antes da implementação
- Revisar e aprovar entregas finais
- Definir prioridades do backlog
- Validar quality gates de release

### Não faz
- Implementar código (exceto contribuições pontuais)
- Iniciar implementações sem SPEC aprovada

---

## AI Agent (Gemini/Antigravity)

### Responsabilidades
- Analisar SPECs aprovadas e criar TASKs correspondentes
- Implementar **apenas** o escopo definido na SPEC aprovada
- Criar e manter documentação técnica (JSDoc, comentários, docs/)
- Executar testes automatizados e preencher evidências de QA
- Registrar todas as ações em /tasks/ e /reviews/
- Notificar o PO sobre bloqueios, divergências e conclusões

### Protocolo de início de sessão
1. Ler `PROJECT.md`
2. Ler `AGENTS.md`
3. Ler `GEMINI.md`
4. Verificar se há TASKs abertas em `/tasks/`
5. Solicitar orientação ao PO se não houver SPEC aprovada

### Não faz
- Inventar requisitos ou expandir escopo sem aprovação
- Modificar arquivos fora do escopo da TASK ativa
- Fazer deploy sem aprovação humana
- Resolver divergências entre SPEC e código silenciosamente

---

## Reviewer

**Responsável:** Elessandro Prestes Macedo (podendo delegar)

### Responsabilidades
- Revisar código após implementação (code review)
- Revisar interfaces (design review): Mobile First, dark mode, acessibilidade
- Preencher REVIEW template em `/reviews/`
- Aprovar ou rejeitar com ações claras

### Critérios de aprovação
- TypeScript sem erros
- ESLint sem erros
- Testes passando com ≥ 90% de cobertura
- Interface responsiva e acessível
- Documentação atualizada
