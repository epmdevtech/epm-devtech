# SPEC-035 — Reorganização UX/UI e Arquitetura de Informação

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **ID**        | SPEC-035                                                               |
| **Título**    | Reorganização UX/UI e Arquitetura de Informação — Narrativa Comercial   |
| **Prioridade**| Alta                                                                   |
| **Origem**    | Demanda PO — 2026-09-08                                                |
| **Autor**     | Elessandro Prestes Macedo                                              |
| **Status**    | ✅ Aprovada                                                |
| **Data**      | 2026-09-08                                                             |

---

## 1. Visão Geral e Objetivo

Evoluir a arquitetura de informação e a experiência de usuário (UX/UI) do site institucional da **EPM DEVTECH**, sem reconstruí-lo do zero e preservando rigorosamente sua identidade visual, seus componentes icônicos (cards 3D, constelação de tecnologias, pipeline de diferenciais) e todas as suas animações existentes.

### Nova Narrativa Comercial

A página principal será reorganizada na seguinte ordem sequencial de 10 etapas:

```text
1. HERO               → ENTENDER: O que a EPM DEVTECH faz?
   ↓
2. PROVA / AUTORIDADE → CONFIAR: Por que devo acreditar? (Métricas e clientes reais)
   ↓
3. SOBRE A EPM DEVTECH→ CONHECER: Quem é a EPM DEVTECH? (Fundador, posicionamento e história)
   ↓
4. EXPERIÊNCIA/SETORES→ IDENTIFICAR-SE: Vocês conhecem problemas como o meu? (Cards 3D preservados)
   ↓
5. SERVIÇOS           → ENTENDER A SOLUÇÃO: Como resolvemos? (O que fazemos, problema e método)
   ↓
6. TECNOLOGIAS        → VALIDAR CAPACIDADE: Quais tecnologias dominam? (TechConstellation)
   ↓
7. DIFERENCIAIS       → ENTENDER DIFERENCIAL: Por que escolher a EPM? (Benefícios tangíveis)
   ↓
8. FAQ                → TIRAR DÚVIDAS: Remoção de objeções reais (Contratação, legados, processo)
   ↓
9. CONTATO            → CONVERTER: Próximo passo seguro (Formulário minimalista + garantias)
   ↓
10. FOOTER            → NAVEGAÇÃO E INSTITUCIONAL: 4 colunas monocromáticas
```

---

## 2. Elementos Inegociáveis e Diretrizes de Preservação

1. **Cards da Seção Sobre (agora em Setores)**:
   - Os 4 cards 3D existentes (`Indústria`, `Varejo`, `Educação`, `Energia`) com estilo bloco isomórfico, mockups internos interativos (`MockupIndustria`, `MockupVarejo`, `MockupEducacao`, `MockupEnergia`), tags e badges são **100% preservados**.
   - O conteúdo textual interno dos cards será refinado para a tríade **Contexto + Problema + Experiência**, eliminando repetição excessiva de números que já foram apresentados na seção Prova/Autoridade.
2. **Stack Tecnológica (`TechConstellation`)**:
   - Preservada integralmente com todas as categorias, nós, conexões PCB, badges e painel arquitetural. Nenhuma tecnologia será removida ou inventada.
3. **Animações e Efeitos**:
   - Todas as animações do Framer Motion, keyframes CSS e microinterações de hover/press são preservadas.
4. **Identidade Visual**:
   - Verde da marca/logo (`#10B981` / `hsl(var(--primary))`) preservado como destaque pontual. Títulos rigorosamente monocromáticos e sem gradientes bicolores excessivos.
5. **Stack Real da Aplicação**:
   - React 18, TypeScript 5, Vite 5, Tailwind CSS, shadcn/ui, Framer Motion, React Router DOM, React Helmet Async, Zod e Vitest.

---

## 3. Escopo Detalhado por Seção

### Seção 1 — Hero (`Hero.tsx`)
- Headline mantida: *"Software sob medida construído para escalar o seu negócio."*
- Subheadline e microprova social preservadas.
- **CTA Principal**: Atualizar microcopy para **"Falar com a engenharia"** (link para `#contato`).
- **CTA Secundário**: Mantido como **"Ver serviços"** (link para `#servicos`).

### Seção 2 — Prova Social & Autoridade (`Authority.tsx`)
- Mover a renderização desta seção para logo após o Hero.
- Preservar todas as métricas reais: `99,9% uptime`, `2.500+ RPS`, `+448 IES e 650 escolas`, `Zero Perda`.
- Preservar selos institucionais: CAPES/MEC, ONS, Energia Pecém, Governo do MT (SEDUC), Indústria e Manufatura.

### Seção 3 — Sobre a EPM DEVTECH (`About.tsx`)
- Objetivo: Responder *"Quem é a EPM DEVTECH?"*.
- Apresentação da empresa e autoridade do fundador Elessandro Prestes Macedo (+9 anos de atuação em engenharia de sistemas complexos).
- Layout amplo e arejado com os 3 indicadores de desempenho (`+9 Anos de Experiência`, `4 Setores Críticos`, `99,9% Uptime em Produção`) usando o componente `CountUp`.

### Seção 4 — Experiência por Setor (`Sectors.tsx` — Nova Seção Modular)
- Componente dedicado renderizando exatamente os **4 cards 3D preservados**:
  1. `Indústria / Manufatura`: Foco em automação de chão de fábrica, IoT Industrial e integração de ERPs.
  2. `Varejo / E-commerce`: Foco em checkout resiliente, catálogo sob demanda e conciliação de estoque.
  3. `Educação / Governo`: Foco em plataformas de larga escala (CAPES/MEC/SEDUC), estabilidade em picos e modernização de legados.
  4. `Energia`: Foco em consolidação de dados regulatórios em tempo real (ONS), tolerância zero a perda e observabilidade crítica.
