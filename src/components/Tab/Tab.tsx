import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';

import './tab.scss';

interface ISearchOption {
  option: number;
  displayName: string;
  currentSearchOption: number;
  handleSearchChange: Function;
}

const SearchOption = ({
  displayName,
  option,
  currentSearchOption,
  handleSearchChange,
}: ISearchOption) => {
  const listItemClassNames = classNames({
    active: option === currentSearchOption,
  });

  const toggleTabs = (tab: number) => {
    handleSearchChange(tab);
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
          {displayName}
        </Link>
      </NavLink>
    </NavItem>
  );
};

export default SearchOption;
