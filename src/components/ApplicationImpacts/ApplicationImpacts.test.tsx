import ApplicationImpacts from './ApplicationImpacts';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
let testData = {
  practiceId: 20,
  practiceImage: '',
  practiceOverview: 'Cover and green manure crops ',
  practiceInfo:
    'Cover and green manure crops are grown on land where seasonal or long-term benefits',
  practiceCode: '340',
  practiceName: 'Cover Crop',
};
let testSuccess = true;

describe('ApplicationImpacts is rendered correctly', () => {
  beforeEach(() => {
    render(<ApplicationImpacts data={testData} isSuccess={testSuccess} />);
  });

  test('Should display the contents of ApplicationImpacts', () => {
    expect(screen.getByTestId('app-impact')).toBeDefined();
  });
});
