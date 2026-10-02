import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface EngineeringNetworkGraphProps {
  className?: string;
}

interface GraphNode {
  id: string;
  cx: number;
  cy: number;
  r: number;
  isHub?: boolean;
  pulseDelay?: number;
}

interface GraphEdge {
  from: [number, number];
  to: [number, number];
  dashed?: boolean;
}

const NODES: GraphNode[] = [
  { id: "core", cx: 340, cy: 250, r: 6, isHub: true, pulseDelay: 0 },
  { id: "gw", cx: 450, cy: 160, r: 5, isHub: true, pulseDelay: 1.2 },
  { id: "db", cx: 430, cy: 350, r: 5, isHub: true, pulseDelay: 2.4 },
  { id: "s1", cx: 230, cy: 160, r: 3.5, pulseDelay: 0.8 },
  { id: "s2", cx: 220, cy: 320, r: 3.5, pulseDelay: 1.8 },
  { id: "s3", cx: 540, cy: 240, r: 4, pulseDelay: 3.0 },
  { id: "s4", cx: 360, cy: 80, r: 3, pulseDelay: 2.0 },
  { id: "s5", cx: 350, cy: 420, r: 3, pulseDelay: 1.5 },
  { id: "s6", cx: 510, cy: 380, r: 3.5, pulseDelay: 2.8 },
  { id: "s7", cx: 160, cy: 240, r: 2.5, pulseDelay: 0.5 },
];

const EDGES: GraphEdge[] = [
  // Interconexões centrais
  { from: [340, 250], to: [450, 160] },
  { from: [340, 250], to: [430, 350] },
  { from: [450, 160], to: [430, 350], dashed: true },
  // Satélites
  { from: [340, 250], to: [230, 160] },
  { from: [340, 250], to: [220, 320] },
  { from: [450, 160], to: [540, 240] },
  { from: [430, 350], to: [540, 240] },
  { from: [450, 160], to: [360, 80] },
  { from: [230, 160], to: [360, 80], dashed: true },
  { from: [430, 350], to: [350, 420] },
  { from: [220, 320], to: [350, 420], dashed: true },
  { from: [430, 350], to: [510, 380] },
  { from: [540, 240], to: [510, 380] },
  { from: [230, 160], to: [160, 240] },
  { from: [220, 320], to: [160, 240] },
];

export const EngineeringNetworkGraph: React.FC<EngineeringNetworkGraphProps> = ({
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className || ""}`}
    >
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Gradiente de fade para a esquerda */}
          <linearGradient id="networkFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="30%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>

          {/* Gradiente para feixes ativos */}
          <linearGradient id="brandBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Anéis orbitais concêntricos de referência técnica em torno do Core */}
        <circle
          cx={340}
          cy={250}
          r={90}
          stroke="currentColor"
          strokeOpacity={0.06}
          strokeDasharray="4 6"
          fill="none"
        />
        <circle
          cx={340}
          cy={250}
          r={170}
          stroke="currentColor"
          strokeOpacity={0.04}
          strokeDasharray="6 8"
          fill="none"
        />

        {/* Edges / Linhas de Conexão */}
        <g stroke="currentColor" strokeOpacity={0.12} strokeWidth={1}>
          {EDGES.map((edge, idx) => (
            <line
              key={`edge-${idx}`}
              x1={edge.from[0]}
              y1={edge.from[1]}
              x2={edge.to[0]}
              y2={edge.to[1]}
              strokeDasharray={edge.dashed ? "3 4" : undefined}
            />
          ))}
        </g>

        {/* Feixe ativo de estabilidade contínua entre Core e Gateway */}
        <motion.line
          x1={340}
          y1={250}
          x2={450}
          y2={160}
          stroke="url(#brandBeam)"
          strokeWidth={1.5}
          animate={
            prefersReducedMotion
              ? { opacity: 0.3 }
              : {
                  opacity: [0.15, 0.65, 0.15],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Feixe ativo entre Core e Persistence */}
        <motion.line
          x1={340}
          y1={250}
          x2={430}
          y2={350}
          stroke="url(#brandBeam)"
          strokeWidth={1.5}
          animate={
            prefersReducedMotion
              ? { opacity: 0.3 }
              : {
                  opacity: [0.2, 0.7, 0.2],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Nodes / Pontos de Conexão */}
        {NODES.map((node) => {
          if (node.isHub) {
            return (
              <g key={node.id}>
                {/* Halo de pulsação suave em torno dos hubs */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r + 8}
                  fill="#2DD4BF"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.1, scale: 1 }
                      : {
                          opacity: [0.06, 0.22, 0.06],
                          scale: [0.95, 1.15, 0.95],
                        }
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: node.pulseDelay,
                  }}
                />

                {/* Borda externa do nó */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill="currentColor"
                  className="text-surface-base"
                  stroke="#2DD4BF"
                  strokeWidth={1.5}
                />

                {/* Núcleo interno luminoso */}
                <circle cx={node.cx} cy={node.cy} r={2} fill="#2DD4BF" />
              </g>
            );
          }

          return (
            <g key={node.id}>
              {/* Nó satélite simples */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="currentColor"
                strokeOpacity={0.2}
                stroke="currentColor"
                strokeWidth={1}
                className="text-secondary/60"
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={1.2}
                fill="#2DD4BF"
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.4 }
                    : {
                        opacity: [0.2, 0.8, 0.2],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.pulseDelay,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default EngineeringNetworkGraph;
