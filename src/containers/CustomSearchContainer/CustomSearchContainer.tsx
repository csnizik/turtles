import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import SearchByResourceConcern from '../../components/SearchByResourceConcern';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';
import './custom-search.scss';

const CustomSearchContainer = () => {
  const { t } = useTranslation();

  const handleSearch = () => {
    console.log('TODO: Submit form for search');
  };

  return (
    <div data-testid='custom-search-container' className='custom-search'>
      <div className='custom-search-header'>
        <h1>{t('search-page.quick-search')}</h1>
        <p>{t('search-page.intro')}</p>
      </div>
      <SearchByLocation />
      <LandUseSection />
      <p className='practice-description'>
        {t('search-by-conservation-practice.description')}
      </p>
      <div className='bottom-container'>
        <SearchByConservationPractice />
        <SearchByResourceConcern />
      </div>
      <Link to='/search-results'>
        <CustomButton
          ariaLabel='search'
          additionalClassName='margin-top-3 margin-bottom-3'
          onClick={handleSearch}
        >
          {t('actions.search')}
        </CustomButton>
      </Link>
    </div>
  );
};

export default CustomSearchContainer;
