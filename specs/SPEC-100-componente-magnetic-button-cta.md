# SPEC-100 — Componente Reutilizável de Botão Magnético (Magnetic Button) para CTAs Globais

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / Creative Engineering / Microinterações / GSAP / React / Tailwind CSS / Acessibilidade

---

## 1. Contexto e Motivação

As chamadas para ação (CTAs) da **EPM DevTech** — tanto no cabeçalho global, no Hero comercial da Home, nas páginas de Serviços e Sobre nós, quanto nos pontos de conversão direta — constituem os pontos mais críticos de interação de decisores B2B com a marca.

Inspirado na referência clássica e aclamada da indústria de estúdios criativos como **Codrops e Cuberto** (referência: *Magnetic Buttons*, Tympanus), o efeito magnético com **parallax multi-camada** adiciona uma camada de refinamento táctil superior: o botão é sutilmente "atraído" pelo cursor do usuário quando este se aproxima da sua área de influência, enquanto o texto/ícone interno se desloca em velocidade e amplitude maiores, criando uma sensação de profundidade tridimensional física (2.5D).

Esta especificação define a arquitetura, física, acessibilidade, performance e os pontos de aplicação do componente reutilizável `<MagneticButton>` em todo o ecossistema do site da EPM DevTech.

---

## 2. Princípios e Restrições Absolutas

