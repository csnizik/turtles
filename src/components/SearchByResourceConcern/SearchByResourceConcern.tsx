import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import './search-by-resource-concern.scss';
import { disableState, enableState } from '../../Redux/Slice/disableSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';

const initialState = {
  resources: [],
  disabled: true,
};
const SearchByResourceConcern = ({ setSearchInput, setSearchInfo }: any) => {
  const dispatchRequest = useAppDispatch();
  const status = useAppSelector((state) => state.disableSlice.disablePractice);
  const { t } = useTranslation();
  const [resourceConcerns, setResourceConcerns] = useState<any>(initialState);
  const [resourceConcernsSubgroups, setResourceConcernsSubgroups] =
    useState<any>(initialState);
  const [selectedResourceCategory, setSelectedResourceCategory] = useState(-1);
  const [selectedResourceConcern, setSelectedResourceConcern] = useState(-1);

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
    if (selectedResourceConcern === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: null,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        resource_concern_id: +selectedResourceConcern,
      }));
    }
  }, [selectedResourceConcern]);

  const handleChange = (e) => {
    const { value }: any = e.target;
    const concernCategory = value.split(',');
    console.log('Resources Value-->', concernCategory);

    if (concernCategory[0] !== '') {
      setSelectedResourceCategory(+concernCategory[0]);
      getResourceConcernsSubgroups(concernCategory[0]);
      dispatchRequest(disableState());
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern_category: concernCategory[1],
      }));
    } else {
      setResourceConcernsSubgroups(initialState);
      setSelectedResourceCategory(-1);
      dispatchRequest(enableState());
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern_category: null,
      }));
    }
  };

  const handleSubgroupChange = (e) => {
    const { value } = e.target;
    const concern = value.split(',');
    setSelectedResourceConcern(value);
    if (concern[0] === '') {
      setSelectedResourceConcern(-1);
      setSearchInfo((prevState) => ({
        ...prevState,
        resource_concern: null,
      }));
    }
    setSearchInfo((prevState) => ({
      ...prevState,
      resource_concern: concern[1],
    }));
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
          <p className='margin-top-2'>
            {t('search-by-resource-concern.first-label-name')}
          </p>
          <select
            className='usa-select'
            id='resourceConcernCategoryValue'
            name='selectedResourceCategory'
            disabled={status}
            onChange={handleChange}
          >
            <option value=''>All resource concerns (default)</option>
            {resourceConcerns.resources.length
              ? resourceConcerns.resources.map((item: any) => {
                  return (
                    <option
                      key={item.resourceConcernId}
                      value={`${item.resourceConcernId},${item.resourceConcernName}`}
                    >
                      {item.resourceConcernName}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <div className='desktop:grid-col-8'>
          <p className='margin-top-4'>
            {t('search-by-resource-concern.second-label-name')}
          </p>
          <select
            className='usa-select'
            id='resourceConcernValue'
            name='selectedResourceSubgroup'
            disabled={resourceConcernsSubgroups.disabled}
            onChange={handleSubgroupChange}
            value={selectedResourceConcern}
          >
            <option value=''>- Select resource concern -</option>
            {resourceConcernsSubgroups.resources.length
              ? resourceConcernsSubgroups.resources.map((item: any) => {
                  return (
                    <option
                      key={item.resourceConcernId}
                      value={`${item.resourceConcernId},${item.resourceConcernName}`}
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
