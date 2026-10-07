# SPEC-107 — Padronização de Redação (Copy) B2B e Estilo dos Botões de Ação e CTAs em Caixa Alta (Uppercase)

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-107                                   |
| **Data**      | 2026-10-04                                 |
| **Autor**     | Elessandro Prestes Macedo / Gemini         |
| **Status**    | Aprovada                                   |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

Atualmente, diversos botões de ação e CTAs espalhados pelo site da EPM DevTech (Header, Hero, seções e páginas internas) utilizam variações de frases genéricas ou redações heterogêneas ("Fale conosco", "Vamos conversar", "Conversar sobre seu projeto", "Falar sobre meu projeto", "Ver todos os serviços", etc.).

Faz-se necessária a eliminação completa de clichês de templates e IA ("Saiba mais", "Clique aqui", "Explore", etc.), substituindo-os por uma **hierarquia verbal comercial, direta e humana** desenhada para tomadores de decisão B2B, com **todos os botões estritamente formatados em CAIXA ALTA (UPPERCASE)** e tipografia equilibrada com kerning refinado (`tracking-[0.04em]` a `tracking-wider`).

---

## 1. Hierarquia Verbal & Jornada do Usuário

A distribuição dos botões segue a jornada intencional: **Entender → Conhecer → Aprofundar → Conversar**:

1. **CTA Principal** (Primeira pessoa, recorrente e forte): `"FALE COMIGO"`
2. **CTA de Descoberta** (Compreensão de escopo): `"CONHEÇA AS SOLUÇÕES"`
3. **CTA de Aprofundamento** (Conteúdo modular/específico): `"VER DETALHES"`
4. **CTA de Relacionamento** (Fechamento/contato): `"VAMOS CONVERSAR"`
5. **CTA Comercial** (Fase de proposta/conversão): `"SOLICITAR ORÇAMENTO"`

---

## 2. Matriz de Aplicação por Página e Seção

| # | Local / Componente | Elemento / Papel | Texto Anterior | Novo Texto Padronizado | Destino / Ação |
|---|--------------------|------------------|----------------|------------------------|----------------|
| 1 | **Header / Navbar** (`src/components/layout/Header.tsx`) | CTA Desktop & Mobile | "Fale conosco" | **"FALE COMIGO"** | `/contact` |
| 2 | **Hero da Home** (`src/components/sections/Hero.tsx`) | Botão Primário | "Vamos conversar" | **"FALE COMIGO"** | `/contact` |
| 2 | **Hero da Home** (`src/components/sections/Hero.tsx`) | Botão Secundário | *(ausente)* | **"CONHEÇA AS SOLUÇÕES"** | `/services` |
| 3 | **Sobre a Empresa** (`Home.tsx` / `About.tsx`) | Apresentação Institucional | "Conhecer nossa experiência" *(link)* | **"CONHEÇA A EPM DEVTECH"** | `/about` |
| 3 | **Página Sobre** (`src/pages/AboutPage.tsx`) | CTA de Fechamento / Conversão | "Fale conosco" | **"FALE COMIGO"** | `/contact` |
| 4 | **Seção Serviços** (`Home.tsx`) | Botão / Link de Cabeçalho da Seção | "Ver todos os serviços →" | **"VER SOLUÇÕES"** | `/services` |
| 4 | **Cards de Serviços** (`HomeServicesBento.tsx`) | Botões nos 4 Cards Bento | Textos variados | **"VER DETALHES"** | `/services` |
| 4 | **Página de Serviços** (`ServicesPage.tsx`) | CTA do PageHeader | "Conversar sobre seu projeto" | **"VAMOS CONVERSAR"** | `/contact` |
| 5 | **Processo / Metodologia** (`Home.tsx`) | Botão de Navegação / Aprofundamento | "Ver como trabalhamos →" | **"COMO TRABALHAMOS"** | `/how-we-work` |
| 6 | **Stack & Engenharia** (`EngineeringPage.tsx`) | Botão de Exploração Técnica | *(ausente no header)* | **"VER TECNOLOGIAS"** | `#tecnologias` |
| 7 | **Projetos / Setores** (`Home.tsx`) | Botão de Direcionamento | "Conhecer nossa experiência →" | **"VER EXPERIÊNCIA"** | `/experience` |
| 8 | **Bloco Contato & Conversão** (`Contact.tsx`) | Chamada Inicial / Proposta | "Falar sobre meu projeto" | **"SOLICITAR ORÇAMENTO"** | Envio de proposta |
| 9 | **Formulário de Envio** (`ContactForm.tsx`) | Botão de Submit | "Enviar Mensagem" | **"ENVIAR MENSAGEM"** | Envio de formulário |
| + | **Página FAQ** (`FAQPage.tsx`) | CTA de Dúvidas / Fechamento | "Falar sobre meu projeto" | **"VAMOS CONVERSAR"** | `/contact` |
| + | **Página 404** (`NotFound.tsx`) | 3 Botões de Navegação | "Página inicial", "Ver serviços", "Fale conosco" | **"PÁGINA INICIAL"**, **"VER SOLUÇÕES"**, **"FALE COMIGO"** | `/`, `/services`, `/contact` |

---

## 3. Diretrizes de Tipografia e Estilo (Tailwind CSS)

1. **Formatação Visual**:
   - Classe utilitária: `uppercase`.
   - Kerning/tracking refinado: `tracking-[0.04em]` a `tracking-wider`.
   - Peso tipográfico: `font-semibold` ou `font-bold`.
   - Escala:
     - Botões compactos (Navbar, cards): `text-xs md:text-sm px-5 py-2.5`
     - Botões de grande impacto (Hero, CTAs finais): `text-sm md:text-base px-8 py-3.5`
2. **Preservação de Geometria e Design**:
   - Manter a geometria Full Bevel de 4 cantos (`btn-bevel-4` / `btn-bevel-4-sm`).
   - Manter contraste semântico: `text-zinc-950` sobre botão primário esmeralda; `text-zinc-200` em variantes outline.
   - Atualizar a base de `MagneticButton` para incluir `uppercase tracking-wider font-semibold` por padrão.

---

## 4. Lista Negra — Termos Banidos (Zero Ocorrências)

- ❌ "Saiba mais"
- ❌ "Clique aqui"
- ❌ "Conheça mais"
- ❌ "Ver mais"
- ❌ "Leia mais"
- ❌ "Quero saber mais"
- ❌ "Comece agora"
- ❌ "Descubra"
- ❌ "Explorar"
- ❌ "Mais detalhes"

---

## 5. Quality Gates Obrigatórios

- TypeScript: Zero erros (`tsc --noEmit`)
- ESLint: Zero erros (`npm run lint`)
- Testes: Vitest com cobertura geral ≥ 90% (`npm run test:coverage`)
- Build: Sem warnings de chunk > 600KB (`npm run build`)
