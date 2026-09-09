# TASK-037 — Hero Interativo Quordix: Tipografia Magnética, Subtítulo Dinâmico e Anéis Orbitais

| Campo              | Valor                                                                               |
|--------------------|-------------------------------------------------------------------------------------|
| **ID**             | TASK-037                                                                            |
| **SPEC**           | SPEC-037                                                                            |
| **Data de início** | 2026-09-09                                                                          |
| **Agente**         | Gemini/Antigravity                                                                  |
| **Status**         | ✅ Concluída                                                                        |

---

## Escopo da Tarefa

1. **Atualização da Seção Hero (`src/components/sections/Hero.tsx`)**:
   - Implementar componente `MagneticLetter` com animação de entrada escalonada letra a letra (Linha 1: "Software sob medida construído" e Linha 2: "para escalar o seu negócio.") em 2 linhas perfeitamente equilibradas e física magnética via `useAnimationFrame` + `useSpring` (deslocamento elástico, skew e escala suave).
   - Implementar componente `SubtitleWord` com revelação sequencial após o título e destaque tipográfico reativo acompanhando o cursor tanto sobre o título quanto sobre o subtítulo (`font-weight: 400` a `700` e opacidade `0.45` a `1.0` via projeção dinâmica vertical `dy * 0.35`).
   - Eliminar as duas cores automáticas/estáticas no subtítulo: todo o texto inicia em cor e peso neutros 100% uniformes (`text-zinc-600 dark:text-zinc-400`, peso 400, opacidade uniforme).
   - Implementar anéis orbitais decorativos centrados atrás do título (`top: 43%`) com satélites luminosos alinhados ao gradiente oficial da marca (`logo-Photoroom.png`): Ciano Elétrico (`#00D4FF`) no anel interno, Verde Esmeralda institucional (`#10B981`) no anel de realce, e azul celeste no anel externo.
   - Implementar glow atmosférico difuso (`.hero-brand-aura`) com o gradiente oficial da marca atrás da headline (transição suave entre Ciano Elétrico, Turquesa e Verde Esmeralda) em Light Mode e Dark Mode, eliminando integralmente cores estranhas (laranja, âmbar e pêssego).
   - Implementar scroll parallax vertical (`yText`) e fade out gradual (`opacityFade`) via `scrollY` global da janela, eliminando aviso de container não-estático do Framer Motion.
   - Adicionar meta tag `<meta name="mobile-web-app-capable" content="yes" />` para eliminar depreciação do Chrome.
   - Remover botões de CTA redundantes da seção Hero a pedido do PO, mantendo foco total no visual imersivo e na tipografia magnética.
   - Adicionar suporte a detecção de touch (`useTouch`) e handlers touch para interação mobile/tablet.
   - Adicionar suporte completo a `prefers-reduced-motion` (desativação de físicas e rotações).
   - Preservar rigorosamente o contrato de Títulos 100% Monocromáticos (SPEC-014) sem spans coloridos no H1.
   - Preservar a Tagline oficial com status pulsante e a microprova social com `ShieldCheck` com entrada fade suave.
   - Descartar integralmente navbar e logo da referência Quordix (manter o Header oficial da EPM DEVTECH).
2. **Atualização dos Testes Unitários (`src/components/sections/__tests__/Hero.test.tsx`)**:
   - Atualizar e expandir testes unitários no Vitest para cobrir os novos nós interativos sem quebrar acessibilidade ou SEO.
3. **Validação E2E Playwright (`e2e/design-system-and-stability.spec.ts`)**:
   - Executar suíte Playwright para garantir estabilidade, monocromatismo do H1 e ausência de regressões (10/10 aprovados).
4. **Validação em Localhost**:
   - Servidor local ativo e respondendo em `http://localhost:8070/` para validação e aprovação do PO.
5. **Quality Gates & Evidências**:
   - Vitest: 134/134 testes passando com cobertura de 94.51% no Hero e 95.65% geral.
   - Playwright: 10/10 testes passando.
   - ESLint: 0 erros e 0 warnings.
   - Build de produção limpo (`npm run build`).
   - Criado `reviews/QA-037.md`, atualizados `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Criados / Modificados

- `specs/SPEC-037-hero-quordix-magnetic-interativo.md` (Criado)
- `tasks/TASK-037-hero-quordix-magnetic-interativo.md` (Criado / Atualizado)
- `src/components/sections/Hero.tsx` (Modificado)
- `src/components/sections/__tests__/Hero.test.tsx` (Modificado)
- `src/components/ui/ScrollToTop.tsx` (Modificado)
- `src/index.css` (Modificado)
- `e2e/design-system-and-stability.spec.ts` (Modificado)
- `reviews/QA-037.md` (Criado)
- `PROJECT.md` (Modificado)
- `CHANGELOG.md` (Modificado)

---

## Validações e Quality Gates

- [x] Vitest: 100% dos testes unitários passando (134/134 em 20 suítes) (`npm test`).
- [x] Cobertura: Cobertura >= 90% (Hero: 94.51%, Geral: 95.65%) (`npm run test:coverage`).
- [x] Playwright E2E: 100% dos testes passando (10/10) (`npx playwright test`).
- [x] ESLint: 0 erros e 0 warnings (`npm run lint`).
- [x] Build: compilação limpa de produção (`npm run build`).
- [x] Visual: Efeito magnético suave, anéis orbitais com satélites verdes, subtítulo reativo, 100% monocromático no H1, sem quebras de layout em mobile e desktop.
- [x] Localhost: Disponível em `http://localhost:8070/`.