1. **Preservação Visual e Cromática**:
   - Manter 100% da identidade cromática da EPM DevTech: variantes `primary` (fundo verde-água #2DD4BF / esmeralda de alto contraste com texto preto escuro), `outline` (borda refinada e texto nítido) e `ghost`.
   - O design estático do botão não deve sofrer alterações de dimensões ou tipografia; o efeito magnético atua como uma camada pura de microinteração cinemática sobreposta.
2. **Sobriedade Corporativa B2B**:
   - O magnetismo deve ser moderado, elegante e responsivo, sem movimentos abruptos ou oscilações exageradas que distraiam o usuário ou transmitam sensação de instabilidade.
3. **Zero Layout Shift (CLS = 0) e Alta Performance (60/120 FPS)**:
   - Cálculos cinemáticos aplicados estritamente sobre propriedades aceleradas por GPU (`transform: translate3d(x, y, 0)`), sem alterar dimensões, margens ou provocar reflows/repaints de layout.
   - Utilização de `gsap.quickTo()` para manipulação direta de nós DOM de alta taxa de quadros, evitando re-renderizações desnecessárias no ciclo do React.
4. **Isolamento de Ciclo de Vida e Limpeza de Memória**:
   - Utilização de `gsap.context()` com cleanup estrito (`ctx.revert()`) no desmonte de cada instância para evitar vazamentos de memória.
5. **Acessibilidade Rigorosa e Fallback Mobile**:
   - Em dispositivos touch (`pointer: coarse` ou sem suporte a hover), desativar integralmente os listeners magnéticos: o componente se comporta como um botão tátil nativo com feedback de toque.
   - Respeito estrito a `prefers-reduced-motion`: se o usuário preferir redução de movimento, o efeito magnético e o filler expansivo são desativados.
   - Foco acessível via teclado (`:focus-visible`) preservado com anel nítido conforme padrões WCAG AA.
   - Área de toque touch target compatível com WCAG (mínimo 44x44px).

---

## 3. Arquitetura da Mecânica Codrops / Cuberto

O componente é estruturado em três camadas cinemáticas independentes:

```
┌────────────────────────────────────────────────────────┐
│ 1. Camada Externa (Hitbox Magnética / Bounding Area)   │
│    Padding de sensibilidade extra além da borda visível│
│  ┌──────────────────────────────────────────────────┐  │
│  │ 2. Camada de Fundo (Surface / Border / Filler)   │  │
│  │    Translação média (~30% do vetor de atração)   │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │ 3. Camada de Conteúdo (Texto + Ícone)      │  │  │
│  │  │    Translação acentuada (~60% do vetor)    │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

1. **Camada Externa (Container Magnético / Hitbox)**:
   - Delimita a área de atração do cursor. Monitora eventos `mousemove`, `mouseenter` e `mouseleave`.
2. **Camada de Superfície (Filler / Surface)**:
   - Carrega o fundo visível, bordas, raio de arredondamento (`rounded-xl` ou `rounded-full`) e sombra.
   - Move-se proporcionalmente ao vetor que conecta o centro do botão à posição do cursor (fator de atração default: `0.30`).
   - Contém a camada interna de expansão do filler que se projeta a partir do ponto de entrada do cursor.
3. **Camada de Conteúdo (Label + Ícone)**:
   - Acomoda o texto e os ícones do CTA.
   - Move-se no mesmo vetor com maior amplitude (fator de atração default: `0.55`), criando o parallax 2.5D característico.
4. **Física de Retorno Elástico (Snap-back)**:
   - Em `mouseleave`, a translação de ambas as camadas retorna para `(0, 0)` com interpolação de retorno elástico suave (`ease: "elastic.out(1.1, 0.4)"` ou `ease: "power3.out"` com amortecimento refinado).

---

## 4. Especificações Técnicas do Componente

- **Caminho do Arquivo**: `src/components/ui/MagneticButton.tsx`
- **Tipagem**: TypeScript estrito com interface extensível para botões e links.

### 4.1 Interface de Propriedades (`MagneticButtonProps`)

```typescript
export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Rota interna do React Router (quando fornecido, renderiza como Link) */
  to?: string;
  /** Link externo ou âncora (quando fornecido, renderiza como âncora <a>) */
  href?: string;
  /** Variante visual de estilo */
  variant?: "primary" | "outline" | "ghost" | "secondary";
  /** Tamanho do botão */
  size?: "default" | "sm" | "lg" | "icon";
  /** Força do magnetismo da camada de superfície (padrão: 0.3) */
  strength?: number;
  /** Força do parallax do texto/conteúdo interno (padrão: 0.55) */
  textStrength?: number;
  /** Classes adicionais para o container ou conteúdo */
  className?: string;
  /** Elementos filhos */
  children: React.ReactNode;
}
```

### 4.2 Variantes de Estilo

- **`primary`** (Padrão EPM DevTech):
  - Fundo sólido `bg-brand` (#2DD4BF) no dark e no light, texto de alto contraste `text-zinc-950 font-semibold`, sombra sutil e brilho em hover.
- **`outline`**:
  - Borda `border border-border-default`, fundo transparente ou translúcido, texto `text-primary`.
- **`ghost`**:
  - Sem bordas, fundo transparente, hover discreto.

---

## 5. Locais de Aplicação Global no Projeto

1. **Header Global (`src/components/layout/Header.tsx`)**:
   - CTA "Fale conosco" do menu desktop e botão correspondente da gaveta mobile.
2. **Hero da Home (`src/components/sections/Hero.tsx`)**:
   - CTA primário "Falar sobre meu projeto" / "Vamos conversar".
3. **Hero de Serviços (`src/pages/ServicesPage.tsx`)**:
   - CTA de abertura "Solicite uma conversa técnica".
4. **Hero de Sobre nós (`src/pages/AboutPage.tsx`)**:
   - CTA institucional de direcionamento para contato.
5. **Formulário de Contato (`src/components/sections/Contact.tsx` / `ContactForm.tsx`)**:
   - Botão de envio "Falar sobre meu projeto".

---

## 6. Critérios de Aceite e Quality Gates

1. **Zero Regressão Visual e Funcional**:
   - 100% dos botões preservam seu comportamento de navegação (`to`, `href`) e submissão (`type="submit"`).
2. **Acessibilidade e Usabilidade**:
   - Foco visível via tecla Tab (`:focus-visible`) opera normalmente sem quebras estéticas.
   - Em dispositivos móveis / touch, a translação magnética fica inativa e o toque dispara imediatamente.
   - Se `prefers-reduced-motion` estiver ativo, o botão se mantém estático.
3. **Quality Gates do Projeto**:
   - TypeScript: `npx tsc --noEmit` sem erros.
   - ESLint: `npm run lint` sem erros e sem warnings.
   - Vitest: Cobertura ≥ 90% para o novo componente `MagneticButton.tsx` e 100% dos testes da suíte passando.
   - Playwright: Suíte E2E executada com 100% de sucesso.
   - Build: `npm run build` sem avisos de chunks excessivos.
