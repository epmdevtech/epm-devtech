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
      screen.getByText("Stack tecnológica e especialidades de engenharia")
    ).toBeInTheDocument();
  });

  it("renderiza as 4 camadas arquiteturais horizontais", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByText("LAYER 01 // WEB & INTERFACES REATIVAS")).toBeInTheDocument();
    expect(screen.getByText("LAYER 02 // BACK-END, APIS & LINGUAGENS")).toBeInTheDocument();
    expect(screen.getByText("LAYER 03 // MOBILE & ENGENHARIA DE IA")).toBeInTheDocument();
    expect(
      screen.getByText("LAYER 04 // CLOUD & INFRAESTRUTURA ESCALÁVEL")
    ).toBeInTheDocument();

    expect(screen.getByText("Camada de Apresentação & Web")).toBeInTheDocument();
    expect(screen.getByText("Camada de Back-end & APIs")).toBeInTheDocument();
    expect(screen.getByText("Camada Mobile & Inteligência Artificial")).toBeInTheDocument();
    expect(screen.getByText("Camada Cloud & Infraestrutura")).toBeInTheDocument();
  });

  it("renderiza os badges de runtime e status de cada camada", () => {
    render(<ArchitecturalBlueprint />);
    expect(screen.getByText("CLIENT RUNTIME & SSR")).toBeInTheDocument();
    expect(screen.getByText("SERVICE RUNTIME")).toBeInTheDocument();
    expect(screen.getByText("NATIVE APPS & INTELLIGENCE")).toBeInTheDocument();
    expect(screen.getByText("ENTERPRISE CLOUD")).toBeInTheDocument();
  });

  it("renderiza todas as especialidades curadas e badges de autoridade", () => {
    render(<ArchitecturalBlueprint />);
    
    // Camada 1
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Vue.js")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();

    // Camada 2
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
    expect(screen.getByText("PHP")).toBeInTheDocument();
    expect(screen.getByText("Ruby on Rails")).toBeInTheDocument();

    // Camada 3
    expect(screen.getByText("React Native")).toBeInTheDocument();
    expect(screen.getByText("Android")).toBeInTheDocument();
    expect(screen.getByText("Swift")).toBeInTheDocument();
    expect(screen.getByText("Programação com IA")).toBeInTheDocument();

    // Camada 4 (estritamente AWS e Azure)
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("Azure")).toBeInTheDocument();

    // Badges de autoridade
    expect(screen.getByText("Certificado")).toBeInTheDocument();
    expect(screen.getByText("Core Runtime")).toBeInTheDocument();
    expect(screen.getByText("Inovação")).toBeInTheDocument();
  });

  it("garante a remoção das tecnologias descontinuadas do blueprint", () => {
    render(<ArchitecturalBlueprint />);
    
    // Bancos de dados
    expect(screen.queryByText("PostgreSQL")).not.toBeInTheDocument();
    expect(screen.queryByText("MySQL")).not.toBeInTheDocument();
    expect(screen.queryByText("MongoDB")).not.toBeInTheDocument();
    expect(screen.queryByText("Oracle")).not.toBeInTheDocument();

    // Observabilidade
    expect(screen.queryByText("Prometheus")).not.toBeInTheDocument();
    expect(screen.queryByText("Grafana")).not.toBeInTheDocument();
    expect(screen.queryByText("SonarQube")).not.toBeInTheDocument();

    // Estilos e frameworks descartados
    expect(screen.queryByText("Tailwind CSS")).not.toBeInTheDocument();
    expect(screen.queryByText("Laravel")).not.toBeInTheDocument();
    expect(screen.queryByText("Symfony")).not.toBeInTheDocument();

    // Mensageria
    expect(screen.queryByText("RabbitMQ")).not.toBeInTheDocument();
    expect(screen.queryByText("Kafka")).not.toBeInTheDocument();
    expect(screen.queryByText("Redis")).not.toBeInTheDocument();

    // Infraestrutura operacional secundária
    expect(screen.queryByText("Kubernetes")).not.toBeInTheDocument();
    expect(screen.queryByText("Docker")).not.toBeInTheDocument();
    expect(screen.queryByText("Terraform")).not.toBeInTheDocument();
  });

  it("permite customização de container via className", () => {
    const { container } = render(<ArchitecturalBlueprint className="custom-blueprint-class" />);
    expect(container.firstChild).toHaveClass("custom-blueprint-class");
  });
});