- Mockups visuais correspondentes preservados e funcionais.

### Seção 5 — Serviços (`Services.tsx`)
- Manter os 6 serviços e seus mockups visuais (`MockBrowser`, `MockAPI`, `MockIntegration`, `MockArchitecture`, `MockMaintenance`, `MockConsulting`).
- Estruturar a descrição de cada card na tríade:
  1. *O que fazemos*
  2. *Qual problema resolve*
  3. *Como entregamos (método/tecnologia como suporte)*
- Evitar transformar os cards em documentação técnica abstrata.

### Seção 6 — Tecnologias (`Technologies.tsx`)
- Preservar integralmente o `TechConstellation` com Focus & Context e painel de detalhes.

### Seção 7 — Diferenciais (`Differentials.tsx`)
- Preservar os 6 diferenciais com a timeline animada do pipeline.
- Refinar copywriting para priorizar benefícios tangíveis (previsibilidade, ausência de retrabalho, código sustentável, segurança em deploys).

### Seção 8 — FAQ (`FAQ.tsx`)
- Posicionado estrategicamente antes do Contato.
- **Eliminação de redundâncias**: Remover perguntas que apenas re-listavam catálogo de serviços, lista de tecnologias ou setores.
- **Foco em remoção de objeções reais**:
  - *Contratação*: Preciso ter o projeto 100% especificado? Como funciona o primeiro contato? Como é definido o investimento? O atendimento é remoto?
  - *Sistemas existentes*: Conseguem assumir um sistema legado desenvolvido por terceiros? É possível modernizar sem parar a operação? Trabalham com código legado existente?
  - *Processo e Governança*: Como funciona o diagnóstico técnico inicial? A comunicação é diretamente com a engenharia? Como funciona o início do projeto com SDD?
- Linguagem natural em pt-BR, sem travessões (`—`) ou clichês de IA.

### Seção 9 — Contato (`Contact.tsx`)
- Cabeçalho *"Vamos entender o seu desafio"* com mensagem de acolhimento ("Não precisa ter todos os requisitos definidos").
- Formulário minimalista underline, máscara de telefone brasileira, validação Zod e garantias de atendimento em 24h e sigilo absoluto.

### Seção 10 — Header & Navegação (`Header.tsx` e `Index.tsx`)
- Atualizar menu de navegação para refletir as seções:
  `Sobre` | `Setores` | `Serviços` | `Tecnologias` | `Diferenciais` | `FAQ` | `Contato`
- Suporte a scroll spy com `IntersectionObserver` e metadados dedicados no `SEO_META`.

---

## 4. Arquivos Impactados

| Arquivo | Operação | Finalidade |
|---------|----------|------------|
| `src/components/sections/Hero.tsx` | Modificar | Microcopy do CTA primário para "Falar com a engenharia" |
| `src/components/sections/About.tsx` | Modificar | Focar o bloco institucional com layout limpo e stats |
| `src/components/sections/Sectors.tsx` | Criar | Seção dedicada dos 4 cards 3D dos setores preservados |
| `src/components/sections/Services.tsx` | Modificar | Copywriting UX com tríade O que fazemos / Problema / Como fazemos |
| `src/components/sections/Differentials.tsx` | Modificar | Copywriting focado em benefícios de escolha |
| `src/components/sections/FAQ.tsx` | Modificar | Perguntas estritamente focadas em remoção de objeções reais |
| `src/components/layout/Header.tsx` | Modificar | Links de navegação atualizados |
| `src/pages/Index.tsx` | Modificar | Nova ordem das seções na árvore DOM, scroll spy e SEO meta |
| `src/components/sections/__tests__/About.test.tsx` | Modificar | Atualização de testes para acompanhar a estrutura refinada |
| `src/components/sections/__tests__/Sectors.test.tsx` | Criar | Testes unitários dos cards 3D dos setores |
| `src/pages/__tests__/Index.test.tsx` | Modificar | Testes da nova ordem das seções |

---

## 5. Critérios de Aceitação

- [ ] Nova ordem rigorosamente implementada: Hero → Autoridade → Sobre → Setores → Serviços → Tecnologias → Diferenciais → FAQ → Contato → Footer
- [ ] Cards 3D de setores 100% preservados visualmente com mockups e animações intactas
- [ ] Stack tecnológica (`TechConstellation`) 100% preservada
- [ ] CTA do Hero atualizado para "Falar com a engenharia"
- [ ] FAQ focado em objeções reais (sem redundância de catálogo de serviços/stack/setores)
- [ ] Zero travessões (`—`) no FAQ e redação natural em pt-BR
- [ ] Responsividade impecável em Desktop, Tablet e Mobile
- [ ] ESLint com 0 erros (`npm run lint`)
- [ ] TypeScript sem erros de compilação
- [ ] Build de produção sem chunks > 600KB
- [ ] Cobertura de testes unitários ≥ 90%
- [ ] Validação prévia em `localhost` antes de qualquer push para a branch `develop`

---

## 6. Aprovação

| Papel | Nome | Assinatura | Data |
|-------|------|------------|------|
| Product Owner | Elessandro Prestes Macedo | ✅ Aprovado | 2026-09-08 |

---

_SPEC gerada por Gemini/Antigravity em 2026-09-08 seguindo o protocolo Universal SDD_
