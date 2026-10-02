export interface ConstellationNode {
  id: string;
  x: number;
  y: number;
  r: number;
  isKey?: boolean;
  group: "frame" | "bracket" | "core" | "bus";
}

export interface ConstellationEdge {
  id: string;
  from: string;
  to: string;
  type: "primary" | "secondary";
  flow?: boolean;
}

// ─── 1. Mapeamento de Vértices da Silhueta Oficial EPM DevTech (viewBox 0 0 600 600) ───
// Centralizado em (300, 300)
export const CONSTELLATION_NODES: ConstellationNode[] = [
  // ─── Moldura Externa de Tela / Circuito (Outer Frame) ───
  // Aresta Superior e Cantos
  { id: "tl_corner", x: 122, y: 122, r: 4, group: "frame" },
  { id: "t_1", x: 150, y: 110, r: 3.5, group: "frame" },
  { id: "t_2", x: 225, y: 110, r: 3, group: "frame" },
  { id: "t_mid", x: 300, y: 110, r: 5, isKey: true, group: "frame" },
  { id: "t_3", x: 375, y: 110, r: 3, group: "frame" },
  { id: "t_4", x: 450, y: 110, r: 3.5, group: "frame" },
  { id: "tr_corner", x: 478, y: 122, r: 4, group: "frame" },

  // Aresta Direita
  { id: "r_1", x: 490, y: 150, r: 3.5, group: "frame" },
  { id: "r_2", x: 490, y: 225, r: 3, group: "frame" },
  { id: "r_mid", x: 490, y: 300, r: 5, isKey: true, group: "frame" },
  { id: "r_3", x: 490, y: 375, r: 3, group: "frame" },
  { id: "r_4", x: 490, y: 450, r: 3.5, group: "frame" },
  { id: "br_corner", x: 478, y: 478, r: 4, group: "frame" },

  // Aresta Inferior
  { id: "b_4", x: 450, y: 490, r: 3.5, group: "frame" },
  { id: "b_3", x: 375, y: 490, r: 3, group: "frame" },
  { id: "b_mid", x: 300, y: 490, r: 5, isKey: true, group: "frame" },
  { id: "b_2", x: 225, y: 490, r: 3, group: "frame" },
  { id: "b_1", x: 150, y: 490, r: 3.5, group: "frame" },
  { id: "bl_corner", x: 122, y: 478, r: 4, group: "frame" },

  // Aresta Esquerda
  { id: "l_4", x: 110, y: 450, r: 3.5, group: "frame" },
  { id: "l_3", x: 110, y: 375, r: 3, group: "frame" },
  { id: "l_mid", x: 110, y: 300, r: 5, isKey: true, group: "frame" },
  { id: "l_2", x: 110, y: 225, r: 3, group: "frame" },
  { id: "l_1", x: 110, y: 150, r: 3.5, group: "frame" },

  // ─── Barramentos / Pinos de Circuito Superiores e Inferiores ───
  { id: "bus_t1", x: 260, y: 65, r: 3, group: "bus" },
  { id: "bus_t2", x: 300, y: 60, r: 4.5, isKey: true, group: "bus" },
  { id: "bus_t3", x: 340, y: 65, r: 3, group: "bus" },

  { id: "bus_b1", x: 260, y: 535, r: 3, group: "bus" },
  { id: "bus_b2", x: 300, y: 540, r: 4.5, isKey: true, group: "bus" },
  { id: "bus_b3", x: 340, y: 535, r: 3, group: "bus" },

  // ─── Chave de Código Esquerda { ───
  { id: "bra_l_top1", x: 250, y: 190, r: 3.5, group: "bracket" },
  { id: "bra_l_top2", x: 215, y: 190, r: 3.5, group: "bracket" },
  { id: "bra_l_top3", x: 195, y: 210, r: 3.5, group: "bracket" },
  { id: "bra_l_stem1", x: 195, y: 260, r: 3.5, group: "bracket" },
  { id: "bra_l_cusp1", x: 165, y: 285, r: 3.5, group: "bracket" },
  { id: "bra_l_tip", x: 145, y: 300, r: 5.5, isKey: true, group: "bracket" },
  { id: "bra_l_cusp2", x: 165, y: 315, r: 3.5, group: "bracket" },
  { id: "bra_l_stem2", x: 195, y: 340, r: 3.5, group: "bracket" },
  { id: "bra_l_bot1", x: 195, y: 390, r: 3.5, group: "bracket" },
  { id: "bra_l_bot2", x: 215, y: 410, r: 3.5, group: "bracket" },
  { id: "bra_l_bot3", x: 250, y: 410, r: 3.5, group: "bracket" },

  // ─── Chave de Código Direita } ───
  { id: "bra_r_top1", x: 350, y: 190, r: 3.5, group: "bracket" },
  { id: "bra_r_top2", x: 385, y: 190, r: 3.5, group: "bracket" },
  { id: "bra_r_top3", x: 405, y: 210, r: 3.5, group: "bracket" },
  { id: "bra_r_stem1", x: 405, y: 260, r: 3.5, group: "bracket" },
  { id: "bra_r_cusp1", x: 435, y: 285, r: 3.5, group: "bracket" },
  { id: "bra_r_tip", x: 455, y: 300, r: 5.5, isKey: true, group: "bracket" },
  { id: "bra_r_cusp2", x: 435, y: 315, r: 3.5, group: "bracket" },
  { id: "bra_r_stem2", x: 405, y: 340, r: 3.5, group: "bracket" },
  { id: "bra_r_bot1", x: 405, y: 390, r: 3.5, group: "bracket" },
  { id: "bra_r_bot2", x: 385, y: 410, r: 3.5, group: "bracket" },
  { id: "bra_r_bot3", x: 350, y: 410, r: 3.5, group: "bracket" },

  // ─── Núcleo Central: Divisor Técnico / Core Slash ───
  { id: "slash_top", x: 330, y: 205, r: 4, group: "core" },
  { id: "core_center", x: 300, y: 300, r: 7, isKey: true, group: "core" },
  { id: "slash_bot", x: 270, y: 395, r: 4, group: "core" },
];

