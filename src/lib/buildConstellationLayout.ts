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
 * Centróides padrão das 6 categorias no layout Desktop (viewBox 1000 x 620).
 * Disposição reflete a arquitetura: Frontend -> Backend -> Banco/Mensageria -> Cloud -> Observabilidade.
 */
const DESKTOP_CATEGORY_CENTROIDS: Record<string, { x: number; y: number }> = {
  frontend: { x: 130, y: 220 },
  backend: { x: 380, y: 190 },
  database: { x: 370, y: 460 },
  messaging: { x: 640, y: 440 },
  cloud: { x: 670, y: 180 },
  observability: { x: 880, y: 310 },
};

/**
 * Centróides no layout Mobile (viewBox 380 x 860).
 * Disposição em fluxo vertical de fácil visualização em colunas duplas.
 */
const MOBILE_CATEGORY_CENTROIDS: Record<string, { x: number; y: number }> = {
  frontend: { x: 110, y: 120 },
  backend: { x: 270, y: 170 },
  database: { x: 110, y: 390 },
  messaging: { x: 270, y: 430 },
  cloud: { x: 120, y: 650 },
  observability: { x: 260, y: 700 },
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
  const width = options.width ?? (isMobile ? 380 : 1000);
  const height = options.height ?? (isMobile ? 860 : 620);

  const defaultCentroids = isMobile
    ? MOBILE_CATEGORY_CENTROIDS
    : DESKTOP_CATEGORY_CENTROIDS;

  const nodes: NodePosition[] = [];
  const nodesByName = new Map<string, NodePosition>();
  const categoryCentroids: CategoryCentroid[] = [];

  categories.forEach((category, catIdx) => {
    // Busca o centróide pré-definido ou calcula uma posição radial fallback
    const key = category.id.toLowerCase();
    let centroid = defaultCentroids[key];

    if (!centroid) {
      // Fallback determinístico
      const angle = (catIdx / Math.max(categories.length, 1)) * Math.PI * 2;
      const rx = width * 0.35;
      const ry = height * 0.32;
      centroid = {
        x: width * 0.5 + Math.cos(angle) * rx,
        y: height * 0.5 + Math.sin(angle) * ry,
      };
    }

    categoryCentroids.push({
      id: category.id,
      label: category.label,
      colorVar: category.colorVar,
      x: centroid.x,
      y: centroid.y,
    });

    const techCount = category.technologies.length;

    category.technologies.forEach((tech, techIdx) => {
      let nodeX: number;
      let nodeY: number;

      if (techCount === 1) {
        nodeX = centroid.x;
        nodeY = centroid.y;
      } else if (isMobile) {
        // No mobile: arranjo compacto ao redor do centróide
        const angle = (techIdx / techCount) * Math.PI * 2 - Math.PI / 2;
        const radius = Math.min(38, 20 + techCount * 3.5);
        nodeX = centroid.x + Math.cos(angle) * radius;
        nodeY = centroid.y + Math.sin(angle) * radius;
      } else {
        // No desktop: dispersão em anel elíptico com leve variação orgânica
        const angle = (techIdx / techCount) * Math.PI * 2 - Math.PI / 2;
        const radiusX = Math.min(75, 45 + techCount * 5.5);
        const radiusY = Math.min(65, 40 + techCount * 4.5);
        nodeX = centroid.x + Math.cos(angle) * radiusX;
        nodeY = centroid.y + Math.sin(angle) * radiusY;
      }

      // Garante que o nó permaneça dentro dos limites do viewport
      const padding = isMobile ? 24 : 35;
      nodeX = Math.max(padding, Math.min(width - padding, nodeX));
      nodeY = Math.max(padding, Math.min(height - padding, nodeY));

      const node: NodePosition = {
        id: tech.name,
        name: tech.name,
        icon: tech.icon,
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
      { name: "React", icon: `${DI}/react/react-original.svg` },
      { name: "Angular", icon: `${DI}/angular/angular-original.svg` },
      { name: "Vue.js", icon: `${DI}/vuejs/vuejs-original.svg` },
      { name: "TypeScript", icon: `${DI}/typescript/typescript-original.svg` },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    colorVar: "--primary",
    technologies: [
      { name: "Node.js", icon: `${DI}/nodejs/nodejs-original.svg` },
      { name: "PHP", icon: `${DI}/php/php-original.svg` },
      { name: "Laravel", icon: `${DI}/laravel/laravel-original.svg` },
      { name: "Symfony", icon: `${DI}/symfony/symfony-original-wordmark.svg` },
    ],
  },
  {
    id: "database",
    label: "Banco de Dados",
    colorVar: "--primary",
    technologies: [
      { name: "PostgreSQL", icon: `${DI}/postgresql/postgresql-original.svg` },
      { name: "MySQL", icon: `${DI}/mysql/mysql-original.svg` },
      { name: "Oracle", icon: `${DI}/oracle/oracle-original.svg` },
      { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg` },
      { name: "Redis", icon: `${DI}/redis/redis-original.svg` },
    ],
  },
  {
    id: "messaging",
    label: "Mensageria",
    colorVar: "--primary",
    technologies: [
      { name: "RabbitMQ", icon: `${DI}/rabbitmq/rabbitmq-original.svg` },
      { name: "Kafka", icon: `${DI}/apachekafka/apachekafka-original-wordmark.svg` },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    colorVar: "--primary",
    technologies: [
      { name: "AWS", icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: "Azure", icon: `${DI}/azure/azure-original.svg` },
      { name: "Docker", icon: `${DI}/docker/docker-original.svg` },
      { name: "Kubernetes", icon: `${DI}/kubernetes/kubernetes-plain.svg` },
      { name: "Terraform", icon: `${DI}/terraform/terraform-original-wordmark.svg` },
      { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
    ],
  },
  {
    id: "observability",
    label: "Observabilidade",
    colorVar: "--primary",
    technologies: [
      { name: "Prometheus", icon: `${DI}/prometheus/prometheus-original.svg` },
      { name: "Grafana", icon: `${DI}/grafana/grafana-original.svg` },
      { name: "SonarQube", icon: `${DI}/sonarqube/sonarqube-original.svg` },
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

