# SPEC-047 — Hero Lamp Effect & Posicionamento Software House

| Campo          | Valor                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------|
| **ID**         | SPEC-047                                                                                             |
| **Título**     | Hero com Efeito Lamp (Aceternity UI Adaptado) & Posicionamento Software House Sob Medida            |
| **Prioridade** | Alta (Identidade Visual, UI/UX Design, Posicionamento Comercial e Conversão)                        |
| **Origem**     | Demanda PO (Adequação de Texto Software House e Integração do Efeito Lamp UI)                        |
| **Autor**      | Elessandro Prestes Macedo / Gemini Antigravity                                                       |
| **Status**     | ✅ Aprovada pelo PO                                                                                  |
| **Data**       | 2026-09-28                                                                                           |

---

## 1. Contexto e Motivação

O PO solicitou a atualização do copywriting da seção Hero para comunicar com clareza imediata a proposta de valor como **Software House** especializada em desenvolvimento sob medida, aliada à incorporação do efeito visual **Lamp** (inspirado no componente Aceternity UI), adaptado à identidade visual, paleta de cores e padrões de design system da EPM DEVTECH.

---

## 2. Requisitos de Copywriting

A seção Hero adotará a seguinte estrutura de texto canônica:

1. **Eyebrow / Status Badge**:
   - Chip / Tag: `EPM DEVTECH`
   - Label de apoio: `SOFTWARE HOUSE`
   - Link de âncora: `#sobre` com microinteração de seta.
2. **Headline Principal (`<h1>`)**:
   - Texto canônico: `Desenvolvemos software sob medida para o seu negócio.`
   - Tipografia: 100% monocromática (`text-foreground`), peso `font-bold`, escala fluida responsiva (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`), sem gradiente de texto colorido (conforme SPEC-014 e WCAG AAA).
3. **Supporting Copy (`<p>`)**:
   - Texto canônico: `Sistemas, aplicações web, APIs e integrações construídos para resolver problemas reais, com segurança, escala e evolução contínua.`
   - Cor: `text-muted-foreground`, tipografia confortável e legível.
4. **Dual CTA Actions**:
   - **CTA Primário**: `Falar sobre meu projeto →` com link `#contato`.
   - **CTA Secundário**: `Conhecer a EPM` com link `#sobre`.
5. **Microprova Social / Credenciais Técnicas**:
   - Texto: `Da ideia à produção • Engenharia direta • +9 anos de experiência`.

---

## 3. Requisitos de UI/UX e Efeito Visual (Lamp)

O efeito **Lamp** projeta feixes de luz cônicos volumétricos a partir do topo em direção ao conteúdo central do Hero:
- **Adaptação à Identidade EPM**:
  - Feixes de luz com tons no verde esmeralda institucional (`#10B981` / `from-emerald-500`, `bg-emerald-400`, `bg-emerald-500/40`), em harmonia com a marca e evitando tons descontextualizados.
  - Integração perfeita com tokens de tema (`bg-background` e `dark:bg-slate-950/bg-background`) para garantir elegância visual tanto no Modo Escuro quanto no Modo Claro.
- **Engenharia de Layout & Responsividade**:
  - Evitar quebras ou sobreposição com o Header fixo superior (`scroll-padding-top`, contenção de espaçamento).
  - Sem overflow horizontal em nenhum viewport (`320px`, `390px`, `768px`, `1024px`, `1440px`).
  - Suporte completo a `prefers-reduced-motion`.
- **Topologia de Arquitetura**:
  - Preservar a representação sutil de topologia de sistemas (`HeroArchitecture.tsx`) logo abaixo, integrando a iluminação superior com a transição suave de fade-out na base.

---

## 4. Escopo Detalhado

### IN
- `tailwind.config.ts`: Adição da utilidade de background `gradient-conic`.
- `src/components/ui/lamp.tsx`: Componente `LampContainer` adaptado com UX/UI ao ecossistema e tokens EPM.
- `src/components/sections/Hero.tsx`: Implementação da nova copy e integração com o efeito Lamp.
- `src/components/sections/hero/HeroBadge.tsx`: Ajuste dos rótulos para `EPM DEVTECH` / `SOFTWARE HOUSE`.
- `src/components/sections/__tests__/Hero.test.tsx`: Atualização dos testes unitários para a nova copy e asserções.
- `e2e/design-system-and-stability.spec.ts`: Atualização das validações de H1 e CTAs.
- Documentos de governança SDD: `SPEC-047`, `TASK-047`, `QA-047`, `PROJECT.md` e `CHANGELOG.md`.

### OUT
- Não alterar outras seções (`About`, `Services`, `Contact`, `Header`, etc.).
- Proibição de deploy/push sem aprovação prévia.
