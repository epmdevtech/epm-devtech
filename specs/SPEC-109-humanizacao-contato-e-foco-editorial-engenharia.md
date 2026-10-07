# SPEC-109 — Humanização Editorial do Contato e Foco Editorial na Rota de Engenharia

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-109                                   |
| **Data**      | 2026-10-07                                 |
| **Autor**     | Elessandro Prestes Macedo / Gemini         |
| **Status**    | Aprovada                                   |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

1. **Contato (`/contact` e Seção de Contato)**:
   - A abordagem de contato atual utilizava redação transacional ("Solicitar orçamento", "Retorno em até 24 horas úteis"), que cria expectativas artificiais e contradiz o posicionamento de consultoria e engenharia sob medida.
   - Inspirando-se no modelo editorial maduro (referência Codeminer42), a comunicação deve ser acolhedora, transparente e pragmática, convidando a uma conversa consultiva para entender a operação do cliente, sem promessas pré-fabricadas de prazo de resposta, com alternativa clara de contato direto por e-mail (`contato@epmdevtech.com.br`) e botão de ação `"ENVIAR MENSAGEM"`.

2. **Rota de Engenharia (`/engineering`)**:
   - A rota de engenharia tem caráter de autoridade técnica, arquitetura de sistemas e apresentação de qualidade contínua.
   - Ter um botão de CTA na primeira dobra ("VER TECNOLOGIAS") polui o cabeçalho editorial e causa concorrência visual com a Navbar fixa.
   - O botão deve ser removido do Hero da página, mantendo a conversão comercial apenas no fechamento/rodapé da rota (Bottom CTA: `"VAMOS CONVERSAR"`).

---

## 1. Alterações Específicas de UX e Redação

### 1.1 Seção e Página de Contato (`Contact.tsx` e `ContactPage.tsx`)
- **Título Principal (H1/H2)**: `"Vamos conversar sobre como podemos apoiar você e seu projeto"`.
- **Texto de Apoio / Alinhamento de Expectativa**: `"Assim que recebermos sua mensagem, entraremos em contato para entender o cenário técnico e agendar uma conversa."`
- **Eliminação de Prazos Artificiais**: Remoção de qualquer menção a "24h" ou "em até 1 dia" em textos, lista de próximos passos, mensagens de feedback (toasts) e metadados SEO.
- **Canal Direto por E-mail**: Inclusão destacada da alternativa:
  `"Prefere e-mail? Escreva diretamente para contato@epmdevtech.com.br"` com link `mailto:contato@epmdevtech.com.br`.
- **Botão de Submissão**: `"ENVIAR MENSAGEM"` formatado em caixa alta obrigatória (`uppercase tracking-[0.04em] font-semibold`) com a geometria `btn-bevel-4`.
- **Preservação de Identidade Visual**: Manutenção integral das paletas semânticas da EPM DevTech (escuro/gelo e acentos em verde-água/esmeralda), sem adoção de cores de templates externos.

### 1.2 Rota de Engenharia (`EngineeringPage.tsx`)
- **Hero / PageHeader**: Remoção completa do botão `<MagneticButton>` do topo da página.
- **Fechamento Comercial (Bottom CTA)**: Inclusão de seção de encerramento com o CTA `"VAMOS CONVERSAR"` apontando para `/contact`, preservando o ritmo tonal da página.

---

## 2. Quality Gates Obrigatórios

- TypeScript: Zero erros de compilação
- ESLint: Zero erros (`npm run lint`)
- Testes Unitários: Cobertura geral ≥ 90% (`npm run test:coverage`)
- Testes E2E: 100% de aprovação (`npm run test:e2e`)
- Build de Produção: Sem avisos de chunks > 600KB e com pré-renderização estática (`npm run build`)
