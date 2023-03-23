import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { practiceCategories } from '../../api-mocks/constants';
import { Practice } from '../../common/types';
import { useAppSelector } from '../../Redux/hooks/hooks';

const CPPERow = ({
  rowData,
  currentTab,
  toggleExpandPractice,
  categoryHeading,
  categoryNumber,
}: any) => {
  const stateCode: string = useAppSelector(
    (state) => state.stateSlice.stateCode
  );

  const uiText: any = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  );

  //eslint-disable-next-line
  const handlePracticeKeyPressed = (practiceCategoryId: number, event: any) => {
    if (event.keyCode === 13 || event.key === 'Enter')
      return toggleExpandPractice(practiceCategoryId);
  };

  let prevPractice = '';

  return (
    <>
      <div className='top-title'>
        <h3>{`${categoryHeading} (CPPE = ${categoryNumber})`}</h3>
      </div>
      <div className='accordion-section'>
        {rowData.map((practice: any) => {
          if (
            practice.practiceName !== prevPractice &&
            practice.cppeEffectValue === categoryNumber
          ) {
            prevPractice = practice.practiceName;
            const { practiceId } = practice;
            const chevronClassName = classNames('fas', {
              'fas fa-chevron-right': currentTab !== practiceId,
              'fas fa-chevron-down': currentTab === practiceId,
            });
            const accordionClass = classNames({
              'accordion-container': currentTab !== practiceId,
              'accordion-container-blue': currentTab === practiceId,
            });
            return (
              <ul role='menu'>
                <div className={accordionClass}>
                  <li
                    key={practiceId}
                    role='menuitem'
                    aria-label={practice.practiceName}
                    tabIndex={0}
                    onClick={() => toggleExpandPractice(practiceId)}
                    onKeyUp={(e) => handlePracticeKeyPressed(practiceId, e)}
                  >
                    <i className={chevronClassName} />
                    <div className='accordion-data'>
                      <h3>{practice.practiceName}</h3>
                      <div>
                        {currentTab === practiceId && (
                          <p>
                            {practice.practiceDescription ||
                              'No description Available'}
                          </p>
                        )}
                        {/* {currentTab === practiceId && (
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
                      )} */}
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default CPPERow;
