import SpecificationsAndTools from './SpecificationsAndTools';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    name: 'ConservationPractices',
  }),
}));

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
  const selectedPracticeCategory = 2;

  const name = 'ConservationPractices';
  const practiceName = 'Cover Crop';

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
  test('Should display the contents of National Specifications', () => {
    expect(screen.getByTestId('national-specifications')).toBeDefined();
  });
  test('Should display the contents of State Specifications', () => {
    expect(screen.getByTestId('state-specifications')).toBeDefined();
  });
  test('Should display the contents of Associated Practices', () => {
    expect(screen.getByTestId('associated-practice')).toBeDefined();
  });
  test('Should display associated practice Link', () => {
    expect(screen.getByTestId('associated-practice-links')).toBeDefined();
    const { getByText } = render(
      <a
        href={`http://localhost:3000//${selectedStateCode}/${name}/${selectedPracticeCategory}/${selectedPracticeId}`}
      >
        {practiceName}
      </a>
    );
    const link = getByText('Cover Crop');
    fireEvent.click(link);
    fireEvent.mouseOver(link);
    expect(screen.getByText('Cover Crop').closest('a')).toHaveAttribute(
      'href',
      'http://localhost:3000//06/ConservationPractices/2/23'
    );
  });
  test('Should display practice standard container after clicking the practice standard button', () => {
    fireEvent.click(
      screen.getByText(
        'Instructions for Accessing this State’s Practice Standards'
      )
    );
    expect(screen.getByTestId('practice-standard-steps')).toBeDefined();
  });
  test('Should display practice standard link after clicking the practice standard button', () => {
    fireEvent.click(
      screen.getByText(
        'Instructions for Accessing this State’s Practice Standards'
      )
    );
    expect(
      screen.getByText('NRCS Conservation Practices Website').closest('a')
    ).toHaveAttribute('href', 'https://efotg.sc.egov.usda.gov/#/state/');
  });
});
