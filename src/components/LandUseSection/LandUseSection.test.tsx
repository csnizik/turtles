import { Provider } from 'react-redux';
import { createTestStore } from '../../Redux/store';
import { setSearchInfo, setSearch } from '../../Redux/Slice/practiceSlice';
import LandUseSection from './LandUseSection';
import {
  fireEvent,
  cleanup,
  render,
  screen,
  waitFor,
} from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
const setSearchInfoMock = jest.fn();
const setCheckedStateMock = jest.fn();
const setSearchInputMock = jest.fn();
describe('Land use section is rendered correctly', () => {
  const checkedState = {
    'Other Farm and Rural Land': false,
    Cropland: false,
    'Developed land/Urban Ag': false,
    Forestland: false,
    Pasture: false,
    Rangeland: false,
    Protected: false,
  };
  const searchInfo = {
    resource_concern_category: null,
    resource_concern: null,
    practice_category: null,
    practice: null,
    land_use_list: 'Other Farm and Rural Land,Forestland,Cropland',
  };

  const searchInput = {
    resource_concern_category_id: null,
    resource_concern_id: null,
    practice_category_id: null,
    practice_id: null,
    state_county_code: '08000',
    land_use_list: '1,4,2',
    practices: null,
  };
  const store = createTestStore();
  store.dispatch(setSearchInfo(searchInfo));
  store.dispatch(setSearch(searchInput));

  beforeEach(async () => {
    const { findByText } = render(
      <Provider store={store}>
        <LandUseSection
          setSearchInput={setSearchInputMock}
          setSearchInfo={setSearchInfoMock}
          checkedState={checkedState}
          setCheckedState={setCheckedStateMock}
        />
      </Provider>
    );
    await findByText('Cropland');
  });

  test('Should display the group of checkboxes', async () => {
    expect(
      await screen.getByRole('group', {
        name: 'search-page.filter-by-land-use',
      })
    ).toBeDefined();
  });
  test('Should display the tooltip on mouseOver', async () => {
    // jest.setTimeout(30000);
    await waitFor(async () => {
      fireEvent.mouseOver(await screen.findByTestId('tooltp1'));
      const tooltipText = await screen.findAllByText(
        'Other Farm and Rural Land'
      );
      expect(tooltipText).toHaveLength(2);
    });
  });
  test('Should pass checked item to parent', async () => {
    await waitFor(async () => {
      fireEvent.click(await screen.getByTestId('checkbox1'));
      expect(setSearchInfoMock).toBeCalled();
    });
  });
  test('Should pass unchecked item to parent', async () => {
    await waitFor(async () => {
      fireEvent.click(await screen.getByTestId('checkbox1'));
      expect(setSearchInfoMock).toBeCalled();
      fireEvent.click(await screen.getByTestId('checkbox1'));
      expect(setSearchInfoMock).toBeCalled();
    });
  });
});
