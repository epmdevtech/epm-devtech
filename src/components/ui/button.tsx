/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand text-on-brand font-semibold hover:bg-brand-hover active:bg-brand-active shadow-sm",
        destructive: "bg-danger text-white hover:bg-danger/90",
        outline: "border border-border-default bg-surface hover:bg-surface-elevated text-primary",
        secondary: "bg-surface-elevated text-primary hover:bg-surface-elevated/80 border border-border-subtle",
        ghost: "hover:bg-brand-subtle hover:text-brand text-primary",
        link: "text-text-brand underline-offset-4 hover:underline",
        chamfer:
          "btn-chamfer relative inline-flex items-center justify-center font-semibold text-on-brand bg-brand hover:bg-brand-hover active:bg-brand-active transition-all duration-200 shadow-[0_0_20px_-4px_rgba(45,212,191,0.35)] active:scale-[0.98]",
        "chamfer-outline":
          "btn-chamfer relative inline-flex items-center justify-center font-medium text-zinc-200 bg-zinc-950/80 border border-zinc-800 hover:border-brand/60 hover:text-white transition-all duration-200 backdrop-blur-sm active:scale-[0.98]",
        "chamfer-gradient":
          "btn-chamfer relative inline-flex items-center justify-center font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-[0_0_20px_-4px_rgba(52,211,153,0.35)] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-6 py-2.5",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
