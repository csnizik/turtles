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
import {
  enablePracticeDropdown,
  enableResourceDropdown,
} from '../../Redux/Slice/disableSlice';

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
    dispatch(enablePracticeDropdown());
    dispatch(enableResourceDropdown());
    window.localStorage.clear();
  };
  const renderNRCSHeaderSection: Function = () => (
    <header
      data-testid='gov-banner-header'
      className='usa-banner-header'
      aria-label='Official United States Government Website Disclaimer'
    >
      <div className='usa-accordion'>
        <header className='usa-banner__header'>
          <div className='usa-banner__inner '>
            <div className='grid-col-auto'>
              <img
                className='flex-align-self-left'
                src='../../../../images/usa-flag-logo.png'
                alt='USA Flag Logo'
              />
            </div>
            <div className='grid-col-fill tablet:grid-col-auto'>
              {`${t('header.disclaimer')} `}
            </div>
            <div className='grid-col-fill tablet:grid-col-auto'>
              <button
                type='button'
                className='usa-accordion__button usa-banner__button'
                aria-expanded='false'
                aria-controls='gov-banner'
              >
                <span className='usa-banner__button-text'>
                  {' '}
                  {`${t('header.here-how-you-know')}`}
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className='usa-banner__content' id='gov-banner' hidden>
          <div className='grid-row grid-gap-lg'>
            <div className='usa-banner__guidance tablet:grid-col-6'>
              <img
                className='usa-banner__icon usa-media-block__img'
                src='../../../../images/icon-dot-gov.svg'
                alt='Dot gov'
              />
              <div className='usa-media-block__body'>
                <p>
                  <strong>The .gov means it is official.</strong>
                  <br />
                  Federal government websites often end in .gov or .mil. Before
                  sharing sensitive information, make sure you’re on a federal
                  government site.
                </p>
              </div>
            </div>
            <div className='usa-banner__guidance tablet:grid-col-6'>
              <img
                className='usa-banner__icon usa-media-block__img'
                src='../../../../images/icon-https.svg'
                alt='Https'
              />
              <div className='usa-media-block__body'>
                <p>
                  <strong>The site is secure.</strong>
                  <br />
                  The <strong>https://</strong> ensures that you are connecting
                  to the official website and that any information you provide
                  is encrypted and transmitted securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='usda-header row-flex-start'>
        <img src='../../../../images/usda_logo_color.png' alt='USDA LOGO' />
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
    <div data-testid='gov-banner-nav' className='navigation-bar'>
      <img
        className='nrcsLogo'
        src='../../../../images/nrcs_logo.png'
        alt='NRCS Logo'
      />
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
