import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IStateDropdownOption } from '../../common/types';
import {
  useGetCountyListQuery,
  useGetStateListQuery,
} from '../../Redux/services/api';
import './location-search.scss';
import CustomButton from '../CustomButton';

const LocationSearch = () => {
  const history: any = useHistory();
  const { t } = useTranslation();

  const handleClick = () => {
    history.push('Location');
  };
  const [isDisabled, setIsDisabled]: any = useState(true);

  const [selectedState, setSelectedState]: any = useState<number>(-1);
  const [selectedCounty, setSelectedCounty]: any = useState(-1);

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

  // const handleSelectCounty = (event: any) => {
  //   setSelectedCounty(event.target.value);
  // };

  return (
    <div className='grid-row location-search-container'>
      <div className='desktop:grid-col-4 img-row'>
        <img src='images/homePageUSMap.png' alt='Map of the United States' />
      </div>
      <div className='desktop:grid-col-7 content-row'>
        <h2>{t('location-search.explore-by-location')}</h2>
        <p className='p-style'>{t('location-search.introductory-paragraph')}</p>
        <div className='location-label-grid'>
          <label className='usa-label' htmlFor='stateSelect'>
            {t('location-search.labels.select-state')}
          </label>
          <label className='usa-label' htmlFor='countySelect'>
            {t('location-search.labels.select-county')}
          </label>
        </div>
        <div className='state-county-grid'>
          <select
            className='usa-select'
            id='stateSelect'
            name='stateOptions'
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
          <select
            className='usa-select'
            id='countySelect'
            name='countyOptions'
            disabled={isDisabled}
            // onChange={handleSelectCounty}
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
        <CustomButton onClick={handleClick}>
          {t('location-search.explore-location')}
        </CustomButton>
      </div>
    </div>
  );
};

export default LocationSearch;
