import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './header.scss';

const Header = () => {
  const { t } = useTranslation();
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
      <Link to='/' className='usa-link margin-left-05'>
        {t('header.home')}
      </Link>
    </div>
  );

  return (
    <>
      {renderNRCSHeaderSection()}
      {renderNavigationSection()}
    </>
  );
};

export default Header;
