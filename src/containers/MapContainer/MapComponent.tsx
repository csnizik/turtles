import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Home from '@arcgis/core/widgets/Home';
import Map from '@arcgis/core/Map';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
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

const albersStateURL: any =
  'https://gis1-eft.spatialfrontlab.com/arcgis/rest/services/cig-cpd/ALBERS_States/MapServer';

const MapComponent = () => {
  const mapRef = useRef({} as IMapProps);
  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = new Map();

      const view = new MapView({
        container: VIEW_DIV,
        map,
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
      const layer = new MapImageLayer(albersStateURL);
      map.layers.add(layer);
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
