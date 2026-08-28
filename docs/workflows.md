# Workflows — Fluxos Oficiais

## Fluxo Principal: Feature

```
Ideia
  └─► Discovery (PO define o problema e o objetivo)
        └─► Design (wireframe/mockup se houver interface)
              └─► Aprovação do Design (PO aprova)
                    └─► SPEC técnica e funcional (escrita pelo PO ou pelo agente)
                          └─► Aprovação da SPEC (PO assina)
                                └─► TASK criada em /tasks/
                                      └─► Implementação (agente IA)
                                            └─► QA (testes automatizados + manual)
                                                  └─► Code Review (revisor humano)
                                                        └─► Refatoração (se necessário)
                                                              └─► Documentação atualizada
                                                                    └─► Release
```

## Fluxo de Bugfix

```
Bug reportado
  └─► Reprodução confirmada
        └─► SPEC de correção (escopo mínimo)
              └─► Aprovação (PO)
                    └─► TASK de bugfix
                          └─► Implementação
                                └─► Teste de regressão
                                      └─► Review
                                            └─► Release patch
```

## Regras Invariáveis

1. **Nenhuma implementação sem SPEC aprovada**
2. **Toda SPEC requer aprovação humana explícita** (assinatura no documento)
3. **TASKs abrem e fecham dentro do escopo da SPEC** — sem expansão silenciosa
4. **QA é obrigatório antes de qualquer review**
5. **Documentação é parte da entrega** — não é opcional
