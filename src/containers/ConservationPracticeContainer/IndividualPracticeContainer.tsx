import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { useGetNationalOverviewByPracticeQuery } from '../../Redux/services/api';
import ApplicationImpacts from '../../components/ApplicationImpacts';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import ImplementationExtent from '../../components/ImplementationExtent';
import SpecificationsAndTools from '../../components/SpecificationsAndTools';
import ResourceConcernTreated from '../../components/ResourceConcernTreated';
import ProjectsAndInitiatives from '../../components/ProjectsAndInitiatives';
import HorizontalScroll from '../../components/HorizontalScroll';

const IndividualPracticeContainer = ({ setProjectsInitiativesData }: any) => {
  const state = useAppSelector((s) => s);
  const location: any = useLocation();
  const practiceId: any = state.practiceSlice.selectedSpecficPractice;
  let stateCode = state?.practiceSlice.searchInput.state_county_code;
  if (stateCode) stateCode = stateCode.substring(0, 2);
  else stateCode = state?.stateSlice.stateCode;
  if (!stateCode) stateCode = '00';

  const { data, error, isLoading, isSuccess, isError } =
    useGetNationalOverviewByPracticeQuery(practiceId);

  if (location.search) {
    const linkage = location.search.split('?');
    const practiceCategoryId = linkage[1].split('=').pop();
    const subPracticeId = linkage[2].split('=').pop();
    const stateId = linkage[3].split('=').pop();
    window.localStorage.setItem('PracticeCategoryId', practiceCategoryId);
    window.localStorage.setItem('PracticeId', subPracticeId);
    window.localStorage.setItem('StateId', stateId);
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <HorizontalScroll />
      <ConservationPracticeOverview
        data={data}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
      <ConservationPracticeVideo selectedPracticeId={practiceId} />
      <ResourceConcernTreated
        selectedStateCode={stateCode}
        selectedPracticeId={practiceId}
      />
      <ImplementationExtent data={data} isSuccess={isSuccess} />
      <SpecificationsAndTools
        selectedStateCode={stateCode}
        selectedPracticeId={practiceId}
        data={data}
        isSuccess={isSuccess}
      />
      <ApplicationImpacts data={data} isSuccess={isSuccess} />
      {/* <ProjectsAndInitiatives
        data={data}
        isSuccess={isSuccess}
        setProjectsInitiativesData={setProjectsInitiativesData}
      /> */}
    </>
  );
};

export default IndividualPracticeContainer;
