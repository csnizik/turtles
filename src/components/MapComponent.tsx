import { useEffect, useRef } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';
import '@arcgis/core/assets/esri/themes/light/main.css';
import '../stylesheets/map.css';
import { MAP_ZOOM, VIEW_DIV } from '../common/constants.js';

interface MapProps {
  view: any;
}

const MapComponent = () => {
  const mapRef = useRef({} as MapProps);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      esriConfig.portalUrl = `${process.env.REACT_APP_PORTAL_URL}`;
      var portalWebMap = new WebMap({
        portalItem: {
          id: process.env.REACT_APP_PORTAL_ID,
        },
      });

      const view = new MapView({
        map: portalWebMap,
        container: VIEW_DIV,
        zoom: MAP_ZOOM,
      });

      mapRef.current.view = view;
    }
  }, [mapRef]);

  return (
    <div className='qsr-map'>
      <div className='webmap' id={VIEW_DIV}></div>
    </div>
  );
};

export default MapComponent;
