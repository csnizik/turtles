import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import { usePostSearchDataQuery } from '../../Redux/services/api';
import './practice-card.scss';
import Spinner from '../Spinner/Spinner';
import {
  setSpecificPractice,
  setPracticeCategory,
} from '../../Redux/Slice/practiceSlice';

const PracticeCardDetails = ({ setPracticeViewType }: any) => {
  const initialState = {
    practice_category_id: 0,
  };

  const dispatch = useAppDispatch();

  const selectedPracticeCategoryId = useAppSelector(
    (state) => state.practiceSlice.selectedPracticeCategory
  );

  const location: any = useLocation();

  const sharedState = location?.state?.detail;

  const [praticestate, setPracticestate] = useState(initialState);

  const handleChange = (practiceId: number, practiceCategoryId: number) => {
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

  useEffect(() => {
    setPracticestate({ practice_category_id: selectedPracticeCategoryId });
  }, [selectedPracticeCategoryId]);

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
            ? // eslint-disable-next-line
              practiceCategory.practices.map((practice: any) => (
                <div className='full-document-box'>
                  <div className='list-box'>
                    <div className='info-box'>
                      <Link
                        to='/ConservationPractices'
                        onClick={() =>
                          handleChange(
                            practice.practiceId,
                            practiceCategory.practiceCategoryId
                          )
                        }
                      >
                        <h3>{practice.practiceName}</h3>
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
