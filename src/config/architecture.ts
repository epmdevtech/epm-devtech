/**
 * architecture.ts
 *
 * Dados estruturados e curadoria das camadas de arquitetura tecnológica da EPM DevTech.
 */

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export interface TechItem {
  name: string;
  icon?: string;
  purpose: string;
  badge?: string;
  badgeVariant?: "amber" | "brand" | "default";
  highlight?: boolean;
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
    id: "web-interfaces",
    layerTag: "LAYER 01 // WEB & INTERFACES REATIVAS",
    statusBadge: "CLIENT RUNTIME & SSR",
    title: "Camada de Apresentação & Web",
    description:
      "Aplicações web modernas, Server-Side Rendering (SSR), tipagem estática e interfaces reativas de alto desempenho.",
    technologies: [
      {
        name: "React",
        icon: `${DI}/react/react-original.svg`,
        purpose: "Componentização declarativa, Single Page Applications e ecossistema de interfaces reativas.",
      },
      {
        name: "Next.js",
        icon: `${DI}/nextjs/nextjs-original.svg`,
        purpose: "Framework fullstack com Server-Side Rendering (SSR), Static Generation e rotas otimizadas no edge.",
      },
      {
        name: "TypeScript",
        icon: `${DI}/typescript/typescript-original.svg`,
        purpose: "Tipagem estática estrita em tempo de compilação, eliminando bugs em produção e garantindo contratos previsíveis.",
      },
      {
        name: "JavaScript",
        icon: `${DI}/javascript/javascript-original.svg`,
        purpose: "Fundação dinâmica do ecossistema web moderno (ESNext), execução assíncrona e APIs do navegador.",
      },
      {
        name: "Vue.js",
        icon: `${DI}/vuejs/vuejs-original.svg`,
        purpose: "Ecossistema progressivo e ágil com reatividade fina para interfaces corporativas e portais integrados.",
      },
      {
        name: "Angular",
        icon: `${DI}/angular/angular-original.svg`,
        purpose: "Framework opinado para sistemas de grande porte corporativo, com injeção de dependências e arquitetura modular.",
      },
    ],
  },
  {
    id: "backend-apis",
    layerTag: "LAYER 02 // BACK-END, APIS & LINGUAGENS",
    statusBadge: "SERVICE RUNTIME",
    title: "Camada de Back-end & APIs",
    description:
      "Serviços de aplicação escaláveis, APIs RESTful/GraphQL de baixa latência e regras de negócio com alta concorrência.",
    technologies: [
      {
        name: "Node.js",
        icon: `${DI}/nodejs/nodejs-original.svg`,
        purpose: "Runtime assíncrono e event-driven para APIs com alta densidade de requisições simultâneas.",
        badge: "Core Runtime",
        badgeVariant: "brand",
      },
      {
        name: "Python",
        icon: `${DI}/python/python-original.svg`,
        purpose: "Desenvolvimento ágil de microserviços, automações analíticas, processamento de dados e pipelines de IA.",
      },
      {
        name: "Go",
        icon: `${DI}/go/go-original.svg`,
        purpose: "Compilação nativa de alta velocidade, rotinas concorrentes leves (goroutines) e serviços de infraestrutura.",
      },
      {
        name: "PHP",
        icon: `${DI}/php/php-original.svg`,
        purpose: "Back-end maduro e performático com tipagem estrita moderna e ecossistema robusto para soluções corporativas.",
      },
      {
        name: "Ruby on Rails",
        icon: `${DI}/rails/rails-plain.svg`,
        purpose: "Desenvolvimento rápido de produtos e APIs orientadas a convenção com alta produtividade de engenharia.",
      },
    ],
  },
  {
    id: "mobile-ai",
    layerTag: "LAYER 03 // MOBILE & ENGENHARIA DE IA",
    statusBadge: "NATIVE APPS & INTELLIGENCE",
    title: "Camada Mobile & Inteligência Artificial",
    description:
      "Aplicações móveis híbridas e nativas de alta performance combinadas com aceleração e workflows assistidos por IA.",
    technologies: [
      {
        name: "React Native",
        icon: `${DI}/react/react-original.svg`,
        purpose: "Aplicações móveis multiplataforma (iOS e Android) com base de código unificada e componentes nativos reais.",
      },
      {
        name: "Android",
        icon: `${DI}/android/android-original.svg`,
        purpose: "Desenvolvimento nativo para o ecossistema Android (Kotlin), otimizado para integração de hardware e telemetria.",
      },
      {
        name: "Swift",
        icon: `${DI}/swift/swift-original.svg`,
        purpose: "Engenharia nativa iOS com segurança de memória e máxima fluidez para dispositivos Apple.",
      },
      {
        name: "Programação com IA",
        purpose: "Aceleração de desenvolvimento com agentes autônomos, engenharia de contexto e geração assistida de testes e código.",
        badge: "Inovação",
        badgeVariant: "amber",
        highlight: true,
      },
    ],
  },
  {
    id: "cloud-infrastructure",
    layerTag: "LAYER 04 // CLOUD & INFRAESTRUTURA ESCALÁVEL",
    statusBadge: "ENTERPRISE CLOUD",
    title: "Camada Cloud & Infraestrutura",
    description:
      "Provedores líderes de nuvem para hospedar sistemas de missão crítica com 99,9% de disponibilidade e escala elástica.",
    technologies: [
      {
        name: "AWS",
        icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
        purpose: "Arquitetura em nuvem distribuída, computação elástica (EC2/ECS), serverless (Lambda) e mensageria gerenciada.",
        badge: "Certificado",
        badgeVariant: "amber",
      },
      {
        name: "Azure",
        icon: `${DI}/azure/azure-original.svg`,
        purpose: "Serviços de computação em nuvem empresarial da Microsoft para integração com ecossistemas corporativos híbridos.",
        badge: "Enterprise",
        badgeVariant: "default",
      },
    ],
  },
];
