import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IPractice, IPracticeCategory, ISearchData } from '../../common/types';
import { intialPracticeState } from '../../common/typedconstants.common';
import './conservation-practice.scss';
import {
  disablePracticeDropdown,
  enablePracticeDropdown,
} from '../../Redux/Slice/disableSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
} from '../../Redux/services/api';

type ISearchByConservationPractice = {
  secondState: any;
  setSecondState: Function;
  selectedResourceCategory: number;
  setSearchInput: Dispatch<SetStateAction<ISearchData>>;
  selectedPractice: any;
  setSelectedPractice: Dispatch<SetStateAction<any>>;
};
const SearchByConservationPractice = ({
  selectedResourceCategory,
  secondState,
  setSecondState,
  selectedPractice,
  setSelectedPractice,
  setSearchInput,
}: ISearchByConservationPractice) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((State) => State.disableSlice.disableResource);
  const { t } = useTranslation();
  const [practiceState, setPracticeState] = useState<any>(intialPracticeState);
  const [selectedSubPractice, setSelectedSubPractice] = useState(-1);
  const wrapperClassNames = classNames('practice-box-wrapper', {
    'resource-selected': selectedResourceCategory >= 0,
  });

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
      dispatch(disablePracticeDropdown());
      setSelectedPractice(practiceVal);
      if (selectedPractice >= 0 && practiceVal !== selectedPractice) {
        setSecondState({ ...intialPracticeState, disabled: false });
      } else {
        setSecondState({ practice: practice.data, disabled: false });
      }
    } else {
      setSecondState({ ...intialPracticeState });
      setSelectedSubPractice(-1);
      setSelectedPractice(-1);
      dispatch(enablePracticeDropdown());
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
    <div className={wrapperClassNames}>
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
            value={selectedPractice}
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
