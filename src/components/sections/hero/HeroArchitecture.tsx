import { useState } from "react";
import {
  Globe,
  Cpu,
  Workflow,
  Database,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopologyNode {
  id: string;
  step: string;
  name: string;
  role: string;
  description: string;
  icon: typeof Globe;
  capabilities: string[];
}

const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: "edge",
    step: "01 / Borda",
    name: "Client / Edge",
    role: "Entrada & Segurança",
    description: "Distribuição global, terminação TLS e mitigação de latência na borda.",
    icon: Globe,
    capabilities: ["Edge Routing", "Segurança TLS", "CDN Global"],
  },
  {
    id: "domain",
    step: "02 / Core",
    name: "Domain Services",
    role: "Serviços de Domínio",
    description: "Microsserviços modulares e regras de negócio com desacoplamento estrito.",
    icon: Cpu,
    capabilities: ["APIs Modulares", "Clean Architecture", "Alta Vazão"],
  },
  {
    id: "events",
    step: "03 / Assincronia",
    name: "Event Stream",
    role: "Mensageria & Filas",
    description: "Eventos assíncronos e mensageria distribuída para processamento resiliente.",
    icon: Workflow,
    capabilities: ["Orientado a Eventos", "Workers Dedicados", "Zero Perdas"],
  },
  {
    id: "data",
    step: "04 / Nuvem",
    name: "Cloud & Data",
    role: "Persistência & Resiliência",
    description: "Bancos de dados resilientes, estratégias de cache e redundância multi-zona.",
    icon: Database,
    capabilities: ["Multi-Região", "Cache em Memória", "Alta Disponibilidade"],
  },
];

interface HeroArchitectureProps {
  className?: string;
}

const HeroArchitecture = ({ className }: HeroArchitectureProps) => {
  const [activeNode, setActiveNode] = useState<string>("domain");

  return (
    <div
      role="region"
      aria-label="Diagrama de topologia de arquitetura de software da EPM DEVTECH"
      className={cn(
        "relative w-full rounded-2xl border border-border/80 bg-card/70 dark:bg-card/40 backdrop-blur-sm shadow-xl p-5 sm:p-7 md:p-8 overflow-hidden",
        className
      )}
    >
      {/* Top Bar: Minimalista, sutil e sem telemetria ruidosa */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-border/70 text-xs">
        {/* Terminal Window Dots & Breadcrumb */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>
          <span className="font-mono text-zinc-500 dark:text-zinc-400 select-none text-[11px] sm:text-xs">
            topologia://arquitetura-distribuida.epm
          </span>
        </div>

        {/* Clean Status Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground select-none">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-foreground/90 font-medium">Topologia Resiliente</span>
          <span className="text-border" aria-hidden="true">•</span>
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <ShieldCheck className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>Padrão Corporativo</span>
          </div>
        </div>
      </div>

      {/* Clean Topology Grid: 4 estágios sequenciais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {TOPOLOGY_NODES.map((node, index) => {
          const Icon = node.icon;
          const isSelected = activeNode === node.id;

          return (
            <div
              key={node.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveNode(node.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveNode(node.id);
                }
              }}
              className={cn(
                "group relative flex flex-col justify-between p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer text-left",
                isSelected
                  ? "border-emerald-500/80 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.06] shadow-sm ring-1 ring-emerald-500/30"
                  : "border-border/70 bg-background/50 dark:bg-zinc-900/30 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-background/80"
              )}
            >
              <div>
                {/* Header inside card */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {node.step}
                  </span>
                  <div
                    className={cn(
                      "p-1.5 rounded-md border transition-colors",
                      isSelected
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border/60 bg-muted/30 text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                </div>

                {/* Node Title & Role */}
                <h2 className="text-sm font-semibold text-foreground leading-snug mb-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {node.name}
                </h2>
                <span className="inline-block text-[11px] font-medium text-emerald-700 dark:text-emerald-400 mb-2">
                  {node.role}
                </span>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {node.description}
                </p>
              </div>

              {/* Capabilities List: clean tags without numbers */}
              <div className="pt-3 border-t border-border/50 flex flex-wrap gap-1.5 mt-auto">
                {node.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="inline-flex items-center rounded border border-border/60 bg-muted/20 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {cap}
                  </span>
                ))}
              </div>

              {/* Directional indicator between nodes on desktop */}
              {index < TOPOLOGY_NODES.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 size-5 rounded-full border border-border bg-background items-center justify-center text-muted-foreground shadow-xs"
                >
                  <ArrowRight className="size-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Layer Context & Engineering Statement */}
      <div className="mt-5 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-muted/20 dark:bg-muted/10 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 md:-mx-8 md:-mb-8 p-4 sm:p-5 relative z-10">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-mono text-[11px] text-foreground font-semibold">
            Camada Ativa:
          </span>
          <span className="text-foreground/90 font-medium">
            {TOPOLOGY_NODES.find((n) => n.id === activeNode)?.name}
          </span>
          <span className="text-border" aria-hidden="true">•</span>
          <span className="text-muted-foreground">
            {TOPOLOGY_NODES.find((n) => n.id === activeNode)?.role}
          </span>
        </div>

        <div className="font-mono text-[11px] text-muted-foreground">
          Desacoplamento estrito & tolerância a falhas
        </div>
      </div>

      {/* Soft Bottom Fade: Desvanecimento suave na base do card para transição com a página */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-background via-background/60 to-transparent z-20"
      />
    </div>
  );
};

export default HeroArchitecture;
