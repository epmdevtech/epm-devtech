# SPEC-002 — Resolução de CLS, Otimização de Imagens, Contraste de Acessibilidade e Navegação Agêntica

| Campo         | Valor                          |
|---------------|-------------------------------|
| **ID**        | SPEC-002                      |
| **Data**      | 2026-08-28                    |
| **Autor**     | Elessandro Prestes Macedo     |
| **Status**    | ✅ Aprovada                    |
| **Versão**    | 1.0                           |

---

## Contexto e Motivação

Relatório PageSpeed Insights / Lighthouse Mobile (28/ago/2026 16:51) indicou novos pontos a otimizar:
1. **CLS: 0.155** (meta: < 0.1): causado principalmente pelo efeito de digitação do Typewriter no Hero (`<h1>` e `<p>`), gerando deslocamento de layout contínuo conforme o texto é renderizado caractere a caractere.
2. **Entrega de Imagens (economia estimada 130 KiB)**: `/logo-emp-dev-tech.png` possui 134 KB (964x326 px) e não possui `width` e `height` explícitos em `Header.tsx` e `Footer.tsx`.
3. **Acessibilidade - Contraste (96)**: Elementos falhando na taxa de contraste 4.5:1 (WCAG AA):
   - Botão "Conheça os Serviços" no Hero (texto branco sobre azul primário `#2979FF` com razão ~3.6:1).
   - Botão "Aceitar todos" no CookieBanner (texto branco sobre azul primário `--primary`).
4. **Navegação Agêntica (1/3)**: `public/llms.txt` apontou ausência de links formatados em Markdown (`[Título](url)`).
5. **Animações Não-Compostas**: Contadores animados e labels de estatísticas em `About.tsx` disparando avisos de parâmetros de tempo incompatíveis.

---

## Objetivo

Reduzir o **CLS de 0.155 para < 0.02**, eliminar a sobrecarga de 130 KB de imagens com WebP e dimensões explícitas, elevar a pontuação de **Acessibilidade para 100** com contraste $\ge 4.5:1$ e **Navegação Agêntica para 3/3** com markdown links no `llms.txt`.

---

## Escopo

### IN
1. **Hero**: Renderizar o `<h1>` e `<p>` do Hero de forma direta e estável, utilizando animação de entrada com opacidade/fade-up do Framer Motion em vez de digitação caractere por caractere com cursor pulsante, zerando o CLS do Hero e acelerando a medição do LCP.
2. **Logos**: Gerar e adotar `logo-emp-dev-tech.webp` (9.5 KB) com atributos explícitos `width={145}` e `height={49}` no Header e Footer.
3. **Contraste de Acessibilidade (WCAG AA 4.5:1)**:
   - Ajustar o token `--primary` para `221 83% 53%` (ou `#1d64f2` / `#1658e4`) garantindo contraste $\ge 4.5:1$ com texto branco.
   - Ajustar o estilo inline do botão Hero para usar cor de fundo contrastante ou herdar a classe acessível `bg-primary text-primary-foreground`.
4. **Navegação Agêntica (`public/llms.txt`)**: Reestruturar o arquivo com cabeçalho H1 único, resumo e links Markdown `[Título](URL): Descrição` em todas as seções (Serviços, Stack, Contato, Recursos).
5. **About**: Otimizar a animação dos labels de estatísticas para usar composição GPU direta sem timing mismatches.

### OUT
- Alteração visual estrutural de seções
- Alteração de rotas ou regras de negócio

---

## Critérios de Aceitação

- [ ] CLS testado sem deslocamentos de layout bruscos no Hero
- [ ] Elementos `<img>` do logo possuem `width` e `height` definidos
- [ ] Imagem do logo servida em formato leve (< 15 KB)
- [ ] Contraste de botões primários com texto branco $\ge 4.5:1$
- [ ] `public/llms.txt` contém links formatados em Markdown
- [ ] 100% dos testes unitários passando (`npm run test`)
- [ ] Build de produção limpo (`npm run build`)

---

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-08-28               |
| **Status**         | ✅ Aprovada               |
