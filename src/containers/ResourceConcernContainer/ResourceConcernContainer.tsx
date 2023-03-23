import { useState, useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { useParams } from 'react-router-dom';
import {
  useGetResourceConcernQuery,
  useGetResourcesQuery,
  useGetStateListQuery,
  usePostLandscapeInitiativesQuery,
  usePostProjectSearchDataQuery,
  usePostSearchDataQuery,
} from '../../Redux/services/api';
import ResourceConcernLandingScreen from '../../components/ResourceConcernLandingScreen';
import ConcernBreadcrumbs from '../../components/ConcernBreadcrumbs';
import ReportPreviewCreator from '../../components/ReportPreviewCreator';
import './resource-concern-container.scss';
import {
  disablePdfGenState,
  enablePdfGenState,
} from '../../Redux/Slice/pdfGenSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  setResourceConcernCategory,
  setSpecificResourceConcern,
} from '../../Redux/Slice/resourceConcernSlice';
import { currentState } from '../../Redux/Slice/stateSlice';
import ProjectListGroup from '../../components/ProjectListGroup';
import ResourceConcernCategoryContainer from './ResourceConcernCategoryContainer';
import ResourceConcernCard from '../../components/ResourceConcernCard';
import IndividualResourceConcernContainer from './IndividualResourceConcernContainer';




const defaultResourceConcernViews = {
  allResourceConcerns: false,
  resourceConcernCategories: false,
  individualResourceConcern: false,
};

const GTMArg = { gtmId: process.env.REACT_APP_Google_Tag || '' };
TagManager.initialize(GTMArg);

