import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import ResultsContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';
import { setStaticText } from '../../Redux/Slice/staticTextSlice';
import { staticText } from '../../api-mocks/constants';

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
  const store = createTestStore();
  store.dispatch(setStaticText(staticText));
  beforeEach(() => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Provider store={store}>
          <ResultsContainer />
        </Provider>
      </Router>
    );
  });

  test('Should display the contents of the Results container', () => {
    expect(screen.queryByTestId('results-container')).toBeDefined();
  });

  test('Should display Top Search title', async () => {
    expect(
      screen.getByText(
        staticText.data.QuickSearchResultsTitle.configurationValue
      )
    ).toBeInTheDocument();
  });

  test('Should display Project Initiatives title', () => {
    expect(
      screen.queryByText(
        staticText.data.QuickSearchResultsHeading2.configurationValue
      )
    ).toBeInTheDocument();
  });
});
