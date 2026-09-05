import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  buildConstellationLayout,
  type Category,
  type Connection,
  type NodePosition,
  type CalculatedConnection,
} from "@/lib/buildConstellationLayout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface TechConstellationProps {
  categories: Category[];
  connections: Connection[];
  className?: string;
}

export const TechConstellation: React.FC<TechConstellationProps> = ({
  categories,
  connections,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  // Detecção responsiva segura no cliente
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Calcula o layout geométrico desacoplado da constelação
  const layout = useMemo(() => {
    return buildConstellationLayout(categories, connections, { isMobile });
  }, [categories, connections, isMobile]);

  // Estado interativo: nó ativo selecionado (hover / focus / mobile tap)
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // Mapeamento de nós adjacentes para Focus & Context
  const adjacencyMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    categories.forEach((cat) => {
      cat.technologies.forEach((tech) => {
        map.set(tech.name, new Set());
      });
    });

    connections.forEach(([techA, techB]) => {
      map.get(techA)?.add(techB);
      map.get(techB)?.add(techA);
    });

    return map;
  }, [categories, connections]);

  // Tecnologias conectadas ao nó ativo
  const activeNeighbors = useMemo(() => {
    if (!activeTech) return null;
    const neighbors = adjacencyMap.get(activeTech) ?? new Set();
    return new Set([activeTech, ...Array.from(neighbors)]);
  }, [activeTech, adjacencyMap]);

  // Objeto do nó ativo selecionado
  const activeNode = useMemo(() => {
    if (!activeTech) return null;
    return layout.nodes.find((n) => n.name === activeTech) ?? null;
  }, [activeTech, layout.nodes]);

  // Lista de vizinhos conectados ao nó ativo
  const activeNeighborsList = useMemo(() => {
    if (!activeTech) return [];
    return Array.from(adjacencyMap.get(activeTech) ?? []);
  }, [activeTech, adjacencyMap]);

  // Fecha o estado ativo ao pressionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTech(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Configurações de dimensão dos cards dos nós (acomoda ícone + nome)
  const nodeWidth = isMobile ? 54 : 66;
  const nodeHeight = isMobile ? 48 : 56;
  const halfWidth = nodeWidth / 2;
  const halfHeight = nodeHeight / 2;

  return (
    <TooltipProvider delayDuration={150}>
      <div
        ref={containerRef}
        data-testid="tech-constellation"
        className={cn(
          "relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center select-none",
          className
        )}
      >
        {/* SVG responsivo da Constelação e trilhas PCB */}
        <div className="relative w-full aspect-[380/860] md:aspect-[1100/680] overflow-hidden rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm shadow-inner">
          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            className="w-full h-full cursor-default"
            preserveAspectRatio="xMidYMid meet"
            onClick={() => setActiveTech(null)}
          >
            <defs>
              {/* Gradiente sutil para os pulsos de luz das trilhas */}
              <linearGradient id="pcb-pulse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              </linearGradient>

              {/* Filtro de glow para trilhas ativas */}
              <filter id="pcb-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ─── Rótulos e centróides de cada Categoria (posicionados sem colisão) ─── */}
            <g className="category-labels pointer-events-none">
              {layout.categoryCentroids.map((cat) => (
                <g key={cat.id} transform={`translate(${cat.labelX}, ${cat.labelY})`}>
                  <rect
                    x={isMobile ? "-54" : "-65"}
                    y={isMobile ? "-12" : "-14"}
                    width={isMobile ? "108" : "130"}
                    height={isMobile ? "24" : "28"}
                    rx={isMobile ? "12" : "14"}
                    fill="hsl(var(--card))"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    className="opacity-95 shadow-sm"
                  />
                  <text
                    x="0"
                    y={isMobile ? "3" : "4"}
                    textAnchor="middle"
                    className="fill-foreground text-[9px] md:text-[11px] font-mono uppercase tracking-wider font-semibold"
                  >
                    {cat.label}
                  </text>
                </g>
              ))}
            </g>

            {/* ─── Trilhas PCB (Conexões) ─── */}
            <g className="connections-layer">
              {layout.connections.map((conn: CalculatedConnection) => {
                const isConnActive =
                  activeTech !== null &&
                  (conn.source === activeTech || conn.target === activeTech);
                const isConnDimmed =
                  activeTech !== null && !isConnActive;

                return (
                  <g key={conn.id} data-testid={`connection-${conn.source}-${conn.target}`}>
                    {/* Trilha base estilo PCB */}
                    <motion.path
                      d={conn.pathData}
                      fill="none"
                      stroke={
                        isConnActive
                          ? "hsl(var(--primary))"
                          : "hsl(var(--border))"
                      }
                      strokeWidth={isConnActive ? 2.5 : 1.25}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-active={isConnActive ? "true" : "false"}
                      className={cn(
                        "transition-all duration-300",
                        isConnDimmed && "opacity-25",
                        isConnActive && "filter-[url(#pcb-glow)]"
                      )}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={
                        isInView
                          ? { pathLength: 1, opacity: isConnDimmed ? 0.25 : 1 }
                          : {}
                      }
                      transition={{
                        pathLength: {
                          duration: shouldReduceMotion ? 0 : 1.2,
                          ease: "easeInOut",
                          delay: 0.2,
                        },
                        opacity: { duration: 0.3 },
                      }}
                    />

                    {/* Pulso de luz animado percorrendo a trilha em repouso */}
                    {!shouldReduceMotion && isInView && !isConnDimmed && (
                      <motion.path
                        d={conn.pathData}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={isConnActive ? 3 : 2}
                        strokeLinecap="round"
                        strokeDasharray="10 160"
                        className="pointer-events-none opacity-80"
                        animate={{
                          strokeDashoffset: [-170, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: isConnActive ? 2.5 : 4.5,
                          ease: "linear",
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* ─── Nós da Constelação (Tecnologias) ─── */}
            <g className="nodes-layer">
              {layout.nodes.map((node: NodePosition, index: number) => {
                const isNodeActive = activeTech === node.name;
                const isNodeNeighbor =
                  activeNeighbors !== null && activeNeighbors.has(node.name);
                const isDimmed =
                  activeNeighbors !== null && !isNodeNeighbor;

                const connectedNames = Array.from(
                  adjacencyMap.get(node.name) ?? []
                );

                return (
                  <foreignObject
                    key={node.id}
                    x={node.x - halfWidth}
                    y={node.y - halfHeight}
                    width={nodeWidth}
                    height={nodeHeight}
                    className="overflow-visible"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          role="button"
                          tabIndex={0}
                          aria-label={`${node.name} (${node.categoryLabel})`}
                          data-testid={`tech-node-${node.name}`}
                          data-active={isNodeActive ? "true" : "false"}
                          className={cn(
                            "group relative w-full h-full rounded-xl border bg-card/95 flex flex-col items-center justify-center p-1 cursor-pointer shadow-sm select-none transition-all duration-300",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            isNodeActive
                              ? "border-primary ring-2 ring-primary/40 shadow-lg shadow-primary/20 scale-110 z-30"
                              : isNodeNeighbor
                              ? "border-primary/70 shadow-md shadow-primary/10 scale-105 z-20"
                              : "border-border hover:border-primary/50 hover:scale-105",
                            isDimmed && "opacity-35 scale-95"
                          )}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={
                            isInView
                              ? {
                                  opacity: isDimmed ? 0.35 : 1,
                                  scale: isNodeActive
                                    ? 1.12
                                    : isNodeNeighbor
                                    ? 1.05
                                    : isDimmed
                                    ? 0.95
                                    : 1,
                                  y: shouldReduceMotion ? 0 : [0, -2, 0],
                                }
                              : {}
                          }
                          transition={{
                            opacity: { duration: 0.4, delay: index * 0.03 },
                            scale: { duration: 0.3 },
                            y: {
                              repeat: shouldReduceMotion ? 0 : Infinity,
                              repeatType: "mirror",
                              duration: 3 + (index % 4) * 0.8,
                              ease: "easeInOut",
                            },
                          }}
                          onMouseEnter={() => setActiveTech(node.name)}
                          onMouseLeave={() => setActiveTech(null)}
                          onFocus={() => setActiveTech(node.name)}
                          onBlur={() => setActiveTech(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTech(node.name);
                          }}
                        >
                          <img
                            src={node.icon}
                            alt={node.name}
                            width={isMobile ? 20 : 24}
                            height={isMobile ? 20 : 24}
                            loading="lazy"
                            className={cn(
                              "w-5 h-5 md:w-6 md:h-6 object-contain transition-transform duration-300",
                              node.name === "GitHub" && "dark:invert dark:brightness-150"
                            )}
                          />
                          <span className="hidden sm:block text-[9px] md:text-[10px] font-mono leading-none tracking-tight text-muted-foreground group-hover:text-foreground font-semibold truncate max-w-[58px] mt-1">
                            {node.name}
                          </span>
                        </motion.div>
                      </TooltipTrigger>

                      {/* Tooltip Radix / shadcn */}
                      <TooltipContent
                        side="top"
                        sideOffset={8}
                        className="bg-popover border-border/80 text-popover-foreground max-w-xs shadow-xl px-3 py-2"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-semibold text-xs tracking-tight text-foreground">
                              {node.name}
                            </span>
                            <span className="text-[10px] font-mono text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                              {node.categoryLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            {node.description}
                          </p>
                          {connectedNames.length > 0 && (
                            <p className="text-[10px] text-muted-foreground/80 leading-tight pt-0.5 border-t border-border/50">
                              Conexões:{" "}
                              <span className="text-foreground/90 font-medium">
                                {connectedNames.slice(0, 4).join(", ")}
                                {connectedNames.length > 4 ? "..." : ""}
                              </span>
                            </p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </foreignObject>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ─── Painel de Detalhes da Arquitetura / Descrição Dedicada ─── */}
        <div
          data-testid="tech-details-panel"
          className="w-full mt-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md p-4 transition-all duration-300 min-h-[96px] flex items-center shadow-sm"
        >
          {activeNode ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg border border-primary/40 bg-primary/10 flex items-center justify-center p-2 shrink-0 shadow-inner">
                  <img
                    src={activeNode.icon}
                    alt={activeNode.name}
                    className={cn(
                      "w-7 h-7 object-contain",
                      activeNode.name === "GitHub" && "dark:invert dark:brightness-150"
                    )}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">
                      {activeNode.name}
                    </h3>
                    <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/25 uppercase font-medium">
                      {activeNode.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {activeNode.description}
                  </p>
                </div>
              </div>

              {activeNeighborsList.length > 0 && (
                <div className="text-xs font-mono text-muted-foreground sm:text-right shrink-0">
                  <span className="text-muted-foreground/70 block text-[10px] uppercase tracking-wider mb-1">
                    Fluxo de Conexão:
                  </span>
                  <div className="flex flex-wrap sm:justify-end gap-1">
                    {activeNeighborsList.map((target) => (
                      <span
                        key={target}
                        className="px-1.5 py-0.5 rounded bg-secondary/80 border border-border text-[10px] text-foreground"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 w-full text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-border/50 bg-secondary/40 flex items-center justify-center text-primary shrink-0">
                  <span className="text-base font-mono font-bold">⚡</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                    Exploração Interativa do Grafo de Engenharia
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">
                    Passe o mouse ou toque em qualquer nó da constelação para visualizar o papel arquitetural, dependências e fluxos de dados de cada tecnologia.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 font-mono text-xs text-primary/80 shrink-0">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                24 Tecnologias • 6 Camadas
              </div>
            </div>
          )}
        </div>

        {/* Guia sutil de interação para mobile e desktop */}
        <p className="font-mono text-xs text-muted-foreground/50 mt-3 tracking-widest text-center">
          {isMobile
            ? "toque em um nó para inspecionar conexões e detalhes"
            : "passe o mouse ou use tab para inspecionar a arquitetura"}
        </p>
      </div>
    </TooltipProvider>
  );
};

export default TechConstellation;