const ResourceConcernContainer = ({
  currentSpecificResourceConcern,
  currentResourceConcernCategoryId,
}: any) => {
  const stateInfo = useAppSelector((state: any) => state?.stateSlice);
  const [ResourceConcernViewType, setResourceConcernViewType] =
    useState(defaultResourceConcernViews);
  const [openModal, setOpenModal] = useState(false);
  const [cleanModal, setCleanModal] = useState(false);
  const [selectedStateValue] = useState(stateInfo?.stateCode);
  // const [projectsInitiativesData, setProjectsInitiativesData]: any = useState(
  //   []
  // );
  const stateStatus: any = useGetStateListQuery();
  const dispatch = useAppDispatch();
  const { category, individual, stateCode, name }: any = useParams();
  const selectedStateCode = stateInfo?.stateCode;

  const uiText: any = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  );

  useEffect(() => {
    //GA code for  currentSpecificResourceConcern & currentResourceConcernCategoryId ** might duplicate and code for stateC
    window.dataLayer.push({ js: new Date() });
    window.dataLayer.push({
      event: 'ResourceConcernContainer',
      EventProps: {
        SearchResourceConcern: currentSpecificResourceConcern,
        SearchCategory: currentResourceConcernCategoryId,
        SearchState: selectedStateCode,
      },
    });
  }, [category, individual, stateCode]);

  useEffect(() => {
    //Google Analytics code for ResourceConcernContainerTab() currentSpecificResourceConcern & currentResourceConcernCategoryId and statecode)
    window.dataLayer.push({ js: new Date() });
    window.dataLayer.push({
      event: 'ResourceConcernContainerTab',
      EventProps: {
        SearchResourceConcern: currentSpecificResourceConcern,
        SearchCategory: currentResourceConcernCategoryId,
        SearchState: selectedStateCode,
        SearchName: name,
      },
    });
  }, [name]);

  useEffect(() => {
    if (individual && name !== 'ProjectsAndInitiatives') {
      setResourceConcernViewType({
        ...defaultResourceConcernViews,
        individualResourceConcern: true,
      });
      dispatch(setResourceConcernCategory(+category));
      dispatch(setSpecificResourceConcern(+individual));
    } else if (category && name !== 'ProjectsAndInitiatives') {
      setResourceConcernViewType({
        ...defaultResourceConcernViews,
        resourceConcernCategories: true,
      });
      dispatch(setResourceConcernCategory(+category));
      dispatch(setSpecificResourceConcern(-1));
    } else {
      setResourceConcernViewType({
        ...defaultResourceConcernViews,
        allResourceConcerns: true,
      });
    }
  }, [category, individual]);

  useEffect(() => {
    const selectedState =
      selectedStateValue &&
      stateStatus.isSuccess &&
      stateStatus.data &&
      stateStatus.data.find((state: any) => {
        return state?.stateCode === selectedStateValue;
      });
    if (selectedState) {
      dispatch(currentState(selectedState));
    }
  }, [selectedStateValue]);

  let searchInputData = {
    ResourceConcern_id: currentSpecificResourceConcern,
    state_county_code: selectedStateCode,
    ResourceConcern_category_id: currentResourceConcernCategoryId,
  };

  if (
    searchInputData.state_county_code === '00' ||
    searchInputData.state_county_code === '00000'
  ) {
    searchInputData = { ...searchInputData };
    delete searchInputData.state_county_code;
  }
  const { data: pdata } = usePostProjectSearchDataQuery(searchInputData);
  const { data: ldata } = usePostLandscapeInitiativesQuery(searchInputData);

  const { data, isSuccess } = useGetResourcesQuery();
  const currentResourceConcernCategory: any =
    isSuccess &&
    data &&
    currentResourceConcernCategoryId >= 0 &&
    data.find(
      (ResourceConcern: any) =>
        ResourceConcern.resourceConcernId === currentResourceConcernCategoryId
    );

  const { data : rcdata, isSuccess : rcisSuccess } = useGetResourceConcernQuery(currentResourceConcernCategoryId);
  const currentResourceConcern =
    rcisSuccess &&
    rcdata &&
    currentResourceConcernCategory &&
    rcdata.find(
      (ResourceConcern: any) => ResourceConcern.resourceConcernId === currentSpecificResourceConcern
    );
  const handleCreateReport = () => {
    if (openModal) {
      setOpenModal(false);
      dispatch(disablePdfGenState());
      setCleanModal((pre) => !pre);
    } else {
      setOpenModal(true);
      dispatch(enablePdfGenState());
    }
  };
  useEffect(() => {
    // const tempData = [
    //   { title: 'Conservation Innovation Grants', data: pdata },
    //   { title: 'Landscape Conservation Initiatives', data: ldata },
    // ];
    // setProjectsInitiativesData(tempData);
  }, [pdata, ldata]);

  useEffect(() => {
    if (currentResourceConcernCategoryId < 0 && currentSpecificResourceConcern < 0) {
      setResourceConcernViewType({ ...defaultResourceConcernViews, allResourceConcerns: true });
    } else if (currentResourceConcernCategoryId >= 0 && currentSpecificResourceConcern < 0) {
      dispatch(setResourceConcernCategory(currentResourceConcernCategoryId));
      setResourceConcernViewType({
        ...defaultResourceConcernViews,
        resourceConcernCategories: true,
      });
    } else if (currentSpecificResourceConcern >= 0) {
      setResourceConcernViewType({
        ...defaultResourceConcernViews,
        individualResourceConcern: true,
      });
    }
  }, [currentResourceConcernCategoryId, currentSpecificResourceConcern]);

  const renderResourceConcernContainerContent = (viewType: string) => {
    if (viewType === 'allResourceConcerns') {
      return (
        <ResourceConcernLandingScreen
          stateCode={selectedStateCode}
          setResourceConcernViewType={setResourceConcernViewType}
        />
      );
    }
    if (viewType === 'resourceConcernCategories') {
      return  (
        <>
          <ResourceConcernCategoryContainer
            currentResourceConcernCategory={currentResourceConcernCategory}
          />
          <ResourceConcernCard setResourceConcernViewType={setResourceConcernViewType} />
        </>
      ); 
    }
    if (viewType === 'individualResourceConcern') {
      return (
      <IndividualResourceConcernContainer />
      );
    }
    return null;
  };
  const viewTypeList = Object.keys(ResourceConcernViewType);
  const currentViewType =
    viewTypeList.find((view: string) => {
      return ResourceConcernViewType[view];
    }) || 'allResourceConcerns';
  return (
    <>
      <ConcernBreadcrumbs
        currentView={ResourceConcernViewType}
        setResourceConcernViewType={setResourceConcernViewType}
        currentResourceConcernCategory={currentResourceConcernCategory}
        currentResourceConcern={currentResourceConcern}
        handleCreateReport={handleCreateReport}
      />

      {/* {openModal ? (
        <div className='overlay'>
          <ReportPreviewCreator
            openModal={openModal}
            handleCreateReport={handleCreateReport}
            cleanModal={cleanModal}
            projectsInitiativesData={projectsInitiativesData}
          />
        </div>
      ) : null} */}
      {renderResourceConcernContainerContent(currentViewType)}
    </>
  );
};


export default ResourceConcernContainer;

