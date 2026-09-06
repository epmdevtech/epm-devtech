# SPEC-020 — Refatoração do Rodapé (Footer): Layout Moderno, Monocromático e 4 Colunas

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Refatoração do Rodapé: Layout Moderno, Monocromático e 4 Colunas      |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

O rodapé atual do site institucional da EPM DEVTECH possui links genéricos e uma distribuição que não reflete com precisão os serviços de ponta a ponta e a navegação real da página.

Esta refatoração substitui a estrutura anterior por um layout de 4 colunas moderno, 100% monocromático nos títulos, totalmente responsivo (1 coluna mobile, 2 em tablets e 4 em desktop), com alinhamento rigoroso aos serviços reais oferecidos e paridade visual e funcional perfeita entre Light e Dark Mode.

---

## 2. Diretrizes Visuais e Boas Práticas de UI/UX

### 2.1 Títulos das Colunas
- **100% Monocromático**: Sem bicolores ou spans coloridos.
- **Estilo Tipográfico**: Caixa alta, peso firme e tracking alargado:
  `text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4`.

### 2.2 Tipografia dos Links e Textos
- **Links de Navegação e Serviços**:
  `text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors`.
- **Texto de Apoio e Metadados**:
  `text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed`.

### 2.3 Containers e Divisores
- **Container do Rodapé**:
  `border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950 pt-16 pb-10`.
- **Sub-footer**:
  Divisor de 1px `border-t border-zinc-200/60 dark:border-zinc-800/60 mt-12 pt-6`.

### 2.4 Redação PT-BR Culta
- Proibição absoluta de travessão longo (`—`) ou meia-risca (`–`). Utilização de pontos, vírgulas ou barras simples para divisões.

---

## 3. Estrutura Detalhada das 4 Colunas

### 3.1 Coluna 1: EPM DEVTECH (Identidade e Posicionamento)
- **Marca / Logotipo**: Logotipo adaptativo WebP (versão light e dark com transparência nativa) com fallback tipográfico "EPM DEVTECH".
- **Texto de Apoio**:
  *"Engenharia de software sob medida, arquitetura de sistemas críticos e modernização de plataformas corporativas."*
- **Localização**:
  *"Toledo, Paraná."* acompanhado de ícone sutil de localização (`MapPin`).
- **Redes Sociais**:
  Links para GitHub (`https://github.com/ElessandroPrestes`) e LinkedIn (`https://www.linkedin.com/in/elessandro-prestes-macedo/` e empresa) com ícones discretos e transição no hover.

### 3.2 Coluna 2: Soluções (Serviços Reais)
- **Título**: `SOLUÇÕES`
- **Links**:
  1. Desenvolvimento Web e SPAs (`#servicos`)
  2. APIs e Microsserviços (`#servicos`)
  3. Modernização de Legados (`#servicos`)
  4. Arquitetura de Software (`#servicos`)
  5. Consultoria Técnica e Code Review (`#servicos`)

### 3.3 Coluna 3: Navegação (Âncoras do Menu)
- **Título**: `NAVEGAÇÃO`
- **Links**:
  1. Sobre a Empresa (`#sobre`)
  2. Serviços (`#servicos`)
  3. Tecnologias (`#tecnologias`)
  4. Diferenciais (`#diferenciais`)
  5. Fale Conosco (`#contato`)

### 3.4 Coluna 4: Contato Direto (Canais Rápidos)
- **Título**: `CONTATO`
- **Itens**:
  1. `elessandro@epmdevtech.com.br` (`mailto:elessandro@epmdevtech.com.br`)
  2. `WhatsApp: (45) 99917-8290` (`https://wa.me/5545999178290`)
  3. `Retorno técnico em até 24 horas úteis`

### 3.5 Barra Inferior (Sub-footer)
- **Lado Esquerdo**: `© 2026 EPM DEVTECH. Todos os direitos reservados.`
- **Centro**: `ThemeSwitcher` compacto (preservando acessibilidade via `role="radiogroup"` e botões de alternância Dark, Light e System).
- **Lado Direito**: `Código limpo, arquitetura sólida e alta disponibilidade.` com margem direita de segurança (`lg:pr-14`) para compatibilidade com o botão flutuante `ScrollToTop`.

---

## 4. Plano de Validação e Quality Gates

1. **Testes Unitários (`Footer.test.tsx`)**:
   - Validar renderização das 4 colunas com seus respectivos títulos em caixa alta e monocromáticos.
   - Validar links de Soluções, Navegação e Canais de Contato.
   - Validar links sociais (GitHub e LinkedIn) e localização ("Toledo, Paraná.").
   - Validar direitos autorais e frase de valor do sub-footer.
   - Validar alternância de tema no `ThemeSwitcher`.
2. **Testes E2E (`design-system-and-stability.spec.ts`)**:
   - Garantir 100% de sucesso nos 8 testes existentes, especialmente na alternância de tema e na não-oclusão do rodapé pelo `ScrollToTop`.
3. **Quality Gates**:
   - Cobertura $\ge 90\%$ nos componentes.
   - 0 erros no ESLint (`npm run lint`).
   - Build de produção sem warnings de chunks $> 600\text{ KB}$.
