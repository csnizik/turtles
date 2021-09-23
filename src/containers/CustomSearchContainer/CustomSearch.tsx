import { useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BREAKPOINTS } from '../../common/constants';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import SearchByResourceConcern from '../../components/SearchByResourceConcern';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';
import { ISearchData, ISearchInfo } from '../../common/types';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { setSearch, setSearchInfo } from '../../Redux/Slice/practiceSlice';

const defaultSearchInput: ISearchData = {
  resource_concern_category_id: null,
  resource_concern_id: null,
  practice_category_id: null,
  practice_id: null,
  state_county_code: null,
  land_use_list: null,
  practices: null,
};
const defaultSearchInfo: ISearchInfo = {
  resource_concern_category: null,
  resource_concern: null,
  practice_category: null,
  practice: null,
  state: null,
  land_use_list: null,
};

const CustomSearch = ({ setSearchToggle }: any) => {
  const { t } = useTranslation();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [searchInput, setSearchInput] =
    useState<ISearchData>(defaultSearchInput);
  const [searchedInfo, setSearchedInfo] =
    useState<ISearchInfo>(defaultSearchInfo);

  const dispatch = useAppDispatch();

  const handleSearch = () => {
    //setSearchToggle(false);
    dispatch(setSearch(searchInput));
    dispatch(setSearchInfo(searchedInfo));
  };

  const searchButtonStyles = () => {
    let styles;
    if (breakpoint !== 'mobile') {
      styles = 'margin-top-3 margin-bottom-3 margin-left-4';
    } else {
      styles = 'margin-top-3 margin-bottom-3 mobile-btn-width';
    }
    return styles;
  };

  return (
    <div data-testid='custom-search-container' className='custom-search'>
      <div className='custom-search-header'>
        <h1>{t('search-page.quick-search')}</h1>
        <p>{t('search-page.intro')}</p>
      </div>

      <SearchByLocation
        setSearchInput={setSearchInput}
        setSearchInfo={setSearchedInfo}
      />
      <LandUseSection
        setSearchInput={setSearchInput}
        setSearchInfo={setSearchedInfo}
      />
      <p className='practice-description'>
        {t('search-by-conservation-practice.description')}
      </p>
      <div className='bottom-container'>
        <SearchByConservationPractice setSearchInput={setSearchInput} />
        <SearchByResourceConcern setSearchInput={setSearchInput} />
      </div>
      <Link
        to={{
          pathname: '/search-results',
          state: { detail: searchInput },
        }}
      >
        <CustomButton
          ariaLabel='search'
          additionalClassName={searchButtonStyles()}
          onClick={() => handleSearch()}
        >
          {t('actions.search')}
        </CustomButton>
      </Link>
    </div>
  );
};

export default CustomSearch;
