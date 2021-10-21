import SpecificationsAndTools from './SpecificationsAndTools';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('SpecificationsAndTools is rendered correctly', () => {
  const data = {
    practiceId: 23,
    practiceImage: '',
    practiceOverview:
      'Contour farming is generally used on sloping land where tillage, planting, and cultivation are used to grow annual crops. In a properly designed contour farming system the tillage furrows intercept runoff and allow more moisture to infiltrate into the soil. Contour farming is most effective on slopes between 2 and 10 percent.',
    practiceInfo:
      'Contour farming is generally used on sloping land where tillage, planting, and cultivation are used to grow annual crops. In a properly designed contour farming system the tillage furrows intercept runoff and allow more moisture to infiltrate into the soil. Contour farming is most effective on slopes between 2 and 10 percent. Conservation benefits may include, but are not limited to— • Reduced sheet and rill erosion. • Reduced sediment transport to surface waters • Reduce excess nutrients in surface waters • Reduce pesticide transport to surface waters • Increased water infiltration. To maintain the effectiveness of this practice, all tillage and planting operations must be parallel to the established markers.',
    practiceCode: '330',
    practiceName: 'Contour Farming',
  };
  const isSuccess = true;
  const selectedStateCode = '06';
  const selectedPracticeId = 23;

  beforeEach(() => {
    render(
      <SpecificationsAndTools
        data={data}
        isSuccess={isSuccess}
        selectedStateCode={selectedStateCode}
        selectedPracticeId={selectedPracticeId}
      />
    );
  });

  test('Should display the contents of SpecificationsAndTools', () => {
    expect(screen.getByTestId('practice-spec')).toBeDefined();
  });
});
