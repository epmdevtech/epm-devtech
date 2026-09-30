import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Cpu, GitBranch, Terminal } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

/* ─────────────────────────────────────────────────────────────
   ANIMATED STAT & COUNT UP
───────────────────────────────────────────────────────────── */
const CountUp = ({
  isCounting,
  end,
  duration,
  decimals = 0,
}: {
  isCounting: boolean;
  end: number;
  duration: number;
  decimals?: number;
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isCounting) return;

    const formatVal = (v: number) => {
      if (decimals > 0) {
        return v.toFixed(decimals).replace(".", ",");
      }
      return String(Math.floor(v));
    };

    if (process.env.NODE_ENV === 'test') {
      if (spanRef.current) spanRef.current.textContent = formatVal(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const ratio = Math.min(progress / (duration * 1000), 1);
      const easeOut = 1 - (1 - ratio) * (1 - ratio);

      if (spanRef.current) {
        spanRef.current.textContent = formatVal(easeOut * end);
      }

      if (progress < duration * 1000) {
        animationFrame = requestAnimationFrame(step);
      } else {
        if (spanRef.current) spanRef.current.textContent = formatVal(end);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isCounting, end, duration, decimals]);

  return <span ref={spanRef}>0</span>;
};

const AnimatedStat = ({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1, margin: "0px" });

  return (
    <div ref={ref} className="flex flex-col-reverse justify-end gap-2 group" data-testid="animated-stat">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary flex items-baseline leading-none drop-shadow-sm">
        {prefix}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay }}
        >
          <CountUp isCounting={inView} end={value} duration={2} decimals={decimals} />
        </motion.span>
        {suffix}
      </div>
      <motion.div
        className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.12em] text-muted-foreground/80"
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.4 }}
      >
        {label}
      </motion.div>
    </div>
  );
};

const pillars = [
  {
    icon: Cpu,
    title: "Planejamento e Arquitetura",
    desc: "Projetamos sistemas modulares e desacoplados, preparados para suportar crescimento sem gerar gargalos de infraestrutura.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade e Testes",
    desc: "Código limpo, tipagem estrita e testes automatizados como padrão inviolável em cada entrega realizada.",
  },
  {
    icon: GitBranch,
    title: "Previsibilidade e Governança",
    desc: "Metodologia Spec-Driven Development (SDD), documentação técnica transparente e entregas consistentes dentro do cronograma.",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" className="relative py-24 bg-background overflow-hidden" ref={ref}>
      {/* top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Lado Esquerdo: História, Fundador e Posicionamento (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <SectionHeader
              align="left"
              tagline="Sobre a EPM DevTech"
              title="Engenharia de software com visão de negócio"
              subtitle="A EPM DevTech é uma software house dedicada a desenvolver e modernizar sistemas sob medida para empresas que buscam eficiência operacional, estabilidade e capacidade de evolução. Fundada e liderada tecnicamente por Elessandro Prestes Macedo, a empresa une mais de 9 anos de experiência técnica em projetos corporativos complexos à metodologia Spec-Driven Development (SDD), garantindo escopo claro, comunicação direta e entregas previsíveis a cada ciclo."
            />

            {/* Indicadores / Animated Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 pt-8 border-t border-border/50">
              <AnimatedStat value={9} prefix="+" label="Anos de Experiência" delay={0.1} />
              <AnimatedStat value={4} label="Contextos de Negócio" delay={0.2} />
              <AnimatedStat value={100} suffix="%" label="Engenharia Direta" delay={0.3} />
            </div>
          </motion.div>

          {/* ── Lado Direito: Pilares de Atuação Institucional (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Header Box do Fundador / Tech Lead */}
            <div className="p-6 rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="text-primary w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                  Liderança Técnica
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground tracking-tight mb-2">
                Compromisso com arquitetura sólida
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Todas as soluções são concebidas sob supervisão técnica direta, eliminando camadas desnecessárias e garantindo que cada decisão de software sirva aos objetivos estratégicos do seu negócio.
              </p>
            </div>

            {/* Pilares */}
            <div className="space-y-3">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + idx * 0.1 }}
                  className="p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <pillar.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
