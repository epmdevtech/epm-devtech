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
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);

    // Raw motion values (1:1 com o mouse — sem atraso)
    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);

    // Spring values para o anel (atraso suave)
    const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
    const ringX = useSpring(rawX, springConfig);
    const ringY = useSpring(rawY, springConfig);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
            setVisible(true);

            const target = e.target as HTMLElement;
            const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
            setHovering(!!interactive);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);
        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("mouseenter", onEnter);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mouseenter", onEnter);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, [rawX, rawY]);

    // Desativa em dispositivos touch e em ambientes com prefers-reduced-motion
    if (
        typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches ||
         window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
        return null;
    }

    const dotSize = clicking ? 4 : 6;
    const ringSize = hovering ? 40 : clicking ? 26 : 32;

    const dotColor = isDark ? "rgba(45, 212, 191, 0.5)" : "rgba(15, 118, 110, 0.4)";
    const ringColor = isDark ? "rgba(45, 212, 191, 0.12)" : "rgba(15, 118, 110, 0.08)";
    const ringBorder = isDark ? "rgba(45, 212, 191, 0.35)" : "rgba(15, 118, 110, 0.2)";
    const glowColor = isDark ? "0 0 10px 2px rgba(45, 212, 191, 0.25)" : "none";

    return (
        <>
            {/* Dot — segue 1:1 atrás do conteúdo (z-0) */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-0"
                style={{
                    x: rawX,
                    y: rawY,
                    width: dotSize,
                    height: dotSize,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: dotColor,
                    boxShadow: isDark ? `0 0 6px 1px rgba(45, 212, 191, 0.35)` : "none",
                    opacity: visible ? 0.35 : 0,
                    transition: "width 0.12s, height 0.12s, opacity 0.2s",
                }}
            />

            {/* Ring — segue com spring atrás do conteúdo (z-0) com opacidade suave */}
            <motion.div
                ref={ringRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-0"
                style={{
                    x: ringX,
                    y: ringY,
                    width: ringSize,
                    height: ringSize,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: hovering ? ringColor : "transparent",
                    border: `1px solid ${ringBorder}`,
                    boxShadow: isDark ? glowColor : "none",
                    opacity: visible ? (hovering ? 0.35 : 0.2) : 0,
                    transition: "width 0.18s, height 0.18s, background-color 0.18s, opacity 0.2s",
                }}
            />
        </>
    );
};

export default CursorOrb;
