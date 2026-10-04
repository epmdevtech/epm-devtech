import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ConstellationPractice } from "@/data/constellationPractices";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Chanfro técnico de 45° no canto superior direito (nativo com fallback em clip-path). */
const BEVEL_NATIVE = "[corner-top-right-shape:bevel]";
const BEVEL_FALLBACK_OUTER =
  "supports-[not_(corner-top-right-shape:bevel)]:[clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,0_100%)]";
// c' = c + √2 − 2 ≈ 13.4px mantém o traço de 1px uniforme na diagonal
const BEVEL_FALLBACK_INNER =
  "supports-[not_(corner-top-right-shape:bevel)]:[clip-path:polygon(0_0,calc(100%-13.4px)_0,100%_13.4px,100%_100%,0_100%)]";

const fullMotion: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, y: 3, scale: 0.99, transition: { duration: 0.12, ease: "easeIn" } },
};

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export interface PracticeCardProps {
  practice: ConstellationPractice;
  titleId: string;
  descriptionId: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onPointerDown: () => void;
  onEscapeKeyDown: () => void;
  onInteractOutside: (event: Event) => void;
}

const PracticeCard = ({
  practice,
  titleId,
  descriptionId,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onEscapeKeyDown,
  onInteractOutside,
}: PracticeCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PopoverPrimitive.Portal forceMount>
      <PopoverPrimitive.Content
        forceMount
        asChild
        side="top"
        align="center"
        sideOffset={10}
        collisionPadding={12}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={onEscapeKeyDown}
        onInteractOutside={onInteractOutside}
      >
        <motion.div
          data-testid="practice-card"
          variants={prefersReducedMotion ? reducedMotionVariants : fullMotion}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ transformOrigin: "var(--radix-popover-content-transform-origin)" }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerDown={onPointerDown}
          className={cn(
            "z-50 w-[min(20rem,calc(100vw-2rem))] p-px outline-none",
            "bg-emerald-400/30 rounded-lg rounded-tr-[14px]",
            BEVEL_NATIVE,
            BEVEL_FALLBACK_OUTER,
          )}
        >
          <div
            className={cn(
              "rounded-[calc(0.5rem-1px)] rounded-tr-[13px] bg-zinc-950/90 p-4 backdrop-blur-md",
              BEVEL_NATIVE,
              BEVEL_FALLBACK_INNER,
            )}
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
              {practice.category}
            </p>
            <h3 id={titleId} className="mt-2 text-base font-semibold leading-snug text-zinc-50">
              {practice.title}
            </h3>
            <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-zinc-300">
              {practice.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologias e conceitos">
              {practice.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-zinc-700 bg-zinc-900/70 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

export default PracticeCard;
