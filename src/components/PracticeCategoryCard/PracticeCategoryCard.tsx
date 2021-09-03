import './practice-category-card.scss';
import { ReactComponent as PlaceholderIcon } from './placeholder-icon-36.svg';

interface ICategoryData {
    title: string;
    body: string;
}

const PracticeCategoryCard = ({ title, body }:ICategoryData) => {
    
    return (
        <div className='card'>
            <div className='top-container'>
            <div className='icon'><PlaceholderIcon/></div> 
                <div className='title'>{title}</div>
                </div>
            <div className='body'>{body}</div>
        </div>
    )

}

export default PracticeCategoryCard;