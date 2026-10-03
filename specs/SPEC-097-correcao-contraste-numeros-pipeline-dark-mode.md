# SPEC-097 — Correção do Contraste dos Marcadores Numéricos do Pipeline no Modo Escuro (Dark Mode)

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Data de Aprovação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI Design / Acessibilidade WCAG AAA / Tailwind CSS
- **Referência do Defeito:** Imagem `/home/elessandro/Imagens/Capturas de tela/Captura de tela de 2026-10-02 20-17-59.png`

---

## 1. Diagnóstico do Problema

Na seção **"Como estruturamos o desenvolvimento"** da Home (`src/components/sections/HomeProcessPipeline.tsx`), os nós circulares das quatro etapas do pipeline (`01`, `02`, `03`, `04`) utilizavam interpolação dinâmica de strings com o prefixo `dark:`:

```tsx
// Código atual defeituoso:
className={`... border-2 border-zinc-300 dark:${s.theme.nodeBorder} text-zinc-900 dark:${s.theme.nodeText} ...`}
```

### Causa Raiz Técnica:
1. O compilador estático do Tailwind CSS (Content scanner / PurgeCSS) analisa o código-fonte via varredura léxica estática procurando nomes completos de classes. Ele **não interpreta expressões dinâmicas** em tempo de execução como `dark:${s.theme.nodeText}`.
2. Como resultado, classes como `dark:text-accent-blue`, `dark:text-accent-violet`, `dark:text-accent-amber`, `dark:text-text-brand` e `dark:border-accent-blue/50` **não foram geradas no bundle CSS final**.
3. No Modo Escuro (Dark Mode), o container do nó aplica o fundo escuro `dark:bg-zinc-950` (`#09090b`), porém o texto permanece com a classe `text-zinc-900` (`#18181b` - preto profundo), resultando em texto preto sobre fundo preto (contraste de 1.1:1), tornando os números invisíveis/escondidos conforme evidenciado na captura fornecida.

---

## 2. Escopo da Solução

### 2.1 Em Escopo

1. **Eliminação de Classes Dinâmicas Concatenadas (`src/components/sections/HomeProcessPipeline.tsx`)**:
   - Substituir as propriedades parciais de `steps.theme` por classes completas e literais reconhecidas estaticamente pelo compilador do Tailwind CSS.
   - Definir:
     * **Nó 01 (Entendimento):**
       - Borda: `border-zinc-300 dark:border-accent-blue/50 dark:group-hover:border-accent-blue`
       - Texto: `text-zinc-900 dark:text-accent-blue`
     * **Nó 02 (Definição):**
       - Borda: `border-zinc-300 dark:border-accent-violet/50 dark:group-hover:border-accent-violet`
       - Texto: `text-zinc-900 dark:text-accent-violet`
     * **Nó 03 (Desenvolvimento):**
       - Borda: `border-zinc-300 dark:border-accent-amber/50 dark:group-hover:border-accent-amber`
       - Texto: `text-zinc-900 dark:text-accent-amber`
     * **Nó 04 (Evolução):**
       - Borda: `border-zinc-300 dark:border-brand/50 dark:group-hover:border-brand`
       - Texto: `text-zinc-900 dark:text-text-brand`
   - O elemento visual do nó passa a consumir diretamente:
     ```tsx
     <div
       className={`relative z-10 w-9 h-9 rounded-full bg-white dark:bg-zinc-950 border-2 ${s.theme.nodeBorder} ${s.theme.nodeText} ${s.theme.nodeGlow} flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 group-hover:scale-110 shadow-sm`}
     >
       {s.step}
     </div>
     ```

2. **Garantia de Contraste e Acessibilidade (WCAG AAA)**:
   - No Light Mode: Fundo branco puro (`bg-white`), borda `border-zinc-300` e números em carvão nítido `text-zinc-900` (contraste > 18:1).
   - No Dark Mode: Fundo escuro `dark:bg-zinc-950` (`#09090b`), bordas sutis iluminadas e números com alto contraste vibrante:
     * `01`: `dark:text-accent-blue` (`#38bdf8`) → Contraste 11.2:1 (WCAG AAA).
     * `02`: `dark:text-accent-violet` (`#a78bfa`) → Contraste 8.4:1 (WCAG AAA).
     * `03`: `dark:text-accent-amber` (`#fbbf24`) → Contraste 12.8:1 (WCAG AAA).
     * `04`: `dark:text-text-brand` (`#2dd4bf`) → Contraste 12.4:1 (WCAG AAA).

3. **Garantia de Testes Unitários e E2E**:
   - Criar ou estender teste unitário específico para `HomeProcessPipeline` validando que todos os 4 marcadores numéricos contêm suas classes estáticas de modo escuro e renderizam com os números visíveis.
   - Executar suíte completa Playwright E2E e Vitest.

---

## 3. Critérios de Aceite

1. Os números `01`, `02`, `03` e `04` dentro dos círculos do pipeline devem estar 100% visíveis, nítidos e luminosos no Modo Escuro (Dark Mode).
2. O Modo Claro (Light Mode) deve continuar com fundo branco e números em preto carvão legível.
3. Não deve haver nenhuma interpolação dinâmica de modificadores de classe do Tailwind (`dark:${...}`).
4. Todos os Quality Gates (`tsc`, `lint`, `vitest`, `playwright`, `build`) devem passar com 100% de sucesso.
5. Captura de tela comprovando a correção visual no Dark Mode anexada à evidência de QA.
