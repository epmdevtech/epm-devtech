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

    expect(screen.getByText("Disponibilidade contínua")).toBeInTheDocument();
    expect(screen.getByText("Capacidade de carga")).toBeInTheDocument();
    expect(screen.getByText("Consistência de dados")).toBeInTheDocument();
    expect(screen.getByText("Tempo operacional poupado")).toBeInTheDocument();
  });

  it("renderiza as descrições operacionais específicas de cada resultado", () => {
    render(<HomeResultsStrip />);

    expect(
      screen.getByText(/Sistemas operando sem paradas não planejadas em setores críticos de energia e educação\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Arquiteturas dimensionadas para milhares de acessos simultâneos sem gargalos de banco de dados\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Processamento regulatório sem perda ou duplicidade de registros em operações sensíveis\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Eliminação de tarefas manuais e digitações repetitivas através de automações inteligentes\./i)
    ).toBeInTheDocument();
  });

  it("renderiza lista semântica com 4 itens e rótulos acessíveis sr-only", () => {
    render(<HomeResultsStrip />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);

    expect(screen.getByText("99,9% de disponibilidade contínua")).toBeInTheDocument();
    expect(screen.getByText("2.500 requisições por segundo")).toBeInTheDocument();
    expect(screen.getByText("100% de consistência de dados")).toBeInTheDocument();
    expect(screen.getByText("redução de 35% de tempo operacional em tarefas manuais")).toBeInTheDocument();
  });
});
