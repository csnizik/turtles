import { Link, useLocation } from 'react-router-dom';
import './practice-card.scss';
// import { usePostSearchDataQuery } from '../../Redux/services/api';
// import { ISearchData } from '../../common/types';

const PracticeCardDetails = () => {
  // const location: any = useLocation ();

  // const sharedState = practiceCategoryId

  // const {data, error, isLoading, isSucess, isError} =
  // usePostSearchDataQuery(sharedState);

  return (
    <>
      <h2>36 Practices</h2>
      {/* {data.map((practice: ISearchData) => {})} */}
      <div className='full-document-box'>
        <div className='list-box'>
          <div className='info-box'>
            <Link
              to={{
                pathname: '#',
                // location: practiceId,
              }}
            >
              <h4>Alley Cropping</h4>
            </Link>
            <p>
              Alley cropping is an agroforestry practice where agricultural or
              horticultural crops are grown in the alleyways between widely
              spaced rows of woody plants.
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
