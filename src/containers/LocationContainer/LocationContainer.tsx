import { TabContent, TabPane } from 'reactstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomTabs from '../../components/CustomTabs';
import { searchOptionMap } from '../../common/typedconstants.common';

// Tab styles come from the NRCS design system
// Documentation: (https://koala-bandits.github.io/nrcs-design-system-storybook/?path=/story/components-tabs-nav--tabs-story)
// 0 represents default tab style
// 1 represnts FPAC tab style
const tabStyleOptions: any = {
  default: 0,
  fpacStyle: 1,
};

const LocationContainer = () => {
  const [currentTabOption, setTabOption] = useState(
    searchOptionMap.locationTab.id
  );
  const history = useHistory();

  const renderLocationContent = () => {
    return (
      <button
        type='button'
        className='btn btn-light margin-2'
        onClick={() => history.push('/')}
      >
        <i className='fas fa-arrow-left' /> Back
      </button>
    );
  };

  const renderTabContent = () => (
    <TabContent activeTab={currentTabOption}>
      {currentTabOption === 0 && (
        <TabPane tabId={0}>{renderLocationContent()}</TabPane>
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
      {renderTabContent()}
    </>
  );
};

export default LocationContainer;
