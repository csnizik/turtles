import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import { IStateDropdownOption } from '../../common/types';
import './location-search.scss';
import CustomButton from '../CustomButton';

const LocationSearch = ({ statesList }: any) => {
  const history: any = useHistory();
  const { t } = useTranslation();
  const handleClick = () => {
    history.push('Location');
  };
  const [countyList, setCountyList]: any = useState([]);
  const [selectedState, setSelectedState]: any = useState<number>(-1);
  const [selectedCounty, setSelectedCounty]: any = useState(-1);
  async function fetchCountyListPerStateCode(stateCode: any) {
    const countyResponse = await getRequest(`/counties/${stateCode}`);
    setCountyList(countyResponse.data);
  }

  const handleSelectState = (event: any) => {
    const stateVal = event.target.value;
    fetchCountyListPerStateCode(stateVal);
    setSelectedState(stateVal);
    if (selectedState >= 0 && selectedCounty && selectedState !== stateVal) {
      setCountyList([]);
    }
  };

  const handleSelectCounty = (event: any) => {
    setSelectedCounty(event.target.value);
  };

  return (
    <div className='grid-row location-search-container'>
      <div className='tablet:grid-col-3 img-row'>
        <img src='images/homePageUSMap.png' alt='Map of the United States' />
      </div>
      <div className='tablet:grid-col-7 tablet:grid-offset-1 content-row'>
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
            {statesList.length
              ? statesList.map((state: IStateDropdownOption) => {
                  return (
                    <option key={state.stateCode} value={state.stateCode}>
                      {state.stateNameDisplay}
                    </option>
                  );
                })
              : null}
          </select>
          <select
            className='usa-select'
            id='countySelect'
            name='countyOptions'
            disabled={!countyList.length}
            onChange={handleSelectCounty}
          >
            <option value={-1}>{t('actions.select')}</option>
            {countyList.length
              ? countyList.map((county: any) => {
                  return (
                    <option key={county.countyCode} value={county.countyCode}>
                      {county.countyDisplay}
                    </option>
                  );
                })
              : null}
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
