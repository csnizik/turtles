import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConservationPractice } from '../../common/typedconstants.common';
import { IConservationPracticeDropdown } from '../../common/types';
import './conservation-practice.scss';
import {
  disableSecondState,
  enableSecondState,
} from '../../Redux/Slice/disableSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';

const intialState = {
  practice: [],
  disabled: true,
};

const SearchByConservationPractice = ({
  searchInput,
  handleInputChange,
}: any) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((State) => State.disableSlice.disableResource);
  const { t } = useTranslation();
  const [practiceState, setPracticeState] =
    useState<IConservationPracticeDropdown>(intialState);
  const [secondState, setSecondState] =
    useState<IConservationPracticeDropdown>(intialState);

  useEffect(() => {
    setPracticeState({ ...practiceState, practice: ConservationPractice });
    setSecondState({ ...secondState, practice: ConservationPractice });
  }, [searchInput]);

  const handleChange = (e) => {
    const practiceVal = e.target.value;
    const practiceCategory = searchInput.selectedPracticeCategory;
    if (practiceVal !== '') {
      dispatch(disableSecondState());
      handleInputChange(e);
      if (practiceCategory && practiceVal !== practiceCategory) {
        setSecondState({ ...intialState, disabled: false });
      } else {
        setSecondState({ practice: ConservationPractice, disabled: false });
      }
    } else {
      setSecondState({ ...intialState });
      dispatch(enableSecondState());
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
          <p>{t('search-by-conservation-practice.first-label-name')}</p>
          <select
            className='usa-select'
            id='practiceCategoryValue'
            name='selectedPracticeCategory'
            disabled={result}
            onChange={handleChange}
            value={searchInput.selectedPracticeCategory}
          >
            <option value=''>All practices (default)</option>
            {practiceState.practice.length
              ? practiceState.practice.map((practice: any) => {
                  return (
                    <option key={practice.practiceCategory} value={practice.id}>
                      {practice.practiceCategory}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <div className='desktop:grid-col-8'>
          <p>{t('search-by-conservation-practice.second-label-name')}</p>
          <select
            className='usa-select'
            id='specificPracticeValue'
            name='selectedPractice'
            disabled={secondState.disabled}
            value={searchInput.selectedPractice}
          >
            <option value=''>- Select practice -</option>
            {secondState.practice.length
              ? secondState.practice.map((item: any) => {
                  return (
                    <option key={item.practiceCategory} value={item.practice}>
                      {item.practice}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchByConservationPractice;
