import { CONSTELLATION_NODES } from "@/config/epmConstellation";

export interface ConstellationPractice {
  id: string;
  /** Índice do nó em CONSTELLATION_NODES (derive com `nodeIndexOf`). */
  nodeIndex: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

/**
 * Resolve o índice de um nó da constelação a partir do seu `id`.
 * Evita quebra silenciosa caso a ordem de CONSTELLATION_NODES mude.
 */
export const nodeIndexOf = (nodeId: string): number => {
  const index = CONSTELLATION_NODES.findIndex((node) => node.id === nodeId);
  if (index < 0) {
    throw new Error(`Nó inexistente na constelação: "${nodeId}"`);
  }
  return index;
};

export const PRACTICES_DATA: ConstellationPractice[] = [
  {
    id: "core-arch",
    nodeIndex: nodeIndexOf("core_center"), // Núcleo central
    category: "NÚCLEO & ARQUITETURA",
    title: "Sistemas Web e Plataformas Corporativas",
    description:
      "Desenvolvimento modular desenhado para crescer sem criar gargalos técnicos ou reescritas de código.",
    tags: ["Clean Code", "Escalabilidade", "Alta Disponibilidade"],
  },
  {
    id: "data-integrations",
    nodeIndex: nodeIndexOf("bra_l_tip"), // Ponta da chave esquerda {
    category: "FLUXO & CONEXÃO",
    title: "Integrações de Dados & Mensageria",
    description:
      "Comunicação contínua entre ERPs, sistemas legados e APIs de alto volume com garantia de entrega e zero perda de transações.",
    tags: ["RabbitMQ", "REST APIs", "Webhooks"],
  },
  {
    id: "critical-ops",
    nodeIndex: nodeIndexOf("bra_r_tip"), // Ponta da chave direita }
    category: "CONFIABILIDADE",
    title: "Operações Críticas & Telemetria",
    description:
      "Monitoramento em tempo real e integridade regulatória para plataformas que operam 24/7.",
    tags: ["Observabilidade", "PostgreSQL", "Docker"],
  },
  {
    id: "modernization",
    nodeIndex: nodeIndexOf("t_mid"), // Topo da moldura
    category: "EVOLUÇÃO",
    title: "Modernização Incremental de Legados",
    description:
      "Substituição e refatoração segura de rotinas antigas sem paralisar o faturamento ou a operação da empresa.",
    tags: ["Refatoração", "Microsserviços", "CI/CD"],
  },
];
