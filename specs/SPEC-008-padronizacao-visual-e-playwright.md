# SPEC-008 — Padronização Visual do Design System e Testes E2E com Playwright

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-008                                   |
| **Data**      | 2026-09-04                                 |
| **Autor**     | Gemini / Antigravity                       |
| **Revisor**   | Elessandro Prestes Macedo (Product Owner)  |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo)    |
| **Versão**    | 1.0                                        |

---

## 1. Contexto e Motivação

O site institucional da **EPM DEVTECH** possui layout, estrutura e componentes aprovados. Contudo, foram identificadas duas necessidades críticas de evolução:

1. **Aparência de "Site Gerado por IA" nos Títulos e Cores**:
   - Múltiplos títulos de seções utilizam simultaneamente duas cores diferentes (ex.: parte em branco e parte com gradiente azul `text-gradient`), conferindo aspecto genérico e artificial.
   - O azul predominante (`#2979FF` / `--primary: 221.2 83.2% 52%`) não reflete a identidade visual oficial da EPM DEVTECH presente no logotipo oficial (`#10B981` / Verde Esmeralda).
   - Falta de padronização na hierarquia tipográfica (ex.: uso de fonte monospace em blocos de texto corrido/descrições).

2. **Comportamento Estranho no Título Inicial ("Aparece o título, depois mostra novamente")**:
   - Na implementação anterior (SPEC-007), foi adicionado um skeleton HTML estático com `<h1>` dentro de `<div id="root">` no `index.html`.
   - Ao carregar a página, o navegador pinta esse HTML cru. Frações de segundo depois, o bundle React inicializa, desmonta todo o conteúdo de `#root` e renderiza o componente `<Hero />` com classes, espaçamentos e estilos distintos.
   - Esse desalinhamento e substituição abrupta causam um *flicker* perceptível onde o usuário vê o título aparecer, sumir/deslocar e reaparecer.

3. **Necessidade de Automação de Testes End-to-End (E2E)**:
   - Os testes unitários existentes (Vitest/JSDOM) cobrem a lógica em isolamento, mas não detectam renderização real no browser, animações de montagem, transições visuais e estabilidade do viewport.
   - É necessário integrar o **Playwright** para garantir cobertura contínua contra regressões visuais e funcionais no navegador real.

---

## 2. Princípio Fundamental de Design: O Que Preservar

> **REGRA ABSOLUTA**: Esta NÃO é uma tarefa de redesign. NÃO é uma mudança de layout.

**Permanecem estritamente inalterados**:
- Estrutura das páginas, ordem e quantidade de seções (`Hero`, `About`, `Services`, `Technologies`, `Differentials`, `Authority`, `Contact`, `Footer`);
- Todo o conteúdo textual, cards, grids e posicionamento dos elementos;
- Largura, altura, margens, paddings, border-radius e sombras;
- Ícones, imagens, animações e responsividade;
- Arquitetura SPA com roteamento dinâmico e Scroll Spy.

---

## 3. Escopo da Padronização Visual

### 3.1. Títulos Monocromáticos (Eliminação do Padrão "Gerado por IA")
- **Regra**: Todo título (H1, H2, H3) deve ter uma **única cor** consistente:
  - Fundo escuro (Dark Mode padrão): `text-foreground` (branco/off-white puro `#FFFFFF`).
  - Textos secundários e apoios: `text-muted-foreground` (cinza neutro).
- **Proibido em títulos**:
  - Mistura de duas cores no mesmo título (ex.: branco + azul ou branco + verde);
  - Classes de gradiente em texto (`text-gradient`, `bg-clip-text`);
  - Palavras coloridas artificialmente dentro do mesmo heading.
- **Destaque permitido**: Exclusivamente via **peso tipográfico** (ex.: `font-light` combinado com `font-semibold`), mantendo a mesma cor.

#### Mapeamento de Títulos a Padronizar:
1. **`Hero.tsx`** (H1):
   - *Atual*: `Soluções Digitais` (branco) + `<span className="text-gradient">Sob Medida</span>` (azul) + `Para Sua Empresa` (cinza).
   - *Padronizado*: `Soluções Digitais <span className="font-semibold text-foreground">Sob Medida</span>` em uma única linha/bloco com `Para Sua Empresa` integrado em `text-foreground` ou subtítulo tipográfico coerente, 100% monocromático.
