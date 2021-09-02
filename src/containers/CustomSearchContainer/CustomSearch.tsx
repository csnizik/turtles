import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header';
import BREAKPOINTS from '../../common/constants';
import CustomButton from '../../components/CustomButton';
import SearchByLocation from '../../components/SearchByLocation';
import SearchByResourceConcern from '../../components/SearchByResourceConcern';
import LandUseSection from '../../components/LandUseSection';
import SearchByConservationPractice from '../../components/SearchByConservationPractice';

const defaultSearchInput: any = {
  selectedStateId: '',
  selectedCountyId: '',
  selectedLandUseIds: [],
  selectedPracticeCategory: '',
  selectedPractice: '',
  selectedResourceCategory: '',
  selectedResourceSubgroup: '',
};

interface ICustomSearchProps {
  setSearchToggle: Function;
}

const CustomSearch = ({ setSearchToggle }: ICustomSearchProps) => {
  const { t } = useTranslation();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [searchInput, setSearchInput]: any = useState(defaultSearchInput);

  const handleInputChange = (e: any) => {
    const { name, value, checked } = e.target;
    let landUseSelections = searchInput.selectedLandUseIds;
    if (name.includes('selectedLandUseIds')) {
      if (!checked && landUseSelections.includes(value)) {
        landUseSelections = landUseSelections.filter((landUse: any) => {
          return landUse.landUseCategoryID === value;
        });
      } else if (!landUseSelections.includes(value)) {
        landUseSelections.push(value);
      }
      setSearchInput({ ...searchInput, selectedLandUseIds: landUseSelections });
    } else {
      setSearchInput({ ...searchInput, [name]: value });
    }
  };

  const handleSearch = () => {
    //console.log('TODO: Submit form for search', searchInput);
    setSearchToggle(true);
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
      <Header
        priority='1'
        headerText={t('search-page.quick-search')}
        paragraphText={t('search-page.intro')}
        parentClassNames='custom-search-header'
      />
      <SearchByLocation
        searchInput={searchInput}
        handleInputChange={handleInputChange}
      />
      <LandUseSection
        searchInput={searchInput}
        handleInputChange={handleInputChange}
      />
      <p className='practice-description'>
        {t('search-by-conservation-practice.description')}
      </p>
      <div className='bottom-container'>
        <SearchByConservationPractice
          searchInput={searchInput}
          handleInputChange={handleInputChange}
        />
        <SearchByResourceConcern
          searchInput={searchInput}
          handleInputChange={handleInputChange}
        />
      </div>
      <div className='grid-row search-button-row'>
        <Link to='/search-results'>
          <CustomButton
            ariaLabel='search'
            additionalClassName={searchButtonStyles()}
            onClick={handleSearch}
          >
            {t('actions.search')}
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default CustomSearch;
