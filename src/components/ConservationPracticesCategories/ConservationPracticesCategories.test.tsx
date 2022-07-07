import ConservationPracticesCategories from './ConservationPracticesCategories';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { staticText } from '../../api-mocks/constants';

afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    name: 'ConservationPractices',
  }),
}));

describe('ConservationPracticesCategories is rendered correctly', () => {
  const selectPractice = () => {};
  const categories = [
    {
      practiceCategoryName: 'name1',
      practiceCategoryDisplay: 'test description',
      practiceCategoryId: '01',
      practiceCategoryIconPath: 'Wetlands.png',
    },
    {
      practiceCategoryName: 'name2',
      practiceCategoryDisplay: 'test description',
      practiceCategoryId: '02',
      practiceCategoryIconPath: 'Soil Quality.png',
    },
  ];

  beforeEach(() => {
    render(
      <ConservationPracticesCategories
        categories={categories}
        selectPractice={selectPractice}
        heading={staticText.data.cpCategoryHeadingSubHeading.configurationValue}
        intro={
          staticText.data.cpCategoryHeadingSubHeadingDescription
            .configurationValue
        }
      />
    );
  });

  test('Should display the contents of ConservationPracticesCategories', () => {
    expect(screen.getByTestId('practice-content')).toBeDefined();
    expect(
      screen.getByText('Conservation Practice Categories')
    ).toBeInTheDocument();
  });
});
