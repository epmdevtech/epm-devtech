/**
 * buildConstellationLayout.ts
 *
 * Utilitário desacoplado de cálculo determinístico de layout para o TechConstellation.
 * Calcula as coordenadas (x, y) de cada tecnologia agrupada por categoria e
 * gera os caminhos SVG no estilo trilhas de circuito impresso (PCB).
 */

export interface Technology {
  name: string;
  icon: string;
  description?: string;
}

export interface Category {
  id: string;
  label: string;
  colorVar: string;
  technologies: Technology[];
}

export type Connection = [techA: string, techB: string];

export interface NodePosition {
  id: string;
  name: string;
  icon: string;
  description: string;
  categoryId: string;
  categoryLabel: string;
  colorVar: string;
  x: number;
  y: number;
}

export interface CalculatedConnection {
  id: string;
  source: string;
  target: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  pathData: string;
}

export interface CategoryCentroid {
  id: string;
  label: string;
  colorVar: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
}

export interface ConstellationLayout {
  width: number;
  height: number;
  nodes: NodePosition[];
  connections: CalculatedConnection[];
  categoryCentroids: CategoryCentroid[];
}

export interface LayoutOptions {
  width?: number;
  height?: number;
  isMobile?: boolean;
}

/**
 * Gera um path SVG no estilo PCB (Printed Circuit Board) com curvas ortogonais suaves.
 */
export function generatePcbPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  radius = 12
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Linha quase horizontal ou vertical direta
  if (Math.abs(dx) < 2 || Math.abs(dy) < 2) {
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }

  const midX = x1 + dx * 0.5;
  const signX = dx > 0 ? 1 : -1;
  const signY = dy > 0 ? 1 : -1;
  const r = Math.min(radius, Math.abs(dx) * 0.4, Math.abs(dy) * 0.4);

  // PCB routing com dois cantos arredondados (S-curve ortogonal)
  return [
    `M ${x1.toFixed(1)} ${y1.toFixed(1)}`,
    `L ${(midX - signX * r).toFixed(1)} ${y1.toFixed(1)}`,
    `Q ${midX.toFixed(1)} ${y1.toFixed(1)} ${midX.toFixed(1)} ${(y1 + signY * r).toFixed(1)}`,
    `L ${midX.toFixed(1)} ${(y2 - signY * r).toFixed(1)}`,
    `Q ${midX.toFixed(1)} ${y2.toFixed(1)} ${(midX + signX * r).toFixed(1)} ${y2.toFixed(1)}`,
    `L ${x2.toFixed(1)} ${y2.toFixed(1)}`,
  ].join(" ");
}

/**
 * Centróides e posições dos rótulos de categoria no layout Desktop (viewBox 1100 x 680).
 * Os rótulos de categoria ficam posicionados fora da órbita dos nós para evitar qualquer colisão.
 */
const DESKTOP_CATEGORY_CONFIG: Record<
  string,
  { x: number; y: number; labelX: number; labelY: number; radiusX: number; radiusY: number }
> = {
  frontend: { x: 170, y: 260, labelX: 170, labelY: 135, radiusX: 74, radiusY: 58 },
  backend: { x: 460, y: 220, labelX: 460, labelY: 95, radiusX: 78, radiusY: 60 },
  cloud: { x: 770, y: 210, labelX: 770, labelY: 85, radiusX: 95, radiusY: 64 },
  database: { x: 360, y: 530, labelX: 360, labelY: 410, radiusX: 84, radiusY: 60 },
  messaging: { x: 660, y: 530, labelX: 660, labelY: 420, radiusX: 68, radiusY: 50 },
  observability: { x: 950, y: 380, labelX: 950, labelY: 250, radiusX: 72, radiusY: 56 },
};

/**
 * Centróides no layout Mobile (viewBox 380 x 860).
 */
const MOBILE_CATEGORY_CONFIG: Record<
  string,
  { x: number; y: number; labelX: number; labelY: number; radiusX: number; radiusY: number }
> = {
  frontend: { x: 110, y: 130, labelX: 110, labelY: 60, radiusX: 42, radiusY: 36 },
  backend: { x: 270, y: 180, labelX: 270, labelY: 110, radiusX: 42, radiusY: 36 },
  database: { x: 110, y: 400, labelX: 110, labelY: 330, radiusX: 46, radiusY: 38 },
  messaging: { x: 270, y: 440, labelX: 270, labelY: 370, radiusX: 38, radiusY: 32 },
  cloud: { x: 120, y: 660, labelX: 120, labelY: 590, radiusX: 48, radiusY: 38 },
  observability: { x: 260, y: 710, labelX: 260, labelY: 640, radiusX: 40, radiusY: 34 },
};

/**
 * Constrói o layout completo da constelação de tecnologias.
 */
