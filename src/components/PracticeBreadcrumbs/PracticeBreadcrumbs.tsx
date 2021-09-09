import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { usePostSearchDataQuery } from '../../Redux/services/api';
import { setPracticeCategory } from '../../Redux/Slice/practiceSlice';

const PracticeBreadcrumbs = ({
  setPracticeViewType,
  currentSpecificPractice,
  currentPracticeCategoryId,
}: any) => {
  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const sharedState = location?.state?.detail;

  const { data, isSuccess } = usePostSearchDataQuery({
    practice_id: sharedState,
  });
  const currentPracticeCategory: any =
    isSuccess &&
    data &&
    currentPracticeCategoryId >= 0 &&
    data.find(
      (practice: any) =>
        practice.practiceCategoryId === currentPracticeCategoryId
    );
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

  return (
    <nav
      className='usa-breadcrumb margin-top-1 margin-left-3'
      aria-label='Conservation practice breadcrumbs'
    >
      <ol className='usa-breadcrumb__list'>
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
        {currentPracticeCategory ? (
          <li
            className='usa-breadcrumb__list-item'
            onClick={() => handleNavigateBreadcrumb(1)}
            onKeyUp={() => handleNavigateBreadcrumb(1)}
            role='presentation'
          >
            <button type='button' className='usa-breadcrumb__link btn btn-link'>
              <span>{currentPracticeCategory.practiceCategoryName}</span>
            </button>
          </li>
        ) : null}

        {currentPractice ? (
          <li className='usa-breadcrumb__list-item'>
            <button type='button' className='usa-breadcrumb__link btn btn-link'>
              <span>{currentPractice.practiceName}</span>
            </button>
          </li>
        ) : null}
      </ol>
    </nav>
  );
};

export default PracticeBreadcrumbs;
