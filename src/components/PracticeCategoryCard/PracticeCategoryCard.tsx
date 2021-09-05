import './practice-category-card.scss';
import image from './placeholder-icon-36.svg';

interface ICategoryData {
    title: string;
    body: string;
    id: string;
    selectPractice: any;
}

const PracticeCategoryCard = ({ title, body, id, selectPractice }:ICategoryData) => {
    
    return (
        <div className='card'>
            <button className='btn-cover' onClick={() => { selectPractice(id)}}>.</button>
            <div className='top-container'>
                <img className='icon' alt='conservation practice icon' src={image} />
                <div className='title'>{title}</div>
                </div>
            <div className='body'>{body}</div>
        </div>
    )

}

export default PracticeCategoryCard;