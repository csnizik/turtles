import ProjectListGroup from '../ProjectListGroup';
import { createTestStore } from '../../Redux/store';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

let store;
describe('Exception Message is rendered correctly', () => {

  beforeEach(() => {

    const searchInput = {
        state_county_code: '09',
    };
    store = createTestStore();
    store.dispatch(setSearch(searchInput));

    render(
      <ProjectListGroup
        isMapDisplayed={false}
      />
    );
  });

  test('Should display the Exception Message Component', () => {
    expect(screen.getByTestId('exception-content-container')).toBeDefined();
  });
  test('Should display the Exception Message title', () => {
    expect(screen.getByTestId('exception-content-title')).toBeDefined();
  });
  test('Should display the Exception Message description', () => {
    expect(screen.getByTestId('exception-content-description')).toBeDefined();
  });
});
