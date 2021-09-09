import { useLocation } from 'react-router-dom';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import './conservation-practice-container.scss';

const ConservationPracticeContainer = () => {
  const location: any = useLocation();

  const id = location?.state?.detail;

  console.log(id);
  
  return (
    <div>
      <ConservationPracticeOverview selectedPracticeId={9} />
      <ConservationPracticeVideo selectedPracticeId={9} />
    </div>
  );
};

export default ConservationPracticeContainer;
