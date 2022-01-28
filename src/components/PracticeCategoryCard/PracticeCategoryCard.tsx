import { useParams, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const { name }: any = useParams();
  return (
    <div className='card'>
      <button
        type='button'
        className='btn-cover'
        onClick={() => {
          selectPractice(practiceCategoryId);
          history.push(`${name}/${practiceCategoryId}`);
        }}
      >
        {practiceCategoryName}
      </button>
      <div className='top-container'>
        <img
          className='icon'
          alt=''
          src={`../images/conservation-practice-images/${practiceCategoryIconPath}`}
        />
        <div className='practice-category-name'>{practiceCategoryName}</div>
      </div>
      <div className='practice-categoryisplay'>{practiceCategoryDisplay}</div>
    </div>
  );
};

export default PracticeCategoryCard;
