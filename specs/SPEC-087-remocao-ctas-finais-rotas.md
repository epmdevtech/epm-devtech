# SPEC-087 — Remoção Global de Seções Finais de CTA Redundantes em Todas as Rotas

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Arquitetura de Páginas / Limpeza de Código

---

## 1. Contexto e Motivação

Com a consolidação do design system da EPM DevTech — incluindo o botão fixo de alta conversão no Header (`"Fale conosco"` presente em todas as páginas), os CTAs nos Heroes de entrada (ex.: `"Vamos conversar"` na Home e `"Solicite uma conversa"` na rota `/servicos`) e os links canônicos de contato presentes no Footer (`/contato`) —, as caixas isoladas de fechamento comercial posicionadas no final das páginas tornaram-se redundantes e desnecessárias.

Tais blocos de pré-rodapé repetiam mensagens como *"Quer avaliar qual solução se encaixa no seu momento?"*, *"Ficou com alguma dúvida sobre o processo?"*, *"Sua empresa tem uma demanda de alta complexidade?"*, *"Precisa de engenharia sólida..."* e *"Pronto para construir sua próxima solução com quem entende de código?"*. 

A presença dessas caixas no final de cada rota:
1. Gera poluição visual e repetição de formulários/links já acessíveis globalmente.
2. Interrompe a narrativa técnica limpa de cada página antes de encontrar o rodapé institucional.
3. Cria dependências e componentes intermediários desnecessários no bundle.

Portanto, esta especificação define a remoção global desses blocos finais em todas as rotas do projeto, adequando o espaçamento da última seção útil e preservando estritamente a alternância do **Sistema de Camadas Tonais (SPEC-082)**.

---

## 2. Escopo

### 2.1 Em Escopo

1. **Remoção das Caixas Finais de CTA nas Rotas**:
   - **`/servicos` (`src/pages/ServicesPage.tsx`)**:
     * Remover o bloco final de fechamento comercial (`<SectionWrapper tone="base">` contendo *"Quer avaliar qual solução se encaixa no seu momento?"*, botão *"Iniciar diagnóstico do projeto"* e link *"Entenda como trabalhamos →"*).
     * Remover import não utilizado: `Button` de `@/components/ui/button`.
     * Última seção útil: Faixa de Garantias de Engenharia (`tone="alt"`).
     * Ritmo tonal resultante: `anchor` (PageHeader) → `base` (Catálogo Services) → `alt` (Garantias) → `anchor` (Footer).
   - **`/como-trabalhamos` (`src/pages/HowWeWorkPage.tsx`)**:
     * Remover o bloco final (`<SectionWrapper tone="base">` contendo *"Ficou com alguma dúvida sobre o processo?"*, botão *"Fale com um engenheiro"* e link *"Ver dúvidas frequentes"*).
     * Remover imports não utilizados: `HelpCircle`, `ArrowRight`, `Button`.
     * Última seção útil: Manifesto Técnico de Engenharia (`tone="alt"`).
     * Ritmo tonal resultante: `anchor` (PageHeader) → `base` (Process Explorer) → `alt` (Manifesto) → `anchor` (Footer).
   - **`/experiencia` (`src/pages/ExperiencePage.tsx`)**:
     * Remover o bloco final (`<SectionWrapper tone="base">` contendo *"Sua empresa tem uma demanda de alta complexidade?"* e botão *"Falar sobre meu projeto"*).
     * Remover imports não utilizados: `ArrowRight`, `Button`.
     * Última seção útil: Enterprise Ledger de Organizações e Projetos (`tone="alt"`).
     * Ritmo tonal resultante: `anchor` (PageHeader) → `base` (Matriz de Verticais) → `alt` (Organizações) → `anchor` (Footer).
   - **`/engenharia` (`src/pages/EngineeringPage.tsx`)**:
     * Remover o bloco final (`<SectionWrapper tone="base">` contendo *"Precisa de engenharia sólida no seu produto ou sistema interno?"* e botão *"Falar sobre meu projeto"*).
     * Remover imports não utilizados: `ArrowRight`, `Button`.
     * Última seção útil: Matriz de Camadas de Software / Nuvem Tipográfica (`tone="alt"`).
     * Ritmo tonal resultante: `anchor` (PageHeader) → `base` (Filosofia + Terminal CI/CD) → `alt` (Nuvem Tipográfica) → `anchor` (Footer).
   - **`/sobre` (`src/pages/AboutPage.tsx`)**:
     * Remover o bloco final (`<SectionWrapper tone="alt">` contendo *"Pronto para construir sua próxima solução com quem entende de código?"* e botão *"Fale conosco"*).
     * Remover imports não utilizados: `ArrowRight`, `Button`.
     * Última seção útil: Missão & Princípios de Engenharia (`tone="base"`).
     * Ritmo tonal resultante: `anchor` (PageHeader) → `base` (Fundador) → `alt` (Timeline Nossa Jornada) → `base` (Missão/Princípios) → `anchor` (Footer).
   - **`/` (`src/pages/Home.tsx`)**:
     * Validar que a Home já encerra de forma limpa na faixa de Experiência Prática (`HomeResultsStrip`), sem blocos intermediários artificiais de contato (conforme já estabelecido na SPEC-071).

