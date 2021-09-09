import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePostSearchDataQuery } from '../../Redux/services/api';
import './practice-card.scss';
import Spinner from '../Spinner/Spinner';

const PracticeCardDetails = ({ setPracticeCardState }: any) => {
  const initialState = {
    practice_category_id: 0,
  };

  const location: any = useLocation();

  const sharedState = location?.state?.detail;

  const [praticestate, setPracticestate] = useState(initialState);

  const handleRender = () => {
    setPracticeCardState(true);
  };

  useEffect(() => {
    setPracticestate({ practice_category_id: sharedState });
  }, []);

  const { data, error, isLoading, isSuccess, isError } =
    usePostSearchDataQuery(praticestate);

  return (
    <div className='heading'>
      <h2>{data && data[0]?.practices?.length} Practices</h2>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <>
          {data[0]?.practices
            ? data[0].practices.map((practice: any) => (
                <div className='full-document-box'>
                  <div className='list-box'>
                    <div className='info-box'>
                      <Link
                        to={{
                          state: {
                            detail: practice.practiceId,
                          },
                        }}
                        onClick={handleRender}
                      >
                        <h4>{practice.practiceName}</h4>
                      </Link>
                      <p>{practice.practiceDescription}</p>
                    </div>
                    <img
                      src='images/practice_placeholder.png'
                      alt='Practice Description'
                    />
                  </div>
                </div>
              ))
            : []}
        </>
      )}
    </div>
  );
};

export default PracticeCardDetails;
