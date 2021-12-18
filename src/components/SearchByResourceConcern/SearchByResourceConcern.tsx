import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { initialResourceState } from '../../common/typedconstants.common';
import {
  disableResourceDropdown,
  enableResourceDropdown,
} from '../../Redux/Slice/disableSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  useGetResourcesQuery,
  useGetResourceConcernQuery,
} from '../../Redux/services/api'; //Api call from redux
import './search-by-resource-concern.scss';

const SearchByResourceConcern = ({
  setSearchInput,
  setSearchInfo,
  setResourceConcernsSubgroups,
  selectedResourceCategory,
  setSelectedResourceCategory,
  selectedPractice,
}: any) => {
  const resourceCategory = useGetResourcesQuery(); //!Resource Category api
  const resourceConcern = useGetResourceConcernQuery(selectedResourceCategory); //! Resource Concern

  const dispatchRequest = useAppDispatch();
  const status = useAppSelector((state) => state.disableSlice.disablePractice);
  const { t } = useTranslation();
  const [selectedResourceConcern, setSelectedResourceConcern] = useState<any>({
    id: -1,
  });

  const wrapperClassNames = classNames('resource-box-wrapper', {
    'practice-selected': selectedPractice >= 0,
  });

  const presistSearchInputResource = useAppSelector(
    (State) => State?.practiceSlice?.searchInput
  );

  //Temporary Solution
  const presistSearchInfo = useAppSelector(
    (State) => State?.practiceSlice?.searchInfo
  );

  useEffect(() => {
    const findResourceCategoryName = resourceCategory?.data?.find((concern) => {
      const name = +selectedResourceCategory === concern.resourceConcernId;
      return name;
    })?.resourceConcernName;
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
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern_category:
          findResourceCategoryName ||
          presistSearchInfo.resource_concern_category,
      }));
    }
  }, [selectedResourceCategory]);

  useEffect(() => {
    if (presistSearchInputResource?.resource_concern_category_id != null) {
      setSelectedResourceCategory({
        id: presistSearchInputResource.resource_concern_category_id,
      });
      setResourceConcernsSubgroups({
        resources: resourceConcern.data,
        disabled: false,
      });
    }
    if (presistSearchInputResource?.resource_concern_id != null) {
      setSelectedResourceConcern({
        id: presistSearchInputResource.resource_concern_id,
      });
    }
  }, []);

  useEffect(() => {
    const findResourceName = resourceConcern?.data?.find((subConcern) => {
      const name = +selectedResourceConcern.id === subConcern.resourceConcernId;
      return name;
    })?.resourceConcernName;
    if (+selectedResourceConcern.id === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: null,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: +selectedResourceConcern.id,
      }));
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern:
          findResourceName || presistSearchInfo.resource_concern,
      }));
    }
  }, [selectedResourceConcern]);

  const handleChange = (e) => {
    const { value }: any = e.target;
    if (value !== '') {
      dispatchRequest(disableResourceDropdown());
      setSelectedResourceCategory({
        ...selectedResourceCategory,
        id: value,
      });
      setResourceConcernsSubgroups({
        ...initialResourceState,
        disabled: false,
      });
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern: null,
      }));
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: null,
      }));
      setSelectedResourceConcern({ id: -1 });
    } else {
      setResourceConcernsSubgroups(initialResourceState);
      setSelectedResourceCategory({ id: -1 });
      dispatchRequest(enableResourceDropdown());
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern_category: null,
        resource_concern: null,
      }));
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: null,
      }));
    }
  };

  const handleSubgroupChange = (e) => {
    const { value } = e.target;
    setSelectedResourceConcern({ id: +value });
    if (value === '') {
      setSelectedResourceConcern({ id: -1 });
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern: null,
      }));
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: null,
      }));
    }
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
            value={selectedResourceCategory}
          >
            <option value=''>All resource concerns (default)</option>
            {resourceCategory.isSuccess &&
              resourceCategory.data &&
              resourceCategory.data.map((item: any) => {
                return (
                  <option
                    key={item.resourceConcernId}
                    value={item.resourceConcernId}
                  >
                    {item.resourceConcernName}
                  </option>
                );
              })}
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
            disabled={status}
            onChange={handleSubgroupChange}
            value={selectedResourceConcern.id}
          >
            <option value=''>- Select resource concern -</option>
            {resourceConcern.isSuccess &&
              resourceConcern.data &&
              resourceConcern.data.map((item: any) => {
                return (
                  <option
                    key={item.resourceConcernId}
                    value={item.resourceConcernId}
                  >
                    {item.resourceConcernName}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchByResourceConcern;
