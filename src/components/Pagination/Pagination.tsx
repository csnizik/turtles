import './pagination.scss';

const Pagination = ({
  cards,
  cardsPerPage,
  paginate,
  currentPage,
  indexOfLastPage,
}: any) => {
  const handlePrevClick = () => {
    paginate(currentPage - 1);
  };

  const handleNextClick = () => {
    paginate(currentPage + 1);
  };

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(cards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav
        aria-label='Pagination'
        data-testid='Pagination'
        className='usa-pagination'
      >
        <h3>Showing 1 - 10 of {cards} projects</h3>
        <ul className='usa-pagination__list'>
          <li className='usa-pagination__item usa-pagination__arrow'>
            <button
              data-testid='prev-button'
              type='button'
              className='usa-pagination__link usa-pagination__previous-page'
              aria-label='Previous page'
            >
              <svg className='usa-icon' aria-hidden='true' role='img'>
                <use href='/assets/img/sprite.svg#navigate_before' />
              </svg>

              <span
                role='button'
                tabIndex={0}
                className='usa-pagination__link-text'
                onClick={() => handlePrevClick()}
                onKeyUp={() => handlePrevClick()}
              >
                Previous
              </span>
            </button>
          </li>

          {pageNumbers.map((number) => {
            if (number === currentPage) {
              return (
                <li
                  key={number}
                  className='usa-pagination__item usa-pagination__page-no'
                >
                  <button
                    data-testid='first-pagination'
                    type='button'
                    className='usa-pagination__button usa-current'
                    aria-label={`Page ${number}`}
                    aria-current='page'
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              );
            }
            if (
              number === currentPage + 1 ||
              number === currentPage - 1 ||
              (number < currentPage && number >= indexOfLastPage - 3)
            ) {
              return (
                <li
                  key={number}
                  className='usa-pagination__item usa-pagination__page-no'
                >
                  <button
                    type='button'
                    className='usa-pagination__button'
                    aria-label={`Page ${number}`}
                    aria-current='page'
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              );
            }

            return null;
          })}

          {currentPage < indexOfLastPage - 3 ? (
            <li
              className='usa-pagination__item usa-pagination__overflow'
              role='presentation'
            >
              <span> … </span>
            </li>
          ) : null}

          {pageNumbers.map((number) => {
            if (number >= indexOfLastPage - 1 && currentPage < number - 1) {
              return (
                <li
                  key={number}
                  className='usa-pagination__item usa-pagination__page-no'
                >
                  <button
                    type='button'
                    className='usa-pagination__button'
                    aria-label={`Page ${number}`}
                    aria-current='page'
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              );
            }
            return null;
          })}

          <li className='usa-pagination__item usa-pagination__arrow'>
            <button
              data-testid='next-button'
              type='button'
              className='usa-pagination__link usa-pagination__next-page'
              aria-label='Next page'
            >
              <span
                role='button'
                tabIndex={0}
                className='usa-pagination__link-text'
                onClick={() => handleNextClick()}
                onKeyUp={() => handleNextClick()}
              >
                Next
              </span>

              <svg className='usa-icon' aria-hidden='true' role='img'>
                <use href='/assets/img/sprite.svg#navigate_next' />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
