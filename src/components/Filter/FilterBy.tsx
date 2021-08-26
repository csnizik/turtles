import { useState } from 'react';
import './filter-by.scss';

interface IFilterData {
  id: number;
  label: string;
}

const exampleFilterData: IFilterData[] = [
  // {
  //   id: 0,
  //   label: 'Cropland',
  // },
  // {
  //   id: 1,
  //   label: 'Virginia',
  // },
];

const FilterBy = () => {
  const [activeFilterList, setActiveFilters]: any = useState(exampleFilterData);
  const handleClearIndividualFilter = (indexToRemove: number) => {
    const updatedFilters: any = activeFilterList.filter((filter: any) => {
      return filter.id !== indexToRemove;
    });
    setActiveFilters(updatedFilters);
  };
  const handleClearAllFilter = () => {
    setActiveFilters([]);
  };
  const handleAddFilter = (filter: string) => {
    const updatedFilters: any = [...activeFilterList];
    updatedFilters.push({ id: updatedFilters.length, label: filter });
    setActiveFilters(updatedFilters);
  };
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
          onClick={() => handleAddFilter('Location')}
        >
          <option value={-1}>Location</option>
        </select>
        <select
          className='usa-select filter-select'
          id='locationOptions'
          name='locationSelect'
          onClick={() => handleAddFilter('Land')}
        >
          <option value={-1}>Land use</option>
        </select>
        <select
          className='usa-select filter-select'
          id='locationOptions'
          name='locationSelect'
          onClick={() => handleAddFilter('Practice')}
        >
          <option value={-1}>Conservation Practice</option>
        </select>
        <select
          className='usa-select filter-select'
          id='locationOptions'
          name='locationSelect'
          onClick={() => handleAddFilter('Concern')}
        >
          <option value={-1}>Related Resource Concern</option>
        </select>
      </div>
      {activeFilterList.length ? (
        <>
          <hr className='filter-by-border' />
          <div className='filter-grid'>
            <p aria-label='Filter By' className='filter-style'>
              Active Filters:
            </p>
            {activeFilterList.length
              ? activeFilterList.map(
                  (filterType: IFilterData, index: number) => {
                    return (
                      <div className='filter-box' key={filterType.id}>
                        <p className='filter-label'>{filterType.label}</p>
                        <i
                          aria-label='Clear filter'
                          className='fas fa-times'
                          role='button'
                          tabIndex={index + 1}
                          onClick={() =>
                            handleClearIndividualFilter(filterType.id)
                          }
                          onKeyUp={() =>
                            handleClearIndividualFilter(filterType.id)
                          }
                        />
                      </div>
                    );
                  }
                )
              : null}
            <span
              role='button'
              tabIndex={0}
              className='clear-style'
              onClick={handleClearAllFilter}
              onKeyUp={handleClearAllFilter}
            >
              Clear all
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FilterBy;
