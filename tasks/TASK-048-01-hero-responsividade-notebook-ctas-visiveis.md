# TASK-048-01 — Hero: Responsividade Notebook — CTAs Sempre Visíveis

> **Status:** ✅ Completed — 2026-09-28
> **Spec-Ref:** SPEC-048  
> **Criado em:** 2026-09-28  
> **Agente:** AI Agent (Antigravity)

---

## Escopo

Ajustar espaçamentos verticais do `LampContainer`, `Hero.tsx` e `HeroArchitecture.tsx` para garantir que os CTAs sejam visíveis sem scroll em viewports de notebook (1280×800, 1366×768).

## Arquivos a modificar

| Arquivo | Mudança |
|---|---|
| `src/components/ui/lamp.tsx` | Reduz altura da atmosfera e margem negativa |
| `src/components/sections/Hero.tsx` | Reduz `pt` da section e `mt` do HeroArchitecture |
| `src/components/sections/hero/HeroArchitecture.tsx` | Adiciona `max-h` + `overflow-y-auto` em viewports `< lg` |

## Quality Gates

- [x] `npm run test` — 138/138 testes passando (20 suites)
- [x] `npx tsc --noEmit` — zero erros
- [x] `npm run lint` — zero erros
- [x] `npm run build` — build limpo, maior chunk 142 kB (< limite 600 kB)

## Evidências

| Gate | Resultado |
|---|---|
| Testes unitários | ✅ 138/138 (20 suites) |
| TypeScript | ✅ 0 erros |
| ESLint | ✅ 0 erros |
| Build | ✅ Built in 11.61s, sem warnings de chunk |

### Mudanças implementadas

| Arquivo | Mudança |
|---|---|
| `src/components/ui/lamp.tsx` | Altura da atmosfera: `280/320/360px` → `200/240/280px`; margem negativa: `-mt-44/-mt-52/-mt-60` → `-mt-32/-mt-40/-mt-48` |
| `src/components/sections/Hero.tsx` | `pt-20/24/28` → `pt-16/20/24`; `pb-14/16/24` → `pb-10/14/20`; `mt-12/16/20` → `mt-8/12/16` |
| `src/components/sections/hero/HeroArchitecture.tsx` | `max-h-[360px] overflow-y-auto` em `< lg`; `lg:max-h-none lg:overflow-visible` em desktops |
