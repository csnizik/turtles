import React, { useState } from 'react';

interface ISearchProperties {
  searchText: string
  setSearchText: Function,
  setQueryResults: Function
}

const SearchBar = ({searchText, setQueryResults, setSearchText}: ISearchProperties) => {
  const [currentSearchOption, setSearchOption] = useState('location');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setSearchText(value);
    console.log("Search Text-->",e.target.value)
  }

  const resetSearch = () => {
    setSearchText('');
    setQueryResults(null);
  }

  const handleChangeSearchOption = (e: any) => {
    setSearchOption(e.target.id);
  }

  const renderSearchForm = () => {
    const labelText = currentSearchOption === 'location'
      ? 'Location search' : 'Projects search';
    return (
      <>
        <label htmlFor="searchState">{labelText}</label>
        <div className="form-group search-field">
          <input
            type="text"
            className="form-control search-input"
            id="searchState"
            aria-describedby="searchHelp"
            onChange={handleSearch}
            value={searchText}
          />
          <button
            className='btn btn-primary search-btn'
            type='button'
            onClick={resetSearch}
          >
            <i className="fas fa-redo" />
          </button>
        </div>
      </>
    );
  }

  const renderSearchOptions = () => {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className="nav-link disabled"
            id='projects'
            onClick={handleChangeSearchOption}
            disabled
          >
            Projects
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link active"
            id='location'
            onClick={handleChangeSearchOption}
          >
            Location
          </button>
        </li>
      </ul>
    );
  }

  // const renderSearchInputs = () => {
  //   return (
  //     <div className='well'>
  //       <select>
  //         <option>State</option>
  //       </select>
  //     </div>
  //   );
  // }

  return (
    <>
      { renderSearchOptions() }
      { renderSearchForm() }
    </>
  )
}

export default SearchBar;
