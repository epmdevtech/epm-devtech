# SPEC-076 — Remoção de Linhas Duplas e Harmonização de Divisores na Rota /experiencia

- **Status:** Aprovada pelo PO
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo

---

## 1. Contexto e Diagnóstico

Na rota `/experiencia` (`src/pages/ExperiencePage.tsx`), foi identificada a presença de linhas horizontais duplas desnecessárias entre o cabeçalho da página e a seção de indicadores/métricas de escala:

1. **Linha 1 (`PageHeader.tsx`):** O componente padrão de cabeçalho renderiza um divisor inferior com margem inferior (`border-b border-border/40 mb-12 sm:mb-16`).
2. **Linha 2 (`Authority.tsx`):** O componente de autoridade/métricas possui classes fixas de borda no topo e na base (`border-y border-border-subtle bg-surface/50`).
3. **Efeito Visual Indesejado:** Há um vão de 48px a 64px entre as duas linhas horizontais paralelas, criando uma redundância visual e aspecto de corte desconectado (evidenciado na captura `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-10-02 06-32-51.png`).
4. **Transição Inferior de `Authority`:** Na sequência imediata, a seção `<section id="contextos">` possui `border-t border-border-default/60`, colidindo com a borda inferior (`border-b`) de `Authority`.

### Objetivo
Eliminar as linhas duplas na rota `/experiencia`, garantindo divisores únicos, limpos e consistentes entre as seções, preservando a identidade visual, a integridade do componente `Authority` na Home (`/`) e 100% dos testes existentes.

---

## 2. Decisões Técnicas e de Design

### 2.1. Flexibilização de `Authority.tsx` via `className`
- Adicionar interface de props ao componente `Authority`:
  ```tsx
  export interface AuthorityProps {
    className?: string;
  }
  ```
- No elemento raiz `<section id="autoridade">`, mesclar as classes padrão com a prop `className` através do utilitário `cn(...)`:
  ```tsx
  className={cn(
    "py-14 lg:py-16 border-y border-border-subtle bg-surface/50 relative",
    className
  )}
  ```
- **Preservação de Retrocompatibilidade:** Quando chamada sem propriedades (`<Authority />`), a seção mantém rigorosamente o comportamento e estilo atuais utilizados na Home (`Index.tsx`) e validados por `Authority.test.tsx`.

### 2.2. Harmonização na Rota `/experiencia` (`ExperiencePage.tsx`)
- Configurar o `<Authority />` na rota `/experiencia` sem bordas duplicadas e com fundo integrado:
  ```tsx
  <Authority className="border-y-0 bg-transparent py-6 sm:py-10" />
  ```
- **Resultado Estrutural de Divisores em `/experiencia`:**
  1. `PageHeader`: divisor único canônico inferior (`border-b border-border/40`).
  2. `section#resultados` (`Authority`): fluxo contínuo sem `border-t` e sem `border-b` redundante (zero linhas duplas).
  3. `section#contextos`: divisor único superior (`border-t border-border-default/60`) separando os indicadores da Matriz de Engenharia 2x2.
  4. `section#organizacoes`: divisor único superior (`border-t border-border-default/60`) separando a matriz do Ledger corporativo.

---

## 3. Arquivos Envolvidos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-076-experiencia-remocao-linhas-duplas.md` | Criar | Especificação técnica da correção |
| `tasks/TASK-076-experiencia-remocao-linhas-duplas.md` | Criar | Tarefa de execução |
| `src/components/sections/Authority.tsx` | Modificar | Permitir `className` opcional com merge via `cn()` |
| `src/pages/ExperiencePage.tsx` | Modificar | Passar `className="border-y-0 bg-transparent py-6 sm:py-10"` para `Authority` |
| `src/components/sections/__tests__/Authority.test.tsx` | Modificar/Verificar | Validar que aceita `className` e mantém compatibilidade |
| `reviews/QA-076.md` | Criar | Evidências de validação e testes |
| `PROJECT.md` / `CHANGELOG.md` | Atualizar | Registro no log de versão |

---

## 4. Critérios de Aceite

- [ ] Zero linhas horizontais duplas entre `PageHeader` e `Authority` na rota `/experiencia`.
- [ ] Divisor único e limpo entre `Authority` e `section#contextos`.
- [ ] Componente `Authority` na Home (`Index.tsx`) permanece inalterado com seu acabamento padrão.
- [ ] TypeScript compila sem erros (`npx tsc --noEmit`).
- [ ] ESLint passa com zero erros e warnings (`npm run lint`).
- [ ] Todos os 182+ testes do Vitest passam (`npm test -- --run`).
- [ ] Testes E2E do Playwright passam (`npx playwright test`).
- [ ] Build de produção conclui com sucesso (`npm run build`).
