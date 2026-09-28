import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const LampContainer = ({
  children,
  className,
  contentClassName,
}: LampContainerProps) => {
  const prefersReduced = Boolean(useReducedMotion());

  const transitionProps = prefersReduced
    ? { duration: 0 }
    : { delay: 0.2, duration: 0.8, ease: "easeInOut" };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-start overflow-hidden bg-background z-0",
        className
      )}
    >
      {/* Lamp Atmosphere / Light Cones */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative flex w-full h-[280px] sm:h-[320px] md:h-[360px] items-center justify-center isolate z-0 overflow-hidden select-none"
      >
        {/* Left Conic Gradient Beam (Emerald Brand) */}
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0.5, width: prefersReduced ? "30rem" : "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={transitionProps}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-emerald-500/80 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Gradient Beam (Emerald Brand) */}
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0.5, width: prefersReduced ? "30rem" : "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={transitionProps}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-emerald-500/80 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Ambient Glow & Blur */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Central Diffuse Lamp Glow */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-emerald-500/40 opacity-40 dark:opacity-60 blur-3xl" />

        {/* Inner High-Intensity Beam */}
        <motion.div
          initial={{ width: prefersReduced ? "16rem" : "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={transitionProps}
          className="absolute inset-auto z-30 h-32 w-64 -translate-y-[4rem] rounded-full bg-emerald-400/60 dark:bg-emerald-400/80 blur-2xl"
        />

        {/* Horizontal Lamp Emitter Line */}
        <motion.div
          initial={{ width: prefersReduced ? "30rem" : "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={transitionProps}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[5rem] bg-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.8)]"
        />

        {/* Clean Top Blocker Mask */}
        <div className="absolute inset-auto z-40 h-36 w-full -translate-y-[9.5rem] bg-background" />
      </div>

      {/* Hero Content Positioned directly under the Lamp beam */}
      <div
        className={cn(
          "relative z-40 flex -mt-44 sm:-mt-52 md:-mt-60 flex-col items-center px-4 sm:px-6 w-full max-w-5xl mx-auto text-center",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
