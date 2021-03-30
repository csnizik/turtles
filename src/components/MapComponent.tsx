import React, { useEffect, useRef } from 'react';
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Search from '@arcgis/core/widgets/Search';
import '../stylesheets/map.css';
import {
  BASE_MAP_OPTIONS,
  MAP_ZOOM,
  VIEW_DIV
} from '../common/constants.js'

interface MapProps {
  view: any
}

const MapComponent = () => {
  console.log("ENVIRONMENT--->",process.env.NODE_ENV, "URL--->", process.env.REACT_APP_BASE_URL)
  const mapRef = useRef({} as MapProps);

  useEffect(() => {
  if (mapRef && mapRef.current) {
    const map = new ArcGISMap({
      basemap: BASE_MAP_OPTIONS.satellite,
    });

    const view = new MapView({
      map: map,
      container: VIEW_DIV,
      center: [-87.62, 41.87],
      zoom: MAP_ZOOM,
    });

    mapRef.current.view = view;

    const searchWidget = new Search({
      view: view
    });

    view.ui.add(searchWidget, {
      position: "top-right",
      index: 0
    });
  }
}, [mapRef]);

  return (
		<div className="qsr-map">
			<div className="webmap" id={VIEW_DIV} />
		</div>
	);
}

export default MapComponent;
