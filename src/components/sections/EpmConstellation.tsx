import React, { useState, useId, useMemo, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONSTELLATION_NODES } from "@/config/epmConstellation";
import { PRACTICES_DATA, type ConstellationPractice } from "@/data/constellationPractices";
import ConstellationInspector from "@/components/sections/constellation/ConstellationInspector";
import ConstellationEdgesLayer from "@/components/sections/constellation/ConstellationEdgesLayer";
import ConstellationNodesLayer from "@/components/sections/constellation/ConstellationNodesLayer";
import ConstellationDefs from "@/components/sections/constellation/ConstellationDefs";
import ActiveNodeHighlight from "@/components/sections/constellation/ActiveNodeHighlight";

export interface EpmConstellationProps {
  className?: string;
  interactive?: boolean;
  /** Práticas associadas aos nós (SPEC-105). Editáveis em src/data/constellationPractices.ts */
  practices?: ConstellationPractice[];
}

export const EpmConstellation: React.FC<EpmConstellationProps> = ({
  className,
  interactive = true,
  practices = PRACTICES_DATA,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const uniqueId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Monitoramento de posição do mouse normalizada para o viewBox (0 a 600)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !svgRef.current) return;
    // Ignora eventos que borbulham do card (renderizado em portal)
    if (!e.currentTarget.contains(e.target as Node)) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 600;
    const y = ((e.clientY - rect.top) / rect.height) * 600;
    setMousePos({ x, y });
  }, [interactive]);

  const handlePointerLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  // Mapeamento de nós sob influência do mouse (distância < 110px)
  const proximityMap = useMemo(() => {
    if (!mousePos) return new Map<string, number>();
    const map = new Map<string, number>();
    const threshold = 110;
    for (const node of CONSTELLATION_NODES) {
      const dist = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
      if (dist < threshold) {
        map.set(node.id, 1 - dist / threshold);
      }
    }
    return map;
  }, [mousePos]);

  return (
    <div
      aria-hidden={interactive ? undefined : true}
      data-testid="epm-constellation-container"
      className={`select-none overflow-hidden ${className || ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ConstellationInspector practices={interactive ? practices : []}>
        {(activeId) => (
          <svg
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
            className="w-full h-full cursor-crosshair"
            ref={svgRef}
            aria-hidden="true"
          >
            <ConstellationDefs id={uniqueId} />

            {/* ─── Grupo Mestre com Flutuação Orgânica Contínua ─── */}
            <motion.g
              animate={prefersReducedMotion ? {} : { y: [-3, 3, -3] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* 1. Pulso Sonar Expansivo Central emanando do nó Core */}
              {!prefersReducedMotion && (
                <>
                  <motion.circle
                    cx={300}
                    cy={300}
                    r={15}
                    fill="none"
                    className="stroke-teal-700/30 dark:stroke-teal-400/40"
                    strokeWidth={1.2}
                    initial={{ r: 15, opacity: 0.6 }}
                    animate={{ r: [15, 80], opacity: [0.6, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx={300}
                    cy={300}
                    r={15}
                    fill="none"
                    className="stroke-teal-700/20 dark:stroke-teal-400/30"
                    strokeWidth={0.8}
                    initial={{ r: 15, opacity: 0.4 }}
                    animate={{ r: [15, 120], opacity: [0.4, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, delay: 1.8, ease: "easeOut" }}
                  />
                </>
              )}

              {/* 2. Glow de Fundo no Núcleo do Logo */}
              <circle
                cx={300}
                cy={300}
                r={150}
                fill={`url(#${uniqueId}-coreGlow)`}
                className="pointer-events-none opacity-40 dark:opacity-80"
              />
              {/* 3. Arestas / Conexões Vetoriais da Constelação */}
              <ConstellationEdgesLayer
                proximityMap={proximityMap}
                prefersReducedMotion={prefersReducedMotion}
              />

              {/* 4. Nós Estelares / Vértices da Silhueta */}
              <ConstellationNodesLayer
                proximityMap={proximityMap}
                prefersReducedMotion={prefersReducedMotion}
              />

              {/* 5. Destaque do nó ativo do Inspector (camada isolada) */}
              <ActiveNodeHighlight activeId={activeId} />
            </motion.g>
          </svg>
        )}
      </ConstellationInspector>
    </div>
  );
};

export default EpmConstellation;
