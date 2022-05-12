import { useTranslation } from 'react-i18next';
//import 'react-gtm-module';
import TagManager from 'react-gtm-module';
import Header from '../../components/Header';
import LocationSearch from '../../components/LocationSearch';
import FindByPractices from '../../components/FindByPractices';
import QuickSearchBar from '../../components/QuickSearchBar';
import './home.scss';
import { useAppSelector } from '../../Redux/hooks/hooks';


const Home = () => {
  const { t } = useTranslation();
  
  const uiText = useAppSelector(
    (app: any) =>
    app?.api?.queries['getConfigurationSettingsStaticText(null)']?.data
    );

  const renderMainContent = () => {
    return (
      <div data-testid='home-content'>
        <QuickSearchBar />
        <LocationSearch />
        <FindByPractices />
      </div>
    );
  };

  const GTMArg = { gtmId: process.env.REACT_APP_Google_Tag || '' };
  TagManager.initialize(GTMArg);

  return (
    <main className='home-page'>
      <Header
        headerText={uiText?.homeTitle?.configurationValue}
        headerClassNames='display-4'
        parentClassNames='jumbotron landing-page-image'
        priority='1'
      />
      {renderMainContent()}
    </main>
  );
};

export default Home;
