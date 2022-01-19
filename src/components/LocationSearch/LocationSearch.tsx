import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IStateDropdownOption } from '../../common/types';
import { useGetStateListQuery } from '../../Redux/services/api';
import {
  UNITED_STATES_ABBR,
  DEFAULT_NATIONAL_LOCATION,
} from '../../common/constants';

import './location-search.scss';
import CustomButton from '../CustomButton';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { currentState } from '../../Redux/Slice/stateSlice';

const initialState = {
  stateNameDisplay: UNITED_STATES_ABBR,
  stateCode: '00',
  stateAbbreviation: UNITED_STATES_ABBR,
};

const LocationSearch = () => {
  const history: any = useHistory();
  const { t } = useTranslation();
  // '00' represents National
  const [selectedState, setSelectedState]: any = useState<string>(
    DEFAULT_NATIONAL_LOCATION
  );
  const stateStatus = useGetStateListQuery();
  const dispatch = useAppDispatch();

  const handleDropdownSelection = (event: any) => {
    const { name, value } = event.target;
    if (name === 'stateOptions' && value) {
      setSelectedState(value);
    } else {
      dispatch(currentState(initialState));
    }
  };

  useEffect(() => {
    dispatch(currentState(initialState));
  }, []);

  const handleClick = () => {
    let selectedStateCode;
    if (selectedState && selectedState !== '00') {
      selectedStateCode =
        selectedState &&
        stateStatus.isSuccess &&
        stateStatus.data &&
        stateStatus.data.find((state: any) => {
          return state.stateCode === selectedState;
        });
      dispatch(currentState(selectedStateCode));
    }
    history.push({
      pathname: `${
        selectedStateCode?.stateCode || DEFAULT_NATIONAL_LOCATION
      }/ConservationPractices`,
    });
  };

  return (
    <section
      className='grid-row location-search-container'
      data-testid='location-search'
    >
      <div className='desktop:grid-col-4 img-row margin-right-3'>
        <img src='images/homePageUSMap.png' alt='Map of the United States' />
      </div>
      <div className='desktop:grid-col-7 content-row margin-top-4'>
        <h2>{t('location-search.explore-by-location')}</h2>
        <p className='p-style'>{t('location-search.introductory-paragraph')}</p>
        <div className='location-label-grid'>
          <label className='usa-label' htmlFor='stateSelect'>
            {t('location-search.labels.select-state')}
          </label>
        </div>
        <div className='state-county-grid'>
          <select
            className='usa-select'
            id='stateSelect'
            name='stateOptions'
            data-testid='select'
            onChange={handleDropdownSelection}
            value={selectedState}
          >
            <option data-testid='select-option' value='00'>
              {t('location-search.national')}
            </option>
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
          <CustomButton onClick={handleClick}>
            {t('location-search.explore-location')}
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default LocationSearch;
