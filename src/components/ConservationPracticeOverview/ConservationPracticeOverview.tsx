import './conservation-practice-overview.scss';
import { useGetPracticesQuery} from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';
import image from './image/diversion Image.jpeg';

const ConservationPracticeOverview = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetPracticesQuery();
  
  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <section className='document-box'>
          <ul className='list-document'>
            <div key={data[19].practiceId} className='full-component'>
              <div className='overview'>
                <h4>Cover Crop (Code 340)</h4>
                <p>{data[19].practiceOverview}</p>
                <h4>Practice Information</h4>
                <p>{data[19].practiceInfo}</p>
              </div>
              <img alt='Practice' src={image} />
            </div>
          </ul>
        </section>
      )}
    </>
  );
};

export default ConservationPracticeOverview;