2. **`About.tsx`** (H2):
   - *Atual*: `Engenharia de Software com <span className="text-gradient">Excelência Técnica</span>`
   - *Padronizado*: `Engenharia de Software com <span className="font-semibold">Excelência Técnica</span>` (monocromático em `text-foreground`).
3. **`Services.tsx`** (H2):
   - *Atual*: `Soluções <span className="text-gradient">End-to-End</span>`
   - *Padronizado*: `Soluções <span className="font-semibold">End-to-End</span>` (monocromático em `text-foreground`).
4. **`Technologies.tsx`** (H2):
   - *Atual*: `Tecnologias <span className="text-gradient">Modernas</span>`
   - *Padronizado*: `Tecnologias <span className="font-semibold">Modernas</span>` (monocromático em `text-foreground`).
5. **`Differentials.tsx`** (H2):
   - *Atual*: `Por Que Escolher a <span className="text-gradient">EPM DEVTECH</span>`
   - *Padronizado*: `Por Que Escolher a <span className="font-semibold">EPM DEVTECH</span>` (monocromático em `text-foreground`).
6. **`Authority.tsx`** (H2):
   - *Atual*: `Autoridade <span className="text-gradient">Técnica</span> que <span className="text-gradient">Gera Resultados</span>`
   - *Padronizado*: `Autoridade Técnica que <span className="font-semibold">Gera Resultados</span>` (monocromático em `text-foreground`).
7. **`Contact.tsx`** (H2):
   - *Atual*: `Vamos Construir <span className="text-gradient">Juntos</span>`
   - *Padronizado*: `Vamos Construir <span className="font-semibold">Juntos</span>` (monocromático em `text-foreground`).

---

### 3.2. Cor Principal da Marca: Azul → Verde da EPM DEVTECH

A cor de destaque oficial é extraída diretamente do símbolo do logotipo vetorial oficial (`public/logo-epm-devtech-icon.svg` e `public/logo-epm-devtech.svg`):
- **Verde Oficial**: `#10B981` (Emerald 500) / HSL `158 64% 52%` (modo escuro) e HSL `158 75% 38%` (modo claro, garantindo contraste WCAG AA ≥ 4.5:1 com texto branco).
- **Token Centralizado**:
  - `--primary`: HSL do verde da marca.
  - `--primary-foreground`: `#0A0F1C` (ou branco com verde contrastante conforme WCAG AA).
  - `--ring`: HSL do verde da marca.
- **Onde o Verde Substitui o Azul**:
  - Botões de CTA primários (`Hero`, `Contact`);
  - Underline indicador da navegação ativa no `Header`;
  - Badges/overlines mono de cada seção (ex.: `text-primary font-mono text-xs uppercase`);
  - Barras de progresso e pipelines (`Differentials`);
  - Indicadores e chips de destaque nas seções de serviços e credenciais;
  - Estados hover e focus em links e botões.
- **Restrição**: O verde é estritamente um **ACCENT**. O site permanece prioritariamente DARK (`#121212` / `#000000`), com superfícies limpas e profissionais. Não transformar fundos ou títulos em verde.

---

### 3.3. Revisão e Padronização Tipográfica

- **Fontes Oficiais**:
  - **`Geist Sans`**: Utilizada para todos os títulos (H1, H2, H3), subtítulos, textos de parágrafos (body), labels e botões. Proporciona legibilidade técnica, refinamento e elegância.
  - **`Geist Mono`**: Utilizada estritamente para dados técnicos, números de etapas (`01 //`), badges de categoria, trechos de código e métricas de sistema.
- **Hierarquia Estabelecida**:
  - **H1**: `text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.15] text-foreground` (com ênfase em `font-medium text-foreground`).
  - **H2**: `text-2xl sm:text-3xl md:text-4xl font-light tracking-tight leading-snug text-foreground` (com ênfase em `font-medium text-foreground`).
  - **H3**: `text-lg sm:text-xl font-semibold tracking-tight text-foreground`.
  - **Body / Descrições**: `text-sm sm:text-base text-muted-foreground font-normal leading-relaxed` (substituindo `font-mono` em textos longos para eliminar aspecto amador).
  - **Labels / Overlines**: `font-mono text-xs uppercase tracking-widest text-primary font-medium`.
  - **Buttons**: `font-medium text-sm sm:text-base`.

