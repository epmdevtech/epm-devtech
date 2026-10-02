import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import ProcessExplorer from '../ProcessExplorer';

const mockUseReducedMotion = vi.fn().mockReturnValue(false);

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, id, role, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} id={id} role={role} data-testid="motion-div" {...rest}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe('ProcessExplorer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it('renders all 4 process steps in tablist', () => {
    render(<ProcessExplorer />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const stepTitles = ['Entendemos', 'Definimos', 'Desenvolvemos', 'Evoluímos'];
    stepTitles.forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
    });

    const stepNums = ['01', '02', '03', '04'];
    stepNums.forEach((step) => {
      expect(screen.getAllByText(step).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('displays the first step as active by default with deliverables and exit criteria', () => {
    render(<ProcessExplorer />);

    // Step 01 details (rendered in desktop panel and default open mobile accordion)
    expect(screen.getAllByText(/Investigamos a fundo o funcionamento da sua empresa/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Matriz de Riscos & Restrições').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Diagrama C4 Inicial').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Alinhamento técnico e de objetivos formalmente acordado/i).length).toBeGreaterThanOrEqual(1);
  });

  it('switches active step details when clicking a desktop tab', () => {
    render(<ProcessExplorer />);

    const step02Tabs = screen.getAllByRole('tab');
    const step02Tab = step02Tabs.find((tab) => tab.id === 'tab-step-02');
    expect(step02Tab).toBeDefined();

    if (step02Tab) {
      fireEvent.click(step02Tab);
    }

    // Step 02 details should now be visible
    expect(screen.getByText(/Organizamos a solução em entregas claras e priorizadas/i)).toBeInTheDocument();
    expect(screen.getByText('Especificações Técnicas (SPECs)')).toBeInTheDocument();
    expect(screen.getByText('Contratos de API (OpenAPI)')).toBeInTheDocument();
    expect(screen.getByText(/Escopo, arquitetura e marcos de entrega validados/i)).toBeInTheDocument();
  });

  it('allows expanding and collapsing mobile accordion items', () => {
    render(<ProcessExplorer />);

    // By default, index 0 is open in mobile
    const toggleButton = screen.getByRole('button', { name: /02 ESCOPO & PLANEJAMENTO Definimos/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    // After clicking step 02 accordion toggle, its content should be displayed
    const mobileContent = document.getElementById('mobile-step-content-02');
    expect(mobileContent).toBeInTheDocument();
    expect(mobileContent).toHaveTextContent(/Organizamos a solução em entregas claras/i);
  });

  it('handles prefers-reduced-motion correctly', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<ProcessExplorer />);

    expect(screen.getAllByText('Entendemos').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Investigamos a fundo o funcionamento da sua empresa/i).length).toBeGreaterThanOrEqual(1);
  });
});
