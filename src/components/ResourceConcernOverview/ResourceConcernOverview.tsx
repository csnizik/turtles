import './resource-concern-overview.scss';
import Spinner from '../Spinner/Spinner';
import { useAppSelector } from '../../Redux/hooks/hooks';

const ResourceConcernOverview = ({
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
        <section className='practice-box' data-testid='resource-conc-overview'>
          <ul className='list-document no-dot'>
            <li key={data[0].resourceConcernId} className='full-component'>
              <div className='overview' data-testid='overview-container'>
                <p>{data[0].resourceConcernDescription ? data[0].resourceConcernDescription: 'Description Incoming'}</p>
              </div>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default ResourceConcernOverview;
