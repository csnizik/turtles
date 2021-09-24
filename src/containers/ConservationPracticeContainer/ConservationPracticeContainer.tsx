import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostSearchDataQuery } from '../../Redux/services/api';
import ConservationPracticeLandingScreen from '../../components/ConservationPracticeLandingScreen';
import IndividualPracticeContainer from './IndividualPracticeContainer';
import PracticeBreadcrumbs from '../../components/PracticeBreadcrumbs';
import PracticeCategoryContainer from './PracticeCategoryContainer';
import PracticeCard from '../../components/PracticeCard';
import ReportPreviewCreator from '../../components/ReportPreviewCreator';
import './conservation-practice-container.scss';
import { disablePdfGenState, enablePdfGenState } from '../../Redux/Slice/pdfGenSlice';
import { useAppDispatch } from '../../Redux/hooks/hooks';

const defaultPracticeViews = {
  allPractices: false,
  practiceCategories: false,
  individualPractice: false,
};

const ConservationPracticeContainer = ({
  currentSpecificPractice,
  currentPracticeCategoryId,
  selectedStateCode,
}: any) => {
  const [practiceViewType, setPracticeViewType] =
    useState(defaultPracticeViews);

  const dispatch = useAppDispatch();

  const location: any = useLocation();

  const [openModal, setOpenModal] = useState(false);

  const sharedState = location?.state?.detail;

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

  const handleCreateReport = () => {
    if(openModal) {
      setOpenModal(false);
      dispatch(disablePdfGenState());  
    }  
    else {
      setOpenModal(true); 
      dispatch(enablePdfGenState());
      } 
  };

  useEffect(() => {
    if (currentPracticeCategoryId < 0 && currentSpecificPractice < 0) {
      setPracticeViewType({ ...defaultPracticeViews, allPractices: true });
    } else if (currentPracticeCategoryId >= 0 && currentSpecificPractice < 0) {
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
      return <IndividualPracticeContainer stateCode={selectedStateCode} />;
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

      <div className='overlay'>
        <ReportPreviewCreator 
          selectedStateCode={selectedStateCode} 
          openModal={openModal}
          handleCreateReport={handleCreateReport}
      />
      </div>
      {renderPracticeContainerContent(currentViewType)}
    </>
  );
};

export default ConservationPracticeContainer;
