import { useState } from 'react';
import CustomSearch from './CustomSearch';
import CustomSearchResults from '../ResultsContainer';
import './custom-search.scss';

const CustomSearchContainer = () => {
  const [searchToggle, setSearchToggle] = useState(false);
  if (searchToggle) {
    return <CustomSearchResults />;
  }
  return <CustomSearch setSearchToggle={setSearchToggle} />;
};

export default CustomSearchContainer;
