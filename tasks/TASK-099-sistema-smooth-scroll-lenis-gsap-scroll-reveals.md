# TASK-099 — Sistema de Rolagem Suave (Smooth Scroll) com Lenis e Revelações Reativas com GSAP ScrollTrigger

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-099-sistema-smooth-scroll-lenis-gsap-scroll-reveals.md`

---

## 1. Escopo da Tarefa

1. **Instalação e Configuração de Dependências (`package.json`, `vite.config.ts`)**:
   - Instalar `lenis` e `gsap`.
   - Adicionar chunking manual `gsap-lenis` em `vite.config.ts`.

2. **Implementação do Provedor de Smooth Scroll (`src/components/layout/SmoothScrollProvider.tsx` & `src/hooks/useSmoothScroll.ts`)**:
   - Inicialização do `Lenis` com física inercial corporativa calibrada.
   - Sincronização do loop de animação do Lenis com `gsap.ticker` e registro do `ScrollTrigger`.
   - Reset de rolagem e recálculo de triggers em navegações de rota.
   - Bypassar Lenis e triggers quando `prefers-reduced-motion` estiver ativo.
   - Descarte limpo (`destroy`) no unmount.

3. **Hook Utilitário de Revelação (`src/hooks/useScrollReveal.ts`)**:
   - Hook com `gsap.context()` para orquestrar animações acopladas ao scroll de forma limpa, com reversão determinística.

4. **Integração nas Seções e Páginas**:
   - Adicionar `SmoothScrollProvider` no `Layout.tsx`.
   - Aplicar revelações sóbrias nos cabeçalhos de seção (`SectionHeader`), cards (`HomeServicesBento`), etapas do pipeline (`HomeProcessPipeline`).

5. **Testes Unitários e Quality Gates**:
   - Teste unitário para `SmoothScrollProvider` e `useScrollReveal`.
   - Executar `npx tsc --noEmit` (0 erros).
   - Executar `npm run lint` (0 erros, 0 warnings).
   - Executar `npm test -- --run` (100% passando).
   - Executar `npx playwright test` (100% passando).
   - Executar `npm run build` (Chunks < 600KB).

6. **Documentação e Governança**:
   - Preencher `reviews/QA-099.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit Git em pt-BR na branch `develop`.

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-099-sistema-smooth-scroll-lenis-gsap-scroll-reveals.md`.
- [x] Obter aprovação formal do PO.
- [x] Instalar `lenis` e `gsap` e configurar `vite.config.ts`.
- [x] Implementar `SmoothScrollProvider.tsx` e `useSmoothScroll.ts`.
- [x] Implementar `useScrollReveal.ts`.
- [x] Integrar no `Layout.tsx` e aplicar revelações nas seções chave.
- [x] Criar testes unitários para o provedor e hooks.
- [x] Executar Quality Gates (`tsc`, `lint`, `vitest`, `playwright`, `build`).
- [x] Criar relatório `reviews/QA-099.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Concluir TASK-099 e realizar commit Git no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-099-sistema-smooth-scroll-lenis-gsap-scroll-reveals.md` (Criado / Aprovado)
- `tasks/TASK-099-sistema-smooth-scroll-lenis-gsap-scroll-reveals.md` (Criado)
- `package.json` (Modificar)
- `vite.config.ts` (Modificar)
- `src/components/layout/SmoothScrollProvider.tsx` (Criar)
- `src/hooks/useScrollReveal.ts` (Criar)
- `src/components/layout/Layout.tsx` (Modificar)
- `src/components/layout/__tests__/SmoothScrollProvider.test.tsx` (Criar)
- `src/hooks/__tests__/useScrollReveal.test.tsx` (Criar)
- `reviews/QA-099.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
