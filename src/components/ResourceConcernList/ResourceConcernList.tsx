import { IResourceConcernList } from '../../common/types';
import { useGetResourcesQuery } from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';

const ResourceConcernList = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetResourcesQuery();

  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <div>
          {data.map((concern: IResourceConcernList) => (
            <ul key={concern.resourceConcernId}>
              <li> {concern.resourceConcernName}</li>
            </ul>
          ))}
        </div>
      )}
    </>
  );
};

export default ResourceConcernList;
