import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Technologies from '../Technologies';

// Mock framer-motion and useInView to execute immediately
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className} data-testid="motion-div">{children}</div>,
        p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
    },
    useInView: () => true,
}));

describe('Technologies Component', () => {
    it('renders section title and description', () => {
        render(<Technologies />);
        expect(screen.getByText(/Stack Tecnológica/i)).toBeInTheDocument();
        expect(screen.getByText(/Tecnologias/i)).toBeInTheDocument();
    });

    it('renders category pills', () => {
        render(<Technologies />);

        // Check main categories
        expect(screen.getByText('Backend')).toBeInTheDocument();
        expect(screen.getByText('Frontend')).toBeInTheDocument();
        expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();

        // Check some items in the pills
        expect(screen.getAllByText('React')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Kubernetes')[0]).toBeInTheDocument();
    });

    it('renders the infinite scroll bands with technologies', () => {
        const { container } = render(<Technologies />);

        // Check that we have two scroll tracks (ScrollBand components)
        const tracks = container.querySelectorAll('.tech-band-track');
        expect(tracks.length).toBe(2);

        // Check if some technologies are present in the DOM (images/labels)
        const reactImages = screen.getAllByAltText('React');
        expect(reactImages.length).toBeGreaterThan(0);

        const dockerImages = screen.getAllByAltText('Docker');
        expect(dockerImages.length).toBeGreaterThan(0);
    });
});
