import ResultsContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Results container is rendered correctly', () => {
  beforeEach(() => {
    render(<ResultsContainer />);
  });

  test('Should display the contents of the Results container', () => {
    expect(screen.getByTestId('results-container')).toBeDefined();
  });

  test('Should display Top Search title', () => {
    expect(screen.getByText('search-results-page.header')).toBeInTheDocument();
  });

  test('Should display Project Initiatives title', () => {
    expect(
      screen.getByText('search-results-page.project-initiatives')
    ).toBeInTheDocument();
  });
});
