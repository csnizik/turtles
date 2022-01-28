import PracticeBreadcrumbs from './PracticeBreadcrumbs';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '06',
  }),
}));

const setPracticeViewType = () => {};

const currentPracticeCategory = {
  practiceCategoryId: 2,
  stateAbbr: 'US',
  conservationPracticeSelected: 'Cropland Soil Quality',
  practiceCategoryName: 'Cropland Soil Quality',
  practiceCategoryDescription: 'High-quality soils ensure',
  practiceCategoryLink: 'Cropland Soil Quality ',
  practices: [
    {
      practiceId: 2,
      practiceName: 'Alley Cropping',
      practiceDescription: 'Alley cropping can be used to achieve objectives',
      practiceLink: 'https://www.nrcs.usda.gov/',
      practiceImagePath: 'Alley-Cropping.jpg',
    },
  ],
};

afterEach(() => {
  cleanup();
});

describe('Practice Breadcrumbs is rendered correctly', () => {
  const practiceViewType = {
    allPractices: false,
    practiceCategories: true,
    individualPractice: false,
  };
  beforeEach(() => {
    render(
      <PracticeBreadcrumbs
        currentView={practiceViewType}
        setPracticeViewType={setPracticeViewType}
        currentPracticeCategory={currentPracticeCategory}
        currentSpecificPractice={20}
      />
    );
  });

  test('Should display the contents of the Practice Breadcrumbs', () => {
    expect(screen.getByTestId('PracticeBreadcrumbs')).toBeDefined();
  });
  test('Should stimulate a click on the Practice Category Breadcrumb', () => {
    const breadcrumb_link = screen.getByTestId('PracticeBreadcrumbs');
    fireEvent.click(breadcrumb_link);
    fireEvent.keyUp(breadcrumb_link);
    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
  });
});

describe('Practice Breadcrumbs is rendered correctly', () => {
  const practiceViewType = {
    allPractices: false,
    practiceCategories: false,
    individualPractice: true,
  };
  beforeEach(() => {
    render(
      <PracticeBreadcrumbs
        currentView={practiceViewType}
        setPracticeViewType={setPracticeViewType}
        currentPracticeCategory={currentPracticeCategory}
        currentSpecificPractice={2}
      />
    );
  });

  test('Should display the contents of the Practice Breadcrumbs', () => {
    expect(screen.getByTestId('PracticeBreadcrumbs')).toBeDefined();
  });

  test('Should stimulate a click on the Practice Breadcrumb', () => {
    const breadcrumb_link = screen.getByTestId('PracticeBreadcrumbs');
    fireEvent.click(breadcrumb_link);
    fireEvent.keyUp(breadcrumb_link);
    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
  });
});
