# SPEC-068 — Redesign do Hero: Limpeza de Ruído e Janela de Arquitetura Ativa

- **Status:** Concluída / Aprovada pelo PO
- **Data:** 2026-10-01
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Motivação

A seção Hero é a porta de entrada institucional e comercial da **EPM DevTech**. Embora o conteúdo factual e os CTAs estejam calibrados para o posicionamento B2B, foram identificados os seguintes problemas na implementação visual atual:
1. **Ruído Visual na Transição**: Presença de uma linha divisória horizontal com ponto verde estático na parte inferior da dobra (`data-testid="hero-divider-line"`), sem função interativa ou de feedback real, gerando interrupção visual artificial.
2. **Sensação Estática e Altura Reduzida**: Em telas largas, a seção aparenta ser curta e com pouca profundidade espacial.
3. **Quadro de Arquitetura Pré-fabricado**: A coluna direita ("Topologia de Arquitetura") apresenta-se como uma pilha rígida de caixas estáticas sem dinamismo editorial, assemelhando-se a templates genéricos.

A refatoração busca alinhar a seção aos padrões de empresas técnicas de alto calibre (como Linear, Vercel e Supabase), com acabamento editorial, profundidade sutil e uma janela interativa de sistema ("Sistema & Arquitetura Ativa").

---

## 2. Diretrizes de Design, UX e Engenharia

### 2.1. Limpeza de Ruído Visual e Transição Orgânica
- Remoção definitiva da linha divisória horizontal inferior e do ponto verde estático.
- Transição suave e orgânica para a seção de Serviços através de espaçamento proporcional (`min-h-[85vh]` e `py-20 md:py-28`) e gradiente sutil no fundo (`bg-gradient-to-b from-transparent to-surface/40`).
- Atualização formal dos testes de trava visual (SPEC-059) para reconhecer a remoção da divisória e a presença do gradiente semântico na transição de superfícies.

### 2.2. Coluna Esquerda: Narrativa & Ação de Alta Conversão
- **Eyebrow Refinado**: Badge em cápsula sutil com borda e fundo da marca (`border border-brand/20 bg-brand/5 text-text-brand font-mono text-xs px-3 py-1 rounded-full`), integrando o ícone autoral `BrandChipIcon` e o texto `ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO`.
- **Tipografia H1**: Título de alto impacto visual com kerning ajustado (`tracking-tight text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.12] [text-wrap:balance]`).
- **Subtítulo**: Texto em `text-secondary` com contraste estrito WCAG AAA (9.12:1 no dark), largura máxima equilibrada (`max-w-xl text-base sm:text-lg`).
- **Ações (CTAs)**:
  - Primário: "Falar sobre meu projeto" em verde-água (`bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active shadow-sm font-semibold rounded-md min-h-[44px] transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]`).
  - Secundário: "Ver soluções" com contorno discreto (`border border-border-default bg-surface/50 hover:bg-surface-elevated text-secondary hover:text-primary font-medium rounded-md min-h-[44px] transition-colors duration-200`).
- **Micro Social Proof com Indicador Ativo**:
  - Abaixo dos CTAs, nota de experiência com ponto pulsante verde (`animate-ping` e ponto sólido em `bg-brand`):
    `"Sistemas em produção nos setores de energia, indústria, logística e corporativo."`

### 2.3. Coluna Direita: Janela Interativa "Sistema & Arquitetura Ativa"
- Substituição da moldura estática por uma janela interativa de arquitetura ativa (`border border-border-default/80 bg-surface/80 backdrop-blur-md rounded-xl shadow-lg relative overflow-hidden`):
  - **Cabeçalho de Janela Dev**:
    - Controles estilo MacOS/Linux (3 nós circulares sutis).
    - Título monospace central: `architecture.overview.ts`.
    - Indicador de status ativo no topo direito: `● HEALTHY / 99.9% uptime` com pulsação suave em `bg-brand-subtle text-text-brand border border-brand/20`.
  - **Profundidade e Iluminação**: Efeito de iluminação suave (glow/spotlight sutil `bg-brand/5 blur-3xl pointer-events-none`) na retaguarda do painel.
  - **4 Camadas Técnicas Conectadas**:
    1. `Aplicações Web & Portais` (`accent-blue` · React, TypeScript, Tailwind CSS)
    2. `APIs & Back-end Escalável` (`accent-violet` · Node.js, PHP / Laravel, REST / GraphQL)
    3. `Barramento & Mensageria` (`accent-amber` · RabbitMQ, Workers, Event-Driven)
    4. `Persistência & Nuvem` (`brand teal` · PostgreSQL, Redis, AWS / Docker)
  - Conectores verticais dinâmicos conectando os estágios da arquitetura.
  - Rodapé da janela com tags de observabilidade e CI/CD.

### 2.4. Tokens Semânticos em 2 Camadas & Acessibilidade
- 100% de adesão aos tokens do Design System (`text-primary`, `text-secondary`, `text-muted`, `bg-base`, `bg-surface`, `bg-elevated`, `border-border-default`, `border-border-subtle`, `brand`, etc.).
- Suporte nativo a Dark e Light Mode sem hardcoded `zinc-*` ou `emerald-*`.
- Suporte a `prefers-reduced-motion` no Framer Motion e touch target >= 44px em todos os elementos interativos.

---

## 3. Escopo de Arquivos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-068-hero-redesign-editorial-arquitetura.md` | Criar | Especificação canônica da refatoração do Hero |
| `tasks/TASK-068-hero-redesign-editorial-arquitetura.md` | Criar | Checklist de tarefas do protocolo SDD |
| `src/components/sections/Hero.tsx` | Modificar | Implementação do novo Hero com janela de arquitetura ativa e transição orgânica |
| `src/components/sections/__tests__/Hero.test.tsx` | Modificar | Atualização da suíte unitária para novos elementos e remoção do divisor |
| `e2e/hero-identity-token-locks.spec.ts` | Modificar | Adequação das travas visuais à remoção da linha divisória e gradiente semântico |
| `reviews/QA-068.md` | Criar | Relatório de validação de quality gates |
| `PROJECT.md` e `CHANGELOG.md` | Modificar | Registro da entrega e atualização do estado canônico |

---

## 4. Critérios de Aceitação

1. Linha horizontal e ponto estático inferior 100% removidos do DOM.
2. Transição com gradiente sutil de fundo e respiro proporcional (`min-h-[85vh]`).
3. Eyebrow em formato de badge arredondada refinada com `BrandChipIcon` e tipografia monospace.
4. H1 de alto impacto visual com kerning ajustado e cópia institucional preservada.
5. Botões CTA primário e secundário com estados hover/active refinados e touch target >= 44px.
6. Indicador pulsante de status ativo (`animate-ping`) no micro social proof factual.
7. Janela de arquitetura técnica com cabeçalho dev (`architecture.overview.ts`), indicador `HEALTHY / 99.9% uptime`, efeito spotlight suave e camadas com badges temáticas conectadas.
8. Zero quebras de responsividade em mobile (< lg empilhado de forma fluida).
9. Quality Gates: `npx tsc --noEmit` (0 erros), `npm run lint` (0 erros), `npm test -- --run` (100% aprovados), `npx playwright test` (100% aprovados), `npm run build` (sucesso).
