import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import {
  useGetNationalOverviewByPracticeQuery,
  useGetStateListQuery,
} from '../../Redux/services/api';
import ApplicationImpacts from '../../components/ApplicationImpacts';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import ImplementationExtent from '../../components/ImplementationExtent';
import SpecificationsAndTools from '../../components/SpecificationsAndTools';
import ResourceConcernTreated from '../../components/ResourceConcernTreated';
import ProjectsAndInitiatives from '../../components/ProjectsAndInitiatives';
import HorizontalScroll from '../../components/HorizontalScroll';
import {
  setPracticeCategory,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';
import { currentState } from '../../Redux/Slice/stateSlice';

const IndividualPracticeContainer = () => {
  const state = useAppSelector((s) => s);
  const location: any = useLocation();
  const dispatch = useAppDispatch();
  const stateStatus: any = useGetStateListQuery();
  const practiceId: any = state.practiceSlice.selectedSpecficPractice;
  let stateCode = state?.practiceSlice.searchInput.state_county_code;
  if (stateCode) stateCode = stateCode.substring(0, 2);
  else stateCode = state?.stateSlice.stateCode;
  if (!stateCode) stateCode = '00';

  const { data, error, isLoading, isSuccess, isError } =
    useGetNationalOverviewByPracticeQuery(practiceId);

  if (location.search) {
    const linkage = location.search.split('?');
    const practiceCategoryId = linkage[1].split('=').pop();
    const subPracticeId = linkage[2].split('=').pop();
    const stateId = linkage[3].split('=').pop();
    const selectedState =
      stateId &&
      stateStatus.isSuccess &&
      stateStatus.data &&
      stateStatus.data.find((stateInfo: any) => {
        return stateInfo.stateCode === stateId;
      });
    dispatch(setPracticeCategory(Number(practiceCategoryId)));
    dispatch(setSpecificPractice(Number(subPracticeId)));
    dispatch(currentState(selectedState));
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
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
      <ApplicationImpacts data={data} isSuccess={isSuccess} />
      <ProjectsAndInitiatives data={data} isSuccess={isSuccess} />
    </>
  );
};

export default IndividualPracticeContainer;
