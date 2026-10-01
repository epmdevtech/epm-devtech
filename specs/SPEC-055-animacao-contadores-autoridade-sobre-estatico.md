# SPEC-055 — Animação dos Contadores em Experiência/Autoridade e Número Estático em Sobre

## Metadados
- **ID:** SPEC-055
- **Título:** Transferência e padronização da animação de contadores (count-up) para a seção de Experiência e Contexto (Autoridade) e fixação estática do número de experiência na seção Sobre a Empresa
- **Data:** 2026-09-30
- **Autor:** Gemini/Antigravity
- **PO:** Elessandro Prestes Macedo
- **Status:** Aprovado (Diretiva do PO)

---

## 1. Contexto e Motivação

1. **Seção "Experiência e contexto" (`Authority.tsx`)**:
   - Apresenta as 4 métricas técnicas de projetos anteriores da liderança técnica (`99,9%`, `2.500 RPS`, `100%`, `−35%`).
   - Até o momento, os números eram exibidos de forma estática com apenas um fade-in no container.
   - O PO determinou aplicar a animação de contagem gradual (count-up fluido via `requestAnimationFrame` com curva de desaceleração `ease-out`) nesses 4 indicadores ao entrarem no viewport.

2. **Seção "Sobre a empresa" (`About.tsx`)**:
   - Apresentava um único indicador animado (`+9` anos de experiência técnica).
   - O PO determinou que este número passe a ser **estático**, eliminando a animação de contagem nessa seção e mantendo o destaque visual sóbrio.

---

## 2. Especificação Técnica

### 2.1 Componente Canônico `CountUp` (`src/components/ui/CountUp.tsx`)
- Extrair o motor de animação de contagem para um componente utilitário reutilizável:
  - Props:
    - `end: number` (valor alvo)
    - `duration?: number` (duração em segundos, default `2`)
    - `decimals?: number` (número de casas decimais, default `0`)
    - `prefix?: string` (prefixo textual/simbólico, ex.: `\u2212`)
    - `suffix?: string` (sufixo textual/simbólico, ex.: `%`, ` RPS`)
    - `formatThousands?: boolean` (separador de milhar pt-BR com ponto `.`)
    - `isCounting: boolean` (disparo atrelado a `useInView`)
- Comportamento:
  - Animação via `requestAnimationFrame` com curva `easeOut = 1 - (1 - ratio)^2`.
  - Respeito a `prefers-reduced-motion: reduce`: renderiza o valor final imediatamente, sem animação.
  - Compatibilidade com ambiente de testes (`process.env.NODE_ENV === "test"`): renderiza o valor final imediatamente.
  - Acessibilidade: o elemento animado recebe `aria-hidden="true"`, enquanto leitores de tela leem o valor final via `sr-only` ou label acessível.

### 2.2 Seção `Authority.tsx`
- Integrar `CountUp` aos 4 indicadores:
  1. **`99,9%`**: `end={99.9}`, `decimals={1}`, `suffix="%"`. Acessível: `"99,9%"`.
  2. **`2.500 RPS`**: `end={2500}`, `formatThousands={true}`, `suffix=" RPS"`. Acessível: `"2.500 RPS"`.
  3. **`100%`**: `end={100}`, `decimals={0}`, `suffix="%"`. Acessível: `"100%"`.
  4. **`−35%`**: `end={35}`, `prefix="\u2212"`, `suffix="%"`. Acessível: `"redução de 35%"`.
- Disparo: ativado quando `isInView` for verdadeiro (viewport observer de `framer-motion`).

### 2.3 Seção `About.tsx`
- Remover `CountUp` e a lógica de incremento dinâmico de `About.tsx`.
- Renderizar o número `+9` de forma estática direta no DOM:
  - Mantém o estilo visual (`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary`).
  - Label: `"anos de experiência técnica"`.
  - Atributo `data-testid="animated-stat"` mantido para conformidade com testes de regressão.

---

## 3. Critérios de Aceite e Quality Gates

1. `npx tsc --noEmit`: 0 erros.
2. `npm run lint`: 0 erros / 0 warnings.
3. `npm run test`: 100% dos testes unitários passando.
4. `npm run test:coverage`: Cobertura global ≥ 90%.
5. `npm run test:e2e`: 100% dos testes Playwright passando.
6. `npm run build`: Compilação limpa sem chunks > 600KB.
