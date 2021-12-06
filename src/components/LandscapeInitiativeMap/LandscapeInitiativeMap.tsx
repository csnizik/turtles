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
  STATE_FEATURE_LAYER_URL,
  workingLandsForWildlifeOptions,
} from './constants';

interface IMapProps {
  view: MapView;
  map: WebMap;
}

interface ILandscapeProps {
  landscapeInitiativesData: any;
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
            filteredLayers = allFeatureLayers.filter((layer: Layer) => {
              return (
                relatedLandscpaeInitiativesPerSelectedLocation.findIndex(
                  (intiativeName: string) => {
                    if (intiativeName.includes('_')) {
                      return intiativeName.includes(
                        layer.title.slice(layer.title.indexOf('_') + 1)
                      );
                    }
                    return intiativeName.includes(layer.title);
                  }
                ) > 0
              );
            });

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
    // TODO: Remove layers depending on if Landscape Intiative is selected
    // or if Working Lands for Wildlife
    // Filter out layers if selectedLandscapeInitiative is Working Lands for Wildlife
    mapRef.current.view.when(() => {
      mapRef.current.map.when(() => {
        if (mapRef.current.map.allLayers.length) {
          const allFeatureLayers: Array<any> = (
            mapRef.current.map.allLayers as any
          ).items.filter((layer: Layer) => {
            return layer.type === 'feature';
          });
          if (selectedLandscapeInitiative === 10) {
            let filteredLayers: Array<any> = [];
            filteredLayers = allFeatureLayers.filter((layer: Layer) => {
              return (
                workingLandsForWildlifeOptions.findIndex(
                  (intiative: string) => {
                    if (intiative.includes('_')) {
                      return intiative.includes(
                        layer.title.slice(layer.title.indexOf('_') + 1)
                      );
                    }
                    return intiative.includes(layer.title);
                  }
                ) === -1
              );
            });
            setFilteredLayers(filteredLayers);
            mapRef.current.map.removeMany(filteredLayers);
          }
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
