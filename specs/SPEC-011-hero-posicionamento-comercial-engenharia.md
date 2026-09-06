# SPEC-011 — Hero: Posicionamento Comercial & Engenharia Sênior

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-011                                   |
| **Data**      | 2026-09-06                                 |
| **Autor**     | Gemini/Antigravity                         |
| **PO**        | Elessandro Prestes Macedo                  |
| **Status**    | ✅ Aprovada                                |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

A seção Hero (`src/components/sections/Hero.tsx`) é o ponto de contato primordial com tomadores de decisão (CTOs, Tech Leads, Product Owners e Diretores de Operações). Anteriormente, a copy e o layout focavam de forma genérica em "Soluções Digitais Sob Medida Para Sua Empresa" com apenas um botão único para `#servicos`.

Para maximizar a taxa de conversão e alinhar a comunicação com uma Software House de alto padrão de engenharia e foco em resultados de negócio, adota-se a **Opção 1: Foco em Negócio + Engenharia Sênior (Mais Equilibrada e Comercial)**.

---

## Objetivo

Implementar a reformulação da copy, hierarquia de conversão e elementos de microprova social da seção Hero:
1. Inclusão da **Tagline superior** destacando especialização técnica.
2. Novo **H1 de alto impacto** focado em escala de negócio e software sob medida.
3. **Subtítulo expandido** cobrindo ciclo completo (concepção, sistemas web, APIs resilientes, infraestrutura e alta performance).
4. **Dual CTA (Dois Botões de Ação)**:
   - CTA Primário: Direcionado para conversão imediata (`#contato`).
   - CTA Secundário: Exploração técnica das soluções (`#servicos`).
5. **Microprova Social e Diferenciais Técnicos**: Linha discreta de autoridade com tempo de mercado e pilares de engenharia.
6. Preservação integral do Core Web Vitals (LCP imediato sem delays no H1) e design monocromático de alta fidelidade da SPEC-008.

---

## Especificação de Conteúdo e Interface

### 1. Tagline Superior
- **Texto**: `ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO`
- **Componente Visual**: Badge em pílula translúcida com indicador pulsante sutil (`animate-pulse`), tipografia mono reduzida e borda com a cor primária da marca.

### 2. Título Principal (H1)
- **Texto**: `Software sob medida construído para escalar o seu negócio.`
- **Estilo**: Rigorosamente monocromático em `text-foreground` e `text-muted-foreground`, sem gradientes de texto, combinando `font-light` com `font-semibold` para criar contraste de alta sofisticação.
- **Performance**: Visibilidade imediata no DOM (sem `opacity-0` inicial) para garantir LCP ótimo (conforme SPEC-007).

### 3. Subtítulo
- **Texto**: `Da concepção à infraestrutura: desenvolvemos sistemas web, APIs resilientes e arquiteturas de alta performance preparadas para acompanhar o crescimento da sua empresa.`
- **Estilo**: `text-muted-foreground`, `max-w-2xl` / `max-w-3xl`, `leading-relaxed`.

### 4. Dual CTA (Ações de Conversão)
- **Botão Primário**:
  - **Texto**: `Falar sobre meu projeto`
  - **Href**: `#contato`
  - **Ícone**: `MessageSquare` ou `ArrowRight`
  - **Estilo**: Botão preenchido em verde oficial (`bg-primary`), texto branco, sombra suave de destaque.
- **Botão Secundário**:
  - **Texto**: `Conhecer serviços`
  - **Href**: `#servicos`
  - **Ícone**: `Code2`
  - **Estilo**: Botão outline translúcido com borda discreta e hover sutil.

### 5. Microprova Social
- **Texto**: `+9 anos de experiência em sistemas críticos • Arquiteturas cloud-native • APIs resilientes • Código limpo`
- **Estilo**: Linha horizontal em `text-xs`, tipografia mono/sans discreta, cor `text-muted-foreground`, ícone sutil de confiabilidade (`CheckCircle2` ou bullet points elegantes).

---

## Escopo

### IN
- `src/components/sections/Hero.tsx`: Atualização de estrutura, copy, Tagline, H1, Dual CTA e Microprova Social.
- `src/components/sections/__tests__/Hero.test.tsx`: Atualização dos testes unitários para a nova copy e links.
- `e2e/design-system-and-stability.spec.ts`: Atualização das asserções de H1 e CTAs nos testes Playwright.
- `tasks/TASK-011-hero-posicionamento-comercial-engenharia.md`: Registro da tarefa SDD.
- `reviews/QA-011.md`: Evidências de QA e validação dos quality gates.
- `PROJECT.md` e `CHANGELOG.md`: Atualizações de estado e histórico de versão.

### OUT
- Não alterar as seções posteriores (Sobre, Serviços, Tecnologias, etc.).
- Não adicionar bibliotecas pesadas de terceiros.

---

## Critérios de Aceitação

- [x] Tagline "ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO" visível acima do H1.
- [x] H1 com o texto "Software sob medida construído para escalar o seu negócio."
- [x] Subtítulo atualizado e legível em dispositivos móveis e desktop.
- [x] Dual CTA presente: Primário direcionando para `#contato` e Secundário para `#servicos`.
- [x] Microprova social presente e visível abaixo dos botões de ação.
- [x] Vitest 91/91 testes passando com cobertura ≥ 90%.
- [x] Playwright E2E 7/7 testes passando.
- [x] Zero erros no ESLint e build de produção limpo.

---

## Aprovação

| Campo              | Valor                     |
|--------------------|---------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-09-06                |
| **Status**         | ✅ Aprovada                |
