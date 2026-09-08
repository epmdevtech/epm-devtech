# TASK-036: Formalização de robots.txt para Bots de IA e Enriquecimento de llms.txt e llms-full.txt

| Campo        | Valor                                                                               |
|--------------|-------------------------------------------------------------------------------------|
| **SPEC**     | SPEC-036-formalizacao-robots-txt-enriquecimento-llms-txt.md                         |
| **Status**   | ✅ Concluída                                                        |
| **Início**   | 2026-09-08                                                          |
| **Executor** | Gemini/Antigravity                                                  |

---

## Arquivos a criar / modificar

| Arquivo | Operação | Descrição |
|---------|----------|-----------|
| `public/robots.txt` | Editar | Formalização para rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, Applebot-Extended, etc.), permissão explícita para llms.txt, llms-full.txt e remoção de travessões |
| `public/llms.txt` | Editar | Atualização com nova arquitetura (10 etapas, 4 setores, 6 serviços, 10 perguntas da FAQ, métricas factuais reais) |
| `public/llms-full.txt` | Editar | Contexto completo para LLMs e RAG (tríade de setores, detalhes de serviços, stack categorizada, íntegra das 10 perguntas do FAQ sem travessões) |
| `public/sitemap.xml` | Editar | Inclusão de `/setores` e `/faq`, atualização da data `lastmod` para 2026-09-08 |
| `public/site.webmanifest` | Editar | Remoção de travessão do nome |
| `index.html` | Editar | Adição de links de auto-descoberta (`rel="alternate"`) para `llms.txt` e `llms-full.txt`, harmonização ortográfica de FAQPage em JSON-LD |

---

## Checklist de Execução

- [x] SPEC-036 aprovada pelo PO
- [x] Atualizar `public/robots.txt`
- [x] Atualizar `public/llms.txt`
- [x] Atualizar `public/llms-full.txt`
- [x] Atualizar `public/sitemap.xml`
- [x] Atualizar `public/site.webmanifest`
- [x] Atualizar `index.html`
- [x] Executar suíte de testes unitários (`npm run test:coverage` - 20/20 suítes, 134/134 testes, 98.51% cobertura)
- [x] Executar lint (`npm run lint` - 0 erros)
- [x] Executar build de produção (`npm run build` - 0 warnings, max chunk 142KB)
- [ ] Criar `reviews/QA-036.md`
- [ ] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [ ] Apresentar ao PO para validação
