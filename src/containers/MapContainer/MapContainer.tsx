import MapComponent from './MapComponent';
import { VIEW_DIV } from './constants';
import './map-container.scss';

interface IMapProps {
  setSelectedLocation: Function;
  selectedLocation: string;
}

const MapContainer = ({ setSelectedLocation, selectedLocation }: IMapProps) => {
  return (
    <>
      <MapComponent
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <div className='webmap' id={VIEW_DIV} />
      <div id='akViewDiv' className='esri-widget' />
      <div id='hiViewDiv' className='esri-widget' />
      <div id='cariViewDiv' className='esri-widget' />
    </>
  );
};

export default MapContainer;
