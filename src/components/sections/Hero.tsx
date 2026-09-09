import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  useInView,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ShieldCheck } from "lucide-react";

/* ─────────────────────────────────────────────
   Hook: Detecção de dispositivo touch (coarse pointer)
───────────────────────────────────────────── */
function useTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const check = () => setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTouch;
}

/* ─────────────────────────────────────────────
   Contrato de coordenação de física e animação
───────────────────────────────────────────── */
interface AnimationItem {
  id: string;
  type: "letter" | "word";
  centerRef: React.MutableRefObject<{ x: number; y: number }>;
  motionValues: Record<string, MotionValue<number>>;
  radius: number;
  force?: number;
}

/* ─────────────────────────────────────────────
   MagneticLetter: Física magnética letra a letra
───────────────────────────────────────────── */
interface MagneticLetterProps {
  children: string;
  registar: (item: AnimationItem) => () => void;
  id: string;
  reducedMotion: boolean;
}

const MagneticLetter = ({
  children,
  registar,
  id,
  reducedMotion,
}: MagneticLetterProps) => {
  const letterRef = useRef<HTMLSpanElement>(null);
  const centerRef = useRef({ x: 0, y: 0 });

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);
  const springSkewX = useSpring(0, springConfig);
  const springScale = useSpring(1, springConfig);

  const motionValues = useMemo(
    () => ({
      x: springX,
      y: springY,
      skewX: springSkewX,
      scale: springScale,
    }),
    [springX, springY, springSkewX, springScale]
  );

  useEffect(() => {
    if (reducedMotion) return;
    const updateCache = () => {
      if (letterRef.current) {
        const rect = letterRef.current.getBoundingClientRect();
        centerRef.current = {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY,
        };
      }
    };
    updateCache();
    window.addEventListener("resize", updateCache);
    const unregister = registar({
      id,
      type: "letter",
      centerRef,
      motionValues,
      radius: 220,
      force: 0.35,
    });
    return () => {
      window.removeEventListener("resize", updateCache);
      unregister();
    };
  }, [id, registar, reducedMotion, motionValues]);

  if (reducedMotion) {
    return <span className="inline-block">{children === " " ? "\u00A0" : children}</span>;
  }

  return (
    <motion.span
      ref={letterRef}
      style={{
        x: motionValues.x,
        y: motionValues.y,
        skewX: motionValues.skewX,
        scale: motionValues.scale,
        display: "inline-block",
        willChange: "transform",
      }}
    >
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
};

/* ─────────────────────────────────────────────
   SubtitleWord: Palavra do subtítulo com revelação sequencial
   e iluminação reativa letra a letra ao passar o mouse.
   100% monocromático inicialmente (zero duas cores automáticas),
   sem layout shift (CLS = 0) e sem loop.
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   SubtitleWord: Palavra do subtítulo com revelação sequencial
   e destaque tipográfico reativo acompanhando o cursor no título e subtítulo
   (Conforme imagem do esboço Quordix: font-weight 400 a 700 e opacidade dinâmica)
───────────────────────────────────────────── */
interface SubtitleWordProps {
  word: string;
  id: string;
  wIdx: number;
  registar: (item: AnimationItem) => () => void;
  reducedMotion: boolean;
}

