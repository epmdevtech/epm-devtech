# Getting Started — Primeiros Passos

## Pré-requisitos

- Node.js 18+ e npm, **ou** Docker e Docker Compose

---

## Executar Localmente

### Via npm (Node.js local)

```bash
# Clone o repositório
git clone https://github.com/ElessandroPrestes/epm-devtech-solutions.git
cd epm-devtech-solutions

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:8070
```

### Via Docker (recomendado)

```bash
# No diretório raiz do projeto
docker-compose up -d
# Acesse: http://localhost:8070

# Para parar
docker-compose down
```

---

## Rodar Testes

```bash
# Executar todos os testes
npm run test

# Executar com relatório de cobertura
npm run test:coverage

# Modo watch (reexecuta ao salvar)
npm run test:watch
```

---

## Build de Produção

```bash
npm run build
```

---

## Como Criar uma Nova Funcionalidade (SDD)

Seguir o fluxo do Universal SDD:

### 1. Criar a SPEC
```bash
cp templates/spec/SPEC-TEMPLATE.md specs/SPEC-NNN-titulo-da-feature.md
```
Preencher todos os campos, especialmente critérios de aceitação.

### 2. Obter Aprovação do PO
O PO assina a seção de aprovação da SPEC. **Nenhuma implementação antes deste passo.**

### 3. Criar a TASK
```bash
cp templates/task/TASK-TEMPLATE.md tasks/TASK-NNN-titulo-da-feature.md
```

### 4. Implementar
Dentro do escopo da SPEC. Ver `knowledge/conventions.md` para padrões.

### 5. QA
```bash
npm run test:coverage  # ≥ 90%
npm run lint           # zero erros
npm run build          # sem warnings
```
```bash
cp templates/qa/QA-TEMPLATE.md reviews/QA-NNN.md
# Preencher evidências
```

### 6. Review
```bash
cp templates/review/REVIEW-TEMPLATE.md reviews/REVIEW-NNN.md
# Preencher resultado do review
```

### 7. Docs + Release
- Atualizar `PROJECT.md` e `CHANGELOG.md`
- Aguardar aprovação do PO para deploy

---

## Estrutura SDD do Projeto

```
specs/       ← SPECs aprovadas pelo PO
tasks/       ← TASKs de implementação ativas
reviews/     ← Code reviews, design reviews e evidências de QA
adr/         ← Decisões arquiteturais registradas
templates/   ← Templates para SPEC, TASK, REVIEW, QA
standards/   ← Padrões de testes, quality gates, UX/UI, acessibilidade
knowledge/   ← Base de conhecimento: stack e convenções
workflows/   ← Fluxos de trabalho oficiais
docs/        ← Documentação do framework SDD e do projeto
agents/      ← Missões e limites dos agentes de IA
```

---

Ver também: [workflows/feature.md](../workflows/feature.md) para o fluxo detalhado.
