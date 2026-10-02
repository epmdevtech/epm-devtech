import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BrandChipIcon from "@/components/ui/BrandChipIcon";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = {
    duration: shouldReduceMotion ? 0 : 0.45,
    ease: "easeOut",
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative w-full min-h-[85vh] flex flex-col justify-center bg-base bg-gradient-to-b from-transparent to-surface/40 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
    >
      {/* Glow/spotlight suave em background para profundidade técnica */}
      <div
        className="absolute top-1/4 right-0 lg:right-1/6 w-96 h-96 bg-brand/5 blur-3xl rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          {/* ─── Coluna Esquerda: Narrativa & Conversão ─── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionConfig}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow contextual refinado com ícone oficial da marca */}
            <div
              data-testid="hero-eyebrow"
              className="inline-flex items-center gap-2 border border-brand/20 bg-brand/5 text-text-brand font-mono text-xs px-3 py-1 rounded-full select-none mb-6"
            >
              <BrandChipIcon size={14} className="shrink-0" />
              <span>ENGENHARIA DE SOFTWARE &amp; MODERNIZAÇÃO</span>
            </div>

            {/* Headline H1 única, comercial, madura e de forte impacto */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.12] [text-wrap:balance] mb-6"
            >
              Engenharia de software para construir, integrar e evoluir sistemas.
            </h1>

            {/* Subheadline factual com contraste nítido */}
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-xl [text-wrap:pretty] mb-8">
              Desenvolvemos sistemas corporativos, APIs escaláveis e integrações sob medida, além de modernizar aplicações legadas com foco em qualidade, estabilidade e evolução contínua.
            </p>

            {/* Ações (CTAs): Primário dominante com glow sutil + Secundário com contorno discreto */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                className="h-12 px-7 rounded-md bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active font-semibold text-sm sm:text-base shadow-sm min-h-[44px] transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link to="/contato" aria-label="Falar sobre meu projeto com a EPM DevTech">
                  Falar sobre meu projeto
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 px-6 rounded-md border-border-default bg-surface/50 hover:bg-surface-elevated text-secondary hover:text-primary font-medium text-sm sm:text-base min-h-[44px] transition-colors duration-200"
              >
                <a
                  href="#servicos"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("servicos");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  aria-label="Ver soluções da EPM DevTech"
                >
                  Ver soluções
                </a>
              </Button>
            </div>

            {/* Micro Social Proof: Indicador de status operacional ativo em tempo real */}
            <div className="flex items-center gap-2.5 text-xs text-muted">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span>
                Sistemas em produção nos setores de energia, indústria, logística e corporativo.
              </span>
            </div>
          </motion.div>

          {/* ─── Coluna Direita: Janela Dev "Sistema & Arquitetura Ativa" ─── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-end"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Efeito de iluminação suave atrás do painel */}
              <div
                className="absolute -top-10 -right-10 w-64 h-64 bg-brand/5 blur-3xl rounded-full pointer-events-none"
                aria-hidden="true"
              />

              {/* Card Terminal Dev */}
              <div className="relative rounded-xl border border-border-default/80 bg-surface/80 backdrop-blur-md p-4 sm:p-5 shadow-lg select-none">
                {/* Cabeçalho de janela dev */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 sm:pb-4 sm:mb-4 border-b border-border-subtle">
                  {/* Controles estilo macOS / Linux */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border-strong/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border-strong/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border-strong/70" />
                  </div>

                  {/* Nome do arquivo monospace */}
                  <span className="text-xs font-mono font-medium text-secondary">
                    architecture.overview.ts
                  </span>

                  {/* Status badge HEALTHY */}
                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-text-brand bg-brand-subtle px-2 py-0.5 rounded border border-brand/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    <span>HEALTHY / 99.9% uptime</span>
                  </div>
                </div>

                {/* Camadas Técnicas Conectadas da Arquitetura */}
                <div className="space-y-2 sm:space-y-2.5">
                  {/* Camada 01: Client & Portais */}
                  <div className="p-2.5 sm:p-3 rounded-lg border border-border-default bg-surface hover:border-accent-blue/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-accent-blue">01</span>
                      <span className="text-xs font-semibold text-primary">
                        Aplicações Web &amp; Portais
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        React
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        TypeScript
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        Tailwind CSS
                      </span>
                    </div>
                  </div>

                  {/* Conector Vertical 1 */}
                  <div className="flex items-center justify-center -my-0.5 sm:-my-1">
                    <div className="w-px h-2 sm:h-2.5 bg-border-default" />
                  </div>

                  {/* Camada 02: Core & Back-end */}
                  <div className="p-2.5 sm:p-3 rounded-lg border border-border-default bg-surface hover:border-accent-violet/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-accent-violet">02</span>
                      <span className="text-xs font-semibold text-primary">
                        APIs &amp; Back-end Escalável
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        Node.js
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        PHP / Laravel
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        APIs REST
                      </span>
                    </div>
                  </div>

                  {/* Conector Vertical 2 */}
                  <div className="flex items-center justify-center -my-0.5 sm:-my-1">
                    <div className="w-px h-2 sm:h-2.5 bg-border-default" />
                  </div>

                  {/* Camada 03: Integrações & Mensageria */}
                  <div className="p-2.5 sm:p-3 rounded-lg border border-border-default bg-surface hover:border-accent-amber/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-accent-amber">03</span>
                      <span className="text-xs font-semibold text-primary">
                        Barramento de Integração &amp; Eventos
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        RabbitMQ
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        Workers
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        Eventos
                      </span>
                    </div>
                  </div>

                  {/* Conector Vertical 3 */}
                  <div className="flex items-center justify-center -my-0.5 sm:-my-1">
                    <div className="w-px h-2 sm:h-2.5 bg-border-default" />
                  </div>

                  {/* Camada 04: Dados & Nuvem */}
                  <div className="p-2.5 sm:p-3 rounded-lg border border-border-default bg-surface hover:border-brand/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-brand">04</span>
                      <span className="text-xs font-semibold text-primary">
                        Persistência Transacional &amp; Nuvem
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        PostgreSQL
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        Redis
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        AWS
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-secondary border border-border-subtle">
                        Docker
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rodapé técnico da janela */}
                <div className="flex items-center justify-between pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-border-subtle text-[10px] sm:text-[10.5px] font-mono text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    CI/CD · Testes Automatizados
                  </span>
                  <span>Segurança &amp; Observabilidade</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
