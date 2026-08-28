# Bootstrapping — Inicialização do Projeto com Universal SDD

## O que é este documento?

Este documento descreve como o Universal SDD foi aplicado ao projeto EPM DEVTECH e serve como referência para replicar o processo em outros projetos.

---

## O que foi feito

1. **Analisou-se o repositório** existente (React 18 + TypeScript + Vite + Tailwind + shadcn/ui + Framer Motion)
2. **Gerou-se o `PROJECT.md`** com o estado canônico atual
3. **Identificou-se a arquitetura**, stack e padrões já existentes
4. **Preencheu-se a Base de Conhecimento** (`knowledge/stack.md`, `knowledge/conventions.md`)
5. **Documentaram-se as decisões arquiteturais** tomadas (ADR-001 a ADR-005)
6. **Definiram-se os padrões** de UX/UI, acessibilidade, testes e quality gates
7. **Criaram-se templates** para SPEC, TASK, REVIEW e QA

---

## Estrutura Criada

```
EPM-DEV-TECH/
├── PROJECT.md          ← estado canônico
├── AGENTS.md           ← protocolo comum
├── GEMINI.md           ← protocolo Gemini/Antigravity
├── CHANGELOG.md        ← histórico de versões
│
├── agents/
│   └── gemini.md       ← missão e limites do agente
│
├── workflows/
│   └── feature.md      ← fluxo completo de feature
│
├── knowledge/
│   ├── stack.md        ← stack tecnológico
│   └── conventions.md  ← convenções de código
│
├── standards/
│   ├── testing.md      ← estratégia de testes
│   ├── quality-gates.md← critérios de entrada/saída/release
│   ├── ux-ui.md        ← processo e critérios UX/UI
│   └── accessibility.md← WCAG 2.1 AA
│
├── templates/
│   ├── spec/SPEC-TEMPLATE.md
│   ├── task/TASK-TEMPLATE.md
│   ├── review/REVIEW-TEMPLATE.md
│   └── qa/QA-TEMPLATE.md
│
├── adr/
│   ├── ADR-001-spa-scroll-spy.md
│   ├── ADR-002-shadcn-ui.md
│   ├── ADR-003-emailjs.md
│   ├── ADR-004-vercel-deploy.md
│   └── ADR-005-bundle-splitting.md
│
├── docs/
│   ├── getting-started.md
│   ├── architecture.md
│   ├── agents.md
│   ├── workflows.md
│   ├── knowledge-base.md
│   └── bootstrapping.md  ← este arquivo
│
├── specs/              ← SPECs aprovadas (vazio, pronto para uso)
├── tasks/              ← TASKs ativas (vazio, pronto para uso)
└── reviews/            ← reviews e evidências de QA (vazio, pronto para uso)
```

---

## Próximos Passos

1. Criar a primeira SPEC usando `/templates/spec/SPEC-TEMPLATE.md`
2. Obter aprovação do PO
3. Criar a TASK correspondente
4. Seguir o workflow em `workflows/feature.md`
