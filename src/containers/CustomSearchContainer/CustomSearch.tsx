import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
import { useTranslation } from 'react-i18next';

import BREAKPOINTS from '../../common/constants';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import SearchByResourceConcern from '../../components/SearchByResourceConcern';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';
import { ISearchData } from '../../common/types';

const defaultSearchInput: ISearchData = {
  resource_concern_category_id: null,
  resource_concern_id: null,
  practice_category_id: null,
  practice_id: null,
  state_county_code: null,
  land_use_list: null,
};

interface ICustomSearchProps {
  setSearchToggle: Function;
}

export const DataContext: any = createContext('');

const CustomSearch = ({ setSearchToggle }: ICustomSearchProps) => {
  const { t } = useTranslation();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [searchInput, setSearchInput] =
    useState<ISearchData>(defaultSearchInput);

  const handleInputChange = (e: any) => {
    // const { name, value, checked } = e.target;
    // let landUseSelections = searchInput.land_use_list;
    // if (name.includes('selectedLandUseIds')) {
    // if (!checked &&  landUseSelections?.includes(value)) {
    //   landUseSelections = landUseSelections?.filter((landUse: any) => {
    //     return landUse.landUseCategoryID === value;
    //   });
    //   } else if (!landUseSelections?.includes(value)) {
    //     landUseSelections.push(value);
    //   }
    //   setSearchInput({ ...searchInput, selectedLandUseIds: landUseSelections });
    // } else {
    //   setSearchInput({ ...searchInput, [name]: value });
    // }
    console.log('HandleInputChange is running');
  };

  const handleSearch = () => {
    console.log('TODO: Submit form for search', searchInput);
    setSearchToggle(true);
  };

  const buttonStyles = () => {
    let styles;
    if (breakpoint !== 'mobile') {
      styles = 'margin-top-3 margin-bottom-3 mobile-btn-left';
    } else {
      styles = 'margin-top-3 margin-bottom-3 mobile-btn-left mobile-btn-width';
    }
    return styles;
  };

  return (
    <div data-testid='custom-search-container' className='custom-search'>
      <div className='custom-search-header'>
        <h1>{t('search-page.quick-search')}</h1>
        <p>{t('search-page.intro')}</p>
      </div>

      {/* <DataContext.Provider value={[searchInput, setSearchInput]}> */}
      <SearchByLocation
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleInputChange={handleInputChange}
      />
      <LandUseSection
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleInputChange={handleInputChange}
      />
      <p className='practice-description'>
        {t('search-by-conservation-practice.description')}
      </p>
      <div className='bottom-container'>
        <SearchByConservationPractice
          setSearchInput={setSearchInput}
          handleInputChange={handleInputChange}
        />
        <SearchByResourceConcern
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleInputChange={handleInputChange}
        />
      </div>
      <Link to='/search-results'>
        <CustomButton
          ariaLabel='search'
          additionalClassName={buttonStyles()}
          onClick={handleSearch}
        >
          {t('actions.search')}
        </CustomButton>
      </Link>
      {/* </DataContext.Provider> */}
    </div>
  );
};

export default CustomSearch;
