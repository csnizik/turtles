import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import CustomButton from '../../components/CustomButton';
import LocationSearch from '../../components/LocationSearch';
import FindByPractices from '../../components/FindByPractices';
import { IStateDropdownOption } from '../../common/types';
import './home.scss';

const Home = () => {
  const history: any = useHistory();
  const { t } = useTranslation();
  const handleCustomSearch = () => {
    history.push('search');
  };

  const [stateList, setStateList] = useState<IStateDropdownOption[]>([]);

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
          <div className='grid-col-4 grid-offset-2'>
            <CustomButton
              additionalClassName='margin-top-2 margin-right-4'
              onClick={handleCustomSearch}
            >
              {t('search-page.quick-search')}
            </CustomButton>
          </div>
        </div>
        <LocationSearch statesList={stateList} />
        <FindByPractices />
      </main>
    </div>
  );
};

export default Home;
