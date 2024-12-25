import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { screen } from '@testing-library/react';
import App from '@/App';

describe('App Component', () => {
  it('renders the title', async () => {
    render(<App />);

    expect(screen.getByText('Shaw and Partners')).toBeDefined();
    expect(screen.getByText('Cargar información')).toBeDefined();
    expect(screen.getByText('Búsqueda')).toBeDefined();
  });
});
