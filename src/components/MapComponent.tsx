import { useEffect, useState, useRef } from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import "@arcgis/core/assets/esri/themes/light/main.css";
import '../stylesheets/map.css';
import {
  MAP_ZOOM,
  VIEW_DIV,
  customFeatureLayer,
  portalItemId,
  portalUrl
} from '../common/constants.js'
import { queryLayer } from '../common/util/MapUtil';
import { usePrevious } from '../common/util/helperHooks';

interface IMapProperties {
  searchText: string
}

interface MapProps {
  view: any
}

const MapComponent = ({ searchText }: IMapProperties) => {
  const mapRef = useRef({} as MapProps);
  const [queryResults, setQueryResults] = useState([]);
  const previousSearchText = usePrevious(searchText);
  const customLayer = new FeatureLayer({
    url: customFeatureLayer
  });

  useEffect(() => {
    if (mapRef && mapRef.current) {
      esriConfig.portalUrl = portalUrl;
      var portalWebMap = new WebMap({
        portalItem: {
          id: portalItemId
        }
      });

      const view = new MapView({
        map: portalWebMap,
        container: VIEW_DIV,
        center: [-87.62, 41.87],
        zoom: 3,
      });

      portalWebMap.add(customLayer);

      mapRef.current.view = view;
    }
  }, [mapRef]);

  useEffect(() => {
    console.log("queryResults:", queryResults)
  }, [queryResults])

  useEffect(() => {
    if (searchText && previousSearchText !== searchText) {
      console.log("Prev: ", previousSearchText)
      console.log("searchText: ", searchText)
      queryLayer(
        customLayer,
        `state_name = '${searchText}'`,
        [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
      )
      .then((data: any) => setQueryResults(data))
    }
  }, [searchText])

  return null;
}

export default MapComponent;
