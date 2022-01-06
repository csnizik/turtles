import Pagination from './Pagination';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { Button } from 'reactstrap';

afterEach(() => {
  cleanup();
});

describe('Pagination is rendered correctly', () => {
  const paginate = () => {};
  const grantsLength = 770;
  const cardsPerPage = 10;
  const currentPage = 2;
  const indexOfLastPage = 77;
  const indexOfFirstCard = 10;
  const indexOfLastCard = 20;
  const stateNameDisplay = 'Colorado';

  beforeEach(() => {
    render(
      <Pagination
        cards={grantsLength}
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        indexOfLastPage={indexOfLastPage}
        indexOfFirstCard={indexOfFirstCard}
        indexOfLastCard={indexOfLastCard}
        selectedStateName={stateNameDisplay}
        mapComponent={true}
      />
    );
  });

  test('Should display the Pagination Component', () => {
    expect(screen.getByTestId('Pagination')).toBeDefined();
  });

  test('Should display the Pagination Title without state name', () => {
    expect(
      screen.getByText('11 - 20 of 770 projects for Colorado')
    ).toBeDefined();

    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick} />);
    const { getByLabelText } = render(<Button onClick={onClick} />);

    fireEvent.click(getByLabelText(/Page 2/i));
    fireEvent.click(getByLabelText(/Page 77/i));

    fireEvent.click(getByLabelText(/Page 3/i));
    fireEvent.keyUp(getByLabelText(/Page 3/i));

    fireEvent.click(getByText(/Previous/i));
    fireEvent.keyUp(getByText(/Previous/i));

    fireEvent.click(getByText(/Next/i));
    fireEvent.keyUp(getByText(/Next/i));
    screen.debug();
  });
  // test('Should display the Pagination Component', () => {
  //   expect(screen.getByTestId('Pagination')).toBeDefined();
  // });
  // test('Should NOT display the Previous Pagination Button', () => {
  //   expect(screen.getByTestId('prev-button')).toBeDefined();
  // });
  // test('Should display the First Pagination Number', () => {
  //   expect(screen.getByTestId('first-pagination')).toBeDefined();
  // });
  // test('Should display the Next Pagination Button', () => {
  //   expect(screen.getByTestId('next-button')).toBeDefined();
  // });
});

describe('Pagination is rendered correctly', () => {
  const paginate = () => {};
  const grantsLength = 770;
  const cardsPerPage = 10;
  const currentPage = 2;
  const indexOfLastPage = 77;
  const indexOfFirstCard = 10;
  const indexOfLastCard = 20;

  beforeEach(() => {
    render(
      <Pagination
        cards={grantsLength}
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        indexOfLastPage={indexOfLastPage}
        indexOfFirstCard={indexOfFirstCard}
        indexOfLastCard={indexOfLastCard}
        mapComponent={false}
      />
    );
  });

  test('Should display the Pagination Component', () => {
    expect(screen.getByTestId('Pagination')).toBeDefined();
  });
  test('Should display the Pagination Title without state name', () => {
    expect(
      screen.getByText('Showing 1 - 20 of 770 projects/initiatives')
    ).toBeDefined();
  });
});
