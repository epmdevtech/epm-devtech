import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Globe,
  Layers,
  Cpu,
  Database,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  category: string;
  name: string;
  spec: string;
  metric: string;
  metricLabel: string;
  icon: typeof Globe;
  status: "active" | "standby";
  tags: string[];
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "edge",
    category: "Entrada & Segurança",
    name: "Portal de Entrada & Proteção",
    spec: "Distribuição Global • Criptografia TLS • Firewall Ativo",
    metric: "14ms",
    metricLabel: "tempo de resposta",
    icon: Globe,
    status: "active",
    tags: ["Proteção contra Ataques", "Acesso Ultrarrápido"],
  },
  {
    id: "gateway",
    category: "Conectividade & APIs",
    name: "Camada de APIs & Integrações",
    spec: "Comunicação Segura • Controle de Acesso • Balanceamento",
    metric: "2.500",
    metricLabel: "requisições/s",
    icon: Layers,
    status: "active",
    tags: ["Carga Balanceada", "Integração entre Sistemas"],
  },
  {
    id: "services",
    category: "Processamento & Regras",
    name: "Microsserviços & Filas",
    spec: "Lógica de Negócio • Processamento Assíncrono • Alta Confiabilidade",
    metric: "0",
    metricLabel: "falhas de dados",
    icon: Cpu,
    status: "active",
    tags: ["Fluxo Contínuo", "Arquitetura Modular"],
  },
  {
    id: "persistence",
    category: "Dados & Infraestrutura",
    name: "Banco de Dados & Nuvem",
    spec: "Banco de Dados Resiliente • Cache em Memória • Múltiplas Zonas",
    metric: "99,9%",
    metricLabel: "disponibilidade",
    icon: Database,
    status: "active",
    tags: ["Recuperação Automática", "Transações Seguras"],
  },
];

interface HeroArchitectureProps {
  className?: string;
}

const HeroArchitecture = ({ className }: HeroArchitectureProps) => {
  const [activeNode, setActiveNode] = useState<string>("gateway");
  const prefersReduced = Boolean(useReducedMotion());

  return (
    <div
      role="region"
      aria-label="Diagrama de arquitetura de software e sistemas da EPM DEVTECH"
      className={cn(
        "relative w-full rounded-xl border border-border/80 bg-card/90 dark:bg-card/75 shadow-xl p-3 sm:p-5 md:p-6 overflow-hidden",
        className
      )}
    >
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-border/70 text-xs">
        {/* Terminal Window Dots & Breadcrumb */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>
          <span className="font-mono text-zinc-500 dark:text-zinc-400 select-none text-[11px] sm:text-xs">
            topologia://arquitetura-de-sistemas.producao
          </span>
        </div>

        {/* Live Cluster Metrics */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px] text-muted-foreground select-none">
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75",
                  !prefersReduced && "animate-ping"
                )}
              />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-foreground font-semibold">Sistema Online</span>
          </div>
          <span className="hidden sm:inline text-border">|</span>
          <div className="hidden sm:flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <Activity className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>2.500 Req/s Pico</span>
          </div>
          <span className="hidden md:inline text-border">|</span>
          <div className="hidden md:flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <ShieldCheck className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>99,9% Disponibilidade</span>
          </div>
        </div>
      </div>

      {/* Architecture Topography: Pipeline / Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        {ARCHITECTURE_NODES.map((node, index) => {
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
                "group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-lg border transition-all duration-200 cursor-pointer text-left",
                isSelected
                  ? "border-emerald-500/80 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.07] shadow-sm ring-1 ring-emerald-500/30"
                  : "border-border/80 bg-background/50 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-background/80"
              )}
            >
              {/* Header inside card */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {node.category}
                  </span>
                  <div
                    className={cn(
                      "p-1.5 rounded-md border transition-colors",
                      isSelected
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border/60 bg-muted/40 text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                </div>

                <h2 className="text-sm font-semibold text-foreground leading-snug mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {node.name}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {node.spec}
                </p>
              </div>

              {/* Footer inside card: Metric & Status */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between mt-auto">
                <div>
                  <span className="font-mono text-sm font-bold text-foreground">
                    {node.metric}
                  </span>
                  <span className="ml-1 text-[10px] text-muted-foreground">
                    {node.metricLabel}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3" />
                  <span>Ativo</span>
                </div>
              </div>

              {/* Directional flow indicator on desktop between cards */}
              {index < ARCHITECTURE_NODES.length - 1 && (
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

      {/* Selected Node Architecture Deep-Dive */}
      <div className="mt-4 pt-4 border-t border-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs bg-muted/30 dark:bg-muted/20 -mx-3 -mb-3 sm:-mx-5 sm:-mb-5 md:-mx-6 md:-mb-6 p-3 sm:p-4 rounded-b-xl">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-mono text-[11px] text-foreground font-semibold">
            Camada Selecionada:
          </span>
          <span className="text-muted-foreground">
            {ARCHITECTURE_NODES.find((n) => n.id === activeNode)?.name}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {ARCHITECTURE_NODES.find((n) => n.id === activeNode)?.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[10px] font-medium text-foreground/85"
            >
              {tag}
            </span>
          ))}
          <span className="inline-flex items-center rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            Escalabilidade Contínua
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroArchitecture;
