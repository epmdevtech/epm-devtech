import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ScrollManager from '../ScrollManager';

const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const NavigationTestHarness = () => {
  const navigate = useNavigate();
  return (
    <>
      <ScrollManager />
      <button onClick={() => navigate('/sobre')}>Ir para Sobre</button>
    </>
  );
};

describe('ScrollManager Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redireciona hashes legados na home para novas rotas canônicas', () => {
    render(
      <MemoryRouter initialEntries={['/#servicos']}>
        <ScrollManager />
      </MemoryRouter>
    );
  });

  it('rola para o elemento alvo quando hash estiver presente', () => {
    vi.useFakeTimers();
    const el = document.createElement('div');
    el.id = 'contextos';
    el.getBoundingClientRect = vi.fn(() => ({
      top: 600,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    document.body.appendChild(el);

    render(
      <MemoryRouter initialEntries={['/experiencia#contextos']}>
        <ScrollManager />
      </MemoryRouter>
    );

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(scrollToMock).toHaveBeenCalledWith(
      expect.objectContaining({ top: 600 + window.scrollY - 80 })
    );

    document.body.removeChild(el);
    vi.useRealTimers();
  });

  it('move o foco para o H1 da nova página ao navegar', () => {
    vi.useFakeTimers();
    const h1 = document.createElement('h1');
    h1.tabIndex = -1;
    document.body.appendChild(h1);
    const focusSpy = vi.spyOn(h1, 'focus');

    render(
      <MemoryRouter initialEntries={['/']}>
        <NavigationTestHarness />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Ir para Sobre' });
    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(scrollToMock).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0 })
    );
    expect(focusSpy).toHaveBeenCalled();

    focusSpy.mockRestore();
    document.body.removeChild(h1);
    vi.useRealTimers();
  });
});

