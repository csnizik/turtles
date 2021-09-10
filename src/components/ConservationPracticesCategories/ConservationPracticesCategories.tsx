import PracticeCategoriesCard from '../PracticeCategoryCard';
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
      {categories.length > 0 ? <div className='card-container'>
        {categories.map((category: ICategoryData) => {
          return (
            <PracticeCategoriesCard
               key={category.practiceCategoryId}
                selectPractice={selectPractice}
                practiceCategoryName={category.practiceCategoryName}
                practiceCategoryDisplay={category.practiceCategoryDisplay}
                practiceCategoryId={category.practiceCategoryId}
              />
          );
        })}
      </div>
        : <h3>No Practice Category data available.</h3>}
    </div>
  );
};

export default ConservationPracticesCategories;
