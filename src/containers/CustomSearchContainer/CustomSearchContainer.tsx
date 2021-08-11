import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import './custom-search.scss';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';

const defaultSearchInput: any = {
  stateSelect: '',
  countySelect: '',
};

const CustomSearchContainer = () => {
  const [searchInput, setSearchInput]: any = useState(defaultSearchInput);
  const [statesList, setStatesList]: any = useState([]);
  const [countyList, setCountyList]: any = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchStateList() {
      const response = await getRequest('/states');
      setStatesList(response.data);
    }

    fetchStateList();
  }, []);

  async function fetchCountyListPerStateCode(stateCode: any) {
    const countyResponse = await getRequest(`/counties/${stateCode}`);
    setCountyList(countyResponse.data);
  }

  const handleSearch = () => {
    console.log('TODO: Submit form for search', searchInput);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'stateSelect' && value) {
      fetchCountyListPerStateCode(value);
    }
    setSearchInput({ ...searchInput, [name]: value });
  };

  return (
    <div className='custom-search'>
      <div className='custom-search-header'>
        <h1>{t('search-page.advanced-search')}</h1>
        <p>{t('search-page.intro')}</p>
      </div>
      <SearchByLocation
        statesList={statesList}
        searchInput={searchInput}
        handleInputChange={handleInputChange}
        countyList={countyList}
      />
      <LandUseSection />
      <p>Search by Conservation Practice or Resource Concern</p>
      <SearchByConservationPractice />
      <CustomButton additionalClassName='margin-top-3' onClick={handleSearch}>
        {t('actions.search')}
      </CustomButton>
    </div>
  );
};

export default CustomSearchContainer;
