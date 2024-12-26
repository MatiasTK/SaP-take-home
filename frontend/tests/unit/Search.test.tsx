import Search from '@/components/Search';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import toast from 'react-hot-toast';
import mockFetch from '../utils/testUtils';

describe('Search Component', () => {
  beforeEach(() => {
    cleanup();
    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('01 - Renders search input', () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');
    const searchInfo = screen.getByTestId('no-users');

    expect(searchInput).toBeDefined();
    expect(searchInfo).toBeDefined();
    expect(searchInput).toHaveProperty('value', '');
  });

  it('02 - Show error when searching without users', async () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'Juan' } });

    const searchInfo = await screen.findByTestId('not-found');

    expect(searchInfo).toBeDefined();
  });

  it('03 - Show error when searching inexistent user', async () => {
    // Mock API response
    mockFetch('Hernesto');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'Hernesto' } });

    const searchInfo = await screen.findByTestId('not-found');

    expect(searchInfo).toBeDefined();
  });

  it('04 - Search user by name', async () => {
    // Mock API response
    mockFetch('Juan');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'Juan' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('Juan');
  });

  it('05 - Search user by id', async () => {
    // Mock API response
    mockFetch('1');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: '1' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards.length).toBeGreaterThanOrEqual(1);
    expect(cards[0].textContent).toContain('1');
  });

  it('06 - Search user by email', async () => {
    // Mock API response
    mockFetch('juan.perez@example.com');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'juan.perez@example.com' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('juan.perez@example.com');
  });

  it('07 - Search user by phone', async () => {
    // Mock API response
    mockFetch('555-1234');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: '555-1234' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('555-1234');
  });

  it('08 - Search user by surname', async () => {
    // Mock API response
    mockFetch('Pérez');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'Pérez' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('Pérez');
  });

  it('09 - Search user by register date', async () => {
    // Mock API response
    mockFetch('2024-01-15');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: '2024-01-15' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('2024-01-15');
  });

  it('10 - Search user by account status', async () => {
    // Mock API response
    mockFetch('true');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'true' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards.length).toBeGreaterThanOrEqual(1);
    expect(cards[0].textContent).toContain('true');
  });

  it('11 - Partial search and case insensitive', async () => {
    // Mock API response
    mockFetch('pErEZ@eXaMple');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'pErEZ@eXaMple' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('juan.perez@example.com');
  });

  it('12 - Search multiple users', async () => {
    // Mock API response
    mockFetch('ez');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'ez' } });

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();

    // Peréz, Gonzalez, Lopez, Martinez
    expect(cards).toHaveLength(4);
  });

  it('13 - Updates cards on search change', async () => {
    // Mock API response
    mockFetch('Juan');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'Juan' } });

    let cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('Juan');

    // Mock API response
    mockFetch('Maria');

    fireEvent.change(searchInput, { target: { value: 'Maria' } });

    cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('Maria');
  });

  it('14 - Show error when API fails', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
      }) as Promise<Response>;
    });

    // Mock toast
    vi.spyOn(toast, 'error');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'Juan' } });

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });

  it('15 - Updates url search param on search', async () => {
    // Mock API response
    mockFetch('Juan');

    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Buscar usuario');

    fireEvent.change(searchInput, { target: { value: 'Juan' } });

    await waitFor(() => expect(window.location.search).toBe('?q=Juan'));
  });

  it('16 - Show users from url search param', async () => {
    // Mock API response
    mockFetch('Juan');

    window.history.pushState({}, '', '?q=Juan');

    render(<Search />);

    const cards = await screen.findAllByTestId('user-card');

    expect(cards).toBeDefined();
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('Juan');
  });
});
