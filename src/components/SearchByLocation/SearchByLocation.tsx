import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IStateDropdownOption } from '../../common/types';
import { useGetStateListQuery } from '../../Redux/services/api';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';
import './search-by-location.scss';

const SearchByLocation = ({ setSearchInput, setSearchInfo }: any) => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled]: any = useState(true);
  const [stateId, setStateId]: any = useState<any>({
    id: DEFAULT_NATIONAL_LOCATION,
  });
  const stateStatus: any = useGetStateListQuery();

  const clearBtnClassNames = classNames(
    'btn',
    'btn-link',
    'clear-button',
    'margin-left-1',
    {
      selected: stateId !== '',
    }
  );

  useEffect(() => {
    const id = `${stateId.id}000`;
    const findStateName = stateStatus?.data?.find((state) => {
      const name = stateId.id === state.stateCode;
      return name;
    })?.stateNameDisplay;

    if (stateId) {
      setSearchInput((prevState) => ({
        ...prevState,
        state_county_code: id,
      }));
      setSearchInfo((prevState) => ({
        ...prevState,
        state: findStateName,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        state_county_code: null,
      }));
    }
  }, [isDisabled, stateId]);

  useEffect(() => {
    if (window.localStorage.getItem('StateId'))
      setStateId({ id: window.localStorage.getItem('StateId') });
  }, []);

  const handleSelectState = (event: any) => {
    const { value } = event.target;
    setStateId({ id: value });
    setIsDisabled(false);
    window.localStorage.setItem('StateId', value);
  };

  const handleClearLocation = () => {
    if (stateId) {
      setStateId({ id: DEFAULT_NATIONAL_LOCATION });
      window.localStorage.removeItem('StateId');
    }
  };

  return (
    <div className='search-by-location-section'>
      <div className='search-labels'>
        <label
          className='usa-label location-search-header'
          aria-labelledby='stateValue'
        >
          {t('location-search.search-by-location')}
        </label>
        <button
          className={clearBtnClassNames}
          type='button'
          onClick={handleClearLocation}
        >
          {t('actions.clear')}
        </button>
      </div>
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
            value={stateId.id}
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
      </div>
    </div>
  );
};

export default SearchByLocation;
