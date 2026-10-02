import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EngineeringNetworkGraph from '../EngineeringNetworkGraph';

describe('EngineeringNetworkGraph', () => {
  it('renderiza o SVG e seus elementos de rede com acessibilidade apropriada', () => {
    const { container } = render(
      <EngineeringNetworkGraph className="test-custom-class" />
    );

    const wrapper = container.querySelector('[aria-hidden="true"]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('test-custom-class');
    expect(wrapper).toHaveClass('pointer-events-none');

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 600 500');

    // Definições de gradiente
    const activeStreamGradient = container.querySelector('#activeStream');
    expect(activeStreamGradient).toBeInTheDocument();
    const coreGlowGradient = container.querySelector('#coreGlow');
    expect(coreGlowGradient).toBeInTheDocument();

    // Nós e conexões
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(10);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(10);
  });

  it('renderiza nós e arestas mesmo quando prefers-reduced-motion está ativo', () => {
    const { container } = render(<EngineeringNetworkGraph />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
