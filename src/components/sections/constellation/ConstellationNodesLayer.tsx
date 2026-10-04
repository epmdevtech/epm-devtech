import { memo } from "react";
import { motion } from "framer-motion";
import { CONSTELLATION_NODES } from "@/config/epmConstellation";

export interface ConstellationLayerProps {
  proximityMap: Map<string, number>;
  prefersReducedMotion: boolean | null;
}

/** Nós estelares / vértices da silhueta (camada memoizada, sem estado). */
const ConstellationNodesLayer = ({ proximityMap, prefersReducedMotion }: ConstellationLayerProps) => (
  <g data-testid="constellation-nodes">
    {CONSTELLATION_NODES.map((node, i) => {
      const prox = proximityMap.get(node.id) || 0;
      const isHovered = prox > 0;
      const nodeR = typeof node.r === "number" && !isNaN(node.r) ? node.r : 3;
      const nodeRadius = nodeR + (isHovered ? prox * 2.5 : 0);
      const haloRadius = nodeR * 2.8 + (isHovered ? prox * 5 : 0);

      return (
        <g key={node.id} data-testid={`node-${node.id}`}>
          {/* Halo Difuso ao Redor do Nó */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={haloRadius || 8}
            className={
              isHovered
                ? "fill-teal-600/35 dark:fill-teal-300/40"
                : "fill-teal-700/15 dark:fill-teal-400/18"
            }
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.35,
              delay: prefersReducedMotion ? 0 : Math.min(0.8, i * 0.015),
            }}
          />

          {/* Núcleo Estelar Sólido Luminoso com Respiração Ociosa */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={nodeRadius || 3}
            className={
              node.isKey
                ? "fill-teal-600 dark:fill-teal-200"
                : "fill-teal-700 dark:fill-teal-400"
            }
            initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { scale: 1, opacity: 1 }
                : {
                    scale: [1, node.isKey ? 1.25 : 1.15, 1],
                    opacity: [
                      isHovered ? 1 : 0.75,
                      1,
                      isHovered ? 1 : 0.75,
                    ],
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 3.2 + (i % 4) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.min(1.0, i * 0.02),
                  }
            }
          />

          {/* Ponto Central Branco em Nós de Alto Destaque */}
          {node.isKey && (
            <circle
              cx={node.x}
              cy={node.y}
              r={(nodeRadius || 3) * 0.45 || 1.5}
              className="fill-white dark:fill-zinc-950 opacity-90"
            />
          )}
        </g>
      );
    })}
  </g>
);

export default memo(ConstellationNodesLayer);
