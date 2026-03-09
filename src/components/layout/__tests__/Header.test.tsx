import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from '../Header';

// Mock the typewriter component
vi.mock('@/components/ui/typewriter', () => ({
  Typewriter: ({ text }: { text: string }) => <span>{text}</span>,
}));

// Mock framer-motion to avoid animation delays in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as Record<string, unknown>;
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      ...(actual.motion as Record<string, unknown>),
      header: (props: React.ComponentPropsWithoutRef<'header'>) => <header {...props} />,
      div: (props: React.ComponentPropsWithoutRef<'div'>) => <div {...props} />,
      a: (props: React.ComponentPropsWithoutRef<'a'>) => <a {...props} />,
      span: (props: React.ComponentPropsWithoutRef<'span'>) => <span {...props} />,
    },
  };
});

// Mock window.scrollTo
const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and navigation links', () => {
    render(<Header />);
    expect(screen.getByAltText('EPM DEVTECH')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Abrir menu');
    
    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getAllByLabelText('Fechar menu').length).toBeGreaterThan(0);
    
    // Check if backdrop and sidebar are rendered (we can check for the close button inside sidebar)
    const closeButton = screen.getAllByLabelText('Fechar menu')[1];
    expect(closeButton).toBeInTheDocument();

    // Close menu
    fireEvent.click(closeButton);
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });

  it('scrolls to section when navigation link is clicked', async () => {
    vi.useFakeTimers();
    render(<Header />);
    
    // Create a dummy element in the document to be found by getElementById
    const sectionMock = document.createElement('div');
    sectionMock.id = 'sobre';
    sectionMock.getBoundingClientRect = vi.fn(() => ({
      top: 500,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
    document.body.appendChild(sectionMock);
    
    // Click on mobile nav link (which has the handleNavClick event attached)
    const menuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuButton);
    const sobreLink = screen.getAllByText('Sobre')[1];
    fireEvent.click(sobreLink);
    
    // Fast-forward timers for setTimeout in handleNavClick (350ms)
    vi.advanceTimersByTime(400);
    
    expect(scrollToMock).toHaveBeenCalledWith({ top: 500 + window.scrollY - 80, behavior: 'smooth' });

    document.body.removeChild(sectionMock);
    vi.useRealTimers();
  });

  it('updates header style on scroll', () => {
    const { container } = render(<Header />);
    
    // Initial state: transparent header
    expect(container.querySelector('header')?.className).toContain('bg-transparent');
    
    // Simulate scroll down
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    fireEvent.scroll(window);
    
    // Scrolled state: glass header
    expect(container.querySelector('header')?.className).toContain('glass');
  });
});
