# SPEC-061 — Refatoração do Hero: Engenharia de Software B2B, Layout Assimétrico e Canvas Arquitetural

| Metadado | Valor |
|---|---|
| **ID** | SPEC-061 |
| **Título** | Refatoração da Seção Hero — Posicionamento de Engenharia B2B, Layout Assimétrico de Duas Colunas e Canvas de Arquitetura |
| **Status** | Aprovada |
| **Data de Criação** | 2026-10-01 |
| **Autor** | Gemini/Antigravity (Senior Front-end Engineer, UX/UI & Product Designer) |
| **Aprovador / PO** | Elessandro Prestes Macedo |
| **Versão** | 1.0.0 |

---

## 1. Contexto e Diagnóstico do Hero Atual

### 1.1 Diagnóstico Crítico
O Hero atual da EPM DEVTECH (revisado na SPEC-059 como uma faixa slim de coluna única centralizada) atingiu excelentes marcos de Core Web Vitals, mas apresenta limitações fundamentais de comunicação de produto e conversão B2B:
- **Visual excessivamente curto e pouco expressivo:** Não preenche visualmente o espaço inicial da tela (viewport desktop), gerando uma primeira impressão tímida.
- **Eyebrow "Software House" isolado:** A expressão centralizada e solta não entrega o contexto completo de maturidade e especialidade da empresa.
- **Ausência de representação tangível de engenharia:** O visitante não visualiza o que a empresa constrói na prática (sistemas corporativos, APIs de alta concorrência, integrações de dados e modernizações).
- **Taxa de engajamento na dobra inicial:** O Hero atual não transmite com clareza imediata em 3 segundos:
  1. *O que é a EPM DevTech:* Uma software house de engenharia de software especializada;
  2. *O que a empresa entrega:* Sistemas sob medida, modernização de legados, integrações e APIs;
  3. *Como pode ajudar:* Resolvendo problemas operacionais complexos com estabilidade e previsibilidade;
  4. *Como começar:* Ação direta para conversar sobre um projeto ou conhecer as soluções.

### 1.2 Objetivo
Transformar o Hero em uma primeira impressão forte, madura, profissional e tecnicamente confiável, adotando um layout assimétrico de duas colunas (80vh–90vh no desktop) inspirado nas melhores práticas de empresas de tecnologia B2B e na biblioteca 21st.dev, sem adicionar dependências pesadas e preservando rigorosamente o design system da EPM DevTech.

---

## 2. Regras Fundamentais e Restrições Inegociáveis

1. **Escopo Estrito e Localizado:** Refatorar **exclusivamente** o componente Hero (`src/components/sections/Hero.tsx`) e a integração imediata no topo da `Home.tsx`. Não refatorar o restante do site.
2. **Preservação Integral da Identidade Visual:**
   - Paleta de cores oficial (Preto/Cinza base, acento Verde Esmeralda `#10B981` / `var(--primary)`).
   - Tipografia canônica (Sans para textos e mono para tags/código técnico).
   - Componentes globais do shadcn/ui (`Button`), Header e Footer permanecem inalterados.
   - Suporte impecável e verificado a Dark Mode e Light Mode.
3. **Proibições Estéticas e Técnicas:**
   - ❌ Nenhum gradiente do tipo aurora, mesh exagerado, glowing orb ou liquid metal.
   - ❌ Nenhum glassmorphism excessivo, partículas flutuantes, shaders pesados ou WebGL.
   - ❌ Nenhum 3D decorativo ou elemento flutuante aleatório.
   - ❌ Nenhum mockup falso de dashboard analítico com dados fictícios.
   - ❌ Nenhum terminal falso ou código fonte decorativo falso.
   - ❌ Nenhuma estética de startup de IA, SaaS genérico, Web3, crypto ou gaming.
4. **Veracidade Estrita de Conteúdo:**
   - Nenhum cliente fictício, nenhuma métrica inventada e nenhum depoimento fabricado.
   - Linha de autoridade referenciando apenas a experiência técnica real comprovada nos setores já documentados (`energia`, `indústria`, `educação`, `varejo` e `sistemas corporativos`), sem apresentar organizações prévias como clientes da EPM DevTech.
