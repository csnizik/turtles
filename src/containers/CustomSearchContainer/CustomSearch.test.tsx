import userEvent from '@testing-library/user-event';
import CustomSearch from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

afterEach(() => {
  cleanup();
});

describe('Custom search container is rendered correctly', () => {
  beforeEach(() => {
    render(<CustomSearch />);
  });

  test('Should display the contents of the custom search container', () => {
    expect(screen.getByTestId('custom-search-container')).toBeDefined();
  });

  test('Should display the Search Page Title', () => {
    expect(screen.getByText('search-page.quick-search')).toBeDefined();
  });

  test('Should display the Search Page Intro', () => {
    expect(screen.getByText('search-page.intro')).toBeDefined();
  });

  test('Should display the Search by Description', () => {
    expect(
      screen.getByText('search-by-conservation-practice.description')
    ).toBeDefined();
  });

  test('Should display Practices Dropdown Clear Button', () => {
    expect(
      screen.getByRole('button', {
        name: 'Clear Practices and Resource Concerns',
      })
    );
    expect(screen.getAllByText('actions.clear')).toBeDefined();
  });

  test('Should Clear the Practices Dropdowns', () => {
    const btn = screen.getByRole('button', {
      name: 'Clear Practices and Resource Concerns',
    });
    userEvent.click(btn);
    expect(
      screen.getByRole(
        (role, element) =>
          role === 'option' &&
          element?.textContent === 'All practices (default)'
      )
    );
    expect(
      screen.getByRole(
        (role, element) =>
          role === 'option' && element?.textContent === '- Select practice -'
      )
    );
    expect(
      screen.getByRole(
        (role, element) =>
          role === 'option' &&
          element?.textContent === 'All resource concerns (default)'
      )
    );
    expect(
      screen.getByRole(
        (role, element) =>
          role === 'option' &&
          element?.textContent === '- Select resource concern -'
      )
    );
  });

  xtest('Custom search page should contain a search button', () => {
    expect(screen.getByTestId('custom-search-button')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i }));
  });
});
