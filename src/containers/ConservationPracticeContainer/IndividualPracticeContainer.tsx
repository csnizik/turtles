import { useAppSelector } from '../../Redux/hooks/hooks';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import ResourceConcernTreated from '../../components/ResourceConcernTreated';

const IndividualPracticeContainer = () => {
  const state = useAppSelector((s) => s);
  const id = state.practiceSlice.selectedSpecficPractice;

  return (
    <>
      <ConservationPracticeOverview selectedPracticeId={id} />
      <ConservationPracticeVideo selectedPracticeId={id} />
      <ResourceConcernTreated />
      {' '}
    </>
  );
};

export default IndividualPracticeContainer;
