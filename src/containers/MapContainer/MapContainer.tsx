import MapComponent from './MapComponent';
import { VIEW_DIV } from './constants';
import './map-container.scss';

/* eslint-disable react/no-unused-prop-types */
interface IMapProps {
  setSelectedLocation: Function;
}
/* eslint-disable no-unused-vars */
const MapContainer = ({ setSelectedLocation }: IMapProps) => {
  return (
    <>
      <MapComponent />
      <div className='webmap' id={VIEW_DIV} data-testid='cig-map' />
      <div id='akViewDiv' className='esri-widget' />
      <div id='hiViewDiv' className='esri-widget' />
      <div id='cariViewDiv' className='esri-widget' />
    </>
  );
};

export default MapContainer;
