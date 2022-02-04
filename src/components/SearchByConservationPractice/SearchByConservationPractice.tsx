import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  setSecondState,
  selectedPractice,
  setSelectedPractice,
  setSearchInput,
  setSearchInfo,
  resourceId,
  selectedSubPractice,
  setSelectedSubPractice,
}: any) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((State) => State.disableSlice.disableResource);
  const { t } = useTranslation();

  const wrapperClassNames = classNames('practice-box-wrapper', {
    'resource-selected': +selectedResourceCategory?.id >= 0 || resourceId > 0,
  });

  const practiceCategory = useGetPracticeCategoryQuery();
  const practice = useGetPracticeQuery(selectedPractice);

  const presistSearchInput = useAppSelector(
    (State) => State?.practiceSlice?.searchInput
  );

  //Temporary Solution
  const presistSearchInfo = useAppSelector(
    (State) => State?.practiceSlice?.searchInfo
  );

  useEffect(() => {
    const findPracticeName = practiceCategory?.data?.find((singlePractice) => {
      const name = +selectedPractice === singlePractice.practiceCategoryId;
      return name;
    })?.practiceCategoryName;

    if (selectedPractice === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        practice_category_id: null,
      }));
    } else {
      setSearchInfo((prevState) => ({
        ...prevState,
        practice_category:
          findPracticeName || presistSearchInfo.practice_category,
      }));
      setSearchInput((prevState) => ({
        ...prevState,
        practice_category_id: +selectedPractice,
      }));
    }
  }, [selectedPractice]);

  useEffect(() => {
    if (presistSearchInput?.practice_category_id != null) {
      setSelectedPractice({
        id: presistSearchInput.practice_category_id,
      });
      setSecondState({ practice: practice.data });
    }
    if (presistSearchInput?.practice_id != null) {
      setSelectedSubPractice({
        id: presistSearchInput.practice_id,
      });
    }
  }, []);

  useEffect(() => {
    const findSubPracticeName = practice?.data?.find((subPractice) => {
      const name = +selectedSubPractice.id === subPractice.practiceId;
      return name;
    })?.practiceName;
    if (selectedSubPractice.id === -1) {
      setSearchInput((prevState) => ({
        ...prevState,
        practice_id: null,
      }));
    } else {
      setSearchInput((prevState) => ({
        ...prevState,
        practice_id: +selectedSubPractice.id,
      }));
      setSearchInfo((prevState) => ({
        ...prevState,
        practice: findSubPracticeName || presistSearchInfo.practice,
      }));
    }
  }, [selectedSubPractice]);

  const handlePracticeCategoryChange = (e) => {
    const { value } = e.target;
    if (value !== '') {
      dispatch(disablePracticeDropdown());
      setSelectedPractice({ id: value });
      setSelectedSubPractice({ id: -1 });
      setSearchInfo((prevState) => ({
        ...prevState,
        practice: null,
      }));
      if (selectedPractice >= 0 && value !== selectedPractice) {
        setSecondState({ ...intialPracticeState });
      } else {
        setSecondState({ practice: practice.data });
      }
    } else {
      setSecondState({ ...intialPracticeState });
      setSelectedSubPractice({ id: -1 });
      setSelectedPractice({ id: -1 });
      dispatch(enablePracticeDropdown());
      setSearchInfo((prevState) => ({
        ...prevState,
        practice_category: null,
        practice: null,
      }));
    }
  };

  const handlePracticeChange = (e) => {
    const { value } = e.target;
    setSelectedSubPractice({ id: value });
    if (value === '') {
      if (selectedPractice < 0) dispatch(enablePracticeDropdown());
      setSelectedSubPractice({ id: -1 });
      setSearchInfo((prevState) => ({
        ...prevState,
        practice: null,
      }));
    } else {
      dispatch(disablePracticeDropdown());
    }
    setSearchInput((prevState) => ({
      ...prevState,
      practice_id: value,
    }));
  };

  return (
    <div className={wrapperClassNames}>
      <div className='search-by-practice-section'>
        <label className='usa-label practice-label'>
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
            disabled={result}
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
