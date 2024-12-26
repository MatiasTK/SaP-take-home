import App from '@/App';
import { render } from 'vitest-browser-react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import toast from 'react-hot-toast';
import mockFetch from '../utils/testUtils';

describe('E2E Integration Test', () => {
  it('01 - Upload & Search workflow', async () => {
    render(<App />);
    vi.spyOn(toast, 'success');

    // 1. Default screen
    // 1.1 Titles
    expect(screen.getByText('Shaw and Partners')).toBeDefined();
    expect(screen.getByText('Cargar información')).toBeDefined();
    expect(screen.getByText('Búsqueda')).toBeDefined();

    // 1.2 Upload buttons
    expect(screen.getByText('Seleccionar archivo CSV')).toBeDefined();
    expect(screen.getByText('Cargar archivo')).toBeDefined();
    expect(screen.getByText('Cargar archivo').parentElement).toHaveProperty('disabled', true);

    // 1.3 Search component
    expect(screen.getByText('Búsqueda')).toBeDefined();
    expect(screen.getByPlaceholderText('Buscar usuario')).toBeDefined();

    // 1.4 No search is done
    expect(screen.findByTestId('no-users')).toBeDefined();

    // 1.5 Initial url doesnt have query
    expect(window.location.search).toBe('');

    // 2. Upload file
    // 2.1 Selecting a file
    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText('Cargar archivo').parentElement).toHaveProperty('disabled', false);

    // 2.2 Handle file upload
    // Spy window.fetch vitest
    window.fetch = vi.fn().mockResolvedValueOnce({ ok: true });

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByText('Cargar archivo'));

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/api/files', {
      method: 'POST',
      body: expect.any(FormData),
    });

    // 2.3 Success message
    expect(screen.getByText('Cargar archivo').parentElement).toHaveProperty('disabled', true);
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Archivo subido correctamente'));

    // 3. Search user
    // 3.1 Handles search input change
    mockFetch('Juan');
    const searchInput = screen.getByPlaceholderText('Buscar usuario');
    fireEvent.change(searchInput, { target: { value: 'Juan' } });

    // 3.2 Show search results
    const cards = await screen.findAllByTestId('user-card');
    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);

    // 3.3 Update url search param
    await waitFor(() => expect(window.location.search).toBe('?q=Juan'));
  });
});
