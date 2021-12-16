import ConservationPracticesCategories from './ConservationPracticesCategories';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('ConservationPracticesCategories is rendered correctly', () => {
  const selectPractice = () => {};
  const categories = [
    {
      practiceCategoryName: 'name1',
      practiceCategoryDisplay: 'test description',
      practiceCategoryId: '01',
      practiceCategoryIconPath: 'Wetlands.png'
    },
    {
      practiceCategoryName: 'name2',
      practiceCategoryDisplay: 'test description',
      practiceCategoryId: '02',
      practiceCategoryIconPath: 'Soil Quality.png'
    },
  ];

  beforeEach(() => {
    render(
      <ConservationPracticesCategories
        categories={categories}
        selectPractice={selectPractice}
      />
    );
  });

  test('Should display the contents of ConservationPracticesCategories', () => {
    expect(screen.getByTestId('practice-content')).toBeDefined();
  });
});
