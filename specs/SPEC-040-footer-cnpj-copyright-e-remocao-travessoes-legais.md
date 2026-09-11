# SPEC-040: Footer — Migração do CNPJ para Linha de Copyright, Limpeza da Coluna 1 e Eliminação de Travessões nos Termos Legais

| Campo         | Valor                                                                                                       |
|---------------|-------------------------------------------------------------------------------------------------------------|
| **ID**        | SPEC-040                                                                                                    |
| **Título**    | Footer — Migração do CNPJ para Linha de Copyright, Limpeza da Coluna 1 e Eliminação de Travessões nos Modais |
| **Prioridade**| Média (UI/UX, Polimento Editorial, Conformidade Textual)                                                    |
| **Origem**    | Demanda PO (2026-09-10)                                                                                     |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                                              |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo — 2026-09-10)                                                        |
| **Data**      | 2026-09-10                                                                                                  |

---

## 1. Contexto e Motivação

O Product Owner solicitou uma simplificação estética e refinamento no rodapé (`src/components/sections/Footer.tsx`) e nos documentos legais (`src/components/legal/LegalModals.tsx`):
1. **Coluna 1 do Rodapé**: Remover o bloco cadastral vertical (Razão Social, CNPJ e Nome Fantasia) posicionado abaixo de "Toledo, Paraná.", restabelecendo o layout limpo da coluna de identidade.
2. **Linha de Copyright (Sub-footer)**: Consolidar a identificação jurídica diretamente na linha de direitos reservados:
   `© 2026 EPM DEVTECH  ·  CNPJ 60.710.574/0001-85. Todos os direitos reservados.`
3. **Modais de Termos de Uso e Política de Privacidade**: Eliminar todos os caracteres de travessão (`—`) dos títulos e parágrafos dos modais jurídicos, utilizando pontuação gramatical formal em português brasileiro (dois-pontos, vírgulas ou barras verticais) com redação impecável.

---

## 2. Requisitos Técnicos e de Design

### 2.1. Alterações no Rodapé (`Footer.tsx`)
- [x] **Coluna 1**: Remover o contêiner com `ELESSANDRO PRESTES MACEDO DESENVOLVIMENTO DE SOFTWARE LTDA`, `CNPJ: 60.710.574/0001-85 · Matriz` e `Nome Fantasia: EPM DEVTECH (ME)`.
- [x] **Sub-footer**: Atualizar a string de copyright para o formato exato solicitado:
  `© {currentYear} EPM DEVTECH  ·  CNPJ 60.710.574/0001-85. Todos os direitos reservados.`

### 2.2. Alterações nos Modais Legais (`LegalModals.tsx`)
- [x] Substituir `Termos de Uso — EPM DEVTECH` por `Termos de Uso | EPM DEVTECH`.
- [x] Substituir `Política de Privacidade (LGPD) — EPM DEVTECH` por `Política de Privacidade (LGPD) | EPM DEVTECH`.
- [x] Substituir o trecho `Todo o conteúdo exibido neste site — incluindo textos, códigos-fonte, arquitetura de software, layouts, elementos gráficos, logomarcas, ícones e ilustrações interativas — é de propriedade exclusiva` por `Todo o conteúdo exibido neste site, incluindo textos, códigos-fonte, arquitetura de software, layouts, elementos gráficos, logomarcas, ícones e ilustrações interativas, é de propriedade exclusiva`.
- [x] Garantir que nenhum caractere de travessão (`—`) permaneça no arquivo.

### 2.3. Testes Unitários (`Footer.test.tsx`)
- [x] Atualizar os testes para validar a nova linha de copyright com CNPJ integrado.
- [x] Atualizar asserções para confirmar a ausência do bloco vertical antigo na Coluna 1.

---

## 3. Quality Gates Aplicáveis

- **Vitest**: 100% dos testes passando com cobertura global $\ge 90\%$.
- **ESLint**: 0 erros e 0 warnings.
- **Build**: Sucesso sem warnings de chunk size.
- **Playwright**: 10/10 testes passando no Chromium.

---

## 4. Próximos Passos (Aguardando Aprovação do PO)

1. Aprovação formal do Product Owner.
2. Criação da `TASK-040-footer-cnpj-copyright-e-remocao-travessoes-legais.md`.
3. Implementação das mudanças em `Footer.tsx` e `LegalModals.tsx`.
4. Execução de testes unitários, lint, build e Playwright.
5. Emissão de `QA-040.md` e atualização de `PROJECT.md` e `CHANGELOG.md`.
