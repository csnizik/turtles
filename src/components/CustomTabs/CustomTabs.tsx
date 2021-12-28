import { Nav } from 'reactstrap';
import Tab from '../Tab';
import './custom-tabs.scss';

interface ISubjectProps {
  currOption: number;
  tabStyleOption: number;
  searchOptionList: any;
  handleChangeSearchOption: Function;
}

interface INavigationOptions {
  tabs: boolean;
  className: string;
}

const CustomTabs = ({
  currOption,
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
      <Nav data-testid='custom-tabs' {...navOptions}>
        {Object.keys(searchOptionList).map((option: any) => {
          if (searchOptionList[option].id === 0) return null;
          return (
            <Tab
              key={option}
              currentSearchOption={currOption}
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
