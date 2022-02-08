import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Practice } from '../../common/types';
import { useAppSelector } from '../../Redux/hooks/hooks';

const ResultsRow = ({
  rowData,
  toggleChild,
  currentTab,
  toggleChildTab,
  toggleExpandCategory,
  handlePracticeCategorySelection,
  handleSpecificPracticeSelection,
}: any) => {
  const { t } = useTranslation();
  const stateCode: string = useAppSelector(
    (state) => state.stateSlice.stateCode
  );
  const handleKeyPressed = (practiceId: number, event: any) => {
    if (event.keyCode === 9 || event.key === 'Tab') return;
    toggleExpandCategory(practiceId);
  };
  return (
    <>
      <div className='top-title'>
        <h2>{t('search-results-page.conservation-practices')}</h2>
      </div>
      <div className='accordion-section'>
        {rowData.map((practiceCategory: any) => {
          const categoryId = practiceCategory.practiceCategoryId;
          const chevronClassName = classNames('fas', {
            'fas fa-chevron-right': currentTab !== categoryId,
            'fas fa-chevron-down': currentTab === categoryId,
          });
          const accordionClass = classNames({
            'accordion-container': currentTab !== categoryId,
            'accordion-container-blue': currentTab === categoryId,
          });
          return (
            <ul>
              <div className={accordionClass}>
                <li
                  key={categoryId}
                  role='menuitem'
                  aria-label={practiceCategory.practiceCategoryName}
                  tabIndex={0}
                  onClick={() => toggleExpandCategory(categoryId)}
                  onKeyUp={(e) => handleKeyPressed(0, e)}
                >
                  <i className={chevronClassName} />
                  <div className='accordion-data'>
                    <h3>{practiceCategory.practiceCategoryName}</h3>
                    <div>
                      {currentTab === categoryId && (
                        <p>
                          {practiceCategory.practiceCategoryDescription ||
                            'No description Available'}
                        </p>
                      )}
                      {currentTab === categoryId && (
                        <p>
                          <Link
                            to={{
                              pathname: `${
                                stateCode || '00'
                              }/ConservationPractices/${categoryId}`,
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
              {currentTab === categoryId && (
                <div className='child-accordion-container'>
                  {practiceCategory.practices.map((ele: Practice) => {
                    const childChevronClassName = classNames('fas', {
                      'fa-chevron-right': toggleChildTab !== ele.practiceId,
                      'fa-chevron-down': toggleChildTab === ele.practiceId,
                    });
                    return (
                      <li
                        key={ele.practiceId}
                        role='menuitem'
                        aria-label={ele.practiceName}
                        tabIndex={0}
                        onClick={() => toggleChild(ele.practiceId)}
                        onKeyUp={(e) => handleKeyPressed(0, e)}
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
                                  to={`${
                                    stateCode || '00'
                                  }/ConservationPractices/${categoryId}/${
                                    ele.practiceId
                                  }`}
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
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default ResultsRow;