const SubtitleWord = ({
  word,
  id,
  wIdx,
  registar,
  reducedMotion,
}: SubtitleWordProps) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const centerRef = useRef({ x: 0, y: 0 });

  const springConfig = { stiffness: 90, damping: 18 };
  const springWeight = useSpring(400, springConfig);
  const springOpacity = useSpring(0.75, springConfig);

  const motionValues = useMemo(
    () => ({
      weight: springWeight,
      opacity: springOpacity,
    }),
    [springWeight, springOpacity]
  );

  useEffect(() => {
    if (reducedMotion) return;
    const updateCache = () => {
      if (wordRef.current) {
        const rect = wordRef.current.getBoundingClientRect();
        centerRef.current = {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY,
        };
      }
    };
    updateCache();
    window.addEventListener("resize", updateCache);
    const unregister = registar({
      id,
      type: "word",
      centerRef,
      motionValues,
      radius: 200,
    });
    return () => {
      window.removeEventListener("resize", updateCache);
      unregister();
    };
  }, [id, registar, reducedMotion, motionValues]);

  if (reducedMotion) {
    return (
      <span className="inline-block whitespace-nowrap mr-[0.25em] text-zinc-600 dark:text-zinc-400 font-normal">
        {word}
      </span>
    );
  }

  return (
    <motion.span
      ref={wordRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.36 + wIdx * 0.02,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        fontWeight: motionValues.weight,
        opacity: motionValues.opacity,
        willChange: "font-weight, opacity",
      }}
      className="inline-block whitespace-nowrap mr-[0.25em] text-zinc-900 dark:text-zinc-100 transition-colors duration-200"
    >
      {word}
    </motion.span>
  );
};

/* ─────────────────────────────────────────────
   Configuração dos anéis orbitais com a paleta oficial da marca:
   Gradiente EPM DEVTECH (logo-Photoroom.png):
   Ciano Elétrico (#00D4FF) -> Turquesa -> Verde Esmeralda (#10B981)
───────────────────────────────────────────── */
interface RingConfig {
  size: number;
  border: string;
  speed: number;
  satellite: boolean;
  satelliteColor?: string;
  satelliteGlow?: string;
  borderColor: string;
}

const RINGS: RingConfig[] = [
  {
    size: 36,
    border: "1px",
    speed: 60,
    satellite: true,
    satelliteColor: "#00D4FF", // Ciano elétrico (polo inicial do gradiente)
    satelliteGlow: "0 0 10px rgba(0, 212, 255, 0.85)",
    borderColor: "rgba(0, 212, 255, 0.14)",
  },
  {
    size: 56,
    border: "1px",
    speed: -80,
    satellite: false,
    borderColor: "rgba(161, 161, 170, 0.08)",
  },
  {
    size: 86,
    border: "1.5px",
    speed: 120,
    satellite: true,
    satelliteColor: "#10B981", // Verde esmeralda primário (polo final do gradiente)
    satelliteGlow: "0 0 12px rgba(16, 185, 129, 0.90)",
    borderColor: "rgba(16, 185, 129, 0.22)",
  },
  {
    size: 120,
    border: "1px",
    speed: -150,
    satellite: true,
    satelliteColor: "#38bdf8", // Azul celeste intermediário
    satelliteGlow: "0 0 8px rgba(56, 189, 248, 0.65)",
    borderColor: "rgba(161, 161, 170, 0.06)",
  },
];

const TITLE_LINE_1 = ["Software", "sob", "medida", "construído"];
const TITLE_LINE_2 = ["para", "escalar", "o", "seu", "negócio."];

const SUBTITLE =
  "Da concepção à infraestrutura: desenvolvemos sistemas web, APIs resilientes e arquiteturas de alta performance preparadas para acompanhar o crescimento da sua empresa.";
const SUBTITLE_WORDS = SUBTITLE.split(" ");

