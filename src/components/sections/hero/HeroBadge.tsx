import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface HeroBadgeProps {
  className?: string;
  tag?: string;
  label?: string;
  href?: string;
}

const HeroBadge = ({
  className,
  tag = "EPM DEVTECH",
  label = "Engenharia de Software & Modernização",
  href = "#sobre",
}: HeroBadgeProps) => {
  return (
    <a
      href={href}
      aria-label={`${tag} — ${label}`}
      className={cn(
        "group flex w-fit items-center gap-2 sm:gap-3 rounded-md border border-border bg-card/90 px-2 py-1 shadow-xs",
        "hover:border-emerald-500/50 hover:bg-card/100 transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="rounded border border-border/80 bg-muted/60 dark:bg-muted/40 px-1.5 py-0.5 shadow-xs">
        <p className="font-mono text-[11px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400">
          {tag}
        </p>
      </div>

      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>

      <span className="block h-3.5 border-l border-border/80" aria-hidden="true" />

      <div className="pr-0.5" aria-hidden="true">
        <ArrowRight className="size-3 text-muted-foreground/80 -translate-x-0.5 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </a>
  );
};

export default HeroBadge;
