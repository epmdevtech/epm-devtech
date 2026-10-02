# TASK-064 — Correção de Contraste de Textos Semânticos e Visibilidade do Cursor Orb no Dark Mode

- **Status:** Concluído
- **Responsável:** Gemini/Antigravity
- **Início:** 2026-10-01
- **Conclusão:** 2026-10-01
- **SPEC de Referência:** SPEC-064

---

## 1. Escopo de Arquivos

### 1.1. Configuração do Tailwind
- [x] `tailwind.config.ts`: Adicionar `theme.extend.textColor` com mapeamento explícito para `primary`, `secondary`, `muted`, `brand` e `on-brand` apontando para suas respectivas variáveis `--text-*-rgb`.

### 1.2. Cursor Orb e Layout
- [x] `src/components/CursorOrb.tsx`: Ajustar `z-index` para `z-[9999]`, aumentar a opacidade do dot para 1.0 (sólido com glow teal) e ring para 0.85/1.0, garantindo visibilidade clara sobre cards, botões e superfícies escuras. Adicionado hook para ativar classe `custom-cursor-active` no elemento raiz.
- [x] `src/components/layout/Layout.tsx`: Desacoplar `CursorOrb` do `LazyRender delay={2500}` para inicializar imediatamente na renderização da aplicação.
- [x] `src/index.css`: Escopar regra de ocultação do cursor nativo para `html.custom-cursor-active` evitando desaparecimento de cursor pré-carregamento.

### 1.3. Validação Visual e Quality Gates
- [x] Inspecionar computação de cores em `#servicos` e `footer` para assegurar contraste AAA no Dark Mode (#F2F7F7 a 17.26:1, #9DB0B3 a 9.12:1, #71868A a 5.36:1).
- [x] Executar `npx tsc --noEmit` (0 erros).
- [x] Executar `npm run lint` (0 erros).
- [x] Executar `npm test -- --run` (25/25 arquivos, 163/163 testes passando).
- [x] Executar `npx playwright test` (43/43 testes E2E passando).
- [x] Executar `npm run build` (build + prerender de rotas canônicas bem-sucedido).
- [x] Preencher relatório `reviews/QA-064.md`.
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`.
- [x] Realizar commit com convenções de boas práticas.
