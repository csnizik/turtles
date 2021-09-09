import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import PracticeCard from '../../components/PracticeCard';
import './conservation-practice-container.scss';

const ConservationPracticeContainer = () => {
  const location: any = useLocation();

  const id = location?.state?.detail;

  console.log(id);

  const [practiceCardState, setPracticeCardState] = useState(false);

  return (
    <div>
      {!practiceCardState ? (
        <PracticeCard setPracticeCardState={setPracticeCardState} />
      ) : (
        <>
          <ConservationPracticeOverview selectedPracticeId={id} />
          <ConservationPracticeVideo selectedPracticeId={id} />
        </>
      )}
    </div>
  );
};

export default ConservationPracticeContainer;
