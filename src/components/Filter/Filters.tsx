import { useState } from 'react';
import './filters.scss';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import CustomButton from '../CustomButton';
import { ISearchData } from '../../common/types';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { usePostSearchDataQuery } from '../../Redux/services/api';

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
  const [searchInput, setSearchInput] =
    useState<ISearchData>(defaultSearchInput);
  const searchInputData = useAppSelector(
    (state) => state.practiceSlice.searchInfo
  );

  console.log('Search Input==>', searchInputData);
  // const { data, error, isLoading, isSuccess, isError } =
  //   usePostSearchDataQuery(searchInputData);

  // const information: any = data && data;
  const handleClick = () => {
    return 0;
  };
  return (
    <div className='filter-by-container'>
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
<<<<<<< Updated upstream
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
=======
                  <p className='filter-label'>{searchInputData.state}</p>
                </div>
              </div>
              <div className='filter-box'>
                <p className='p-label'>Land Use:</p>
                <div className='filter-pill'>
                  <p className='filter-label'>Placeholder</p>
                </div>
              </div>
              {searchInputData.practice_category_id ? (
                <div className='filter-box'>
                  <p className='p-label'>Conservation Practice(s):</p>
                  <div className='filter-pill'>
                    <p className='filter-label'>Placeholder</p>
>>>>>>> Stashed changes
                  </div>
                </div>
              ) : (
                <div className='filter-box'>
                  <p className='p-label'>Resource Concern(s) Treated:</p>
                  <div className='filter-pill'>
<<<<<<< Updated upstream
                    <p className='filter-label'>
                      {searchInputData.resource_concern ||
                        searchInputData.resource_concern_category}
                    </p>
=======
                    <p className='filter-label'>Placeholder</p>
>>>>>>> Stashed changes
                  </div>
                </div>
              )}

              <div className='tablet:grid-col-2 tablet:grid-offset-2'>
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
        )}
      </>
    </div>
  );
};

export default FilterBy;
