import { useEffect } from 'react';
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
import ProjectListGroup from '../../components/ProjectListGroup';

const IndividualPracticeContainer = ({ setProjectsInitiativesData }: any) => {
  const state = useAppSelector((s) => s);
  const practiceId: any = state.practiceSlice.selectedSpecficPractice;
  let stateCode = state?.practiceSlice.searchInput.state_county_code;
  if (stateCode) stateCode = stateCode.substring(0, 2);
  else stateCode = state?.stateSlice.stateCode;
  if (!stateCode) stateCode = '00';

  const { data, error, isLoading, isSuccess, isError } =
    useGetNationalOverviewByPracticeQuery(practiceId);

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
      <ProjectsAndInitiatives
        data={data}
        isSuccess={isSuccess}
        setProjectsInitiativesData={setProjectsInitiativesData}
      />
    </>
  );
};

export default IndividualPracticeContainer;
