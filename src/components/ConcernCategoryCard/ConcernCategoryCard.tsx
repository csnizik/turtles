import { useParams, useHistory } from 'react-router-dom';
import './concern-category-card.scss';

interface ICategoryData {
  concernCategoryName: string;
  concernCategoryDisplay: string;
  concernCategoryId: string;
  selectPractice: any;
}

const ConcernCategoryCard = ({
  concernCategoryName,
  concernCategoryDisplay,
  concernCategoryId,
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
          selectPractice(concernCategoryId);
          history.push(`${name}/${concernCategoryId}`);
        }}
      >
        {concernCategoryName}
      </button>
      <div className='top-container'>
        <div className='practice-category-name'>{concernCategoryName}</div>
      </div>
      <div className='practice-categoryisplay'>{concernCategoryDisplay}</div>
    </div>
  );
};

export default ConcernCategoryCard;
