import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import './custom-search.scss';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import SearchByResourceConcern from '../../components/SearchByResourceConcern';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';
import LocationSearch from '../../components/LocationSearch';

interface ISearchInput {
  stateSelect: number;
  countySelect: number;
}

const defaultSearchInput: ISearchInput = {
  stateSelect: -1,
  countySelect: -1,
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
      if (searchInput.stateSelect >= 0 && searchInput.stateSelect !== value) {
        setCountyList([]);
      }
    }
    setSearchInput({ ...searchInput, [name]: value });
  };

  return (
    <div data-testid='custom-search-container' className='custom-search'>
      <div className='custom-search-header'>
        <h1>{t('search-page.quick-search')}</h1>
        <p>{t('search-page.intro')}</p>
      </div>
      <SearchByLocation />
      <LandUseSection />
      <p className='practice-description'>
        {t('search-by-conservation-practice.description')}
      </p>
      <div className='bottom-container'>
        <SearchByConservationPractice />
        <SearchByResourceConcern />
      </div>
      <CustomButton
        ariaLabel='search'
        additionalClassName='margin-top-3 margin-bottom-3'
        onClick={handleSearch}
      >
        {t('actions.search')}
      </CustomButton>
    </div>
  );
};

export default CustomSearchContainer;
