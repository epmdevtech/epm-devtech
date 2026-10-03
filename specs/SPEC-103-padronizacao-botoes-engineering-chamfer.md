# SPEC-103 — Padronização Visual Global dos Botões de Ação com a Geometria Autoral "Engineering Chamfer"

- **Status:** APROVADO
- **Data de Criação:** 2026-10-03
- **Data de Aprovação:** 2026-10-03
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / Design Systems / UI/UX / Microinterações / Tailwind CSS / Shadcn UI / React 18

---

## 1. Contexto e Motivação

Atualmente, os botões e CTAs do ecossistema EPM DevTech apresentam variações geométricas (alguns com `rounded-full`, outros com `rounded-md`, `rounded-xl` ou `rounded-lg`), gerando ligeira inconsistência de linguagem visual entre páginas e seções.

Para consolidar a identidade institucional autoral da marca — uma software house focada em alta precisão, arquitetura robusta e pragmatismo de engenharia —, é introduzida a nova assinatura visual dos botões: o **"Engineering Chamfer"**.

### Geometria do "Engineering Chamfer":
- **3 Cantos Arredondados**: Mantém arredondamento sutil (`rounded-md`, 6px / 0.375rem) nos cantos superior esquerdo, inferior esquerdo e inferior direito.
- **Canto Superior Direito Chanfrado**: Chanfro cirúrgico a 45º via `clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)`.
- **Chanfro Duplo (Opcional)**: `.btn-chamfer-dual` com chanfro superior direito e inferior esquerdo para variações técnicas especiais.
- **Harmonia Cromática**: Cores alinhadas aos tokens da marca (`bg-brand` #2DD4BF, `text-on-brand` #04201C na variante sólida `chamfer`, e acabamento translúcido escuro com borda sutil na variante `chamfer-outline`).

---

## 2. Escopo da Especificação

### 2.1 Em Escopo

1. **Utilitários de Chanfro Técnico em `src/index.css`**:
   - Criação da classe `.btn-chamfer` na camada `@layer utilities`.
   - Criação da classe `.btn-chamfer-dual` na camada `@layer utilities`.
2. **Atualização do Componente Base `src/components/ui/button.tsx`**:
   - Adição das variantes `chamfer`, `chamfer-outline` e `chamfer-gradient` em `buttonVariants`.
   - Suporte ao tamanho `md: "h-10 px-6 py-2.5"` na prop `size`.
3. **Integração no `src/components/ui/MagneticButton.tsx`**:
   - Incorporação padrão da classe `btn-chamfer` e `rounded-md` no elemento interativo interno (`button`, `Link` ou `<a>`).
   - Adição das variantes visuais `chamfer` e `chamfer-outline` em `variantStyles`.
   - Suporte ao tamanho `md` em `sizeStyles`.
   - Adaptação da cortina filler animada da variante outline para preenchimento harmônico com o chanfro.
4. **Auditoria e Padronização nas Páginas e Seções**:
   - **Header / Navbar (`src/components/layout/Header.tsx`)**: CTA desktop e drawer mobile com `variant="chamfer"`.
   - **Home Hero (`src/components/sections/Hero.tsx`)**: CTA primário "Vamos conversar" com `variant="chamfer"` (preservando CTA único e travas de tokens conforme SPEC-084 e SPEC-059).
   - **Página de Serviços (`src/pages/ServicesPage.tsx`)**: Hero CTA "Conversar sobre seu projeto" com `variant="chamfer"`.
   - **Página Sobre Nós (`src/pages/AboutPage.tsx`)**: Inclusão de CTA institucional no hero editorial com `variant="chamfer"` e `size="md"`.
   - **Página de Dúvidas (`src/pages/FAQPage.tsx`)**: CTA final com `variant="chamfer"`.
   - **Página 404 (`src/pages/NotFound.tsx`)**: Botões com `variant="chamfer"` e `variant="chamfer-outline"`.
   - **Formulário de Contato (`ContactForm.tsx` & `Contact.tsx`)**: Botões de envio integrados com `variant="chamfer"`.
5. **Quality Gates & Testes**:
   - Testes unitários para `button.tsx` e `MagneticButton.tsx`.
   - Validação dos 46 testes E2E do Playwright (especialmente travas de tokens em `hero-identity-token-locks.spec.ts`).

### 2.2 Fora de Escopo

- Alteração da lógica cinemática e de proximidade já calibrada na SPEC-102.
- Adição de CTAs duplicados na Home que violem a SPEC-084.

---

## 3. Especificação Técnica Detalhada

### 3.1 `src/index.css`
```css
@layer utilities {
  /* Chanfro de precisão no canto superior direito */
  .btn-chamfer {
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
  }
  /* Chanfro duplo equilibrado (superior direito + inferior esquerdo) */
  .btn-chamfer-dual {
    clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  }
}
```

### 3.2 `src/components/ui/button.tsx`
```tsx
chamfer: "btn-chamfer relative inline-flex items-center justify-center font-semibold text-on-brand bg-brand hover:bg-brand-hover active:bg-brand-active transition-all duration-200 shadow-[0_0_20px_-4px_rgba(45,212,191,0.35)] active:scale-[0.98]",
"chamfer-outline": "btn-chamfer relative inline-flex items-center justify-center font-medium text-zinc-200 bg-zinc-950/80 border border-zinc-800 hover:border-brand/60 hover:text-white transition-all duration-200 backdrop-blur-sm active:scale-[0.98]",
"chamfer-gradient": "btn-chamfer relative inline-flex items-center justify-center font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-[0_0_20px_-4px_rgba(52,211,153,0.35)] active:scale-[0.98]",
```

### 3.3 Acessibilidade e WCAG AA/AAA
- Foco visível preservado: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`.
- Contraste de cor verificado: `text-on-brand` (`#04201C`) sobre `bg-brand` (`#2DD4BF`) atinge contraste 12.44:1 (WCAG AAA).
- Touch target mínimo de 44px mantido em todas as versões mobile.

---

## 4. Critérios de Aceite

1. Todos os botões principais utilizam a silhuetachanfrada no canto superior direito via `.btn-chamfer`.
2. As variantes sólidas e outline mantêm coerência visual absoluta entre desktop e mobile.
3. Zero erros de compilação TypeScript (`npx tsc --noEmit`).
4. Zero erros de lint (`npm run lint`).
5. 100% dos testes unitários passando (`npm test -- --run`).
6. 100% dos testes Playwright E2E aprovados (`npx playwright test`), incluindo estabilidade visual do Hero.
7. Build de produção concluído com sucesso (`npm run build`).
