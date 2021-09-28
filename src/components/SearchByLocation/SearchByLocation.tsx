import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IStateDropdownOption } from '../../common/types';
import {
  useGetCountyListQuery,
  useGetStateListQuery,
} from '../../Redux/services/api';

import './search-by-location.scss';

const SearchByLocation = () => {
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled]: any = useState(true);

  const [selectedState, setSelectedState]: any = useState<number>(-1);

  const countyStatus = useGetCountyListQuery(selectedState);
  const stateStatus = useGetStateListQuery();

  useEffect(() => {
    if (selectedState < 0) {
      setIsDisabled(true);
    }
  }, [selectedState]);

  const handleSelectState = (event: any) => {
    const stateVal = event.target.value;
    setSelectedState(stateVal);
    setIsDisabled(false);
  };
  return (
    <>
      <div className='search-by-location-section'>
        <label
          className='usa-label location-search-header'
          aria-labelledby='stateValue countyValue'
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
              name='stateSelect'
              onChange={handleSelectState}
            >
              <option value={-1}>{t('location-search.national')}</option>
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
              name='countySelect'
              disabled={isDisabled}
            >
              <option value={-1}>{t('actions.select')}</option>
              {countyStatus.isSuccess &&
                countyStatus.data &&
                countyStatus.data.map((county: any) => {
                  return (
                    <option key={county.countyCode} value={county.countyCode}>
                      {county.countyDisplay}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchByLocation;
