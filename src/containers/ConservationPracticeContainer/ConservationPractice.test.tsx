import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ConservationPracticeContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import ResourceConcernTreated from '../../components/ResourceConcernTreated';
import { createTestStore } from '../../Redux/store';
import { currentState } from '../../Redux/Slice/stateSlice';
import { Provider } from 'react-redux';
import { mswServer } from '../../api-mocks/msw-server';

const router = require('react-router-dom');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '06',
    category: '2',
  }),
}));

let store;
let viewType;

afterEach(() => {
  cleanup();
});

beforeAll(() => mswServer.listen({ onUnhandledRequest: 'bypass' }));

describe('Conservation Practice Page is rendered correctly', () => {
  viewType = 'practiceCategories';
  beforeEach(() => {
    const history = createMemoryHistory();
    jest.spyOn(router, 'useParams').mockReturnValue({
      stateCode: '06',
      category: '2',
    });
    render(
      <Router history={history}>
        <ConservationPracticeContainer
          currentPracticeCategoryId={2}
          currentSpecificPractice={-1}
        />
      </Router>
    );
  });

  xtest('Should display Conservation Practices BreadCrumb', () => {
    expect(screen.getByText('Conservation Practices')).toBeInTheDocument();
  });
});

//Tests are commented out until Tableau Report test has been added
xdescribe('Conservation Practice Individual Page is rendered correctly', () => {
  viewType = 'individualPractice';
  beforeEach(() => {
    jest.spyOn(router, 'useParams').mockReturnValue({
      stateCode: '06',
      category: '2',
      individual: '20',
    });
    const state = {
      stateNameDisplay: 'Colorado',
      stateCode: '06',
      stateAbbreviation: 'CO',
    };
    store = createTestStore();
    store.dispatch(currentState(state));
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={store}>
          <ConservationPracticeContainer
            currentPracticeCategoryId={2}
            currentSpecificPractice={20}
          />
        </Provider>
      </Router>
    );
  });

  test('Should display Individual Practice Page Projects & Initiatives Section', () => {
    expect(screen.getByTestId('pratice-title')).toBeDefined();
  });

  test('Should display Individual Practice Page Projects & Initiatives Title', () => {
    expect(
      screen.getByText('Colorado associated-projects-initiatives.title')
    ).toBeInTheDocument();
  });

  test('Should display Individual Practice Page Projects & Initiatives Description', () => {
    expect(
      screen.getByText('associated-projects-initiatives.description')
    ).toBeInTheDocument();
  });
});

xdescribe('Conservation Practice Video Section is rendered correctly', () => {
  beforeEach(() => {
    render(<ConservationPracticeVideo selectedPracticeId={9} />);
  });

  test('Should display the video section of the conservation practice', () => {
    expect(screen.queryByTestId('video-box-container')).toBeDefined();
  });

  test('Conservation Practice page should contain a video media section', () => {
    expect(screen.queryByTestId('video-media')).toBeDefined();
  });
});

xdescribe('Resource Concerns Treated Section is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ResourceConcernTreated selectedStateCode='01' selectedPracticeId={1} />
    );
  });

  test('Should display a static description', () => {
    expect(screen.queryByTestId('rc-description')).toBeDefined();
  });

  test('Should display an accordion for users to click', () => {
    expect(screen.queryByTestId('rc-accordion')).toBeDefined();
  });
});
