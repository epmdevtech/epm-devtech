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
    category: "VALOR DE NEGÓCIO",
    title: "Sistemas Desenhados para o Seu Crescimento",
    description:
      "Construímos software corporativo sob medida com base sólida para acompanhar a expansão da sua empresa sem exigir reconstruções futuras.",
    tags: ["Alta Eficiência", "Escalabilidade", "Retorno do Investimento"],
  },
  {
    id: "data-integrations",
    nodeIndex: nodeIndexOf("bra_l_tip"), // Ponta da chave esquerda {
    category: "CONEXÃO & EFICIÊNCIA",
    title: "Integração Contínua entre os Seus Sistemas",
    description:
      "Fim do trabalho manual e das planilhas isoladas: conectamos seu ERP, canais de venda e nuvem com sincronismo em tempo real e zero perda de dados.",
    tags: ["Zero Retrabalho", "Dados Sincronizados", "Conexão Segura"],
  },
  {
    id: "critical-ops",
    nodeIndex: nodeIndexOf("bra_r_tip"), // Ponta da chave direita }
    category: "CONTINUIDADE OPERACIONAL",
    title: "Operações Protegidas e Sem Interrupções",
    description:
      "Garantia de estabilidade para que sua empresa não perca vendas nem atrase entregas durante picos de demanda ou fechamentos mensais.",
    tags: ["Alta Disponibilidade", "Segurança de Dados", "Operação 24/7"],
  },
  {
    id: "modernization",
    nodeIndex: nodeIndexOf("t_mid"), // Topo da moldura
    category: "EVOLUÇÃO SEGURA",
    title: "Modernização Sem Parar o Faturamento",
    description:
      "Atualizamos processos antigos e sistemas legados de forma gradual e segura, mantendo as operações e o faturamento 100% ativos.",
    tags: ["Transição Suave", "Redução de Custos", "Evolução Contínua"],
  },
];
