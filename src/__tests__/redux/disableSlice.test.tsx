import reducer, {
  disableResourceDropdown,
  disablePracticeDropdown,
} from '../../Redux/Slice/disableSlice';
import { createTestStore } from '../../Redux/store';

let store;

describe('Confirm disable slices and actions are working properly', () => {
  beforeAll(() => {
    store = createTestStore();
  });

  test('disableResourceDropdown slice', () => {
    const disableDropdownAction = store.dispatch(disableResourceDropdown());
    expect(disableDropdownAction.type).toEqual(
      'disable/disableResourceDropdown'
    );
  });

  test('disablePracticeDropdown slice', () => {
    const disablePracticeDropdownAction = store.dispatch(
      disablePracticeDropdown()
    );
    expect(disablePracticeDropdownAction.type).toEqual(
      'disable/disablePracticeDropdown'
    );
  });
});
