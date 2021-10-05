import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { IPractice, IPracticeCategory } from '../../common/types';
import classNames from 'classnames';
import { IPractice, IPracticeCategory } from '../../common/types';
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

const SearchByConservationPractice = ({
  selectedResourceCategory,
  secondState,
  setSecondState,
  selectedPractice,
  setSelectedPractice,
  setSearchInput,
  setSearchInfo,
}: any) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((State) => State.disableSlice.disableResource);
  const { t } = useTranslation();
  const [practiceState, setPracticeState] = useState<any>(intialPracticeState);
  const [selectedSubPractice, setSelectedSubPractice] = useState({ id: -1 });
  const wrapperClassNames = classNames('practice-box-wrapper', {
    'resource-selected': +selectedResourceCategory?.id >= 0,
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
    if (value !== '') {
      dispatch(disablePracticeDropdown());
      setSelectedPractice({ id: value });
      const foundPractice =
        practiceCategory.data &&
        practiceCategory.data.find((category: any) => {
          return category.practiceCategoryId === +value;
        });
      setSearchInfo((prevState) => ({
        ...prevState,
        practice_category: foundPractice?.practiceCategoryName || null,
      }));
      if (selectedPractice >= 0 && value !== selectedPractice) {
        setSecondState({ ...intialPracticeState, disabled: false });
      } else {
        setSecondState({ practice: practice.data, disabled: false });
      }
    } else {
      setSecondState({ ...intialPracticeState });
      setSelectedSubPractice({ id: -1 });
      setSelectedPractice({ id: -1 });
      dispatch(enablePracticeDropdown());
      setSearchInfo((prevState) => ({
        ...prevState,
        practice_category: null,
      }));
    }
  };

  const handlePracticeChange = (e) => {
    const { value } = e.target;
    const foundPractice =
      practice.data &&
      practice.data.find((specificPractice: any) => {
        return specificPractice.practiceId === +value;
      });
    setSelectedSubPractice(value);
    setSearchInfo((prevState) => ({
      ...prevState,
      practice: foundPractice?.practiceName || null,
    }));
    if (value === '') {
      setSelectedSubPractice({ id: -1 });
      setSearchInfo((prevState) => ({
        ...prevState,
        practice: null,
      }));
    }
  };

  return (
    <div className={wrapperClassNames}>
      <div className='search-by-practice-section'>
        <label
          className='usa-label practice-label'
          aria-labelledby='practiceCategoryValue specificPracticeValue'
        >
          {t('search-by-conservation-practice.heading')}
        </label>
        <div className='desktop:grid-col-8'>
          <label
            className='usa-label practice-label'
            htmlFor='practiceCategoryValue'
          >
            <p className='margin-top-2'>
              {t('search-by-conservation-practice.first-label-name')}
            </p>
          </label>

          <select
            className='usa-select'
            id='practiceCategoryValue'
            name='practiceCategorySelect'
            disabled={result}
            onChange={handlePracticeCategoryChange}
            value={+selectedPractice}
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
          <label
            className='usa-label practice-label'
            htmlFor='specificPracticeValue'
          >
            <p className='margin-top-4'>
              {t('search-by-conservation-practice.second-label-name')}
            </p>
          </label>
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
