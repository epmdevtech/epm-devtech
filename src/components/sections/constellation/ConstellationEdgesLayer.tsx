import { memo } from "react";
import { motion } from "framer-motion";
import { CONSTELLATION_EDGES, NODE_MAP } from "@/config/epmConstellation";

export interface ConstellationLayerProps {
  proximityMap: Map<string, number>;
  prefersReducedMotion: boolean | null;
}

/** Arestas / conexões vetoriais da constelação (camada memoizada, sem estado). */
const ConstellationEdgesLayer = ({ proximityMap, prefersReducedMotion }: ConstellationLayerProps) => (
  <g data-testid="constellation-edges">
    {CONSTELLATION_EDGES.map((edge, idx) => {
      const fromNode = NODE_MAP.get(edge.from);
      const toNode = NODE_MAP.get(edge.to);
      if (!fromNode || !toNode) return null;

      const isSecondary = edge.type === "secondary";
      const proxFrom = proximityMap.get(edge.from) || 0;
      const proxTo = proximityMap.get(edge.to) || 0;
      const edgeProximity = Math.max(proxFrom, proxTo);

      const strokeWidth = isSecondary
        ? 1.0 + edgeProximity * 0.6
        : 1.6 + edgeProximity * 0.8;

      return (
        <g key={edge.id}>
          {/* Linha base estrutural permanente (garante visibilidade imediata da silhueta) */}
          <line
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            strokeDasharray={isSecondary ? "3 5" : undefined}
            className={
              isSecondary
                ? "stroke-teal-800/25 dark:stroke-teal-400/20"
                : "stroke-teal-700/40 dark:stroke-teal-400/40"
            }
            strokeWidth={strokeWidth}
          />

          {/* Linha animada desenhada por cima (Draw & Hover highlight) */}
          <motion.line
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            className={
              edgeProximity > 0
                ? "stroke-teal-600 dark:stroke-teal-300"
                : isSecondary
                ? "stroke-teal-700/40 dark:stroke-teal-400/35"
                : "stroke-teal-700/80 dark:stroke-teal-400/80"
            }
            strokeWidth={strokeWidth}
            strokeDasharray={isSecondary ? "3 5" : undefined}
            initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.4,
              delay: prefersReducedMotion ? 0 : Math.min(0.5, idx * 0.01),
              ease: "easeOut",
            }}
          />

          {/* Feixe luminoso contínuo de fluxo de dados em conexões ativas */}
          {edge.flow && !prefersReducedMotion && (
            <motion.line
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className="stroke-teal-600 dark:stroke-teal-300"
              strokeWidth={strokeWidth * 1.3}
              strokeDasharray="14 36"
              animate={{ strokeDashoffset: [0, -50] }}
              transition={{
                duration: 2.8 + (idx % 3) * 0.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </g>
      );
    })}
  </g>
);

export default memo(ConstellationEdgesLayer);
