import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Home from '@arcgis/core/widgets/Home';
import Map from '@arcgis/core/WebMap';
import {
  MAP_ZOOM,
  MIN_ZOOM,
  MAX_ZOOM,
  MAX_LEFT_POSITION,
  MAX_RIGHT_POSITION,
  CENTER_COORDINATES,
  VIEW_DIV,
} from './constants';
import '@arcgis/core/assets/esri/themes/light/main.css';

interface IMapProps {
  view: MapView;
}

const MapComponent = () => {
  const mapRef = useRef({} as IMapProps);
  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = new Map({
        basemap: 'topo-vector',
      });

      const view = new MapView({
        map,
        container: VIEW_DIV,
        center: CENTER_COORDINATES,
        zoom: MAP_ZOOM,
      });

      const homeBtn = new Home({
        view,
      });

      // Set view constraints
      view.constraints = {
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
      };

      mapRef.current.view = view;
      // Add the home button to the top left corner of the view
      mapRef.current.view.ui.add(homeBtn, 'top-left');
    }

    mapRef.current.view.on('pointer-down', (event) => {
      console.log('Pointer down Event: ', event);
    });

    mapRef.current.view.on('drag', (event) => {
      if (event) {
        // Check if the user is trying to navigate outside the USA
        console.log('Event: ', event);
        // if (
        //   event.origin.x > MAX_RIGHT_POSITION &&
        //   event.origin.x < MAX_LEFT_POSITION
        // ) {
        //   event.stopPropagation();
        // }
      }
    });
  }, [mapRef]);

  return null;
};

export default MapComponent;
