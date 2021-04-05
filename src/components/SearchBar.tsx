import React from 'react';

interface ISearchProperties {
  searchText: string,
  setSearchText: Function
}

const SearchBar = ({searchText, setSearchText}: ISearchProperties) => {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const fireSearch = (e: React.MouseEvent<HTMLElement>) => {
    console.log("Search button clicked")
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
        onClick={fireSearch}
      >
        <i className="fas fa-search" />
      </button>
    </div>

    </>
  )
}

export default SearchBar;
