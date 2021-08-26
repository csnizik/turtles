import { useState } from 'react';
import './filter-by.scss';

interface IFilterData {
  id: number;
  label: string;
}

const exampleFilterData: IFilterData[] = [
  {
    id: 0,
    label: 'Cropland',
  },
  {
    id: 1,
    label: 'Virginia',
  },
];

const FilterBy = () => {
  const [filterState, setFilterState] = useState(['']);
  const [selectedFilter, setSelectedFilter] = useState(-1);
  const handleClick = () => {
    setFilterState([]);
  };
  if (filterState.length > 0) {
    return (
      <div className='filter-by-container'>
        <div className='filter-by-grid'>
          <p aria-label='Filter By' className='filter-style'>
            Filter by:
          </p>
          <select
            className='usa-select filter-select'
            id='locationOptions'
            name='locationSelect'
          >
            <option value={-1}>Location</option>
          </select>
          <select
            className='usa-select filter-select'
            id='locationOptions'
            name='locationSelect'
          >
            <option value={-1}>Land use</option>
          </select>
          <select
            className='usa-select filter-select'
            id='locationOptions'
            name='locationSelect'
          >
            <option value={-1}>Conservation Practice</option>
          </select>
          <select
            className='usa-select filter-select'
            id='locationOptions'
            name='locationSelect'
          >
            <option value={-1}>Resource Concern Treated</option>
          </select>
        </div>
        <hr className='filter-by-border' />
        <div className='filter-grid'>
          <p aria-label='Filter By' className='filter-style'>
            Active Filters:
          </p>
          {exampleFilterData.length &&
            exampleFilterData.map((filterType: IFilterData) => {
              return (
                <div className='filter-box' key={filterType.id}>
                  <p> {filterType.label}</p>
                  <p>X</p>
                </div>
              );
            })}
          <span className='clear-style' onClick={handleClick}>
            Clear all
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className='filter-inactive'>
      <div className='filter-by-grid'>
        <p aria-label='Filter By' className='filter-style'>
          Filter by:
        </p>
        <select
          className='usa-select filter-select'
          id='locationOptions'
          name='locationSelect'
        >
          <option value={-1}>Location</option>
        </select>
        <select
          className='usa-select filter-select'
          id='locationOptions'
          name='locationSelect'
        >
          <option value={-1}>Land use</option>
        </select>
        <select
          className='usa-select filter-select'
          id='locationOptions'
          name='locationSelect'
        >
          <option value={-1}>Conservation Practice</option>
        </select>
        <select
          className='usa-select filter-select'
          id='locationOptions'
          name='locationSelect'
        >
          <option value={-1}>Resource Concern Treated</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBy;
