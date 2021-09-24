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
    DEFAULT_NATIONAL_LOCATION,
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
    const id = value.split(',');
    setStateId(id[0]);
    setIsDisabled(false);
    setSearchInfo((prevState) => ({
      ...prevState,
      state: id[1],
    }));
  };

  const handleClearLocation = () => {
    if (stateId) {
      setStateId('');
    }
  };

  return (
    <div className='search-by-location-section'>
      <div className='search-labels'>
        <label
          className='usa-label location-search-header'
          htmlFor='locationValue'
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
                  <option
                    key={state.stateCode}
                    value={`${state.stateCode},${state.stateNameDisplay} `}
                    // value={state.stateCode}
                    //name={state.stateNameDisplay}
                  >
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
