import TagManager from 'react-gtm-module';
import Header from '../../components/Header';
import LocationSearch from '../../components/LocationSearch';
import FindByPractices from '../../components/FindByPractices';
import FindByResources from '../../components/FindByResources';
import QuickSearchBar from '../../components/QuickSearchBar';
import GovernmentFooter from '../../components/GovernmentFooter';
import './home.scss';
import { useAppSelector } from '../../Redux/hooks/hooks';

const Home = () => {
  const uiText = useAppSelector(
    (app: any) =>
      app?.api?.queries['getConfigurationSettingsStaticText(null)']?.data
  );

  const renderMainContent = () => {
    return (
      <div data-testid='home-content'>
        <QuickSearchBar />
        <LocationSearch />
        <FindByResources />
        <FindByPractices />
        
      </div>
    );
  };

  const GTMArg = { gtmId: process.env.REACT_APP_Google_Tag || '' };
  TagManager.initialize(GTMArg);

  return (
    <main id='main-content' className='home-page'>
      <Header
        headerText={uiText?.homeTitle?.configurationValue}
        headerClassNames='display-4'
        parentClassNames='landing-page-image-wrapper'
        priority='1'
      />
      {renderMainContent()}
    </main>
  );
};

export default Home;
