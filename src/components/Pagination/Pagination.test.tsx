import Pagination from './Pagination';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Pagination is rendered correctly', () => {
  const paginate = () => {};
  const grantsLength = 10;
  const cardsPerPage = 1;
  const currentPage = 1;
  const indexOfLastPage = 8;

  beforeEach(() => {
    render(
      <Pagination
        cards={grantsLength}
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        indexOfLastPage={indexOfLastPage}
      />
    );
  });

  test('Should display the Pagination Component', () => {
    expect(screen.getByTestId('Pagination')).toBeDefined();
  });
  test('Should display the Previous Pagination Button', () => {
    expect(screen.getByTestId('prev-button')).toBeDefined();
  });
  test('Should display the First Pagination Number', () => {
    expect(screen.getByTestId('first-pagination')).toBeDefined();
  });
  test('Should display the Next Pagination Button', () => {
    expect(screen.getByTestId('next-button')).toBeDefined();
  });
});
