import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  useGetIndividualResourceConcernQuery,
} from '../../Redux/services/api';
import ResourceConcernOverview from '../../components/ResourceConcernOverview';
import CPPEScoreLegend from '../../components/CPPESoreLegend/CPPEScoreLegend';
import HorizontalScroll from '../../components/HorizontalScroll';
import { setResourceConcernCategory, setSpecificResourceConcern} from '../../Redux/Slice/resourceConcernSlice';
import CPPEScore from '../../components/CPPEScore/CPPEScore';
import CPPESCoreView from '../../components/CPPEScoreView/CPPEScoreColumnView';
import Spinner from '../../components/Spinner/Spinner';

const IndividualResourceConcernContainer = () => {
  const state = useAppSelector((s) => s);
  const dispatch = useAppDispatch();
  const resourceId: any = state?.resourceConcernSlice?.selectedSpecficResourceConcern;
  let stateCode = state?.resourceConcernSlice?.searchInput?.state_county_code;
  if (stateCode) stateCode = stateCode?.substring(0, 2);
  else stateCode = state?.stateSlice?.stateCode;
  if (!stateCode) stateCode = '00';

  const { data, error, isLoading, isSuccess, isError } =
  useGetIndividualResourceConcernQuery(resourceId);
  
  const {
    stateCode: stateCodeSelect,
    category,
    individual,
    name,
  }: any = useParams();

  if (
    individual &&
    +individual !== resourceId &&
    name !== 'ProjectsAndInitiatives'
  ) {
    
    dispatch(setResourceConcernCategory(Number(category)));
    dispatch(setSpecificResourceConcern(Number(individual)));
  }

  return (
    <>
      {/* <HorizontalScroll /> */}
      <ResourceConcernOverview
        data={data}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
      {/* <CPPEScore
        selectedStateCode={stateCode}
        selectedResourceConcernId={resourceId}
      /> */}
      {/* Impacts: TO DO Put back in the next PI */}
      {/* <ApplicationImpacts data={data} isSuccess={isSuccess} /> */}   
      <CPPEScoreLegend/>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <CPPESCoreView
          resourceConcern={data[0]}
          stateCode={stateCode}
        />
      )}
    </>
  );
};

export default IndividualResourceConcernContainer;
