/**
 * architecture.ts
 *
 * Dados estruturados das camadas de arquitetura tecnológica da EPM DevTech.
 */

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export interface TechItem {
  name: string;
  icon: string;
  purpose: string;
}

export interface LayerItem {
  id: string;
  layerTag: string;
  statusBadge: string;
  title: string;
  description: string;
  technologies: TechItem[];
}

export const ARCHITECTURAL_LAYERS: LayerItem[] = [
  {
    id: "presentation-edge",
    layerTag: "LAYER 01 // INTERFACE & EDGE",
    statusBadge: "CLIENT RUNTIME",
    title: "Camada de Apresentação & Edge",
    description:
      "Interfaces reativas, Server-Side Rendering (SSR) e orquestração no edge para máxima velocidade de carregamento e experiência fluida.",
    technologies: [
      {
        name: "React",
        icon: `${DI}/react/react-original.svg`,
        purpose: "Componentização declarativa e renderização eficiente no cliente.",
      },
      {
        name: "TypeScript",
        icon: `${DI}/typescript/typescript-original.svg`,
        purpose: "Tipagem estática estrita e contratos de dados previsíveis.",
      },
      {
        name: "Vue.js",
        icon: `${DI}/vuejs/vuejs-original.svg`,
        purpose: "Ecossistema progressivo e ágil para interfaces interativas.",
      },
      {
        name: "Tailwind CSS",
        icon: `${DI}/tailwindcss/tailwindcss-original.svg`,
        purpose: "Design system utilitário com zero sobrecarga de CSS em runtime.",
      },
      {
        name: "Angular",
        icon: `${DI}/angular/angular-original.svg`,
        purpose: "Framework robusto para aplicações corporativas com arquitetura opinada.",
      },
    ],
  },
  {
    id: "application-apis",
    layerTag: "LAYER 02 // APLICAÇÃO & APIS",
    statusBadge: "SERVICE RUNTIME",
    title: "Camada de Aplicação & APIs",
    description:
      "Serviços desacoplados, regras de negócio estruturadas e endpoints RESTful/GraphQL de alto rendimento com tipagem e arquitetura limpa.",
    technologies: [
      {
        name: "Node.js",
        icon: `${DI}/nodejs/nodejs-original.svg`,
        purpose: "Runtime assíncrono e event-loop para APIs de alta concorrência.",
      },
      {
        name: "PHP",
        icon: `${DI}/php/php-original.svg`,
        purpose: "Back-end corporativo moderno com tipagem forte e ecossistema maduro.",
      },
      {
        name: "Laravel",
        icon: `${DI}/laravel/laravel-original.svg`,
        purpose: "Framework estruturado para rápida entrega com arquitetura limpa.",
      },
      {
        name: "Symfony",
        icon: `${DI}/symfony/symfony-original-wordmark.svg`,
        purpose: "Componentes corporativos desacoplados de alto desempenho e precisão.",
      },
    ],
  },
  {
    id: "messaging-streaming",
    layerTag: "LAYER 03 // MENSAGERIA & BARRAMENTO",
    statusBadge: "ASYNC DECOUPLING",
    title: "Camada de Mensageria & Barramento",
    description:
      "Desacoplamento assíncrono de serviços, processamento em segundo plano, cache distribuído e streaming de dados em tempo real.",
    technologies: [
      {
        name: "RabbitMQ",
        icon: `${DI}/rabbitmq/rabbitmq-original.svg`,
        purpose: "Message broker AMQP com roteamento flexível e filas confiáveis.",
      },
      {
        name: "Kafka",
        icon: `${DI}/apachekafka/apachekafka-original-wordmark.svg`,
        purpose: "Streaming distribuído de eventos e telemetria em tempo real.",
      },
      {
        name: "Redis",
        icon: `${DI}/redis/redis-original.svg`,
        purpose: "Estrutura de dados em memória para cache distribuído e pub/sub veloz.",
      },
    ],
  },
  {
    id: "cloud-data-observability",
    layerTag: "LAYER 04 // NUVEM, DADOS & OBSERVABILIDADE",
    statusBadge: "INFRAESTRUTURA RESILIENTE",
    title: "Nuvem, Dados & Observabilidade",
    description:
      "Bancos relacionais e NoSQL, orquestração de containers, infraestrutura como código versionada e telemetria operacional contínua.",
    technologies: [
      {
        name: "PostgreSQL",
        icon: `${DI}/postgresql/postgresql-original.svg`,
        purpose: "Transações ACID estritas, modelagem relacional e extensões geo/JSON.",
      },
      {
        name: "MySQL",
        icon: `${DI}/mysql/mysql-original.svg`,
        purpose: "Banco relacional amplamente testado para operações transacionais rápidas.",
      },
      {
        name: "Oracle",
        icon: `${DI}/oracle/oracle-original.svg`,
        purpose: "Banco de dados enterprise para cargas críticas corporativas.",
      },
      {
        name: "MongoDB",
        icon: `${DI}/mongodb/mongodb-original.svg`,
        purpose: "Armazenamento NoSQL em documentos flexíveis com escala horizontal.",
      },
      {
        name: "AWS",
        icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
        purpose: "Computação distribuída, mensageria SQS/SNS e infraestrutura resiliente.",
      },
      {
        name: "Azure",
        icon: `${DI}/azure/azure-original.svg`,
        purpose: "Serviços em nuvem integrados para cargas corporativas híbridas.",
      },
      {
        name: "Docker",
        icon: `${DI}/docker/docker-original.svg`,
        purpose: "Isolamento em containers promovendo paridade dev-prod.",
      },
      {
        name: "Kubernetes",
        icon: `${DI}/kubernetes/kubernetes-plain.svg`,
        purpose: "Orquestração de microsserviços com auto-healing e escala elástica.",
      },
      {
        name: "Terraform",
        icon: `${DI}/terraform/terraform-original-wordmark.svg`,
        purpose: "Infraestrutura como Código (IaC) versionada e determinística.",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.simpleicons.org/githubactions/2088FF",
        purpose: "Pipelines de CI/CD automatizados para build, teste e deploy contínuo.",
      },
      {
        name: "Prometheus",
        icon: `${DI}/prometheus/prometheus-original.svg`,
        purpose: "Métricas de séries temporais com alertas proativos de incidentes.",
      },
      {
        name: "Grafana",
        icon: `${DI}/grafana/grafana-original.svg`,
        purpose: "Dashboards analíticos em tempo real de saúde operacional e tráfego.",
      },
      {
        name: "SonarQube",
        icon: `${DI}/sonarqube/sonarqube-original.svg`,
        purpose: "Auditoria estática de código para inspeção contínua de segurança e bugs.",
      },
    ],
  },
];
