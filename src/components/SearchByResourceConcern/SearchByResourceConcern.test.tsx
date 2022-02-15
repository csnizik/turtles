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
const spy = jest.fn().mockReturnValue(() => {});

let setSearchInput = jest.fn;
let setSearchInfo = jest.fn;
let setResourceConcernsSubgroups = jest.fn;
let selectedResourceCategory = jest.fn;
let setSelectedResourceCategory = spy;
let selectedPractice = jest.fn;
let practiceId = jest.fn;
let selectedResourceConcern = {};
let setSelectedResourceConcern = spy;
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

    expect(setSelectedResourceCategory).toHaveBeenCalled();

    await findByText('Emissions of ozone precursors');

    fireEvent.click(screen.getByText('Emissions of ozone precursors'));

    fireEvent.change(screen.getByTestId('subselect'), {
      target: { value: '180' },
    });
    expect(setSelectedResourceConcern).toHaveBeenCalled();
  });

  test('Should display the contents of SearchByResourceConcern', () => {
    render(
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
    expect(screen.getByTestId('rc-search')).toBeDefined();
  });
});
