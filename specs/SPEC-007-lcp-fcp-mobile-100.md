# SPEC-007 — LCP/FCP Mobile 100: H1 Visibilidade Imediata e Logo DPR-Otimizado

| Campo         | Valor                          |
|---------------|-------------------------------|
| **ID**        | SPEC-007                      |
| **Data**      | 2026-08-31                    |
| **Autor**     | Elessandro Prestes Macedo     |
| **Status**    | ✅ Aprovada                    |
| **Versão**    | 1.0                           |

---

## Contexto e Motivação

Relatório Lighthouse Mobile (31/08/2026 09:13) — score 88/100. Os dois problemas causadores:

### Problema 1 — LCP atrasado pelo opacity-0 do h1 (impacto: -17 pontos)
O `<h1>` do Hero tem `opacity-0` + `animationDelay: 100ms`. O Lighthouse mede LCP como o momento
em que o maior elemento se torna VISÍVEL (opacity > 0), não quando está no DOM. Resultado: LCP
só é registrado após 100ms de delay + duração da animação = ~700ms extras de penalidade.

### Problema 2 — Logo carregando sm.webp (9.3 KiB) em mobile de alta densidade
O srcset usa descritores de densidade (`1x`/`2x`). O Moto G Power tem DPR ~2.6,
então o browser escolhe o descritor `2x` = `logo-emp-dev-tech-sm.webp` (9.3 KiB).
Solução: usar descritores de largura (`w`) com `sizes` para que o browser calcule
o tamanho correto e use o xs.webp.

---

## Objetivo

Elevar o score mobile de 88 → 95-100 através de:
1. Tornar o h1 visível imediatamente quando renderizado pelo React (sem delay de LCP)
2. Corrigir o srcset do logo para usar descritores `w`, garantindo xs.webp em todos os devices
3. Adicionar preload do logo como image resource no index.html
4. Pré-renderizar o conteúdo crítico do Hero como HTML estático no index.html para FCP antes do JS

---

## Escopo

### IN
1. `src/components/sections/Hero.tsx`:
   - Remover `opacity-0` e `animationDelay` do h1 (LCP element)
   - h1 deve ser visível imediatamente ao renderizar, sem transição de opacidade
   - Subtitle e CTA podem manter animações (não são LCP)

2. `src/components/layout/Header.tsx`:
   - Corrigir srcset para usar descritores `w` com `sizes`
   - `srcset="/logo-emp-dev-tech-xs.webp 149w, /logo-emp-dev-tech-sm.webp 300w"`
   - `sizes="(max-width: 640px) 83px, 95px"` — tamanhos reais exibidos

3. `index.html`:
   - Adicionar `<link rel="preload" as="image">` para o logo xs
   - Adicionar HTML estático dentro de `#root` com o h1 visível antes do JS carregar
     (React substitui ao montar, mas FCP registra o paint inicial)

### OUT
- Modificação de outras seções além do Hero
- Remoção de animações do subtitle ou CTA

---

## Critérios de Aceitação

- [ ] LCP < 2.5s no Lighthouse Mobile emulado
- [ ] FCP < 1.8s no Lighthouse Mobile emulado
- [ ] Logo usando xs.webp (3 KiB) confirmado pelo relatório
- [ ] 80 testes passando
- [ ] Build limpo sem erros

---

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-08-31               |
| **Status**         | ✅ Aprovada               |
