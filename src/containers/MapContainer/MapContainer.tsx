import MapComponent from './MapComponent';
import { VIEW_DIV } from './constants';
import './map-container.scss';

const MapContainer = () => {
  return (
    <>
      <MapComponent />
      <div className='webmap' id={VIEW_DIV} />
    </>
  );
};

export default MapContainer;
