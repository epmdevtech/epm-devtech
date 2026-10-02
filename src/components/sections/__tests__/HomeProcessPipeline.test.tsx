import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomeProcessPipeline from "../HomeProcessPipeline";

describe("HomeProcessPipeline Component", () => {
  it("renderiza a lista ordenada com as 4 etapas de engenharia", () => {
    render(<HomeProcessPipeline />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(4);
  });

  it("renderiza os nós técnicos numéricos de 01 a 04", () => {
    render(<HomeProcessPipeline />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("renderiza as fases e títulos de cada etapa do processo", () => {
    render(<HomeProcessPipeline />);

    expect(screen.getByText(/01 · ENTENDIMENTO/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Diagnóstico técnico/i })).toBeInTheDocument();

    expect(screen.getByText(/02 · DEFINIÇÃO/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Escopo e arquitetura/i })).toBeInTheDocument();

    expect(screen.getByText(/03 · DESENVOLVIMENTO/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Ciclos incrementais/i })).toBeInTheDocument();

    expect(screen.getByText(/04 · EVOLUÇÃO/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Sustentação e escala/i })).toBeInTheDocument();
  });

  it("renderiza as descrições de negócio completas", () => {
    render(<HomeProcessPipeline />);

    expect(screen.getByText(/Alinhamento direto de objetivos, arquitetura e viabilidade do projeto/i)).toBeInTheDocument();
    expect(screen.getByText(/Especificação detalhada, critérios de aceite e cronograma de entregas/i)).toBeInTheDocument();
    expect(screen.getByText(/Código testado com validações contínuas em ambiente de homologação/i)).toBeInTheDocument();
    expect(screen.getByText(/Monitoramento contínuo e suporte direto para novas demandas operacionais/i)).toBeInTheDocument();
  });

  it("renderiza respeitando prefers-reduced-motion sem erros", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    render(<HomeProcessPipeline />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
  });
});
