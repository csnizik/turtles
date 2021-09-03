import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { IAccordion, Practice } from '../../common/types';
import './result-accordion.scss';
import { useGetNationalPracticesQuery } from '../../Redux/services/api';
import { setPracticeCategory } from '../../Redux/Slice/practiceSlice';
import { useAppDispatch } from '../../Redux/hooks/hooks';

const Accordion = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess, isError, error } =
    useGetNationalPracticesQuery();

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

  const handlePracticeCategorySelection = (id: number) => {
    dispatch(setPracticeCategory(id));
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
            {data.map((practiceCategory: IAccordion) => {
              const categoryId: number = practiceCategory.practiceCategoryId;
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
                  <div className={accordionClass}>
                    <li key={categoryId}>
                      <i
                        className={chevronClassName}
                        onClick={() =>
                          toggle(practiceCategory.practiceCategoryId)
                        }
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
                            <Link
                              to={practiceCategory.practiceCategoryLink}
                              onClick={() =>
                                handlePracticeCategorySelection(categoryId)
                              }
                            >
                              {practiceCategory.practiceCategoryName} Details
                            </Link>
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
                                    <Link to={ele.practiceLink}>
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
      {/* For demo Purpose */}
      <div className='top-title'>
        <h4>{t('search-results-page.project-initiatives')}</h4>
      </div>
    </>
  );
};

export default Accordion;
