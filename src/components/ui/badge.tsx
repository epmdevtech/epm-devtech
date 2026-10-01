/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand text-on-brand hover:bg-brand-hover",
        secondary: "border-border-subtle bg-surface-elevated text-secondary hover:bg-surface-elevated/80",
        destructive: "border-transparent bg-danger text-white hover:bg-danger/80",
        outline: "text-primary border-border-default bg-surface",
        brand: "border-brand/20 bg-brand-subtle text-text-brand",
        blue: "border-accent-blue/20 bg-accent-blue/10 text-accent-blue",
        violet: "border-accent-violet/20 bg-accent-violet/10 text-accent-violet",
        amber: "border-accent-amber/20 bg-accent-amber/10 text-accent-amber",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
