import { useParams, useHistory } from 'react-router-dom';
import './practice-category-card.scss';
import image from './placeholder-icon-36.svg';

interface ICategoryData {
  practiceCategoryName: string;
  practiceCategoryDisplay: string;
  practiceCategoryId: string;
  selectPractice: any;
}

const PracticeCategoryCard = ({
  practiceCategoryName,
  practiceCategoryDisplay,
  practiceCategoryId,
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
        <img className='icon' alt='conservation practice icon' src={image} />
        <div className='practice-category-name'>{practiceCategoryName}</div>
      </div>
      <div className='practice-categoryisplay'>{practiceCategoryDisplay}</div>
    </div>
  );
};

export default PracticeCategoryCard;
