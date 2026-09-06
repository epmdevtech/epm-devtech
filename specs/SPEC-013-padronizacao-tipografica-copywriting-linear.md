# SPEC-013 — Padronização Tipográfica Linear & Copywriting PT-BR

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-013                                   |
| **Data**      | 2026-09-06                                 |
| **Autor**     | Gemini/Antigravity                         |
| **PO**        | Elessandro Prestes Macedo                  |
| **Status**    | ✅ Aprovada                                |
| **Versão**    | 1.0                                        |

---

## 1. Contexto e Motivação

O site institucional da **EPM DEVTECH** apresentava variações tipográficas não padronizadas entre as seções, especialmente títulos misturando palavras de pesos antagônicos (`font-light` combinado com `font-semibold` na mesma frase), além de badges/overlines com marcações heterogêneas e ocorrências de travessões longos (`—`) no meio dos textos, característicos de padrões gerados por IA.

Para estabelecer um padrão visual rigorosamente linear, limpo e corporativo de Engenharia de Software Sênior, faz-se necessária uma unificação sistemática de:
1. **Contrato Tipográfico de Cabeçalhos de Seção**: Linearidade de peso (`font-bold`) e escala uniforme sem quebras abruptas de espessura, com contrastes controlados em Light Mode e Dark Mode.
2. **Copywriting em Português Brasileiro (PT-BR)**: Substituição de travessões (`—` / `–`) por pontuação natural (vírgulas, dois-pontos, ponto final e parênteses) e microcopy direto em imperativos e substantivos objetivos.
3. **Componente Reutilizável de Cabeçalho**: Criação de `SectionHeader` para centralizar a governança visual de títulos, badges e subtítulos.

---

## 2. Contrato de Design System Tipográfico

Todos os blocos de cabeçalho (Hero, Sobre, Serviços, Tecnologias, Diferenciais, Autoridade e Contato) devem aderir estritamente a este contrato:

### 2.1. Tagline / Badge Superior (Overline)
- **Tipografia:** Caixa alta (`uppercase`), tracking levemente aberto (`tracking-wider`), peso médio (`font-semibold`), tamanho reduzido (`text-xs sm:text-sm`).
- **Cores & Moldura:**
  - **Light Mode:** Fundo sutil com transparência (`bg-emerald-50`), borda fina (`border border-emerald-200/70`), texto primário (`text-emerald-700`).
  - **Dark Mode:** Fundo escuro sutil (`dark:bg-emerald-950/50`), borda discreta (`dark:border-emerald-800/60`), texto em destaque (`dark:text-emerald-400`).
- **Elemento Indicador:** Dot pulsante institucional opcional (`w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse`).

### 2.2. Título da Seção (H1 na Hero / H2 nas Seções Internas)
- **Linearidade Absoluta:** Mesma família tipográfica, mesmo tamanho e mesmo peso (`font-bold`) em toda a extensão do título. Proibido mesclar `font-light` ou `font-thin` com `font-semibold` ou `font-bold` no mesmo cabeçalho.
- **Tipografia & Métrica:** `font-bold`, `tracking-tight`, altura de linha controlada (`leading-[1.15]` ou `leading-tight`).
- **Escala de Tamanho:**
  - **Hero (H1):** `text-4xl sm:text-5xl lg:text-6xl`.
  - **Seções Internas (H2):** `text-3xl sm:text-4xl`.
- **Cores & Destaques:**
  - **Light Mode:** Cor base em preto neutro (`text-zinc-900`). Palavras destacadas em tom primário (`text-emerald-600`), mantendo a mesma fonte e o peso `font-bold`.
  - **Dark Mode:** Cor base em branco/off-white (`dark:text-white`), palavras destacadas em tom primário claro (`dark:text-emerald-400`), mantendo `font-bold`.

### 2.3. Subtítulo / Descrição
- **Tipografia:** Regular (`font-normal`), escala equilibrada (`text-base sm:text-lg`), entrelinha confortável (`leading-relaxed`), largura máxima contida (`max-w-2xl` ou `max-w-3xl mx-auto`).
- **Cores:**
  - **Light Mode:** `text-zinc-600`.
  - **Dark Mode:** `dark:text-zinc-400`.

---

## 3. Regras de Copywriting & PT-BR

1. **Eliminação de Travessão (`—`) e Meia-Risca (`–`):**
   - Substituição contextual por vírgulas, dois-pontos, ponto final ou parênteses, priorizando fluidez e elegância técnica em PT-BR.
2. **Tom de Voz Sênior & B2B:**
   - Comunicação clara, concisa e focada em resultados empresariais (segurança, escalabilidade, engenharia sob medida, código limpo).
3. **Microcopy Direto & Objetivo:**
   - Botões com verbos imperativos ou substantivos diretos:
     - Hero CTA Primário: `Falar com especialista`
     - Hero CTA Secundário: `Ver serviços`
     - Form Submit: `Enviar mensagem`

---

## 4. Escopo da Implementação

### IN
- `src/components/ui/SectionHeader.tsx`: Componente reutilizável padronizado para cabeçalhos de seção.
- `src/components/ui/__tests__/SectionHeader.test.tsx`: Testes unitários do componente de cabeçalho.
- `src/components/sections/Hero.tsx`: H1 linear `font-bold`, overline padronizado, microcopy atualizado.
- `src/components/sections/Services.tsx`: Adoção do `SectionHeader`, remoção de travessões.
- `src/components/sections/Technologies.tsx`: Adoção do `SectionHeader`, remoção de travessões.
- `src/components/sections/Differentials.tsx`: Adoção do `SectionHeader`, revisão de copy sem travessões.
- `src/components/sections/Contact.tsx`: Adoção do `SectionHeader`, revisão de copy e title sem travessões.
- `src/components/sections/About.tsx`: Harmonização de cabeçalho e revisão de copy sem travessões.
- `src/components/sections/Authority.tsx`: Harmonização de cabeçalho e revisão de copy sem travessões.
- Atualização e adequação dos testes unitários e E2E correspondentes.

### OUT
- Não alterar a lógica funcional de formulários, do grafo de constelação ou do botão de rolagem.
- Não introduzir dependências externas de estilização.

---

## 5. Critérios de Aceitação

- [x] Zero ocorrências de travessão longo (`—`) ou meia-risca (`–`) nos textos visíveis das seções.
- [x] Todos os títulos (H1 e H2) possuem peso consistente e linear (`font-bold`), sem quebra de peso entre palavras.
- [x] O componente `SectionHeader` atende rigorosamente às classes de light mode e dark mode especificadas.
- [x] CTAs com microcopy direto ("Falar com especialista", "Ver serviços").
- [x] Cobertura de testes unitários ≥ 90% mantida.
- [x] 100% dos testes E2E do Playwright passando.
- [x] Zero erros de ESLint e build de produção limpo.
