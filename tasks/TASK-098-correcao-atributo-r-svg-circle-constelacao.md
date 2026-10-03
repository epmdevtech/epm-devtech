# TASK-098 — Correção do Atributo SVG `r` em `<circle>` / `<motion.circle>` na Constelação de `/sobre`

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-098-correcao-atributo-r-svg-circle-constelacao.md`

---

## 1. Escopo da Tarefa

1. **Correção de Atributo `r` em `EpmConstellation.tsx`**:
   - Adicionar `r={15}` e `initial={{ r: 15, opacity: 0.6 }}` nos dois elementos `<motion.circle>` do sonar.
   - Adicionar fallbacks defensivos para raios calculados de nós e halos.

2. **Testes Unitários Automatizados**:
   - Atualizar `src/components/sections/__tests__/EpmConstellation.test.tsx`.
   - Adicionar teste verificando que nenhum elemento `<circle>` possui atributo `r` indefinido (`undefined`, vazio ou `NaN`).

3. **Validação de Console e Quality Gates**:
   - Rodar script de verificação no Playwright para assegurar zero erros de console em `/sobre` (CONSOLE ERRORS COUNT: 0).
   - `npx tsc --noEmit` (0 erros).
   - `npm run lint` (0 erros, 0 warnings).
   - `npm test -- --run` (33 suítes, 203 testes passando).
   - `npx playwright test` (46 testes passando).
   - `npm run build` (Chunks < 600KB, 7 rotas HTML pré-renderizadas).

4. **Documentação e Governança**:
   - Preencher `reviews/QA-098.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit Git em pt-BR na branch `develop`.

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-098-correcao-atributo-r-svg-circle-constelacao.md`.
- [x] Obter aprovação formal do PO.
- [x] Corrigir as tags `<motion.circle>` em `src/components/sections/EpmConstellation.tsx`.
- [x] Atualizar suíte de testes unitários `EpmConstellation.test.tsx`.
- [x] Validar eliminação dos erros de console em `/sobre` (0 erros).
- [x] Executar Quality Gates (`tsc`, `lint`, `vitest`, `playwright`, `build`).
- [x] Criar relatório `reviews/QA-098.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-098 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-098-correcao-atributo-r-svg-circle-constelacao.md` (Criado / Aprovado)
- `tasks/TASK-098-correcao-atributo-r-svg-circle-constelacao.md` (Criado / Concluído)
- `src/components/sections/EpmConstellation.tsx` (Modificado)
- `src/components/sections/__tests__/EpmConstellation.test.tsx` (Modificado)
- `reviews/QA-098.md` (Criado)
- `PROJECT.md` (Modificado)
- `CHANGELOG.md` (Modificado)