2. **Espaçamento e Conexão com o Rodapé (`Footer`)**:
   - Garantir que a última seção útil de cada página mantenha o padding vertical padrão do `SectionWrapper` (`py-16 md:py-24` ou `py-20 md:py-28`), proporcionando uma transição elegante, arejada e sem colapso contra o Footer (`surface-anchor`).
   - Nenhuma linha divisória horizontal artificial deve ser reinserida, respeitando os princípios de Camadas Tonais (SPEC-082).

3. **Atualização de Testes**:
   - Atualizar a asserção em `src/pages/__tests__/pages.test.tsx` (teste de `HowWeWorkPage`) para remover a verificação do texto *"Fale com um engenheiro"*, assegurando a validação de elementos estruturais autênticos da página.
   - Executar suite completa de testes unitários (Vitest) e de integração E2E (Playwright).

### 2.2 Fora de Escopo

- Alterações no `Footer.tsx` ou no `Header.tsx`.
- Modificações na rota `/contato` (que é a própria página de formulário e canais de atendimento).
- Modificações na rota `/duvidas-frequentes` (que já possui chamada contextual no final específica para dúvidas não respondidas).

---

## 3. Matriz de Ritmo Tonal Pós-Remoção (SPEC-082)

| Rota | Sequência de Camadas Tonais | Status |
|---|---|---|
| **`/` (Home)** | `anchor` (Hero) → `base` (Bento) → `alt` (Pipeline) → `base` (Resultados) → `anchor` (Footer) | ✅ Válido |
| **`/servicos`** | `anchor` (PageHeader) → `base` (Serviços) → `alt` (Garantias) → `anchor` (Footer) | ✅ Válido |
| **`/como-trabalhamos`** | `anchor` (PageHeader) → `base` (Explorer) → `alt` (Manifesto) → `anchor` (Footer) | ✅ Válido |
| **`/experiencia`** | `anchor` (PageHeader) → `base` (Verticais) → `alt` (Organizações) → `anchor` (Footer) | ✅ Válido |
| **`/engenharia`** | `anchor` (PageHeader) → `base` (Filosofia/CI-CD) → `alt` (Nuvem Tipográfica) → `anchor` (Footer) | ✅ Válido |
| **`/sobre`** | `anchor` (PageHeader) → `base` (Fundador) → `alt` (Jornada) → `base` (Missão) → `anchor` (Footer) | ✅ Válido |

*Nota: Em nenhuma rota ocorrem duas seções adjacentes com o mesmo tom, e nenhuma seção intermediária utiliza `anchor`.*

---

## 4. Critérios de Aceite

1. [ ] As 5 caixas finais redundantes de CTA em `/servicos`, `/como-trabalhamos`, `/experiencia`, `/engenharia` e `/sobre` foram completamente removidas do JSX.
2. [ ] Todos os imports não utilizados gerados pela remoção (`Button`, `ArrowRight`, `HelpCircle`) foram limpos.
3. [ ] A última seção de cada página conecta-se diretamente ao Footer com espaçamento adequado (`py-16 md:py-24` ou superior), sem sensação de colapso visual.
4. [ ] O ritmo de camadas tonais (SPEC-082) permanece 100% alternado em todas as 6 rotas.
5. [ ] Todos os Quality Gates passam com zero erros (TypeScript, ESLint, Vitest, Playwright, Build).

---

## 5. Quality Gates Obrigatórios

| Gate | Critério |
|---|---|
| **TypeScript** | `npx tsc --noEmit` — 0 erros |
| **ESLint** | `npm run lint` — 0 erros, 0 warnings |
| **Testes Unitários** | `npm test -- --run` — 100% testes passando |
| **Build** | `npm run build` — Redução de bundle e pré-render estático perfeito |
| **Acessibilidade** | WCAG AAA e hierarquia semântica preservada |

---

_SPEC elaborada segundo o protocolo Universal SDD. Aguardando aprovação explícita do PO._
