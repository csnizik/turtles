import './search-by-location.scss';

const SearchByLocation = ({
  countyList,
  searchInput,
  statesList,
  handleInputChange,
}: any) => {
  return (
    <>
      <div className='search-by-location-section'>
        <label
          className='usa-label location-search-header'
          htmlFor='locationValue'
        >
          Search by Location
        </label>
        <div className='side-by-side'>
          <div className='desktop:grid-col-4'>
            <p>Select a state</p>
            <select
              className='usa-select'
              id='stateValue'
              name='stateSelect'
              placeholder='National (default)'
              onChange={handleInputChange}
            >
              <option value=''>National (default)</option>
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
            <p>Select a county (optional)</p>
            <select
              className='usa-select'
              id='countyValue'
              name='countySelect'
              placeholder='- Select county -'
              onChange={handleInputChange}
              disabled={!searchInput.stateSelect}
            >
              <option value=''>- Select county -</option>
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
