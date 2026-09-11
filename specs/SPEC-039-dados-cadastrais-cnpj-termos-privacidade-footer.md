# SPEC-039: Footer — Inclusão de Dados Cadastrais (CNPJ/Razão Social), Políticas de Privacidade, Termos de Uso e Limpeza de Textos Obsoletos

| Campo         | Valor                                                                                                           |
|---------------|-----------------------------------------------------------------------------------------------------------------|
| **ID**        | SPEC-039                                                                                                        |
| **Título**    | Footer — Dados Cadastrais (CNPJ), Termos de Uso, Política de Privacidade e Limpeza de Textos                    |
| **Prioridade**| Alta (Conformidade Legal, LGPD, Transparência Corporativa)                                                      |
| **Origem**    | Demanda PO (2026-09-10)                                                                                         |
| **Autor**     | Elessandro Prestes Macedo / Gemini Antigravity                                                                  |
| **Status**    | ✅ Aprovada (Elessandro Prestes Macedo — 2026-09-10)                                                            |
| **Data**      | 2026-09-10                                                                                                      |

---

## 1. Contexto e Motivação

Para reforçar a transparência institucional, conformidade regulatória brasileira (LGPD — Lei nº 13.709/2018 e Decreto nº 7.962/2013 do Comércio Eletrônico) e autoridade comercial da **EPM DEVTECH**, faz-se necessária a exibição dos dados cadastrais oficiais e das políticas legais da empresa no rodapé da aplicação.

Além disso, o PO solicitou a remoção de menções textuais redundantes ("Retorno técnico em até 24 horas úteis" e a frase "Código limpo, arquitetura sólida e alta disponibilidade."), liberando espaço para os novos links legais no sub-footer.

---

## 2. Requisitos Técnicos e Visuais

### 2.1. Dados Cadastrais Oficiais (Coluna 1 do Footer)
Inserir logo abaixo da localização ("Toledo, Paraná.") um bloco com tipografia técnica e discreta:
- **Razão Social / Nome Empresarial**: `ELESSANDRO PRESTES MACEDO DESENVOLVIMENTO DE SOFTWARE LTDA`
- **CNPJ**: `60.710.574/0001-85` (Matriz)
- **Nome Fantasia / Porte**: `EPM DEVTECH (ME)`
- **Estilo Visual**: `text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-2 mt-2 leading-relaxed`.

### 2.2. Remoção de Textos Obsoletos
1. **Coluna 4 (Contato)**:
   - Remover o bloco com relógio e texto: `<span>Retorno técnico em até 24 horas úteis</span>`.
2. **Sub-footer (Barra Inferior)**:
   - Remover a frase do lado direito: `Código limpo, arquitetura sólida e alta disponibilidade.`.

### 2.3. Termos de Uso e Política de Privacidade (Sub-footer)
1. **Localização**: Lado direito da barra inferior do footer (substituindo a frase de valor removida), preservando o espaçamento para o botão flutuante ScrollToTop (`lg:pr-14`).
2. **Interação**: Gatilhos interativos acessíveis (botões estilizados como links discretos) que abrem diálogos modais (`Dialog` do shadcn/ui / Radix UI):
   - **Termos de Uso (`Dialog`)**:
     - Título: "Termos de Uso — EPM DEVTECH"
     - Conteúdo: Condições de acesso, escopo institucional dos serviços de software sob medida, direitos de propriedade intelectual sobre marcas e código-fonte, limitação de responsabilidade e eleição do Foro da Comarca de Toledo/PR.
   - **Política de Privacidade (`Dialog`)**:
     - Título: "Política de Privacidade e Proteção de Dados (LGPD)"
     - Conteúdo: Coleta mínima estrita (nome, e-mail, whatsapp e mensagem do formulário de contato), finalidade exclusiva de atendimento comercial e orçamento, não compartilhamento com terceiros, armazenamento seguro, retenção limitada, direitos do titular previstos na Lei nº 13.709/2018 e canal direto do encarregado de dados/controlador (`elessandro@epmdevtech.com.br`).
3. **UX & Acessibilidade**:
   - `Dialog` com área rolável (`max-h-[75vh] overflow-y-auto pr-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300`);
   - Fechamento por tecla Escape, clique fora (light-dismiss) ou botão "Fechar";
   - Foco gerenciado automaticamente pelo Radix UI sem salto de scroll na página base.

---

## 3. Matriz de Alterações no Footer

| Seção do Footer | Estado Atual | Novo Estado |
|---|---|---|
| **Coluna 1 (Identidade)** | Logo, descrição e "Toledo, Paraná." | Mantém anteriores + Bloco de Dados Cadastrais (Razão Social, CNPJ Matriz, Nome Fantasia ME) |
| **Coluna 4 (Contato)** | Email, WhatsApp e "Retorno técnico em 24h" | Email e WhatsApp (bloco "Retorno técnico" removido) |
| **Sub-footer (Direita)** | "Código limpo, arquitetura sólida e alta disponibilidade." | Links interativos: "Termos de Uso" e "Política de Privacidade" com modais LGPD |

---

## 4. Impacto em Testes e Quality Gates

1. **`src/components/sections/__tests__/Footer.test.tsx`**:
   - Atualizar asserções para certificar a presença de Razão Social e CNPJ `60.710.574/0001-85`;
   - Validar que "Retorno técnico em até 24 horas úteis" e "Código limpo, arquitetura sólida..." NÃO existem mais no DOM;
   - Validar abertura e renderização dos diálogos de Termos de Uso e Política de Privacidade.
2. **Quality Gates**:
   - Testes unitários com 100% de aprovação e cobertura global $\ge 90\%$;
   - ESLint com 0 erros;
   - Build Vite limpo sem warnings de chunk size;
   - Playwright E2E suite com 10/10 testes passando.

---

## 5. Próximos Passos (Aguardando Aprovação do PO)

1. Aprovação formal do Product Owner (Elessandro Prestes Macedo).
2. Criação da `TASK-039-dados-cadastrais-cnpj-termos-privacidade-footer.md`.
3. Implementação dos componentes modais e atualização de `Footer.tsx`.
4. Atualização dos testes unitários em `Footer.test.tsx`.
5. Validação com Vitest, ESLint, Build e Playwright.
6. Emissão de `reviews/QA-039.md`, atualização de `PROJECT.md` e `CHANGELOG.md`.
