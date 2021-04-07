import React, { useEffect } from 'react';
import { searchOptionMap } from '../common/constants';

interface ISearchOption {
  option: string,
  currentSearchOption: string,
  handleSearchChange: Function
}

const SearchOption = ({ option, currentSearchOption, handleSearchChange } : ISearchOption) => {
  return (
    <li className="nav-item">
      <button
        className={option === currentSearchOption ? "nav-link active" : "nav-link"}
        id='projects'
        onClick={() => handleSearchChange(option)}
      >
        {option}
      </button>
    </li>
  );
}

export default SearchOption;
