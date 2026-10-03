import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  /** Rota interna do React Router (quando fornecido, renderiza como Link) */
  to?: string;
  /** Link externo ou âncora (quando fornecido, renderiza como âncora <a>) */
  href?: string;
  /** Tipo de botão HTML (padrão: "button") */
  type?: "button" | "submit" | "reset";
  /** Variante visual de estilo */
  variant?: "primary" | "outline" | "ghost" | "secondary";
  /** Tamanho do botão */
  size?: "default" | "sm" | "lg" | "icon";
  /** Força do magnetismo da camada de superfície (padrão: 0.3) */
  strength?: number;
  /** Força do parallax do texto/conteúdo interno (padrão: 0.55) */
  textStrength?: number;
  /** Classes CSS adicionais */
  className?: string;
  /** Se o botão está desabilitado */
  disabled?: boolean;
  /** Handler de clique */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Atributo de acessibilidade */
  "aria-label"?: string;
  /** Target de links externos */
  target?: string;
  /** Rel de links externos */
  rel?: string;
  /** Identificador de teste */
  "data-testid"?: string;
  /** Elementos filhos */
  children: ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-brand text-on-brand font-semibold shadow-sm hover:shadow-md border-0 active:scale-[0.98]",
  outline:
    "border border-border-default bg-surface/90 text-primary font-medium hover:border-brand/40 hover:bg-surface-elevated shadow-xs",
  ghost:
    "bg-transparent text-primary hover:bg-surface-elevated font-medium",
  secondary:
    "bg-surface-elevated border border-border-default text-primary font-medium hover:bg-surface hover:border-brand/30 shadow-xs",
};

const sizeStyles: Record<string, string> = {
  default: "h-11 px-5 py-2.5 text-sm rounded-xl gap-2",
  sm: "h-9 px-4 py-2 text-xs rounded-lg gap-1.5",
  lg: "h-12 px-7 py-3 text-base rounded-xl gap-2.5",
  icon: "h-10 w-10 p-0 rounded-xl justify-center",
};

const fillerColorByVariant: Record<string, string> = {
  primary: "bg-emerald-300/40 dark:bg-emerald-300/30",
  outline: "bg-brand/15 dark:bg-brand/20",
  ghost: "bg-primary/10",
  secondary: "bg-brand/15 dark:bg-brand/20",
};

/**
 * MagneticButton
 * ──────────────
 * Componente corporativo reutilizável de botão magnético com física de parallax multi-camada
 * e snap-back elástico, inspirado na referência clássica da Codrops / Cuberto.
 *
 * Características:
 * - 3 camadas independentes (Hitbox, Superfície com translação moderada, Conteúdo com translação acentuada).
 * - Efeito de expansão do filler a partir do ponto de entrada do cursor.
 * - Desativação automática e sem custo em dispositivos sensíveis ao toque (touch).
 * - Suporte estrito a `prefers-reduced-motion` e anel de foco acessível (:focus-visible).
 */
export const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  (
    {
      to,
      href,
      type = "button",
      variant = "primary",
      size = "default",
      strength = 0.3,
      textStrength = 0.55,
      className,
      disabled,
      onClick,
      children,
      ...restProps
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const surfaceRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const fillerRef = useRef<HTMLSpanElement | null>(null);

    useImperativeHandle(ref, () => rootRef.current as HTMLElement);

    useEffect(() => {
      const rootEl = rootRef.current;
      const surfaceEl = surfaceRef.current;
      const contentEl = contentRef.current;
      const fillerEl = fillerRef.current;

      if (!rootEl || !surfaceEl || !contentEl || disabled) return;

      // 1. Checagem de acessibilidade e dispositivos touch
      const isTouch =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isTouch || prefersReducedMotion) {
        return;
      }

      // 2. Cria contexto GSAP isolado para descarte determinístico
      const ctx = gsap.context(() => {
        // QuickTo interpoladores para manipulação fluida e rápida a 60/120fps
        const setSurfaceX = gsap.quickTo(surfaceEl, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
        const setSurfaceY = gsap.quickTo(surfaceEl, "y", {
          duration: 0.35,
          ease: "power3.out",
        });
        const setContentX = gsap.quickTo(contentEl, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
        const setContentY = gsap.quickTo(contentEl, "y", {
          duration: 0.35,
          ease: "power3.out",
        });

        const handleMouseEnter = (e: MouseEvent) => {
          if (!fillerEl) return;
          const rect = rootEl.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          // Posiciona e expande o filler a partir do ponto de entrada do cursor
          gsap.set(fillerEl, {
            left: relX,
            top: relY,
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            opacity: 1,
          });

          const maxDim = Math.max(rect.width, rect.height) * 2.2;
          gsap.set(fillerEl, { width: maxDim, height: maxDim });

          gsap.to(fillerEl, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseMove = (e: MouseEvent) => {
          const rect = rootEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;

          // Aplica deslocamento relativo nas 2 camadas
          setSurfaceX(deltaX * strength);
          setSurfaceY(deltaY * strength);
          setContentX(deltaX * textStrength);
          setContentY(deltaY * textStrength);
        };

        const handleMouseLeave = () => {
          // Snap-back elástico suave ao retornar à posição de repouso
          gsap.to([surfaceEl, contentEl], {
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "elastic.out(1.1, 0.4)",
            overwrite: "auto",
          });

          if (fillerEl) {
            gsap.to(fillerEl, {
              opacity: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        rootEl.addEventListener("mouseenter", handleMouseEnter);
        rootEl.addEventListener("mousemove", handleMouseMove);
        rootEl.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          rootEl.removeEventListener("mouseenter", handleMouseEnter);
          rootEl.removeEventListener("mousemove", handleMouseMove);
          rootEl.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, rootEl);

      return () => {
        ctx.revert();
      };
    }, [disabled, strength, textStrength]);

    const surfaceClasses = cn(
      "relative inline-flex items-center justify-center overflow-hidden transition-colors select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      variantStyles[variant] || variantStyles.primary,
      sizeStyles[size] || sizeStyles.default,
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    );

    const innerContent = (
      <>
        {/* Camada de Superfície com Efeito de Preenchimento / Hover Filler */}
        <div
          ref={surfaceRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
        >
          <span
            ref={fillerRef}
            className={cn(
              "pointer-events-none absolute rounded-full opacity-0 will-change-transform",
              fillerColorByVariant[variant] || fillerColorByVariant.primary
            )}
          />
        </div>

        {/* Camada de Conteúdo (Texto + Ícone com Parallax Ampliado) */}
        <span
          ref={contentRef}
          className="relative z-10 flex items-center justify-center gap-[inherit] pointer-events-none will-change-transform"
        >
          {children}
        </span>
      </>
    );

    // ─── Renderização como Link Interno (React Router) ───
    if (to && !disabled) {
      return (
        <Link
          to={to}
          ref={(node) => {
            rootRef.current = node;
          }}
          className={cn("group inline-block no-underline", surfaceClasses)}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </Link>
      );
    }

    // ─── Renderização como Âncora / Link Externo ───
    if (href && !disabled) {
      return (
        <a
          href={href}
          ref={(node) => {
            rootRef.current = node;
          }}
          className={cn("group inline-block no-underline", surfaceClasses)}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </a>
      );
    }

    // ─── Renderização Padrão como Botão ───
    return (
      <button
        ref={(node) => {
          rootRef.current = node;
        }}
        type={type}
        disabled={disabled}
        className={cn("group", surfaceClasses)}
        onClick={onClick}
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {innerContent}
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
