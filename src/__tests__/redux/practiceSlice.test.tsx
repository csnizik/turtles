import reducer, {
  setPracticeCategory,
  setSpecificPractice,
  setLandUse,
  setSearchInfo,
} from '../../Redux/Slice/practiceSlice';
import { createTestStore } from '../../Redux/store';

let store;

describe('Confirm practice slices and actions are working properly', () => {
  beforeAll(() => {
    store = createTestStore();
  });

  test('Should handle land use state being added to an empty object', () => {
    const initialLandUseState: any = {
      'Other Farm and Rural Land': false,
      Cropland: true,
      'Developed land/Urban Ag': false,
      Forestland: false,
      Pasture: false,
      Rangeland: false,
      Protected: false,
    };

    const landUseAction = store.dispatch(setLandUse(initialLandUseState));
    expect(landUseAction.type).toEqual('practiceSlice/setLandUse');
  });

  test('setPracticeCategory slice', () => {
    const practiceCategoryPayload = {
      type: 'practiceSlice/setPracticeCategory',
      payload: -1,
    };
    const practiceCategoryAction = store.dispatch(setPracticeCategory(-1));
    expect(practiceCategoryAction.type).toEqual(
      'practiceSlice/setPracticeCategory'
    );
  });

  test('setSpecificPractice slice', () => {
    const practiceCategoryAction = store.dispatch(setSpecificPractice(11));
    expect(practiceCategoryAction.type).toEqual(
      'practiceSlice/setSpecificPractice'
    );
  });

  test('setSearchInfo slice', () => {
    const setSearchInfoAction = store.dispatch(
      setSearchInfo({
        land_use_list: null,
      })
    );
    expect(setSearchInfoAction.type).toEqual('practiceSlice/setSearchInfo');
  });
});
