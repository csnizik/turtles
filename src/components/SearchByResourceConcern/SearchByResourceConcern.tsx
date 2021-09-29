import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { getRequest } from '../../common/util/AxiosUtil';
import { initialResourceState } from '../../common/typedconstants.common';

import {
  disableResourceDropdown,
  enableResourceDropdown,
} from '../../Redux/Slice/disableSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import './search-by-resource-concern.scss';

const SearchByResourceConcern = ({
  setSearchInput,
  setSearchInfo,
  resourceConcernsSubgroups,
  setResourceConcernsSubgroups,
  selectedResourceCategory,
  setSelectedResourceCategory,
  selectedPractice,
}: any) => {
  const dispatchRequest = useAppDispatch();
  const status = useAppSelector((state) => state.disableSlice.disablePractice);
  const { t } = useTranslation();
  const [resourceConcerns, setResourceConcerns] =
    useState<any>(initialResourceState);
  const [selectedResourceConcern, setSelectedResourceConcern] = useState({
    id: -1,
  });

  const wrapperClassNames = classNames('resource-box-wrapper', {
    'practice-selected': selectedPractice >= 0,
  });

  const getResourceConcerns = async () => {
    try {
      const response: any = await getRequest('/resourceConcern/concern');
      setResourceConcerns({
        ...resourceConcerns,
        resources: response.data.length > 0 ? response.data : [],
        disabled: false,
      });
    } catch (error) {
      // throw new Error('Resource Concern Request Error');
    }
  };

  const getResourceConcernsSubgroups = async (swapaCategory) => {
    try {
      const response: any = await getRequest(
        `/resourceConcern/concern/category/${swapaCategory}`
      );
      setResourceConcernsSubgroups({
        ...resourceConcernsSubgroups,
        resources: response.data.length > 0 ? response.data : [],
        disabled: false,
      });
    } catch (error) {
      throw new Error('Resource Concern Subgroup Request Error');
    }
  };

  useEffect(() => {
    getResourceConcerns();
  }, []);

  useEffect(() => {
    if (selectedResourceCategory === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_category_id: null,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_category_id: +selectedResourceCategory,
      }));
    }
  }, [selectedResourceCategory]);

  useEffect(() => {
    if (selectedResourceConcern.id === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: null,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: +selectedResourceConcern.id,
      }));
    }
  }, [selectedResourceConcern]);

  const handleChange = (e) => {
    const { value }: any = e.target;
    const foundConcernCategory =
      resourceConcerns.resources &&
      resourceConcerns.resources.find((concern: any) => {
        return concern.resourceConcernId === +value;
      });
    if (value !== '') {
      setSelectedResourceCategory({
        ...selectedResourceCategory,
        id: +value,
      });
      getResourceConcernsSubgroups(value);
      dispatchRequest(disableResourceDropdown());
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern_category:
          foundConcernCategory?.resourceConcernName || null,
      }));
    } else {
      setResourceConcernsSubgroups(initialResourceState);
      setSelectedResourceCategory(-1);
      dispatchRequest(enableResourceDropdown());
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern_category: null,
      }));
    }
  };

  const handleSubgroupChange = (e) => {
    const { value } = e.target;
    const foundConcern =
      resourceConcernsSubgroups.resources &&
      resourceConcernsSubgroups.resources.find((concern) => {
        return concern.resourceConcernId === +value;
      });

    setSelectedResourceConcern({ id: +value });
    if (value === '') {
      setSelectedResourceConcern({ id: -1 });
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern: null,
      }));
    }
    setSearchInfo((prevState) => ({
      ...prevState,
      resource_concern: foundConcern?.resourceConcernName,
    }));
  };

  return (
    <div className={wrapperClassNames}>
      <div className='search-by-resource-section'>
        <label
          className='usa-label resource-search-header'
          aria-labelledby='resourceConcernCategoryValue resourceConcernValue'
        >
          {t('search-by-resource-concern.heading')}
        </label>

        <div className='desktop:grid-col-8'>
          <label
            className='usa-label resource-search-header'
            htmlFor='resourceConcernCategoryValue'
          >
            <p className='margin-top-2'>
              {t('search-by-resource-concern.first-label-name')}
            </p>
          </label>
          <select
            className='usa-select'
            id='resourceConcernCategoryValue'
            name='selectedResourceCategory'
            disabled={status}
            onChange={handleChange}
            value={selectedResourceCategory?.id}
          >
            <option value=''>All resource concerns (default)</option>
            {resourceConcerns.resources.length
              ? resourceConcerns.resources.map((item: any) => {
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
          <label
            className='usa-label resource-search-header'
            htmlFor='resourceConcernValue'
          >
            <p className='margin-top-4'>
              {t('search-by-resource-concern.second-label-name')}
            </p>
          </label>
          <select
            className='usa-select'
            id='resourceConcernValue'
            name='selectedResourceSubgroup'
            disabled={resourceConcernsSubgroups.disabled}
            onChange={handleSubgroupChange}
            value={+selectedResourceConcern.id}
          >
            <option value=''>- Select resource concern -</option>
            {resourceConcernsSubgroups.resources.length
              ? resourceConcernsSubgroups.resources.map((item: any) => {
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
