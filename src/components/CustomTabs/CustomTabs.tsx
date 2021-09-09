import { Nav } from 'reactstrap';
import Tab from '../Tab';
import './custom-tabs.scss';

interface ISubjectProps {
  currOption: number;
  tabStyleOption: number;
  searchOptionList: any;
  handleChangeSearchOption: Function;
  currentSelectedState: any;
}

interface INavigationOptions {
  tabs: boolean;
  className: string;
}

const CustomTabs = ({
  currOption,
  currentSelectedState,
  searchOptionList,
  handleChangeSearchOption,
  tabStyleOption,
}: ISubjectProps) => {
  const navOptions: INavigationOptions = {
    tabs: tabStyleOption === 0,
    className: tabStyleOption === 1 ? 'nav-fpac' : '',
  };
  const renderSearchOptions = () => {
    return (
      <Nav {...navOptions}>
        {Object.keys(searchOptionList).map((option: any) => {
          return (
            <Tab
              key={option}
              currentSearchOption={currOption}
              currentSelectedStateName={
                currentSelectedState && currentSelectedState.stateNameDisplay
              }
              option={searchOptionList[option].id}
              displayName={searchOptionList[option].displayName}
              handleSearchChange={handleChangeSearchOption}
            />
          );
        })}
      </Nav>
    );
  };

  return <>{renderSearchOptions()}</>;
};

export default CustomTabs;
