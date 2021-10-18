//import { useState } from 'react';
import Extent from '@arcgis/core/geometry/Extent';
import MapComponent from './MapComponent';
import { VIEW_DIV } from './constants';
import './map-container.scss';

const MapContainer = () => {
  // const [stateExtent] = useState<Extent>();

  return (
    <>
      <MapComponent />
      <div className='webmap' id={VIEW_DIV} />
    </>
  );
};

export default MapContainer;
