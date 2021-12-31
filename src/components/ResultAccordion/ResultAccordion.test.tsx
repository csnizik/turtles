import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
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
    userEvent.click(screen.getByRole('presentation'));
    expect(screen.getByText('Cover Crop'));
    userEvent.click(screen.getByText('Cover Crop'));
    expect(screen.getByText('Cover Crop Details'));
    userEvent.click(screen.getAllByRole('presentation')[0]);
    expect(screen.queryByText('Cover Crop')).not.toBeInTheDocument();
  });
});

describe('Verify ProductListGroup single result is rendered correctly', () => {
  beforeEach(() => {
    const searchInput = {
      practice_id: 20,
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
    await findByText('Cover Crop');
  });
});
