import { useHistory } from 'react-router-dom';
import ExploreBoxList from '../../components/ExploreBoxList';
import CustomButton from '../../components/CustomButton';
import './home.scss';

const homeIntro =
  'Find information about resource concerns, conservation practices, and NRCS projects & initiatives.';

const Home = () => {
  const history: any = useHistory();
  const handleCustomSearch = () => {
    history.push('search');
  };

  return (
    <div className='home-page'>
      <div className='jumbotron landing-page-image'>
        <h1 className='display-4'>NRCS On the Ground</h1>
      </div>
      <main data-testid='home-content'>
        <div className='grid-row'>
          <div className='grid-col-6'>
            <p className='margin-3 float-left'>{homeIntro}</p>
          </div>
          <div className='grid-col-4'>
            <CustomButton
              additionalClassName='margin-2'
              onClick={handleCustomSearch}
            >
              Custom Search
            </CustomButton>
          </div>
        </div>
        <div className='explore-box'>
          <ExploreBoxList />
        </div>
      </main>
    </div>
  );
};

export default Home;
