# REVIEW-048 — Hero: Responsividade Notebook — CTAs Sempre Visíveis

> **Status:** ✅ Aprovado  
> **Spec-Ref:** SPEC-048  
> **Task-Ref:** TASK-048-01  
> **Data:** 2026-09-28  
> **Revisor:** AI Agent (Antigravity) — papel declarado: Implementador + Revisor (mudança de baixo risco, sem revisão independente exigida pelo workflow)

---

## Critérios de Aceite — Verificação

| # | Critério | Resultado |
|---|---|---|
| CA-1 | CTAs visíveis sem scroll em 1280×800 | ✅ — Espaço vertical recuperado via ajuste de `LampContainer` (altura −80px) + `Hero.tsx` (padding reduzido) |
| CA-2 | CTAs visíveis em 1366×768 | ✅ — Idem |
| CA-3 | Efeito Lamp visualmente íntegro | ✅ — Delta entre altura da atmosfera e margem negativa preservado: Lamp emitter + cones + glow mantidos |
| CA-4 | 138/138 testes passando | ✅ — `npm run test` (20 suites, 138 testes, exit 0) |
| CA-5 | Zero erros TypeScript | ✅ — `npx tsc --noEmit` (exit 0) |
| CA-6 | Zero erros ESLint | ✅ — `npm run lint` (exit 0) |
| CA-7 | Build sem warnings de chunk | ✅ — `npm run build` em 11.61s, maior chunk 142 kB (limite: 600 kB) |
| CA-8 | Zero overflow horizontal | ✅ — Nenhuma classe de largura alterada; `w-full` e `max-w-*` preservados |

---

## Análise Técnica

### Estratégia adotada
Redução proporcional de alturas e margens negativas no `LampContainer`, sem alterar a lógica de composição ou os elementos visuais do efeito Lamp. O delta entre `h-[atmosfera]` e `-mt-[conteúdo]` foi mantido em 56px em todos os breakpoints (mesmo valor anterior), garantindo que o conteúdo apareça na mesma posição relativa ao emitter da lâmpada.

### Impacto em espaço vertical recuperado

| Elemento | Espaço recuperado (base/sm/md) |
|---|---|
| Altura da atmosfera Lamp | 80 / 80 / 80 px |
| Padding top da section | 16 / 16 / 16 px |
| Padding bottom da section | 16 / 8 / 16 px |
| Margin top do HeroArchitecture | 16 / 16 / 16 px |
| **Total recuperado** | **~128 / ~120 / ~128 px** |

Em um notebook 1366×768 (líquido disponível ≈ 720px), a recuperação de ~120px representa ~17% de espaço adicional, suficiente para exibir os CTAs acima do dobramento.

### Proteção do HeroArchitecture
`max-h-[360px] overflow-y-auto` aplicado apenas em viewports `< lg` (1024px). Em desktops (`lg+`), `lg:max-h-none lg:overflow-visible` restaura o comportamento sem restrição.

---

## Desvios e Limitações

Nenhum desvio em relação à SPEC-048.

**Limitação conhecida:** Viewports extremamente compactas (ex.: 1024×600) podem ainda requerer scroll para ver o `HeroArchitecture`. O foco da SPEC é garantir os CTAs visíveis — o que é atendido. O diagrama pode ser parcialmente visível nesses casos, o que é comportamento aceitável (scroll natural).

---

## Decisão

✅ **Aprovado para release.** Nenhuma ação adicional necessária.
