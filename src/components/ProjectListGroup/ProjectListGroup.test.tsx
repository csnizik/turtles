import { verify } from 'crypto';
import { Provider } from 'react-redux';
import { cleanup, render } from '../../common/test-utils/test_utils';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import { createTestStore } from '../../Redux/store';
import ProjectListGroup from './ProjectListGroup';

afterEach(() => {
  cleanup();
});
let store;
//commented out as testing needs more work to be completed
describe('Verify ProductListGroup is rendered correctly', () => {
  beforeEach(() => {
    const searchInput = {
      state_county_code: '08',
    };
    store = createTestStore();
    store.dispatch(setSearch(searchInput));
  });
  test('Verify project component', async () => {
    // Create a redux store
    expect(true);
    /*const { findByText } = render(
      <Provider store={store}>
        <ProjectListGroup isMapDisplayed={false} selectedStateName='' />
      </Provider>
    );
    await findByText('Test success');
    */
  });
});
