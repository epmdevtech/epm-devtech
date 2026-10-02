import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import ArchitecturalBlueprint from "../ArchitecturalBlueprint";
import { ARCHITECTURAL_LAYERS } from "@/config/architecture";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

describe("ArchitecturalBlueprint Component", () => {
  it("renderiza o cabeçalho técnico da seção com eyebrow e título", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByText("// ARQUITETURA EM CAMADAS")).toBeInTheDocument();
    expect(
      screen.getByText("Stack tecnológica organizada por camadas de software")
    ).toBeInTheDocument();
  });

  it("renderiza as 4 camadas arquiteturais horizontais", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByText("LAYER 01 // INTERFACE & EDGE")).toBeInTheDocument();
    expect(screen.getByText("LAYER 02 // APLICAÇÃO & APIS")).toBeInTheDocument();
    expect(screen.getByText("LAYER 03 // MENSAGERIA & BARRAMENTO")).toBeInTheDocument();
    expect(
      screen.getByText("LAYER 04 // NUVEM, DADOS & OBSERVABILIDADE")
    ).toBeInTheDocument();

    expect(screen.getByText("Camada de Apresentação & Edge")).toBeInTheDocument();
    expect(screen.getByText("Camada de Aplicação & APIs")).toBeInTheDocument();
    expect(screen.getByText("Camada de Mensageria & Barramento")).toBeInTheDocument();
    expect(screen.getByText("Nuvem, Dados & Observabilidade")).toBeInTheDocument();
  });

  it("renderiza os badges de runtime e status de cada camada", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByText("CLIENT RUNTIME")).toBeInTheDocument();
    expect(screen.getByText("SERVICE RUNTIME")).toBeInTheDocument();
    expect(screen.getByText("ASYNC DECOUPLING")).toBeInTheDocument();
    expect(screen.getByText("INFRAESTRUTURA RESILIENTE")).toBeInTheDocument();
  });

  it("renderiza todas as tecnologias configuradas no blueprint", () => {
    render(<ArchitecturalBlueprint />);
    // Total de tecnologias
    const allTechNames = ARCHITECTURAL_LAYERS.flatMap((l) =>
      l.technologies.map((t) => t.name)
    );
    expect(allTechNames.length).toBeGreaterThanOrEqual(24);

    // Exemplos de cada camada
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Laravel")).toBeInTheDocument();
    expect(screen.getByText("RabbitMQ")).toBeInTheDocument();
    expect(screen.getByText("Kafka")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("Grafana")).toBeInTheDocument();
  });

  it("permite customização de container via className", () => {
    const { container } = render(<ArchitecturalBlueprint className="custom-blueprint-class" />);
    expect(container.firstChild).toHaveClass("custom-blueprint-class");
  });
});
