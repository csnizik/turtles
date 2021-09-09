import { useAppSelector } from '../../Redux/hooks/hooks';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';

const IndividualPracticeContainer = () => {
  const state = useAppSelector(s=> s);
  const id = state.practiceSlice.selectedSpecficPractice;

  return (
    <>
      <ConservationPracticeOverview selectedPracticeId={id} />
      <ConservationPracticeVideo selectedPracticeId={id} />{' '}
    </>
  );
};

export default IndividualPracticeContainer;
