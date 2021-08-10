import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import './location-search.scss';
import CustomButton from '../CustomButton';

const LocationSearch = ({ statesList }: any) => {
  const history: any = useHistory();
  const { t } = useTranslation();
  const handleClick = () => {
    history.push('search');
  };
  const [countyList, setCountyList]: any = useState([]);
  const [selectedState, setSelectedState]: any = useState('');
  async function fetchCountyListPerStateCode(stateCode: any) {
    const countyResponse = await getRequest(`/counties/${stateCode}`);
    setCountyList(countyResponse.data);
  }

  const handleSelectState = (event: any) => {
    const stateVal = event.target.value;
    fetchCountyListPerStateCode(stateVal);
    setSelectedState(stateVal);
  };

  return (
    <div className='location-search-section'>
      <h3>{t('location-search.explore-by-location')}</h3>
      <p className='p-style'>{t('location-search.introductory-paragraph')}</p>
      <div className='location-label-grid'>
        <label className='usa-label' htmlFor='locationOptions'>
          {t('location-search.labels.select-state')}
        </label>
        <label className='usa-label' htmlFor='locationOptions'>
          {t('location-search.labels.select-county')}
        </label>
      </div>
      <div className='location-search-grid'>
        <select
          className='usa-select'
          name='locationOptions'
          onChange={handleSelectState}
        >
          <option>{t('location-search.national')}</option>
          {statesList && statesList.length
            ? statesList.map((state: any) => {
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
          name='locationOptions'
          disabled={!countyList.length}
        >
          <option>{t('actions.select')}</option>
          {countyList && countyList.length
            ? countyList.map((county: any) => {
                return (
                  <option key={county.countyCode} value={county.countyCode}>
                    {county.countyDisplay}
                  </option>
                );
              })
            : null}
        </select>
        <CustomButton onClick={handleClick}>
          {t('location-search.explore-location')}
        </CustomButton>
      </div>
    </div>
  );
};

export default LocationSearch;
