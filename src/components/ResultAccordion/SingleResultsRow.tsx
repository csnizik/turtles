import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../Redux/hooks/hooks';

const SingleResultsRow = ({
  rowId,
  practiceData,
  handleSpecificPracticeSelection,
}: any) => {
  const stateCode: string = useAppSelector(
    (state) => state.stateSlice.stateCode
  );
  const { t } = useTranslation();
  return (
    <>
      <div className='top-title'>
        <h4>{t('search-results-page.conservation-practices')}</h4>
      </div>
      <div className='accordion-section'>
        <div className='child-accordion-container'>
          <li key={practiceData.practiceId} role='presentation'>
            <div className='single-child-data'>
              <h4>{practiceData.practiceName}</h4>
              <div>
                <p>
                  {practiceData.practiceDescription ||
                    'No description Available'}
                </p>
                <p>
                  <Link
                    to={`${stateCode || '00'}/ConservationPractices`}
                    onClick={() =>
                      handleSpecificPracticeSelection(
                        rowId,
                        practiceData.practiceId
                      )
                    }
                  >
                    {practiceData.practiceName} Details
                  </Link>
                </p>
              </div>
            </div>
          </li>
          <hr />
        </div>
      </div>
    </>
  );
};

export default SingleResultsRow;
