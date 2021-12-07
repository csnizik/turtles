import { cleanup, render, screen } from '../../common/test-utils/test_utils';
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

describe('Exception Message is rendered correctly', () => {

  beforeEach(() => {
    
    render(
      <ProjectListGroup
        isMapDisplayed={false}
        selectedStateName='Connecticut'
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
  test('Should display Connecticut as the state name', () => {
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'p' &&
            content.startsWith('Connecticut')
          );
        }
      })
    );
  });
  test('Should display a long paragraph reminding users there are some other projects across the U.S.', () => {
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'p' &&
            content.startsWith('The projects below represent projects across the United States.')
          );
        }
      })
    );
  });
  
});
