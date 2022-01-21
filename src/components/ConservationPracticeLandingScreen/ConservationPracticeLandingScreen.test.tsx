import ConservationPracticeLandingScreen from './ConservationPracticeLandingScreen';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
let setPracticeViewType = () => {};
let stateCode = '06';

describe('ConservationPracticeLandingScreen is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ConservationPracticeLandingScreen
        setPracticeViewType={setPracticeViewType}
        stateCode={stateCode}
      />
    );
  });

  test('Should display the contents of ConservationPracticeLandingScreen', () => {
    expect(screen.getByTestId('conserv-prac-land-screen')).toBeDefined();
  });
});
