import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import {
  setPracticeCategory,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';
import './practice-breadcrumbs.scss';

const PracticeBreadcrumbs = ({
  currentView,
  setPracticeViewType,
  currentSpecificPractice,
  currentPracticeCategory,
  handleCreateReport,
}: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { stateCode }: any = useParams();
  const currentPractice =
    currentPracticeCategory &&
    currentPracticeCategory.practices.find(
      (practice: any) => practice.practiceId === currentSpecificPractice
    );
  const handleNavigateBreadcrumb = (breadcrumbId: number) => {
    const defaultPracticeViews = {
      allPractices: false,
      practiceCategories: false,
      individualPractice: false,
    };
    switch (breadcrumbId) {
      // Selected 'Conservation Practices'
      case 0: {
        dispatch(setPracticeCategory(-1));
        dispatch(setSpecificPractice(-1));
        setPracticeViewType({ ...defaultPracticeViews, allPractices: true });
        history?.push(`/${stateCode}/ConservationPractices`);
        break;
      }
      // Selected a practice category
      case 1: {
        setPracticeViewType({
          ...defaultPracticeViews,
          practiceCategories: true,
        });
        history?.push(
          `/${stateCode}/ConservationPractices/${currentPracticeCategory.practiceCategoryId}`
        );
        break;
      }
      // Selected an individual / specfic practice (Eg. 'Cover Crow')
      case 2: {
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleKeyPressed = (breadcrumbId: number, event: any) => {
    if (event.keyCode === 9 || event.key === 'Tab') return;
    handleNavigateBreadcrumb(breadcrumbId);
  };

  return (
    <nav
      className='usa-breadcrumb margin-top-1 margin-left-3 crumbs-container'
      aria-label='Breadcrumbs'
      data-testid='PracticeBreadcrumbs'
    >
      <ol className='usa-breadcrumb__list'>
        <li // eslint-disable-line
          className='usa-breadcrumb__list-item'
          aria-label='Conservation Practice Overview breadcrumb'
          onClick={() => handleNavigateBreadcrumb(0)}
          onKeyUp={(e) => handleKeyPressed(0, e)}
        >
          {currentPracticeCategory ? (
            <button
              type='button'
              className='usa-breadcrumb__link btn btn-link'
              aria-label='Navigate back to the list of conservation practice categories'
            >
              <span>Conservation Practices</span>
            </button>
          ) : (
            <span>Conservation Practices</span>
          )}
        </li>

        {currentView?.individualPractice &&
        currentSpecificPractice &&
        currentPractice ? (
          <>
            <li // eslint-disable-line
              className='usa-breadcrumb__list-item'
              aria-label='Conservation Practice Category Breadcrumb'
              onClick={() => handleNavigateBreadcrumb(1)}
              onKeyUp={(e) => handleKeyPressed(0, e)}
            >
              <button
                type='button'
                className='usa-breadcrumb__link btn btn-link'
              >
                <span>{currentPracticeCategory?.practiceCategoryName}</span>
              </button>
            </li>
            <li className='usa-breadcrumb__list-item'>
              <span>{currentPractice.practiceName}</span>
              <div className='practice-title-w-button'>
                <h2 className='practice-title'>
                  {currentPractice.practiceName}
                </h2>
                <div className='create-report-button'>
                  <button onClick={handleCreateReport} type='button'>
                    Create a Custom Report
                  </button>
                </div>
              </div>
            </li>
          </>
        ) : (
          <li // eslint-disable-line
            className='usa-breadcrumb__list-item'
            aria-label='Conservation Practice Category Breadcrumb'
            onClick={() => handleNavigateBreadcrumb(1)}
            onKeyUp={(e) => handleKeyPressed(0, e)}
          >
            <span>{currentPracticeCategory?.practiceCategoryName}</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default PracticeBreadcrumbs;
