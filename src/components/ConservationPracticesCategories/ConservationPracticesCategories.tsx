import PracticeCategoryCard from '../PracticeCategoryCard';
import './conservation-practices-categories.scss';

interface ICategoryData {
  practiceCategoryName: string;
  practiceCategoryDisplay: string;
  practiceCategoryId: string;
}

interface ICategories {
  categories: ICategoryData[];
  selectPractice: Function;
}

const ConservationPracticesCategories = ({
  categories,
  selectPractice,
}: ICategories) => {
  return (
    <div className='categoryListContainer'>
      <div className='headerText'>Conservation Practice Categories</div>
      <div className='introText'>
        Conservation Practice Categories introduction ...
      </div>
      <ul className='card-container'>
        {categories.map((category: ICategoryData) => {
          return (
            <li className='categoryCard'>
              <PracticeCategoryCard
                selectPractice={selectPractice}
                practiceCategoryName={category.practiceCategoryName}
                practiceCategoryDisplay={category.practiceCategoryDisplay}
                practiceCategoryId={category.practiceCategoryId}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConservationPracticesCategories;
