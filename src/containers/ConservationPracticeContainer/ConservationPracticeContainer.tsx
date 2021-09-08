import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import './conservation-practice-container.scss';

const ConservationPracticeContainer = () => {
  return (
    <div>
      <ConservationPracticeOverview selectedPracticeId={9} />
      <ConservationPracticeVideo selectedPracticeId={9} />
    </div>
  );
};

export default ConservationPracticeContainer;
