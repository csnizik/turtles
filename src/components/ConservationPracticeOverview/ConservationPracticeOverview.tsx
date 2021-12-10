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
        <section className='practice-box'>
          <ul className='list-document'>
            <div key={data.practiceId} className='full-component'>
              <img
                alt=''
                src={
                  data.practiceImage
                    ? `images/landscape-initiatives-images/${data.practiceImage}`
                    : `images/landscape-initiatives-images/default.jpg`
                }
              />
              <div className='overview' data-testid='overview-container'>
                <h4>{`${data.practiceName} (${data.practiceCode})`}</h4>
                <p>{data.practiceOverview}</p>
                <h4>Practice Information</h4>
                <p>{data.practiceInfo}</p>
              </div>
            </div>
          </ul>
        </section>
      )}
    </>
  );
};

export default ConservationPracticeOverview;
