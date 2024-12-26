import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App Component', () => {
  it('01- Renders body titles', async () => {
    render(<App />);

    expect(screen.getByText('Shaw and Partners')).toBeDefined();
    expect(screen.getByText('Cargar información')).toBeDefined();
    expect(screen.getByText('Búsqueda')).toBeDefined();
  });
});
