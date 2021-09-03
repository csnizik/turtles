import PracticeCategoriesCard from '../PracticeCategoryCard';
import './conservation-practices-categories.scss';

interface ICategoryData {
    title: string;
    body: string;
}

interface ICategories {
    categories: ICategoryData[];
}

const ConservationPracticesCategories = ({categories}: ICategories) => {
    return (
        <div className='categoryListContainer'>
            <div className='headerText'>Conservation Practice Categories</div>
            <div className='introText'>Conservation Practice Categories introduction ...</div>
            <div>
                {categories.map((category:ICategoryData) => {
                  return <div className='categoryCard'> <PracticeCategoriesCard title={category.title} body={category.body} /></div>
                })}
            </div>
    </div>
)
}

export default ConservationPracticesCategories;