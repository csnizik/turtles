import { Provider } from 'react-redux';
import SearchByLocation from './SearchByLocation';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';

afterEach(() => {
  cleanup();
});

let store;
let setSearchInput = jest.fn;
let setSearchInfo = jest.fn;

describe('SearchByLocation is rendered correctly', () => {
  store = createTestStore();

  test('Should test dropdown and state selection functionality', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <SearchByLocation
          setSearchInput={setSearchInput}
          setSearchInfo={setSearchInfo}
        />
      </Provider>
    );
    expect(screen.getByTestId('location-search')).toBeDefined();

    await findByText('Colorado');

    fireEvent.click(screen.getByText('Colorado'));

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: '08' },
    });

    expect(screen.getByTestId('select')).toHaveValue('08');

    await findByText('actions.clear');
    fireEvent.click(screen.getByText('actions.clear'));
  });
});
