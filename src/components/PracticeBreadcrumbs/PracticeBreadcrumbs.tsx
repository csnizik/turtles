import { useAppDispatch } from '../../Redux/hooks/hooks';
import { setPracticeCategory } from '../../Redux/Slice/practiceSlice';
import './practice-breadcrumbs.scss';

const PracticeBreadcrumbs = ({
  currentView,
  setPracticeViewType,
  currentSpecificPractice,
  currentPracticeCategory,
}: any) => {
  const dispatch = useAppDispatch();
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
        setPracticeViewType({ ...defaultPracticeViews, allPractices: true });
        break;
      }
      // Selected a practice category
      case 1: {
        setPracticeViewType({
          ...defaultPracticeViews,
          practiceCategories: true,
        });
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
  console.log(currentPractice);
  return (
    <nav
      className='usa-breadcrumb margin-top-1 margin-left-3 crumbs-container'
      aria-label='Conservation practice breadcrumbs'
    >
      <ol className='usa-breadcrumb__list'>
        {currentPractice ? (
          <>
            <li
              className='usa-breadcrumb__list-item'
              onClick={() => handleNavigateBreadcrumb(0)}
              onKeyUp={() => handleNavigateBreadcrumb(0)}
              role='presentation'
            >
              <button
                type='button'
                className='usa-breadcrumb__link btn btn-link'
                aria-label='Navigate back to the list of conservation practice categories'
              >
                <span>Conservation Practices</span>
              </button>
            </li>
            <li
              className='usa-breadcrumb__list-item'
              onClick={() => handleNavigateBreadcrumb(1)}
              onKeyUp={() => handleNavigateBreadcrumb(1)}
              role='presentation'
            >
              <span>{currentPracticeCategory.practiceCategoryName}</span>
            </li>
          </>
        ) : (
          <>
            <li
              className='usa-breadcrumb__list-item'
              onClick={() => handleNavigateBreadcrumb(0)}
              onKeyUp={() => handleNavigateBreadcrumb(0)}
              role='presentation'
            >
              <span>Conservation Practices</span>
            </li>
            <li />
          </>
        )}

        {currentPracticeCategory && currentView.individualPractice ? (
          <>
            <li
              className='usa-breadcrumb__list-item'
              onClick={() => handleNavigateBreadcrumb(1)}
              onKeyUp={() => handleNavigateBreadcrumb(1)}
              role='presentation'
            >
              <button
                type='button'
                className='usa-breadcrumb__link btn btn-link'
              >
                <span>{currentPracticeCategory.practiceCategoryName}</span>
              </button>
            </li>
            <li className='usa-breadcrumb__list-item'>
              <span>{currentPractice.practiceName}</span>
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
};

export default PracticeBreadcrumbs;