5. **Acessibilidade e Performance:**
   - H1 único e semântico.
   - O elemento visual do lado direito é estruturado como representação de arquitetura técnica e etiquetado com `aria-hidden="true"`.
   - Contraste WCAG 2.2 AA (≥ 4.5:1).
   - Alvos de toque acessíveis (≥ 44px).
   - Respeito pleno a `prefers-reduced-motion: reduce`.
   - LCP rápido sem dependências pesadas (apenas HTML, SVG, Tailwind e Framer Motion para microinterações suaves).

---

## 3. Análise de Referências e Padrões (21st.dev & Benchmark de Mercado)

| Padrão Analisado | Características Principais | Avaliação para a EPM DevTech | Decisão |
|---|---|---|---|
| **1. Codeminer42 Hero** | Layout de 2 colunas assimétricas (`lg:grid-cols-[1.45fr_1fr]`), eyebrow de contextualização, headline assertiva ("Escale sua equipe com nossos engenheiros"), CTA dominante e prova visual autoral no lado direito. | Excelente referência de proporção, maturidade e peso institucional para serviços de engenharia. | **Adotado como referência estrutural principal** de proporção de grid e hierarquia. |
| **2. 21st.dev — Agency Hero / Split 2-Column** | Divisão assimétrica entre copy forte e vitrine de produto/serviço com espaçamento generoso e tipografia clean. | Altamente eficaz para comunicar seriedade técnica e clareza de proposta de valor. | **Adotado como modelo de composição** (Conteúdo à esquerda, artefato à direita). |
| **3. 21st.dev — Systems Architecture Canvas** | Painel modular de camadas de sistemas (Borda, Gateway, Serviços, Dados, Cloud) com conectores discretos e status operacional sutil. | Perfeito para materializar a frase "Existe uma empresa de engenharia de software aqui", transmitindo profundidade técnica sem falsos dashboards. | **Adotado como elemento visual do lado direito**, implementado com Tailwind puro e SVG. |
| **4. 21st.dev — AI/SaaS Mesh & WebGL Hero** | Fundos com shaders pesados, orbes luminosos, gradientes cônicos e 3D interativo. | Incompatível com o posicionamento maduro e confiável da EPM DevTech; degrada performance mobile. | **Eliminado categoricamente**. |

---

## 4. Especificação Detalhada da Nova Seção Hero

### 4.1 Proporções e Layout Geral
- **Ocupação Vertical:** Aproximadamente `80vh–90vh` no desktop padrão (1440×900 e 1920×1080), permitindo respiro visual e sensação de presença institucional madura, sem empurrar excessivamente o início do conteúdo subsequente.
- **Grid Assimétrico (Desktop ≥ 1024px):**
  - Container com largura máxima de 1280px (`container px-6 mx-auto`).
  - Grid de duas colunas: Coluna Esquerda (~55% a 58%) para o conteúdo narrativo e conversão; Coluna Direita (~42% a 45%) para o Canvas de Engenharia.
  - Alinhamento vertical centralizado/equilibrado.
- **Layout Mobile & Tablet (< 1024px):**
  - Transição fluida para coluna única vertical:
    1. Eyebrow
    2. Headline (H1)
    3. Subheadline
    4. Grupo de CTAs
    5. Linha de autoridade discreta
    6. Canvas de Engenharia responsivo (adaptado em altura e proporção)
  - Zero overflow horizontal (`scrollWidth <= innerWidth`).

---

### 4.2 Coluna Esquerda: Conteúdo, Mensagem e Conversão

#### A. Eyebrow Contextual
- **Composição:** `BrandChipIcon` (15px, verde esmeralda `#10B981`) + texto contextual em uma única linha.
- **Texto Oficial:**
  ```
  ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO
  ```
- **Estilização:** `text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none`.
- **Racional:** Elimina a palavra "Software House" isolada e contextualiza imediatamente o escopo de atuação técnica da empresa.

#### B. Headline Principal (H1)
- **Texto Oficial:**
  ```
  Engenharia de software para construir, integrar e evoluir sistemas.
  ```
- **Hierarquia e Semântica:**
  - Tag única `<h1>` na página com `id="hero-title"`.
  - Família Sans do projeto, peso `font-bold` (`700`), cor monocromática sólida (`text-foreground`).
  - Escala fluida: `text-[clamp(2.15rem,1.4rem+2.8vw,3.5rem)]` com `leading-[1.12]` e `tracking-tight`.
  - Quebra balanceada natural com `[text-wrap:balance]`.
- **Racional:** Curta, objetiva, empresarial e verdadeira. Sintetiza em 8 palavras o tripé da EPM DevTech: novos desenvolvimentos (construir), barramentos de comunicação (integrar) e manutenção/refatoração de legados (evoluir).

