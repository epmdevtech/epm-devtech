# TASK-115 — Servir Imagem OG Odontologia como Ativo Estático com Cabeçalhos Otimizados para WhatsApp

- **SPEC Relacionada:** [SPEC-115](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/specs/SPEC-115-servir-og-image-odontologia-estatico.md)
- **Status:** Concluído
- **Responsável:** Gemini / Antigravity
- **Data de Início:** 2026-10-08
- **Data de Conclusão:** 2026-10-08

---

## 1. Escopo de Arquivos Modificados

- `public/og-odontologia.jpg` (ativo de imagem estático baixado e validado)
- `vercel.json` (adição de headers HTTP e ajuste da regra de rewrite para ignorar `/og-odontologia.jpg`)
- `specs/SPEC-115-servir-og-image-odontologia-estatico.md`
- `tasks/TASK-115-servir-og-image-odontologia-estatico.md`
- `reviews/QA-115.md`
- `PROJECT.md`
- `CHANGELOG.md`

---

## 2. Checklist de Execução

- [x] Criar SPEC-115 e registrar TASK-115
- [x] Baixar `public/og-odontologia.jpg` a partir de `https://dentistry-demo.elessandrodev.workers.dev/og-desktop-hero.jpg`
- [x] Validar dimensões (JPEG 1200x630) e peso (< 300 KB, ~74.8 KB)
- [x] Configurar cabeçalhos HTTP explícitos em `vercel.json` (`Content-Type`, `Cache-Control`, `Access-Control-Allow-Origin`)
- [x] Ajustar rewrite SPA em `vercel.json` com negative lookahead para excluir `/og-odontologia.jpg`
- [x] Validar sintaxe JSON do `vercel.json`
- [x] Executar `npm run build` e confirmar presença de `dist/og-odontologia.jpg`
- [x] Executar `npm run test` (Vitest: 275/275 OK)
- [x] Executar `npm run lint` (ESLint: 0 erros, 0 avisos)
- [x] Gerar relatório de QA em `reviews/QA-115.md`
- [x] Atualizar `PROJECT.md` e `CHANGELOG.md`
- [x] Realizar commit com mensagem descritiva em pt-BR no ramo `develop`
