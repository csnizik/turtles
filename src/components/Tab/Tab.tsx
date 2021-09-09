import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';

import './tab.scss';

interface ISearchOption {
  option: number;
  displayName: string;
  currentSearchOption: number;
  handleSearchChange: Function;
  currentSelectedStateName: string;
}

const SearchOption = ({
  displayName,
  option,
  currentSearchOption,
  handleSearchChange,
  currentSelectedStateName,
}: ISearchOption) => {
  const listItemClassNames = classNames({
    active: option === currentSearchOption,
  });

  const toggleTabs = (tab: number) => {
    handleSearchChange(tab);
  };

  const getTabTitle = () => {
    if (option === 0 && currentSelectedStateName) {
      return `${currentSelectedStateName} ${displayName}`;
    }
    return displayName;
  };

  return (
    <NavItem>
      <NavLink
        className={listItemClassNames}
        href='#'
        onClick={() => {
          toggleTabs(option);
        }}
      >
        <Link className='links' to={displayName.split(' ').join('')}>
          {getTabTitle()}
        </Link>
      </NavLink>
    </NavItem>
  );
};

export default SearchOption;
