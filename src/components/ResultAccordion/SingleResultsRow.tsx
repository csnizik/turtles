import { Link } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';

const SingleResultsRow = ({
  rowId,
  practiceData,
  handleSpecificPracticeSelection,
}: any) => {
  const stateCode: string = useAppSelector(
    (state) => state.stateSlice.stateCode
  );
  const uiText: any = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  );

  return (
    <>
      <div className='top-title'>
        <h2>{uiText?.QuickSearchResultsHeading?.configurationValue}</h2>
      </div>
      <div className='accordion-section'>
        <div className='child-accordion-container'>
          <li key={practiceData.practiceId} role='presentation'>
            <div className='single-child-data'>
              <h3>{practiceData.practiceName}</h3>
              <div>
                <p>
                  {practiceData.practiceDescription ||
                    'No description Available'}
                </p>
                <p>
                  <Link
                    to={`${
                      stateCode || DEFAULT_NATIONAL_LOCATION
                    }/ConservationPractices/${rowId}/${
                      practiceData.practiceId
                    }`}
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
