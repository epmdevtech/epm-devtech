# ADR-010 — Estratégia de Renderização do Blog: Injeção Estática + `createRoot` com Teste de Paridade

**Status:** ✅ Aceito  
**Data:** 2026-10-22  
**Decisores:** Elessandro Prestes Macedo  
**Contexto:** SPEC-118 / TASK-119 / Auditoria `docs/blog-auditoria-validacao.md`

---

## 1. Contexto

O site é uma SPA React/Vite com React Router 6, prerender parcial e hospedagem Vercel. A auditoria confirmou que:

- `src/main.tsx` usa `createRoot`, não `hydrateRoot`;
- o prerender atual injeta apenas metadados e um `<header>` oculto, não o corpo das páginas;
- o conteúdo estático dentro de `#root` é descartado e re-renderizado no cliente;
- não há, hoje, divergência observada entre o H1 oculto e o H1 renderizado.

O blog precisa de conteúdo completo no HTML inicial para SEO, LLMO, leitores sem JavaScript e compartilhamento. Era necessário decidir como produzir esse HTML sem reescrever a aplicação nem introduzir uma migração de framework.

---

## 2. Decisão

Para o MVP do blog, adotar **injeção estática do corpo do artigo no `index.html` de cada rota + `createRoot` no cliente**, com **teste automatizado de paridade** entre o HTML estático e o HTML renderizado pelo React.

O build do blog deve:

1. Gerar o manifesto e o HTML de cada artigo fora do bundle do cliente.
2. Injetar o corpo visível do artigo dentro de `#root` em `dist/blog/<slug>/index.html`.
3. Manter `createRoot` e o React Router como estão.
4. Executar um teste de paridade que compare, no mínimo: H1, título, description, canonical e texto principal do artigo entre o HTML estático e o DOM após a montagem.
5. Falhar o build/teste se houver divergência.

---

## 3. Justificativa

1. **Menor risco de regressão:** não altera o bootstrap, o roteamento, os providers, o tema ou os componentes existentes.
2. **Compatibilidade com o pipeline atual:** o prerender já substitui metadados e injeta conteúdo em `#root`; a mudança é uma extensão do padrão existente.
3. **Entrega de valor imediata:** o conteúdo fica disponível no HTML inicial, sem depender de JavaScript.
4. **Custo controlado:** não exige SSR em runtime, servidor Node na Vercel ou migração para Next/Astro.
5. **Divergência detectável:** o teste de paridade transforma o principal risco da abordagem em um gate de CI.

---

## 4. Alternativas Consideradas

| Alternativa | Motivo da rejeição |
|---|---|
| SSG completo com `hydrateRoot` | Exige reestruturar o bootstrap, provar paridade de árvore e lidar com diferenças de tema/estado; maior risco e escopo para o MVP |
| Migrar para Next.js/Astro | Reescrita de roteamento, build, componentes e deploy; sem evidência de necessidade |
| Manter o padrão atual (só metadados + header oculto) | Não entrega corpo do artigo no HTML inicial; falha no objetivo de SEO/LLMO do blog |
| SSR em runtime na Vercel | Adiciona servidor, cold start e complexidade operacional incompatíveis com o volume inicial |

---

## 5. Consequências

- ✅ Nenhuma dependência nova de framework.
- ✅ Conteúdo do blog visível sem JavaScript.
- ✅ Pipeline de build permanece estático.
- ⚠️ O HTML estático e o React precisam ser mantidos em paridade; o teste é obrigatório.
- ⚠️ O conteúdo estático é substituído na montagem; pode haver um flash mínimo em conexões lentas. O layout do artigo deve evitar mudança brusca de altura.
- ⚠️ A decisão vale para o MVP. Se o blog crescer, a migração para SSG completo pode ser reavaliada em SPEC própria.

---

_Maintainer: Elessandro Prestes Macedo | 2026-10-22_
