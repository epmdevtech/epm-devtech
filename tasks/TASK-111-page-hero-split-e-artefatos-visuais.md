# TASK-111 — Refatoração de Heros Multi-Rota com PageHero Split (60/40) e Artefatos Visuais

| Campo              | Valor                                                  |
|--------------------|--------------------------------------------------------|
| **ID**             | TASK-111                                               |
| **SPEC**           | SPEC-111                                               |
| **Data de início** | 2026-10-07                                             |
| **Agente**         | Gemini/Antigravity                                     |
| **Status**         | Concluído (Aguardando Aprovação do PO para Commit)     |

---

## Escopo da Implementação

1. **Criação do Componente Base**:
   - `src/components/layout/PageHero.tsx`

2. **Criação dos Artefatos Visuais Técnicos**:
   - `src/components/layout/hero-visuals/ServicesHeroVisual.tsx`
   - `src/components/layout/hero-visuals/HowWeWorkHeroVisual.tsx`
   - `src/components/layout/hero-visuals/ExperienceHeroVisual.tsx`
   - `src/components/layout/hero-visuals/EngineeringHeroVisual.tsx`
   - `src/components/layout/hero-visuals/ContactHeroVisual.tsx`

3. **Refatoração dos Heros em Todas as Rotas**:
   - `src/components/sections/Hero.tsx` (Home `/`)
   - `src/pages/ServicesPage.tsx` (`/services`)
   - `src/pages/HowWeWorkPage.tsx` (`/how-we-work`)
   - `src/pages/ExperiencePage.tsx` (`/experience`)
   - `src/pages/EngineeringPage.tsx` (`/engineering`)
   - `src/pages/AboutPage.tsx` (`/about`)
   - `src/pages/ContactPage.tsx` (`/contact`)

4. **Quality Gates & Homologação**:
   - `npm run test` (41/41 suítes, 275/275 testes OK)
   - `npm run lint` (0 erros)
   - `npm run build` (Chunks < 145KB, pré-render 7 rotas OK)
   - `npm run test:e2e` (46/46 testes Playwright E2E OK)
   - Relatório `reviews/QA-111.md`
   - *(Atenção: Commit mantido suspenso conforme instrução explícita do PO para inspeção prévia)*

---

## Checklist de Implementação

- [x] `PageHero.tsx` criado em `src/components/layout/`
- [x] Artefatos visuais técnicos autorais criados em `src/components/layout/hero-visuals/`
- [x] Rota `/` (Home) integrada ao `PageHero` com `BusinessScenarioSelector`
- [x] Rota `/services` integrada com `ServicesHeroVisual` e CTA "VAMOS CONVERSAR"
- [x] Rota `/how-we-work` integrada com `HowWeWorkHeroVisual`
- [x] Rota `/experience` integrada com `ExperienceHeroVisual`
- [x] Rota `/engineering` integrada com `EngineeringHeroVisual`
- [x] Rota `/about` integrada com `EpmConstellation`
- [x] Rota `/contact` integrada com `ContactHeroVisual`
- [x] Testes unitários passando (`npm run test` - 275/275)
- [x] Lint sem erros (`npm run lint`)
- [x] Build concluído com sucesso (`npm run build`)
- [x] Testes E2E Playwright 100% passando (`npm run test:e2e` - 46/46)
- [x] `QA-111.md` gerado
