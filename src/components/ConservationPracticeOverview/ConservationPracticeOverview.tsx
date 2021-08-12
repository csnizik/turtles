import './conservation-practice-overview.scss';
import { useGetPracticesQuery } from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';
import image from './image/diversion Image.jpeg';

const ConservationPracticeOverview = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetPracticesQuery();

  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <div className='document-box'>
          <ul className='list-document'>
            {/* {data.map((practice: any) => {
              return (
                <div key={practice.practice_Id} className='full-component'>
                  <div className='overview'>
                    <h4>{`${practice.practiceName} ${practice.practice_Code}`}</h4>
                    <p>{practice.practice_Overview}</p>
                    <h4>Practice Information</h4>
                    <p>{practice.practice_Info}</p>
                  </div>
                  <img alt='Practice' src={practice.practice_Image} />
                </div>
              );
            })} */}
            <div key={data[1].practiceId} className='full-component'>
              <div className='overview'>
                <h4>{`Diversion ${data[1].practiceCode}`}</h4>
                <p>{data[1].practiceOverview}</p>
                <h4>Practice Information</h4>
                <p>{data[1].practiceInfo}</p>
              </div>
              <img alt='Practice' src={image} />
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default ConservationPracticeOverview;
