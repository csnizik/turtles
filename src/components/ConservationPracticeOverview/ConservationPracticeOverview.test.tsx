import ConservationPracticeOverview from './ConservationPracticeOverview';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
let data = {
  practiceId: 20,
  practiceImage: '',
  practiceOverview: 'Cover and green manure',
  practiceInfo: 'Cover and green manure crops are grown on land',
  practiceCode: '340',
  practiceName: 'Cover Crop',
};
let error;
let isLoading = false;
let isSuccess = true;
let isError = false;
describe('ConservationPracticeOverview is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ConservationPracticeOverview
        data={data}
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
        errors={isError}
      />
    );
  });

  test('Should display the contents of ConservationPracticeOverview', () => {
    expect(screen.getByTestId('consrv-prac-overview')).toBeDefined();
  });
});
