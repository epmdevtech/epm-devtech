import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomeServicesBento from "../HomeServicesBento";

describe("HomeServicesBento Component", () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <HomeServicesBento />
      </BrowserRouter>
    );
  };

  it("renderiza os 4 títulos de serviços no Bento Grid", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 3, name: /APIs e back-end/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Sistemas e portais/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Integrações de dados/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Modernização de legados/i })).toBeInTheDocument();
  });

  it("renderiza as 4 descrições de negócio aprovadas", () => {
    renderComponent();

    expect(
      screen.getByText(/Processe regras complexas e alto volume com segurança, sem lentidão ou quedas inesperadas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Elimine gargalos operacionais e erros manuais com plataformas web sob medida para sua equipe/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Conecte seus sistemas e automatize fluxos manuais com comunicação confiável e sem perdas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Atualize sistemas antigos que travam o crescimento do negócio sem interromper a operação diária/i)
    ).toBeInTheDocument();
  });

  it("renderiza micro-artefatos técnicos para cada serviço", () => {
    renderComponent();

    // Card 1: APIs
    expect(screen.getByText(/Alta Concorrência/i)).toBeInTheDocument();
    expect(screen.getByText(/18ms latência/i)).toBeInTheDocument();
    expect(screen.getByText(/\/api\/v2\/transactions\/settlement/i)).toBeInTheDocument();

    // Card 2: Sistemas e Portais
    expect(screen.getByText(/Clean Arch/i)).toBeInTheDocument();
    expect(screen.getByText(/React 18/i)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();

    // Card 3: Integrações
    expect(screen.getByText(/Sync Ativo/i)).toBeInTheDocument();
    expect(screen.getByText(/Topologia de Conexão/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Hub/i)).toBeInTheDocument();

    // Card 4: Modernização de Legados
    expect(screen.getByText(/Zero Downtime/i)).toBeInTheDocument();
    expect(screen.getByText(/Padrão Strangler Fig aplicado/i)).toBeInTheDocument();
  });

  it("todos os 4 cards possuem links acessíveis direcionando para /servicos", () => {
    renderComponent();

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(4);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/servicos");
      expect(link).toHaveAttribute("aria-label");
    });
  });
});
