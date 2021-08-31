import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import './search-by-resource-concern.scss';
import { disableState, enableState } from '../../Redux/Slice/disableSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';

const SearchByResourceConcern = ({ searchInput, handleInputChange }: any) => {
  const dispatchRequest = useAppDispatch();
  const status = useAppSelector((state) => state.disableSlice.disablePractice);
  const { t } = useTranslation();
  const [resourceConcerns, setResourceConcerns] = useState<any[]>([]);
  const [resourceConcernsSubgroups, setResourceConcernsSubgroups] = useState<
    any[]
  >([]);

  const getResourceConcerns = async () => {
    try {
      const response: any = await getRequest('/resourceConcern/concern');
      setResourceConcerns(response.data.length > 0 ? response.data : []);
    } catch (error) {
      // throw new Error('Resource Concern Request Error');
    }
  };

  const getResourceConcernsSubgroups = async (swapaCategory) => {
    try {
      const response: any = await getRequest(
        `/resourceConcern/concern/category/${swapaCategory}`
      );
      setResourceConcernsSubgroups(
        response.data.length > 0 ? response.data : []
      );
    } catch (error) {
      throw new Error('Resource Concern Subgroup Request Error');
    }
  };

  useEffect(() => {
    getResourceConcerns();
  }, []);

  const handleChange = (e) => {
    const { value }: any = e.target;
    handleInputChange(e);
    if (e.target.value !== '') {
      getResourceConcernsSubgroups(value);
      dispatchRequest(disableState());
    } else {
      setResourceConcernsSubgroups([]);
      dispatchRequest(enableState());
    }
  };

  const handleSubgroupChange = (e) => {
    handleInputChange(e);
  };

  return (
    <div className='resource-box-wrapper'>
      <div className='search-by-resource-section'>
        <label
          className='usa-label resource-search-header'
          htmlFor='locationValue'
        >
          {t('search-by-resource-concern.heading')}
        </label>
        <div className='desktop:grid-col-8'>
          <p>{t('search-by-resource-concern.first-label-name')}</p>
          <select
            className='usa-select'
            id='resourceConcernCategoryValue'
            name='selectedResourceCategory'
            disabled={status}
            onChange={handleChange}
            value={searchInput.selectedResourceCategory}
          >
            <option value=''>All resource concerns (default)</option>
            {resourceConcerns.length
              ? resourceConcerns.map((item: any) => {
                  return (
                    <option
                      key={item.resourceConcernId}
                      value={item.resourceConcernId}
                    >
                      {item.resourceConcernName}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <div className='desktop:grid-col-8'>
          <p>{t('search-by-resource-concern.second-label-name')}</p>
          <select
            className='usa-select'
            id='resourceConcernValue'
            name='selectedResourceSubgroup'
            disabled={searchInput.selectedResourceCategory === ''}
            onChange={handleSubgroupChange}
            value={searchInput.selectedResourceSubgroup}
          >
            <option value=''>- Select resource concern -</option>
            {resourceConcernsSubgroups.length
              ? resourceConcernsSubgroups.map((item: any) => {
                  return (
                    <option
                      key={item.resourceConcernId}
                      value={item.resourceConcernId}
                    >
                      {item.resourceConcernName}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchByResourceConcern;
