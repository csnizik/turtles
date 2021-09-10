import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { usePostSearchDataQuery } from '../../Redux/services/api';
import './practice-card.scss';
import Spinner from '../Spinner/Spinner';
import {
  setSpecificPractice,
  setPracticeCategory,
} from '../../Redux/Slice/practiceSlice';

const PracticeCardDetails = ({ selectPractice, setPracticeViewType }: any) => {
  const initialState = {
    practice_category_id: 0,
  };

  const dispatch = useAppDispatch();

  const location: any = useLocation();

  const sharedState = location?.state?.detail;

  const [praticestate, setPracticestate] = useState(initialState);

  const handleRender = (practiceId: number, practiceCategoryId: number) => {
    dispatch(setSpecificPractice(practiceId));
    dispatch(setPracticeCategory(practiceCategoryId));
    setPracticeViewType({
      allPractices: false,
      practiceCategories: false,
      individualPractice: true,
    });
  };

  useEffect(() => {
    setPracticestate({ practice_category_id: sharedState });
  }, []);

  const { data, error, isLoading, isSuccess, isError } =
    usePostSearchDataQuery(praticestate);

  const practiceCategory: any = data && data[0];

  return (
    <div className='heading'>
      <h2>{practiceCategory?.practices?.length} Practices</h2>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <>
          {practiceCategory?.practices
            ? practiceCategory.practices.map((practice: any) => (
                <div className='full-document-box'>
                  <div className='list-box'>
                    <div className='info-box'>
                      <Link
                        to='/ConservationPractices'
                        onClick={() =>
                          handleRender(
                            practice.practiceId,
                            practiceCategory.practiceCategoryId
                          )
                        }
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
