import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPractice, IPracticeCategory } from '../../common/types';
import './conservation-practice.scss';
import {
  disableSecondState,
  enableSecondState,
} from '../../Redux/Slice/disableSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
} from '../../Redux/services/api';

const intialState = {
  practice: [],
  disabled: true,
};
// type ISearchByConservationPractice = {
//   setSearchInput: Dispatch<SetStateAction<ISearchData>>;
//   setSearchInfo: Dispatch<SetStateAction<ISearchInfo>>;
// };
const SearchByConservationPractice = ({
  setSearchInput,
  setSearchInfo,
}: any) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((State) => State.disableSlice.disableResource);
  const { t } = useTranslation();
  const [practiceState, setPracticeState] = useState<any>(intialState);
  const [secondState, setSecondState] = useState<any>(intialState);
  const [selectedPractice, setSelectedPractice] = useState(-1);
  const [selectedSubPractice, setSelectedSubPractice] = useState({ id: -1 });

  const practiceCategory = useGetPracticeCategoryQuery();
  const practice = useGetPracticeQuery(selectedPractice);

  useEffect(() => {
    setPracticeState({ ...practiceState, practice: practiceCategory.data });
    setSecondState({ ...secondState, practice: practice.data });

    if (selectedPractice === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        practice_category_id: null,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        practice_category_id: +selectedPractice,
      }));
    }
  }, [selectedPractice]);

  useEffect(() => {
    if (selectedSubPractice.id === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        practice_id: null,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        practice_id: +selectedSubPractice,
      }));
    }
  }, [selectedSubPractice]);

  const handlePracticeCategoryChange = (e) => {
    const { value } = e.target;
    const practiceVal = value.split(',');
    console.log('Practice Val-->', practiceVal);
    if (practiceVal[0] !== '') {
      dispatch(disableSecondState());
      setSelectedPractice(practiceVal[0]);
      setSearchInfo((prevState) => ({
        ...prevState,
        practice_category: practiceVal[1],
      }));
      if (selectedPractice >= 0 && practiceVal[0] !== selectedPractice) {
        setSecondState({ ...intialState, disabled: false });
      } else {
        setSecondState({ practice: practice.data, disabled: false });
      }
    } else {
      setSecondState({ ...intialState });
      setSelectedSubPractice({ id: -1 });
      setSelectedPractice(-1);
      dispatch(enableSecondState());
      setSearchInfo((prevState) => ({
        ...prevState,
        practice_category: null,
      }));
    }
  };

  const handlePracticeChange = (e) => {
    const { value } = e.target;
    const subPracticeVal = value.split(',');
<<<<<<< Updated upstream
    console.log('Practice Value', subPracticeVal[0]);
=======
    console.log('Practice Value', typeof +subPracticeVal[0]);
>>>>>>> Stashed changes
    setSelectedSubPractice(subPracticeVal[0]);
    setSearchInfo((prevState) => ({
      ...prevState,
      practice: subPracticeVal[1],
    }));
    if (subPracticeVal[0] === '') {
      setSelectedSubPractice({ id: -1 });
      setSearchInfo((prevState) => ({
        ...prevState,
        practice: null,
      }));
    }
  };

  return (
    <div className='practice-box-wrapper'>
      <div className='search-by-practice-section'>
        <label
          className='usa-label practice-label'
          htmlFor='practiceCategoryValue'
        >
          {t('search-by-conservation-practice.heading')}
        </label>
        <div className='desktop:grid-col-8'>
          <p className='margin-top-2'>
            {t('search-by-conservation-practice.first-label-name')}
          </p>
          <select
            className='usa-select'
            id='practiceCategoryValue'
            name='practiceCategorySelect'
            disabled={result}
            onChange={handlePracticeCategoryChange}
          >
            <option value=''>All practices (default)</option>
            {practiceCategory.isSuccess &&
              practiceCategory.data &&
              practiceCategory.data.map((item: IPracticeCategory) => {
                return (
                  <option
                    key={item.practiceCategoryId}
                    value={`${item.practiceCategoryId},${item.practiceCategoryName}`}
                  >
                    {item.practiceCategoryName}
                  </option>
                );
              })}
          </select>
        </div>

        <div className='desktop:grid-col-8'>
          <p className='margin-top-4'>
            {t('search-by-conservation-practice.second-label-name')}
          </p>
          <select
            className='usa-select'
            id='specificPracticeValue'
            name='specificPracticeSelect'
            disabled={secondState.disabled}
            onChange={handlePracticeChange}
            value={selectedSubPractice.id}
          >
            <option value=''>- Select practice -</option>
            {practice.isSuccess &&
              practice.data &&
              practice.data.map((item: IPractice) => {
                return (
                  <option
                    key={item.practiceCode}
                    value={`${item.practiceId},${item.practiceName}`}
                  >
                    {item.practiceName}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchByConservationPractice;
