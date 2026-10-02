import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

/**
 * CursorOrb
 * —————————
 * Cursor personalizado composto por dois elementos:
 *   1. Dot    — ponto pequeno que segue o mouse 1:1 (sem atraso)
 *   2. Ring   — anel maior com spring delay para efeito fluído
 *
 * Dark mode : azul elétrico (--primary) com glow
 * Light mode: tinta escura sutil sem glow
 *
 * pointer-events: none em ambos — nunca bloqueia cliques.
 */
const CursorOrb = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);

    // Raw motion values (1:1 com o mouse — sem atraso)
    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);
    const rawOpacity = useMotionValue(0);

    // Spring values para o anel (atraso suave)
    const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
    const ringX = useSpring(rawX, springConfig);
    const ringY = useSpring(rawY, springConfig);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (isTouch || isReduced) {
            return;
        }

        document.documentElement.classList.add("custom-cursor-active");

        const onMove = (e: MouseEvent) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
            rawOpacity.set(1);

            const target = e.target as HTMLElement | null;
            const interactive = target && typeof target.closest === "function"
                ? target.closest("a, button, [role='button'], input, textarea, select, label")
                : null;
            setHovering(!!interactive);
        };

        const onLeave = () => rawOpacity.set(0);
        const onEnter = () => rawOpacity.set(1);
        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("mouseenter", onEnter);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);

        return () => {
            document.documentElement.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mouseenter", onEnter);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, [rawX, rawY, rawOpacity]);

    // Desativa em dispositivos touch e em ambientes com prefers-reduced-motion
    if (
        typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches ||
         window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
        return null;
    }

    const dotSize = clicking ? 6 : 8;
    const ringSize = hovering ? 44 : clicking ? 28 : 36;

    const dotColor = isDark ? "#2DD4BF" : "#0F766E";
    const ringColor = isDark ? "rgba(45, 212, 191, 0.18)" : "rgba(15, 118, 110, 0.12)";
    const ringBorder = isDark ? "rgba(45, 212, 191, 0.75)" : "rgba(15, 118, 110, 0.65)";
    const glowColor = isDark ? "0 0 14px 3px rgba(45, 212, 191, 0.4)" : "none";

    return (
        <>
            {/* Dot — segue 1:1 na camada superior (z-[9999]) com visibilidade nítida */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: rawX,
                    y: rawY,
                    width: dotSize,
                    height: dotSize,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: dotColor,
                    boxShadow: isDark ? "0 0 10px 2px rgba(45, 212, 191, 0.85)" : "0 0 6px 1px rgba(15, 118, 110, 0.4)",
                    opacity: rawOpacity,
                    transition: "width 0.12s, height 0.12s",
                }}
            />

            {/* Ring — segue com spring na camada superior (z-[9999]) para feedback fluido */}
            <motion.div
                ref={ringRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: ringX,
                    y: ringY,
                    width: ringSize,
                    height: ringSize,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: hovering ? ringColor : "transparent",
                    border: `1.5px solid ${ringBorder}`,
                    boxShadow: isDark ? glowColor : "none",
                    opacity: rawOpacity,
                    transition: "width 0.18s, height 0.18s, background-color 0.18s",
                }}
            />
        </>
    );
};

export default CursorOrb;
