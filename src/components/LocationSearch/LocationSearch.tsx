import { TabContent, TabPane } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomTabs from '../CustomTabs';
import { searchOptionMap } from '../../common/typedconstants.common';
import { useAppSelector } from '../../Redux/hooks/hooks';
import ConservationPracticeContainer from '../../containers/ConservationPracticeContainer';
import './location-search.scss';

// Tab styles come from the NRCS design system
// Documentation: (https://koala-bandits.github.io/nrcs-design-system-storybook/?path=/story/components-tabs-nav--tabs-story)
// 0 represents default tab style
// 1 represnts FPAC tab style
const tabStyleOptions: any = {
  default: 0,
  fpacStyle: 1,
};

const LocationContainer = () => {
  const { name }: any = useParams();
  const selectedPracticeCategory: number = useAppSelector(
    (state) => state.practiceSlice.selectedPracticeCategory
  );

  const selectedPractice: number = useAppSelector(
    (state) => state.practiceSlice.selectedSpecficPractice
  );
  const option = searchOptionMap[name];
  const [currentTabOption, setTabOption] = useState(option?.id);

  useEffect(() => {
    if (
      (selectedPracticeCategory >= 0 && !currentTabOption) ||
      selectedPractice
    ) {
      setTabOption(1);
    }
  }, []);

  const renderTabContent = () => (
    <TabContent activeTab={currentTabOption}>
      {currentTabOption === 0 && <TabPane tabId={0} />}
      {currentTabOption === 1 && (
        <TabPane tabId={1}>
          <ConservationPracticeContainer
            currentPracticeCategoryId={selectedPracticeCategory}
            currentSpecificPractice={selectedPractice}
          />
        </TabPane>
      )}
      {currentTabOption === 2 && <TabPane tabId={2} />}
    </TabContent>
  );
  return (
    <>
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
