import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//import { Spinner } from 'reactstrap';
import { ConservationPracticeResult } from '../../common/typedconstants.common';
import { IAccordion, Practice } from '../../common/types';
import './accordion.scss';
//import { useGetNationalPracticesQuery } from '../../Redux/services/api';

const Accordion = () => {
  // const { data, isLoading, isSuccess, isError, error } =
  //   useGetNationalPracticesQuery();

  const [resultsContainer, setResultsContainer] = useState(
    ConservationPracticeResult
  );

  // const [resultsContainer, setResultsContainer] = useState(
  //   data
  // );

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

  return (
    <>
      {/* {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <> */}
      <div className='top-title'>
        <h4>{t('search-results-page.conservation-practices')}</h4>
      </div>
      <div className='accordion-section'>
        {resultsContainer.map((item: IAccordion) => {
          const chevronClassName = classNames('fas', {
            'fas fa-chevron-right': tab !== item.id,
            'fas fa-chevron-down': tab === item.id,
          });
          const accordionClass = classNames({
            'accordion-container': tab !== item.id,
            'accordion-container-blue': tab === item.id,
          });
          return (
            <>
              <div className={accordionClass}>
                <li key={item.id}>
                  <i
                    className={chevronClassName}
                    onClick={() => toggle(item.id)}
                    role='presentation'
                  />
                  <div className='accordion-data'>
                    <h4>{item.practiceCategory}</h4>
                    <div>
                      {tab === item.id && <p>{item.practiceCategoryDesc}</p>}
                      {tab === item.id && (
                        <p>
                          <Link to={item.practiceCategoryLink}>
                            {item.practiceCategory} Details
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              </div>
              {tab === item.id && (
                <div className='child-accordion-container'>
                  {item.practices.map((ele: Practice) => {
                    const childChevronClassName = classNames('fas', {
                      'fa-chevron-right': toggleChildTab !== ele.practiceid,
                      'fa-chevron-down': toggleChildTab === ele.practiceid,
                    });
                    return (
                      <li
                        key={ele.practiceid}
                        onClick={() => toggleChild(ele.practiceid)}
                        role='presentation'
                      >
                        <i className={childChevronClassName} />
                        <div className='child-data'>
                          <h4>{ele.practiceName}</h4>
                          <div>
                            {toggleChildTab === ele.practiceid && (
                              <p>{ele.practiceDesc}</p>
                            )}
                            {toggleChildTab === ele.practiceid && (
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
      {/* </>
      )} */}
      {/* For demo Purpose */}
      <div className='top-title'>
        <h4>{t('search-results-page.project-initiatives')}</h4>
      </div>
    </>
  );
};

export default Accordion;
