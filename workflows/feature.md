# Workflow — Feature Completa

## Fluxo Principal

```
┌─────────────────────────────────────────────────────────────┐
│                        FLUXO DE FEATURE                      │
└─────────────────────────────────────────────────────────────┘

 1. IDEIA
    └─► PO descreve o problema e o objetivo (forma livre)

 2. DISCOVERY
    └─► PO define: quem usa, qual problema resolve, métricas de sucesso

 3. DESIGN (obrigatório para mudanças de interface)
    └─► Wireframe ou descrição do comportamento visual
    └─► Aprovação do PO

 4. SPEC TÉCNICA E FUNCIONAL
    └─► Usar template: /templates/spec/SPEC-TEMPLATE.md
    └─► Salvar em: /specs/SPEC-NNN-titulo.md
    └─► Cobrir: requisitos funcionais, não-funcionais, critérios de aceitação

 5. APROVAÇÃO DA SPEC
    └─► PO revisa e assina a SPEC
    └─► Status: Draft → Aprovada
    └─► ⚠️ Nenhuma implementação antes deste passo

 6. TASK
    └─► Usar template: /templates/task/TASK-TEMPLATE.md
    └─► Salvar em: /tasks/TASK-NNN-titulo.md
    └─► Listar todos os arquivos a criar/modificar

 7. IMPLEMENTAÇÃO (Agente IA)
    └─► Apenas o escopo da SPEC aprovada
    └─► TypeScript estrito, Mobile First, acessível
    └─► Commits convencionais: feat:, fix:, docs:, refactor:

 8. QA AUTOMATIZADO E MANUAL
    └─► npm run test:coverage (≥ 90%)
    └─► npm run lint (zero erros)
    └─► npm run build (sem warnings)
    └─► Testes manuais: mobile, dark/light, teclado
    └─► Preencher: /reviews/QA-NNN.md

 9. DESIGN REVIEW + CODE REVIEW
    └─► Usar template: /templates/review/REVIEW-TEMPLATE.md
    └─► Salvar em: /reviews/REVIEW-NNN.md
    └─► Revisor: Elessandro Prestes Macedo

10. REFATORAÇÃO (se necessário)
    └─► Atender pontos levantados no review
    └─► Reexecutar QA após refatoração

11. DOCUMENTAÇÃO
    └─► Atualizar PROJECT.md
    └─► Atualizar CHANGELOG.md
    └─► Atualizar docs/ se aplicável
    └─► Criar ADR se decisão arquitetural foi tomada

12. RELEASE
    └─► Deploy aprovado pelo PO
    └─► Monitor: Vercel Analytics + Speed Insights
```

---

## Regras de Transição

| De              | Para            | Condição                                      |
|-----------------|-----------------|-----------------------------------------------|
| Discovery       | Design          | PO define escopo                              |
| Design          | SPEC            | Design aprovado pelo PO                       |
| SPEC            | Aprovação       | SPEC completa com todos os campos             |
| Aprovação       | TASK            | PO assinou a SPEC                             |
| TASK            | Implementação   | TASK criada com escopo claro                  |
| Implementação   | QA              | Código completo dentro do escopo              |
| QA              | Review          | QA aprovado (cobertura ≥ 90%, build OK)       |
| Review          | Refatoração     | Review reprovado ou com ressalvas críticas     |
| Review          | Documentação    | Review aprovado                               |
| Documentação    | Release         | Docs atualizados, PO aprova deploy            |

---

## Exemplo Prático: Adicionar Seção "Cases"

```
IDEIA: "Quero mostrar casos de sucesso com logos de clientes"

DISCOVERY:
  - Público: visitantes da landing page
  - Objetivo: aumentar autoridade e conversão
  - Conteúdo: 6 logos + breve descrição de cada projeto

DESIGN:
  - Grid de logos com hover effect
  - Responsivo: 2 colunas mobile, 3 tablet, 6 desktop
  - Dark/Light mode

SPEC: specs/SPEC-006-secao-cases.md
  - Requisitos funcionais: renderizar grid de logos...
  - Critérios de aceitação: logos carregam, hover funciona...
  - Aprovação: ✅ Elessandro - 2026-08-28

TASK: tasks/TASK-006-secao-cases.md
  - Criar: src/components/sections/Cases.tsx
  - Criar: src/components/sections/__tests__/Cases.test.tsx
  - Modificar: src/pages/Index.tsx (adicionar <Cases />)

IMPLEMENTAÇÃO → QA → REVIEW → DOCS → RELEASE
```

---

## Convenções de Nomenclatura

| Artefato   | Formato              | Localização   |
|------------|----------------------|---------------|
| SPEC       | SPEC-NNN-titulo.md   | /specs/       |
| TASK       | TASK-NNN-titulo.md   | /tasks/       |
| QA         | QA-NNN.md            | /reviews/     |
| REVIEW     | REVIEW-NNN.md        | /reviews/     |
| ADR        | ADR-NNN-titulo.md    | /adr/         |
