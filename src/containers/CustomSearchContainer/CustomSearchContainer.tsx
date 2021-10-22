import { useState } from 'react';
import CustomSearch from './CustomSearch';
import CustomSearchResults from '../ResultsContainer';
import './custom-search.scss';

const CustomSearchContainer = () => {
  const [searchToggle] = useState(false);
  if (searchToggle) {
    return <CustomSearchResults />;
  }
  return <CustomSearch />;
};

export default CustomSearchContainer;
