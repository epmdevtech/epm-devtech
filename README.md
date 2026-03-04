# EPM DEVTECH - Landing Page

Bem-vindo ao repositório oficial da EPM DEVTECH, uma vitrine digital de excelência em Engenharia de Software focada em soluções robustas, escaláveis e de alta performance. Desenvolvido para apresentar serviços, metodologias ágeis e atuação em áreas críticas como Indústria, E-commerce, Educação (CAPES/MEC) e Energia (ONS).

![EPM DEVTECH Preview](./public/vite.svg)

## 🚀 Tecnologias e Stack

Este projeto é desenvolvido com um ecossistema moderno focado em performance, tipagem forte e manutenibilidade. A interface foi construída seguindo as diretrizes do **Clean Code** e **Mobile First**.

- **React 18** (Interface declarativa e componentes reutilizáveis)
- **TypeScript** (Tipagem estática para maior segurança e previsibilidade)
- **Vite** (Build tool veloz para empacotamento)
- **Tailwind CSS** (Estilização via utilitários com suporte nativo a Dark/Light Mode)
- **shadcn/ui & Radix UI** (Componentes acessíveis, primitivos e altamente customizáveis)
- **Framer Motion** (Animações fluidas e baseadas em scroll)
- **Vitest & React Testing Library** (Testes unitários superando 90% de cobertura)
- **Docker & Docker Compose** (Containerização do ambiente de setup e portabilidade)

## 📦 Como Executar o Projeto Localmente

Existem duas formas de rodar a aplicação na sua máquina: utilizando o gerenciador de pacotes local `npm` ou de forma totalmente isolada via **Docker**.

### Opção 1: Via Gerenciador de Pacotes (Node.js Local)

**Pré-requisitos:** Node.js (versão 18+) e NPM instalados.

1. **Clone do Repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO> epm-devtech-solutions
   cd epm-devtech-solutions
   ```

2. **Instale as Dependências:**
   ```bash
   npm install
   ```

3. **Inicie o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   *Acesse `http://localhost:8080` no seu navegador.*

### Opção 2: Via Docker (Recomendado)

O projeto conta com um `docker-compose.yml` pré-configurado com a imagem `node:20-alpine` lidando com toda a orquestração. Não é necessário ter o Node instalado em sua máquina bare-metal, apenas o Docker Engine.

**Pré-requisitos:** Docker e Docker Compose instalados.

1. **No diretório raiz da aplicação, basta executar:**
   ```bash
   docker-compose up -d
   ```

2. **Acessando a aplicação:**  
   O Docker cuidará de instalar as dependências automaticamente durante a compilação do container base, amarrando no diretório `app` e mapeando a porta padrão do repositório.
   Abra seu navegador e acesse: `http://localhost:8070`

> **Nota:** Para parar a execução do container, use: `docker-compose down`

## 🧪 Testes Unitários

O projeto conta com uma suíte de testes ponta a ponta construída com **Vitest** rodando no ambiente virtual nativo (**v8** engine de coverage). 

Para rodar todos os testes na sua máquina e validar os relatórios de coverage:

```bash
npm run test:coverage
```

Isso processará o script configurado gerando o report via terminal constatando que os principais componentes da Home Page rodam perfeitamente, mantendo o índice acima de >90%.

## 📜 Licença  e Direitos Autorais

Desenvolvido orgulhosamente por **Elessandro Prestes Macedo**.
Contato: [elessandro.prestes@gmail.com](mailto:elessandro.prestes@gmail.com)

---

> *“Trabalhamos com metodologias ágeis, versionamento rigoroso e integração contínua (CI/CD), garantindo transparência e previsibilidade em cada projeto.”*
