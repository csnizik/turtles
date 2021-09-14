import { useAppSelector } from '../../Redux/hooks/hooks';
import { useGetNationalOverviewByPracticeQuery } from '../../Redux/services/api';
import ApplicationImpacts from '../../components/ApplicationImpacts';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import ImplementationExtent from '../../components/ImplementationExtent';
import SpecificationsAndTools from '../../components/SpecificationsAndTools';
import ResourceConcernTreated from '../../components/ResourceConcernTreated';
import ProjectsAndInitiatives from '../../components/ProjectsAndInitiatives';

const IndividualPracticeContainer = () => {
  const state = useAppSelector((s) => s);
  const practiceId: any = state.practiceSlice.selectedSpecficPractice;
  const { data, error, isLoading, isSuccess, isError } =
    useGetNationalOverviewByPracticeQuery(practiceId);

  return (
    <>
      <ConservationPracticeOverview
        data={data}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
      <ConservationPracticeVideo selectedPracticeId={practiceId} />
      <ResourceConcernTreated />
      <ImplementationExtent data={data} isSuccess={isSuccess} />
      <SpecificationsAndTools data={data} isSuccess={isSuccess} />
      <ApplicationImpacts data={data} isSuccess={isSuccess} />
      <ProjectsAndInitiatives data={data} isSuccess={isSuccess} />
    </>
  );
};

export default IndividualPracticeContainer;
