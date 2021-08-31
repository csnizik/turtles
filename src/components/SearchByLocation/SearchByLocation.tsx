import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IStateDropdownOption } from '../../common/types';
import {
  useGetCountyListQuery,
  useGetStateListQuery,
} from '../../Redux/services/api';

import './search-by-location.scss';

const SearchByLocation = ({ searchInput, handleInputChange }: any) => {
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled]: any = useState(true);
  const stateStatus = useGetStateListQuery();
  const countyStatus = useGetCountyListQuery(searchInput.selectedStateId);

  useEffect(() => {
    if (!searchInput.selectedStateId) {
      setIsDisabled(true);
    }
  }, [searchInput]);

  const handleSelectState = (event: any) => {
    handleInputChange(event);
    setIsDisabled(false);
  };

  return (
    <div className='search-by-location-section'>
      <label
        className='usa-label location-search-header'
        htmlFor='locationValue'
      >
        {t('location-search.search-by-location')}
      </label>
      <div className='side-by-side'>
        <div className='desktop:grid-col-4'>
          <label htmlFor='stateValue'>
            {t('location-search.labels.select-state')}
          </label>
          <select
            className='usa-select'
            id='stateValue'
            name='selectedStateId'
            onChange={handleSelectState}
            value={searchInput.selectedStateId}
          >
            <option value=''>{t('location-search.national')}</option>
            {stateStatus.isSuccess &&
              stateStatus.data &&
              stateStatus.data.map((state: IStateDropdownOption) => {
                return (
                  <option key={state.stateCode} value={state.stateCode}>
                    {state.stateNameDisplay}
                  </option>
                );
              })}
          </select>
        </div>

        <div className='desktop:grid-col-4'>
          <label htmlFor='countyValue'>
            {t('location-search.labels.select-county')}
          </label>
          <select
            className='usa-select'
            id='countyValue'
            name='selectedCountyId'
            disabled={isDisabled}
            onChange={handleInputChange}
            value={searchInput.selectedCountyId}
          >
            <option value=''>{t('actions.select')}</option>
            {countyStatus.isSuccess &&
              countyStatus.data &&
              countyStatus.data.map((county: any) => {
                return (
                  <option
                    key={county.stateCountyCode}
                    value={county.stateCountyCode}
                  >
                    {county.countyDisplay}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchByLocation;
