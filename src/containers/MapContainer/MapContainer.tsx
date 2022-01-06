import classNames from 'classnames';
import MapComponent from './MapComponent';
import { VIEW_DIV } from './constants';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';
import './map-container.scss';

/* eslint-disable react/no-unused-prop-types */
interface IMapProps {
  setSelectedLocation: Function;
  stateCode: string;
}
/* eslint-disable no-unused-vars */
const MapContainer = ({ stateCode, setSelectedLocation }: IMapProps) => {
  const compositeViewClassNames = classNames('esri-widget', {
    hiddenView: stateCode !== DEFAULT_NATIONAL_LOCATION,
  });
  return (
    <>
      <MapComponent stateCode={stateCode} />
      <div className='webmap' id={VIEW_DIV} data-testid='cig-map' />
      <div id='akViewDiv' className={compositeViewClassNames} />
      <div id='hiViewDiv' className={compositeViewClassNames} />
      <div id='cariViewDiv' className={compositeViewClassNames} />
    </>
  );
};

export default MapContainer;
