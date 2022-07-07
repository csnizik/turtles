import { Provider } from 'react-redux';
import SearchBar from './SearchBar';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';
import { ISearchData } from '../../common/types';
import { setSearch } from '../../Redux/Slice/practiceSlice';

afterEach(() => {
  cleanup();
});

const searchInput: ISearchData = {
  resource_concern_category_id: null,
  resource_concern_id: null,
  practice_category_id: null,
  practice_id: null,
  state_county_code: null,
  land_use_list: null,
  practices: null,
  free_text: 'water',
};

let store;

describe('Search bar is rendered correctly', () => {
  store = createTestStore();

  store.dispatch(setSearch(searchInput));

  test('Should test free text searching functionality', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <SearchBar searchInput={searchInput} />
      </Provider>
    );

    expect(
      screen.getByText('text-search.labels.enter-search-criteria')
    ).toBeInTheDocument();

    expect(screen.getByTestId('search-field')).toHaveValue('water');

    fireEvent.change(screen.getByTestId('search-field'), {
      target: { value: 'agriculture' },
    });

    expect(screen.getByTestId('search-field')).toHaveValue('agriculture');
  });
});
