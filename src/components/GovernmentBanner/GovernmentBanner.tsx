import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  setLandUse,
  setPracticeCategory,
  setSearch,
  setSearchInfo,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { currentState } from '../../Redux/Slice/stateSlice';
import './gov-banner.scss';
import { initialLandUse } from '../../common/typedconstants.common';

const initialState = {
  stateNameDisplay: 'U.S.',
  stateCode: '00',
  stateAbbreviation: 'U.S.',
};

const defaultSearchInput: any = {
  land_use_list: null,
};
const defaultSearchInfo: any = {
  land_use_list: null,
};

const GovernmentBanner = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleNavigateHome = () => {
    window.dispatchEvent(new Event('navigateHome'));
    dispatch(currentState(initialState));
    dispatch(setPracticeCategory(-1));
    dispatch(setSpecificPractice(-1));
    dispatch(setLandUse(initialLandUse));
    dispatch(setSearchInfo(defaultSearchInfo));
    dispatch(setSearch(defaultSearchInput));
    window.localStorage.clear();
  };
  const renderNRCSHeaderSection: Function = () => (
    <header
      className='usa-banner-header'
      aria-label='Official United States Government Website Disclaimer'
    >
      <div className='header-container row-flex-start'>
        <img
          className='flex-align-self-center'
          src='images/usa-flag-logo.png'
          alt='USA Flag Logo'
        />
        {`${t('header.disclaimer')} `}
        <a href='/#' aria-expanded='false' aria-controls='gov-banner'>
          {t('header.here-how-you-know')}
        </a>
      </div>
      <div className='usda-header row-flex-start'>
        <img src='images/usda_logo_color.png' alt='USDA LOGO' />
        <div className='government-banner'>
          <h4 className='page-title' data-testid='page-title'>
            {t('header.nrcs')}
          </h4>
          <p>{t('header.usda')}</p>
        </div>
      </div>
    </header>
  );

  const renderNavigationSection: Function = () => (
    <div className='navigation-bar'>
      <img className='nrcsLogo' src='images/nrcs_logo.png' alt='NRCS Logo' />
      <Link
        to='/'
        onClick={handleNavigateHome}
        className='usa-link margin-left-05'
      >
        {t('header.home')}
      </Link>
      {pathname !== '/' && pathname !== '/search' && (
        <Link to='/search' className='usa-link float-right'>
          {t('header.search')}
        </Link>
      )}
    </div>
  );

  return (
    <>
      {renderNRCSHeaderSection()}
      {renderNavigationSection()}
    </>
  );
};

export default GovernmentBanner;
