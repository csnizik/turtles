import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  const renderNRCSHeaderSection: Function = () => (
    <header>
      <div className='header-container row-flex-start'>
        <img
          className='flex-align-self-center'
          src='images/usa-flag-logo.png'
          alt='USA Flag Logo'
        />
        An official website of the United States government{' '}
        <a href='/#'>Here&apos;s how you know</a>
      </div>
      <div className='usda-header row-flex-start'>
        <img src='images/usda_logo_color.png' alt='USDA LOGO' />
        <div className='government-banner'>
          <h4 className='page-title' data-testid='page-title'>
            Natural Resources Conservation Service
          </h4>
          <p>U.S DEPARTMENT OF AGRICULTURE</p>
        </div>
      </div>
    </header>
  );

  const renderNavigationSection: Function = () => (
    <div className='navigation-bar'>
      <img className='nrcsLogo' src='images/nrcs_logo.png' alt='NRCS Logo' />
      <Link to='/' className='usa-link margin-left-05'>
        Home
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
