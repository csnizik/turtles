import ConservationPracticeIntroduction from '../../components/ConservationPracticeIntroduction';

const PracticeCategoryContainer = ({ currentPracticeCategory }: any) => {
  if (!currentPracticeCategory) return null;
  return (
    <ConservationPracticeIntroduction
      introductionParagraph={
        currentPracticeCategory.practiceCategoryDescription
      }
      title={currentPracticeCategory.practiceCategoryName}
    />
  );
};

export default PracticeCategoryContainer;
