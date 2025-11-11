import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

beforeEach(() => {
  // Default mock: return empty array
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const emptyMessage = await screen.findByText(/no todos yet/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('calculates and displays correct stats', async () => {
  const testQueryClient = createTestQueryClient();

  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockTodos),
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for stats to appear
  const itemsLeftChip = await screen.findByText(/2 items left/i);
  const completedChip = await screen.findByText(/1 completed/i);

  expect(itemsLeftChip).toBeInTheDocument();
  expect(completedChip).toBeInTheDocument();
});

test('deletes todo when delete button is clicked', async () => {
  const testQueryClient = createTestQueryClient();

  const mockTodos = [
    { id: 1, title: 'Todo to delete', completed: false },
  ];

  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todo to appear
  await screen.findByText('Todo to delete');

  // Click delete button
  const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
  fireEvent.click(deleteButton);

  // Verify DELETE fetch was called
  await waitFor(() => {
    const deleteCalls = global.fetch.mock.calls.filter(
      (call) => call[1]?.method === 'DELETE'
    );
    expect(deleteCalls.length).toBeGreaterThan(0);
  });
});

test('displays error message when API fails', async () => {
  const testQueryClient = createTestQueryClient();

  global.fetch.mockRejectedValue(new Error('API Error'));

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const errorMessage = await screen.findByText(/failed to load/i);
  expect(errorMessage).toBeInTheDocument();
});

