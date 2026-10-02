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
  active?: boolean;
  flowDelay?: number;
}

const NODES: GraphNode[] = [
  { id: "core", cx: 340, cy: 250, r: 7, isHub: true, pulseDelay: 0 },
  { id: "gw", cx: 450, cy: 160, r: 5.5, isHub: true, pulseDelay: 0.8 },
  { id: "db", cx: 430, cy: 350, r: 5.5, isHub: true, pulseDelay: 1.6 },
  { id: "s1", cx: 230, cy: 160, r: 3.5, pulseDelay: 0.5 },
  { id: "s2", cx: 220, cy: 320, r: 3.5, pulseDelay: 1.2 },
  { id: "s3", cx: 540, cy: 240, r: 4, pulseDelay: 2.0 },
  { id: "s4", cx: 360, cy: 80, r: 3, pulseDelay: 1.8 },
  { id: "s5", cx: 350, cy: 420, r: 3, pulseDelay: 1.0 },
  { id: "s6", cx: 510, cy: 380, r: 3.5, pulseDelay: 2.2 },
  { id: "s7", cx: 160, cy: 240, r: 2.5, pulseDelay: 0.3 },
];

const EDGES: GraphEdge[] = [
  // Interconexões centrais ativas
  { from: [340, 250], to: [450, 160], active: true, flowDelay: 0 },
  { from: [340, 250], to: [430, 350], active: true, flowDelay: 1.2 },
  { from: [450, 160], to: [430, 350], dashed: true },
  // Satélites com fluxos ativos
  { from: [340, 250], to: [230, 160], active: true, flowDelay: 1.8 },
  { from: [340, 250], to: [220, 320], active: true, flowDelay: 0.6 },
  { from: [450, 160], to: [540, 240], active: true, flowDelay: 1.0 },
  { from: [430, 350], to: [540, 240] },
  { from: [450, 160], to: [360, 80], active: true, flowDelay: 1.5 },
  { from: [230, 160], to: [360, 80], dashed: true },
  { from: [430, 350], to: [350, 420], active: true, flowDelay: 2.0 },
  { from: [220, 320], to: [350, 420], dashed: true },
  { from: [430, 350], to: [510, 380], active: true, flowDelay: 0.4 },
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
          {/* Gradiente para feixes de dados ativos */}
          <linearGradient id="activeStream" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
          </linearGradient>

          {/* Gradiente radial para glow central */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Anéis Orbitais com Rotação Contínua e Satélites em Órbita */}
        {/* Anel Orbital Interno: Rotação Contínua Horária */}
        <motion.g
          style={{ transformOrigin: "340px 250px" }}
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx={340}
            cy={250}
            r={95}
            stroke="#2DD4BF"
            strokeOpacity={0.16}
            strokeDasharray="5 7"
            strokeWidth={1}
            fill="none"
          />
          {/* Ponto Satélite Orbital Luminoso no anel interno */}
          <circle cx={435} cy={250} r={3} fill="#2DD4BF" fillOpacity={0.85} />
          <circle cx={245} cy={250} r={2} fill="#2DD4BF" fillOpacity={0.5} />
        </motion.g>

        {/* Anel Orbital Externo: Rotação Contínua Anti-Horária */}
        <motion.g
          style={{ transformOrigin: "340px 250px" }}
          animate={prefersReducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx={340}
            cy={250}
            r={180}
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeDasharray="6 10"
            strokeWidth={1}
            fill="none"
            className="text-primary"
          />
          {/* Pontos Satélites no anel externo */}
          <circle cx={160} cy={250} r={2.5} fill="#2DD4BF" fillOpacity={0.7} />
          <circle cx={520} cy={250} r={2.5} fill="#2DD4BF" fillOpacity={0.7} />
        </motion.g>

        {/* 2. Efeito Sonar / Radar Expansivo emanando do Core Central */}
        {!prefersReducedMotion && (
          <>
            <motion.circle
              cx={340}
              cy={250}
              r={10}
              stroke="#2DD4BF"
              strokeWidth={1.5}
              fill="none"
              animate={{
                r: [10, 52],
                opacity: [0.65, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.circle
              cx={340}
              cy={250}
              r={10}
              stroke="#2DD4BF"
              strokeWidth={1}
              fill="none"
              animate={{
                r: [10, 52],
                opacity: [0.65, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.6,
              }}
            />
          </>
        )}

        {/* 3. Edges / Linhas de Conexão Base */}
        <g stroke="currentColor" strokeOpacity={0.14} strokeWidth={1} className="text-primary">
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

        {/* 4. Feixes Ativos com Fluxo de Dados Animado Contínuo */}
        {EDGES.filter((edge) => edge.active).map((edge, idx) => (
          <motion.line
            key={`stream-${idx}`}
            x1={edge.from[0]}
            y1={edge.from[1]}
            x2={edge.to[0]}
            y2={edge.to[1]}
            stroke="#2DD4BF"
            strokeWidth={1.5}
            strokeDasharray="7 28"
            animate={
              prefersReducedMotion
                ? { strokeDashoffset: 0, opacity: 0.3 }
                : {
                    strokeDashoffset: [0, -35],
                    opacity: [0.35, 0.85, 0.35],
                  }
            }
            transition={{
              strokeDashoffset: {
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: edge.flowDelay || 0,
              },
            }}
          />
        ))}

        {/* 5. Partículas de Pacotes de Dados Deslizando pelas Trilhas */}
        {!prefersReducedMotion && (
          <>
            {/* Core -> Gateway */}
            <motion.circle
              r={2.5}
              fill="#2DD4BF"
              animate={{
                cx: [340, 450],
                cy: [250, 160],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Core -> Persistence */}
            <motion.circle
              r={2.5}
              fill="#2DD4BF"
              animate={{
                cx: [340, 430],
                cy: [250, 350],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              }}
            />

            {/* Core -> Satélite Oeste */}
            <motion.circle
              r={2}
              fill="#2DD4BF"
              animate={{
                cx: [340, 230],
                cy: [250, 160],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.7,
              }}
            />

            {/* Gateway -> Satélite Leste */}
            <motion.circle
              r={2}
              fill="#2DD4BF"
              animate={{
                cx: [450, 540],
                cy: [160, 240],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
            />
          </>
        )}

        {/* 6. Nodes / Hubs e Satélites com Micro-Respiração */}
        {NODES.map((node) => {
          if (node.isHub) {
            return (
              <g key={node.id}>
                {/* Glow de fundo */}
                <circle cx={node.cx} cy={node.cy} r={node.r + 14} fill="url(#coreGlow)" />

                {/* Halo de pulsação suave */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r + 8}
                  fill="#2DD4BF"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.12 }
                      : {
                          opacity: [0.08, 0.28, 0.08],
                          scale: [0.94, 1.14, 0.94],
                        }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: node.pulseDelay,
                  }}
                  style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                />

                {/* Corpo do nó */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill="currentColor"
                  className="text-surface-base"
                  stroke="#2DD4BF"
                  strokeWidth={1.8}
                />

                {/* Núcleo ativo luminoso */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={2.5}
                  fill="#2DD4BF"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.9 }
                      : {
                          opacity: [0.7, 1, 0.7],
                          scale: [0.9, 1.2, 0.9],
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: node.pulseDelay,
                  }}
                  style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                />
              </g>
            );
          }

          return (
            <motion.g
              key={node.id}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [-2, 2, -2],
                    }
              }
              transition={{
                duration: 4 + (node.pulseDelay || 0),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Nó satélite com borda */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="currentColor"
                strokeOpacity={0.25}
                stroke="currentColor"
                strokeWidth={1}
                className="text-surface-base"
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r - 1}
                fill="#2DD4BF"
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.4 }
                    : {
                        opacity: [0.25, 0.85, 0.25],
                      }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.pulseDelay,
                }}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default EngineeringNetworkGraph;
