# SPEC-098 — Correção do Atributo SVG `r` em `<circle>` / `<motion.circle>` na Constelação de `/sobre`

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / SVG / Animação / Framer Motion / React / Acessibilidade
- **Diagnóstico:** `Error: <circle> attribute r: Expected length, "undefined".` ao carregar `/sobre`.

---

## 1. Contexto e Diagnóstico

Ao acessar a rota `/sobre`, o navegador emite exatamente dois erros críticos no console:
```
Error: <circle> attribute r: Expected length, "undefined".
Error: <circle> attribute r: Expected length, "undefined".
```

### Causa Raiz Técnica
Em `src/components/sections/EpmConstellation.tsx` (linhas 103 e 112), os elementos de pulso sonar central são definidos assim:
```tsx
<motion.circle
  cx={300}
  cy={300}
  fill="none"
  className="stroke-teal-700/30 dark:stroke-teal-400/40"
  strokeWidth={1.2}
  animate={{ r: [15, 80], opacity: [0.6, 0] }}
  transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
/>
<motion.circle
  cx={300}
  cy={300}
  fill="none"
  className="stroke-teal-700/20 dark:stroke-teal-400/30"
  strokeWidth={0.8}
  animate={{ r: [15, 120], opacity: [0.4, 0] }}
  transition={{ duration: 3.6, repeat: Infinity, delay: 1.8, ease: "easeOut" }}
/>
```
Na especificação W3C SVG e no modelo de renderização do Framer Motion:
1. O elemento `<circle>` exige o atributo `r`. Como a prop `r` foi omitida do JSX, o elemento SVG é montado inicialmente com `r="undefined"`.
2. Além disso, nos nós mapeados da constelação (linhas 224 a 285), os raios dinâmicos calculados via proximidade do cursor (`haloRadius` e `nodeRadius`) devem possuir garantias defensivas estritas (`r={haloRadius || (node.r ?? 3) * 2.8}` e `r={nodeRadius || node.r || 3}`).

---

## 2. Escopo da Solução

### 2.1 Em Escopo

1. **Atribuição da prop `r` nos Pulsos Sonar de `src/components/sections/EpmConstellation.tsx`**:
   - Definir explicitamente o raio inicial `r={15}` em ambos os elementos `<motion.circle>` de pulso sonar.
   - Fornecer `initial={{ r: 15, opacity: 0.6 }}` para inicialização estrita do Framer Motion, evitando qualquer momento em que o atributo `r` avalie como `undefined`.

2. **Garantia Defensiva em Todos os Nós e Halos de `EpmConstellation.tsx`**:
   - No Halo difuso (`<motion.circle>`):
     `r={haloRadius || (node.r ?? 3) * 2.8 || 8}`
   - No Núcleo estelar (`<motion.circle>`):
     `r={nodeRadius || node.r || 3}`
   - No Ponto central dos nós chave (`<circle>`):
     `r={(nodeRadius || node.r || 3) * 0.45 || 1.5}`

3. **Validação Automatizada de Console**:
   - Teste de integração / E2E com Playwright navegando para `/sobre` e garantindo **zero erros de console** (`consoleErrors.length === 0`).
   - Teste unitário em `EpmConstellation.test.tsx` verificando que todos os círculos renderizados no DOM possuem atributo `r` numérico válido diferente de `undefined` ou `NaN`.

---

## 3. Critérios de Aceite

1. Navegar para a rota `/sobre` deve produzir **zero erros** de `<circle> attribute r: Expected length, "undefined"` no console do navegador.
2. A animação visual do pulso sonar e a respiração dos nós estelares devem permanecer esteticamente perfeitas e fluidas.
3. Respeito integral a `prefers-reduced-motion` mantido.
4. 100% de aprovação nos Quality Gates (`tsc`, `lint`, `vitest`, `playwright`, `build`).
