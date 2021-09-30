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

  test('Custom search page should contain a search button', () => {
    expect(screen.getByTestId('custom-search-button')).toBeInTheDocument();
  });
});
