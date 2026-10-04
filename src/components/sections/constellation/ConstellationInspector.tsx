import { useMemo, type KeyboardEvent, type ReactNode } from "react";
import { CONSTELLATION_NODES, type ConstellationNode as NodeData } from "@/config/epmConstellation";
import type { ConstellationPractice } from "@/data/constellationPractices";
import ConstellationNode from "./ConstellationNode";
import { useConstellationInspector } from "./useConstellationInspector";

export interface ConstellationInspectorProps {
  practices: ConstellationPractice[];
  /** Render prop do SVG: recebe o id do nó (SVG) ativo para a camada de destaque. */
  children: (activeId: string | null) => ReactNode;
}

interface InteractiveNode {
  node: NodeData;
  practice: ConstellationPractice;
}

const ConstellationInspector = ({ practices, children }: ConstellationInspectorProps) => {
  const { activeId, handlers } = useConstellationInspector();

  // Apenas nós com prática são interativos; ordem por x, depois y (Tab/setas).
  const interactiveNodes = useMemo<InteractiveNode[]>(
    () =>
      practices
        .flatMap((practice) => {
          const node = CONSTELLATION_NODES[practice.nodeIndex];
          return node ? [{ node, practice }] : [];
        })
        .sort((a, b) => a.node.x - b.node.x || a.node.y - b.node.y),
    [practices],
  );

  const activeNodeId = useMemo(
    () => interactiveNodes.find(({ practice }) => practice.id === activeId)?.node.id ?? null,
    [interactiveNodes, activeId],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const buttons = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>("[data-practice-node]"),
    );
    const current = buttons.indexOf(e.target as HTMLButtonElement);
    if (current < 0) return;
    e.preventDefault();
    const next = current + (e.key === "ArrowRight" ? 1 : -1);
    buttons[Math.min(buttons.length - 1, Math.max(0, next))]?.focus();
  };

  return (
    <div className="relative h-full w-full">
      {children(activeNodeId)}
      {interactiveNodes.length > 0 && (
        <div
          role="group"
          aria-label="Grafo interativo de práticas de engenharia"
          className="pointer-events-none absolute inset-0"
          onKeyDown={handleKeyDown}
        >
          {interactiveNodes.map(({ node, practice }) => (
            <ConstellationNode
              key={practice.id}
              node={node}
              practice={practice}
              isActive={activeId === practice.id}
              handlers={handlers}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConstellationInspector;
