# TASK-088 — Unificação da Dobra Inicial da Rota /sobre em Executive Briefing e Remoção de Informações Burocráticas

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-088-sobre-executive-briefing.md`

---

## 1. Escopo da Tarefa

1. **Unificação da Dobra Inicial de `/sobre` (`src/pages/AboutPage.tsx`)**:
   - Remover duplicação entre `PageHeader` e a primeira seção ("Visão & Posicionamento").
   - Estruturar novo bloco unificado **Executive Briefing Hero** na camada `anchor` (`bg-surface-anchor`).
   - Coluna 1 (`lg:col-span-7`):
     * Eyebrow: `[ QUEM SOMOS // POSICIONAMENTO ]` com `BrandChipIcon` e estilo monospace ciano/esmeralda.
     * H1: *"Engenharia de software sob medida com <span className="text-text-brand">visão real de negócio</span>"*.
     * Parágrafo Institucional focado em clientes corporativos:
       *"A EPM DevTech projeta, constrói e moderniza aplicações corporativas críticas. Desenvolvemos ecossistemas sob medida para operações que exigem estabilidade contínua, integrações sem perda de dados e comunicação técnica direta, sem camadas comerciais intermediárias."*
     * Remover parágrafos secundários e contador solto `+9 anos`.
   - Coluna 2 (`lg:col-span-5`):
     * Quadro executivo *"Compromissos de Parceria"* (`bg-zinc-950/70 border border-zinc-800 rounded-2xl p-6 sm:p-7 backdrop-blur-sm shadow-xl`).
     * Cabeçalho: *"Como atuamos com a sua equipe"* com badge de status `● Parceria Direta`.
     * 3 Pilares com ícones dedicados:
       1. *"Atendimento 100% Remoto & Nacional"* (`Globe`)
       2. *"Contato Direto com a Liderança Técnica"* (`Users`)
       3. *"Propriedade Total do Código & Entregas Incrementais"* (`ShieldCheck`)
     * Remover botão interno duplicado de contato.
2. **Remoção de Informações Burocráticas & Pessoais**:
   - Remover CNPJ, endereço fiscal, menção à sede física de Toledo-PR e menções nominais isoladas de `/sobre`.
   - Atualizar meta tags (`<Helmet>`) para refletir o posicionamento corporativo nacional sem menção a Toledo-PR.
3. **Harmonização do Ritmo Tonal (SPEC-082)**:
   - Executive Briefing Hero: `anchor`
   - Seção *"Nossa Jornada"* (`#jornada`): `tone="base"`
   - Seção *"Missão e Princípios"* (`#principios`): `tone="alt"`
   - `Footer`: `anchor`
4. **Atualização de Scripts e Testes**:
   - Atualizar `scripts/prerender.js` com novo título, descrição e H1 de `/sobre`.
   - Atualizar `e2e/multi-route-navigation.spec.ts` com o novo título e H1.
   - Atualizar `src/pages/__tests__/pages.test.tsx` com as novas asserções de `/sobre`.
5. **Quality Gates & Evidências**:
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Vitest (`npm test -- --run`), Playwright e Build.
   - Capturar screenshots em Dark e Light mode do novo bloco inicial.
   - Criar `reviews/QA-088.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Git commit em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-088-sobre-executive-briefing.md`.
- [x] Obter aprovação formal do PO.
- [x] Implementar novo Executive Briefing unificado em `src/pages/AboutPage.tsx`.
- [x] Harmonizar tons de `#jornada` e `#principios` em `AboutPage.tsx`.
- [x] Atualizar SEO e metatags em `AboutPage.tsx`.
- [x] Atualizar `scripts/prerender.js`.
- [x] Atualizar testes em `src/pages/__tests__/pages.test.tsx` e `e2e/multi-route-navigation.spec.ts`.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Capturar evidências visuais (Dark e Light mode).
- [x] Criar relatório `reviews/QA-088.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-088 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-088-sobre-executive-briefing.md` (Criado)
- `tasks/TASK-088-sobre-executive-briefing.md` (Criado)
- `src/pages/AboutPage.tsx` (Modificar)
- `scripts/prerender.js` (Modificar)
- `src/pages/__tests__/pages.test.tsx` (Modificar)
- `e2e/multi-route-navigation.spec.ts` (Modificar)
- `reviews/QA-088.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
