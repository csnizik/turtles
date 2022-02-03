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
    const state = {
      stateNameDisplay: 'Colorado',
      stateCode: '06',
      stateAbbreviation: 'CO',
    };
    store = createTestStore();
    store.dispatch(currentState(state));
    render(
      <Provider store={store}>
        <ProjectsContainer />
      </Provider>
    );
  });

  test('Should display the Side Tabs and Links of the projects container', () => {
    expect(
      screen.getByText('All Colorado Projects & Initiatives')
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

  test('Should Click through the Projects And Initiatives Tabs', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick} />);
    fireEvent.click(getByText(/All Colorado Projects & Initiatives/i));
    expect(
      screen.getByText(
        'Targeting Program dollars to advance specific natural resource objectives'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Conservation Innovation Grants')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Landscape Conservation Initiatives')
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole('img', {
          name: /Map of the United States/i,
        })
        .closest('img')
    ).toHaveAttribute('src', '../images/grantMap.png');
    expect(
      screen
        .getByRole('img', {
          name: /Map of Landscape Conservation Initiatives in the United States/i,
        })
        .closest('img')
    ).toHaveAttribute('src', '../images/landscapeMap.png');
    expect(
      fireEvent.click(
        getByText((content: any, element: any) => {
          if (element) {
            return (
              element.tagName.toLowerCase() === 'h2' &&
              content.startsWith('Conservation Innovation Grants')
            );
          }
        })
      )
    );
    expect(
      screen.getByText((content: any) =>
        content.startsWith(
          'Conservation Innovation Grants (CIG) is a competitive'
        )
      )
    ).toBeInTheDocument();
    expect(
      screen
        .getByLabelText('Conservation Innovation Grants link opens a new tab')
        .closest('a')
    ).toHaveAttribute('href', 'https://cig.sc.egov.usda.gov/');
    expect(
      screen
        .getByLabelText('Conservation Innovation Grants link opens a new tab')
        .closest('a')
    ).toHaveAttribute('target', '_blank');
    expect(
      screen
        .getByLabelText(
          'Conservation Innovation Grants link opens in a new tab'
        )
        .closest('a')
    ).toHaveAttribute('href', '/search');
    expect(
      screen
        .getByLabelText(
          'Conservation Innovation Grants link opens in a new tab'
        )
        .closest('a')
    ).toHaveAttribute('target', '_blank');
    fireEvent.click(getByText(/Landscape Conservation Initiatives/i));
    expect(
      screen.getByText((content: any) =>
        content.startsWith('NRCS uses Landscape Conservation')
      )
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
