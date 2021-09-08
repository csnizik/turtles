import { useLocation, useHistory } from 'react-router-dom';
import { usePostSearchDataQuery } from '../../Redux/services/api';

const PracticeBreadcrumbs = ({
  currentSpecificPractice,
  currentPracticeCategoryId,
}: any) => {
  const history: any = useHistory();
  const location: any = useLocation();

  const sharedState = location?.state?.detail;

  const { data, isSuccess } = usePostSearchDataQuery({
    practice_id: sharedState,
  });
  const currentPracticeCategory: any =
    isSuccess &&
    data &&
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
    switch (breadcrumbId) {
      case 0: {
        history.push('/search');
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
          <li className='usa-breadcrumb__list-item'>
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
