# AGENTS.md — Protocolo Comum

> Protocolo aplicável a **todos os agentes de IA e colaboradores humanos** deste projeto.
> Baseado no Universal SDD (Spec-Driven Development).

---

## Princípios Fundamentais

1. A **SPEC aprovada** define o comportamento desejado de cada mudança
2. O **PROJECT.md** registra o estado canônico do projeto
3. **Código e evidências de QA** comprovam o comportamento entregue
4. Toda implementação começa por uma SPEC
5. Interfaces exigem discovery e design aprovados antes da implementação
6. Toda SPEC requer **aprovação humana explícita**
7. A IA implementa apenas o **escopo aprovado**
8. Toda implementação deve passar pelos **quality gates** aplicáveis
9. Mudanças de interface exigem revisão de design e acessibilidade
10. Mudanças arquiteturais geram ADRs em `/adr/`
11. A documentação evolui junto com o código

---

## Papéis

| Papel              | Quem                        | Responsabilidade                                |
|--------------------|-----------------------------|-------------------------------------------------|
| Product Owner (PO) | Elessandro Prestes Macedo   | Aprovar SPECs, priorizar, validar entregas      |
| AI Agent           | Gemini/Antigravity          | Implementar SPECs aprovadas, QA, docs           |
| Reviewer           | Elessandro Prestes Macedo   | Code review, design review                      |

---

## Fluxo Obrigatório

```
SPEC (draft) → Aprovação PO → TASK criada → Implementação → QA → Review → Docs → Release
```

**Toda etapa é obrigatória.** Nenhuma pode ser pulada.

---

## Convenções de Nomenclatura

| Artefato | Padrão               | Exemplo                          |
|----------|----------------------|----------------------------------|
| SPEC     | `SPEC-NNN-titulo.md` | `SPEC-001-nova-secao-cases.md`   |
| TASK     | `TASK-NNN-titulo.md` | `TASK-001-nova-secao-cases.md`   |
| REVIEW   | `REVIEW-NNN.md`      | `REVIEW-001.md`                  |
| QA       | `QA-NNN.md`          | `QA-001.md`                      |
| ADR      | `ADR-NNN-titulo.md`  | `ADR-006-nova-decisao.md`        |

---

## Regras Gerais

- **Nunca** implementar sem SPEC aprovada
- **Nunca** expandir escopo sem nova SPEC
- **Sempre** registrar implementações em `/tasks/`
- **Sempre** preencher evidências de QA em `/reviews/`
- **Sempre** atualizar `PROJECT.md` ao concluir uma entrega
- **Sempre** atualizar `CHANGELOG.md` com as mudanças realizadas
- Divergências entre SPEC e código **nunca** são resolvidas silenciosamente — geram issue ou nova SPEC

---

## Tratamento de Divergências

| Situação                                    | Ação                                        |
|---------------------------------------------|---------------------------------------------|
| Código diverge da SPEC                      | Tratar como defeito — corrigir ou criar nova SPEC |
| SPEC diverge do PROJECT.md                  | Tratar como dívida documental — atualizar PROJECT.md |
| Requisito descoberto durante implementação  | Pausar — criar SPEC de adição de escopo     |
| Bloqueio técnico                            | Reportar ao PO com opções e impactos        |

---

_Última atualização: 2026-08-28_
