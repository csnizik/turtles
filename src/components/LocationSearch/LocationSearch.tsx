import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getRequest } from '../../common/util/AxiosUtil';
import './location-search.scss';
import CustomButton from '../CustomButton';

const LocationSearch = ({ statesList }: any) => {
  const history: any = useHistory();
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
    <div className='location-grid'>
      <div className='location-box'>
        <h3>Explore by Location</h3>
        <p className='p-style'>
          State and county provides lorum ipsum dolor sit amet, consectetur
          adipiscing elit. Aenean vehicula diam et diam tempor fringila
        </p>
        <div className='grid-row'>
          <div className='grid-col-4 selectors'>
            <label className='usa-label' htmlFor='locationOptions'>
              Select a state
            </label>
            <select
              className='usa-select'
              name='locationOptions'
              onChange={handleSelectState}
            >
              <option>National (default)</option>
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
          </div>
          <div className='grid-col-4 selectors'>
            <label className='usa-label' htmlFor='locationOptions'>
              Select a county (Optional)
            </label>

            <select
              className='usa-select'
              name='locationOptions'
              disabled={!countyList.length}
            >
              <option>- Select -</option>
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
          </div>
          <div className='grid-col-3 location-button-style'>
            <CustomButton onClick={handleClick}>Explore Location</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
