# TASK-086 — Hero da Rota /servicos: Inclusão de CTA Centralizado de Alta Conversão

- **Status:** Concluída
- **Data de Início:** 2026-10-02
- **Data de Conclusão:** 2026-10-02
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-086-servicos-hero-cta.md`

---

## 1. Escopo da Tarefa

1. **Evolução de `PageHeader.tsx`**:
   - Adicionar propriedades opcionais `children?: React.ReactNode` e `containerClassName?: string` à interface `PageHeaderProps`.
   - Renderizar `{children}` mantendo a estrutura semântica e centralização do container.
2. **Refatoração da Seção Hero em `ServicesPage.tsx`**:
   - Adicionar o botão CTA centralizado `"Solicite uma conversa"` logo abaixo da descrição (`mt-8`), acolhendo decisores não estritamente técnicos no primeiro contato.
   - Integrar ícone `ArrowRight` com microinteração de hover (`group-hover:translate-x-1`).
   - Aplicar estilo visual de destaque: `bg-emerald-400 text-zinc-950 font-semibold px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(52,211,153,0.25)] hover:bg-emerald-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:scale-[1.02] active:scale-[0.98]`.
   - Garantir suporte a `motion-reduce:hover:scale-100` e touch target mínimo de 44px (`min-h-[44px]`).
   - Conectar navegação via `<Link to="/contato">`.
3. **Testes & Quality Gates**:
   - Atualizar suíte `src/pages/__tests__/pages.test.tsx` com validação de renderização e ação do CTA em `/servicos`.
   - Executar TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), Vitest (`npm run test:coverage`), Playwright e Build (`npm run build`).
4. **Documentação & Encerramento**:
   - Capturar evidências visuais em Dark e Light Mode.
   - Criar `reviews/QA-086.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Realizar commit Git com mensagem em Português do Brasil (`pt-BR`).

### Itens de Trabalho:
- [x] Elaborar e submeter `specs/SPEC-086-servicos-hero-cta.md`.
- [x] Obter aprovação formal do PO.
- [x] Atualizar `PageHeader.tsx` para aceitar `children` e `containerClassName`.
- [x] Inserir botão CTA centralizado em `ServicesPage.tsx`.
- [x] Atualizar testes unitários em `pages.test.tsx`.
- [x] Executar Quality Gates (TypeScript, ESLint, Vitest, Playwright, Build).
- [x] Gerar capturas de tela das evidências visuais.
- [x] Elaborar relatório de QA (`reviews/QA-086.md`).
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit no branch `develop`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-086-servicos-hero-cta.md` (Criado)
- `tasks/TASK-086-servicos-hero-cta.md` (Criado)
- `src/components/ui/PageHeader.tsx` (Modificar)
- `src/pages/ServicesPage.tsx` (Modificar)
- `src/pages/__tests__/pages.test.tsx` (Modificar)
- `reviews/QA-086.md` (Criar)
- `PROJECT.md` (Modificar)
- `CHANGELOG.md` (Modificar)
