import { useState } from 'react';
import './filters.scss';
import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { ISearchData } from '../../common/types';

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
const defaultSearchInput: ISearchData = {
  resource_concern_category_id: null,
  resource_concern_id: null,
  practice_category_id: null,
  practice_id: null,
  state_county_code: null,
  land_use_list: null,
  practices: null,
};

const FilterBy = () => {
  const [activeFilterList, setActiveFilters]: any = useState(exampleFilterData);
  const [searchInput, setSearchInput] =
    useState<ISearchData>(defaultSearchInput);
  const handleClick = () => {
    return 0;
  };
  return (
    <div className='filter-by-container'>
      <>
        <hr className='filter-by-border' />
        <div className='grid-row'>
          <p aria-label='Filter By' className='filter-style'>
            Active Filters:
          </p>
          {activeFilterList.length
            ? activeFilterList.map((filterType: IFilterData, index: number) => {
                return (
                  <div className='filter-box' key={filterType.id}>
                    <p className='filter-label'>{filterType.label}</p>
                  </div>
                );
              })
            : null}
          <div className='grid-col-5 grid-offset-1 tablet:grid-col-2 tablet:grid-offset-9'>
            <Link
              to={{
                pathname: '/search',
                state: { detail: searchInput },
              }}
            >
              <CustomButton onClick={() => handleClick()}>
                Back to Quick Search
              </CustomButton>
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default FilterBy;
