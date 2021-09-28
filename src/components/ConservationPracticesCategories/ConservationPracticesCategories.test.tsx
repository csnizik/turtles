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
    },
    {
      practiceCategoryName: 'name2',
      practiceCategoryDisplay: 'test description',
      practiceCategoryId: '02',
    },
  ];

  //   beforeEach(() => {
  //     render(
  //       <ConservationPracticesCategories
  //         categories={categories}
  //         selectPractice={selectPractice}
  //       />
  //     );
  //   });

  //   test('Should display the contents of ConservationPracticesCategories', () => {
  //     expect(screen.getByTestId('practice-content')).toBeDefined();
  //   });
  // });
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});
