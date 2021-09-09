import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';

const IndividualPracticeContainer = () => {
  return (
    <>
      <ConservationPracticeOverview selectedPracticeId={9} />
      <ConservationPracticeVideo selectedPracticeId={9} />{' '}
    </>
  );
};

export default IndividualPracticeContainer;
