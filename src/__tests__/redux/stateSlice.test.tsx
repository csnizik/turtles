import reducer, { currentState } from '../../Redux/Slice/stateSlice';
import { createTestStore } from '../../Redux/store';

let store;

describe('Confirm state slices and actions are working properly', () => {
  beforeAll(() => {
    store = createTestStore();
  });

  test('currentState action', () => {
    const intialState = {
      stateNameDisplay: 'U.S.',
      stateCode: '00',
      stateAbbreviation: 'U.S.',
    };
    const currentStateAction = store.dispatch(currentState(intialState));
    expect(currentStateAction.type).toEqual('state/currentState');
  });
});
