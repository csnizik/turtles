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
      <ConservationPracticeOverview selectedPracticeId={9} />
      <ConservationPracticeVideo selectedPracticeId={9} />
    </>
  );
};

export default ConservationPracticeContainer;
