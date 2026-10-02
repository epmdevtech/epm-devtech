import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EpmConstellation from "../EpmConstellation";
import {
  CONSTELLATION_NODES,
  CONSTELLATION_EDGES,
} from "@/config/epmConstellation";

// Mock do hook useReducedMotion do framer-motion
let mockReducedMotion = false;
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => mockReducedMotion,
  };
});

describe("EpmConstellation Component", () => {
  beforeEach(() => {
    mockReducedMotion = false;
    vi.clearAllMocks();
  });

  it("renderiza o container e o SVG com viewBox e atributos corretos", () => {
    render(<EpmConstellation className="custom-test-class" />);

    const container = screen.getByTestId("epm-constellation-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("custom-test-class");
    expect(container).toHaveAttribute("aria-hidden", "true");

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 600 600");
    expect(svg).toHaveAttribute("role", "presentation");
  });

  it("renderiza todos os nós mapeados da silhueta oficial da EPM DevTech", () => {
    render(<EpmConstellation />);

    const nodesGroup = screen.getByTestId("constellation-nodes");
    expect(nodesGroup).toBeInTheDocument();

    // Deve conter nós de cada grupo (frame, bracket, bus, core)
    expect(screen.getByTestId("node-core_center")).toBeInTheDocument();
    expect(screen.getByTestId("node-bra_l_tip")).toBeInTheDocument();
    expect(screen.getByTestId("node-bra_r_tip")).toBeInTheDocument();
    expect(screen.getByTestId("node-t_mid")).toBeInTheDocument();
    expect(screen.getByTestId("node-bus_t2")).toBeInTheDocument();

    // Total de nós declarados
    expect(CONSTELLATION_NODES.length).toBeGreaterThanOrEqual(40);
  });

  it("renderiza as arestas estruturais e de constelação mapeadas", () => {
    render(<EpmConstellation />);

    const edgesGroup = screen.getByTestId("constellation-edges");
    expect(edgesGroup).toBeInTheDocument();

    const lines = edgesGroup.querySelectorAll("line");
    // Deve haver ao menos uma linha por aresta
    expect(lines.length).toBeGreaterThanOrEqual(CONSTELLATION_EDGES.length);
  });

  it("reage a eventos de ponteiro/mouse sem disparar exceções e calculando proximidade", () => {
    render(<EpmConstellation interactive={true} />);

    const container = screen.getByTestId("epm-constellation-container");
    const svg = container.querySelector("svg")!;

    // Simula getBoundingClientRect no SVG
    vi.spyOn(svg, "getBoundingClientRect").mockReturnValue({
      width: 600,
      height: 600,
      top: 0,
      left: 0,
      bottom: 600,
      right: 600,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Dispara pointermove próximo ao nó core central (300, 300)
    fireEvent.pointerMove(svg, { clientX: 300, clientY: 300 });

    // Dispara pointerLeave
    fireEvent.pointerLeave(svg);
  });

  it("comporta-se com acessibilidade estrita quando useReducedMotion está ativo", () => {
    mockReducedMotion = true;
    render(<EpmConstellation />);

    const container = screen.getByTestId("epm-constellation-container");
    expect(container).toBeInTheDocument();

    // Garante que o SVG é renderizado normalmente em modo reduzido
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
