import { useTranslation } from 'react-i18next';
import Header from '../../components/Header';
import LocationSearch from '../../components/LocationSearch';
import FindByPractices from '../../components/FindByPractices';
import QuickSearchBar from '../../components/QuickSearchBar';
import './home.scss';

const Home = () => {
  const { t } = useTranslation();

  const renderMainContent = () => {
    return (
      <main data-testid='home-content'>
        <QuickSearchBar />
        <LocationSearch />
        <FindByPractices />
      </main>
    );
  };

  return (
    <div className='home-page'>
      <Header
        headerText={t('home-page.title')}
        headerClassNames='display-4'
        parentClassNames='jumbotron landing-page-image'
        priority='1'
      />
      {renderMainContent()}
    </div>
  );
};

export default Home;
