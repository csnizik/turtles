import React from 'react';

interface ISearchProperties {
  searchText: string
  setSearchText: Function,
  setQueryResults: Function
}

const SearchBar = ({searchText, setQueryResults, setSearchText}: ISearchProperties) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setSearchText(value);
    console.log("Search Text-->",e.target.value)
  }

  const resetSearch = () => {
    setSearchText('');
    setQueryResults(null);
  }

  return (
    <>
    <label htmlFor="searchState">Keyword search</label>
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
  )
}

export default SearchBar;
