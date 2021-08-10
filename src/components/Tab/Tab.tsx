import classNames from 'classnames';
import { NavItem, NavLink } from 'reactstrap';

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
        {displayName}
      </NavLink>
    </NavItem>
  );
};

export default SearchOption;
