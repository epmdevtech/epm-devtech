import { Link } from "react-router-dom";
import { Cpu, Code2, Database, RefreshCw, CheckCircle2, ShieldCheck, Activity } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * HomeServicesBento
 * ─────────────────
 * Bento Grid assimétrico de 12 colunas para a seção de Serviços da Home.
 * Substitui o grid uniforme de 4 cards por uma composição técnica e editorial
 * com pesos visuais contrastantes, micro-artefatos técnicos e conformidade estrita
 * aos tokens semânticos em 2 camadas (Dark/Light/System) e WCAG AAA/AA.
 */
export const HomeServicesBento = () => {
  const bentoRef = useScrollReveal<HTMLDivElement>({
    selector: ":scope > a",
    stagger: 0.12,
    y: 30,
    duration: 0.7,
  });

  return (
    <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 mb-8">
      {/* ─── Card 1 (Destaque Principal: md:col-span-7) — APIs e Back-end ─── */}
      <Link
        to="/services"
        className="group relative p-6 sm:p-7 rounded-xl border border-border-default bg-surface shadow-sm hover:border-accent-violet/50 hover:bg-surface-elevated transition-all duration-300 flex flex-col justify-between md:col-span-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring overflow-hidden"
        aria-label="APIs e back-end: Sistemas estáveis para processar grande volume de transações e regras complexas, sem lentidão ou quedas em momentos de pico."
      >
        {/* Glow sutil de fundo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-violet/5 blur-3xl group-hover:bg-accent-violet/15 transition-all duration-500"
        />

        <div>
          {/* Cabeçalho do Card */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet group-hover:scale-105 transition-transform duration-200">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-accent-violet bg-accent-violet/10 border border-accent-violet/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse" />
              Alta Concorrência
            </span>
          </div>

          <h3 className="font-semibold text-primary text-[clamp(1.25rem,1.8vw,1.5rem)] tracking-[-0.025em] leading-[1.2] mb-2 group-hover:text-accent-violet transition-colors">
            APIs e back-end de alta performance
          </h3>
          <p className="text-[clamp(0.925rem,1vw,1rem)] text-secondary leading-[1.6] tracking-[-0.01em] max-w-[65ch] mb-6">
            Sistemas estáveis para processar grande volume de transações e regras complexas, sem lentidão ou quedas em momentos de pico.
          </p>

          {/* Mock Visual Técnico — Terminal / Pipeline HTTP */}
          <div
            aria-hidden="true"
            className="rounded-lg border border-border-subtle bg-base/80 p-3.5 sm:p-4 font-mono text-xs text-secondary space-y-2.5 transition-colors group-hover:border-accent-violet/30"
          >
            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-danger/70 inline-block" />
                <span className="w-2 h-2 rounded-full bg-warning/70 inline-block" />
                <span className="w-2 h-2 rounded-full bg-success/70 inline-block" />
                <span className="ml-1 text-muted">http-engine • v2.4</span>
              </div>
              <span className="text-success font-semibold flex items-center gap-1">
                <Activity className="w-3 h-3" />
                18ms latência
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="px-1.5 py-0.5 rounded bg-accent-violet/15 text-accent-violet text-[10px] font-bold">
                POST
              </span>
              <span className="text-primary font-medium text-[11.5px] truncate">
                /api/v2/transactions/settlement
              </span>
              <span className="ml-auto text-success text-[11px] font-bold">200 OK</span>
            </div>

            <div className="bg-surface/90 rounded p-2.5 border border-border-subtle/50 text-[11px] text-muted space-y-1">
              <div><span className="text-accent-violet">throughput:</span> <span className="text-primary font-semibold">2.500+ RPS</span></div>
              <div><span className="text-accent-violet">idempotency:</span> <span className="text-primary">true (Redis cluster)</span></div>
              <div><span className="text-accent-violet">zero_loss:</span> <span className="text-success font-semibold">true (RabbitMQ ACK)</span></div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-border-subtle/70 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.04em] text-muted group-hover:text-primary transition-colors">
          <span>VER DETALHES</span>
        </div>
      </Link>

      {/* ─── Card 2 (md:col-span-5) — Sistemas e Portais ─── */}
      <Link
        to="/services"
        className="group relative p-6 sm:p-7 rounded-xl border border-border-default bg-surface shadow-sm hover:border-accent-blue/50 hover:bg-surface-elevated transition-all duration-300 flex flex-col justify-between md:col-span-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring overflow-hidden"
        aria-label="Sistemas web e plataformas internas: Substitua planilhas confusas e controles manuais por sistemas web intuitivos, rápidos e adaptados à rotina da sua equipe."
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-blue/5 blur-3xl group-hover:bg-accent-blue/15 transition-all duration-500"
        />

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue group-hover:scale-105 transition-transform duration-200">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Clean Arch
            </span>
          </div>

          <h3 className="font-semibold text-primary text-[clamp(1.25rem,1.8vw,1.5rem)] tracking-[-0.025em] leading-[1.2] mb-2 group-hover:text-accent-blue transition-colors">
            Sistemas web e plataformas internas
          </h3>
          <p className="text-[clamp(0.925rem,1vw,1rem)] text-secondary leading-[1.6] tracking-[-0.01em] max-w-[65ch] mb-6">
            Substitua planilhas confusas e controles manuais por sistemas web intuitivos, rápidos e adaptados à rotina da sua equipe.
          </p>

          {/* Mock Visual Técnico — Stack & UI Preview */}
          <div
            aria-hidden="true"
            className="rounded-lg border border-border-subtle bg-base/80 p-3.5 sm:p-4 space-y-3 transition-colors group-hover:border-accent-blue/30"
          >
            <div className="text-[11px] font-mono text-muted uppercase tracking-wider">Stack de Engenharia</div>
            <div className="flex flex-wrap gap-1.5">
              {["React 18", "TypeScript", "Tailwind CSS", "Vite", "Zod"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-surface border border-border-subtle text-primary font-mono text-[11px] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[11px]">
              <span className="text-secondary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue" />
                100% Type-Safe & Acessível
              </span>
              <span className="font-mono text-muted">SPA Multi-rota</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-border-subtle/70 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.04em] text-muted group-hover:text-primary transition-colors">
          <span>VER DETALHES</span>
        </div>
      </Link>

      {/* ─── Card 3 (md:col-span-5) — Integrações de Dados ─── */}
      <Link
        to="/services"
        className="group relative p-6 sm:p-7 rounded-xl border border-border-default bg-surface shadow-sm hover:border-accent-amber/50 hover:bg-surface-elevated transition-all duration-300 flex flex-col justify-between md:col-span-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring overflow-hidden"
        aria-label="Integrações entre sistemas: Elimine o retrabalho de redigitar dados conectando seu ERP, CRM e ferramentas externas de forma confiável e sem perda de informações."
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-amber/5 blur-3xl group-hover:bg-accent-amber/15 transition-all duration-500"
        />

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber group-hover:scale-105 transition-transform duration-200">
              <Database className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-accent-amber bg-accent-amber/10 border border-accent-amber/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Sync Ativo
            </span>
          </div>

          <h3 className="font-semibold text-primary text-[clamp(1.25rem,1.8vw,1.5rem)] tracking-[-0.025em] leading-[1.2] mb-2 group-hover:text-accent-amber transition-colors">
            Integrações entre sistemas
          </h3>
          <p className="text-[clamp(0.925rem,1vw,1rem)] text-secondary leading-[1.6] tracking-[-0.01em] max-w-[65ch] mb-6">
            Elimine o retrabalho de redigitar dados conectando seu ERP, CRM e ferramentas externas de forma confiável e sem perda de informações.
          </p>

          {/* Mock Visual Técnico — Fluxo de Conectores & Webhooks */}
          <div
            aria-hidden="true"
            className="rounded-lg border border-border-subtle bg-base/80 p-3.5 sm:p-4 space-y-2.5 transition-colors group-hover:border-accent-amber/30"
          >
            <div className="text-[11px] font-mono text-muted uppercase tracking-wider">Topologia de Conexão</div>
            <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
              <span className="px-2 py-1 rounded bg-surface border border-border-subtle text-primary truncate max-w-[85px]">
                ERP Legado
              </span>
              <span className="text-accent-amber font-bold">➔</span>
              <span className="px-2 py-1 rounded bg-accent-amber/10 border border-accent-amber/30 text-accent-amber font-semibold truncate max-w-[90px]">
                Event Hub
              </span>
              <span className="text-accent-amber font-bold">➔</span>
              <span className="px-2 py-1 rounded bg-surface border border-border-subtle text-primary truncate max-w-[85px]">
                CRMs / APIs
              </span>
            </div>

            <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[11px]">
              <span className="text-secondary">Fila com Retry & Dead-Letter</span>
              <span className="font-mono text-success font-semibold">99.9% Confiabilidade</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-border-subtle/70 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.04em] text-muted group-hover:text-primary transition-colors">
          <span>VER DETALHES</span>
        </div>
      </Link>

      {/* ─── Card 4 (md:col-span-7) — Modernização de Legados ─── */}
      <Link
        to="/services"
        className="group relative p-6 sm:p-7 rounded-xl border border-border-default bg-surface shadow-sm hover:border-brand/50 hover:bg-surface-elevated transition-all duration-300 flex flex-col justify-between md:col-span-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring overflow-hidden"
        aria-label="Modernização de sistemas legados: Atualize sistemas antigos que travam o crescimento do seu negócio de forma gradual, sem colocar em risco a operação diária."
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand/5 blur-3xl group-hover:bg-brand/15 transition-all duration-500"
        />

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-brand-subtle border border-brand/20 flex items-center justify-center text-text-brand group-hover:scale-105 transition-transform duration-200">
              <RefreshCw className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-text-brand bg-brand-subtle border border-brand/20 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Zero Downtime
            </span>
          </div>

          <h3 className="font-semibold text-primary text-[clamp(1.25rem,1.8vw,1.5rem)] tracking-[-0.025em] leading-[1.2] mb-2 group-hover:text-text-brand transition-colors">
            Modernização de sistemas legados
          </h3>
          <p className="text-[clamp(0.925rem,1vw,1rem)] text-secondary leading-[1.6] tracking-[-0.01em] max-w-[65ch] mb-6">
            Atualize sistemas antigos que travam o crescimento do seu negócio de forma gradual, sem colocar em risco a operação diária.
          </p>

          {/* Mock Visual Técnico — Transição de Conceito Arquitetural */}
          <div
            aria-hidden="true"
            className="rounded-lg border border-border-subtle bg-base/80 p-3.5 sm:p-4 space-y-2.5 transition-colors group-hover:border-brand/30"
          >
            <div className="text-[11px] font-mono text-muted uppercase tracking-wider">Estratégia de Transição Incremental</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-surface border border-border-subtle">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-1">
                  <span>Antes: Monólito</span>
                  <span className="w-2 h-2 rounded-full bg-danger/70 inline-block" />
                </div>
                <div className="text-secondary text-[11.5px] leading-snug">
                  Monólito antigo: código difícil de manter, risco alto de quebra a cada alteração.
                </div>
              </div>

              <div className="p-2.5 rounded bg-brand-subtle/40 border border-brand/25">
                <div className="flex items-center justify-between text-[11px] font-mono text-text-brand font-semibold mb-1">
                  <span>Depois: Desacoplado</span>
                  <span className="w-2 h-2 rounded-full bg-success inline-block" />
                </div>
                <div className="text-primary text-[11.5px] leading-snug">
                  Módulos desacoplados: testes automatizados, evolução rápida e deploy sem parada.
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[11px]">
              <span className="text-secondary">Padrão Strangler Fig aplicado</span>
              <span className="font-mono text-text-brand font-semibold">Evolução Segura</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-border-subtle/70 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.04em] text-muted group-hover:text-primary transition-colors">
          <span>VER DETALHES</span>
        </div>
      </Link>
    </div>
  );
};

export default HomeServicesBento;
