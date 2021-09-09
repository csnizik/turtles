import { useState, useEffect } from 'react';

import PracticeBreadcrumbs from '../../components/PracticeBreadcrumbs';
import IndividualPracticeContainer from './IndividualPracticeContainer';
import ConservationPracticeLandingScreen from '../../components/ConservationPracticeLandingScreen';
import './conservation-practice-container.scss';

const defaultPracticeViews = {
  allPractices: false,
  practiceCategories: false,
  individualPractice: false,
};

const ConservationPracticeContainer = ({
  currentSpecificPractice,
  currentPracticeCategoryId,
}: any) => {
  const [practiceViewType, setPracticeViewType] =
    useState(defaultPracticeViews);

  useEffect(() => {
    if (currentPracticeCategoryId < 0 && currentSpecificPractice < 0) {
      setPracticeViewType({ ...defaultPracticeViews, allPractices: true });
    } else if (currentPracticeCategoryId >= 0 && currentSpecificPractice < 0) {
      setPracticeViewType({ ...practiceViewType, practiceCategories: true });
    } else if (currentSpecificPractice >= 0) {
      setPracticeViewType({ ...practiceViewType, individualPractice: true });
    }
  }, [currentPracticeCategoryId]);

  const renderPracticeContainerContent = (viewType: string) => {
    if (viewType === 'allPractices') {
      return (
        <ConservationPracticeLandingScreen
          setPracticeViewType={setPracticeViewType}
        />
      );
    }
    if (viewType === 'practiceCategories') {
      return <p>Display practice category page</p>;
    }
    if (viewType === 'individualPractice') {
      return <IndividualPracticeContainer />;
    }
  };

  const viewTypeList = Object.keys(practiceViewType);
  const currentViewType =
    viewTypeList.find((view: string) => {
      return practiceViewType[view];
    }) || 'allPractices';

  return (
    <>
      <PracticeBreadcrumbs
        setPracticeViewType={setPracticeViewType}
        currentPracticeCategoryId={currentPracticeCategoryId}
        currentSpecificPractice={currentSpecificPractice}
      />
      {renderPracticeContainerContent(currentViewType)}
    </>
  );
};

export default ConservationPracticeContainer;
