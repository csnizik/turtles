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
      <h3 className='site-preview-heading'>
        Showing 1 - 10 of {cards} projects
      </h3>
      <nav aria-label='Pagination' className='usa-pagination'>
        <ul className='usa-pagination__list'>
          <li className='usa-pagination__item usa-pagination__arrow'>
            <a
              className='usa-pagination__link usa-pagination__previous-page'
              aria-label='Previous page'
              href='#'
            >
              <svg className='usa-icon' aria-hidden='true' role='img'>
                <use href='/assets/img/sprite.svg#navigate_before' />
              </svg>

              <span
                className='usa-pagination__link-text'
                onClick={() => handlePrevClick()}
              >
                Previous
              </span>
            </a>
          </li>

          {pageNumbers.map((number) => {
            if (number === currentPage) {
              return (
                <li className='usa-pagination__item usa-pagination__page-no'>
                  <a
                    className='usa-pagination__button usa-current'
                    aria-label='Page'
                    aria-current='page'
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </a>
                </li>
              );
            } else if (
              number === currentPage + 1 ||
              number === currentPage - 1
            ) {
              return (
                <li className='usa-pagination__item usa-pagination__page-no'>
                  <a
                    className='usa-pagination__button'
                    aria-label='Page'
                    aria-current='page'
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </a>
                </li>
              );
            }

            return null;
          })}

          {currentPage < indexOfLastPage - 4 ? (
            <li
              className='usa-pagination__item usa-pagination__overflow'
              role='presentation'
            >
              <span> … </span>
            </li>
          ) : null}

          {pageNumbers.map((number) => {
            if (number >= indexOfLastPage - 2 && currentPage < number - 1) {
              return (
                <li className='usa-pagination__item usa-pagination__page-no'>
                  <a
                    className='usa-pagination__button'
                    aria-label='Page'
                    aria-current='page'
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </a>
                </li>
              );
            }
            return null;
          })}

          <li className='usa-pagination__item usa-pagination__arrow'>
            <a
              className='usa-pagination__link usa-pagination__next-page'
              aria-label='Next page'
              href='#'
            >
              <span
                className='usa-pagination__link-text'
                onClick={() => handleNextClick()}
              >
                Next
              </span>

              <svg className='usa-icon' aria-hidden='true' role='img'>
                <use href='/assets/img/sprite.svg#navigate_next' />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
