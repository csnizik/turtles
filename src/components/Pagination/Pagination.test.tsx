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

  test('Should display the Pagination', () => {
    expect(screen.getByTestId('Pagination')).toBeDefined();
  });
});
