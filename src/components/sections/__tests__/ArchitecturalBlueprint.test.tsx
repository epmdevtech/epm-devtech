import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import ArchitecturalBlueprint from "../ArchitecturalBlueprint";
import { CORE_TECHNOLOGIES } from "@/config/architecture";

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

describe("ArchitecturalBlueprint Component (Nuvem Tipográfica de Especialidades)", () => {
  it("renderiza o cabeçalho com eyebrow e título editorial", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByText("// ESPECIALIDADES & STACK")).toBeInTheDocument();
    expect(
      screen.getByText("Nossas especialidades técnicas")
    ).toBeInTheDocument();
  });

  it("renderiza o container da nuvem tipográfica", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByTestId("tech-editorial-cloud")).toBeInTheDocument();
  });

  it("renderiza todas as 9 tecnologias centrais aprovadas", () => {
    render(<ArchitecturalBlueprint />);
    expect(CORE_TECHNOLOGIES.length).toBe(9);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("Vue.js")).toBeInTheDocument();
    expect(screen.getByText("PHP")).toBeInTheDocument();
    expect(screen.getByText("Laravel")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Azure")).toBeInTheDocument();
  });

  it("renderiza badges de autoridade inline (Node.js Core Runtime) e garante ausência de badge na AWS", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByText("Core Runtime")).toBeInTheDocument();
    expect(screen.queryByText("Certificado")).not.toBeInTheDocument();
  });

  it("garante a remoção estrita das 15 ferramentas descontinuadas", () => {
    render(<ArchitecturalBlueprint />);

    // Observabilidade & DevOps
    expect(screen.queryByText("Grafana")).not.toBeInTheDocument();
    expect(screen.queryByText("Prometheus")).not.toBeInTheDocument();
    expect(screen.queryByText("GitHub Actions")).not.toBeInTheDocument();
    expect(screen.queryByText("Terraform")).not.toBeInTheDocument();
    expect(screen.queryByText("Kubernetes")).not.toBeInTheDocument();
    expect(screen.queryByText("Docker")).not.toBeInTheDocument();

    // Bancos de dados
    expect(screen.queryByText("MongoDB")).not.toBeInTheDocument();
    expect(screen.queryByText("Oracle")).not.toBeInTheDocument();
    expect(screen.queryByText("MySQL")).not.toBeInTheDocument();
    expect(screen.queryByText("PostgreSQL")).not.toBeInTheDocument();

    // Mensageria & Cache
    expect(screen.queryByText("Redis")).not.toBeInTheDocument();
    expect(screen.queryByText("Kafka")).not.toBeInTheDocument();
    expect(screen.queryByText("RabbitMQ")).not.toBeInTheDocument();

    // Frameworks & Estilos descartados
    expect(screen.queryByText("Symfony")).not.toBeInTheDocument();
    expect(screen.queryByText("Tailwind CSS")).not.toBeInTheDocument();
  });

  it("permite customização de container via className", () => {
    const { container } = render(
      <ArchitecturalBlueprint className="custom-blueprint-class" />
    );
    expect(container.firstChild).toHaveClass("custom-blueprint-class");
  });
});
