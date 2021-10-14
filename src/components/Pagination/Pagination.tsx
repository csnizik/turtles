import './pagination.scss';

const Pagination = () => {
  const handlePrevClick = () => {
    return 0;
  };

  const handleNextClick = () => {
    return 0;
  };

  return (
    <>
      <h3 className='site-preview-heading'>Showing 1 - 10 of 757 projects</h3>
      <nav aria-label='Pagination' className='usa-pagination'>
        <ul className='usa-pagination__list'>
          <li className='usa-pagination__item usa-pagination__arrow'>
            <a
              href='#'
              className='usa-pagination__link usa-pagination__previous-page'
              aria-label='Previous page'
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

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a
              href='#'
              className='usa-pagination__button usa-current'
              aria-label='Page 1'
              aria-current='page'
            >
              1
            </a>
          </li>

          <li
            className='usa-pagination__item usa-pagination__overflow'
            role='presentation'
          >
            <span> … </span>
          </li>

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a href='#' className='usa-pagination__button' aria-label='Page 9'>
              9
            </a>
          </li>

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a href='#' className='usa-pagination__button' aria-label='Page 10'>
              10
            </a>
          </li>

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a href='#' className='usa-pagination__button' aria-label='Page 11'>
              11
            </a>
          </li>

          <li className='usa-pagination__item usa-pagination__arrow'>
            <a
              href='#'
              className='usa-pagination__link usa-pagination__next-page'
              aria-label='Next page'
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
