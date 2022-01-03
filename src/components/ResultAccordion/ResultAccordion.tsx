import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from '../Spinner/Spinner';
import {
  setPracticeCategory,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';
import { usePostSearchDataQuery } from '../../Redux/services/api';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import SingleResultsRow from './SingleResultsRow';
import ResultsRow from './ResultsRow';

import { ISearchData } from '../../common/types';
import './result-accordion.scss';

const Accordion = () => {
  const dispatch = useAppDispatch();
  const selectedPractice: number = useAppSelector(
    (state) => state?.practiceSlice?.selectedSpecficPractice
  );
  const searchInputData = useAppSelector(
    (state) => state?.practiceSlice?.searchInput
  );

  const { data, error, isLoading, isSuccess, isError } =
    usePostSearchDataQuery(searchInputData);

  const [toggleChildTab, settoggleChildTab] = useState(null);

  const [tab, setTab] = useState(null);

  const { t } = useTranslation();

  const toggleExpandCategory = (categoryId: any) => {
    if (tab === categoryId) {
      settoggleChildTab(null);
      return setTab(null);
    }
    settoggleChildTab(null);
    return setTab(categoryId);
  };

  const toggleChild = (id: any) => {
    if (toggleChildTab === id) return settoggleChildTab(null);
    return settoggleChildTab(id);
  };

  const handlePracticeCategorySelection = (categoryId: number) => {
    if (selectedPractice >= 0) {
      dispatch(setSpecificPractice(-1));
    }

    dispatch(setPracticeCategory(categoryId));
  };

  const handleSpecificPracticeSelection = (
    categoryId: any,
    practiceId: any
  ) => {
    dispatch(setPracticeCategory(categoryId));
    dispatch(setSpecificPractice(practiceId));
  };
  const isSamePractice = (
    category: ISearchData,
    index: number,
    array: ISearchData[]
  ) => {
    return (
      category.practices?.length === 1 &&
      (index === array.length - 1 ||
        array[index].practices?.[0]?.practiceId ===
          array[index + 1].practices?.[0]?.practiceId)
    );
  };
  let singleDat;
  if (data && data.length >= 1) {
    singleDat = data.slice(0, 1);
  }

  const renderAccordion = () => {
    if (isSuccess && data && data.length >= 1) {
      return data.every(isSamePractice) ? (
        <SingleResultsRow
          practiceData={singleDat[0].practices[0]}
          rowId={singleDat[0].practiceCategoryId}
          handleSpecificPracticeSelection={handleSpecificPracticeSelection}
        />
      ) : (
        <ResultsRow
          currentTab={tab}
          toggleChildTab={toggleChildTab}
          toggleChild={toggleChild}
          rowData={data}
          toggleExpandCategory={toggleExpandCategory}
          handlePracticeCategorySelection={handlePracticeCategorySelection}
          handleSpecificPracticeSelection={handleSpecificPracticeSelection}
        />
      );
    }
    return null;
  };

  return (
    <section className='result-accordion-container'>
      {isLoading && <Spinner />}
      {isError && error}
      {renderAccordion()}
      {isSuccess && data && data.length <= 0 && (
        <p className='lead margin-3 padding-left-3'>
          {t('search-results-page.no-practices-found')}
        </p>
      )}
    </section>
  );
};

export default Accordion;
