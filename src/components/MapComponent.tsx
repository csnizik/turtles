import { useEffect, useState, useRef } from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";
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
  statesLayerId,
  statesLayerName
} from '../common/constants.js'
import { queryLayer } from '../common/util/MapUtil';
import { usePrevious } from '../common/util/helperHooks';
import { layer } from 'esri/views/3d/support/LayerPerformanceInfo';

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
  let statesLayer:Layer;
  // const customLayer = new FeatureLayer({
  //   url: customFeatureLayer
  // });

  useEffect(() => {
    if (mapRef && mapRef.current) {
      esriConfig.portalUrl = `${process.env.REACT_APP_PORTAL_URL}`;
      const portalWebMap = new WebMap({
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

      portalWebMap.when(function(){
        console.log(statesLayerId);
        statesLayer = portalWebMap.findLayerById(statesLayerId);
        console.log(statesLayer.id);
      });

      // console.log(statesLayerId);
      // statesLayer = portalWebMap.allLayers.find(function(layer) {
      //   return layer.title === 'US States with CIG Projects View';
      //  });

      //statesLayer = portalWebMap.findLayerById(statesLayerId);
      //portalWebMap.add(customLayer);

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
        statesLayer,
        `state_name = '${searchText}'`,
        [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
      )
      .then((data: any) => setQueryResults(data))
    }
  }, [searchText])

  return null;
}

export default MapComponent;
