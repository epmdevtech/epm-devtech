import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomeResultsStrip from "../HomeResultsStrip";

const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock("framer-motion", () => ({
  useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe("HomeResultsStrip Component (SPEC-085)", () => {
  it("renderiza as 4 métricas técnicas com formatação correta", () => {
    render(<HomeResultsStrip />);

    expect(screen.getByText("99,9%")).toBeInTheDocument();
    expect(screen.getByText("2.500 RPS")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("\u221235%")).toBeInTheDocument();
  });

  it("renderiza os rótulos de cada métrica técnica", () => {
    render(<HomeResultsStrip />);

    expect(screen.getByText("Disponibilidade assegurada")).toBeInTheDocument();
    expect(screen.getByText("Arquitetura dimensionada")).toBeInTheDocument();
    expect(screen.getByText("Integridade de dados")).toBeInTheDocument();
    expect(screen.getByText("Atividades manuais reduzidas")).toBeInTheDocument();
  });

  it("renderiza as descrições operacionais específicas de cada resultado", () => {
    render(<HomeResultsStrip />);

    expect(
      screen.getByText(/Em plataformas críticas de energia e educação\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Para picos de 10\.000 usuários simultâneos sem gargalos\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Na consolidação regulatória do setor elétrico, sem perdas\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Automações e integrações em plataformas modernizadas\./i)
    ).toBeInTheDocument();
  });

  it("renderiza lista semântica com 4 itens e rótulos acessíveis sr-only", () => {
    render(<HomeResultsStrip />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);

    expect(screen.getByText("99,9% de disponibilidade assegurada")).toBeInTheDocument();
    expect(screen.getByText("2.500 requisições por segundo")).toBeInTheDocument();
    expect(screen.getByText("100% de integridade de dados")).toBeInTheDocument();
    expect(screen.getByText("redução de 35% de atividades manuais")).toBeInTheDocument();
  });
});
