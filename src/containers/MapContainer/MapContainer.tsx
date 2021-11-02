import MapComponent from './MapComponent';
import { VIEW_DIV } from './constants';
import './map-container.scss';

/* eslint-disable react/no-unused-prop-types */
interface IMapProps {
  setSelectedLocation: Function;
  selectedLocation?: string;
}

const defaultProps: any = {
  selectedLocation: '',
};

const MapContainer = ({ setSelectedLocation }: IMapProps) => {
  return (
    <>
      <MapComponent setSelectedLocation={setSelectedLocation} />
      <div className='webmap' id={VIEW_DIV} />
      <div id='akViewDiv' className='esri-widget' />
      <div id='hiViewDiv' className='esri-widget' />
      <div id='cariViewDiv' className='esri-widget' />
    </>
  );
};

MapContainer.defaultProps = defaultProps;

export default MapContainer;
