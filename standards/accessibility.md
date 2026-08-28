# Accessibility — Requisitos e Validações

## Padrão Alvo

**WCAG 2.1 nível AA**

---

## Requisitos Obrigatórios

| Requisito                  | Critério                                              |
|----------------------------|-------------------------------------------------------|
| Skip link                  | Presente e funcional (`#conteudo-principal`)          |
| Contraste de cor           | Mínimo 4.5:1 para texto normal, 3:1 para texto grande |
| Foco visível               | Todos os elementos interativos têm outline de foco    |
| Navegação por teclado      | Tab, Shift+Tab, Enter, Space, Esc funcionam           |
| ARIA labels                | Todos os botões/ícones sem texto têm `aria-label`     |
| Semântica HTML             | Uso correto de `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>` |
| Atributos `alt`            | Todas as imagens têm `alt` descritivo ou `alt=""`     |
| Landmarks                  | `role="banner"`, `role="main"`, `role="contentinfo"`  |

---

## Checklist por Tipo de Componente

### Botões e Links
- [ ] `aria-label` quando o texto visível não é descritivo
- [ ] Estado `disabled` com `aria-disabled="true"`
- [ ] Links externos com `rel="noopener noreferrer"`

### Formulários (Contact.tsx)
- [ ] `<label>` associado a cada `<input>` via `htmlFor`
- [ ] Mensagens de erro com `aria-live="polite"`
- [ ] `aria-required="true"` em campos obrigatórios
- [ ] `aria-invalid="true"` em campos com erro

### Navegação (Header.tsx)
- [ ] `<nav>` com `aria-label="Navegação principal"`
- [ ] Link ativo com `aria-current="page"`
- [ ] Menu mobile com `aria-expanded` e `aria-controls`

### Seções (sections/)
- [ ] Cada `<section>` tem `aria-labelledby` apontando para seu título
- [ ] Títulos em hierarquia correta (h1 > h2 > h3)

---

## Ferramentas de Validação

| Ferramenta        | Uso                                              |
|-------------------|--------------------------------------------------|
| axe-core          | Integrado via @testing-library (automático)      |
| Lighthouse        | Auditoria de acessibilidade no Chrome DevTools   |
| NVDA (Windows)    | Teste manual com leitor de tela                  |
| VoiceOver (macOS) | Teste manual com leitor de tela                  |
| Keyboard only     | Navegar sem mouse para validar foco e ordem      |

---

## Integração com Testes

Usar queries acessíveis do @testing-library:

```tsx
// Preferir (semântico e acessível)
screen.getByRole('button', { name: /enviar/i })
screen.getByLabelText(/nome/i)
screen.getByRole('navigation')

// Evitar (acoplamento ao DOM)
screen.getByClassName('btn-primary')
container.querySelector('.form-input')
```

---

## Validação no CI

- Rodar `npm run test` com axe integrado (React Testing Library verifica acessibilidade)
- Lighthouse CI score de acessibilidade ≥ 90
