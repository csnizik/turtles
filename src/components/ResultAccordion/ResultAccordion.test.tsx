import { Provider } from 'react-redux';
import { cleanup, render } from '../../common/test-utils/test_utils';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import { createTestStore } from '../../Redux/store';
import ResultAccordion from './ResultAccordion';

afterEach(() => {
  cleanup();
});
let store;

describe('Verify ProductListGroup is rendered correctly', () => {
  beforeEach(() => {
    const searchInput = {
      practice_category_id: 3,
    };
    store = createTestStore();
    store.dispatch(setSearch(searchInput));
  });
  test('Verify project component', async () => {
    // Create a redux store
    const { findByText } = render(
      <Provider store={store}>
        <ResultAccordion />
      </Provider>
    );
    await findByText('Cropland Soil Health & Sustainability');
  });
});
