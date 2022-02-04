import './conservation-practice-overview.scss';
import Spinner from '../Spinner/Spinner';

const ConservationPracticeOverview = ({
  data,
  error,
  isLoading,
  isSuccess,
  isError,
}: any) => {
  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <section className='practice-box' data-testid='consrv-prac-overview'>
          <ul className='list-document no-dot'>
            <li key={data.practiceId} className='full-component'>
              <img
                alt=''
                src={
                  data.practiceImage
                    ? `../../../images/landscape-initiatives-images/${data.practiceImage}`
                    : `../../../images/landscape-initiatives-images/default.jpg`
                }
              />
              <div className='overview' data-testid='overview-container'>
                <h2>{`${data.practiceName} (${data.practiceCode})`}</h2>
                <p>{data.practiceOverview}</p>
                <h2>Practice Information</h2>
                <p>{data.practiceInfo}</p>
              </div>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default ConservationPracticeOverview;
