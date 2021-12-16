import './practice-category-card.scss';

interface ICategoryData {
  practiceCategoryName: string;
  practiceCategoryDisplay: string;
  practiceCategoryId: string;
  practiceCategoryIconPath: string;
  selectPractice: any;
}

const PracticeCategoryCard = ({
  practiceCategoryName,
  practiceCategoryDisplay,
  practiceCategoryId,
  practiceCategoryIconPath,
  selectPractice,
}: ICategoryData) => {
  return (
    <div className='card'>
      <button
        type='button'
        className='btn-cover'
        onClick={() => {
          selectPractice(practiceCategoryId);
        }}
      >
        {practiceCategoryName}
      </button>
      <div className='top-container'>
        <img className='icon' alt='conservation practice icon' src={`images/conservation-practice-images/${practiceCategoryIconPath}`} />
        <div className='practice-category-name'>{practiceCategoryName}</div>
      </div>
      <div className='practice-categoryisplay'>{practiceCategoryDisplay}</div>
    </div>
  );
};

export default PracticeCategoryCard;
