import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor, render, cleanup } from '@testing-library/react';
import SelectFile from '@/components/SelectFile';
import toast from 'react-hot-toast';
import { API_URL } from '@/constants';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
  } as Response)
);

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Select File Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<SelectFile />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders upload buttons', () => {
    const SeleccionarBtn = screen.getByText('Seleccionar archivo CSV').parentElement;
    const cargarBtn = screen.getByText('Cargar archivo').parentElement;

    expect(SeleccionarBtn).toBeDefined();
    expect(cargarBtn).toBeDefined();
    expect(cargarBtn).toHaveProperty('disabled', true);
  });

  it('handles file selection', async () => {
    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const cargarBtn = screen.getByText('Cargar archivo').parentElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(cargarBtn).toHaveProperty('disabled', false);
    });
  });

  it('submits file upload', async () => {
    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const cargarBtn = screen.getByText('Cargar archivo').parentElement as HTMLButtonElement;

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(cargarBtn);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/files`, {
      method: 'POST',
      body: expect.any(FormData),
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Archivo subido correctamente');
    });

    expect(cargarBtn).toHaveProperty('disabled', true);
  });

  it('handles file upload error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const cargarBtn = screen.getByText('Cargar archivo').parentElement as HTMLButtonElement;

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(cargarBtn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error al subir el archivo');
    });

    expect(screen.getByText('Cargar archivo'));
  });
});
