import { useEffect, useState } from 'react';
import { getRequest } from '../../common/util/AxiosUtil';

import './custom-search.scss';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import { search, advancedSearch } from '../../common/constants';

const customSearchIntro: string =
  'Search for information on practice impacts, practice extent, and impacts of practice implementation.';

const defaultSearchInput: any = {
  keywordInput: '',
  stateSelect: '',
  countySelect: '',
};

const CustomSearchContainer = () => {
  const [searchInput, setSearchInput]: any = useState(defaultSearchInput);
  const [statesList, setStatesList]: any = useState([]);

  useEffect(() => {
    async function fetchStateList() {
      const response = await getRequest('/states');
      setStatesList(response.data);
    }

    fetchStateList();
  }, []);

  const handleSearch = () => {
    console.log('TODO: Submit form for search', searchInput);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
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
      />
      <CustomButton additionalClassName='margin-top-3' onClick={handleSearch}>
        {search}
      </CustomButton>
    </div>
  );
};

export default CustomSearchContainer;
