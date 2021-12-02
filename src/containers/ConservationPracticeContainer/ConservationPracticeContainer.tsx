import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useGetStateListQuery,
  usePostLandscapeInitiativesQuery,
  usePostProjectSearchDataQuery,
  usePostSearchDataQuery,
} from '../../Redux/services/api';
import ConservationPracticeLandingScreen from '../../components/ConservationPracticeLandingScreen';
import IndividualPracticeContainer from './IndividualPracticeContainer';
import PracticeBreadcrumbs from '../../components/PracticeBreadcrumbs';
import PracticeCategoryContainer from './PracticeCategoryContainer';
import PracticeCard from '../../components/PracticeCard';
import ReportPreviewCreator from '../../components/ReportPreviewCreator';
import './conservation-practice-container.scss';
import {
  disablePdfGenState,
  enablePdfGenState,
} from '../../Redux/Slice/pdfGenSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import { setPracticeCategory } from '../../Redux/Slice/practiceSlice';
import { currentState } from '../../Redux/Slice/stateSlice';
import ProjectListGroup from '../../components/ProjectListGroup';
import ExceptionMessage from '../../components/ExceptionMessage/ExceptionMessage';

const defaultPracticeViews = {
  allPractices: false,
  practiceCategories: false,
  individualPractice: false,
};

const ConservationPracticeContainer = ({
  currentSpecificPractice,
  currentPracticeCategoryId,
}: any) => {
  const { t } = useTranslation();
  const stateInfo = useAppSelector((state: any) => state?.stateSlice);
  const [practiceViewType, setPracticeViewType] =
    useState(defaultPracticeViews);
  const [openModal, setOpenModal] = useState(false);
  const [cleanModal, setCleanModal] = useState(false);
  const [selectedStateValue] = useState(stateInfo.stateCode);
  const [projectsInitiativesData, setProjectsInitiativesData]: any = useState(
    []
  );

  const stateStatus: any = useGetStateListQuery();
  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const sharedState = location?.state?.detail;
  const selectedStateCode = stateInfo?.stateCode;

  useEffect(() => {
    const selectedState =
      selectedStateValue &&
      stateStatus.isSuccess &&
      stateStatus.data &&
      stateStatus.data.find((state: any) => {
        return state.stateCode === selectedStateValue;
      });
    if (selectedState) {
      dispatch(currentState(selectedState));
    }
  }, [selectedStateValue]);

  let searchInputData = {
    practice_id: currentSpecificPractice,
    state_county_code: selectedStateCode,
    practice_category_id: currentPracticeCategoryId,
  };

  if (
    searchInputData.state_county_code === '00' ||
    searchInputData.state_county_code === '00000'
  ) {
    searchInputData = { ...searchInputData };
    delete searchInputData.state_county_code;
  }

  const {
    data: pdata,
    error: perror,
    isLoading: pisLoading,
    isSuccess: pisSuccess,
    isError: pisError,
  } = usePostProjectSearchDataQuery(searchInputData);
  const {
    data: ldata,
    error: lerror,
    isLoading: lisLoading,
    isSuccess: lisSuccess,
    isError: lisError,
  } = usePostLandscapeInitiativesQuery(searchInputData);

  const { data, isSuccess } = usePostSearchDataQuery({
    practice_id: sharedState,
  });
  const currentPracticeCategory: any =
    isSuccess &&
    data &&
    currentPracticeCategoryId >= 0 &&
    data.find(
      (practice: any) =>
        practice.practiceCategoryId === currentPracticeCategoryId
    );

  const currentPractice =
    currentPracticeCategory &&
    currentPracticeCategory.practices.find(
      (practice: any) => practice.practiceId === currentSpecificPractice
    );
  
  const exceptionTitle = `${stateInfo?.stateNameDisplay} has no ${currentPractice?.practiceName} projects or initiatives`;
  const exceptionMessage = `The projects below represent ${currentPractice?.practiceName} projects across the United States.`;
  
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
    const tempData = [
      { title: 'Conservation Innovation Grants', data: pdata },
      { title: 'Landscape Conservation Initiatives', data: ldata },
    ];
    setProjectsInitiativesData(tempData);
  }, [pdata, ldata]);

  useEffect(() => {
    if (currentPracticeCategoryId < 0 && currentSpecificPractice < 0) {
      setPracticeViewType({ ...defaultPracticeViews, allPractices: true });
      if (location.search) {
        setPracticeViewType({ ...practiceViewType, individualPractice: true });
      }
    } else if (currentPracticeCategoryId >= 0 && currentSpecificPractice < 0) {
      dispatch(setPracticeCategory(currentPracticeCategoryId));
      setPracticeViewType({ ...practiceViewType, practiceCategories: true });
    } else if (currentSpecificPractice >= 0) {
      setPracticeViewType({ ...practiceViewType, individualPractice: true });
    }
  }, [currentPracticeCategoryId, currentSpecificPractice]);

  const renderPracticeContainerContent = (viewType: string) => {
    if (viewType === 'allPractices') {
      return (
        <ConservationPracticeLandingScreen
          stateCode={selectedStateCode}
          setPracticeViewType={setPracticeViewType}
        />
      );
    }
    if (viewType === 'practiceCategories') {
      // TODO: Return container / components for Practice Categories here
      return (
        <>
          <PracticeCategoryContainer
            currentPracticeCategory={currentPracticeCategory}
          />
          <PracticeCard setPracticeViewType={setPracticeViewType} />
        </>
      );
    }
    if (viewType === 'individualPractice') {
      return (
        <>
          <IndividualPracticeContainer />
          <div className='title-section'>
            <div className='top-title'>
              <h4 className='project-title'>
                {stateInfo?.stateNameDisplay || 'U.S.'}{' '}
                {t('associated-projects-initiatives.title')}{' '}
                {currentPractice?.practiceName}
              </h4>
            </div>
            <p className='intro-desc'>
              {t('associated-projects-initiatives.description')}
            </p>
            <div className='margin-top-30'>
              <ExceptionMessage
                exceptionTitle={exceptionTitle}
                exceptionMessage={exceptionMessage}
              />
            </div>
          </div>
          <ProjectListGroup isMapDisplayed={false} />
        </>
      );
    }
    return null;
  };

  const viewTypeList = Object.keys(practiceViewType);
  const currentViewType =
    viewTypeList.find((view: string) => {
      return practiceViewType[view];
    }) || 'allPractices';

  return (
    <>
      <PracticeBreadcrumbs
        currentView={practiceViewType}
        setPracticeViewType={setPracticeViewType}
        currentPracticeCategory={currentPracticeCategory}
        currentSpecificPractice={currentSpecificPractice}
        handleCreateReport={handleCreateReport}
      />

      {openModal ? (
        <div className='overlay'>
          <ReportPreviewCreator
            openModal={openModal}
            handleCreateReport={handleCreateReport}
            cleanModal={cleanModal}
            projectsInitiativesData={projectsInitiativesData}
          />
        </div>
      ) : null}
      {renderPracticeContainerContent(currentViewType)}
    </>
  );
};

export default ConservationPracticeContainer;
