import './filters.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { ISearchData } from '../../common/types';

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
  const [searchInput] = useState<ISearchData>(defaultSearchInput);
  const searchInputData = useAppSelector(
    (state) => state?.practiceSlice?.searchInfo
  );
  const handleClick = () => {
    return 0;
  };
  return (
    <div data-testid='filters' className='filter-by-container'>
      <>
        {searchInputData && (
          <>
            <div className='grid-row'>
              <p aria-label='Filter By' className='filter-style'>
                Active Filters:
              </p>

              <div className='filter-box'>
                <p className='p-label'>Location:</p>
                <div className='filter-pill'>
                  <p className='filter-label'>
                    {searchInputData.state || 'National'}
                  </p>
                </div>
              </div>
              {searchInputData.land_use_list ? (
                <div className='filter-box'>
                  <p className='p-label'>Land Use:</p>
                  <div className='filter-pill'>
                    <p className='filter-label'>
                      {searchInputData.land_use_list}
                    </p>
                  </div>
                </div>
              ) : null}
              {searchInputData.practice_category ? (
                <div className='filter-box'>
                  <p className='p-label'>Conservation Practice(s):</p>
                  <div className='filter-pill'>
                    <p className='filter-label'>
                      {searchInputData.practice ||
                        searchInputData.practice_category}
                    </p>
                  </div>
                </div>
              ) : null}
              {searchInputData.resource_concern_category ? (
                <div className='filter-box'>
                  <p className='p-label'>Resource Concern(s) Treated:</p>
                  <div className='filter-pill'>
                    <p className='filter-label'>
                      {searchInputData.resource_concern ||
                        searchInputData.resource_concern_category}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        )}
      </>
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
  );
};

export default FilterBy;
