import { useEffect, useState, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';
import Layer from '@arcgis/core/layers/Layer';
import '@arcgis/core/assets/esri/themes/light/main.css';
import {
  ALL_LANDSCAPE_INITIATIVES_PORTAL_URL,
  LANDSCAPE_VIEW_DIV,
  landscapeInitiativeToLegendMap,
  landscapeViewConstraints,
  workingLandsForWildlifeOptions,
} from './constants';
import { STATE_FEATURE_LAYER_URL } from '../../common/constants';
import { ILandscapeInitiative } from '../../common/types';
import { filterLandscapeInitiativeLayers } from './utils';

interface IMapProps {
  view: MapView;
  map: WebMap;
}

interface ILandscapeProps {
  landscapeInitiativesData: Array<ILandscapeInitiative>;
  selectedLocation: any;
  selectedLandscapeInitiative: number;
}

const LandscapeInitiativeMap = ({
  landscapeInitiativesData,
  selectedLocation,
  selectedLandscapeInitiative,
}: ILandscapeProps) => {
  const mapRef = useRef({} as IMapProps);
  const stateFeatureLayer = useRef({} as FeatureLayer);
  const legendRef = useRef({} as Expand);
  const [filteredOutLayers, setFilteredLayers]: any = useState([]);

  useEffect(() => {
    /*eslint consistent-return: 0 */

    if (mapRef && mapRef.current) {
      mapRef.current.map = new WebMap({
        portalItem: {
          id: ALL_LANDSCAPE_INITIATIVES_PORTAL_URL,
        },
      });
      const view: MapView = new MapView({
        center: [-96, 36],
        container: LANDSCAPE_VIEW_DIV,
        constraints: landscapeViewConstraints,
        map: mapRef.current.map,
        zoom: 4,
      });

      mapRef.current.view = view;

      stateFeatureLayer.current = new FeatureLayer({
        layerId: 1,
        outFields: ['STATEFP', 'NAME', 'STUSPS'],
        url: STATE_FEATURE_LAYER_URL,
        visible: false,
      });

      mapRef.current.map.layers.add(stateFeatureLayer.current);

      return () => {
        mapRef.current.view.destroy();
      };
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

          const featureLayerInfos: Array<any> = [];
          if (landscapeInitiativesData?.length && selectedLocation) {
            const relatedLandscpaeInitiativesPerSelectedLocation =
              landscapeInitiativesData.map((init: any) => {
                return landscapeInitiativeToLegendMap[init.lci_id];
              });

            let filteredLayers: Array<any> = [];
            filteredLayers = filterLandscapeInitiativeLayers(
              allFeatureLayers,
              relatedLandscpaeInitiativesPerSelectedLocation
            );

            filteredLayers.forEach((layer: Layer) => {
              featureLayerInfos.push({
                layer,
                title: layer.title,
              });
            });
          } else {
            allFeatureLayers.forEach((layer: Layer) => {
              featureLayerInfos.push({
                layer,
                title: layer.title,
              });
            });
          }

          if (!legendRef.current.visible) {
            legendRef.current = new Expand({
              content: new Legend({
                layerInfos: featureLayerInfos,
                style: 'classic',
                view: mapRef.current.view,
              }),
              expanded: true,
              view: mapRef.current.view,
            });

            mapRef.current.view.ui.add(legendRef.current, 'bottom-right');
          }
        }
      });
    });
  }, [mapRef, selectedLandscapeInitiative]);

  useEffect(() => {
    // Filter out layers depending on which landscape initiative is selected
    mapRef.current.view.when(() => {
      mapRef.current.map.when(() => {
        if (mapRef.current.map.allLayers.length) {
          const allFeatureLayers: Array<any> = (
            mapRef.current.map.allLayers as any
          ).items.filter((layer: Layer) => {
            return layer.type === 'feature';
          });

          // Working Lands for Wildlife
          if (selectedLandscapeInitiative === 10) {
            let filteredLayers: Array<any> = [];
            filteredLayers = filterLandscapeInitiativeLayers(
              allFeatureLayers,
              workingLandsForWildlifeOptions
            );
            setFilteredLayers(filteredLayers);
            mapRef.current.map.removeMany(filteredLayers);
          }
          // WaterSmart
          if (selectedLandscapeInitiative === 9) {
            let filteredLayers: Array<any> = [];
            filteredLayers = allFeatureLayers.filter((layer: any) => {
              return !layer.id.startsWith('NWQI');
            });
            setFilteredLayers(filteredLayers);
            mapRef.current.map.removeMany(filteredLayers);
          }
          // Defaualt 'Landscape Conservation Initiatives'
          if (selectedLandscapeInitiative === -1) {
            // Restore all layers
            mapRef.current.map.addMany(filteredOutLayers);
          }
        }
      });
    });
  }, [mapRef, selectedLandscapeInitiative]);

  useEffect(() => {
    if (
      selectedLocation &&
      mapRef.current &&
      legendRef.current &&
      stateFeatureLayer.current
    ) {
      mapRef.current.map.when(() => {
        stateFeatureLayer.current.when(() => {
          stateFeatureLayer.current.on('layerview-create', () => {
            stateFeatureLayer.current.queryFeatures().then((response) => {
              const { features } = response;
              const result: any = features.find((feat: any) => {
                return feat.attributes?.STATEFP === selectedLocation;
              });

              mapRef.current.view.extent = result?.geometry?.extent
                .clone()
                .expand(1.65);
            });
          });
        });
      });
    }
  }, []);

  return null;
};

export default LandscapeInitiativeMap;
