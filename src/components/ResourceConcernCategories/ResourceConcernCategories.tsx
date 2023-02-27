import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';
import ConcernCategoryCard from '../ConcernCategoryCard';
import './resource-concerns-categories.scss';

interface ICategoryData {
  resourceConcernName: string;
  resourceConcernDescription: string;
  resourceConcernId: string;
}

interface ICategories {
  categories: ICategoryData[];
  selectResourceConcern: Function;
  heading: string;
  intro: string;
}

const ResourceConcernCategories = ({
  categories,
  selectResourceConcern,
  heading,
  intro,
}: ICategories) => {
  const history: any = useHistory();
  const { t } = useTranslation();
  const handleClick = () => {
    history.push('/search');
  };
  return (
    <div data-testid='concern-content' className='categoryListContainer'>
      <h3 className='headerText'>{heading}</h3>
      <div className='introText'>{intro}</div>
      {categories.length > 0 ? (
        <>
          <div className='card-container'>
            {categories.map((category: ICategoryData) => {
              return (
                <ConcernCategoryCard
                  key={category.resourceConcernId}
                  selectPractice={selectResourceConcern}
                  concernCategoryName={category.resourceConcernName}
                  concernCategoryDisplay={category.resourceConcernDescription}
                  concernCategoryId={category.resourceConcernId}
                />
              );
            })}
            <div className='search-card'>
              <div className='inside-card'>
                <p>{t('resource-concern.last-card-description')}</p>
                <CustomButton onClick={handleClick}>
                  {t('resource-concern.last-card-button')}
                </CustomButton>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3>No Resource Concern Category data available.</h3>
      )}
    </div>
  );
};

export default ResourceConcernCategories;
