import './pagination.scss';

const Pagination = () => {
  return (
    <>
      <h3 className='site-preview-heading'>Default</h3>
      <nav aria-label='Pagination' className='usa-pagination'>
        <ul className='usa-pagination__list'>
          <li className='usa-pagination__item usa-pagination__arrow'>
            <a
              //   href='javascript:void(0);'
              className='usa-pagination__link usa-pagination__previous-page'
              aria-label='Previous page'
            >
              <svg className='usa-icon' aria-hidden='true' role='img'>
                <use href='/assets/img/sprite.svg#navigate_before' />
              </svg>

              <span className='usa-pagination__link-text'> Previous </span>
            </a>
          </li>

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a
              //   href='javascript:void(0);'
              className='usa-pagination__button'
              aria-label='Page 1'
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
            <a
              //   href='javascript:void(0);'
              className='usa-pagination__button'
              aria-label='Page 9'
            >
              9
            </a>
          </li>

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a
              //   href='javascript:void(0);'
              className='usa-pagination__button usa-current'
              aria-label='Page 10'
              aria-current='page'
            >
              10
            </a>
          </li>

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a
              //   href='javascript:void(0);'
              className='usa-pagination__button'
              aria-label='Page 11'
            >
              11
            </a>
          </li>

          <li
            className='usa-pagination__item usa-pagination__overflow'
            role='presentation'
          >
            <span> … </span>
          </li>

          <li className='usa-pagination__item usa-pagination__page-no'>
            <a
              //   href='javascript:void(0);'
              className='usa-pagination__button'
              aria-label='Last page, page 24'
            >
              24
            </a>
          </li>

          <li className='usa-pagination__item usa-pagination__arrow'>
            <a
              //   href='javascript:void(0);'
              className='usa-pagination__link usa-pagination__next-page'
              aria-label='Next page'
            >
              <span className='usa-pagination__link-text'> Next </span>

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
