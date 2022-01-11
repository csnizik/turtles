import LocationContainer from '.';
import { Provider } from 'react-redux';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';
import { currentState } from '../../Redux/Slice/stateSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '06',
    Name: 'ConservationPractice',
  }),
}));

let store;

afterEach(() => {
  cleanup();
});

describe('Location Container is rendered correctly', () => {
  beforeEach(() => {
    const state = {
      stateNameDisplay: 'Colorado',
      stateCode: '06',
      stateAbbreviation: 'CO',
    };
    store = createTestStore();
    store.dispatch(currentState(state));
    render(
      <Provider store={store}>
        <LocationContainer />
      </Provider>
    );
  });

  test('Should display Location Container Tabs', () => {
    expect(screen.getByText('U.S. Conservation Practices')).toBeInTheDocument();
    expect(
      screen.getByText('U.S. Projects And Initiatives')
    ).toBeInTheDocument();
  });
});
