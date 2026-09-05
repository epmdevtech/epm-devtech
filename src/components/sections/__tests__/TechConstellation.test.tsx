import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TechConstellation from "../TechConstellation";
import type { Category, Connection } from "@/lib/buildConstellationLayout";

// Mock de useInView para garantir que o componente anime/monte nos testes
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useInView: () => true,
    useReducedMotion: () => false,
  };
});

describe("TechConstellation Component", () => {
  const mockCategories: Category[] = [
    {
      id: "frontend",
      label: "Frontend",
      colorVar: "--primary",
      technologies: [
        { name: "React", icon: "https://example.com/react.svg" },
        { name: "TypeScript", icon: "https://example.com/ts.svg" },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      colorVar: "--primary",
      technologies: [
        { name: "Node.js", icon: "https://example.com/node.svg" },
      ],
    },
  ];

  const mockConnections: Connection[] = [
    ["React", "Node.js"],
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar todos os nós e labels de categoria", () => {
    render(
      <TechConstellation
        categories={mockCategories}
        connections={mockConnections}
      />
    );

    expect(screen.getByTestId("tech-constellation")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();

    // Verifica que os nós das tecnologias existem
    const reactNode = screen.getByTestId("tech-node-React");
    const nodejsNode = screen.getByTestId("tech-node-Node.js");
    const tsNode = screen.getByTestId("tech-node-TypeScript");

    expect(reactNode).toBeInTheDocument();
    expect(nodejsNode).toBeInTheDocument();
    expect(tsNode).toBeInTheDocument();
  });

  it("deve conter acessibilidade correta em cada nó (role, tabIndex, aria-label)", () => {
    render(
      <TechConstellation
        categories={mockCategories}
        connections={mockConnections}
      />
    );

    const reactNode = screen.getByTestId("tech-node-React");
    expect(reactNode).toHaveAttribute("role", "button");
    expect(reactNode).toHaveAttribute("tabIndex", "0");
    expect(reactNode).toHaveAttribute("aria-label", "React (Frontend)");
  });

  it("deve ativar o nó e conexões relacionadas no hover e desativar no mouseLeave", () => {
    render(
      <TechConstellation
        categories={mockCategories}
        connections={mockConnections}
      />
    );

    const reactNode = screen.getByTestId("tech-node-React");
    const connGroup = screen.getByTestId("connection-React-Node.js");
    const connPath = connGroup.querySelector("path[data-active]");

    expect(reactNode).toHaveAttribute("data-active", "false");
    expect(connPath).toHaveAttribute("data-active", "false");

    // Simula hover
    fireEvent.mouseEnter(reactNode);
    expect(reactNode).toHaveAttribute("data-active", "true");
    expect(connPath).toHaveAttribute("data-active", "true");

    // Simula mouse leave
    fireEvent.mouseLeave(reactNode);
    expect(reactNode).toHaveAttribute("data-active", "false");
    expect(connPath).toHaveAttribute("data-active", "false");
  });

  it("deve ativar o nó no foco via teclado e desativar com a tecla Escape", () => {
    render(
      <TechConstellation
        categories={mockCategories}
        connections={mockConnections}
      />
    );

    const reactNode = screen.getByTestId("tech-node-React");
    fireEvent.focus(reactNode);
    expect(reactNode).toHaveAttribute("data-active", "true");

    // Pressiona tecla Escape
    fireEvent.keyDown(window, { key: "Escape" });
    expect(reactNode).toHaveAttribute("data-active", "false");
  });

  it("deve ativar via clique no nó e desativar ao clicar no fundo do svg", () => {
    const { container } = render(
      <TechConstellation
        categories={mockCategories}
        connections={mockConnections}
      />
    );

    const reactNode = screen.getByTestId("tech-node-React");
    fireEvent.click(reactNode);
    expect(reactNode).toHaveAttribute("data-active", "true");

    const svg = container.querySelector("svg");
    if (svg) fireEvent.click(svg);
    expect(reactNode).toHaveAttribute("data-active", "false");
  });

  it("deve exibir o painel de detalhes com orientações em repouso e detalhes da tecnologia quando ativa", () => {
    render(
      <TechConstellation
        categories={mockCategories}
        connections={mockConnections}
      />
    );

    const panel = screen.getByTestId("tech-details-panel");
    expect(panel).toBeInTheDocument();
    expect(screen.getByText(/Exploração Interativa do Grafo/i)).toBeInTheDocument();

    const reactNode = screen.getByTestId("tech-node-React");
    fireEvent.click(reactNode);

    expect(screen.getByRole("heading", { name: "React" })).toBeInTheDocument();
    expect(panel).toHaveTextContent("Frontend");
  });
});