/* ─────────────────────────────────────────────
   Componente Hero Principal
───────────────────────────────────────────── */
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const prefersReduced = Boolean(useReducedMotion());
  const isTouch = useTouch();

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const itemsRef = useRef<Map<string, AnimationItem>>(new Map());

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
    mouseY.set(e.pageY);
  };
  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      mouseX.set(e.touches[0].pageX);
      mouseY.set(e.touches[0].pageY);
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      mouseX.set(e.touches[0].pageX);
      mouseY.set(e.touches[0].pageY);
    }
  };
  const handleTouchEnd = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const registerItem = useCallback((item: AnimationItem) => {
    itemsRef.current.set(item.id, item);
    return () => {
      itemsRef.current.delete(item.id);
    };
  }, []);

  // useScroll global baseado na janela elimina avisos de non-static position
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 120]);
  const opacityFade = useTransform(scrollY, [0, 350], [1, 0]);

  useAnimationFrame(() => {
    if (!isInView || prefersReduced) return;

    const currentMouseX = mouseX.get();
    const currentMouseY = mouseY.get();
    const isInteracting = currentMouseX !== -1000;

    const mx =
      isTouch && !isInteracting
        ? (containerRef.current?.offsetWidth || 0) / 2
        : currentMouseX;
    const my =
      isTouch && !isInteracting
        ? (containerRef.current?.getBoundingClientRect().top || 0) +
          window.innerHeight / 2 +
          window.scrollY
        : currentMouseY;

    const yOffset = yText.get();

    itemsRef.current.forEach((item) => {
      if (!item.centerRef.current.x) return;
      const dx = mx - item.centerRef.current.x;
      const dy = my - (item.centerRef.current.y + yOffset);

      if (item.type === "letter") {
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < item.radius && isInteracting) {
          const power = (item.radius - distance) / item.radius;
          const force = item.force || 0.35;
          item.motionValues.x.set(dx * power * force);
          item.motionValues.y.set(dy * power * force);
          item.motionValues.skewX.set(dx * power * 0.1);
          item.motionValues.scale.set(1 + power * 0.15);
        } else {
          item.motionValues.x.set(0);
          item.motionValues.y.set(0);
          item.motionValues.skewX.set(0);
          item.motionValues.scale.set(1);
        }
      } else if (item.type === "word") {
        if (isInteracting) {
          // Escala a distância vertical por 0.35 para que o movimento horizontal do mouse
          // sobre o título projete dinamicamente o destaque nas palavras do subtítulo abaixo!
          const scaledDy = dy * 0.35;
          const dist = Math.sqrt(dx * dx + scaledDy * scaledDy);
          const radius = item.radius || 200;

          if (dist < radius) {
            const power = (radius - dist) / radius;
            // Conforme imagem do esboço: palavras sob/perto do cursor ganham peso destacado (até 700) e opacidade total (1.0)
            item.motionValues.weight.set(400 + power * 300);
            item.motionValues.opacity.set(0.45 + power * 0.55);
          } else {
            // Palavras distantes do cursor ficam em opacidade atenuada (0.45) e peso normal (400)
            item.motionValues.weight.set(400);
            item.motionValues.opacity.set(0.45);
          }
        } else {
          // Estado ocioso: todas as palavras uniformes, confortáveis para leitura
          item.motionValues.weight.set(400);
          item.motionValues.opacity.set(0.75);
        }
      }
    });
  });

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        touchAction: "pan-y",
        contain: "layout paint",
      }}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background noise pt-20 pb-12"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03] pointer-events-none" />

      {/* Background orbit rings & Glow centralizado no Título (não no meio da página, conforme esboço) */}
      <div
        aria-hidden="true"
        className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center pointer-events-none"
      >
        {/* Glow de fundo com o gradiente oficial da marca (logo-Photoroom.png: Ciano Elétrico -> Turquesa -> Verde Esmeralda) */}
        <div className="hero-brand-aura absolute w-[72vh] h-[55vh] rounded-full blur-[64px] dark:blur-[76px] opacity-80 dark:opacity-75 transform-gpu pointer-events-none" />

        {RINGS.map((ring, i) => (
          <div
            key={i}
            className="hero-orbit absolute rounded-full flex items-center justify-center pointer-events-none"
            style={{
              width: `${ring.size}vh`,
              height: `${ring.size}vh`,
              borderWidth: ring.border,
              borderStyle: "solid",
              borderColor: ring.borderColor,
              animation: `${ring.speed > 0 ? "hero-orbit" : "hero-orbit-rev"} ${Math.abs(ring.speed)}s linear infinite`,
            }}
          >
            {ring.satellite && (
              <div
                className="absolute top-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{
                  background: ring.satelliteColor || "rgba(161, 161, 170, 0.6)",
                  boxShadow: ring.satelliteGlow || "none",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content — parallax fades on scroll */}
      <motion.div
        style={{
          y: prefersReduced ? 0 : yText,
          opacity: prefersReduced ? 1 : opacityFade,
        }}
        className="container relative z-10 px-6 py-20 will-change-transform flex flex-col items-center text-center max-w-6xl mx-auto"
      >
        {/* Tagline superior: Ponto único de cor na badge com entrada suave */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={prefersReduced ? false : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: prefersReduced ? 0 : 0.05,
            ease: "easeOut",
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full uppercase tracking-wider font-semibold text-xs bg-emerald-50 border border-emerald-200/70 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800/60 dark:text-emerald-400 shadow-sm"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"
            aria-hidden="true"
          />
          <span>Engenharia de Software & Modernização</span>
        </motion.div>

        {/* Headline: Rigorosamente 100% monocromático, magnético e responsivo com entrada escalonada letra a letra */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold tracking-tight leading-[1.18] mb-8 text-zinc-900 dark:text-white select-none">
          <span className="block mb-2">
            {(() => {
              let charCount = 0;
              return TITLE_LINE_1.map((word, wIdx) => (
                <React.Fragment key={`w1-${wIdx}`}>
                  <span className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char) => {
                      const idx = charCount++;
                      return (
                        <motion.span
                          key={`c1-${idx}`}
                          initial={prefersReduced ? false : { y: "100%", opacity: 0 }}
                          animate={prefersReduced ? false : { y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.7,
                            delay: prefersReduced ? 0 : 0.1 + idx * 0.035,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="inline-block"
                        >
                          <MagneticLetter
                            id={`char-1-${idx}`}
                            registar={registerItem}
                            reducedMotion={prefersReduced}
                          >
                            {char}
                          </MagneticLetter>
                        </motion.span>
                      );
                    })}
                  </span>
                  {wIdx < TITLE_LINE_1.length - 1 && " "}
                </React.Fragment>
              ));
            })()}
          </span>
          {" "}
          <span className="block">
            {(() => {
              let charCount = 0;
              return TITLE_LINE_2.map((word, wIdx) => (
                <React.Fragment key={`w2-${wIdx}`}>
                  <span className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char) => {
                      const idx = charCount++;
                      return (
                        <motion.span
                          key={`c2-${idx}`}
                          initial={prefersReduced ? false : { y: "100%", opacity: 0 }}
                          animate={prefersReduced ? false : { y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.7,
                            delay: prefersReduced ? 0 : 0.66 + idx * 0.022,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="inline-block"
                        >
                          <MagneticLetter
                            id={`char-2-${idx}`}
                            registar={registerItem}
                            reducedMotion={prefersReduced}
                          >
                            {char}
                          </MagneticLetter>
                        </motion.span>
                      );
                    })}
                  </span>
                  {wIdx < TITLE_LINE_2.length - 1 && " "}
                </React.Fragment>
              ));
            })()}
          </span>
        </h1>

        {/* Subtitle: Fluido, estável (sem salto de linhas), entrada sequencial e destaque tipográfico reativo acompanhando o mouse no título e subtítulo */}
        <p className="text-base sm:text-lg leading-[1.75] text-zinc-600 dark:text-zinc-400 max-w-4xl mx-auto mb-10 text-center select-none min-h-[4rem]">
          {SUBTITLE_WORDS.map((word, i) => (
            <React.Fragment key={`sub-${i}`}>
              <SubtitleWord
                word={word}
                id={`word-${i}`}
                wIdx={i}
                registar={registerItem}
                reducedMotion={prefersReduced}
              />
              {i < SUBTITLE_WORDS.length - 1 && " "}
            </React.Fragment>
          ))}
        </p>

        {/* Microprova Social: Ponto de autoridade e credenciais técnicas com fade sequencial */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={prefersReduced ? false : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: prefersReduced ? 0 : 1.8,
            ease: "easeOut",
          }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-muted-foreground/80 pt-2"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-primary" />
            +9 anos de experiência em sistemas críticos
          </span>
          <span className="hidden sm:inline text-muted-foreground/40">•</span>
          <span>Arquiteturas cloud-native</span>
          <span className="text-muted-foreground/40">•</span>
          <span>APIs resilientes</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Código limpo</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
