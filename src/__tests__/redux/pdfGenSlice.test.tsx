import reducer, {
  disablePdfGenState,
  enablePdfGenState,
} from '../../Redux/Slice/pdfGenSlice';
import { createTestStore } from '../../Redux/store';

let store;

describe('Confirm pdf slices and actions are working properly', () => {
  beforeAll(() => {
    store = createTestStore();
  });

  test('disablePdfGenState slice', () => {
    const disablePdfGenStateAction = store.dispatch(disablePdfGenState());
    expect(disablePdfGenStateAction.type).toEqual('pdfGen/disablePdfGenState');
  });

  test('enablePdfGenState slice', () => {
    const enablePdfGenStateAction = store.dispatch(enablePdfGenState());
    expect(enablePdfGenStateAction.type).toEqual('pdfGen/enablePdfGenState');
  });
});
