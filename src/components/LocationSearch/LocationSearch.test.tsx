import LocationSearch from './LocationSearch';
import {
  cleanup,
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';
import { Provider } from 'react-redux';

afterEach(() => {
  cleanup();
});

let store;

describe('Location Search is rendered correctly', () => {
  store = createTestStore();

  test('Should select a location from the dropdown', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>
    );
    expect(
      screen.getByText('location-search.labels.select-state')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText('location-search.national'));

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: '08' },
    });
    let options = getAllByTestId('select-option');

    screen.debug();

    // fireEvent.click(screen.getByText('Colorado'));
    // expect(screen.getByTestId('select-option')).toHaveValue('08');
  });

  test('Should test the Explore Location button', () => {
    const { findByText } = render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(
      screen.getByText('location-search.explore-location')
    ).toBeInTheDocument();
  });
});
