import PracticeCategoriesCard from '../PracticeCategoryCard';
import { setPracticeCategory } from '../../Redux/Slice/practiceSlice';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import './conservation-practices-categories.scss';

interface ICategoryData {
    title: string;
    body: string;
    id: string
}

interface ICategories {
    categories: ICategoryData[];
}

const ConservationPracticesCategories = ({ categories }: ICategories) => {

     const dispatch = useAppDispatch();
    
    const selectPractice = (id) => {
        console.log("SelectedPractice id: ", id)
        dispatch(setPracticeCategory(id));
    }
    return (
        <div className='categoryListContainer'>
            <div className='headerText'>Conservation Practice Categories</div>
            <div className='introText'>Conservation Practice Categories introduction ...</div>
            <div className='card-container'>
                {categories.map((category:ICategoryData) => {
                    return <div className='categoryCard'> <PracticeCategoriesCard selectPractice={selectPractice} title={category.title} body={category.body} id={category.id}/></div>
                })}
            </div>
    </div>
)
}

export default ConservationPracticesCategories;