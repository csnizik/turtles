import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ResultsContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '08',
  }),
}));

describe('Results container is rendered correctly', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ResultsContainer />
      </Router>
    );
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