export function buildConstellationLayout(
  categories: Category[],
  connections: Connection[],
  options: LayoutOptions = {}
): ConstellationLayout {
  const isMobile = options.isMobile ?? false;
  const width = options.width ?? (isMobile ? 380 : 1100);
  const height = options.height ?? (isMobile ? 860 : 680);

  const defaultConfigs = isMobile ? MOBILE_CATEGORY_CONFIG : DESKTOP_CATEGORY_CONFIG;

  const nodes: NodePosition[] = [];
  const nodesByName = new Map<string, NodePosition>();
  const categoryCentroids: CategoryCentroid[] = [];

  categories.forEach((category, catIdx) => {
    const key = category.id.toLowerCase();
    const config = defaultConfigs[key] ?? {
      x: width * 0.5,
      y: height * 0.5,
      labelX: width * 0.5,
      labelY: height * 0.5 - 70,
      radiusX: 65,
      radiusY: 55,
    };

    categoryCentroids.push({
      id: category.id,
      label: category.label,
      colorVar: category.colorVar,
      x: config.x,
      y: config.y,
      labelX: config.labelX,
      labelY: config.labelY,
    });

    const techCount = category.technologies.length;

    category.technologies.forEach((tech, techIdx) => {
      let nodeX: number;
      let nodeY: number;

      if (techCount === 1) {
        nodeX = config.x;
        nodeY = config.y;
      } else {
        const angle = (techIdx / techCount) * Math.PI * 2 - Math.PI / 2;
        nodeX = config.x + Math.cos(angle) * config.radiusX;
        nodeY = config.y + Math.sin(angle) * config.radiusY;
      }

      // Garante que o nó permaneça dentro dos limites do viewport
      const padding = isMobile ? 26 : 42;
      nodeX = Math.max(padding, Math.min(width - padding, nodeX));
      nodeY = Math.max(padding, Math.min(height - padding, nodeY));

      const node: NodePosition = {
        id: tech.name,
        name: tech.name,
        icon: tech.icon,
        description:
          tech.description ??
          `Tecnologia integrada na camada de ${category.label} da arquitetura EPM DEVTECH.`,
        categoryId: category.id,
        categoryLabel: category.label,
        colorVar: category.colorVar,
        x: nodeX,
        y: nodeY,
      };

      nodes.push(node);
      nodesByName.set(tech.name, node);
    });
  });

  // Calcula caminhos das conexões entre tecnologias
  const calculatedConnections: CalculatedConnection[] = [];

  connections.forEach(([techA, techB], idx) => {
    const nodeA = nodesByName.get(techA);
    const nodeB = nodesByName.get(techB);

    if (!nodeA || !nodeB) return;

    const pathData = generatePcbPath(nodeA.x, nodeA.y, nodeB.x, nodeB.y);

    calculatedConnections.push({
      id: `conn-${techA}-${techB}-${idx}`,
      source: techA,
      target: techB,
      sourceX: nodeA.x,
      sourceY: nodeA.y,
      targetX: nodeB.x,
      targetY: nodeB.y,
      pathData,
    });
  });

  return {
    width,
    height,
    nodes,
    connections: calculatedConnections,
    categoryCentroids,
  };
}

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const DEFAULT_CONSTELLATION_CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    colorVar: "--primary",
    technologies: [
      {
        name: "React",
        icon: `${DI}/react/react-original.svg`,
        description: "Construção de interfaces componentizadas, dinâmicas e de alta performance.",
      },
      {
        name: "Angular",
        icon: `${DI}/angular/angular-original.svg`,
        description: "Framework robusto para aplicações corporativas com arquitetura opinada.",
      },
      {
        name: "Vue.js",
        icon: `${DI}/vuejs/vuejs-original.svg`,
        description: "Ecossistema progressivo e ágil para interfaces interativas e reativas.",
      },
      {
        name: "TypeScript",
        icon: `${DI}/typescript/typescript-original.svg`,
        description: "Tipagem estática estrita para código confiável, seguro e de fácil manutenção.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    colorVar: "--primary",
    technologies: [
      {
        name: "Node.js",
        icon: `${DI}/nodejs/nodejs-original.svg`,
        description: "Runtime assíncrono e não-bloqueante para APIs REST/GraphQL de alto throughput.",
      },
      {
        name: "PHP",
        icon: `${DI}/php/php-original.svg`,
        description: "Back-end corporativo moderno com forte tipagem e vasto ecossistema maduro.",
      },
      {
        name: "Laravel",
        icon: `${DI}/laravel/laravel-original.svg`,
        description: "Framework PHP de excelência para desenvolvimento ágil de sistemas escaláveis.",
      },
      {
        name: "Symfony",
        icon: `${DI}/symfony/symfony-original-wordmark.svg`,
        description: "Conjunto desacoplado de componentes corporativos de alto desempenho e precisão.",
      },
    ],
  },
  {
    id: "database",
    label: "Banco de Dados",
    colorVar: "--primary",
    technologies: [
      {
        name: "PostgreSQL",
        icon: `${DI}/postgresql/postgresql-original.svg`,
        description: "SGBD relacional avançado com integridade transacional ACID estrita e extensões geo/JSON.",
      },
      {
        name: "MySQL",
        icon: `${DI}/mysql/mysql-original.svg`,
        description: "Banco relacional amplamente testado para operações transacionais rápidas e confiáveis.",
      },
      {
        name: "Oracle",
        icon: `${DI}/oracle/oracle-original.svg`,
        description: "Banco de dados enterprise para cargas críticas corporativas e processamento intensivo.",
      },
      {
        name: "MongoDB",
        icon: `${DI}/mongodb/mongodb-original.svg`,
        description: "Armazenamento NoSQL baseado em documentos flexíveis com alta capacidade de escala horizontal.",
      },
      {
        name: "Redis",
        icon: `${DI}/redis/redis-original.svg`,
        description: "Estrutura de dados em memória para cache ultrarrápido, filas efêmeras e controle de sessões.",
      },
    ],
  },
  {
    id: "messaging",
    label: "Mensageria",
    colorVar: "--primary",
    technologies: [
      {
        name: "RabbitMQ",
        icon: `${DI}/rabbitmq/rabbitmq-original.svg`,
        description: "Message broker confiável com roteamento flexível para desacoplamento de serviços assíncronos.",
      },
      {
        name: "Kafka",
        icon: `${DI}/apachekafka/apachekafka-original-wordmark.svg`,
        description: "Plataforma distribuída de streaming de eventos para ingestão e telemetria em tempo real.",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    colorVar: "--primary",
    technologies: [
      {
        name: "AWS",
        icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
        description: "Nuvem líder com alta disponibilidade, computação distribuída, SQS e infraestrutura resiliente.",
      },
      {
        name: "Azure",
        icon: `${DI}/azure/azure-original.svg`,
        description: "Serviços em nuvem integrados para cargas corporativas híbridas e alta conformidade.",
      },
      {
        name: "Docker",
        icon: `${DI}/docker/docker-original.svg`,
        description: "Isolamento e containerização de aplicações garantindo paridade entre desenvolvimento e produção.",
      },
      {
        name: "Kubernetes",
        icon: `${DI}/kubernetes/kubernetes-plain.svg`,
        description: "Orquestração de microsserviços em larga escala com autorrecuperação e balanceamento de carga.",
      },
      {
        name: "Terraform",
        icon: `${DI}/terraform/terraform-original-wordmark.svg`,
        description: "Infraestrutura como código (IaC) para provisionamento consistente e versionado em múltiplas nuvens.",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.simpleicons.org/githubactions/2088FF",
        description: "Automação contínua de CI/CD para pipelines de build, testes automatizados e deploy seguro.",
      },
    ],
  },
  {
    id: "observability",
    label: "Observabilidade",
    colorVar: "--primary",
    technologies: [
      {
        name: "Prometheus",
        icon: `${DI}/prometheus/prometheus-original.svg`,
        description: "Monitoramento e coleta de métricas de séries temporais com alertas proativos para incidentes.",
      },
      {
        name: "Grafana",
        icon: `${DI}/grafana/grafana-original.svg`,
        description: "Dashboards visuais analíticos em tempo real para monitoramento de saúde operacional e métricas.",
      },
      {
        name: "SonarQube",
        icon: `${DI}/sonarqube/sonarqube-original.svg`,
        description: "Auditoria estática contínua de código para inspeção de segurança, dívida técnica e bugs.",
      },
    ],
  },
];

export const DEFAULT_CONSTELLATION_CONNECTIONS: Connection[] = [
  ["React", "Node.js"],
  ["React", "TypeScript"],
  ["Vue.js", "Laravel"],
  ["Angular", "Node.js"],
  ["Node.js", "PostgreSQL"],
  ["Node.js", "MongoDB"],
  ["Node.js", "Redis"],
  ["PHP", "Laravel"],
  ["Laravel", "MySQL"],
  ["Symfony", "PostgreSQL"],
  ["Symfony", "Oracle"],
  ["Laravel", "Redis"],
  ["Laravel", "RabbitMQ"],
  ["Node.js", "Kafka"],
  ["RabbitMQ", "Docker"],
  ["Kafka", "Kubernetes"],
  ["PostgreSQL", "AWS"],
  ["Oracle", "Azure"],
  ["Docker", "Kubernetes"],
  ["Docker", "AWS"],
  ["Terraform", "AWS"],
  ["Terraform", "Azure"],
  ["GitHub Actions", "Docker"],
  ["Kubernetes", "Prometheus"],
  ["Prometheus", "Grafana"],
  ["GitHub Actions", "SonarQube"],
];