---

### 3.4. Correção do Bug de Re-Renderização / Flicker do Título no Hero

- **Diagnóstico**: O elemento estático `#root > section > div > h1` no `index.html` difere em dimensões e classes do componente React `<Hero />`. No momento da montagem do React, o elemento estático é destruído e substituído, gerando um flash visual de duplicação.
- **Solução**:
  - Harmonizar o placeholder inline no `index.html` para ter dimensões, classes de fonte e layout estrutural perfeitamente idênticos aos do `<Hero />` renderizado pelo React (ou container estável com zero CLS).
  - Remover qualquer transição conflitante de escala ou opacidade no mount do Hero que re-anime o texto já visível.

---

### 3.5. Instalação e Testes E2E com Playwright

- **Instalação e Configuração**:
  - Adicionar `@playwright/test` ao `devDependencies`.
  - Configurar `playwright.config.ts` apontando para o servidor local (`http://localhost:8070` ou variável de ambiente).
  - Adicionar script `npm run test:e2e` ao `package.json`.
  - Configurar `vitest.config.ts` para ignorar a pasta `e2e/`.
- **Suíte de Testes Automatizados (`e2e/design-system-and-stability.spec.ts`)**:
  1. **Estabilidade de Carregamento**: Verificar que a página carrega sem duplicação visual do título ou recarga cíclica.
  2. **Monocromatismo dos Títulos**: Inspecionar os elementos `h1` e `h2` garantindo ausência de classes de gradiente (`text-gradient`) ou múltiplos spans de cores contrastantes.
  3. **Identidade Visual Verde**: Inspecionar tokens e elementos primários (CTA do Hero, badges) garantindo a cor verde oficial (`#10b981` / `rgb(16, 185, 129)`).
  4. **Navegação e Scroll Spy**: Verificar clique nos links do Header e rolagem suave sem retorno acidental ao Hero.

---

## 4. Quality Gates

| Gate | Critério |
|------|----------|
| **Testes Unitários** | Vitest: 100% dos testes passando (80+ testes) com cobertura ≥ 90% |
| **Testes E2E** | Playwright: 100% dos testes passando em Chromium |
| **Lint** | `npm run lint` com 0 erros e 0 warnings |
| **Build** | `npm run build` bem-sucedido sem chunks > 600KB |
| **Acessibilidade** | Contraste de cores do verde nos botões e textos ≥ 4.5:1 (WCAG AA) |

---

## 5. Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/index.css` | Modificar | Atualizar tokens `--primary`, `--ring`, substituir gradiente azul por verde em utilitários |
| `index.html` | Modificar | Atualizar inline CSS de `--primary`, corrigir skeleton para evitar flicker do H1 |
| `src/components/sections/Hero.tsx` | Modificar | H1 monocromático, CTA em verde da marca, eliminar flicker |
| `src/components/sections/About.tsx` | Modificar | H2 monocromático, parágrafos em font-sans |
| `src/components/sections/Services.tsx` | Modificar | H2 monocromático, acentos de cards em verde da marca |
| `src/components/sections/Technologies.tsx` | Modificar | H2 monocromático, parágrafos em font-sans |
| `src/components/sections/Differentials.tsx` | Modificar | H2 monocromático, pipeline e acentos em verde |
| `src/components/sections/Authority.tsx` | Modificar | H2 monocromático, acentos em verde |
| `src/components/sections/Contact.tsx` | Modificar | H2 monocromático, botão submit em verde da marca |
| `package.json` | Modificar | Adicionar `@playwright/test` e script `test:e2e` |
| `playwright.config.ts` | Criar | Configuração oficial do Playwright |
| `e2e/design-system-and-stability.spec.ts` | Criar | Testes E2E cobrindo títulos, cores e estabilidade |

---

## 6. Aprovação do Product Owner

- [ ] **Aprovado para Implementação** por Elessandro Prestes Macedo
