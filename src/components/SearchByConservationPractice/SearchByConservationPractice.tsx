import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPractice, IPracticeCategory, ISearchData } from '../../common/types';
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
type ISearchByConservationPractice = {
  setSearchInput: Dispatch<SetStateAction<ISearchData>>;
};
const SearchByConservationPractice = ({
  setSearchInput,
}: ISearchByConservationPractice) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((State) => State.disableSlice.disableResource);
  const { t } = useTranslation();
  const [practiceState, setPracticeState] = useState<any>(intialState);
  const [secondState, setSecondState] = useState<any>(intialState);
  const [selectedPractice, setSelectedPractice] = useState(-1);
  const [selectedSubPractice, setSelectedSubPractice] = useState(-1);

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
    if (selectedSubPractice === -1) {
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
    const practiceVal = e.target.value;
    if (practiceVal !== '') {
      dispatch(disableSecondState());
      setSelectedPractice(practiceVal);
      if (selectedPractice >= 0 && practiceVal !== selectedPractice) {
        setSecondState({ ...intialState, disabled: false });
      } else {
        setSecondState({ practice: practice.data, disabled: false });
      }
    } else {
      setSecondState({ ...intialState });
      setSelectedSubPractice(-1);
      setSelectedPractice(-1);
      dispatch(enableSecondState());
    }
  };

  const handlePracticeChange = (e) => {
    const { value } = e.target;
    setSelectedSubPractice(+value);
    if (value === '') {
      setSelectedSubPractice(-1);
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
                    value={item.practiceCategoryId}
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
            value={selectedSubPractice}
          >
            <option value=''>- Select practice -</option>
            {practice.isSuccess &&
              practice.data &&
              practice.data.map((item: IPractice) => {
                return (
                  <option key={item.practiceCode} value={item.practiceId}>
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
