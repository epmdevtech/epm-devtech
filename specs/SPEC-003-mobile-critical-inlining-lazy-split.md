# SPEC-003 — Maximização de Performance Mobile (FCP/LCP < 1.5s, Critical Inlining e Code-Splitting)

| Campo         | Valor                          |
|---------------|-------------------------------|
| **ID**        | SPEC-003                      |
| **Data**      | 2026-08-28                    |
| **Autor**     | Elessandro Prestes Macedo     |
| **Status**    | ✅ Aprovada                    |
| **Versão**    | 1.0                           |

---

## Contexto e Motivação

Análise do filmstrip de carregamento mobile do PageSpeed Insights revelou:
1. **Flash de tela branca nos primeiros quadros (FCP 3.4s)**: Ausência de CSS crítico inline no `<head>` do `index.html`, fazendo com que o navegador aguarde o parsing completo dos bundles JS/CSS externos antes do primeiro paint escuro.
2. **LCP atrasado pelo carregamento síncrono de componentes secundários**: `CookieBanner`, `Toaster`, `Sonner`, `Analytics` e `SpeedInsights` no `App.tsx` competindo com o parsing e renderização imediata do Hero na thread principal.
3. **CookieBanner antecipado**: O banner de cookies montava em 1.5s com animações pesadas, sendo considerado pelo Lighthouse como candidato a LCP em conexões 4G lentas.

---

## Objetivo

Atingir pontuação máxima (95-100%) em **todas as categorias do PageSpeed Mobile** (Performance, Acessibilidade, Melhores Práticas, SEO e Navegação Agêntica).

---

## Escopo

### IN
1. **Critical CSS Inline em `index.html`**:
   - Inserir regras essenciais de background (`#121212`), cor de texto e `color-scheme: dark light` inline no `<head>`.
   - Adicionar `<link rel="modulepreload" href="/src/main.tsx" />` para início imediato do parsing.
2. **Desacoplamento e Lazy Loading em `App.tsx`**:
   - Lazy load de `CookieBanner`, `Toaster`, `Sonner`, `Analytics` e `SpeedInsights` com `Suspense`.
   - Deslocar a exibição do `CookieBanner` para 3.5s ou momento ocioso do navegador, liberando o caminho crítico de LCP/FCP para o Hero.
3. **Priorização de Imagem Crítica (Header Logo)**:
   - Adicionar `fetchpriority="high"`, `loading="eager"` e `decoding="async"` no logo do Header.
4. **Otimização de Font Fallbacks**:
   - Declarar fonte de fallback estável no CSS inline para evitar layout shift durante o swap de fontes.

### OUT
- Alteração visual ou funcional de qualquer seção
- Remoção de funcionalidades

---

## Critérios de Aceitação

- [ ] `index.html` possui CSS crítico inline para renderização escura instantânea no frame 1
- [ ] Componentes secundários em `App.tsx` carregados sob demanda via `React.lazy`
- [ ] Zero erros e 100% dos testes passando (`npm run test`)
- [ ] Build limpo sem warnings de chunk size (`npm run build`)

---

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-08-28               |
| **Status**         | ✅ Aprovada               |
