import { useEffect, useRef, useState } from 'react';
import { getRequest } from '../../common/util/AxiosUtil';
import { setResourceConcernCategory } from '../../Redux/Slice/resourceConcernSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import ResourceConcernIntroduction from '../ResourceConcernIntroduction/ResourceConcernIntroduction';
import ResourceConcernCategories from '../ResourceConcernCategories';
import './resource-concern-landing-screen.scss';

const ResourceConcernLandingScreen = ({
  setResourceConcernViewType,
  stateCode,
}: any) => {
  const [categories, setCategories] = useState([]);
  const mountedRef = useRef(true);
  const uiText = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  );
  const dispatch = useAppDispatch();

  const selectResourceConcern = (resourceConcernCategoryId) => {
    dispatch(setResourceConcernCategory(resourceConcernCategoryId));
    setResourceConcernViewType({
      allResourceConcerns: false,
      resourceConcernCategories: true,
      individualResourceConcern: false,
    });
  };

  const getResourceConcerns = async () => {
    try {
      let code: any = stateCode.toString();
      code = code.length === 1 ? `0${code}` : code;
      const response: any = (await getRequest(
        `/resourceConcern/concern/`
      )) || { data: [] };
      if (!mountedRef.current) return null;
      setCategories(response.data);
    } catch (error) {
      // throw new Error('resourceConcern categories Request Error');
    }
    return null;
  };

  useEffect(() => {
    getResourceConcerns();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div data-testid='resource-land-screen'>
      <ResourceConcernIntroduction
        introductionParagraph={uiText?.rc_paragraph_1?.configurationValue}
        title={uiText?.rcCategoryHeading?.configurationValue}
      />
      <div className='landing-screen-categories'>
        <ResourceConcernCategories
          selectResourceConcern={selectResourceConcern}
          categories={categories}
          heading={uiText?.rcCategoryHeadingSubHeading?.configurationValue}
          intro={
            uiText?.rcCategoryHeadingSubHeadingDescription?.configurationValue
          }
        />
      </div>
    </div>
  );
};

export default ResourceConcernLandingScreen;
