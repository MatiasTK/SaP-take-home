import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from 'vitest-browser-react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import SelectFile from '../../src/components/SelectFile';
import toast from 'react-hot-toast';

const mockFetch = vi.fn();
window.fetch = mockFetch;

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

  it('renders upload buttons', async () => {
    expect(screen.getByText('Seleccionar archivo CSV')).toBeDefined();
    expect(await screen.getByText('Cargar archivo')).toBeDefined();
    expect(await screen.getByText('Cargar archivo').parentElement).toHaveProperty('disabled', true);
  });

  it('handles file selection', () => {
    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText('Cargar archivo').parentElement).toHaveProperty('disabled', false);
  });

  it('submits file upload', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByText('Cargar archivo'));

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/files', {
      method: 'POST',
      body: expect.any(FormData),
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Archivo subido correctamente');
    });

    expect(screen.getByText('Cargar archivo').parentElement).toHaveProperty('disabled', true);
  });

  it('handles file upload error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByText('Cargar archivo'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error al subir el archivo');
    });

    expect(screen.getByText('Cargar archivo'));
  });
});
