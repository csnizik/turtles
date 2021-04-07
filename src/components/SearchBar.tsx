import React, { useEffect, useState } from 'react';
import SearchOption from './SearchOption';
import { sortStateList } from '../common/util/helpers';
import { searchOptionMap } from '../common/constants';

interface ISearchProperties {
  searchText: string
  setSearchText: Function,
  setQueryResults: Function,
  setStateDropdownOption: Function,
  stateList: any,
  currentStateOption: string
}

const SearchBar = ({
    searchText,
    setQueryResults,
    setSearchText,
    stateList,
    setStateDropdownOption,
    currentStateOption
  }: ISearchProperties) => {

  const [currentSearchOption, setSearchOption] = useState('location');
  const sortedStateList = sortStateList(stateList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setStateDropdownOption('')
    setSearchText(value);
  }

  const resetSearch = () => {
    setSearchText('');
    setQueryResults(null);
    setStateDropdownOption('');
  }

  const handleChangeSearchOption = (option: string) => {
    setStateDropdownOption('');
    setSearchText('');
    setSearchOption(option);
  }

  const handleChangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateDropdownOption(e.target.value);
  }

  const renderSearchForm = () => {
    const labelText = currentSearchOption === 'location'
      ? 'Location search' : 'Projects search';
    return (
      <>
        <label htmlFor="searchState">{labelText}</label>
        <div className="form-group search-field">
          <div className="input-group">
            <input
              type="text"
              id="searchState"
              className="form-control search-input"
              aria-describedby="searchHelp"
              onChange={handleSearch}
              value={searchText}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
          {/**
            // TODO: Add Reset search button
            <button
              className='btn btn-primary reset-search-btn'
              type='button'
              onClick={resetSearch}
            >
              Reset
              {' '}
              <i className="fas fa-redo" />
            </button>
          **/}
        </div>
      </>
    );
  }

  const renderSearchOptions = () => {
    return (
      <ul className="nav nav-tabs">
        {Object.keys(searchOptionMap).map(option => {
          return (
            <SearchOption
              key={option}
              currentSearchOption={currentSearchOption}
              option={option}
              handleSearchChange={handleChangeSearchOption}
            />
          )
        })}
      </ul>
    );
  }

  const renderSearchInputs = () => {
    if (!currentSearchOption) return null;
    if (currentSearchOption === 'location') {
      return (
        <div className='card card-body bg-light'>
          <div className="form-group">
            <label htmlFor="stateDropdown">
              State
            </label>
            <select
              className="form-control"
              id="stateDropdown"
              onChange={handleChangeState}
              defaultValue={currentStateOption}
              value={currentStateOption}
            >
              <option value=''>
              </option>
              {
                sortedStateList.map((state: any) => {
                  return (
                    <option
                      key={state.attributes.objectid_1}
                      value={state.attributes.objectid_1}
                      >
                      {state.attributes.state_name}
                    </option>
                  )
                })
              }
            </select>
          </div>
        </div>
      );
    }

    if (currentSearchOption === 'projects') {
      return (
        <div className='card card-body bg-light'>
          <div className="form-group">
            <label htmlFor="projectNumber">
              Project Number
            </label>
            <input
              type="text"
              className="form-control"
              id="projectNumber"
              aria-describedby="projectNumberHelp"
            />
          </div>
        </div>
      );
    }
  }

  return (
    <>
      { renderSearchOptions() }
      { renderSearchForm() }
      { renderSearchInputs() }
    </>
  )
}

export default SearchBar;
