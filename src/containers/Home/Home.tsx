import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest } from '../../common/util/AxiosUtil';
import ExploreBoxList from '../../components/ExploreBoxList';
import CustomButton from '../../components/CustomButton';
import LocationSearch from '../../components/LocationSearch';
import { advancedSearch } from '../../common/constants';
import './home.scss';

const homeIntro: string =
  'Find information about conservation practices and NRCS projects & initiatives.';

const Home = () => {
  const history: any = useHistory();
  const handleCustomSearch = () => {
    history.push('search');
  };

  const [stateList, setStateList]: any = useState([]);

  useEffect(() => {
    async function fetchStateList() {
      const response = await getRequest('/states');
      setStateList(response.data);
    }
    fetchStateList();
  }, []);

  return (
    <div className='home-page'>
      <div className='jumbotron landing-page-image'>
        <h1 className='display-4'>NRCS On the Ground</h1>
      </div>
      <main data-testid='home-content'>
        <div className='grid-row'>
          <div className='grid-col-6'>
            <p className='margin-left-6 margin-top-3'>{homeIntro}</p>
          </div>
          <div className='grid-col-4'>
            <CustomButton
              additionalClassName='margin-2 float-right'
              onClick={handleCustomSearch}
            >
              {advancedSearch}
            </CustomButton>
          </div>
        </div>
        <LocationSearch statesList={stateList} />
        <hr className='divider' />
        <div className='explore-box'>
          <ExploreBoxList />
        </div>
      </main>
    </div>
  );
};

export default Home;
