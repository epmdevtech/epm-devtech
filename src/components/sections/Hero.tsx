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
      className="relative w-full bg-background pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 overflow-hidden"
    >
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          {/* ─── Coluna Esquerda: Narrativa & Conversão ─── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionConfig}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow contextual com ícone oficial da marca */}
            <div
              data-testid="hero-eyebrow"
              className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-muted select-none mb-4"
            >
              <BrandChipIcon size={15} className="shrink-0" />
              <span>ENGENHARIA DE SOFTWARE &amp; MODERNIZAÇÃO</span>
            </div>

            {/* Headline H1 única, comercial, madura e sem marketing exagerado */}
            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold text-text-primary tracking-tight leading-[1.12] [text-wrap:balance] mb-5"
            >
              Engenharia de software para construir, integrar e evoluir sistemas.
            </h1>

            {/* Subheadline factual em 2 linhas */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl [text-wrap:pretty] mb-8">
              Desenvolvemos sistemas corporativos, APIs escaláveis e integrações sob medida, além de modernizar aplicações legadas com foco em qualidade, estabilidade e evolução contínua.
            </p>

            {/* Ações (CTAs): Primário dominante + Secundário de soluções */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-6">
              <Button
                asChild
                className="h-12 px-7 rounded-md bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active font-semibold text-sm sm:text-base shadow-xs min-h-[44px] transition-colors duration-200"
              >
                <Link to="/contato" aria-label="Falar sobre meu projeto com a EPM DevTech">
                  Falar sobre meu projeto
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 px-6 rounded-md border-border-default text-text-primary hover:bg-surface-elevated font-medium text-sm sm:text-base min-h-[44px] transition-colors duration-200"
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

            {/* Linha discreta de autoridade factual (experiência comprovada nos setores) */}
            <div className="pt-2 flex items-start sm:items-center gap-2 text-xs text-text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-1 sm:mt-0" />
              <span>
                Experiência técnica em projetos de energia, indústria, educação, varejo e sistemas corporativos.
              </span>
            </div>
          </motion.div>

          {/* ─── Coluna Direita: Canvas de Engenharia de Software (Elemento Visual) ─── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-end"
            aria-hidden="true"
          >
            <div className="w-full max-w-lg lg:max-w-none rounded-xl border border-border-default bg-surface p-4 sm:p-6 shadow-xs select-none">
              {/* Barra superior do sistema */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 sm:pb-4 sm:mb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand" />
                  <span className="text-xs font-mono font-semibold text-text-primary tracking-wide uppercase">
                    Topologia de Arquitetura
                  </span>
                </div>
                <span className="text-[10px] sm:text-[10.5px] font-mono text-text-muted bg-surface-elevated px-2 py-0.5 rounded border border-border-subtle">
                  Stack de Engenharia
                </span>
              </div>

              {/* Camadas Técnicas da Arquitetura */}
              <div className="space-y-2 sm:space-y-2.5">
                {/* Camada 01: Client & Portais */}
                <div className="p-2.5 sm:p-3 rounded-lg border border-border-default bg-surface hover:border-accent-blue/40 transition-colors duration-200">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-accent-blue">01</span>
                    <span className="text-xs font-semibold text-text-primary">
                      Aplicações Web &amp; Portais
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      React
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      TypeScript
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
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
                    <span className="text-xs font-semibold text-text-primary">
                      APIs &amp; Back-end Escalável
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      Node.js
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      PHP / Laravel
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
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
                    <span className="text-xs font-semibold text-text-primary">
                      Barramento de Integração &amp; Eventos
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      RabbitMQ
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      Workers
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
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
                    <span className="text-xs font-semibold text-text-primary">
                      Persistência Transacional &amp; Nuvem
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      PostgreSQL
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      Redis
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      AWS
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border-subtle">
                      Docker
                    </span>
                  </div>
                </div>
              </div>

              {/* Rodapé técnico do canvas */}
              <div className="flex items-center justify-between pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-border-subtle text-[10px] sm:text-[10.5px] font-mono text-text-muted">
                <span>CI/CD · Testes Automatizados</span>
                <span>Segurança &amp; Observabilidade</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detalhe de transição minimalista: linha 1px em cor sólida com nó central esmeralda sólido da marca */}
        <div className="w-full pt-12 sm:pt-16 relative flex items-center justify-center" aria-hidden="true">
          <div data-testid="hero-divider-line" className="w-full border-t border-border" />
          <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
