# TASK-113 — Implementação das Direções de Arte Editoriais e Abertas nos Heros das Rotas

- **SPEC Relacionada:** [SPEC-113](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/specs/SPEC-113-direcoes-de-arte-editoriais-heros.md)
- **Status:** Concluído (Aguardando Aprovação para Commit)
- **Responsável:** Gemini / Antigravity
- **Data de Início:** 2026-10-07
- **Data de Conclusão:** 2026-10-07

---

## 1. Escopo de Arquivos Modificados / Criados

- `src/components/layout/PageHero.tsx` (permitir flexibilidade espacial para composições abertas)
- `src/components/sections/Hero.tsx` (substituição do card de cenários pela Malha Vetorial Contínua SVG aberta)
- `src/components/layout/hero-visuals/ServicesHeroVisual.tsx` (Grid Tipográfico Técnico Aberto — Architectural Spec Grid)
- `src/components/layout/hero-visuals/HowWeWorkHeroVisual.tsx` (Régua de Precisão de Engenharia — Execution Timeline Sequence)
- `src/components/layout/hero-visuals/ExperienceHeroVisual.tsx` (Composição Tipográfica Display de Métricas com Cotas CAD)
- `src/components/layout/hero-visuals/EngineeringHeroVisual.tsx` (Blueprint Arquitetural Isométrico em Linha Fina CAD)
- `src/components/layout/hero-visuals/ContactHeroVisual.tsx` (Painel Tipográfico Integrado de Canal Ponto-a-Ponto)
- `src/components/sections/Contact.tsx` (remoção da caixa/card fechado no formulário; layout aberto com hairlines)
- `src/components/layout/__tests__/PageHero.test.tsx` (atualização dos testes unitários para validar a nova arquitetura)

---

## 2. Checklist de Execução

- [x] Criar SPEC-113 e registrar TASK-113
- [x] Atualizar `PageHero.tsx` com `visualClassName` opcional para composições ricas
- [x] Refatorar `Hero.tsx` integrando a Malha Vetorial Contínua em SVG (Integrated Circuit Mesh) mantendo seletores e dot de pulso
- [x] Implementar `ServicesHeroVisual.tsx` com o Grid Tipográfico Técnico Aberto (3 faixas e hairlines de 1px)
- [x] Implementar `HowWeWorkHeroVisual.tsx` com a Régua de Precisão de Engenharia (ticks SVG e pulso de luz)
- [x] Implementar `ExperienceHeroVisual.tsx` com Composição Display de Métricas (99.98%, 0 paradas, cotas CAD)
- [x] Implementar `EngineeringHeroVisual.tsx` com Blueprint Isométrico em Linha Fina (4 camadas CAD)
- [x] Implementar `ContactHeroVisual.tsx` com Canal Executivo Direto aberto
- [x] Refatorar `Contact.tsx` eliminando o envelope fechado e integrando o formulário diretamente no layout
- [x] Atualizar suíte de testes unitários (`PageHero.test.tsx` e `Hero.test.tsx`)
- [x] Executar Quality Gates (`npm run test`, `npm run lint`, `npm run build`)
- [x] Executar testes E2E do Playwright (`npm run test:e2e`)
- [x] Criar relatório `reviews/QA-113.md`
- [x] NÃO comitar no git (aguardar aprovação explícita do usuário)
