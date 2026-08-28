# SPEC-001 — Otimizações de Performance, Acessibilidade e Navegação Agêntica

| Campo         | Valor                          |
|---------------|-------------------------------|
| **ID**        | SPEC-001                      |
| **Data**      | 2026-08-28                    |
| **Autor**     | Elessandro Prestes Macedo     |
| **Status**    | ✅ Aprovada                    |
| **Versão**    | 1.0                           |

---

## Contexto e Motivação

Relatório Lighthouse Mobile (28/ago/2026) registrou:
- **Performance: 71** (meta: ≥ 90)
- **Acessibilidade: 96** (meta: 100)
- **Navegação Agêntica: 2/3** (faltando `llms.txt`)

Métricas críticas:
| Métrica | Atual  | Meta   |
|---------|--------|--------|
| FCP     | 3,4 s  | < 1,8s |
| LCP     | 4,8 s  | < 2,5s |
| TBT     | 80 ms  | < 200ms|
| CLS     | 0,057  | < 0,1  |
| SI      | 5,3 s  | < 3,4s |

---

## Objetivo

Elevar o score de Performance Mobile de **71 → ≥ 85** e corrigir os problemas de acessibilidade e navegação agêntica identificados, sem alterar funcionalidades existentes.

---

## Escopo

### IN
1. Adicionar `fetchpriority="high"` e `preload` para recursos críticos do Hero (LCP/FCP)
2. Corrigir animações não-compostas no Hero (`scale` via `useTransform`) usando `will-change: transform`
3. Adicionar `preconnect` para o CDN de ícones devicons (LCP/FCP)
4. Criar `/public/llms.txt` para navegação agêntica (score 3/3)
5. Corrigir contraste insuficiente nos textos `muted-foreground` em light mode (Acessibilidade)
6. Adicionar `font-display: swap` inline ao carregamento da fonte Geist (FCP)
7. Adicionar `content-visibility: auto` nas seções below-the-fold (SI/LCP)
8. Substituir o `android-chrome-512x512.png` de 207KB por versão otimizada via atributo `sizes` no webmanifest (imagem entrega)
9. Adicionar `will-change: transform` nas faixas de scroll do Technologies (animações compostas)

### OUT
- Redesign visual
- Mudança de comportamento de nenhuma seção
- Alteração nos textos/conteúdo
- Mudança de stack

---

## Requisitos Funcionais

1. O Hero deve ter LCP < 2,5s em mobile (4G lento)
2. O arquivo `/llms.txt` deve estar acessível em `https://epmdevtech.com.br/llms.txt`
3. As animações de scroll do Technologies não devem causar repaints desnecessários
4. O contraste de texto em light mode deve atingir razão ≥ 4.5:1
5. A fonte Geist deve ter `font-display: swap` para não bloquear FCP

## Requisitos Não-Funcionais

| Requisito        | Critério                                  |
|------------------|-------------------------------------------|
| Build            | Sem novos warnings de chunk > 600KB       |
| Testes           | Todos os testes existentes continuam passando |
| Zero regressão   | Nenhuma funcionalidade existente é quebrada |

---

## Critérios de Aceitação

- [ ] `npm run build` passa sem erros
- [ ] `npm run test` passa (zero regressão)
- [ ] `/public/llms.txt` existe e tem conteúdo válido
- [ ] Hero tem `fetchpriority` no elemento de LCP quando aplicável
- [ ] `preconnect` para `cdn.jsdelivr.net` e `cdn.simpleicons.org` presente no `index.html`
- [ ] `will-change: transform` nas `.tech-band-track`
- [ ] Contraste de `muted-foreground` em light mode ≥ 4.5:1

---

## Impactos

### Arquivos a modificar
- `index.html` — preconnect CDN, font-display, preload hero
- `src/index.css` — content-visibility, will-change, contraste muted-foreground light mode
- `src/components/sections/Technologies.tsx` — will-change na animação CSS

### Arquivos a criar
- `public/llms.txt` — arquivo de navegação agêntica

---

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-08-28               |
| **Status**         | ✅ Aprovada               |
