import { Provider } from 'react-redux';
import Filters from './Filters';
import { setSearchInfo } from '../../Redux/Slice/practiceSlice';
import { createTestStore } from '../../Redux/store';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
const searchInput = {
  resource_concern_category: null,
  resource_concern: null,
  practice_category: 'Cropland Soil Quality',
  practice: 'Cover Crop',
  state: 'Colorado',
  land_use_list: 'Cropland',
};

let store;

describe('Filters is rendered correctly', () => {
  beforeEach(() => {
    store = createTestStore();
    store.dispatch(setSearchInfo(searchInput));
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
  });

  test('Should display the contents of Filters', () => {
    expect(screen.getByTestId('filters')).toBeDefined();
  });

  test('Should display the location from the search inputs', () => {
    expect(screen.getByText('Colorado')).toBeInTheDocument();
  });

  test('Should display the landuse from the search inputs', () => {
    expect(screen.getByText('Cropland')).toBeInTheDocument();
  });

  test('Should display the conservation practice from the search inputs', () => {
    expect(screen.getByText('Cover Crop')).toBeInTheDocument();
  });
});
