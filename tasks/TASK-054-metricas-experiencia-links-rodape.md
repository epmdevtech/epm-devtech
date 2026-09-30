# TASK-054 — Métricas de Experiência (4º Stat), Links de Redes no Rodapé e Saneamento do README / Repositório Público

## Metadados
- **ID:** TASK-054
- **SPEC Relacionada:** SPEC-054
- **Data:** 2026-09-30
- **Responsável:** Gemini/Antigravity
- **Status:** Em Execução

---

## 1. Escopo de Arquivos

### Arquivos Criados:
- `src/config/site.ts` — Módulo canônico de configurações (redes, e-mail, telefone, empresa)
- `scripts/capture-stats-footer.cjs` — Script de captura de evidências Playwright
- `docs/evidence/stats-footer/before/*` — Capturas de antes
- `docs/evidence/stats-footer/after/*` — Capturas de depois
- `specs/SPEC-054-metricas-experiencia-links-rodape.md`
- `tasks/TASK-054-metricas-experiencia-links-rodape.md`
- `reviews/QA-054.md`

### Arquivos Modificados:
- `src/components/sections/Authority.tsx` — 4 stats, U+2212, sr-only acessível, nota de confidencialidade
- `src/components/sections/Footer.tsx` — Links LinkedIn e GitHub com ícones SVG inline e labels visíveis
- `src/pages/Index.tsx` — Consumo de `SITE_CONFIG`
- `index.html` — Atualização do `sameAs` no JSON-LD
- `README.md` — Reescrita técnica e neutra sem menções a clientes confidenciais
- `public/llms.txt` — Sincronização de métricas e remoção de clientes
- `public/llms-full.txt` — Sincronização de métricas e remoção de clientes
- `src/components/sections/__tests__/Authority.test.tsx` — Atualização dos testes unitários
- `src/components/sections/__tests__/Footer.test.tsx` — Atualização dos testes unitários
- `PROJECT.md` — Registro de estado canônico
- `CHANGELOG.md` — Registro de alterações

---

## 2. Checklist de Execução

- [x] Capturar evidências visuais de estado anterior ("antes") em 1440, 768 e 375 px (Dark e Light)
- [x] Criar `specs/SPEC-054-metricas-experiencia-links-rodape.md`
- [x] Criar `tasks/TASK-054-metricas-experiencia-links-rodape.md`
- [ ] Implementar `src/config/site.ts`
- [ ] Atualizar `src/components/sections/Authority.tsx` com os 4 stats e requisitos de acessibilidade
- [ ] Atualizar `src/components/sections/Footer.tsx` com os links na coluna Contato
- [ ] Atualizar JSON-LD em `index.html` (`sameAs` oficial)
- [ ] Integrar `src/config/site.ts` em `src/pages/Index.tsx`
- [ ] Reescrever `README.md` com abordagem técnica neutra e contato corporativo
- [ ] Atualizar `public/llms.txt` e `public/llms-full.txt`
- [ ] Atualizar testes unitários (`Authority.test.tsx`, `Footer.test.tsx`, etc.)
- [ ] Capturar evidências visuais de estado posterior ("depois")
- [ ] Executar Quality Gates (`tsc`, `lint`, `test`, `coverage`, `e2e`, `build`)
- [ ] Criar relatório `reviews/QA-054.md`
- [ ] Atualizar `PROJECT.md` e `CHANGELOG.md`
