import { useEffect, useRef } from 'react';
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
  STATE_FEATURE_LAYER_URL,
} from './constants';

interface IMapProps {
  view: MapView;
  map: WebMap;
}

interface ILandscapeProps {
  landscapeInitiativesData: any;
  selectedLocation: any;
}

const LandscapeInitiativeMap = ({
  landscapeInitiativesData,
  selectedLocation,
}: ILandscapeProps) => {
  const mapRef = useRef({} as IMapProps);
  const stateFeatureLayer = useRef({} as FeatureLayer);
  const legendRef = useRef({} as Expand);

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

          let filteredLayers: Array<any> = [];
          const featureLayerInfos: Array<any> = [];
          if (landscapeInitiativesData?.length && selectedLocation) {
            const relatedLandscpaeInitiativesPerSelectedLocation =
              landscapeInitiativesData.map((init: any) => {
                return landscapeInitiativeToLegendMap[init.lci_id];
              });

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
      });
    });
  }, [mapRef]);

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
