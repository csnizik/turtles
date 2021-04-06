import { useEffect, useState, useRef } from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Graphic from '@arcgis/core/Graphic';
import FeatureSet from '@arcgis/core/tasks/support/FeatureSet';
import RelationshipQuery from '@arcgis/core/tasks/support/RelationshipQuery';
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

// interface IRelatedTableResult {
//     results: FeatureSet
// }

interface MapProps {
  view: MapView;
  portalWebMap: WebMap;
}

const MapComponent = ({ searchText }: IMapProperties) => {
  const mapRef = useRef({} as MapProps);
  const [queryResults, setQueryResults] = useState<FeatureSet>();
  const [relatedTableResults, setRelatedTableResults] = useState<Graphic[]>();
  const [view, setView] = useState(null);

  const previousSearchText = usePrevious(searchText);


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
    if (relatedTableResults && relatedTableResults.length) {
      console.log(relatedTableResults);
    }
  }, [relatedTableResults])

  useEffect(() => {
    if (searchText && previousSearchText !== searchText) {

      let statesLayer:Layer;
      let statesFLayer:FeatureLayer;
      let objectIds:number[];


      mapRef.current.portalWebMap.when(function(){

        statesLayer = mapRef.current.portalWebMap.findLayerById(statesLayerId);      
        queryLayer(
          statesLayer,
          `state_name = '${searchText}'`,
          [ "state_name", "state_abbr", "objectid_1", "no_farms07" ]
        )
        .then((data: FeatureSet) => {
          setQueryResults(data);
          statesFLayer = statesLayer as FeatureLayer;

          if (data.features && data.features.length){
            let relID:number = data.features[0].getObjectId();
            statesFLayer = statesLayer as FeatureLayer;

            console.log(statesFLayer.relationships);

            statesFLayer.queryRelatedFeatures({
              outFields: ["awardee_name", "awardee_state__territory"],
              relationshipId: statesFLayer.relationships[0].id,
              objectIds: [relID]
            }).then((rdata: any) => {
              setRelatedTableResults(rdata[relID].features);
            })
          }
        });



      });



    }
  }, [searchText])

  return null;
}

export default MapComponent;
