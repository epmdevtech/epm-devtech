# TASK-112 — Refatoração de Artefatos de Hero com UI Cards de Produto e Dashboards de Negócio

| Campo              | Valor                                                  |
|--------------------|--------------------------------------------------------|
| **ID**             | TASK-112                                               |
| **SPEC**           | SPEC-112                                               |
| **Data de início** | 2026-10-07                                             |
| **Agente**         | Gemini/Antigravity                                     |
| **Status**         | Em progresso                                           |

---

## Escopo da Implementação

1. **Refatoração dos Componentes Visuais em `src/components/layout/hero-visuals/`**:
   - `ServicesHeroVisual.tsx` → Catálogo modular com 3 cartões de interface de produto (Web, Integrações, Modernização).
   - `HowWeWorkHeroVisual.tsx` → Pipeline de entrega previsível com linha do tempo de 4 etapas executivas.
   - `ExperienceHeroVisual.tsx` → Painel de impacto e continuidade de negócio (estabilidade, transações, picos).
   - `EngineeringHeroVisual.tsx` → Matriz de governança, integridade de dados e blindagem de software.
   - `ContactHeroVisual.tsx` → Canal direto seguro com alinhamento executivo e garantia de atendimento por engenheiros.

2. **Refatoração do Visual do Hero na Home (`src/components/sections/Hero.tsx`)**:
   - Painel de Orquestração Operacional com métricas em tempo real ("Operação 100% Ativa", "Sistemas Integrados", "Latência Instantânea") combinado com a affordance executiva dos cenários de desafio de negócio.

3. **Humanização dos Textos de Práticas da Constelação (`src/data/constellationPractices.ts`)**:
   - Traduzir os popovers para português claro focado em retorno financeiro, previsibilidade e estabilidade do negócio.

4. **Quality Gates & Testes**:
   - Atualizar/adicionar testes unitários em `PageHero.test.tsx`.
   - `npm run test` (100% passando).
   - `npm run lint` (0 erros).
   - `npm run build` (build e prerender OK).
   - `npm run test:e2e` (46/46 testes Playwright E2E OK).
   - Relatório `reviews/QA-112.md`.

---

## Checklist de Implementação

- [ ] `ServicesHeroVisual.tsx` refatorado para UI Cards de Produto
- [ ] `HowWeWorkHeroVisual.tsx` refatorado para Pipeline de Entrega Previsível
- [ ] `ExperienceHeroVisual.tsx` refatorado para Impacto e Continuidade de Negócio
- [ ] `EngineeringHeroVisual.tsx` refatorado para Matriz de Qualidade e Blindagem
- [ ] `ContactHeroVisual.tsx` refinado para Alinhamento Executivo
- [ ] `Hero.tsx` atualizado com Painel de Orquestração Operacional B2B
- [ ] `src/data/constellationPractices.ts` traduzido para valor de negócio
- [ ] Testes unitários atualizados e validados (`npm run test`)
- [ ] Lint verificado (`npm run lint`)
- [ ] Build e pré-render validados (`npm run build`)
- [ ] Testes E2E Playwright 100% aprovados (`npm run test:e2e`)
- [ ] `QA-112.md` gerado
