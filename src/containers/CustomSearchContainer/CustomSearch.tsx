import { useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  enableResourceDropdown,
  enablePracticeDropdown,
} from '../../Redux/Slice/disableSlice';
import { useGetPracticeCategoryQuery } from '../../Redux/services/api';
import { BREAKPOINTS } from '../../common/constants';
import {
  intialPracticeState,
  initialResourceState,
} from '../../common/typedconstants.common';
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

const CustomSearch = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [searchInput, setSearchInput] =
    useState<ISearchData>(defaultSearchInput);
  const [searchedInfo, setSearchedInfo] =
    useState<ISearchInfo>(defaultSearchInfo);
  const [selectedPractice, setSelectedPractice] = useState({ id: -1 });
  const [selectedResourceCategory, setSelectedResourceCategory] = useState({
    id: -1,
  });
  const [resourceConcernsSubgroups, setResourceConcernsSubgroups] =
    useState<any>(initialResourceState);
  const [secondState, setSecondState] = useState<any>(intialPracticeState);
  const practiceCategory = useGetPracticeCategoryQuery();
  const clearBtnClassNames = classNames(
    'btn',
    'btn-link',
    'clear-button',
    'margin-left-1',
    {
      selected: selectedPractice.id >= 0,
    }
  );

  const handleClearPracticeAndConcerns = () => {
    if (practiceCategory || selectedResourceCategory) {
      setSelectedPractice({ id: -1 });
      setSelectedResourceCategory({ id: -1 });
    }
    dispatch(enableResourceDropdown());
    dispatch(enablePracticeDropdown());
    setResourceConcernsSubgroups({ ...initialResourceState, disabled: true });
    setSecondState({ ...intialPracticeState, disabled: true });
  };

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
      <div className='practice-labels'>
        <p className='practice-description'>
          {t('search-by-conservation-practice.description')}
        </p>
        <button
          className={clearBtnClassNames}
          type='button'
          onClick={handleClearPracticeAndConcerns}
        >
          {t('actions.clear')}
        </button>
      </div>
      <div className='bottom-container'>
        <SearchByConservationPractice
          selectedResourceCategory={selectedResourceCategory}
          secondState={secondState}
          setSecondState={setSecondState}
          selectedPractice={selectedPractice.id}
          setSelectedPractice={setSelectedPractice}
          setSearchInput={setSearchInput}
          setSearchInfo={setSearchedInfo}
        />
        <SearchByResourceConcern
          resourceConcernsSubgroups={resourceConcernsSubgroups}
          setResourceConcernsSubgroups={setResourceConcernsSubgroups}
          setSelectedResourceCategory={setSelectedResourceCategory}
          selectedResourceCategory={selectedResourceCategory.id}
          selectedPractice={selectedPractice.id}
          setSearchInput={setSearchInput}
          setSearchInfo={setSearchedInfo}
        />
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
