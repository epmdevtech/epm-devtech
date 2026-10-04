import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONSTELLATION_EDGES, NODE_MAP } from "@/config/epmConstellation";

export interface ActiveNodeHighlightProps {
  activeId: string | null;
}

/**
 * Camada SVG isolada: realça o nó ativo (glow, anel de pulso, leve aumento)
 * e as arestas conectadas a ele. Não altera nenhuma camada base do logotipo.
 */
const ActiveNodeHighlight = ({ activeId }: ActiveNodeHighlightProps) => {
  const prefersReducedMotion = useReducedMotion();
  const node = activeId ? NODE_MAP.get(activeId) : undefined;

  const connected = useMemo(
    () =>
      activeId
        ? CONSTELLATION_EDGES.filter((e) => e.from === activeId || e.to === activeId)
        : [],
    [activeId],
  );

  if (!node) return null;
  const r = node.r;

  return (
    <g data-testid="constellation-active-highlight" pointerEvents="none">
      {connected.map((edge) => {
        const from = NODE_MAP.get(edge.from);
        const to = NODE_MAP.get(edge.to);
        if (!from || !to) return null;
        return (
          <motion.line
            key={edge.id}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            strokeWidth={2.4}
            strokeLinecap="round"
            className="stroke-teal-600 dark:stroke-emerald-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
          />
        );
      })}

      <circle cx={node.x} cy={node.y} r={r * 3.2} className="fill-emerald-500/25 dark:fill-emerald-300/25" />

      {prefersReducedMotion ? (
        <circle
          cx={node.x}
          cy={node.y}
          r={r * 3.6}
          fill="none"
          strokeWidth={1.2}
          className="stroke-teal-600/70 dark:stroke-emerald-300/70"
        />
      ) : (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={r * 2.2}
          fill="none"
          strokeWidth={1.2}
          className="stroke-teal-600 dark:stroke-emerald-300"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: [1, 1.9], opacity: [0.8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <circle cx={node.x} cy={node.y} r={r * 1.3} className="fill-teal-600 dark:fill-emerald-300" />
      {node.isKey && (
        <circle cx={node.x} cy={node.y} r={r * 0.55} className="fill-white dark:fill-zinc-950 opacity-90" />
      )}
    </g>
  );
};

export default memo(ActiveNodeHighlight);
