import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomeResultsStrip from "../HomeResultsStrip";

describe("HomeResultsStrip Component", () => {
  it("renderiza as 4 métricas de grande escala", () => {
    render(<HomeResultsStrip />);

    expect(screen.getByText("99,9%")).toBeInTheDocument();
    expect(screen.getByText("2.500+")).toBeInTheDocument();
    expect(screen.getByText("+448")).toBeInTheDocument();
    expect(screen.getByText("Zero")).toBeInTheDocument();
  });

  it("renderiza os rótulos de cada métrica", () => {
    render(<HomeResultsStrip />);

    expect(screen.getByText(/Alta disponibilidade/i)).toBeInTheDocument();
    expect(screen.getByText(/Requisições por segundo/i)).toBeInTheDocument();
    expect(screen.getByText(/Instituições e escolas/i)).toBeInTheDocument();
    expect(screen.getByText(/Perda de dados/i)).toBeInTheDocument();
  });

  it("renderiza as descrições sucintas de cada resultado", () => {
    render(<HomeResultsStrip />);

    expect(screen.getByText(/Sistemas tolerantes a falhas em produção/i)).toBeInTheDocument();
    expect(screen.getByText(/Back-ends sem gargalos de concorrência/i)).toBeInTheDocument();
    expect(screen.getByText(/Operações simultâneas em escala nacional/i)).toBeInTheDocument();
    expect(screen.getByText(/Transações e conformidade operacional/i)).toBeInTheDocument();
  });
});
