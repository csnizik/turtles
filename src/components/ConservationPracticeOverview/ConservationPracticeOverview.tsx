import './conservation-practice-overview.scss';
import Spinner from '../Spinner/Spinner';
import { useAppSelector } from '../../Redux/hooks/hooks';

const ConservationPracticeOverview = ({
  data,
  error,
  isLoading,
  isSuccess,
  isError,
}: any) => {
  const uiText: any = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  ); 

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
                <h2>
                  {uiText?.cpDetailHeadingSubheading2?.configurationValue}
                </h2>
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
