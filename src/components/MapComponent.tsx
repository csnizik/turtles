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
  searchText: string,
  setQueryResults: Function,
  setStateDropdownOption: Function,
  currentStateOption: string,
  queryResults: FeatureSet
}

interface MapProps {
  view: MapView;
  portalWebMap: WebMap;
}

const MapComponent = ({
    searchText,
    queryResults,
    setQueryResults,
    currentStateOption,
    setStateDropdownOption
  }: IMapProperties) => {
  const mapRef = useRef({} as MapProps);
  const [view, setView] = useState(null);
  const previousSearchText = usePrevious(searchText);
  let statesLayer:Layer;

  useEffect(() => {

  }, [view]);

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

      mapRef.current.view = view;
      mapRef.current.portalWebMap = portalWebMap;

      view.when(() => {
        view.on('pointer-up', function(event) {
          view.hitTest(event).then(function(response) {
          if (response.results.length) {
            const result = response.results[0];
            const graphic: any = result.graphic;
            const graphicAttributes = graphic.attributes;

            // Query stateLayer
            mapRef.current.portalWebMap.when(function(){
              statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);
              setStateDropdownOption(graphicAttributes.objectid_1);
              queryLayer(
                statesLayer,
                `objectid_1 = '${graphicAttributes.objectid_1}'`,
                [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
              )
              .then((data: any) => {
                setQueryResults(data)
              })
            });

          }
          })
        })
      })
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

      mapRef.current.portalWebMap.when(function(){
        statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);
        queryLayer(
          statesLayer,
          `state_name LIKE '${searchText}%'`,
          [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
        )
        .then((data: any) => setQueryResults(data))
      });


    }

    if (currentStateOption) {
      mapRef.current.portalWebMap.when(function(){
        statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);

        queryLayer(
          statesLayer,
          `objectid_1 = '${currentStateOption}'`,
          [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
        )
        .then((data: any) => setQueryResults(data))
      });
    }
  }, [searchText, currentStateOption])

  return null;
}

export default MapComponent;
