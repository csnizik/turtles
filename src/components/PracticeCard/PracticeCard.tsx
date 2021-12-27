import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks/hooks';
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
    state_county_code: '',
  };

  const dispatch = useAppDispatch();

  const { stateCode, category: selectedPracticeCategoryId }: any = useParams();

  const [praticestate, setPracticestate] = useState(initialState);

  const history = useHistory();
  const { category }: any = useParams();

  const handleChange = (practiceId: number, practiceCategoryId: number) => {
    dispatch(setSpecificPractice(practiceId));
    dispatch(setPracticeCategory(practiceCategoryId));
    history.push(`${category}/${practiceId}`);
    setPracticeViewType({
      allPractices: false,
      practiceCategories: false,
      individualPractice: true,
    });
  };

  useEffect(() => {
    setPracticestate({
      practice_category_id: selectedPracticeCategoryId,
      state_county_code: `${stateCode}000`,
    });
  }, []);

  useEffect(() => {
    setPracticestate({
      practice_category_id: selectedPracticeCategoryId,
      state_county_code: `${stateCode}000`,
    });
  }, [selectedPracticeCategoryId]);
  const { data, error, isLoading, isSuccess, isError } =
    usePostSearchDataQuery(praticestate);
  const practiceCategory: any = data && data[0];

  return (
    <div className='heading'>
      {practiceCategory?.practices?.length !== 1 ? (
        <h2>{practiceCategory?.practices?.length} Practices</h2>
      ) : (
        <h2>{practiceCategory?.practices?.length} Practice</h2>
      )}
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <>
          {practiceCategory?.practices
            ? // eslint-disable-next-line
              practiceCategory.practices.map((practice: any) => {
                const imageName = practice?.practiceImagePath || 'default.jpg';
                return (
                  <div className='full-document-box'>
                    <div className='list-box'>
                      <div className='info-box'>
                        <button
                          type='button'
                          onClick={() =>
                            handleChange(
                              practice.practiceId,
                              practiceCategory.practiceCategoryId
                            )
                          }
                        >
                          <h3 className='card-titles'>
                            {practice.practiceName}
                          </h3>
                        </button>
                        <p>{practice.practiceDescription}</p>
                      </div>
                      <img
                        className='practice-image'
                        src={
                          imageName
                            ? `../../images/landscape-initiatives-images/${imageName}`
                            : `../../images/landscape-initiatives-images/default.jpg`
                        }
                        alt=''
                      />
                    </div>
                  </div>
                );
              })
            : []}
        </>
      )}
    </div>
  );
};

export default PracticeCardDetails;
