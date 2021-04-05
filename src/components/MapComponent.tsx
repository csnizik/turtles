import { useEffect, useState, useRef } from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Graphic from 'esri/Graphic';
import FeatureSet from 'esri/tasks/support/FeatureSet';
import esriConfig from "@arcgis/core/config";
import "@arcgis/core/assets/esri/themes/light/main.css";
import '../stylesheets/map.css';
import {
  VIEW_DIV,
  MAP_ZOOM,
  CENTER_COORDINATES,
  customFeatureLayer
} from '../common/constants.js'
import { queryLayer } from '../common/util/MapUtil';
import { usePrevious } from '../common/util/helperHooks';

interface IMapProperties {
  searchText: string
}

interface MapProps {
  view: any;
}

const MapComponent = ({ searchText }: IMapProperties) => {
  const mapRef = useRef({} as MapProps);
  const [queryResults, setQueryResults] = useState<FeatureSet>();

  const previousSearchText = usePrevious(searchText);
  const customLayer = new FeatureLayer({
    url: customFeatureLayer
  });

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
        center: CENTER_COORDINATES,
        zoom: MAP_ZOOM,
      });

      portalWebMap.add(customLayer);

      mapRef.current.view = view;
    }
  }, [mapRef]);

  useEffect(() => {
    const currentView = mapRef.current.view;
    if (queryResults && queryResults.features && queryResults.features.length) {
      const item: any = queryResults.features[0];
      if (item) {
        currentView.when(() => {
          currentView.goTo(item);
          currentView.popup.open({
            features: [item],
            location: item.geometry.centroid
          });
        })
      }
    }
  }, [queryResults])

  useEffect(() => {
    if (searchText && previousSearchText !== searchText) {
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
