import React, { useRef, useEffect, useCallback } from "react";

export interface CountUpProps {
  isCounting: boolean;
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatThousands?: boolean;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

export const CountUp: React.FC<CountUpProps> = ({
  isCounting,
  end,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatThousands = false,
  className,
  "aria-hidden": ariaHidden,
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const formatVal = useCallback(
    (v: number) => {
      let numStr = "";
      if (decimals > 0) {
        numStr = v.toFixed(decimals).replace(".", ",");
      } else {
        const intVal = Math.floor(v);
        if (formatThousands) {
          numStr = String(intVal).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
          numStr = String(intVal);
        }
      }
      return `${prefix}${numStr}${suffix}`;
    },
    [decimals, formatThousands, prefix, suffix]
  );

  useEffect(() => {
    // A animação só roda se isCounting for true (item entra na viewport)
    if (!isCounting) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Se ambiente de teste ou prefers-reduced-motion, mantém o valor final sem animação
    if (process.env.NODE_ENV === "test" || prefersReducedMotion) {
      if (spanRef.current) spanRef.current.textContent = formatVal(end);
      return;
    }

    // Aprimoramento progressivo: inicia a contagem a partir de zero até o valor final
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
  }, [isCounting, end, duration, formatVal]);

  // O HTML inicial contém SEMPRE o valor final diretamente, garantindo SEO,
  // prévias de links, leitura acessível e suporte a JavaScript desativado.
  return (
    <span ref={spanRef} className={className} aria-hidden={ariaHidden ?? "true"}>
      {formatVal(end)}
    </span>
  );
};

export default CountUp;
