import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';
import PracticeCategoriesCard from '../PracticeCategoryCard';
import './conservation-practices-categories.scss';

interface ICategoryData {
  practiceCategoryName: string;
  practiceCategoryDisplay: string;
  practiceCategoryIconPath: string;
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
  const history: any = useHistory();
  const { t } = useTranslation();
  const handleClick = () => {
    history.push('/search');
  };
  return (
    <div data-testid='practice-content' className='categoryListContainer'>
      <h3 className='headerText'>Conservation Practice Categories</h3>
      <div className='introText'>{t('conservation-practice.intro')}</div>
      {categories.length > 0 ? (
        <>
          <div className='card-container'>
            {categories.map((category: ICategoryData) => {
              return (
                <PracticeCategoriesCard
                  key={category.practiceCategoryId}
                  selectPractice={selectPractice}
                  practiceCategoryName={category.practiceCategoryName}
                  practiceCategoryDisplay={category.practiceCategoryDisplay}
                  practiceCategoryId={category.practiceCategoryId}
                  practiceCategoryIconPath={category.practiceCategoryIconPath}
                />
              );
            })}
            <div className='search-card'>
              <div className='inside-card'>
                <p>{t('conservation-practice.last-card-description')}</p>
                <CustomButton onClick={handleClick}>
                  {t('conservation-practice.last-card-button')}
                </CustomButton>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3>No Practice Category data available.</h3>
      )}
    </div>
  );
};

export default ConservationPracticesCategories;
