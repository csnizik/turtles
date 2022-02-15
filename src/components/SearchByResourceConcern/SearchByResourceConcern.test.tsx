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

describe('SearchByResourceConcern, resource concern selected', () => {
  store = createTestStore();

  test('Resource concern treated should pass selected resource concern value to parent', async () => {
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

    await findByText('Emissions of ozone precursors');

    fireEvent.click(screen.getByText('Emissions of ozone precursors'));

    fireEvent.change(screen.getByTestId('subselect'), {
      target: { value: 180 },
    });
    expect(setSelectedResourceConcern).toHaveBeenCalledWith({ id: 180 });
  });
});

describe('SearchByResourceConcern, resource concern default', () => {
  store = createTestStore();

  test('Resource concern treated should pass default selected resource concern value to parent', async () => {
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

    await findByText('- Select resource concern -');

    fireEvent.click(screen.getByText('- Select resource concern -'));

    fireEvent.change(screen.getByTestId('subselect'), {
      target: { value: '' },
    });
    expect(setSelectedResourceConcern).toHaveBeenCalledWith({ id: -1 });
  });
});

describe('SearchByResourceConcern, resource category selected', () => {
  store = createTestStore();
  test('Resource Concerns Treated should pass selected resource category value to parent', async () => {
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
    expect(setSelectedResourceCategory).toHaveBeenCalledWith({ id: '3' });
  });
});

describe('SearchByResourceConcern, resource category default', () => {
  store = createTestStore();
  test('Resource Concerns Treated should pass selected default resource category value to parent', async () => {
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

    await findByText('All resource concerns (default)');
    fireEvent.click(screen.getByText('All resource concerns (default)'));
    fireEvent.change(screen.getByTestId('select'), {
      target: { value: '' },
    });
    expect(setSelectedResourceCategory).toHaveBeenCalledWith({ id: -1 });
  });
});

describe('SearchByResourceConcern is rendered correctly', () => {
  store = createTestStore();
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
