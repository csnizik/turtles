import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Legend from '@arcgis/core/widgets/Legend';
import Layer from '@arcgis/core/layers/Layer';
import '@arcgis/core/assets/esri/themes/light/main.css';
import {
  ALL_LANDSCAPE_INITIATIVES_PORTAL_URL,
  LANDSCAPE_VIEW_DIV,
  landscapeViewConstraints,
} from './constants';

interface IMapProps {
  view: MapView;
  map: WebMap;
}

const WORKING_LANDS_FOR_WILDLIFE_PORTAL_URL =
  'ad39833c583d4b60bb0419f54cbec77f';

const LandscapeInitiativeMap = () => {
  const mapRef = useRef({} as IMapProps);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.map = new WebMap({
        portalItem: {
          id: ALL_LANDSCAPE_INITIATIVES_PORTAL_URL,
        },
      });
      const view: MapView = new MapView({
        center: [-96, 36],
        container: LANDSCAPE_VIEW_DIV,
        map: mapRef.current.map,
        zoom: 4,
      });

      view.constraints = landscapeViewConstraints;

      mapRef.current.view = view;
    }
  }, [mapRef]);

  useEffect(() => {
    mapRef.current.view.when(() => {
      mapRef.current.map.when(() => {
        if (mapRef.current.map.allLayers.length) {
          const allFeatureLayers: Array<any> = (
            mapRef.current.map.allLayers as any
          ).items.filter((layer: Layer) => {
            return layer.type === 'feature';
          });

          const workingLandsForWildlifeLayerInfos: Array<any> = [];
          allFeatureLayers.forEach((layer: Layer) => {
            workingLandsForWildlifeLayerInfos.push({
              layer,
              title: layer.title,
            });
          });

          const legend: Legend = new Legend({
            style: 'classic',
            view: mapRef.current.view,
            layerInfos: workingLandsForWildlifeLayerInfos,
          });

          mapRef.current.view.ui.add(legend, 'bottom-right');
        }
      });
    });
  }, []);

  return null;
};

export default LandscapeInitiativeMap;
