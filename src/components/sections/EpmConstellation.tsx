import React, { useState, useId, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CONSTELLATION_NODES,
  CONSTELLATION_EDGES,
  NODE_MAP,
} from "@/config/epmConstellation";

export interface EpmConstellationProps {
  className?: string;
  interactive?: boolean;
}

export const EpmConstellation: React.FC<EpmConstellationProps> = ({
  className,
  interactive = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const uniqueId = useId();
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Monitoramento de posição do mouse normalizada para o viewBox (0 a 600)
  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
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
      aria-hidden="true"
      data-testid="epm-constellation-container"
      className={`select-none overflow-hidden ${className || ""}`}
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        className="w-full h-full cursor-crosshair"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <defs>
          {/* Gradiente primário para modo Dark */}
          <linearGradient id={`${uniqueId}-darkGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradiente primário para modo Light (alto contraste contra surface-anchor) */}
          <linearGradient id={`${uniqueId}-lightGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#0D9488" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#115E59" stopOpacity="0.5" />
          </linearGradient>

          {/* Feixe ativo de dados */}
          <linearGradient id={`${uniqueId}-flowGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="1" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.1" />
          </linearGradient>

          {/* Radial glow central */}
          <radialGradient id={`${uniqueId}-coreGlow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#2DD4BF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </radialGradient>
        </defs>

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

          {/* 4. Nós Estelares / Vértices da Silhueta */}
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
        </motion.g>
      </svg>
    </div>
  );
};

export default EpmConstellation;
