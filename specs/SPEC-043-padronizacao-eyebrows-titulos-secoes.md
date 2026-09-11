# SPEC-043: Padronização Visual de Eyebrows das Seções com Ícone da Marca e Atualização de Textos

| Campo         | Valor                                                                                                |
|---------------|------------------------------------------------------------------------------------------------------|
| **ID**        | SPEC-043                                                                                             |
| **Título**    | Padronização Visual de Eyebrows das Seções com Ícone da Marca e Atualização de Conteúdo Textual      |
| **Prioridade**| Alta (Consistência Visual, Design System, Hierarquia Editorial)                                      |
| **Origem**    | Demanda PO (2026-09-10)                                                                              |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                                       |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo — 2026-09-10)                                                 |
| **Data**      | 2026-09-10                                                                                           |

---

## 1. Contexto e Motivação

Atualmente, cada uma das seções da landing page da **EPM DEVTECH** utiliza um cabeçalho composto por um "badge em cápsula" com borda e fundo (`rounded-full`, fundo e borda em verde esmeralda claro), título principal e parágrafo descritivo.

Para elevar a sofisticação visual do projeto e estabelecer uma assinatura institucional forte e uniforme, o PO definiu a substituição do badge em cápsula pelo padrão minimalista:
**"Ícone da Marca (traço) + Texto em tom secundário"**.

Adicionalmente, os textos de títulos e parágrafos de todas as 8 seções foram revisados para maior concisão comercial e técnica, eliminando redundâncias (com remoção de parágrafos ou títulos onde os cards/conteúdos já cumprem o papel de contextualização) e eliminando expressamente qualquer caractere de travessão (`—`) nos textos.

---

## 2. Requisitos Técnicos e de Design System

### 2.1. Estilo do Eyebrow (Aplicável às 8 Seções)
- [x] **Remoção da Cápsula**: Eliminar completamente o contêiner tipo pill (fundo, borda arredondada, padding e dot pulsante).
- [x] **Ícone da Marca (`BrandChipIcon`)**:
  - Traço do ícone de chip/processador estilizado com chaves da logo institucional (`{ [ ] }`), sem o quadrado sólido de fundo;
  - Dimensão: ~15px (`w-[15px] h-[15px]`);
  - Cor de destaque: verde esmeralda oficial `#10B981` (`text-emerald-500`);
  - Sem fundo, sem borda e sem preenchimento colorido atrás dele;
  - Alinhado verticalmente ao centro com o texto.
- [x] **Espaçamento**: 7px de distância entre o ícone e o texto (`gap-[7px]`).
- [x] **Tipografia do Eyebrow**:
  - Cor: cinza secundário do tema (`text-zinc-500 dark:text-zinc-400`);
  - Tamanho: ~11.5px (`text-[11.5px]`);
  - Peso: 500 (`font-medium`);
  - Espaçamento entre letras: `letter-spacing: 0.1em` (`tracking-[0.1em]`);
  - Transformação: caixa alta (`uppercase`).
- [x] **Alinhamento**: Preservar o alinhamento da seção (centralizado ou alinhado à esquerda).

### 2.2. Conteúdo por Seção (Zero Travessões `—`)

1. **Prova Social & Autoridade (`Authority.tsx`)**:
   - **Eyebrow**: `Prova Social & Autoridade`
   - **Título**: `Projetos em produção, não em portfólio`
   - **Parágrafo**: REMOVIDO (compensar padding/margin vertical)
2. **Sobre a EPM DEVTECH (`About.tsx`)**:
   - **Eyebrow**: `Sobre a EPM DEVTECH`
   - **Título**: `Uma trajetória técnica, não um discurso de vendas`
   - **Parágrafo**: *"A EPM DEVTECH nasceu da experiência de Elessandro Prestes Macedo, Engenheiro de Software Sênior e Tech Lead, ao longo de mais de 9 anos arquitetando e modernizando plataformas corporativas para instituições que não podem parar. Hoje trabalhamos com metodologia Spec-Driven Development (SDD) combinada a ferramentas modernas de IA, o que garante requisitos rastreáveis, especificações precisas e entregas previsíveis a cada ciclo."*
3. **Experiência por Setor (`Sectors.tsx`)**:
   - **Eyebrow**: `Experiência por Setor`
   - **Título**: `Cada setor tem suas próprias regras`
   - **Parágrafo**: *"Backoffice, saúde, indústria: cada um exige uma leitura diferente de compliance, volume de dados e tolerância a falha. Entendemos essas diferenças antes de desenhar a arquitetura, não depois."*
4. **Serviços (`Services.tsx`)**:
   - **Eyebrow**: `Serviços`
   - **Título**: `Da primeira reunião ao deploy em produção`
   - **Parágrafo**: *"Planejamento, arquitetura, testes automatizados e entrega: cuidamos de cada etapa com o mesmo padrão técnico, sem atalhos que viram dívida técnica depois."*
5. **Stack Tecnológica (`Technologies.tsx`)**:
   - **Eyebrow**: `Stack Tecnológica`
   - **Título**: REMOVIDO
   - **Parágrafo**: REMOVIDO (compensar padding/margin vertical)
6. **Diferenciais (`Differentials.tsx`)**:
   - **Eyebrow**: `Diferenciais`
   - **Título**: `Por que escolher a EPM DEVTECH`
   - **Parágrafo**: REMOVIDO (compensar padding/margin vertical)
7. **Dúvidas Frequentes (`FAQ.tsx`)**:
   - **Eyebrow**: `Dúvidas Frequentes`
   - **Título**: `As perguntas que sempre chegam primeiro`
   - **Parágrafo**: *"Respostas diretas sobre como começar um projeto, como mexemos em sistema legado e como funciona nosso modelo de trabalho."*
8. **Contato (`Contact.tsx`)**:
   - **Eyebrow**: `Contato`
   - **Título**: `Vamos entender o seu desafio`
   - **Parágrafo**: *"Não precisa chegar com arquitetura definida ou stack escolhida. Descreva o que está travando ou o que você quer construir; nós indicamos o caminho técnico mais adequado."*

### 2.3. Regras e Restrições
- Não alterar nenhum outro elemento das seções (cards, ícones, grids, imagens, formulários, CTAs).
- Ajustar os espaçamentos verticais nas seções 1, 5 e 6 onde parágrafos/títulos foram removidos.
- Preservar responsividade (mobile/tablet/desktop) e comportamento light/dark mode.
- Preservar hierarquia semântica de tags (h2, p).
- Zero caracteres de travessão (`—`) em todos os textos.

---

## 3. Quality Gates

- Testes Unitários: 100% de aprovação (135+ testes).
- Testes E2E (Playwright): 10/10 testes aprovados.
- ESLint: 0 erros.
- Build: Sucesso com chunks < 600KB.
- Emissão de `QA-043.md` e atualização da documentação.
