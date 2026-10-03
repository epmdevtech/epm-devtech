import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEventHandler,
} from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Intensidade do deslocamento magnético (0 a 1). Padrão: 0.15 */
  strength?: number;
  /** Margem de proximidade em pixels além das bordas do botão. Padrão: 20 */
  proximityMargin?: number;
  /** Deslocamento máximo permitido no eixo X em pixels. Padrão: 12 */
  maxTravelX?: number;
  /** Deslocamento máximo permitido no eixo Y em pixels. Padrão: 8 */
  maxTravelY?: number;
  /** Deprecated: Raio de captura proporcional */
  triggerRadius?: number;
  /** Variante visual de cor e acabamento */
  variant?: "primary" | "chamfer" | "chamfer-outline" | "outline" | "ghost" | "secondary";
  /** Rota interna do React Router (renderiza como Link quando presente) */
  to?: string;
  /** Link externo ou âncora (renderiza como <a> quando presente) */
  href?: string;
  /** Tamanho do botão */
  size?: "default" | "sm" | "md" | "lg" | "icon";
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  target?: string;
  rel?: string;
}

export const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  function MagneticButton(
    {
      children,
      className,
      strength = 0.15,
      proximityMargin = 20,
      maxTravelX = 12,
      maxTravelY = 8,
      triggerRadius,
      variant = "primary",
      size = "default",
      type = "button",
      to,
      href,
      target,
      rel,
      disabled,
      onHoverStart,
      onHoverEnd,
      onClick,
      ...props
    },
    ref
  ) {
    // Container fixo de referência geométrica: não recebe transform para evitar realimentação no cálculo
    const areaRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLElement | null>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const innerRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => btnRef.current as HTMLElement);

    const cbRef = useRef({ onHoverStart, onHoverEnd });
    cbRef.current = { onHoverStart, onHoverEnd };

    useEffect(() => {
      const area = areaRef.current;
      const btn = btnRef.current;
      const text = textRef.current;
      const inner = innerRef.current;
      if (!area || !btn || !text || !inner || disabled) return;

      // Desativação em touch ou com "prefers-reduced-motion" ativo
      const isClient = typeof window !== "undefined" && typeof window.matchMedia === "function";
      const canHover = isClient && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduceMotion = isClient && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!canHover || reduceMotion) return;

      let isHovering = false;

      // Isolamento GSAP para controle de ciclo de vida e cleanup sem memory leak
      const ctx = gsap.context(() => {
        const opts = { duration: 0.38, ease: "power2.out" };
        const btnX = gsap.quickTo(btn, "x", opts);
        const btnY = gsap.quickTo(btn, "y", opts);
        const textX = gsap.quickTo(text, "x", opts);
        const textY = gsap.quickTo(text, "y", opts);

        // Efeito de transição vertical do texto característico da Codrops
        const swapText = (dir: 1 | -1) => {
          gsap.killTweensOf(inner);
          gsap
            .timeline()
            .to(inner, { duration: 0.14, ease: "power2.in", opacity: 0, yPercent: -18 * dir })
            .fromTo(
              inner,
              { yPercent: 60 * dir, opacity: 0 },
              { duration: 0.22, ease: "expo.out", opacity: 1, yPercent: 0 }
            );
        };

        const enter = () => {
          isHovering = true;
          btn.dataset.hover = "true";
          swapText(1);
          cbRef.current.onHoverStart?.();
        };

        const leave = () => {
          isHovering = false;
          btn.dataset.hover = "false";
          btnX(0);
          btnY(0);
          textX(0);
          textY(0);
          swapText(-1);
          cbRef.current.onHoverEnd?.();
        };

        const onMove = (e: MouseEvent) => {
          // getBoundingClientRect é relativo à viewport: NÃO somar scrollX/scrollY
          const rect = area.getBoundingClientRect();

          // Limites da caixa com a margem restrita de proximidade
          const isInProximity =
            e.clientX >= rect.left - proximityMargin &&
            e.clientX <= rect.right + proximityMargin &&
            e.clientY >= rect.top - proximityMargin &&
            e.clientY <= rect.bottom + proximityMargin;

          if (isInProximity) {
            if (!isHovering) enter();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const rawDeltaX = (e.clientX - centerX) * strength;
            const rawDeltaY = (e.clientY - centerY) * strength;

            // Trava de deslocamento máximo (clamping rígido)
            const clampedX = Math.max(-maxTravelX, Math.min(maxTravelX, rawDeltaX));
            const clampedY = Math.max(-maxTravelY, Math.min(maxTravelY, rawDeltaY));

            btnX(clampedX);
            btnY(clampedY);
            // O texto compensa no sentido oposto com amortecimento 2.5D suave (máximo ±4.2px)
            textX(-clampedX * 0.35);
            textY(-clampedY * 0.35);
          } else if (isHovering) {
            leave(); // Solta imediatamente assim que cruza a margem de proximidade
          }
        };

        const onWindowLeave = () => isHovering && leave();

        window.addEventListener("mousemove", onMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", onWindowLeave);

        return () => {
          window.removeEventListener("mousemove", onMove);
          document.documentElement.removeEventListener("mouseleave", onWindowLeave);
        };
      }, area);

      return () => ctx.revert();
    }, [strength, proximityMargin, maxTravelX, maxTravelY, disabled]);

    // Variações de estilo alinhadas à EPM DevTech (Engineering Chamfer)
    const variantStyles = {
      primary:
        "border-brand bg-brand text-on-brand font-semibold shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:border-brand/90",
      chamfer:
        "border-brand bg-brand text-on-brand font-semibold shadow-[0_0_20px_-4px_rgba(45,212,191,0.35)] hover:border-brand/90 active:scale-[0.98]",
      "chamfer-outline":
        "border-zinc-800 bg-zinc-950/80 text-zinc-200 hover:border-brand/60 hover:text-white backdrop-blur-sm active:scale-[0.98]",
      outline:
        "border-zinc-800 bg-zinc-950/60 text-zinc-200 hover:border-brand/50 hover:text-white backdrop-blur-sm",
      ghost:
        "border-transparent bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/40",
      secondary:
        "border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white",
    };

    const sizeStyles = {
      default: "px-8 py-3.5 text-sm md:text-base",
      sm: "px-6 py-2.5 text-xs md:text-sm",
      md: "px-7 py-3 text-sm md:text-base",
      lg: "px-8 py-4 text-base md:text-lg",
      icon: "p-3 text-sm",
    };

    const buttonClasses = cn(
      "btn-chamfer group relative inline-flex items-center justify-center overflow-hidden rounded-md border transition-colors duration-200",
      "will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand select-none",
      sizeStyles[size] || sizeStyles.default,
      variantStyles[variant] || variantStyles.primary,
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    );

    const isFullWidth = className?.includes("w-full");
    const isOutlineVariant = variant === "outline" || variant === "chamfer-outline";

    const content = (
      <>
        {/* Camada Filler: cortina de preenchimento que sobe no hover */}
        {isOutlineVariant && (
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-brand transition-transform duration-500 ease-out group-data-[hover=true]:translate-y-0 pointer-events-none"
          />
        )}

        <span
          ref={textRef}
          className={cn(
            "relative block transition-colors duration-200 pointer-events-none",
            isOutlineVariant ? "group-data-[hover=true]:text-zinc-950" : ""
          )}
        >
          <span ref={innerRef} className="block pointer-events-none">
            {children}
          </span>
        </span>
      </>
    );

    if (to && !disabled) {
      return (
        <div ref={areaRef} className={cn("inline-block", isFullWidth && "w-full")}>
          <Link
            ref={(node) => {
              btnRef.current = node;
            }}
            to={to}
            data-hover="false"
            className={cn("no-underline", buttonClasses)}
            onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
            target={target}
            rel={rel}
            {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </Link>
        </div>
      );
    }

    if (href && !disabled) {
      return (
        <div ref={areaRef} className={cn("inline-block", isFullWidth && "w-full")}>
          <a
            ref={(node) => {
              btnRef.current = node;
            }}
            href={href}
            data-hover="false"
            className={cn("no-underline", buttonClasses)}
            onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
            target={target}
            rel={rel}
            {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        </div>
      );
    }

    return (
      <div ref={areaRef} className={cn("inline-block", isFullWidth && "w-full")}>
        <button
          ref={(node) => {
            btnRef.current = node;
          }}
          type={type}
          disabled={disabled}
          data-hover="false"
          className={buttonClasses}
          onClick={onClick}
          {...props}
        >
          {content}
        </button>
      </div>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
