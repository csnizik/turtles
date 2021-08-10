import { useEffect, useState } from 'react';
import { getRequest } from '../../common/util/AxiosUtil';

import './custom-search.scss';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import LandUseSection from '../../components/LandUseSection';
import { search, advancedSearch } from '../../common/constants';

const customSearchIntro: string =
  'Search for information on practice impacts, practice extent, and impacts of practice implementation.';

const defaultSearchInput: any = {
  stateSelect: '',
  countySelect: '',
};

const CustomSearchContainer = () => {
  const [searchInput, setSearchInput]: any = useState(defaultSearchInput);
  const [statesList, setStatesList]: any = useState([]);
  const [countyList, setCountyList]: any = useState([]);

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
        <h1>{advancedSearch}</h1>
        <p>{customSearchIntro}</p>
      </div>
      <SearchByLocation
        statesList={statesList}
        searchInput={searchInput}
        handleInputChange={handleInputChange}
        countyList={countyList}
      />
      <LandUseSection />
      <CustomButton additionalClassName='margin-top-3' onClick={handleSearch}>
        {search}
      </CustomButton>
    </div>
  );
};

export default CustomSearchContainer;
