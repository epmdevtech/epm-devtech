# TASK-110 — Padronização Global de Scroll Reveal, Botões Tipográficos e E-mail Oficial

| Campo              | Valor                    |
|--------------------|--------------------------|
| **ID**             | TASK-110                 |
| **SPEC**           | SPEC-110                 |
| **Data de início** | 2026-10-07               |
| **Agente**         | Gemini/Antigravity       |
| **Status**         | Concluído                |

---

## Escopo da Implementação

1. **Remoção de Ícones Decorativos em Botões e CTAs**:
   - `src/components/sections/Hero.tsx` (remover `ArrowUpRight` do CTA)
   - `src/pages/ServicesPage.tsx` (remover `ArrowRight` do CTA)
   - `src/components/sections/FAQ.tsx` (remover `→` do CTA)
   - `src/components/sections/HomeServicesBento.tsx` (remover 4x `ArrowRight` de "VER DETALHES")
   - `src/components/sections/ProcessExplorer.tsx` (remover `ArrowRight` das abas)
   - `src/components/sections/Contact.tsx` (remover `Send` do botão, `Maximize2` de expandir e `→` do WhatsApp)
   - `src/components/ContactForm.tsx` (remover `Send` do botão)
   - `src/pages/ContactPage.tsx` (remover `ArrowRight` do link de FAQ)
   - `src/pages/NotFound.tsx` (remover `Home`, `Code2`, `Mail` dos botões)

2. **Atualização do E-mail Oficial de Contato**:
   - `src/components/sections/Contact.tsx` (`elessandro@epmdevtech.com.br`)
   - `src/components/sections/__tests__/Contact.test.tsx` (atualizar asserções de teste)

3. **Padronização Global de Animações por Scroll (Scroll Reveal)**:
   - `src/components/ui/PageHeader.tsx` (integrar `useScrollReveal` nos cabeçalhos)
   - `src/pages/ServicesPage.tsx` e `src/components/sections/Services.tsx` (garantias e catálogo)
   - `src/pages/HowWeWorkPage.tsx` e `src/components/sections/ProcessExplorer.tsx` (etapas e manifesto)
   - `src/pages/ExperiencePage.tsx` (verticais e enterprise ledger)
   - `src/pages/EngineeringPage.tsx` e `src/components/sections/ArchitecturalBlueprint.tsx` (filosofia, terminal, blueprint e CTA)
   - `src/pages/AboutPage.tsx` (hero, jornada, princípios e CTA)
   - `src/pages/ContactPage.tsx` e `src/components/sections/Contact.tsx` (formulário e FAQs de apoio)

4. **Quality Gates & Documentação**:
   - `npm run test:coverage`
   - `npm run lint`
   - `npm run build`
   - `npm run test:e2e`
   - `reviews/QA-110.md`
   - `PROJECT.md` e `CHANGELOG.md`

---

## Checklist de Implementação

- [x] Ícones removidos de todos os botões e CTAs
- [x] E-mail atualizado para `elessandro@epmdevtech.com.br` no componente e testes de Contato
- [x] `useScrollReveal` aplicado em `PageHeader.tsx`
- [x] Scroll reveal aplicado nas seções e grids de `/services`
- [x] Scroll reveal aplicado nas seções e grids de `/how-we-work`
- [x] Scroll reveal aplicado nas seções e grids de `/experience`
- [x] Scroll reveal aplicado nas seções e grids de `/engineering`
- [x] Scroll reveal aplicado nas seções e grids de `/about`
- [x] Scroll reveal aplicado nas seções e grids de `/contact`
- [x] Testes unitários passando (`npm run test`)
- [x] `npm run test:coverage` aprovado (cobertura ≥ 90%)
- [x] `npm run lint` aprovado (zero erros)
- [x] `npm run build` aprovado (sem chunks > 600KB)
- [x] `npm run test:e2e` aprovado (100% dos testes passando)
- [x] `QA-110.md` gerado
- [x] `PROJECT.md` e `CHANGELOG.md` atualizados