export const NODE_MAP = new Map<string, ConstellationNode>(
  CONSTELLATION_NODES.map((node) => [node.id, node])
);

// ─── 2. Conexões Vetoriais (Arestas Primárias e Diagonais da Constelação) ───
export const CONSTELLATION_EDGES: ConstellationEdge[] = [
  // ─── Perímetro Fechado da Moldura Exterior ───
  { id: "e_f1", from: "tl_corner", to: "t_1", type: "primary" },
  { id: "e_f2", from: "t_1", to: "t_2", type: "primary" },
  { id: "e_f3", from: "t_2", to: "t_mid", type: "primary", flow: true },
  { id: "e_f4", from: "t_mid", to: "t_3", type: "primary", flow: true },
  { id: "e_f5", from: "t_3", to: "t_4", type: "primary" },
  { id: "e_f6", from: "t_4", to: "tr_corner", type: "primary" },
  { id: "e_f7", from: "tr_corner", to: "r_1", type: "primary" },
  { id: "e_f8", from: "r_1", to: "r_2", type: "primary" },
  { id: "e_f9", from: "r_2", to: "r_mid", type: "primary", flow: true },
  { id: "e_f10", from: "r_mid", to: "r_3", type: "primary", flow: true },
  { id: "e_f11", from: "r_3", to: "r_4", type: "primary" },
  { id: "e_f12", from: "r_4", to: "br_corner", type: "primary" },
  { id: "e_f13", from: "br_corner", to: "b_4", type: "primary" },
  { id: "e_f14", from: "b_4", to: "b_3", type: "primary" },
  { id: "e_f15", from: "b_3", to: "b_mid", type: "primary", flow: true },
  { id: "e_f16", from: "b_mid", to: "b_2", type: "primary", flow: true },
  { id: "e_f17", from: "b_2", to: "b_1", type: "primary" },
  { id: "e_f18", from: "b_1", to: "bl_corner", type: "primary" },
  { id: "e_f19", from: "bl_corner", to: "l_4", type: "primary" },
  { id: "e_f20", from: "l_4", to: "l_3", type: "primary" },
  { id: "e_f21", from: "l_3", to: "l_mid", type: "primary", flow: true },
  { id: "e_f22", from: "l_mid", to: "l_2", type: "primary", flow: true },
  { id: "e_f23", from: "l_2", to: "l_1", type: "primary" },
  { id: "e_f24", from: "l_1", to: "tl_corner", type: "primary" },

  // ─── Barramentos de Circuito ───
  { id: "e_bt1", from: "bus_t1", to: "bus_t2", type: "primary" },
  { id: "e_bt2", from: "bus_t2", to: "bus_t3", type: "primary" },
  { id: "e_bt3", from: "bus_t2", to: "t_mid", type: "primary", flow: true },
  { id: "e_bb1", from: "bus_b1", to: "bus_b2", type: "primary" },
  { id: "e_bb2", from: "bus_b2", to: "bus_b3", type: "primary" },
  { id: "e_bb3", from: "bus_b2", to: "b_mid", type: "primary", flow: true },

  // ─── Chave Esquerda { ───
  { id: "e_bl1", from: "bra_l_top1", to: "bra_l_top2", type: "primary" },
  { id: "e_bl2", from: "bra_l_top2", to: "bra_l_top3", type: "primary" },
  { id: "e_bl3", from: "bra_l_top3", to: "bra_l_stem1", type: "primary", flow: true },
  { id: "e_bl4", from: "bra_l_stem1", to: "bra_l_cusp1", type: "primary" },
  { id: "e_bl5", from: "bra_l_cusp1", to: "bra_l_tip", type: "primary", flow: true },
  { id: "e_bl6", from: "bra_l_tip", to: "bra_l_cusp2", type: "primary", flow: true },
  { id: "e_bl7", from: "bra_l_cusp2", to: "bra_l_stem2", type: "primary" },
  { id: "e_bl8", from: "bra_l_stem2", to: "bra_l_bot1", type: "primary", flow: true },
  { id: "e_bl9", from: "bra_l_bot1", to: "bra_l_bot2", type: "primary" },
  { id: "e_bl10", from: "bra_l_bot2", to: "bra_l_bot3", type: "primary" },

  // ─── Chave Direita } ───
  { id: "e_br1", from: "bra_r_top1", to: "bra_r_top2", type: "primary" },
  { id: "e_br2", from: "bra_r_top2", to: "bra_r_top3", type: "primary" },
  { id: "e_br3", from: "bra_r_top3", to: "bra_r_stem1", type: "primary", flow: true },
  { id: "e_br4", from: "bra_r_stem1", to: "bra_r_cusp1", type: "primary" },
  { id: "e_br5", from: "bra_r_cusp1", to: "bra_r_tip", type: "primary", flow: true },
  { id: "e_br6", from: "bra_r_tip", to: "bra_r_cusp2", type: "primary", flow: true },
  { id: "e_br7", from: "bra_r_cusp2", to: "bra_r_stem2", type: "primary" },
  { id: "e_br8", from: "bra_r_stem2", to: "bra_r_bot1", type: "primary", flow: true },
  { id: "e_br9", from: "bra_r_bot1", to: "bra_r_bot2", type: "primary" },
  { id: "e_br10", from: "bra_r_bot2", to: "bra_r_bot3", type: "primary" },

  // ─── Núcleo: Slash / ───
  { id: "e_s1", from: "slash_top", to: "core_center", type: "primary", flow: true },
  { id: "e_s2", from: "core_center", to: "slash_bot", type: "primary", flow: true },

  // ─── Conexões Diagonais / Struts de Malha da Constelação ───
  { id: "m_1", from: "t_mid", to: "slash_top", type: "secondary" },
  { id: "m_2", from: "b_mid", to: "slash_bot", type: "secondary" },
  { id: "m_3", from: "l_mid", to: "bra_l_tip", type: "secondary", flow: true },
  { id: "m_4", from: "r_mid", to: "bra_r_tip", type: "secondary", flow: true },
  { id: "m_5", from: "tl_corner", to: "bra_l_top2", type: "secondary" },
  { id: "m_6", from: "tr_corner", to: "bra_r_top2", type: "secondary" },
  { id: "m_7", from: "bl_corner", to: "bra_l_bot2", type: "secondary" },
  { id: "m_8", from: "br_corner", to: "bra_r_bot2", type: "secondary" },
  { id: "m_9", from: "core_center", to: "bra_l_cusp1", type: "secondary" },
  { id: "m_10", from: "core_center", to: "bra_l_cusp2", type: "secondary" },
  { id: "m_11", from: "core_center", to: "bra_r_cusp1", type: "secondary" },
  { id: "m_12", from: "core_center", to: "bra_r_cusp2", type: "secondary" },
];
