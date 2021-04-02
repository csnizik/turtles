import React, { useEffect, useRef } from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import "@arcgis/core/assets/esri/themes/light/main.css";
import '../stylesheets/map.css';
import {
  MAP_ZOOM,
  VIEW_DIV,
  customFeatureLayer,
  portalItemId
} from '../common/constants.js'

interface IMapProperties {
  searchText: string
}

interface MapProps {
  view: any
}

const MapComponent = ({ searchText }: IMapProperties) => {
  const mapRef = useRef({} as MapProps);
  const customLayer = new FeatureLayer({
    url: customFeatureLayer
  });

  useEffect(() => {
  if (mapRef && mapRef.current) {
    esriConfig.portalUrl = 'https://age.spatialfrontgis.com/portal';
    var portalWebMap = new WebMap({
      portalItem: {
        id: portalItemId
      }
    });

    const view = new MapView({
      map: portalWebMap,
      container: VIEW_DIV,
      center: [-87.62, 41.87],
      zoom: MAP_ZOOM,
    });

    portalWebMap.add(customLayer);

    mapRef.current.view = view;
    // const searchWidget = new Search({
    //   view: view
    // });
    //
    // view.ui.add(searchWidget, {
    //   position: "top-right",
    //   index: 0
    // });
  }
}, [mapRef]);

  return (
		<div className="qsr-map">
			<div className="webmap" id={VIEW_DIV} />
		</div>
	);
}

export default MapComponent;
