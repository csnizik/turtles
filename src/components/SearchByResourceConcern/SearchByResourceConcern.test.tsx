import { Provider } from 'react-redux';
import SearchByResourceConcern from './SearchByResourceConcern';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';

afterEach(() => {
  cleanup();
});

let setSearchInput = jest.fn;
let setSearchInfo = jest.fn;
let setResourceConcernsSubgroups = jest.fn;
let selectedResourceCategory = jest.fn;
let setSelectedResourceCategory = jest.fn;
let selectedPractice = jest.fn;
let practiceId = jest.fn;
let selectedResourceConcern = {};
let setSelectedResourceConcern = jest.fn;
let store;

describe('SearchByResourceConcern is rendered correctly', () => {
  store = createTestStore();

  test('Should test dropdown and resource category selection functionality', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <SearchByResourceConcern
          setSearchInput={setSearchInput}
          setSearchInfo={setSearchInfo}
          setResourceConcernsSubgroups={setResourceConcernsSubgroups}
          selectedResourceCategory={selectedResourceCategory}
          setSelectedResourceCategory={setSelectedResourceCategory}
          selectedPractice={selectedPractice}
          practiceId={practiceId}
          selectedResourceConcern={selectedResourceConcern}
          setSelectedResourceConcern={setSelectedResourceConcern}
        />
      </Provider>
    );
    await findByText('Air');

    fireEvent.click(screen.getByText('Air'));

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: '3' },
    });

    await findByText('Emissions of ozone precursors');
    screen.debug();
    // expect(screen.getByTestId('select')).toHaveValue('08');

    //   await findByText('actions.clear');
    //   fireEvent.click(screen.getByText('actions.clear'));
  });

  // test('Should display the contents of SearchByResourceConcern', () => {
  //   expect(screen.getByTestId('rc-search')).toBeDefined();
  // });
});
