# EPM DEVTECH — Site Institucional

Repositório do site institucional da **EPM DevTech**, software house dedicada a software corporativo sob medida, APIs escaláveis e modernização de plataformas.

---

## 🛠️ Stack Tecnológica

O projeto adota uma stack moderna, tipada e com foco em acessibilidade (WCAG 2.2 AA), estabilidade e performance:

- **Framework:** [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Build & Bundler:** [Vite 5](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Componentes:** [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animações:** [Framer Motion 12](https://www.framer.com/motion/)
- **Testes Unitários:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
- **Testes End-to-End:** [Playwright](https://playwright.dev/)
- **Containerização:** [Docker](https://www.docker.com/) & Docker Compose

---

## 🚀 Como Executar Localmente

### Opção 1: Node.js (Ambiente Local)

**Pré-requisitos:** Node.js 20+ e npm instalados.

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/epmdevtech/epm-devtech.git
   cd epm-devtech
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação em `http://localhost:8070`.

---

### Opção 2: Docker Compose

**Pré-requisitos:** Docker Engine e Docker Compose instalados.

1. **Subir os containers:**
   ```bash
   docker-compose up -d
   ```

2. **Acessar:**
   Abra `http://localhost:8070` no navegador.

3. **Encerrar containers:**
   ```bash
   docker-compose down
   ```

---

## 🧪 Quality Gates e Testes

O projeto segue a disciplina de Spec-Driven Development (SDD) e exige aprovação em todos os quality gates antes de qualquer entrega:

```bash
# Verificação de tipos TypeScript
npx tsc --noEmit

# Análise estática com ESLint
npm run lint

# Execução de testes unitários
npm run test

# Cobertura de testes unitários (meta ≥ 90%)
npm run test:coverage

# Testes end-to-end com Playwright
npm run test:e2e

# Build de produção
npm run build
```

---

## 📁 Estrutura de Diretórios

```
epm-devtech/
├── e2e/               # Testes end-to-end (Playwright)
├── public/            # Assets estáticos, manifestos e llms.txt
├── specs/             # Especificações funcionais (SDD)
├── tasks/             # Registros de tarefas técnicas executadas
├── reviews/           # Relatórios de garantia de qualidade (QA)
├── src/
│   ├── components/    # Componentes React (layout, seções, ui, icons)
│   ├── config/        # Configurações canônicas centralizadas (site.ts)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilitários, formatações e esquemas
│   ├── pages/         # Páginas e roteamento da aplicação
│   └── index.css      # Tokens e utilitários globais do Tailwind CSS
└── index.html         # Ponto de entrada HTML e dados estruturados (JSON-LD)
```

---

## 📄 Licença e Contato

© 2026 **EPM DevTech** — Elessandro Prestes Macedo Desenvolvimento de Software LTDA.  
CNPJ: `60.710.574/0001-85`. Todos os direitos reservados.

- **Website:** [epmdevtech.com.br](https://epmdevtech.com.br)
- **Contato Comercial:** [elessandro@epmdevtech.com.br](mailto:elessandro@epmdevtech.com.br)
- **LinkedIn:** [company/112232713](https://www.linkedin.com/company/112232713/)
- **GitHub:** [github.com/epmdevtech](https://github.com/epmdevtech)
