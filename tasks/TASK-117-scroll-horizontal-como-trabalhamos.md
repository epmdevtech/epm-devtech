# TASK-117 — Scroll Horizontal Nativo na Rota `/how-we-work`

- **SPEC Relacionada:** [SPEC-117](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/specs/SPEC-117-scroll-horizontal-como-trabalhamos.md)
- **Status:** Concluído
- **Responsável:** Senior Frontend / UX Engineer
- **Data de Início:** 2026-10-16
- **Data de Conclusão:** 2026-10-16

---

## 1. Escopo da Implementação

- Criar narrativa horizontal das 4 etapas com CSS nativo de scroll-driven animations.
- Preservar entregáveis, resumos executivos e critérios de saída das 4 etapas.
- Manter manifesto (`alt`) e adicionar CTA discreto para `/contact`.
- Fallback vertical para mobile, `prefers-reduced-motion` e ausência de suporte.
- Remover `ProcessExplorer` (substituído).

---

## 2. Arquivos Criados

| Arquivo | Descrição |
|---|---|
| `src/components/sections/HowWeWorkHorizontal.tsx` | Narrativa horizontal das 4 etapas |
| `src/components/sections/__tests__/HowWeWorkHorizontal.test.tsx` | Testes unitários do componente |
| `specs/SPEC-117-scroll-horizontal-como-trabalhamos.md` | Especificação canônica |
| `tasks/TASK-117-scroll-horizontal-como-trabalhamos.md` | Rastreamento da tarefa |
| `adr/ADR-009-scroll-horizontal-css-nativo.md` | Decisão arquitetural |
| `reviews/QA-117.md` | Evidências de QA |
| `reviews/REVIEW-117-scroll-horizontal-como-trabalhamos.md` | Registro de revisão |

## 3. Arquivos Modificados

| Arquivo | Mudança |
|---|---|
| `src/pages/HowWeWorkPage.tsx` | Substituir `ProcessExplorer` por `HowWeWorkHorizontal`; adicionar CTA final |
| `PROJECT.md` | Atualizar estado canônico |
| `CHANGELOG.md` | Registrar mudança |

## 4. Arquivos Removidos

| Arquivo | Motivo |
|---|---|
| `src/components/sections/ProcessExplorer.tsx` | Substituído pela narrativa horizontal (dead code) |
| `src/components/sections/__tests__/ProcessExplorer.test.tsx` | Testes do componente removido |

---

## 5. Checklist de Implementação

- [x] Componente criado com TypeScript estrito (sem `any`)
- [x] Estratégia CSS nativa (`position: sticky` + `animation-timeline: view()` + `animation-range`)
- [x] Geometria derivada das larguras reais dos painéis
- [x] Fallback vertical com `@supports` (mobile / sem suporte / reduced motion)
- [x] Dark/Light mode via tokens semânticos
- [x] ARIA labels e semântica de lista ordenada
- [x] Imports usando alias `@/`
- [x] Sem manipulação imperativa de DOM, sem estado React desnecessário
- [x] Compatível com pré-renderização (sem `window`/`document`)

---

## 6. Checklist de Testes

- [x] Testes unitários criados em `__tests__/`
- [x] `npm run lint` aprovado
- [x] `npm test` aprovado
- [x] `npm run build` aprovado
- [x] `npm run test:e2e` aprovado

---

## 7. Evidências de Conclusão

### Resultado dos Testes
```
(vide reviews/QA-117.md)
```

### Resultado do Build
```
(vide reviews/QA-117.md)
```

---

## 8. Notas do Agente

- Divergência registrada: a SPEC-087 havia removido o CTA final da rota; a SPEC-117 o reintroduz de forma única e discreta (link para `/contact`), conforme solicitação explícita do PO.
- Nenhuma dependência nova foi instalada.
- `SmoothScrollProvider` (Lenis + GSAP ScrollTrigger) foi mantido intacto; a animação horizontal usa exclusivamente CSS nativo.
