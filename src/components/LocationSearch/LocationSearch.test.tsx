import LocationSearch from './LocationSearch';
import {
  cleanup,
  fireEvent,
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

  test('Should test dropdown and state selection functionality', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>
    );
    expect(
      screen.getByText('location-search.labels.select-state')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('location-search.national'));

    await findByText('Colorado');

    fireEvent.click(screen.getByText('Colorado'));

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: '08' },
    });

    expect(screen.getByTestId('select')).toHaveValue('08');

    fireEvent.click(screen.getByRole('button'));

    expect(
      screen
        .getByRole('img', {
          name: /Map of the United States/i,
        })
        .closest('img')
    ).toHaveAttribute('src', 'images/homePageUSMap.png');
  });
});
