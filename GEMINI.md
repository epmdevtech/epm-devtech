# GEMINI.md — Protocolo do Agente Gemini/Antigravity

> Este arquivo define o comportamento esperado do agente **Gemini/Antigravity** neste projeto.
> Deve ser lido no início de cada sessão, antes de qualquer ação.

---

## Identidade e Papel

O Gemini/Antigravity é o **agente de implementação primário** do projeto EPM DEVTECH.
Atua sob supervisão do Product Owner (Elessandro Prestes Macedo).

---

## Leitura Obrigatória no Início de Cada Sessão

Na ordem:
1. `PROJECT.md` — estado canônico atual do projeto
2. `AGENTS.md` — protocolo comum para todos os agentes
3. `GEMINI.md` — este arquivo
4. Verificar `/tasks/` — há alguma TASK aberta?

---

## Stack do Projeto

| Tecnologia         | Versão      |
|--------------------|-------------|
| React              | 18.x        |
| TypeScript         | 5.x         |
| Vite               | 5.x         |
| Tailwind CSS       | 3.x         |
| shadcn/ui          | —           |
| Framer Motion      | 12.x        |
| React Router DOM   | 6.x         |
| React Helmet Async | 3.x         |
| TanStack Query     | 5.x         |
| React Hook Form    | 7.x         |
| Zod                | 3.x         |
| EmailJS            | 4.x         |
| Vitest             | 3.x         |
| React Testing Lib  | 16.x        |

---

## Protocolo de Implementação

### Antes de Implementar
1. Confirmar que existe uma **SPEC aprovada** (assinada) em `/specs/`
2. Criar arquivo de TASK em `/tasks/TASK-XXX-titulo.md` usando o template
3. Listar os arquivos que serão criados/modificados

### Durante a Implementação
- Implementar **apenas** o escopo definido na SPEC
- Usar TypeScript estrito — sem `any` desnecessário
- Seguir padrões: Mobile First, componentes acessíveis, Clean Code
- Usar alias `@/` para imports
- Usar `cn()` do shadcn para classes condicionais
- Respeitar `prefers-reduced-motion` nas animações Framer Motion

### Após Implementar
1. Rodar `npm run test:coverage` e verificar cobertura ≥ 90%
2. Rodar `npm run lint` — zero erros
3. Rodar `npm run build` — sem warnings de chunk > 600KB
4. Preencher o QA template em `/reviews/QA-XXX.md`
5. Notificar o PO para review

---

## Restrições Absolutas

- ❌ Não inventar requisitos não descritos na SPEC
- ❌ Não expandir escopo sem nova SPEC aprovada
- ❌ Não modificar arquivos fora do escopo da TASK ativa
- ❌ Não fazer deploy
- ❌ Não resolver divergências entre SPEC e código silenciosamente — reportar ao PO

---

## Padrões de Código

### Componentes React
```tsx
// Sempre tipar props com interface
interface ComponentNameProps {
  prop: string;
}

// Function component com export default
const ComponentName = ({ prop }: ComponentNameProps) => {
  return <div>{prop}</div>;
};

export default ComponentName;
```

### Testes
```tsx
// Arquivo: __tests__/ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import ComponentName from '../ComponentName';

describe('ComponentName', () => {
  it('deve renderizar corretamente', () => {
    render(<ComponentName prop="valor" />);
    expect(screen.getByText('valor')).toBeInTheDocument();
  });
});
```

---

## Quality Gates

| Gate              | Critério                              |
|-------------------|---------------------------------------|
| TypeScript        | Zero erros de compilação              |
| ESLint            | Zero erros (`npm run lint`)           |
| Testes            | Cobertura ≥ 90% nos componentes       |
| Build             | Sem warnings de chunk > 600KB         |
| Acessibilidade    | ARIA labels, contraste, foco visível  |
| SEO               | Meta tags presentes em todas as rotas |

---

## Protocolo de Dúvida

Se encontrar ambiguidade na SPEC ou bloqueio técnico:
1. **Pausar** a implementação
2. Registrar a dúvida na TASK ativa
3. Apresentar as opções ao PO com prós e contras
4. **Aguardar decisão** antes de prosseguir

---

_Maintainer: Elessandro Prestes Macedo | elessandro.prestes@gmail.com_
