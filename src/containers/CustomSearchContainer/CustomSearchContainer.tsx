import { useState } from 'react';

import './custom-search.scss';
import CustomButton from '../../components/CustomButton';

const customSearchIntro =
  'Search for resource concerns, conservation practices, and NRCS projects & initiatives.';

const defaultSearchInput = { keywordInput: '' };

const CustomSearchContainer = () => {
  const [searchInput, setSearchInput]: any = useState(defaultSearchInput);

  const handleSearch = () => {
    console.log('TODO: Submit form for search', searchInput);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const renderSearchByKeywordInput = () => {
    return (
      <>
        <label className='usa-label keyword-label' htmlFor='keywordValue'>
          Search by Keyword(s)
        </label>
        <input
          className='usa-input'
          id='keywordValue'
          name='keywordInput'
          type='text'
          placeholder='Enter keyword(s)'
          onChange={handleInputChange}
        />
      </>
    );
  };

  return (
    <div className='custom-search'>
      <div className='custom-search-header'>
        <h1>Custom Search</h1>
        <p>{customSearchIntro}</p>
      </div>
      {renderSearchByKeywordInput()}

      <CustomButton additionalClassName='margin-top-2' onClick={handleSearch}>
        Search
      </CustomButton>
    </div>
  );
};

export default CustomSearchContainer;
