# SPEC-086 — Hero da Rota /servicos: Inclusão de CTA Centralizado de Alta Conversão

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Conversão / Rota de Serviços

---

## 1. Contexto e Motivação

Atualmente, a rota `/servicos` inicia com um cabeçalho informativo padrão (`PageHeader`), exibindo eyebrow (`SERVIÇOS`), título principal e subtítulo descritivo (*"Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver problemas reais de negócio."*).

Embora a comunicação editorial seja clara, a seção Hero não oferece um ponto imediato de conversão no primeiro viewport. O visitante ou tomador de decisão que já possui uma demanda definida precisa rolar toda a página ou recorrer ao menu global para iniciar contato.

Inspirado no padrão de conversão centralizado (referência Code Miner) e adaptado aos padrões técnicos, tokens e identidade dark/light da EPM DevTech:
- A seção Hero de `/servicos` passará a contar com um botão de chamada para ação (CTA) centralizado logo abaixo da descrição, com espaçamento harmônico (`mt-8`).
- O botão terá alto destaque cromático (acento esmeralda com brilho difuso sutil), microinteração refinada no hover e feedback tátil, mantendo contraste acessível (WCAG AAA) e touch target otimizado para dispositivos móveis.
- O destino da ação conduzirá de forma direta e consistente à rota canônica de contato e diagnóstico (`/contato`).

---

## 2. Escopo

### 2.1 Em Escopo

1. **Evolução do Componente `PageHeader.tsx`**:
   - Adicionar suporte a `children?: React.ReactNode` e `containerClassName?: string` na interface `PageHeaderProps`.
   - Renderizar `children` logo após o parágrafo de descrição, preservando alinhamento centralizado (`isCenter ? "text-center" : "text-left"`).
   - Manter retrocompatibilidade total com as demais 6 rotas do site que utilizam `PageHeader`.

2. **Refatoração da Seção Hero em `ServicesPage.tsx`**:
   - Inserir o botão CTA centralizado dentro do `PageHeader`:
     * **Texto da Ação:** `"Solicite uma conversa"` (ajuste editorial para acolher tomadores de decisão e gestores não estritamente técnicos no contato inicial).
     * **Ícone:** `ArrowRight` (`lucide-react`) posicionado à direita com transição suave no hover (`group-hover:translate-x-1 motion-reduce:transform-none`).
     * **Estilo Visual:** Fundo sólido esmeralda (`bg-emerald-400 hover:bg-emerald-300`), tipografia de alto contraste (`text-zinc-950 font-semibold`), cantos arredondados modernos (`rounded-xl`), sombra luminosa sutil (`shadow-[0_0_25px_rgba(52,211,153,0.25)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]`) e microinteração de escala (`hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 transition-all duration-200`).
     * **Acessibilidade:** Touch target mínimo de 44px (`min-h-[44px]`), anel de foco acessível (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2`).
     * **Responsividade:** Em telas pequenas (`< sm`), largura total limitada (`w-full max-w-xs`); em telas maiores (`sm:` em diante), largura automática intrínseca (`sm:w-auto`).
     * **Destino do CTA:** Navegação SPA via `<Link to="/contato">` para o fluxo de atendimento e agendamento técnico.

3. **Compatibilidade com Camadas Tonais (SPEC-082)**:
   - A seção permanece como `data-tone="anchor"` em `PageHeader`, garantindo compatibilidade plena tanto no tema Dark quanto no tema Light sem descontinuidades de elevação ou bordas artificiais.

4. **Testes e Qualidade**:
   - Atualização da suíte de testes unitários `src/pages/__tests__/pages.test.tsx` para assertar a presença, texto e destino do botão CTA na rota `/servicos`.
   - Execução integral dos quality gates (TypeScript, ESLint, Vitest, Playwright, Build).

### 2.2 Fora de Escopo

- Alterações no catálogo de serviços em Z-Pattern (`Services.tsx`).
- Modificação nas faixas de Garantias de Engenharia ou no fechamento comercial inferior de `ServicesPage.tsx`.
- Inclusão de botões em cabeçalhos de outras rotas (`/sobre`, `/engenharia`, etc.).

---

## 3. Especificação Técnica e Trecho Proposto

### 3.1 `PageHeaderProps` e `PageHeader.tsx`
```tsx
export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}
```

### 3.2 Implementação do Hero em `ServicesPage.tsx`
```tsx
<PageHeader
  eyebrow="SERVIÇOS"
  title="Soluções sob medida para cada estágio da sua operação"
  description="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver problemas reais de negócio."
>
  <div className="mt-8 flex justify-center">
    <Link
      to="/contato"
      className="group inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-auto font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(52,211,153,0.25)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:transition-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 min-h-[44px]"
    >
      <span>Solicite uma conversa</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 motion-reduce:transform-none transition-transform" />
    </Link>
  </div>
</PageHeader>
```

---

## 4. Critérios de Aceite

1. [ ] O Hero da página `/servicos` exibe o botão `"Solicite uma conversa"` centralizado logo abaixo da descrição (`mt-8`).
2. [ ] O botão apresenta fundo esmeralda brilhante (`bg-emerald-400`), tipografia escura nítida (`text-zinc-950`), glow sutil e cantos arredondados (`rounded-xl`).
3. [ ] No hover, o botão eleva o brilho da sombra e a seta à direita desloca-se ligeiramente (`translate-x-1`).
4. [ ] O botão respeita `motion-reduce`, desabilitando transições e transformações de escala quando solicitado pelo usuário.
5. [ ] Em viewport mobile (`< 640px`), o botão ocupa largura total proporcional (`w-full max-w-xs`), com altura mínima de 44px para facilitar o toque.
6. [ ] O clique navega diretamente para `/contato`.
7. [ ] A suíte de testes unitários e de integração passa com 100% de sucesso.
8. [ ] Zero regressões visuais ou de camadas tonais em Dark e Light Mode.

---

## 5. Quality Gates Obrigatórios

| Gate | Critério |
|---|---|
| **TypeScript** | `npx tsc --noEmit` — 0 erros |
| **ESLint** | `npm run lint` — 0 erros, 0 warnings |
| **Testes Unitários** | `npm test -- --run` — Cobertura ≥ 90% |
| **Build** | `npm run build` — Nenhum chunk > 600KB |
| **Prerender** | SSR gerando as 7 rotas estáticas com sucesso |
| **Acessibilidade** | WCAG AAA, foco por teclado e contraste adequado |

---

_SPEC elaborada segundo o protocolo Universal SDD. Aguardando aprovação explícita do PO._
