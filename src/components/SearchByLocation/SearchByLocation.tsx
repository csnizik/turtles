import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IStateDropdownOption } from '../../common/types';
import {
  useGetCountyListQuery,
  useGetStateListQuery,
} from '../../Redux/services/api';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';
import './search-by-location.scss';

const SearchByLocation = ({ setSearchInput, setSearchInfo }: any) => {
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled]: any = useState(true);
  const [stateId, setStateId]: any = useState<string>(
    DEFAULT_NATIONAL_LOCATION
  );
  const [countyId, setCountyId]: any = useState<string>('');
  const countyStatus: any = useGetCountyListQuery(stateId);
  const stateStatus: any = useGetStateListQuery();
  //const state = stateStatus?.data[1].stateName;

  useEffect(() => {
    const id = `${stateId}000`;
    if (stateId) {
      setSearchInput((prevState) => ({
        ...prevState,
        state_county_code: id,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        state_county_code: null,
      }));
    }
  }, [isDisabled, stateId]);

  const handleSelectState = (event: any) => {
    const { value } = event.target;
    console.log(event.action);
    setStateId(value);
    setIsDisabled(false);
    //console.log(countyStatus.data[0].stateName);
    //console.log(value);
    setSearchInfo((prevState) => ({
      ...prevState,
      state: countyStatus.data[0].stateName,
    }));
  };

  const handleCountySelect = (event: any) => {
    const { value } = event.target;
    setCountyId(value);
    setSearchInput((prevState) => ({
      ...prevState,
      state_county_code: `${value}`,
    }));
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
            value={stateId}
          >
            <option value=''>{t('location-search.national')}</option>
            {stateStatus.isSuccess &&
              stateStatus.data &&
              stateStatus.data.map((state: IStateDropdownOption) => {
                return (
                  <option
                    key={state.stateCode}
                    value={state.stateCode}
                    //name={state.stateNameDisplay}
                  >
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
            onChange={handleCountySelect}
            value={countyId}
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
