import { useState } from 'react';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import PracticeCard from '../../components/PracticeCard';
import './conservation-practice-container.scss';

const ConservationPracticeContainer = () => {
  const [practiceCardState, setPracticeCardState] = useState(false);

  return (
    <div>
      {!practiceCardState ? (
        <PracticeCard setPracticeCardState={setPracticeCardState} />
      ) : (
        <>
          <ConservationPracticeOverview
            setPracticeCardState={setPracticeCardState}
            selectedPracticeId={9}
          />
          <ConservationPracticeVideo
            setPracticeCardState={setPracticeCardState}
            selectedPracticeId={9}
          />
        </>
      )}
    </div>
  );
};

export default ConservationPracticeContainer;
