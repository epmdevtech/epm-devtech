# SPEC-017 — Substituição da Seção de Credenciais por Trust Bar de Prova Social e Autoridade Técnica

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Trust Bar / Social Proof Strip de Autoridade Técnica e Missão Crítica  |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

A antiga seção de "Credenciais / Autoridade Técnica que Gera Resultados" continha 5 cards verticais genéricos com parágrafos repetitivos sobre qualidades profissionais ("Experiência Profissional", "Perfil Full Stack Sênior", etc.), gerando peso visual desnecessário e sobreposição conceitual com a seção "Sobre a EPM DEVTECH".

Para elevar a sofisticação da landing page e gerar máxima credibilidade antes da tomada de decisão de contato, esses cards são substituídos por um componente moderno, elegante e compacto de **Prova Social e Autoridade Técnica (Trust Bar / Social Proof Strip)**.

Esse componente consolida dados quantitativos reais da trajetória do fundador/Tech Lead em sistemas de missão crítica, articulando números de alta escala com a validação institucional de grandes clientes, órgãos reguladores e setores estratégicos atendidos.

---

## 2. Requisitos de Design e Boas Práticas de UI/UX

### 2.1 Posicionamento e Estrutura do Container
- **Posicionamento**: Mantido no ID `#autoridade` imediatamente antes da seção de Contato (`#contato`), exercendo a função de catalisador de conversão e prova social final.
- **Container Compacto e Fluido**: Substituição dos cards verticais pesados por uma faixa horizontal limpa com bordas sutis superior e inferior (`border-y border-zinc-200/80 dark:border-zinc-800/80`), fundo neutro suave (`bg-zinc-50/50 dark:bg-zinc-900/30`) e padding balanceado (`py-12 lg:py-16`).
- **Animação**: Entrada fluida e progressiva com Framer Motion (`useInView`), respeitando acessibilidade e `prefers-reduced-motion`.

### 2.2 Tipografia e Monocromatismo Estrito
- **Título da Seção (H2)**: "Autoridade técnica e impacto em missão crítica"
  - 100% monocromático: `text-zinc-900` no modo claro e `dark:text-white` no modo escuro.
  - Linearidade estrita: `font-bold tracking-tight text-2xl sm:text-3xl`.
  - Proibido o uso de spans coloridos, gradientes de texto ou títulos bicolores.
- **Badge Superior**:
  - `PROVA SOCIAL & AUTORIDADE`
  - Visual institucional pill com suporte dinâmico para Dark e Light mode.
- **Redação em PT-BR Culta**:
  - Proibição absoluta de travessão longo (`—`) ou meia-risca (`–`). Pontuação natural com dois-pontos, vírgulas, pontos e marcadores em bullet (`•`) ou barra (`/`).

---

## 3. Especificação das Features Combinadas

### 3.1 Bloco 1: Métricas de Missão Crítica (Dados Reais do Currículo)
Grid responsivo de 4 métricas com divisores sutis (`divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-zinc-800/80`):
1. **Métrica 1**:
   - Valor: `99,9%`
   - Legenda: `Uptime em ambientes de produção`
2. **Métrica 2**:
   - Valor: `2.500+ RPS`
   - Legenda: `Throughput suportado em arquiteturas distribuídas`
3. **Métrica 3**:
   - Valor: `+448 IES e 650 Escolas`
   - Legenda: `Impacto em plataformas educacionais e federais`
4. **Métrica 4**:
   - Valor: `Zero Perda`
   - Legenda: `Integridade em dados regulatórios e integrações críticas`

### 3.2 Bloco 2: Marcas, Órgãos e Setores de Missão Crítica
Faixa de validação institucional disposta abaixo do divisor horizontal:
- **Texto de Apoio**: "Engenharia comprovada em projetos e sistemas para grandes organizações e setores estratégicos:"
- **Marcas e Setores Atendidos**:
  1. `CAPES • MEC` (Ministério da Educação / Ensino Superior)
  2. `ONS (Operador Nacional do Sistema Elétrico)`
  3. `Energia Pecém`
  4. `Governo do MT (SEDUC)`
  5. `Indústria e Manufatura (IoT Industrial e ERP)`
- **Tratamento Visual**: Selos tipográficos corporativos refinados com opacidade controlada (`opacity-75 hover:opacity-100 transition-all`), microinteração de hover elegante e total harmonia com o tema ativo.

---

## 4. Plano de Testes e Validação

1. **Testes Unitários (`Authority.test.tsx`)**:
   - Validar renderização do cabeçalho da seção com o novo título monocromático.
   - Validar a presença das 4 métricas de missão crítica e suas legendas.
   - Validar a presença dos selos institucionais (CAPES • MEC, ONS, Energia Pecém, Governo do MT, Indústria e Manufatura).
   - Validar texto de apoio e renderização em estado fora do viewport (`useInView: false`).
2. **Testes End-to-End (`design-system-and-stability.spec.ts`)**:
   - Atualizar a asserção de heading de `#autoridade` para `"Autoridade técnica e impacto em missão crítica"`.
   - Garantir 100% de aprovação na suíte Playwright sem regressão de scroll spy ou contraste.
3. **Quality Gates**:
   - Cobertura de código $\ge 90\%$.
   - ESLint com 0 erros e 0 warnings.
   - Build de produção sem advertências de chunk size.
