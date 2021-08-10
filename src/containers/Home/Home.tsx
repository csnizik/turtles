import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import ExploreBoxList from '../../components/ExploreBoxList';
import CustomButton from '../../components/CustomButton';
import LocationSearch from '../../components/LocationSearch';
import './home.scss';

const Home = () => {
  const history: any = useHistory();
  const { t } = useTranslation();
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
        <h1 className='display-4'>{t('home-page.title')}</h1>
      </div>
      <main data-testid='home-content'>
        <div className='grid-row'>
          <div className='grid-col-6'>
            <p className='margin-left-6 margin-top-3'>{t('home-page.intro')}</p>
          </div>
          <div className='grid-col-4'>
            <CustomButton
              additionalClassName='margin-2 float-right'
              onClick={handleCustomSearch}
            >
              {t('search-page.advanced-search')}
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
