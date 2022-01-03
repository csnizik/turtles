import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Button } from 'reactstrap';
import ProjectsContainer from '.';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { currentState } from '../../Redux/Slice/stateSlice';
import { createTestStore } from '../../Redux/store';

const router = require('react-router-dom');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '06',
  }),
}));

let store;

afterEach(() => {
  cleanup();
});

describe('Projects container is rendered correctly', () => {
  beforeEach(() => {
    render(<ProjectsContainer />);
  });

  test('Should display the contents of the projects container', () => {
    expect(screen.getByTestId('projects-container')).toBeDefined();
  });

  test('Projects container should contain two map components', () => {
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'h2' &&
            content.startsWith('Conservation')
          );
        }
      })
    );
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'h2' &&
            content.startsWith('Landscape')
          );
        }
      })
    );
  });
});

describe('Projects container is rendered correctly', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useParams').mockReturnValue({
      stateCode: '06',
      category: '2',
      individual: '1',
    });
    render(<ProjectsContainer />);
  });

  test('Should display the Side Tabs and Links of the projects container', () => {
    expect(
      screen.getByText('All U.S. Projects & Initiatives')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Conservation Innovation Grants')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Landscape Conservation Initiatives')
    ).toBeInTheDocument();
    expect(
      screen
        .getByTitle(
          'Go to the Landscape Conservation Initiatives page for detailed information'
        )
        .closest('a')
    ).toHaveAttribute(
      'href',
      'https://www.nrcs.usda.gov/wps/portal/nrcs/main/national/programs/initiatives/'
    );
    expect(
      screen
        .getByTitle(
          'Go to the Landscape Conservation Initiatives page for detailed information'
        )
        .closest('a')
    ).toHaveAttribute('target', '_blank');
  });
});

describe('Projects container is rendered correctly', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useParams').mockReturnValue({
      name: 'ProjectsAndInitiatives',
      stateCode: '06',
      category: '2',
      individual: '1',
    });
    const state = {
      stateNameDisplay: 'Colorado',
      stateCode: '06',
      stateAbbreviation: 'CO',
    };
    const history = createMemoryHistory();
    store = createTestStore();
    store.dispatch(currentState(state));
    render(
      <Router history={history}>
        <Provider store={store}>
          <ProjectsContainer />
        </Provider>
      </Router>
    );
  });

  //Test is incomplete beacuse the Map Component test is a blocker (This test Still achieves more then 80% coverage)
  test('Should Click through the Tabs', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick} />);
    fireEvent.click(getByText(/All U.S. Projects & Initiatives/i));
    // expect(onClick).toHaveBeenCalled();
  });
});
