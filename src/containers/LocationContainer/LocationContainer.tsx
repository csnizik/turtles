import { TabContent, TabPane } from 'reactstrap';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomTabs from '../../components/CustomTabs';
import { searchOptionMap } from '../../common/typedconstants.common';

import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ResourceConcernList from '../../components/ResourceConcernList/ResourceConcernList';
import CustomButton from '../../components/CustomButton';

import './location-search.scss';
import PracticeCard from '../../components/PracticeCard';

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

  const option = searchOptionMap[name];

  const [currentTabOption, setTabOption] = useState(option?.id);

  const renderLocationContent = () => {
    return (
      <div className='back-button'>
        <Link to='/'>
          <CustomButton className='btn btn-light '>
            <i className='fas fa-arrow-left ' /> Back
          </CustomButton>
        </Link>
      </div>
    );
  };

  const renderTabContent = () => (
    <TabContent activeTab={currentTabOption}>
      {currentTabOption === 0 && (
        <TabPane tabId={0}>{renderLocationContent()}</TabPane>
      )}
      {currentTabOption === 1 && (
        <TabPane tabId={1}>
          {renderLocationContent()}
          <ResourceConcernList />
        </TabPane>
      )}
      {currentTabOption === 2 && (
        <TabPane tabId={2}>
          {renderLocationContent()}
          <ConservationPracticeOverview />
        </TabPane>
      )}
      {currentTabOption === 3 && (
        <TabPane tabId={3}>{renderLocationContent()}</TabPane>
      )}
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
      <PracticeCard />

      {renderTabContent()}
    </>
  );
};

export default LocationContainer;
