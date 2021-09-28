import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import './tab.scss';
import { useAppSelector } from '../../Redux/hooks/hooks';

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
    // disabled: option === 0 || option === 2,
  });

  const toggleTabs = (tab: number) => {
    handleSearchChange(tab);
  };

  const selectedstate = useAppSelector(
    (state) => state.stateSlice.stateAbbreviation
  );

  const getTabTitle = () => {
    return `${selectedstate || 'U.S.'} ${displayName}`;
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
