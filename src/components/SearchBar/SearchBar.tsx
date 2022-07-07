import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks/hooks';
import CustomButton from '../CustomButton';
import './search-bar.scss';

const SearchBar = ({ searchInput, handleSearch }: any) => {
  const { t } = useTranslation();

  const persistText = useAppSelector(
    (state) => state?.practiceSlice?.searchInput.free_text
  );

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <section className='text-search-box' aria-label='Search component'>
        <label className='search-criteria' htmlFor='searchCriteria'>
          {t('text-search.labels.enter-search-criteria')}
        </label>
        <form className='usa-search input-box' role='search'>
          <input
            className='usa-input'
            id='search-field'
            data-testid='search-field'
            type='search'
            name='search'
            placeholder='Search NRCS Website'
            defaultValue={persistText}
            onKeyDown={handleEnterKey}
          />
          <Link
            to={{
              pathname: '/search-results',
              state: { detail: searchInput },
            }}
          >
            <CustomButton
              additionalClassName='free-text-search-button'
              data-testid='search-button'
              role='button'
              ariaLabel='search'
              onClick={handleSearch}
            >
              {t('actions.search')}
            </CustomButton>
          </Link>
        </form>
      </section>
    </>
  );
};

export default SearchBar;