#### C. Subheadline
- **Texto Oficial:**
  ```
  Desenvolvemos sistemas corporativos, APIs escaláveis e integrações sob medida, além de modernizar aplicações legadas com foco em qualidade, estabilidade e evolução contínua.
  ```
- **Estilização:** `text-muted-foreground [text-wrap:pretty] max-w-xl text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-relaxed`.
- **Racional:** Explica com clareza em 2 linhas o que a empresa faz, como atua e por que o cliente deve confiar.

#### D. Grupo de Chamadas para Ação (CTAs)
- **CTA Primário (Ação Dominante):**
  - Rótulo: `"Falar sobre um projeto"`
  - Destino: `/contato` (ou âncora `#contato` na navegação local)
  - Componente: `Button` oficial do shadcn/ui, variante sólida (`bg-primary text-primary-foreground hover:bg-primary/90 font-medium min-h-[46px] px-7 shadow-xs rounded-md`).
  - Sem setas exageradas ou degradês.
- **CTA Secundário (Exploração de Soluções):**
  - Rótulo: `"Conhecer soluções"`
  - Destino: `/servicos` (ou âncora `#servicos` na navegação local)
  - Componente: Botão outline refinado (`Button variant="outline"` ou link estruturado com `border border-border/80 text-foreground hover:bg-accent hover:text-accent-foreground min-h-[46px] px-6 rounded-md font-medium`).
- **Alinhamento:** Lado a lado em telas `>= 640px` com `gap-4`; empilhados em telas móveis estreitas (`< 640px`).

#### E. Linha Discreta de Autoridade
- **Posicionamento:** Imediatamente abaixo dos CTAs, separada por espaçamento vertical sutil (~24px).
- **Texto Oficial:**
  ```
  Experiência técnica em projetos de energia, indústria, educação, varejo e sistemas corporativos.
  ```
- **Estilização:** `text-xs text-muted-foreground flex items-center gap-2`.
- **Racional:** Prova factual baseada no histórico profissional real da liderança técnica, sem inflar números nem citar clientes falsos.

---

### 4.3 Coluna Direita: Canvas de Engenharia de Software (Elemento Visual)

#### A. Conceito e Função
O elemento visual deve comunicar: *"Existe uma empresa de engenharia de software aqui."*
Não é um dashboard fictício com gráficos de pizza sem sentido, nem uma imagem genérica de banco de fotos. É uma **topologia de camadas de engenharia de software**, estruturada como um painel técnico elegante e sóbrio que representa a arquitetura dos sistemas desenvolvidos e modernizados pela EPM DevTech.

#### B. Estrutura Visual do Canvas
1. **Moldura do Sistema (System Frame):**
   - Superfície sólida: `bg-card/70 border border-border/80 rounded-xl p-5 sm:p-6 shadow-xs backdrop-blur-none`.
   - Cabeçalho do painel técnico:
     - Indicador de integridade: Ponto verde esmeralda sólido (`w-2 h-2 rounded-full bg-primary`) com texto `Topologia de Arquitetura de Sistemas`.
     - Tag monocromática mono: `Alta Disponibilidade · SLA 99,9%`.
2. **Quatro Camadas Técnicas Conectadas:**
   - **Camada 01: Interface & Portais Corporativos (Client Layer)**
     - Título: `Aplicações Web & Portais`
     - Detalhe: Fluxos operacionais, responsividade e alta disponibilidade
     - Stack/Chips: `React` `TypeScript` `Tailwind`
   - **Conector Vertical:** Linha sutil de 1px (`border-l border-dashed border-border`) com nó de conexão esmeralda discreto.
   - **Camada 02: APIs & Gateway de Serviços (Core Layer)**
     - Título: `APIs & Back-end de Alta Concorrência`
     - Detalhe: Arquitetura em nuvem, regras de negócio e barramento REST/GraphQL
     - Stack/Chips: `Node.js` `PHP / Laravel` `APIs REST`
   - **Conector Vertical:** Linha sutil de 1px com nó de conexão.
   - **Camada 03: Processamento & Integrações (Integration Layer)**
     - Título: `Barramento de Integração & Eventos`
     - Detalhe: Sincronização assíncrona entre ERPs, CRMs e mensageria
     - Stack/Chips: `RabbitMQ` `Workers` `Eventos`
   - **Conector Vertical:** Linha sutil de 1px com nó de conexão.
   - **Camada 04: Dados & Infraestrutura em Nuvem (Data & Cloud Layer)**
     - Título: `Persistência Transacional & Nuvem`
     - Detalhe: Integridade ACID, cache em memória e containers orquestrados
     - Stack/Chips: `PostgreSQL` `Redis` `AWS` `Docker`
