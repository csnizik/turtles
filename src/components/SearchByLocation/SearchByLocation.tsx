import { useTranslation } from 'react-i18next';

import './search-by-location.scss';

const SearchByLocation = ({
  countyList,
  searchInput,
  statesList,
  handleInputChange,
}: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className='search-by-location-section'>
        <label
          className='usa-label location-search-header'
          htmlFor='locationValue'
        >
          {t('location-search.search-by-location')}
        </label>
        <div className='side-by-side'>
          <div className='desktop:grid-col-4'>
            <p>{t('location-search.labels.select-state')}</p>
            <select
              className='usa-select'
              id='stateValue'
              name='stateSelect'
              onChange={handleInputChange}
            >
              <option value={-1}>{t('location-search.national')}</option>
              {statesList.length
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

          <div className='desktop:grid-col-4'>
            <p>{t('location-search.labels.select-county')}</p>
            <select
              className='usa-select'
              id='countyValue'
              name='countySelect'
              onChange={handleInputChange}
              disabled={searchInput.stateSelect < 0}
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
        </div>
      </div>
    </>
  );
};

export default SearchByLocation;
