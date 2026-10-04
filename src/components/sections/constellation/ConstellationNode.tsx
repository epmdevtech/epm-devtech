import { memo, useId, useRef, type PointerEvent } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { AnimatePresence } from "framer-motion";
import type { ConstellationNode as NodeData } from "@/config/epmConstellation";
import type { ConstellationPractice } from "@/data/constellationPractices";
import PracticeCard from "./PracticeCard";
import type { InspectorHandlers } from "./useConstellationInspector";

export const VIEWBOX_SIZE = 600;

export interface ConstellationNodeProps {
  node: NodeData;
  practice: ConstellationPractice;
  isActive: boolean;
  handlers: InspectorHandlers;
}

const isMouseLike = (e: PointerEvent) => e.pointerType !== "touch";

const ConstellationNode = ({ node, practice, isActive, handlers }: ConstellationNodeProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const skipNextFocus = useRef(false);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-desc`;

  const handleFocus = () => {
    if (skipNextFocus.current) {
      skipNextFocus.current = false;
      return;
    }
    handlers.focusNode(practice.id);
  };

  // Esc: fecha (Radix) e devolve o foco ao nó sem reabrir o card.
  const handleEscape = () => {
    const button = buttonRef.current;
    if (button && document.activeElement !== button) {
      skipNextFocus.current = true;
      button.focus();
    }
  };

  // Interações no próprio nó são tratadas pelo botão; só o "fora" real fecha.
  const handleInteractOutside = (event: Event) => {
    const target = event.target as Element | null;
    if (target?.closest?.("[data-practice-node]")) event.preventDefault();
  };

  return (
    <PopoverPrimitive.Root
      open={isActive}
      onOpenChange={(open) => {
        if (!open) handlers.dismiss(practice.id);
      }}
    >
      <PopoverPrimitive.Anchor asChild>
        <span
          className="pointer-events-auto absolute size-11 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${(node.x / VIEWBOX_SIZE) * 100}%`,
            top: `${(node.y / VIEWBOX_SIZE) * 100}%`,
          }}
        >
          <button
            ref={buttonRef}
            type="button"
            data-practice-node={node.id}
            data-state={isActive ? "active" : "idle"}
            aria-label={`Prática: ${practice.title}`}
            aria-haspopup="dialog"
            aria-expanded={isActive}
            aria-describedby={isActive ? descriptionId : undefined}
            className="size-full cursor-pointer rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            onPointerEnter={(e) => isMouseLike(e) && handlers.hoverEnter(practice.id)}
            onPointerLeave={(e) => isMouseLike(e) && handlers.hoverLeave()}
            onFocus={handleFocus}
            onBlur={handlers.hoverLeave}
            onClick={() => handlers.toggleNode(practice.id)}
          />
        </span>
      </PopoverPrimitive.Anchor>

      <AnimatePresence>
        {isActive && (
          <PracticeCard
            key={practice.id}
            practice={practice}
            titleId={titleId}
            descriptionId={descriptionId}
            onPointerEnter={handlers.cancelClose}
            onPointerLeave={handlers.hoverLeave}
            onPointerDown={handlers.pinActive}
            onEscapeKeyDown={handleEscape}
            onInteractOutside={handleInteractOutside}
          />
        )}
      </AnimatePresence>
    </PopoverPrimitive.Root>
  );
};

export default memo(ConstellationNode);
