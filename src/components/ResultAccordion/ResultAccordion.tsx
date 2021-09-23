import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import {
  setPracticeCategory,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';
import { usePostSearchDataQuery } from '../../Redux/services/api';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';

import { Practice } from '../../common/types';
import './result-accordion.scss';

const Accordion = () => {
  const location: any = useLocation();
  const dispatch = useAppDispatch();
  const selectedPractice: number = useAppSelector(
    (state) => state.practiceSlice.selectedSpecficPractice
  );
  const sharedState = location?.state?.detail;

  const { data, error, isLoading, isSuccess, isError } =
    usePostSearchDataQuery(sharedState);
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
    categoryId: number,
    practiceId: number
  ) => {
    dispatch(setPracticeCategory(categoryId));
    dispatch(setSpecificPractice(practiceId));
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <>
          <div className='top-title'>
            <h4>{t('search-results-page.conservation-practices')}</h4>
          </div>
          <div className='accordion-section'>
            {data.map((practiceCategory: any) => {
              const categoryId = practiceCategory.practiceCategoryId;
              const chevronClassName = classNames('fas', {
                'fas fa-chevron-right': tab !== categoryId,
                'fas fa-chevron-down': tab === categoryId,
              });
              const accordionClass = classNames({
                'accordion-container': tab !== categoryId,
                'accordion-container-blue': tab === categoryId,
              });
              return (
                <>
                  <div key={categoryId} className={accordionClass}>
                    <li>
                      <i
                        className={chevronClassName}
                        onClick={() => toggleExpandCategory(categoryId)}
                        role='presentation'
                      />
                      <div className='accordion-data'>
                        <h4>{practiceCategory.practiceCategoryName}</h4>
                        <div>
                          {tab === categoryId && (
                            <p>
                              {practiceCategory.practiceCategoryDescription ||
                                'No description Available'}
                            </p>
                          )}
                          {tab === categoryId && (
                            <p>
                              <Link
                                to={{
                                  pathname: '/ConservationPractices',
                                  state: { detail: categoryId },
                                }}
                                onClick={() =>
                                  handlePracticeCategorySelection(categoryId)
                                }
                              >
                                {practiceCategory.practiceCategoryName} Details
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  </div>
                  {tab === categoryId && (
                    <div className='child-accordion-container'>
                      {practiceCategory.practices.map((ele: Practice) => {
                        const childChevronClassName = classNames('fas', {
                          'fa-chevron-right': toggleChildTab !== ele.practiceId,
                          'fa-chevron-down': toggleChildTab === ele.practiceId,
                        });
                        return (
                          <li
                            key={ele.practiceId}
                            onClick={() => toggleChild(ele.practiceId)}
                            role='presentation'
                          >
                            <i className={childChevronClassName} />
                            <div className='child-data'>
                              <h4>{ele.practiceName}</h4>
                              <div>
                                {toggleChildTab === ele.practiceId && (
                                  <p>
                                    {ele.practiceDescription ||
                                      'No description Available'}
                                  </p>
                                )}
                                {toggleChildTab === ele.practiceId && (
                                  <p>
                                    <Link
                                      to='/ConservationPractices'
                                      onClick={() =>
                                        handleSpecificPracticeSelection(
                                          categoryId,
                                          ele.practiceId
                                        )
                                      }
                                    >
                                      {ele.practiceName} Details
                                    </Link>
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                      <hr />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </>
      )}
      {/*  For demo Purpose  */}
      <div className='top-title'>
        <h4>{t('search-results-page.project-initiatives')}</h4>
      </div>
    </>
  );
};

export default Accordion;
