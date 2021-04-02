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

  }

  return (
    <div className="row form-group search-field">
      <label htmlFor="searchState">Search:</label>
      <input
        type="text"
        className="form-control col-md-6"
        id="searchState"
        aria-describedby="searchHelp"
        onChange={handleSearch}
        value={searchText}
      />
      <button
        className='btn btn-primary col-md-2'
        type='button'
        onClick={fireSearch}
      >
        Submit
      </button>
    </div>
  )
}

export default SearchBar;
