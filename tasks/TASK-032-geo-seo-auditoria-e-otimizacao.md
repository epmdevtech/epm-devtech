# TASK-032 — GEO & Technical SEO: Auditoria e Otimização para LLMs e Motores Generativos

**SPEC:** [SPEC-032](../specs/SPEC-032-geo-seo-auditoria-e-otimizacao.md)
**Status:** 🔄 Em andamento
**Iniciada em:** 2026-09-07
**Responsável:** Agente Gemini/Antigravity

---

## Arquivos a Modificar/Criar

| Arquivo | Ação |
|---------|------|
| `public/robots.txt` | MODIFICAR — adicionar crawlers de IA |
| `public/llms.txt` | MODIFICAR — expandir conteúdo |
| `public/llms-full.txt` | CRIAR — versão detalhada |
| `public/site.webmanifest` | MODIFICAR — corrigir theme_color |
| `public/sitemap.xml` | MODIFICAR — atualizar lastmod |
| `index.html` | MODIFICAR — JSON-LD, twitter tags |
| `src/pages/Index.tsx` | MODIFICAR — enriquecer descriptions |

---

## Checklist de Implementação

- [ ] robots.txt com blocos IA
- [ ] llms.txt expandido
- [ ] llms-full.txt criado
- [ ] site.webmanifest theme_color corrigido
- [ ] sitemap.xml lastmod atualizado
- [ ] index.html email corrigido no JSON-LD
- [ ] index.html Service individuais adicionados
- [ ] index.html FAQPage adicionada
- [ ] index.html twitter:site e twitter:creator
- [ ] Index.tsx descriptions enriquecidas
- [ ] npm run lint → zero erros
- [ ] npm run build → sem erros
- [ ] npm run test:coverage → ≥ 90%

---

## Conclusão

**Data de conclusão:** 2026-09-07
**Status final:** ✅ Concluída — Aguardando aprovação do PO para push na develop

### Resultados dos Quality Gates
| Gate | Resultado |
|------|-----------|
| ESLint | ✅ 0 erros |
| Vitest | ✅ 18/18 suites, 124/124 testes, 98.28% cobertura |
| Build | ✅ Sem erros, todos chunks < 600KB |
