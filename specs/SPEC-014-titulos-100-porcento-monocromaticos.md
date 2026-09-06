# SPEC-014 — Títulos 100% Monocromáticos e Tipografia Linear B2B

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Títulos 100% Monocromáticos e Tipografia Linear B2B                  |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

Nas iterações anteriores, os títulos das seções principais (Hero, Serviços, Tecnologias, Diferenciais, Contato, Sobre e Autoridade) utilizavam estilo bicolor — metade da frase em texto monocromático (`text-zinc-900 dark:text-white`) e a outra metade colorida com destaque em verde esmeralda (`text-emerald-600 dark:text-emerald-400`).

Embora o tom de verde fosse o da marca institucional, títulos bicolores com quebra cromática no meio da frase quebram a linearidade visual, fragmentam a fluidez de leitura e remetem a padrões ultrapassados de landing pages. Marcas de alta maturidade visual B2B de engenharia de software e infraestrutura (como Stripe, Linear, Vercel e GitHub) utilizam **títulos 100% monocromáticos de ponta a ponta**, restringindo a cor primária de destaque (verde) estritamente a:
1. Badges e overlines de categoria/posicionamento;
2. Botões primários de ação (CTAs);
3. Pontos de foco interativos (foco acessível, indicadores de status e pulso).

---

## 2. Requisitos e Contrato Visual

### 2.1 Regras Absolutas para Títulos (H1, H2, H3)
- **Monocromático Estrito (Cor única do início ao fim):**
  - **Light Mode:** 100% em preto neutro de alto contraste (`text-zinc-900`).
  - **Dark Mode:** 100% em branco/off-white (`dark:text-white`).
- **Proibição de Elementos e Classes Internas:**
  - Proibido qualquer tag `<span>` que altere a cor de palavras no meio do título.
  - Proibidas classes de gradiente (`bg-clip-text`, `text-transparent`, `bg-gradient-*`).
  - Proibidas classes de cor primária ou secundária (`text-emerald-*`, `text-green-*`, `text-teal-*`, `text-primary`) dentro do texto de títulos.
- **Linearidade Tipográfica:**
  - Peso uniforme em todo o título: `font-bold`.
  - Tracking compacto e consistente: `tracking-tight`.
  - Altura de linha: `leading-[1.15]` (Hero H1) e `leading-tight` (Seções H2).
  - Escala Hero (H1): `text-4xl sm:text-5xl lg:text-6xl`.
  - Escala Seções Internas (H2): `text-3xl sm:text-4xl`.

### 2.2 Padrão Visual do Cabeçalho de Seção (`SectionHeader`)
1. **Tagline / Badge Superior (Único ponto de cor acima do título):**
   - Classes: `inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full uppercase tracking-wider font-semibold text-xs`
   - Light Mode: `bg-emerald-50 text-emerald-700 border border-emerald-200/70`
   - Dark Mode: `dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60`
2. **Título (Monocromático e Linear):**
   - H1: `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6`
   - H2: `text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4`
3. **Subtítulo / Descrição:**
   - Classes: `text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal max-w-2xl mx-auto` (ou `text-left max-w-2xl` quando `align="left"`)

### 2.3 Copywriting PT-BR
- Sem travessões longos (`—`) ou meia-risca (`–`).
- Pontuação culta brasileira (vírgulas, dois-pontos, parênteses e pontos finais).

---

## 3. Matriz de Títulos Monocromáticos por Seção

| Seção | Tag | Título Anterior (Bicolor) | Novo Título (100% Monocromático) |
|---|---|---|---|
| **Hero** | `h1` | `Software sob medida <span>construído para escalar</span> o seu negócio.` | `Software sob medida construído para escalar o seu negócio.` |
| **Serviços** | `h2` | `Soluções <span>End-to-End</span>` | `Soluções End-to-End` |
| **Tecnologias** | `h2` | `Tecnologias <span>Modernas</span>` | `Tecnologias Modernas` |
| **Diferenciais** | `h2` | `Por Que Escolher a <span>EPM DEVTECH</span>` | `Por Que Escolher a EPM DEVTECH` |
| **Contato** | `h2` | `Vamos Construir <span>Juntos</span>` | `Vamos Construir Juntos` |
| **Sobre** | `h2` | `Engenharia de Software com <span>Excelência Técnica</span>` | `Engenharia de Software com Excelência Técnica` |
| **Autoridade** | `h2` | `Autoridade Técnica que <span>Gera Resultados</span>` | `Autoridade Técnica que Gera Resultados` |

---

## 4. Quality Gates
1. **Vitest:** Cobertura de testes $\ge 90\%$ e 100% de testes unitários passando.
2. **Playwright E2E:** 100% dos testes E2E passando no Chromium, com asserção específica garantindo ausência de spans ou classes coloridas dentro de `h1`, `h2` e `h3`.
3. **ESLint:** 0 erros e 0 warnings.
4. **Vite Build:** Compilação de produção sem alertas de chunks $> 600\text{ KB}$.
5. **Acessibilidade:** WCAG AA/AAA mantido com contraste monocromático $\ge 12:1$ em Dark e Light Mode.
