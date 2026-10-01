import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon, IconBusinessFocus } from '../index';

describe('Icon wrapper component', () => {
  it('renders decorative icon with aria-hidden="true" by default', () => {
    const { container } = render(<Icon icon={IconBusinessFocus} size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('renders accessible icon with role="img" and title when provided', () => {
    render(<Icon icon={IconBusinessFocus} size={28} title="Foco no negócio" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Foco no negócio')).toBeInTheDocument();
  });
});
