import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import useBreakpoint from 'use-breakpoint';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  enableResourceDropdown,
  enablePracticeDropdown,
} from '../../Redux/Slice/disableSlice';
import { BREAKPOINTS } from '../../common/constants';
import {
  intialPracticeState,
  initialResourceState,
  initialLandUse,
} from '../../common/typedconstants.common';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';
import { ISearchData, ISearchInfo } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  setLandUse,
  setSearch,
  setSearchInfo,
} from '../../Redux/Slice/practiceSlice';
import SearchByResourceConcern from '../../components/SearchByResourceConcern/SearchByResourceConcern';
import './custom-search.scss';
import { currentState, initialState } from '../../Redux/Slice/stateSlice';
import SearchBar from '../../components/SearchBar';

const GTMArg = { gtmId: process.env.REACT_APP_Google_Tag || '' };
TagManager.initialize(GTMArg);

const defaultSearchInput: ISearchData = {
  resource_concern_category_id: null,
  resource_concern_id: null,
  practice_category_id: null,
  practice_id: null,
  state_county_code: null,
  land_use_list: null,
  practices: null,
  free_text: null,
};
const defaultSearchInfo: ISearchInfo = {
  resource_concern_category: null,
  resource_concern: null,
  practice_category: null,
  practice: null,
  state: null,
  land_use_list: null,
  free_text: null,
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
  const [checkedState, setCheckedState] = useState<any>(initialLandUse);
  const [selectedSubPractice, setSelectedSubPractice] = useState<any>({
    id: -1,
  });
  const [selectedResourceConcern, setSelectedResourceConcern] = useState<any>({
    id: -1,
  });

  const landUseState = useAppSelector(
    (state) => state?.practiceSlice?.landUseSet
  );

  const uiText: any = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  );

  const clearBtnClassNames = classNames(
    'btn',
    'btn-link',
    'clear-button',
    'margin-left-1',
    {
      selected: selectedPractice.id >= 0,
    }
  );

  useEffect(() => {
    setCheckedState(landUseState);
  }, []);

  const handleClearPracticeAndConcerns = () => {
    setSelectedPractice({ id: -1 });
    setSelectedResourceCategory({ id: -1 });
    setSelectedSubPractice({ id: -1 });
    setSelectedResourceConcern({ id: -1 });
    setSearchInput((prevState) => ({
      ...prevState,
      resource_concern_category_id: null,
      resource_concern_id: null,
      practice_category_id: null,
      practice_id: null,
    }));
    setSearchedInfo((prevState) => ({
      ...prevState,
      resource_concern_category: null,
      resource_concern: null,
      practice_category: null,
      practice: null,
    }));

    dispatch(enableResourceDropdown());
    dispatch(enablePracticeDropdown());
    setResourceConcernsSubgroups({ ...initialResourceState });
    setSecondState({ ...intialPracticeState });
  };

  const handleEvent = () => {
    handleClearPracticeAndConcerns();
  };

  useEffect(() => {
    window.addEventListener('navigateHome', handleEvent);

    return () => {
      window.removeEventListener('navigateHome', handleEvent);
    };
  });

  const handleSearch = () => {
    // eslint-disable-next-line
    var userSearch = (
      document?.getElementById('search-field') as HTMLInputElement
    )?.value;
    userSearch = userSearch?.trim();

    searchInput.free_text = userSearch === '' ? null : userSearch;
    searchedInfo.free_text = searchInput.free_text;

    dispatch(setSearch(searchInput));
    dispatch(setSearchInfo(searchedInfo));
    dispatch(setLandUse(checkedState));
    if (searchInput.state_county_code === '00000') {
      dispatch(currentState(initialState));
    }
    //Google Analytics code for SearchClick (searchedInfo)
    window.dataLayer.push({ js: new Date() });
    window.dataLayer.push({
      event: 'SearchClick',
      EventProps: {
        SearchParameter: searchedInfo,
      },
    });
  };

  const searchButtonStyles = () => {
    let styles;
    if (breakpoint !== 'mobile') {
      styles =
        'margin-top-3 margin-bottom-3 margin-left-4 apply-filters-button';
    } else {
      styles = 'margin-top-3 margin-bottom-3 mobile-btn-width';
    }
    return styles;
  };
  return (
    <main id='main-content'>
      <div data-testid='custom-search-container' className='custom-search'>
        <div className='custom-search-header'>
          <h1>{uiText?.quickSearchTitle?.configurationValue}</h1>
          <p>{uiText?.quickSearchDescription?.configurationValue}</p>
          <SearchBar searchInput={searchInput} handleSearch={handleSearch} />
        </div>
        <div className='filter-component'>
          <p className='filter-info'>{t('search-page.about-filter')}</p>
          <SearchByLocation
            setSearchInput={setSearchInput}
            setSearchInfo={setSearchedInfo}
          />
          <LandUseSection
            setSearchInput={setSearchInput}
            setSearchInfo={setSearchedInfo}
            checkedState={checkedState}
            setCheckedState={setCheckedState}
          />
          <div className='bottom-container'>
            <div className='practice-labels'>
              <p className='practice-description'>
                {t('search-by-conservation-practice.description')}
              </p>
              <button
                data-testid='clear-btn'
                className={clearBtnClassNames}
                type='button'
                aria-label='Clear Practices and Resource Concerns'
                onClick={handleClearPracticeAndConcerns}
              >
                {t('actions.clear')}
              </button>
            </div>
            <div className='search-criteria'>
              <SearchByConservationPractice
                selectedResourceCategory={selectedResourceCategory}
                secondState={secondState}
                setSecondState={setSecondState}
                selectedPractice={selectedPractice.id}
                setSelectedPractice={setSelectedPractice}
                setSearchInput={setSearchInput}
                setSearchInfo={setSearchedInfo}
                resourceId={searchInput.resource_concern_id}
                selectedSubPractice={selectedSubPractice}
                setSelectedSubPractice={setSelectedSubPractice}
              />
              <SearchByResourceConcern
                resourceConcernsSubgroups={resourceConcernsSubgroups}
                setResourceConcernsSubgroups={setResourceConcernsSubgroups}
                setSelectedResourceCategory={setSelectedResourceCategory}
                selectedResourceCategory={selectedResourceCategory.id}
                selectedPractice={selectedPractice.id}
                setSearchInput={setSearchInput}
                setSearchInfo={setSearchedInfo}
                practiceId={searchInput.practice_id}
                selectedResourceConcern={selectedResourceConcern}
                setSelectedResourceConcern={setSelectedResourceConcern}
              />
            </div>
          </div>
        </div>
        <Link
          to={{
            pathname: '/search-results',
            state: { detail: searchInput },
          }}
        >
          <CustomButton
            data-testid='custom-search-button'
            role='button'
            ariaLabel='apply filter'
            additionalClassName={searchButtonStyles()}
            onClick={handleSearch}
          >
            {t('actions.apply-filters')}
          </CustomButton>
        </Link>
      </div>
    </main>
  );
};

export default CustomSearch;
