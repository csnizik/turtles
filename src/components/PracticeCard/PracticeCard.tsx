import { Link } from 'react-router-dom';
import './practice-card.scss';

interface IPracticeData {
  practiceId: number;
  practiceName: string;
  practiceDescription: string;
  practiceLink: string;
}

interface ICategoryData {
  practiceCategoryId: string;
}

const PracticeCardDetails = () => {
  return (
    <>
      <h2>36 Practices</h2>
      <div className='full-document-box'>
        <div className='list-box'>
          <div className='info-box'>
            <Link to='#'>
              <h4>Alley Cropping</h4>
            </Link>
            <p>
              Alley cropping is an agroforestry practice where agricultural or
              horticultural crops are grown in the alleyways between widely
              spaced rows of woody plants. By combining annual and perennial
              crops that yield varied products and profits at different times, a
              landowner can more effectively use available space, time, and
              resources.
            </p>
          </div>
          <img
            src='images/practice_placeholder.png'
            alt='Practice Description'
          />
        </div>
      </div>
    </>
  );
};

export default PracticeCardDetails;
