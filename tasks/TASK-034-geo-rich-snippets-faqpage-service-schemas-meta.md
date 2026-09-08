# TASK-034 — GEO/Rich Snippets: FAQPage + Service Schemas + Meta Descriptions

| Campo        | Valor                                                               |
|--------------|---------------------------------------------------------------------|
| **SPEC**     | SPEC-034-geo-rich-snippets-faqpage-service-schemas-meta.md         |
| **Status**   | ✅ Concluída                                                        |
| **Início**   | 2026-09-08                                                          |
| **Executor** | Gemini/Antigravity                                                  |

---

## Arquivos a modificar

| Arquivo                              | Operação | Descrição                                              |
|--------------------------------------|----------|--------------------------------------------------------|
| `index.html`                         | Editar   | FAQPage 10 perguntas + Service schemas com métricas    |
| `src/pages/Index.tsx`                | Editar   | 6 meta descriptions reescritas + import e rota do FAQ  |
| `src/components/sections/FAQ.tsx`    | Criar    | Componente accordion visual FAQ (escopo adicional)     |

---

## Checklist

- [x] SPEC-034 aprovada
- [x] FAQPage com 10 perguntas estratégicas e métricas reais
- [x] Service schemas enriquecidos com dados dos projetos CAPES/ONS/Energia Pecém
- [x] Meta descriptions reescritas (≤160 chars, CTA + prova social)
- [x] JSON-LD válido
- [x] `npm run lint` — zero erros
- [x] `npm run build` — sem erros
- [x] `npm run test:coverage` — sem regressões (98.38% coverage, FAQ 100%)
- [x] localhost aprovado pelo PO (ajustes de pontuação pt-BR e remoção de travessões aplicados)
- [x] QA-034 preenchido
- [x] PROJECT.md atualizado
- [x] CHANGELOG.md atualizado
- [x] Push para develop


---

## Adição de Escopo Aprovada pelo PO (2026-09-08 08:01)

Criação de seção visual FAQ (`<section id="faq">`) com accordion, posicionada entre Diferenciais e Contato.
O conteúdo é sincronizado com o JSON-LD FAQPage já implementado.

### Arquivos adicionais

| Arquivo                              | Operação | Descrição                               |
|--------------------------------------|----------|-----------------------------------------|
| `src/components/sections/FAQ.tsx`    | Criar    | Componente accordion FAQ visível        |
| `src/pages/Index.tsx`                | Editar   | Importar e renderizar `<FAQ />` na rota |
| `index.html`                         | N/A      | JSON-LD já implementado e sincronizado  |

