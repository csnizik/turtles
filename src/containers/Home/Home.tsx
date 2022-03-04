import { useTranslation } from 'react-i18next';
//import 'react-gtm-module';
import TagManager from 'react-gtm-module';
import Header from '../../components/Header';
import LocationSearch from '../../components/LocationSearch';
import FindByPractices from '../../components/FindByPractices';
import QuickSearchBar from '../../components/QuickSearchBar';
import './home.scss';

const Home = () => {
  const { t } = useTranslation();

  const renderMainContent = () => {
    return (
      <div data-testid='home-content'>
        <QuickSearchBar />
        <LocationSearch />
        <FindByPractices />
      </div>
    );
  };

  const GTMArg = { gtmId: 'G-JXBFW848RQ'  };
  TagManager.initialize(GTMArg);

  return (
    <main className='home-page'>
      <Header
        headerText={t('home-page.title')}
        headerClassNames='display-4'
        parentClassNames='jumbotron landing-page-image'
        priority='1'
      />
      {renderMainContent()}
      <noscript>
        <iframe title="ga4" src="https://www.googletagmanager.com/ns.html?id=G-JXBFW848RQ" height="0" width="0" style={ {visibility:'hidden'}}> </iframe>
      </noscript>
    </main>
  );
};

export default Home;
