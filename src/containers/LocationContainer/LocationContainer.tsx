import { TabContent, TabPane } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomTabs from '../../components/CustomTabs';
import { searchOptionMap } from '../../common/typedconstants.common';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks/hooks';
import ConservationPracticeContainer from '../ConservationPracticeContainer';
import ProjectsContainer from '../ProjectsContainer';
import OverviewContainer from '../OverviewContainer';
import './location-search.scss';
import TabTitle from '../../components/TabTitle';
import { currentState } from '../../Redux/Slice/stateSlice';
import { useGetStateListQuery } from '../../Redux/services/api';

// Tab styles come from the NRCS design system
// Documentation: (https://koala-bandits.github.io/nrcs-design-system-storybook/?path=/story/components-tabs-nav--tabs-story)
// 0 represents default tab style
// 1 represnts FPAC tab style
const tabStyleOptions: any = {
  default: 0,
  fpacStyle: 1,
};

const LocationContainer = () => {
  const dispatch = useAppDispatch();
  const { stateCode, name }: any = useParams();
  const stateStatus: any = useGetStateListQuery();
  const selectedState =
    stateCode &&
    stateStatus.isSuccess &&
    stateStatus.data &&
    stateStatus.data.find((stateInfo: any) => {
      return stateInfo.stateCode === stateCode;
    });
  dispatch(currentState(selectedState));
  const stateInfo = useAppSelector((state: any) => state?.stateSlice);
  const selectedPracticeCategory: number = useAppSelector(
    (state) => state.practiceSlice.selectedPracticeCategory
  );
  const selectedPractice: number = useAppSelector(
    (state) => state.practiceSlice.selectedSpecficPractice
  );
  const option = searchOptionMap[name];
  const [currentTabOption, setTabOption] = useState(option?.id);
  useEffect(() => {
    setTabOption(option?.id);
    // Commented on 12/11. To be released in the future.
    // More details: CIG-1019
    // if (selectedPracticeCategory >= 0 && !currentTabOption) {
    //   setTabOption(1);
    // }
    // if (
    //   (!currentTabOption && selectedPracticeCategory < 0) ||
    //   !selectedPractice
    // ) {
    //   setTabOption(0);
    // }
  }, [selectedPracticeCategory, selectedPractice, option]);

  const renderTabContent = () => (
    <TabContent activeTab={currentTabOption}>
      {currentTabOption === 0 && (
        <TabPane tabId={0}>
          <OverviewContainer />
        </TabPane>
      )}
      {currentTabOption === 1 && (
        <TabPane tabId={1}>
          <ConservationPracticeContainer
            currentPracticeCategoryId={selectedPracticeCategory}
            currentSpecificPractice={selectedPractice}
          />
        </TabPane>
      )}
      {currentTabOption === 2 && (
        <TabPane tabId={2}>
          <ProjectsContainer />
        </TabPane>
      )}
    </TabContent>
  );
  return (
    <>
      <TabTitle
        stateName={stateInfo?.stateNameDisplay}
        currentTab={option?.displayName}
      />
      <CustomTabs
        tabStyleOption={tabStyleOptions.default}
        searchOptionList={searchOptionMap}
        currOption={currentTabOption}
        handleChangeSearchOption={setTabOption}
      />
      {renderTabContent()}
    </>
  );
};

export default LocationContainer;
