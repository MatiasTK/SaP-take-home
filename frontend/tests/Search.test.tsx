import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Search from '../src/components/Search';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Search component', () => {
  beforeEach(() => {
    window.history.replaceState = vi.fn();
    render(<Search />);
    vi.resetAllMocks();
  });

  it('renders the search component', async () => {
    expect(screen.getByText('Búsqueda')).toBeDefined();
    expect(screen.getByPlaceholderText('Buscar usuario')).toBeDefined();
  });

  it('Shows initial message when no search is done', async () => {
    expect(screen.getByText('No se realizó ninguna busqueda')).toBeDefined();
  });

  it('Updates URL when search is done', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(window.history.replaceState).toHaveBeenCalledWith({}, '', '?q=test');
    });
  });

  it('fetches and display users', async () => {
    const mockUsers = {
      data: [{ id: 1, name: 'Test User 1' }],
    };

    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    });

    const input = screen.getByPlaceholderText('Buscar usuario');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('Test User 1')).toBeDefined();
    });
  });

  it('Shows error message when fetch fails', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    const input = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error al buscar usuarios');
    });
  });

  it('Shows correct user on window history change', async () => {
    window.history.pushState({}, '', '?q=test');

    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: 1, name: 'Test User 1' }] }),
    });

    render(<Search />);

    await waitFor(() => {
      expect(screen.getByText('Test User 1')).toBeDefined();
    });
  });
});
