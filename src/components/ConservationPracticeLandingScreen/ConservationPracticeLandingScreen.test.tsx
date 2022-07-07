import { Provider } from 'react-redux';
import ConservationPracticeLandingScreen from './ConservationPracticeLandingScreen';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { setStaticText } from '../../Redux/Slice/staticTextSlice';
import { staticText } from '../../api-mocks/constants';
import { createTestStore } from '../../Redux/store';

afterEach(() => {
  cleanup();
});
const setPracticeViewType = () => {};
const stateCode = '06';

describe('ConservationPracticeLandingScreen is rendered correctly', () => {
  beforeEach(() => {
    let store;
    store = createTestStore();
    store.dispatch(setStaticText(staticText));
    render(
      <Provider store={store}>
        <ConservationPracticeLandingScreen
          setPracticeViewType={setPracticeViewType}
          stateCode={stateCode}
        />
      </Provider>
    );
  });

  test('Should display the contents of ConservationPracticeLandingScreen', () => {
    expect(screen.getByTestId('conserv-prac-land-screen')).toBeDefined();
  });
});
