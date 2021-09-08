import './conservation-practice-overview.scss';
import { useGetNationalOverviewByPracticeQuery } from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';

const ConservationPracticeOverview = ({ selectedPracticeId }: any) => {
  const { data, error, isLoading, isSuccess, isError } =
    useGetNationalOverviewByPracticeQuery(selectedPracticeId);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <section className='document-box'>
          <ul className='list-document'>
            <div key={data.practiceId} className='full-component'>
              <div className='overview' data-testid='overview-container'>
                <h4>Cover Crop (Code 340)</h4>
                <p>{data.practiceOverview}</p>
                <h4>Practice Information</h4>
                <p>{data.practiceInfo}</p>
              </div>
              <img
                alt='Practice'
                src={`data:image/png;base64,${data.practiceImage}`}
              />
            </div>
          </ul>
        </section>
      )}
    </>
  );
};

export default ConservationPracticeOverview;
