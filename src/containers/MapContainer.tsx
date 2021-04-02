import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import {
  VIEW_DIV
} from '../common/constants.js';

const MapContainer = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="qsr-map">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <MapComponent
        searchText={searchText}
      />
      <div className="webmap" id={VIEW_DIV} />
    </div>
  )
}

export default MapContainer;
