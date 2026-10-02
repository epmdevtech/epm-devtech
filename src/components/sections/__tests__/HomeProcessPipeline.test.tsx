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
    expect(screen.getByRole("heading", { level: 3, name: /Diagnóstico inicial/i })).toBeInTheDocument();

    expect(screen.getByText(/02 · DEFINIÇÃO/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Escopo e entregáveis/i })).toBeInTheDocument();

    expect(screen.getByText(/03 · DESENVOLVIMENTO/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Entregas incrementais/i })).toBeInTheDocument();

    expect(screen.getByText(/04 · EVOLUÇÃO/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Sustentação e melhoria/i })).toBeInTheDocument();
  });

  it("renderiza as descrições de negócio completas", () => {
    render(<HomeProcessPipeline />);

    expect(screen.getByText(/Mapeamos os gargalos operacionais e desenhamos a arquitetura mais eficiente para o seu momento/i)).toBeInTheDocument();
    expect(screen.getByText(/Definimos critérios claros de aceite, cronograma realista e prioridades de negócio antes de codificar/i)).toBeInTheDocument();
    expect(screen.getByText(/Código testado com validações periódicas em homologação para sua equipe acompanhar a evolução real/i)).toBeInTheDocument();
    expect(screen.getByText(/Acompanhamento próximo em produção, monitoramento de estabilidade e suporte técnico ágil/i)).toBeInTheDocument();
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

  it("renderiza o trilho alinhado do nó 01 ao nó 04 com z-0 e nós com z-10 (SPEC-072)", () => {
    const { container } = render(<HomeProcessPipeline />);

    // Trilho horizontal desktop
    const desktopRail = container.querySelector(".hidden.md\\:block");
    expect(desktopRail).toBeInTheDocument();
    expect(desktopRail?.className).toContain("left-[18px]");
    expect(desktopRail?.className).toContain("md:right-[calc(25%-36px)]");
    expect(desktopRail?.className).toContain("lg:right-[calc(25%-42px)]");
    expect(desktopRail?.className).toContain("z-0");

    // Nós com z-10 e fundo sólido
    const nodes = container.querySelectorAll(".w-9.h-9");
    expect(nodes.length).toBe(4);
    nodes.forEach((node) => {
      expect(node.className).toContain("relative");
      expect(node.className).toContain("z-10");
      expect(node.className).toContain("dark:bg-zinc-950");
    });
  });
});
