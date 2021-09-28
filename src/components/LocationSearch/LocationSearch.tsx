import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IStateDropdownOption } from '../../common/types';
import {
  useGetCountyListQuery,
  useGetStateListQuery,
} from '../../Redux/services/api';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';

import './location-search.scss';
import CustomButton from '../CustomButton';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { currentState } from '../../Redux/Slice/stateSlice';

const initialState = {
  stateNameDisplay: 'U.S.',
  stateCode: '00',
  stateAbbreviation: 'U.S.',
};

const LocationSearch = () => {
  const history: any = useHistory();
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled]: any = useState(true);
  // '00' represents National
  const [selectedState, setSelectedState]: any = useState<string>(
    DEFAULT_NATIONAL_LOCATION
  );
  const [selectedCounty, setSelectedCounty]: any = useState<string>('');
  const countyStatus = useGetCountyListQuery(selectedState);
  const stateStatus = useGetStateListQuery();
  const dispatch = useAppDispatch();

  const handleDropdownSelection = (event: any) => {
    const { name, value } = event.target;
    if (name === 'stateOptions' && value) {
      setSelectedState(value);
      setIsDisabled(false);
      if (!selectedCounty && countyStatus.isSuccess && countyStatus.data) {
        // Once a state is selected, default counties to 'All Counties'
        setSelectedCounty(countyStatus.data[0].countyCode);
      } else if (selectedState && selectedState !== value && selectedCounty) {
        setSelectedCounty('');
      }
    } else if (name === 'countyOptions') {
      setSelectedCounty(value);
    } else {
      dispatch(currentState(initialState));
    }
  };

  useEffect(() => {
    if (!selectedState || selectedState === '00') {
      setIsDisabled(true);
    }
  }, [selectedState]);

  const handleClick = () => {
    history.push({
      pathname: '/ConservationPractices',
      state: { selectedStateId: selectedState },
    });
  };

  return (
    <section className='grid-row location-search-container'>
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
            onChange={handleDropdownSelection}
            value={selectedState}
          >
            <option value='00'>{t('location-search.national')}</option>
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
            onChange={handleDropdownSelection}
            disabled={isDisabled}
            value={selectedCounty}
          >
            <option value=''>{t('actions.select')}</option>
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
    </section>
  );
};

export default LocationSearch;
