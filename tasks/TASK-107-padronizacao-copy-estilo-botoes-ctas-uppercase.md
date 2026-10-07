# TASK-107 — Padronização de Redação (Copy) B2B e Estilo dos Botões de Ação e CTAs em Caixa Alta (Uppercase)

| Campo              | Valor                    |
|--------------------|--------------------------|
| **ID**             | TASK-107                 |
| **SPEC**           | SPEC-107                 |
| **Data de início** | 2026-10-04               |
| **Agente**         | Gemini/Antigravity       |
| **Status**         | Concluído                |

---

## Escopo da Implementação

Baseado na SPEC-107:

1. Atualizar estilos base de `MagneticButton.tsx` com `uppercase tracking-wider font-semibold` e escalas de tamanho compacta e de grande impacto.
2. Substituir copy dos botões nos componentes:
   - `Header.tsx` ("FALE COMIGO")
   - `Hero.tsx` ("FALE COMIGO" e "CONHEÇA AS SOLUÇÕES")
   - `Home.tsx` ("VER SOLUÇÕES", "COMO TRABALHAMOS", "VER EXPERIÊNCIA", "CONHEÇA A EPM DEVTECH")
   - `HomeServicesBento.tsx` ("VER DETALHES")
   - `AboutPage.tsx` ("FALE COMIGO")
   - `About.tsx` ("CONHEÇA A EPM DEVTECH")
   - `ServicesPage.tsx` ("VAMOS CONVERSAR")
   - `EngineeringPage.tsx` ("VER TECNOLOGIAS")
   - `Contact.tsx` ("SOLICITAR ORÇAMENTO")
   - `ContactForm.tsx` ("ENVIAR MENSAGEM")
   - `FAQPage.tsx` ("VAMOS CONVERSAR")
   - `NotFound.tsx` ("PÁGINA INICIAL", "VER SOLUÇÕES", "FALE COMIGO")
3. Atualizar suites de testes unitários e E2E que validam os textos de botões.
4. Preencher `reviews/QA-107.md`.
5. Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Checklist de Implementação

- [x] `MagneticButton.tsx` atualizado com estilo base e tamanhos padronizados
- [x] `Header.tsx` atualizado
- [x] `Hero.tsx` atualizado com botões primário e secundário
- [x] `Home.tsx` atualizado com CTAs das seções e apresentação institucional
- [x] `HomeServicesBento.tsx` atualizado com "VER DETALHES"
- [x] `AboutPage.tsx` e `About.tsx` atualizados
- [x] `ServicesPage.tsx` atualizado
- [x] `EngineeringPage.tsx` atualizado com botão de exploração técnica
- [x] `Contact.tsx` e `ContactForm.tsx` atualizados
- [x] `FAQPage.tsx` e `NotFound.tsx` atualizados
- [x] Testes unitários atualizados e validados (`npm run test:coverage`)
- [x] Testes E2E atualizados
- [x] `npm run lint` zero erros
- [x] `npm run build` sem avisos > 600KB
- [x] `QA-107.md` gerado
- [x] `PROJECT.md` e `CHANGELOG.md` atualizados