3. **Barra de Rodapé do Canvas:**
   - Pequeno rodapé técnico com indicadores factuais: `Código Testado (CI/CD)` · `Segurança & Observabilidade`.
4. **Acessibilidade do Canvas:**
   - O elemento visual conterá `aria-hidden="true"`, pois tem propósito de ilustração visual da arquitetura; o leitor de tela acessa todo o conteúdo semântico na coluna esquerda.

---

## 5. Motion Design e Microinterações

1. **Entrada Suave:** Transição de entrada suave (`opacity: 0 -> 1` e `y: 12 -> 0`) com duração máxima de `0.4s` via Framer Motion ou CSS.
2. **Hover Sutil:** Os nós e blocos do canvas recebem microinterações suaves de hover (`transition-colors duration-200 border-primary/40`), demonstrando acabamento de alta qualidade.
3. **Zero Animações Contínuas Sem Fim:** Proibida rotação perpétua, pulsação brilhante, elementos flutuando sem parar ou partículas caóticas.
4. **Respeito a `prefers-reduced-motion`:**
   - Em caso de preferência por movimento reduzido, todas as transições de deslocamento são desativadas (`y: 0`, apenas fade instantâneo ou estático).

---

## 6. Validação Heurística e Critérios de Sucesso

| Pergunta de Avaliação | Resposta Esperada | Critério de Aceite |
|---|---|---|
| 1. Em 3 segundos sei o que é a EPM DevTech? | Sim: Empresa de engenharia de software sob medida. | Headline e eyebrow legíveis imediatamente. |
| 2. Sei que ela desenvolve novos sistemas? | Sim: "construir sistemas", "sistemas corporativos". | Explícito no H1 e subheadline. |
| 3. Sei que ela atua em sistemas existentes/legados? | Sim: "modernizar aplicações legadas", "evoluir sistemas". | Explícito no H1 e subheadline. |
| 4. Existe um CTA claro e direto? | Sim: "Falar sobre um projeto" em destaque e "Conhecer soluções". | Touch target ≥ 44px, contraste ≥ 4.5:1. |
| 5. O visual transmite engenharia real? | Sim: Arquitetura multicamada concreta com tecnologias reais. | Sem gráficos falsos ou banco de imagens. |
| 6. Parece um template gerado por IA? | **Não**: Layout sóbrio, editorial, monocromático e autoral. | Reprovado se parecer SaaS/AI genérico. |
| 7. O visual é compatível com Dark e Light Mode? | Sim: Tokens oficiais do Tailwind/shadcn. | Testado em ambos os modos. |

---

## 7. Quality Gates e Arquivos Afetados

### 7.1 Quality Gates Obrigatórios
- **TypeScript:** `npx tsc --noEmit` — 0 erros.
- **ESLint:** `npm run lint` — 0 erros.
- **Testes Unitários:** `npm run test:coverage` — Cobertura ≥ 90%.
- **Testes E2E (Playwright):** `npm run test:e2e` — 100% aprovados em todas as viewports (1440x900, 1280x800, 768x1024, 390x844).
- **Build de Produção:** `npm run build` — Limpo e sem chunks > 600KB.

### 7.2 Arquivos Impactados
- `specs/SPEC-061-hero-engenharia-software-b2b.md` (Este documento de especificação)
- `tasks/TASK-061-hero-engenharia-software-b2b.md` (A ser criada após aprovação)
- `src/components/sections/Hero.tsx` (Componente refatorado)
- `src/components/sections/__tests__/Hero.test.tsx` (Testes unitários atualizados)
- `e2e/hero-visual-validation.spec.ts` (Validação E2E atualizada)
- `e2e/hero-identity-token-locks.spec.ts` (Validação estrita de tokens e ausência de gradientes)
- `PROJECT.md` e `CHANGELOG.md` (Atualização pós-entrega)

---

_Documento elaborado conforme o protocolo Universal SDD (Spec-Driven Development) deste projeto._  
_Aguardando aprovação humana explícita do Product Owner (Elessandro Prestes Macedo)._
