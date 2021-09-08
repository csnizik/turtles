import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import PracticeBreadcrumbs from '../../components/PracticeBreadcrumbs';
import './conservation-practice-container.scss';

const ConservationPracticeContainer = ({
  currentSpecificPractice,
  currentPracticeCategoryId,
}: any) => {
  return (
    <>
      <PracticeBreadcrumbs
        currentPracticeCategoryId={currentPracticeCategoryId}
        currentSpecificPractice={currentSpecificPractice}
      />
      {currentPracticeCategoryId && currentSpecificPractice < 0 && (
        <>
          <p>Display practice category overview</p>
        </>
      )}
      {currentSpecificPractice >= 0 && (
        <>
          <ConservationPracticeOverview selectedPracticeId={9} />
          <ConservationPracticeVideo selectedPracticeId={9} />{' '}
        </>
      )}
    </>
  );
};

export default ConservationPracticeContainer;
