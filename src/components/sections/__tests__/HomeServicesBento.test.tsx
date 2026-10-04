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

    expect(screen.getByRole("heading", { level: 3, name: /APIs e back-end de alta performance/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Sistemas web e plataformas internas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Integrações entre sistemas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /Modernização de sistemas legados/i })).toBeInTheDocument();
  });

  it("renderiza as 4 descrições de negócio aprovadas", () => {
    renderComponent();

    expect(
      screen.getByText(/Sistemas estáveis para processar grande volume de transações e regras complexas, sem lentidão ou quedas em momentos de pico/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Substitua planilhas confusas e controles manuais por sistemas web intuitivos, rápidos e adaptados à rotina da sua equipe/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Elimine o retrabalho de redigitar dados conectando seu ERP, CRM e ferramentas externas de forma confiável e sem perda de informações/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Atualize sistemas antigos que travam o crescimento do seu negócio de forma gradual, sem colocar em risco a operação diária/i)
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

  it("todos os 4 cards possuem links acessíveis direcionando para /services", () => {
    renderComponent();

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(4);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/services");
      expect(link).toHaveAttribute("aria-label");
    });
  });
});
