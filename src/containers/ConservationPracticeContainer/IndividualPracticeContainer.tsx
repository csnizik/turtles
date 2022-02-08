import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  useGetNationalOverviewByPracticeQuery,
  useGetStateListQuery,
} from '../../Redux/services/api';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import ImplementationExtent from '../../components/ImplementationExtent';
import SpecificationsAndTools from '../../components/SpecificationsAndTools';
import ResourceConcernTreated from '../../components/ResourceConcernTreated';
import HorizontalScroll from '../../components/HorizontalScroll';
import {
  setPracticeCategory,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';
import { currentState } from '../../Redux/Slice/stateSlice';

const IndividualPracticeContainer = () => {
  const state = useAppSelector((s) => s);
  const dispatch = useAppDispatch();
  const stateStatus: any = useGetStateListQuery();
  const practiceId: any = state?.practiceSlice?.selectedSpecficPractice;
  let stateCode = state?.practiceSlice?.searchInput?.state_county_code;
  if (stateCode) stateCode = stateCode?.substring(0, 2);
  else stateCode = state?.stateSlice?.stateCode;
  if (!stateCode) stateCode = '00';

  const { data, error, isLoading, isSuccess, isError } =
    useGetNationalOverviewByPracticeQuery(practiceId);

  const { stateCode: stateCodeSelect, category, individual }: any = useParams();

  if (individual && +individual !== practiceId) {
    const selectedState =
      stateCodeSelect &&
      stateStatus.isSuccess &&
      stateStatus.data &&
      stateStatus.data.find((stateInfo: any) => {
        return stateInfo?.stateCode === stateCodeSelect;
      });
    dispatch(setPracticeCategory(Number(category)));
    dispatch(setSpecificPractice(Number(individual)));
    dispatch(currentState(selectedState));
  }

  return (
    <>
      <HorizontalScroll />
      <ConservationPracticeOverview
        data={data}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
      <ConservationPracticeVideo selectedPracticeId={practiceId} />
      <ResourceConcernTreated
        selectedStateCode={stateCode}
        selectedPracticeId={practiceId}
      />
      <ImplementationExtent data={data} isSuccess={isSuccess} />
      <SpecificationsAndTools
        selectedStateCode={stateCode}
        selectedPracticeId={practiceId}
        data={data}
        isSuccess={isSuccess}
      />
      {/* Impacts: TO DO Put back in the next PI */}
      {/* <ApplicationImpacts data={data} isSuccess={isSuccess} /> */}
    </>
  );
};

export default IndividualPracticeContainer;
