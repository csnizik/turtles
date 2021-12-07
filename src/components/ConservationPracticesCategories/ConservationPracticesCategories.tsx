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
    <div data-testid='practice-content' className='categoryListContainer'>
      <div className='headerText'>Conservation Practice Categories</div>
      <div className='introText'>
        NRCS&apos;s conservation practices help people reduce soil erosion,
        enhance water supplies, improve water quality, increase wildlife
        habitat, and reduce damages caused by floods and other natural
        disasters. One practice may have multiple benefits depending on when,
        where, and how it is applied. To illustrate the impact of our
        conservation practices, we group them into categories that describe
        their benefits.
      </div>
      {categories.length > 0 ? (
        <div className='card-container'>
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
      ) : (
        <h3>No Practice Category data available.</h3>
      )}
    </div>
  );
};

export default ConservationPracticesCategories;
