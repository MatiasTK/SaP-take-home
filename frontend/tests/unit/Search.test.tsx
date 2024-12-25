import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor, render, cleanup } from '@testing-library/react';
import Search from '@/components/Search';
import toast from 'react-hot-toast';
import usersMock from '../data/mock.json';

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Copy of what the backend does
const mockUsers = (filter: string) => {
  global.fetch = vi.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: usersMock.data.filter((user: { [key: string]: string }) => {
            return Object.keys(user).some((key) => {
              return user[key].toString().toLowerCase().includes(filter.toString().toLowerCase());
            });
          }),
        }),
    } as Response);
  });
};

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<Search />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders search input', () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    const info = screen.getByTestId('no-users');

    expect(input).toBeDefined();
    expect(input).toHaveProperty('value', '');
    expect(info).toBeDefined();
  });

  it('search without users', () => {
    const input = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(input, { target: { value: 'Juan' } });

    const info = screen.getByTestId('not-found');
    expect(info).toBeDefined();
  });

  it('search with invalid user', () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('hernesto');

    fireEvent.change(input, { target: { value: 'hernesto' } });

    const info = screen.getByTestId('not-found');

    expect(info).toBeDefined();
  });

  it('search with valid user name', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('Juan');

    fireEvent.change(input, { target: { value: 'Juan' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('Juan');
    });
  });

  it('search with valid user id', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('1');

    fireEvent.change(input, { target: { value: '1' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('1');
    });
  });

  it('search with valid user email', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('juan.perez@example.com');

    fireEvent.change(input, { target: { value: 'juan.perez@example.com' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('juan.perez@example.com');
    });
  });

  it('search with valid user phone', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('555-1234');

    fireEvent.change(input, { target: { value: '555-1234' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('555-1234');
    });
  });

  it('search with valid surname', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('Pérez');

    fireEvent.change(input, { target: { value: 'Pérez' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('Pérez');
    });
  });

  it('search with valid register date', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('2024-01-15');

    fireEvent.change(input, { target: { value: '2024-01-15' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('2024-01-15');
    });
  });

  it('search with account status', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('true');

    fireEvent.change(input, { target: { value: 'true' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('true');
    });
  });

  it('search with partial match and insensitive case', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('pErEZ@eXaMple');

    fireEvent.change(input, { target: { value: 'pErEZ@eXaMple' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('juan.perez@example.com');
    });
  });

  it('search multiple users', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('ez');

    fireEvent.change(input, { target: { value: 'ez' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();

      // Peréz, Gonzalez, Lopez, Martinez
      expect(cards).toHaveLength(4);
    });
  });

  it('updates the search on change', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    mockUsers('Juan');

    fireEvent.change(input, { target: { value: 'Juan' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('Juan');
    });

    mockUsers('Maria');

    fireEvent.change(input, { target: { value: 'Maria' } });

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);

      const uniqueCard = cards[0];

      expect(uniqueCard?.textContent).toContain('Maria');
    });
  });

  it('shows error on fetch fail', async () => {
    const input = screen.getByPlaceholderText('Buscar usuario');
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: false,
      } as Response);
    });

    fireEvent.change(input, { target: { value: 'Juan' } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('updates url on search', async () => {
    global.history.replaceState = vi.fn();

    // Re-render search
    cleanup();
    render(<Search />);

    const input = screen.getByPlaceholderText('Buscar usuario');
    const search = 'Juan';

    fireEvent.change(input, { target: { value: search } });

    waitFor(() => {
      expect(window.location.search).toBe(`?q=${search}`);
    });
  });

  it('shows correct users on url change', async () => {
    mockUsers('Juan');
    history.pushState({}, '', '?q=Juan');

    // Re-render search
    cleanup();
    render(<Search />);

    await waitFor(() => {
      const cards = screen.getAllByTestId('user-card');

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(1);
    });
  });
});
