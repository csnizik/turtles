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

const Accordion = ({ setPracticeCardState }: any) => {
  const location: any = useLocation();
  const dispatch = useAppDispatch();
  const selectedPractice: number = useAppSelector(
    (state) => state.practiceSlice.selectedSpecficPractice
  );
  const sharedState = location?.state?.detail;

  const { data, error, isLoading, isSuccess, isError } =
    usePostSearchDataQuery(sharedState);

  const { t } = useTranslation();

  const [toggleChildTab, settoggleChildTab] = useState(null);

  const [tab, setTab] = useState(null);

  const toggle = (id: any) => {
    if (tab === id) {
      settoggleChildTab(null);
      return setTab(null);
    }
    settoggleChildTab(null);
    return setTab(id);
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
            {data.map((item: any) => {
              const chevronClassName = classNames('fas', {
                'fas fa-chevron-right': tab !== item.practiceCategoryId,
                'fas fa-chevron-down': tab === item.practiceCategoryId,
              });
              const accordionClass = classNames({
                'accordion-container': tab !== item.practiceCategoryId,
                'accordion-container-blue': tab === item.practiceCategoryId,
              });
              return (
                <>
                  <div key={item.practiceCategoryId} className={accordionClass}>
                    <li key={item.practiceCategoryId}>
                      <i
                        className={chevronClassName}
                        onClick={() => toggle(item.practiceCategoryId)}
                        role='presentation'
                      />
                      <div className='accordion-data'>
                        <h4>{`${item.practiceCategoryName} (${item.practices.length})`}</h4>
                        <div>
                          {tab === item.practiceCategoryId && (
                            <p>
                              {item.practiceCategoryDescription ||
                                'No description Available'}
                            </p>
                          )}
                          {tab === item.practiceCategoryId && (
                            <p>
                              <Link
                                to={{
                                  pathname: '/ConservationPractices',
                                  state: { detail: item.practiceCategoryId },
                                }}
                                onClick={() =>
                                  handlePracticeCategorySelection(
                                    item.practiceCategoryId
                                  )
                                }
                              >
                                {item.practiceCategoryName} Details
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  </div>
                  {tab === item.practiceCategoryId && (
                    <div className='child-accordion-container'>
                      {item.practices.map((ele: Practice) => {
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
                                          item.practiceCategoryId,
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
