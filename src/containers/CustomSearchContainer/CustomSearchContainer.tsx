import { useTranslation } from 'react-i18next';
import useBreakpoint from 'use-breakpoint';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import SearchByResourceConcern from '../../components/SearchByResourceConcern';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';
import './custom-search.scss';

 const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }


const CustomSearchContainer = () => {
  const { t } = useTranslation();
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(BREAKPOINTS);
  const handleSearch = () => {
    console.log('TODO: Submit form for search');
  };

  const buttonStyles = () => {
    let styles;
    if (breakpoint !== 'mobile'){
      styles = 'margin-top-3 margin-bottom-3 mobile-btn-left';
    }else {
      styles = 'margin-top-3 margin-bottom-3 mobile-btn-left mobile-btn-width'
    }
    return styles;
  }

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
          additionalClassName={buttonStyles()}
          onClick={handleSearch}
        >
          {t('actions.search')}
        </CustomButton>
      </Link>
    </div>
  );
};

export default CustomSearchContainer;
